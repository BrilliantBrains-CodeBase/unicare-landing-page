import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Arrow, Phone, Pin } from '../components/icons';
import { fadeUp, stagger } from '../lib/animations';

const contentStagger = stagger(0.1, 0.1);

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-(--bg) flex flex-col">

      {/* Minimal nav */}
      <header className="px-4 sm:px-6 py-4 border-b border-(--line) bg-white">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          <Logo className="h-14 w-auto" />
          <a href="tel:+919090546363" className="pill text-[12px] sm:text-[13px] inline-flex items-center gap-1.5">
            <Phone s={12} c="#2CAAA0"/> +91 9090546363
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <motion.div
          className="w-full max-w-2xl"
          variants={contentStagger}
          initial="hidden"
          animate="visible"
        >

          {/* Success icon */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-(--teal)/12 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2CAAA0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUp} className="text-center mb-8">
            <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05]" style={{ color: 'var(--navy)' }}>
              Request received.
            </h1>
            <p className="text-[15px] sm:text-[16px] text-(--muted) mt-4 leading-relaxed max-w-lg mx-auto">
              Thank you for reaching out to UniCare Hospital. Our team will review your appointment request and call you to confirm a suitable time.
            </p>
          </motion.div>

          {/* Info cards */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-2xl bg-white border border-(--line) p-5 flex items-start gap-3">
              <span className="w-9 h-9 rounded-xl bg-(--teal)/12 flex items-center justify-center shrink-0 mt-0.5">
                <Phone s={15} c="#2CAAA0"/>
              </span>
              <div>
                <div className="text-[11px] tracking-[0.16em] uppercase font-semibold text-(--muted) mb-1">Call us directly</div>
                <a href="tel:+919090546363" className="text-[14px] font-semibold text-(--navy) hover:text-(--teal) transition-colors">+91 9090546363</a>
                <div className="text-[11.5px] text-(--muted) mt-0.5">Available during hospital hours</div>
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-(--line) p-5 flex items-start gap-3">
              <span className="w-9 h-9 rounded-xl bg-(--teal)/12 flex items-center justify-center shrink-0 mt-0.5">
                <Pin s={15} c="#2CAAA0"/>
              </span>
              <div>
                <div className="text-[11px] tracking-[0.16em] uppercase font-semibold text-(--muted) mb-1">Our address</div>
                <div className="text-[13px] font-semibold text-(--navy) leading-snug">2nd Floor, Saanvi Antalya Homes</div>
                <div className="text-[11.5px] text-(--muted) mt-0.5">Narsingi, Kokapet, Hyderabad · 500075</div>
              </div>
            </div>
          </motion.div>

          {/* What happens next */}
          <motion.div variants={fadeUp} className="rounded-2xl bg-(--navy) text-white p-6 sm:p-8 mb-8">
            <div className="text-[11px] tracking-[0.18em] uppercase text-white/50 mb-4">What happens next</div>
            <div className="flex flex-col gap-4">
              {[
                ['Our team reviews your request', 'We check availability for your preferred department and date.'],
                ['We call you to confirm', 'A team member will reach you on the mobile number provided.'],
                ['Your appointment is set', 'Visit us at Kokapet for expert, patient-first care.'],
              ].map(([title, desc], i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-(--teal)/20 text-(--teal) text-[12px] font-bold inline-flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <div className="text-[13.5px] font-semibold">{title}</div>
                    <div className="text-[12px] text-white/55 mt-0.5 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Back CTA */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn-dark text-[14px]"
            >
              <span>Back to Home</span>
              <span className="arrow"><Arrow s={12}/></span>
            </button>
          </motion.div>

        </motion.div>
      </main>

      {/* Footer strip */}
      <footer className="px-4 sm:px-6 py-4 border-t border-(--line)">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          <span className="text-[11px] sm:text-[12px] text-(--muted) inline-flex items-center gap-1.5">
            <Pin s={11}/> Kokapet, Hyderabad · 500075
          </span>
          <span className="text-[11px] sm:text-[12px] text-(--muted)">© 2026 UniCare Hospital. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}
