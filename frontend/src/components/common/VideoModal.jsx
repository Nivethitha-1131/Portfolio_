import { motion, AnimatePresence } from 'framer-motion';

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

/**
 * VideoModal — Popup modal player for journey video.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   videoSrc?: string
 * }} props
 */
export default function VideoModal({ isOpen, onClose, videoSrc }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-4xl bg-surface border border-hairline rounded-xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-hairline">
            <span className="font-serif text-lg text-cream">Journey Video</span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate hover:text-gold hover:bg-white/5 transition-colors text-lg"
              aria-label="Close video modal"
            >
              ✕
            </button>
          </div>

          {/* Video Container */}
          <div className="relative aspect-video bg-black flex items-center justify-center">
            {videoSrc ? (
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full border border-gold/60 flex items-center justify-center text-gold mb-4 shadow-[0_0_20px_rgba(201,164,92,0.3)]">
                  <PlayIcon />
                </div>
                <p className="text-cream font-medium mb-1">Insert your video here</p>
                <p className="text-slate text-xs max-w-md">
                  To insert your video, pass your video file path or URL into <code className="text-gold">videoSrc</code> in <code className="text-gold">pages/Journey.jsx</code>.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
