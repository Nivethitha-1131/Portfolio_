#!/usr/bin/env python3
"""
Remove light/white background from portrait PNG.
Strategy:
  1. Flood-fill from all four corners to identify the background region
  2. Replace background pixels with full transparency
  3. Feather the edges with a short gaussian blur on the alpha channel
"""

from PIL import Image, ImageFilter
import sys
import os

INPUT  = "/Users/user/portfolioooo/frontend/public/assets/portrait.png"
OUTPUT = "/Users/user/portfolioooo/frontend/public/assets/portrait.png"

def is_background_color(r, g, b, threshold=200):
    """Return True if pixel is white/near-white or checkerboard grey."""
    # White background
    if r > threshold and g > threshold and b > threshold:
        return True
    # Checkerboard grey pattern typical in exported cutouts
    if abs(r - g) < 15 and abs(g - b) < 15 and r > 170:
        return True
    return False

def remove_background(path_in, path_out):
    img = Image.open(path_in).convert("RGBA")
    data = img.load()
    w, h = img.size

    print(f"Image size: {w}x{h}")

    # ── Step 1: flood fill background mask from corners ─────────
    visited = [[False] * h for _ in range(w)]
    bg_mask = [[False] * h for _ in range(w)]

    # Seed points from all four edges
    seeds = []
    for x in range(w):
        seeds.append((x, 0))
        seeds.append((x, h - 1))
    for y in range(h):
        seeds.append((0, y))
        seeds.append((w - 1, y))

    stack = []
    for (sx, sy) in seeds:
        r, g, b, a = data[sx, sy]
        if not visited[sx][sy] and is_background_color(r, g, b):
            stack.append((sx, sy))
            visited[sx][sy] = True

    # BFS flood fill
    from collections import deque
    queue = deque(stack)

    while queue:
        x, y = queue.popleft()
        bg_mask[x][y] = True

        for nx, ny in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)]:
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
                r, g, b, a = data[nx, ny]
                # Allow slight tolerance for anti-aliased edges
                if is_background_color(r, g, b, threshold=180):
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    # ── Step 2: Apply transparency where bg_mask is True ────────
    new_data = []
    for y in range(h):
        for x in range(w):
            r, g, b, a = data[x, y]
            if bg_mask[x][y]:
                new_data.append((r, g, b, 0))   # fully transparent
            else:
                new_data.append((r, g, b, a))

    img.putdata(new_data)

    # ── Step 3: Soften alpha edges slightly ──────────────────────
    # Extract alpha, apply a tiny blur to feather hard cutout edges
    r_ch, g_ch, b_ch, a_ch = img.split()
    a_soft = a_ch.filter(ImageFilter.GaussianBlur(radius=1.2))
    img = Image.merge("RGBA", (r_ch, g_ch, b_ch, a_soft))

    img.save(path_out, "PNG")
    print(f"Saved: {path_out}")
    print("Background removal complete.")

if __name__ == "__main__":
    remove_background(INPUT, OUTPUT)
