import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Arrow, ArrowRight, Heart, Pin } from '../components/icons';
import { fadeUp, slideLeft, slideRight, stagger, vp } from '../lib/animations';

// Paste your deployed Apps Script Web App URL here after deployment
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyda3Ii0IoqRFjYcxZZS-W5vsLmmOOs7ImPgmrGqjxrV9wCThKLtBpJtHBkJH_VMCKOWQ/exec';

const specialties = [
  "Maternity & Women's Health",
  'Paediatrics',
  'Orthopaedics',
  'General Medicine',
  'General Surgery',
  'Diagnostics & Pharmacy',
];

const benefits = [
  'Launch date before anyone else',
  'Opening week consultation offers',
  'Priority appointment booking',
  'Founder doctor health updates',
];

const headingStagger = stagger(0.1, 0);
const listStagger = stagger(0.08, 0.15);

export default function Nearby() {
  const [selected, setSelected] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    const name   = form.elements['name'].value.trim();
    const mobile = form.elements['mobile'].value.trim();
    const email  = form.elements['email'].value.trim();

    if (!name || !mobile || !email) return;

    setStatus('loading');
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ name, mobile, email, specialty: selected }),
      });
      setStatus('success');
      form.reset();
      setSelected('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="notify-form" className="px-4 sm:px-6 py-12 sm:py-16" data-screen-label="05 Nearby">
      <div className="max-w-[1320px] mx-auto">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-6 md:mb-10"
          variants={headingStagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <motion.span variants={fadeUp} className="pill text-[12px] inline-flex items-center gap-2">
            Be the First to Know <ArrowRight s={12}/>
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[32px] md:text-[44px] lg:text-[56px] leading-[1.05] mt-5"
            style={{ color: 'var(--navy)' }}
          >
            Join the first<br/>500 families.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[14px] sm:text-[15px] text-(--muted) max-w-130 mt-4 leading-relaxed px-2">
            Sign up to receive the launch date before anyone else, opening week consultation offers, and priority appointment booking.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* Form card - slides from left */}
          <motion.div
            className="col-span-12 lg:col-span-7"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="h-full rounded-[20px] sm:rounded-[28px] bg-white border border-(--line) p-5 sm:p-7 md:p-10 flex flex-col gap-6 sm:gap-8">

              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-(--teal) text-white text-[11px] font-semibold inline-flex items-center justify-center shrink-0">1</span>
                <span className="text-[13px] font-semibold text-(--navy) tracking-wide">Your details</span>
                <div className="flex-1 h-px bg-(--line)"/>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="uc-name" className="text-[11px] tracking-[0.16em] uppercase font-semibold text-(--muted)">Name <span aria-hidden="true" className="text-red-500">*</span></label>
                  <input id="uc-name" name="name" type="text" autoComplete="name" required placeholder="e.g. Priya Sharma"
                    className="w-full bg-(--bg) rounded-2xl px-4 py-3.5 text-[14px] text-(--navy) outline-none border border-(--line) focus:border-(--teal) transition-colors placeholder:text-(--muted)/50" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="uc-mobile" className="text-[11px] tracking-[0.16em] uppercase font-semibold text-(--muted)">Mobile <span aria-hidden="true" className="text-red-500">*</span></label>
                  <input id="uc-mobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+91 90000 11122"
                    className="w-full bg-(--bg) rounded-2xl px-4 py-3.5 text-[14px] text-(--navy) outline-none border border-(--line) focus:border-(--teal) transition-colors placeholder:text-(--muted)/50" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="uc-email" className="text-[11px] tracking-[0.16em] uppercase font-semibold text-(--muted)">Email <span aria-hidden="true" className="text-red-500">*</span></label>
                <input id="uc-email" name="email" type="email" autoComplete="email" required placeholder="priya@example.com"
                  className="w-full bg-(--bg) rounded-2xl px-4 py-3.5 text-[14px] text-(--navy) outline-none border border-(--line) focus:border-(--teal) transition-colors placeholder:text-(--muted)/50" />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-(--teal) text-white text-[11px] font-semibold inline-flex items-center justify-center shrink-0">2</span>
                  <span className="text-[13px] font-semibold text-(--navy) tracking-wide">I&apos;m interested in</span>
                  <div className="flex-1 h-px bg-(--line)"/>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {specialties.map(s => (
                    <button key={s} type="button" onClick={() => setSelected(prev => prev === s ? '' : s)}
                      className="px-3 sm:px-4 py-2 rounded-full text-[12px] sm:text-[12.5px] border transition-all cursor-pointer"
                      style={selected === s
                        ? { background: 'var(--navy)', color: '#fff', borderColor: 'var(--navy)' }
                        : { background: '#fff', color: 'var(--navy)', borderColor: 'var(--line)' }
                      }
                    >{s}</button>
                  ))}
                </div>
              </div>

              {status === 'success' && (
                <div className="rounded-2xl bg-(--teal)/10 border border-(--teal)/30 px-4 py-3 text-[13px] text-(--teal) font-medium text-center">
                  You're on the list! We'll be in touch before we open.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-[13px] text-red-600 text-center">
                  Something went wrong. Please try again or call us directly.
                </div>
              )}

              <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-(--line)">
                <p className="text-[12px] text-(--muted) inline-flex items-center gap-1.5">
                  <Heart s={11} c="#2CAAA0"/> No spam. Only founder updates &amp; launch offers.
                </p>
                <button type="submit" disabled={status === 'loading' || status === 'success'} className="btn-dark disabled:opacity-60 disabled:cursor-not-allowed">
                  <span>{status === 'loading' ? 'Submitting…' : 'Reserve My Spot'}</span>
                  {status !== 'loading' && <span className="arrow"><Arrow s={12}/></span>}
                </button>
              </div>

            </form>
          </motion.div>

          {/* Benefits card - slides from right */}
          <motion.div
            className="col-span-12 lg:col-span-5"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <div className="h-full rounded-[20px] sm:rounded-[28px] bg-(--navy) text-white p-5 sm:p-7 md:p-10 flex flex-col justify-between relative overflow-hidden">

              <svg viewBox="0 0 300 300" className="absolute -right-16 -bottom-16 w-70 opacity-10 pointer-events-none" aria-hidden="true">
                <circle cx="150" cy="150" r="130" fill="none" stroke="#2CAAA0" strokeWidth="1.5"/>
                <circle cx="150" cy="150" r="90" fill="none" stroke="#2CAAA0" strokeWidth="1.5"/>
                <circle cx="150" cy="150" r="50" fill="none" stroke="#2CAAA0" strokeWidth="1.5"/>
              </svg>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-[11px] tracking-[0.18em] uppercase text-white/70 mb-6">
                  Founder benefits
                </div>
                <h3 className="font-display text-[28px] sm:text-[34px] leading-[1.1]">First 500 families<br/>get more.</h3>
                <p className="text-[13px] sm:text-[13.5px] text-white/65 mt-3 leading-relaxed max-w-70">
                  Reserve your spot today and unlock exclusive benefits when we open our doors in Kokapet.
                </p>
              </div>

              {/* Benefits list - staggered */}
              <motion.ul
                className="space-y-0 mt-6"
                variants={listStagger}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
              >
                {benefits.map((x, i) => (
                  <motion.li
                    key={x}
                    variants={fadeUp}
                    className={`flex items-center gap-3 py-3.5 sm:py-4 ${i < benefits.length - 1 ? 'border-b border-white/10' : ''}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-(--teal) text-white inline-flex items-center justify-center shrink-0 text-[11px]">✓</span>
                    <span className="text-[13px] sm:text-[14px] text-white/90">{x}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/10">
                <Pin s={12} c="#2CAAA0"/>
                <span className="text-[12px] text-white/60 tracking-wide">Kokapet, Hyderabad · Opening 2026</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
