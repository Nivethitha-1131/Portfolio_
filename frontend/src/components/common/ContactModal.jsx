import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const OVERLAY_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const PANEL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.25 } },
};

function IconClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

function IconLeetCode() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  );
}

const INPUT_CLASS =
  'w-full bg-transparent border border-hairline text-cream placeholder-slate text-base sm:text-sm px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-sm focus:outline-none focus:border-gold transition-colors duration-200';

/**
 * ContactModal — responsive modal for all viewports.
 *
 * @param {{ isOpen: boolean, onClose: () => void }} props
 */
export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: form.name,
            from_name: form.name,
            email: form.email,
            from_email: form.email,
            user_email: form.email,
            message: form.message,
            reply_to: form.email,
            to_name: 'Nivethitha',
          },
          EMAILJS_PUBLIC_KEY
        );
      } else if (WEB3FORMS_ACCESS_KEY) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: form.name,
            email: form.email,
            message: form.message,
            from_name: `${form.name} (Portfolio Inquiry)`,
            subject: `✦ Portfolio Inquiry from ${form.name}`,
          }),
        });

        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message || 'Submission failed');
        }
      } else {
        const res = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Server error');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-overlay"
          variants={OVERLAY_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/85 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label="Contact modal"
        >
          <motion.div
            variants={PANEL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg bg-surface border border-hairline rounded-sm p-6 sm:p-8 md:p-10 my-auto max-h-[92vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              id="contact-modal-close"
              onClick={onClose}
              aria-label="Close contact modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate hover:text-cream transition-colors"
            >
              <IconClose />
            </button>

            {/* Header */}
            <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-gold mb-2 sm:mb-3 font-medium">Get in Touch</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-cream mb-1">Let's Talk</h2>
            <div className="gold-divider mb-5 sm:mb-7" />

            {/* Social links */}
            <div className="flex flex-col gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              <a
                href="mailto:nivethitha1131@gmail.com"
                className="flex items-center gap-3 text-xs sm:text-sm text-slate hover:text-gold transition-colors group break-all"
              >
                <span className="text-gold group-hover:text-gold/70 transition-colors shrink-0">
                  <IconMail />
                </span>
                nivethitha1131@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/nivethitha-ramesh/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs sm:text-sm text-slate hover:text-gold transition-colors group break-all"
              >
                <span className="text-gold group-hover:text-gold/70 transition-colors shrink-0">
                  <IconLinkedIn />
                </span>
                linkedin.com/in/nivethitha-ramesh
              </a>
              <a
                href="https://github.com/Nivethitha-1131"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs sm:text-sm text-slate hover:text-gold transition-colors group break-all"
              >
                <span className="text-gold group-hover:text-gold/70 transition-colors shrink-0">
                  <IconGitHub />
                </span>
                github.com/Nivethitha-1131
              </a>
              <a
                href="https://leetcode.com/u/Nivethitha_R/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs sm:text-sm text-slate hover:text-gold transition-colors group break-all"
              >
                <span className="text-gold group-hover:text-gold/70 transition-colors shrink-0">
                  <IconLeetCode />
                </span>
                leetcode.com/u/Nivethitha_R
              </a>
            </div>

            {/* Divider */}
            <div className="border-t border-hairline mb-5 sm:mb-7" />

            {/* Form */}
            {status === 'success' ? (
              <div className="text-center py-6 sm:py-8">
                <p className="text-gold font-medium tracking-wide mb-2">Message sent.</p>
                <p className="text-slate text-xs sm:text-sm">I'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Your message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className={`${INPUT_CLASS} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400/80 text-xs tracking-wide">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-1 self-start inline-flex items-center gap-2 border border-gold text-gold text-[9px] sm:text-[10px] font-medium tracking-widest uppercase px-6 py-3 sm:px-7 sm:py-3.5 hover:bg-gold/5 hover:shadow-[0_0_16px_0_rgba(201,162,75,0.25)] transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
