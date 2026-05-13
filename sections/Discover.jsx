import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Arrow, ArrowLeft, ArrowRight, Plus, SunMark } from '../components/icons';
import HospitalPhoto from '../components/HospitalPhoto';
import expertDoctorsImg from '../assets/expert-doctors.png';
import exteriorImg from '../assets/hospital-exterior.png';
import { fadeUp, scaleIn, slideLeft, slideRight, stagger, vp } from '../lib/animations';

export default function Discover() {
  const [tab, setTab] = useState('Training');

  return (
    <section className="px-4 sm:px-6 py-12 border-t border-(--line)" data-screen-label="03 Discover">
      <div className="max-w-330 mx-auto grid grid-cols-12 gap-8 md:gap-12">

        {/* Left — tab selector + card */}
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
            {['Clinic', 'Training', 'Hospital'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-[13px] px-4 py-2 rounded-full border cursor-pointer transition-colors duration-200 ${tab === t ? 'bg-(--navy) text-white border-(--navy)' : 'border-(--line) text-(--navy) bg-white'}`}
              >{t}</button>
            ))}
          </div>

          <div className="rounded-3xl sm:rounded-[28px] p-4 sm:p-5 relative overflow-hidden" style={{ background: 'var(--teal-soft)' }}>
            {/* Tab content with AnimatePresence */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-5">
                    <div className="rounded-2xl overflow-hidden h-50 sm:h-65 relative">
                      <HospitalPhoto src={expertDoctorsImg} alt="UniCare expert doctors" />
                    </div>
                  </div>
                  <div className="col-span-7 pt-2">
                    <div className="font-display text-[18px] sm:text-[22px] leading-snug" style={{ color: 'var(--navy)' }}>Not a corporate hospital. A doctor-founded one.</div>
                    <p className="text-[12px] sm:text-[13px] text-(--muted) mt-3 leading-relaxed">
                      UniCare was founded by practising doctors who decided to build the hospital they always wished existed in their own neighbourhood. You'll meet them in person when we open.
                    </p>
                    <button className="btn-dark mt-4 text-[12px] py-2">
                      <span>Meet the Founders</span>
                      <span className="arrow w-6 h-6"><Arrow s={10}/></span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/60">
              <span className="text-[12px] text-(--muted) mono">01 / 03</span>
              <div className="flex gap-2">
                <button aria-label="Previous slide" className="w-10 h-10 rounded-full bg-white text-(--navy) flex items-center justify-center cursor-pointer">
                  <ArrowLeft s={14} c="#012257"/>
                </button>
                <button aria-label="Next slide" className="w-10 h-10 rounded-full bg-(--navy) text-white flex items-center justify-center cursor-pointer">
                  <ArrowRight s={14} c="#fff"/>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — heading + image */}
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
                <HospitalPhoto src={exteriorImg} alt="UniCare Hospital" />
              </div>
              <button aria-label="See more about founders" className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-(--navy) text-white flex items-center justify-center cursor-pointer">
                <Plus s={18} c="#fff"/>
              </button>
            </motion.div>
            <div className="flex-1">
              <div className="font-display text-[28px] leading-none text-(--teal)">*</div>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-(--muted) mt-2">
                Plus 24/7 emergency, ICU, in-house pharmacy, and ambulance services — everything a Kokapet family needs, in one neighbourhood hospital.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
