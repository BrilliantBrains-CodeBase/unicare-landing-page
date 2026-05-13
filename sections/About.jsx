import { motion } from 'framer-motion';
import { Arrow, ArrowLeft, ArrowRight, Pin } from '../components/icons';
import HospitalPhoto from '../components/HospitalPhoto';
import exteriorMainImg from '../assets/hospital-exterior-main.png';
import exterior2Img from '../assets/hospital-exterior-2.png';
import { fadeUp, scaleIn, stagger, vp } from '../lib/animations';

const headingStagger = stagger(0.1, 0);

export default function About() {
  return (
    <section className="px-4 sm:px-6 py-14 lg:py-28" data-screen-label="02 About">
      <div className="max-w-330 mx-auto">

        {/* Section heading — staggered fade-up */}
        <motion.div
          className="flex flex-col items-center text-center mb-8 md:mb-14"
          variants={headingStagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <motion.span variants={fadeUp} className="pill text-[12px] inline-flex items-center gap-2">
            Our Story <ArrowRight s={12}/>
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[32px] md:text-[44px] lg:text-[56px] leading-[1.05] mt-5 max-w-225"
            style={{ color: 'var(--navy)' }}
          >
            Healthcare that finally<br/>feels close to home.
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-5 sm:gap-6">

          {/* Left text column */}
          <motion.div
            className="col-span-12 md:col-span-3 flex flex-col justify-between pt-2 md:pt-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <div>
              <span className="pill text-[12px]">Our Story</span>
              <p className="mt-5 text-[18px] md:text-[20px] leading-snug font-display" style={{ color: 'var(--navy)' }}>
                For too long, Kokapet families had two choices — a corporate hospital 15km away, or a clinic that couldn't handle anything serious.
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-(--muted)">
                UniCare exists to end that compromise. A boutique multispecialty hospital with the warmth of a family doctor and the capability of a specialist centre.
              </p>
            </div>
            <div className="mt-6 md:mt-8">
              <button className="btn-dark"><span>Learn More</span><span className="arrow"><Arrow s={12}/></span></button>
            </div>
          </motion.div>

          {/* Center — large featured image */}
          <motion.div
            className="col-span-12 md:col-span-5"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-65 sm:h-85 md:h-105">
              <HospitalPhoto src={exteriorMainImg} alt="UniCare Hospital building" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(1,34,87,.25) 0%, rgba(1,34,87,0) 40%, rgba(1,34,87,.55) 100%)' }}/>
              <div className="absolute left-4 top-4"><span className="chip">Coming 2026</span></div>
              <div className="absolute right-4 top-4 max-w-50 sm:max-w-70 text-right">
                <div className="text-white text-[16px] sm:text-[20px] font-display leading-tight">A boutique multispecialty hospital, built for western Hyderabad</div>
              </div>
              <div className="absolute left-4 bottom-4 flex items-center gap-2">
                <span className="pill text-[12px] inline-flex items-center gap-1.5"><Pin s={12}/> Kokapet, Hyderabad</span>
              </div>
              <div className="absolute right-4 bottom-4">
                <button aria-label="View hospital details" className="w-10 h-10 rounded-full bg-(--navy) text-white flex items-center justify-center cursor-pointer"><Arrow s={14}/></button>
              </div>
            </div>
          </motion.div>

          {/* Right — smaller image + nav buttons */}
          <motion.div
            className="col-span-12 md:col-span-4"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            transition={{ delay: 0.1 }}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-50 sm:h-65 md:h-75">
              <HospitalPhoto src={exterior2Img} alt="UniCare Hospital exterior" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(1,34,87,.15) 0%, rgba(1,34,87,0) 50%, rgba(1,34,87,.45) 100%)' }}/>
              <div className="absolute left-4 top-4"><span className="chip">5 min from Narsingi</span></div>
              <div className="absolute left-4 bottom-4"><span className="pill text-[12px] inline-flex items-center gap-1.5"><Pin s={12}/> Heart of Kokapet</span></div>
              <div className="absolute right-4 bottom-4">
                <button aria-label="View location" className="w-10 h-10 rounded-full bg-white text-(--navy) flex items-center justify-center cursor-pointer"><Arrow s={14}/></button>
              </div>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <p className="text-[13.5px] leading-relaxed text-(--muted) max-w-65">
                The warmth of a family doctor. The capability of a specialist centre. Expert Care, Close to Home.
              </p>
              <div className="flex gap-2 shrink-0">
                <button aria-label="Previous" className="w-10 h-10 rounded-full border border-(--line) flex items-center justify-center text-(--navy) cursor-pointer"><ArrowLeft s={14} c="#012257"/></button>
                <button aria-label="Next" className="w-10 h-10 rounded-full bg-(--navy) flex items-center justify-center text-white cursor-pointer"><ArrowRight s={14} c="#fff"/></button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
