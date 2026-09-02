import Hero from '../components/home/Hero';

/**
 * Home page — renders the Hero section.
 * @param {{ onContactOpen: () => void }} props
 */
export default function Home({ onContactOpen }) {
  return <Hero onContactOpen={onContactOpen} />;
}
