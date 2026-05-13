import { motion } from 'framer-motion';
import { ArrowRight, Pin, InstaIc, XIc, FbIc } from '../components/icons';
import { fadeUp, scaleIn, stagger, vp } from '../lib/animations';

const iconStagger = stagger(0.06, 0.1);

export default function Footer() {
  return (
    <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-6 sm:pb-8" data-screen-label="07 Footer">
      <div className="max-w-[1320px] mx-auto">

        {/* Text + links */}
        <motion.div
          className="text-center max-w-sm sm:max-w-140 mx-auto mb-8 sm:mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <p className="text-[13px] sm:text-[14px] text-(--muted) leading-relaxed">
            UniCare Hospital — Expert Care, Close to Home. A boutique multispecialty hospital opening soon in Kokapet, Hyderabad. Founded by practising doctors.
          </p>
          <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 flex-wrap">
            <a href="mailto:hello@unicarehospital.in" className="pill text-[12px] sm:text-[12.5px] inline-flex items-center gap-1.5">hello@unicarehospital.in <ArrowRight s={11}/></a>
            <a href="mailto:corporate@unicarehospital.in" className="pill text-[12px] sm:text-[12.5px] inline-flex items-center gap-1.5">corporate@unicarehospital.in <ArrowRight s={11}/></a>
            <a href="/privacy" className="pill text-[12px] sm:text-[12.5px] inline-flex items-center gap-1.5">Privacy Policy <ArrowRight s={11}/></a>
          </div>
        </motion.div>

        {/* Marquee */}
        <div className="overflow-hidden" aria-hidden="true">
          <div
            className="marquee-track flex whitespace-nowrap"
            style={{ animation: 'marquee 18s linear infinite' }}
          >
            {[0, 1].map(i => (
              <span
                key={i}
                className="font-display leading-[0.9] tracking-[-0.04em] shrink-0 pr-16"
                style={{ color: 'var(--navy)', fontSize: 'clamp(48px, 10vw, 160px)', fontWeight: 700 }}
              >
                UNICARE HOSPITAL
              </span>
            ))}
          </div>
        </div>

        <div className="vline mt-10 sm:mt-16"/>

        <div className="pt-5 sm:pt-6 flex items-center justify-between gap-4 flex-wrap">
          <motion.div
            className="flex items-center gap-2 text-[12px] sm:text-[13px] text-(--navy)"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <Pin s={14}/> Kokapet, Hyderabad
          </motion.div>

          {/* Social icons — staggered scale-in */}
          <motion.div
            className="flex items-center gap-3"
            variants={iconStagger}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <motion.a variants={scaleIn} href="https://instagram.com/unicarehospital" aria-label="UniCare on Instagram" className="w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--navy)"><InstaIc s={14} c="#012257"/></motion.a>
            <motion.a variants={scaleIn} href="https://x.com/unicarehospital" aria-label="UniCare on X (Twitter)" className="w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--navy)"><XIc s={13} c="#012257"/></motion.a>
            <motion.a variants={scaleIn} href="https://facebook.com/unicarehospital" aria-label="UniCare on Facebook" className="w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--navy)"><FbIc s={14} c="#012257"/></motion.a>
          </motion.div>

          <motion.div
            className="text-[11px] sm:text-[12px] text-(--muted)"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            © 2026 UniCare Hospital. All rights reserved.
          </motion.div>
        </div>

      </div>
    </section>
  );
}
