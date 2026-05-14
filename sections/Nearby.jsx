import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Arrow, Phone, Pin } from '../components/icons';
import { fadeUp, slideLeft, slideRight, stagger, vp } from '../lib/animations';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyda3Ii0IoqRFjYcxZZS-W5vsLmmOOs7ImPgmrGqjxrV9wCThKLtBpJtHBkJH_VMCKOWQ/exec';

const specialties = [
  'General Medicine',
  'Paediatrics',
  'Orthopaedics',
  "Maternity & Women's Health",
  'General Surgery',
  'Pharmacy',
  'Lab',
];

const trustPoints = [
  'Experienced family & specialist doctors',
  'Modern diagnostics & patient-focused care',
  'Comfortable consultation experience',
  'Easy appointment coordination',
  'Trusted healthcare for every stage of life',
];

const headingStagger = stagger(0.1, 0);
const listStagger = stagger(0.08, 0.2);

export default function Nearby() {
  const [selected, setSelected] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const formRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    const name   = form.elements['name'].value.trim();
    const mobile = form.elements['mobile'].value.trim();
    const reason = form.elements['reason'].value.trim();
    const date   = form.elements['date'].value;

    if (!name || !mobile) return;

    setStatus('loading');
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ name, mobile, specialty: selected, reason, date }),
      });
      navigate('/thank-you');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="notify-form" className="px-4 sm:px-6 py-12 sm:py-16 overflow-x-hidden scroll-mt-32 lg:scroll-mt-40" data-screen-label="05 Appointments">
      <div className="max-w-[1320px] mx-auto">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-8 md:mb-12"
          variants={headingStagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <motion.span variants={fadeUp} className="pill text-[12px]">
            Appointments
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[32px] md:text-[44px] lg:text-[56px] leading-[1.05] mt-5"
            style={{ color: 'var(--navy)' }}
          >
            Book an Appointment.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[14px] sm:text-[15px] text-(--muted) max-w-140 mt-4 leading-relaxed px-2">
            Connect with experienced specialists at UniCare Hospital for consultations, diagnostics, and ongoing care - all in a calm, patient-first environment.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* Left sidebar - info + trust */}
          <motion.div
            className="col-span-12 lg:col-span-4"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <div className="h-full rounded-[20px] sm:rounded-[28px] bg-(--navy) text-white p-5 sm:p-7 md:p-8 flex flex-col gap-6 relative overflow-hidden">

              <svg viewBox="0 0 300 300" className="absolute -right-16 -bottom-16 w-64 opacity-[.07] pointer-events-none" aria-hidden="true">
                <circle cx="150" cy="150" r="130" fill="none" stroke="#2CAAA0" strokeWidth="1.5"/>
                <circle cx="150" cy="150" r="90" fill="none" stroke="#2CAAA0" strokeWidth="1.5"/>
                <circle cx="150" cy="150" r="50" fill="none" stroke="#2CAAA0" strokeWidth="1.5"/>
              </svg>

              <div>
                <h3 className="font-display text-[24px] sm:text-[28px] leading-[1.1]">Need Assistance?</h3>
                <p className="text-[13px] text-white/60 mt-2 leading-relaxed">
                  Our care team is here to help you with appointments, department guidance, and general enquiries.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <a href="tel:+919090546363" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors">
                  <span className="w-9 h-9 rounded-xl bg-(--teal)/20 flex items-center justify-center shrink-0">
                    <Phone s={15} c="#2CAAA0"/>
                  </span>
                  <div>
                    <div className="text-[13.5px] font-semibold">+91 9090546363</div>
                    <div className="text-[11px] text-white/50">Available during hospital hours</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10">
                  <span className="w-9 h-9 rounded-xl bg-(--teal)/20 flex items-center justify-center shrink-0">
                    <Pin s={15} c="#2CAAA0"/>
                  </span>
                  <div>
                    <div className="text-[13.5px] font-semibold">Narsingi, Kokapet, Hyderabad</div>
                    <div className="text-[11px] text-white/50">Modern family care, close to home</div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/10"/>

              <motion.ul
                className="flex flex-col"
                variants={listStagger}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
              >
                {trustPoints.map((x, i) => (
                  <motion.li
                    key={x}
                    variants={fadeUp}
                    className={`flex items-center gap-3 py-3 ${i < trustPoints.length - 1 ? 'border-b border-white/8' : ''}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-(--teal) text-white inline-flex items-center justify-center shrink-0 text-[9px] font-bold">✓</span>
                    <span className="text-[12.5px] text-white/85">{x}</span>
                  </motion.li>
                ))}
              </motion.ul>

            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            className="col-span-12 lg:col-span-8"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="h-full rounded-[20px] sm:rounded-[28px] bg-white border border-(--line) p-5 sm:p-7 md:p-10 flex flex-col gap-6 sm:gap-7">

              <div>
                <div className="text-[11px] tracking-[0.18em] uppercase font-semibold text-(--muted) mb-1">Quick Appointment Request</div>
                <p className="text-[13px] text-(--muted) leading-relaxed">
                  Fill in your details and our team will contact you to confirm your appointment.
                </p>
              </div>

              {/* Step 1 */}
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-(--teal) text-white text-[11px] font-semibold inline-flex items-center justify-center shrink-0">1</span>
                <span className="text-[13px] font-semibold text-(--navy) tracking-wide">Your details</span>
                <div className="flex-1 h-px bg-(--line)"/>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="uc-name" className="text-[11px] tracking-[0.16em] uppercase font-semibold text-(--muted)">Full Name <span aria-hidden="true" className="text-red-500">*</span></label>
                  <input id="uc-name" name="name" type="text" autoComplete="name" required placeholder="Enter your full name"
                    className="w-full bg-(--bg) rounded-2xl px-4 py-3.5 text-[14px] text-(--navy) outline-none border border-(--line) focus:border-(--teal) transition-colors placeholder:text-(--muted)/50" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="uc-mobile" className="text-[11px] tracking-[0.16em] uppercase font-semibold text-(--muted)">Mobile Number <span aria-hidden="true" className="text-red-500">*</span></label>
                  <input id="uc-mobile" name="mobile" type="tel" inputMode="numeric" autoComplete="tel" required placeholder="10-digit mobile number"
                    className="w-full bg-(--bg) rounded-2xl px-4 py-3.5 text-[14px] text-(--navy) outline-none border border-(--line) focus:border-(--teal) transition-colors placeholder:text-(--muted)/50" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-(--teal) text-white text-[11px] font-semibold inline-flex items-center justify-center shrink-0">2</span>
                  <span className="text-[13px] font-semibold text-(--navy) tracking-wide">Department / Specialty</span>
                  <div className="flex-1 h-px bg-(--line)"/>
                </div>
                <div className="flex flex-wrap gap-2">
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

              {/* Step 3 */}
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-(--teal) text-white text-[11px] font-semibold inline-flex items-center justify-center shrink-0">3</span>
                <span className="text-[13px] font-semibold text-(--navy) tracking-wide">Visit details</span>
                <div className="flex-1 h-px bg-(--line)"/>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="uc-reason" className="text-[11px] tracking-[0.16em] uppercase font-semibold text-(--muted)">
                    Reason for Visit <span className="text-[10px] text-(--muted)/60 normal-case tracking-normal font-normal">(optional)</span>
                  </label>
                  <textarea id="uc-reason" name="reason" rows={4} placeholder="Briefly describe your concern"
                    className="w-full bg-(--bg) rounded-2xl px-4 py-3.5 text-[14px] text-(--navy) outline-none border border-(--line) focus:border-(--teal) transition-colors placeholder:text-(--muted)/50 resize-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="uc-date" className="text-[11px] tracking-[0.16em] uppercase font-semibold text-(--muted)">
                    Preferred Date <span className="text-[10px] text-(--muted)/60 normal-case tracking-normal font-normal">(optional)</span>
                  </label>
                  <input id="uc-date" name="date" type="date"
                    className="w-full bg-(--bg) rounded-2xl px-4 py-3.5 text-[14px] text-(--navy) outline-none border border-(--line) focus:border-(--teal) transition-colors" />
                </div>
              </div>

              {status === 'error' && (
                <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3.5 text-[13px] text-red-600 text-center">
                  Something went wrong. Please try again or call us at +91 9090546363.
                </div>
              )}

              <div className="flex items-center justify-end pt-2 border-t border-(--line)">
                <button type="submit" disabled={status === 'loading'} className="btn-dark disabled:opacity-60 disabled:cursor-not-allowed">
                  <span>{status === 'loading' ? 'Submitting...' : 'Request Appointment'}</span>
                  {status !== 'loading' && <span className="arrow"><Arrow s={12}/></span>}
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
