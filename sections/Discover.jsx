import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Arrow, ArrowLeft, ArrowRight, Plus, SunMark } from '../components/icons';
import HospitalPhoto from '../components/HospitalPhoto';
import interiorFooterImg from '../assets/hospital-interior-footer.png';
import { scaleIn, slideLeft, slideRight, vp } from '../lib/animations';

const doctors = [
  {
    key: 'Dr. Varuna',
    name: 'Dr. A.N. Varuna Vyas',
    role: 'Founder & Clinical Lead',
    specialty: "Women's Health & Reproductive Care",
    quals: ['MBBS', 'DGO', 'DNB', 'FRM'],
    initials: 'VV',
    color: '#2CAAA0',
    bio: "8+ years across govt. & private healthcare. High-risk obstetrics, reproductive medicine, and minimally invasive gynaecological surgery. Builds lifecycle-based women's care.",
  },
  {
    key: 'Dr. Bhargava',
    name: 'Dr. Bhargava Vyas A.N.',
    role: 'Founder & Clinical Lead',
    specialty: 'General & Minimal Access Surgery',
    quals: ['MBBS', 'MS', 'FIAGES', 'FMAS'],
    initials: 'BV',
    color: '#012257',
    bio: "Fellowship-trained laparoscopic surgeon, former Asst. Professor at Kasturba Medical College. Peer-reviewed publications; contributor to SRB's Surgical Textbooks.",
  },
  {
    key: 'Dr. Deepak',
    name: 'Dr. Deepak Thiriveedi',
    role: 'Consultant',
    specialty: 'Endocrinology & Metabolic Medicine',
    quals: ['MBBS', 'MD', 'DM (pursuing)', 'SCE UK'],
    initials: 'DT',
    color: '#1A6B65',
    bio: 'UK-certified (SCE), published in Clinical Endocrinology. Expertise in diabetes, thyroid, pituitary and reproductive endocrinology with a research-driven practice.',
  },
  {
    key: 'Dr. Nitin',
    name: 'Dr. M. Nitin Rao',
    role: 'Consultant',
    specialty: 'Paediatrics & Neonatal Care',
    quals: ['MBBS', 'MD Paediatrics'],
    initials: 'NR',
    color: '#0A3D62',
    bio: 'NICU/PICU specialist trained at JJM Medical College. Managed 4,000+ neonatal cases. Skills: ventilation, resuscitation, developmental & preventive paediatrics.',
  },
  {
    key: 'Dr. Veena',
    name: 'Dr. Mereddy Veena',
    role: 'Consultant',
    specialty: 'Paediatrics & Neonatal Care',
    quals: ['MBBS', 'MD Paediatrics'],
    initials: 'MV',
    color: '#6B3FA0',
    bio: 'Trained at KIMS Bangalore. Thesis on neonatal airway management in preterm infants. NICU/PICU with BLS & PALS certification.',
  },
];

export default function Discover() {
  const [docIdx, setDocIdx] = useState(0);
  const doc = doctors[docIdx];
  const nextDoc = () => setDocIdx(i => (i + 1) % doctors.length);
  const prevDoc = () => setDocIdx(i => (i - 1 + doctors.length) % doctors.length);

  return (
    <section id="founders" className="px-4 sm:px-6 py-12 border-t border-(--line) overflow-x-hidden scroll-mt-32 lg:scroll-mt-40" data-screen-label="03 Discover">
      <div className="max-w-330 mx-auto grid grid-cols-12 gap-8 md:gap-12">

        {/* Left - doctor tabs + profile card */}
        <motion.div
          className="col-span-12 md:col-span-6"
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-5 flex-wrap">
            <div className="w-11 h-11 rounded-full bg-(--teal) flex items-center justify-center shrink-0">
              <SunMark s={20} c="#fff"/>
            </div>
            {doctors.map((d, i) => (
              <button
                key={d.key}
                onClick={() => setDocIdx(i)}
                className={`text-[12px] sm:text-[13px] px-3.5 py-2 rounded-full border cursor-pointer transition-colors duration-200 ${docIdx === i ? 'bg-(--navy) text-white border-(--navy)' : 'border-(--line) text-(--navy) bg-white'}`}
              >{d.key}</button>
            ))}
          </div>

          <div className="rounded-3xl sm:rounded-[28px] p-4 sm:p-5 relative overflow-hidden" style={{ background: 'var(--teal-soft)' }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={doc.key}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* ── Mobile layout (below sm) ── */}
                <div className="flex flex-col gap-4 sm:hidden">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden"
                      style={{ background: doc.color }}
                    >
                      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 25%, rgba(255,255,255,0.15), transparent 65%)' }}/>
                      <div className="font-display text-[22px] text-white leading-none z-10">{doc.initials}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide mb-1"
                        style={{ background: doc.color + '1A', color: doc.color }}
                      >{doc.role}</div>
                      <div className="font-display text-[15px] leading-tight" style={{ color: 'var(--navy)' }}>{doc.name}</div>
                      <div className="text-[10.5px] text-(--muted) leading-snug mt-0.5">{doc.specialty}</div>
                    </div>
                  </div>
                  <p className="text-[12px] text-(--muted) leading-relaxed">{doc.bio}</p>
                  <button onClick={() => document.getElementById('notify-form')?.scrollIntoView({ behavior: 'smooth' })} className="btn-dark text-[11px] py-2">
                    <span>Book Appointment</span>
                    <span className="arrow w-6 h-6"><Arrow s={10}/></span>
                  </button>
                </div>

                {/* ── Desktop layout (sm and above) ── */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-4 items-start">
                  <div className="sm:col-span-5">
                    <div
                      className="rounded-2xl sm:aspect-auto sm:h-50 md:h-65 flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                      style={{ background: doc.color }}
                    >
                      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 25%, rgba(255,255,255,0.15), transparent 65%)' }}/>
                      <div className="font-display text-[60px] text-white leading-none z-10 tracking-tight">{doc.initials}</div>
                    </div>
                  </div>
                  <div className="sm:col-span-7 pt-1">
                    <div
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide mb-2"
                      style={{ background: doc.color + '1A', color: doc.color }}
                    >{doc.role}</div>
                    <div className="font-display text-[18px] leading-snug" style={{ color: 'var(--navy)' }}>{doc.name}</div>
                    <div className="text-[11px] text-(--muted) mt-0.5 mb-3 leading-snug">{doc.specialty}</div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {doc.quals.map(q => (
                        <span key={q} className="px-2 py-0.5 rounded-full text-[9.5px] font-medium bg-white border border-(--line) text-(--navy)">{q}</span>
                      ))}
                    </div>
                    <p className="text-[12px] text-(--muted) leading-relaxed">{doc.bio}</p>
                    <button onClick={() => document.getElementById('notify-form')?.scrollIntoView({ behavior: 'smooth' })} className="btn-dark mt-4 text-[11px] py-2">
                      <span>Book Appointment</span>
                      <span className="arrow w-6 h-6"><Arrow s={10}/></span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/60">
              <span className="text-[12px] text-(--muted) mono">
                {String(docIdx + 1).padStart(2, '0')} / {String(doctors.length).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                <button onClick={prevDoc} aria-label="Previous doctor" className="w-10 h-10 rounded-full bg-white text-(--navy) flex items-center justify-center cursor-pointer">
                  <ArrowLeft s={14} c="#012257"/>
                </button>
                <button onClick={nextDoc} aria-label="Next doctor" className="w-10 h-10 rounded-full bg-(--navy) text-white flex items-center justify-center cursor-pointer">
                  <ArrowRight s={14} c="#fff"/>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right - heading + image */}
        <motion.div
          className="col-span-12 md:col-span-6 md:pt-6"
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.05]" style={{ color: 'var(--navy)' }}>
            Built by the doctors who'll treat you.
          </h2>
          <div className="mt-8 md:mt-16 flex items-start gap-5 sm:gap-6">
            <motion.div className="relative shrink-0" variants={scaleIn}>
              <div className="w-27.5 h-27.5 sm:w-35 sm:h-35 rounded-2xl overflow-hidden relative">
                <HospitalPhoto src={interiorFooterImg} alt="UniCare Hospital interior" />
              </div>
              <button onClick={() => document.getElementById('notify-form')?.scrollIntoView({ behavior: 'smooth' })} aria-label="See more about founders" className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-(--navy) text-white flex items-center justify-center cursor-pointer">
                <Plus s={18} c="#fff"/>
              </button>
            </motion.div>
            <div className="flex-1">
              <div className="font-display text-[20px] leading-none text-(--teal)">Integrated healthcare</div>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-(--muted) mt-2">
                No more scattered reports or lost prescriptions. At UniCare, your entire health journey lives in one integrated app.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
