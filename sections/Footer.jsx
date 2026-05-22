import { motion } from 'framer-motion';
import { ArrowRight, Pin, InstaIc, XIc, FbIc, LinkedInIc } from '../components/icons';
import { fadeUp, scaleIn, stagger, vp } from '../lib/animations';
import Logo from '../components/Logo';

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
          <Logo className="h-16 w-auto mx-auto mb-5" />
          <p className="text-[13px] sm:text-[14px] text-(--muted) leading-relaxed">
            Expert Care, Close to Home. A boutique family hospital in Kokapet, Hyderabad. Founded by practising doctors.
          </p>
          <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 flex-wrap">
            <a href="mailto:info@unicareglobalhospitals.com" className="pill text-[12px] sm:text-[12.5px] inline-flex items-center gap-1.5">info@unicareglobalhospitals.com <ArrowRight s={11}/></a>
            <a href="mailto:helpdesk@unicareglobalhospitals.com" className="pill text-[12px] sm:text-[12.5px] inline-flex items-center gap-1.5">helpdesk@unicareglobalhospitals.com <ArrowRight s={11}/></a>
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
                UNICARE HOSPITALS
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

          {/* Social icons - staggered scale-in */}
          <motion.div
            className="flex items-center gap-3"
            variants={iconStagger}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <motion.a variants={scaleIn} href="https://www.instagram.com/unicarehospital_/" target="_blank" rel="noopener noreferrer" aria-label="UniCare on Instagram" className="w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--navy)"><InstaIc s={14} c="#012257"/></motion.a>
            <motion.a variants={scaleIn} href="https://x.com/unicarehyd" target="_blank" rel="noopener noreferrer" aria-label="UniCare on X" className="w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--navy)"><XIc s={13} c="#012257"/></motion.a>
            <motion.a variants={scaleIn} href="https://www.facebook.com/profile.php?id=61589321121365" target="_blank" rel="noopener noreferrer" aria-label="UniCare on Facebook" className="w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--navy)"><FbIc s={14} c="#012257"/></motion.a>
            <motion.a variants={scaleIn} href="https://linkedin.com/company/unicare-hospital-hyd/" target="_blank" rel="noopener noreferrer" aria-label="UniCare on LinkedIn" className="w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--navy)"><LinkedInIc s={14} c="#012257"/></motion.a>
          </motion.div>

          <motion.div
            className="text-[11px] sm:text-[12px] text-(--muted)"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            © 2026 UniCare Hospitals. All rights reserved.
          </motion.div>
        </div>

      </div>
    </section>
  );
}
