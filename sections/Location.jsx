import { motion } from 'framer-motion';
import { Arrow, Pin, Phone } from '../components/icons';
import { fadeUp, scaleIn, slideLeft, stagger, vp } from '../lib/animations';

const distances = [
  ['Narsingi',          '5 min'],
  ['Financial District','10 min'],
  ['Gachibowli',        '12 min'],
  ['Manikonda',         '8 min'],
];

const headingStagger = stagger(0.1, 0);
const distanceStagger = stagger(0.08, 0.2);

export default function Location() {
  return (
    <section id="location" className="px-4 sm:px-6 py-12 sm:py-16 relative overflow-x-hidden scroll-mt-32 lg:scroll-mt-40" data-screen-label="06 Location">
      <div className="max-w-330 mx-auto">

        {/* Section heading */}
        <motion.div
          className="flex flex-col items-center text-center mb-8 md:mb-10"
          variants={headingStagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <motion.span variants={fadeUp} className="pill text-[12px] inline-flex items-center gap-2">
            <Pin s={11} c="#2CAAA0"/> Our Location
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[32px] md:text-[44px] lg:text-[56px] leading-[1.05] mt-5"
            style={{ color: 'var(--navy)' }}
          >
            Visit us in Kokapet.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[14px] sm:text-[15px] text-(--muted) mt-3 leading-relaxed max-w-130 px-2">
            Serving Narsingi, Financial District, Gachibowli and Manikonda — the best care is never more than a few minutes away.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* Left info panel - slides from left */}
          <motion.div
            className="col-span-12 lg:col-span-4"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <div className="h-full rounded-[20px] sm:rounded-[28px] bg-(--navy) text-white p-5 sm:p-7 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-80 lg:min-h-130">

              <svg viewBox="0 0 220 220" className="absolute -right-8 -top-8 w-50 opacity-[.07] pointer-events-none" aria-hidden="true">
                <circle cx="110" cy="110" r="100" fill="none" stroke="#2CAAA0" strokeWidth="1.5"/>
                <circle cx="110" cy="110" r="70"  fill="none" stroke="#2CAAA0" strokeWidth="1.5"/>
                <circle cx="110" cy="110" r="40"  fill="none" stroke="#2CAAA0" strokeWidth="1.5"/>
              </svg>

              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-white/55 mb-6">
                  <Pin s={11} c="#2CAAA0"/> Location
                </span>
                <h2 className="font-display text-[32px] sm:text-[40px] leading-[1.05]">
                  In the heart<br/>of Kokapet.
                </h2>
              </div>

              {/* Distance list - staggered */}
              <motion.div
                className="flex flex-col mt-6 lg:mt-0"
                variants={distanceStagger}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
              >
                {distances.map(([place, t], i) => (
                  <motion.div
                    key={place}
                    variants={fadeUp}
                    className={`flex items-center justify-between py-3 sm:py-3.5 ${i > 0 ? 'border-t border-white/8' : ''}`}
                  >
                    <span className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] text-white/85">
                      <span className="w-1.5 h-1.5 rounded-full bg-(--teal) shrink-0"/>
                      {place}
                    </span>
                    <span className="mono text-[12px] text-white/50 bg-white/[.07] px-3 py-1 rounded-full">{t}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex flex-col gap-2.5 pt-6 border-t border-white/10">
                <a href="tel:+919090546363" className="w-full bg-white text-(--navy) rounded-2xl px-4 py-3 text-[13px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer">
                  <Phone s={13} c="#012257"/> +91 9090546363
                </a>
                <a href="https://www.google.com/maps/place/UniCare+Hospitals/@17.390425,78.3436576,21z/data=!4m14!1m7!3m6!1s0x3bcb95005da665df:0x2bd6417591e43792!2sSaanvi+Antalya+Homes!8m2!3d17.3904212!4d78.3436241!16s%2Fg%2F11vyrdgvv5!3m5!1s0x3bcb91dc874272cd:0xbc4ad3918afe8fcb!8m2!3d17.3902459!4d78.3437231!16s%2Fg%2F11zb6wm04j?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="w-full rounded-2xl px-4 py-3 text-[12px] inline-flex items-center justify-center gap-1.5 border border-white/20 text-white/80 hover:bg-white/5 transition-colors text-center leading-snug">
                  A 201, 2nd Floor, Saanvi Antalya Homes,<br/>Kokapet, Telangana
                </a>
              </div>

            </div>
          </motion.div>

          {/* Map panel - scale in */}
          <motion.div
            className="col-span-12 lg:col-span-8"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <div className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden min-h-80 sm:min-h-96 lg:min-h-130 h-full" style={{ background: '#E6F4F2' }}>

              <svg viewBox="0 0 800 520" className="absolute inset-0 w-full h-full z-10 pointer-events-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0V40" fill="none" stroke="#012257" strokeOpacity=".05" strokeWidth="1"/>
                  </pattern>
                  <linearGradient id="lake" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2CAAA0" stopOpacity=".3"/>
                    <stop offset="1" stopColor="#012257" stopOpacity=".2"/>
                  </linearGradient>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#012257" floodOpacity=".15"/>
                  </filter>
                </defs>

                <rect width="800" height="520" fill="url(#mapGrid)"/>
                <path d="M0 60 L240 80 L260 200 L120 260 L0 240 Z"         fill="#D5ECE9" opacity=".8"/>
                <path d="M520 40 L800 60 L800 220 L580 240 L500 160 Z"     fill="#D5ECE9" opacity=".6"/>
                <path d="M180 330 L420 310 L520 420 L300 490 L160 450 Z"   fill="#D5ECE9" opacity=".75"/>
                <path d="M540 290 q70 -45 150 -8 q60 32 38 95 q-22 63 -115 62 q-92 0 -122 -52 q-28 -52 49 -97 Z" fill="url(#lake)"/>
                <text x="620" y="382" fontFamily="Inter, sans-serif" fontSize="12" fill="#012257" opacity=".45" fontStyle="italic">Osman Sagar</text>
                <path d="M-20 390 Q 200 330 400 370 T 820 310" fill="none" stroke="#fff"    strokeWidth="16" strokeLinecap="round"/>
                <path d="M-20 390 Q 200 330 400 370 T 820 310" fill="none" stroke="#012257" strokeWidth="2"  strokeDasharray="7 9" opacity=".3"/>
                <path d="M130 -10 Q 210 205 385 268 T 488 530" fill="none" stroke="#fff"    strokeWidth="12" strokeLinecap="round"/>
                <path d="M130 -10 Q 210 205 385 268 T 488 530" fill="none" stroke="#012257" strokeWidth="1.5" strokeDasharray="6 8" opacity=".28"/>
                <path d="M-20 185 Q 165 225 285 205 T 545 145 T 820 105"  fill="none" stroke="#fff"    strokeWidth="9" strokeLinecap="round" opacity=".9"/>
                <text x="60" y="378" fontFamily="ui-monospace, monospace" fontSize="9" fill="#012257" opacity=".4" letterSpacing="2">OUTER RING ROAD</text>
                <g fontFamily="ui-monospace, monospace" fontSize="10" fill="#012257">
                  <circle cx="185" cy="125" r="4" fill="#012257" opacity=".4"/>
                  <rect x="198" y="114" width="84" height="20" rx="10" fill="#fff" opacity=".85"/>
                  <text x="206" y="128" opacity=".7" fontSize="9.5">Narsingi · 5 min</text>
                  <circle cx="645" cy="105" r="4" fill="#012257" opacity=".4"/>
                  <rect x="490" y="94" width="142" height="20" rx="10" fill="#fff" opacity=".85"/>
                  <text x="498" y="108" opacity=".7" fontSize="9.5">Financial District · 10 min</text>
                  <circle cx="705" cy="205" r="4" fill="#012257" opacity=".4"/>
                  <rect x="568" y="218" width="120" height="20" rx="10" fill="#fff" opacity=".85"/>
                  <text x="576" y="232" opacity=".7" fontSize="9.5">Gachibowli · 12 min</text>
                </g>
                {/* Pulsing ring - anchored at pin tip (390, 289) in SVG space */}
                <circle cx="390" cy="289" r="14" fill="none" stroke="#2CAAA0" strokeWidth="2">
                  <animate attributeName="r" values="14;52;52" dur="2.4s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.65;0;0" dur="2.4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="390" cy="255" r="52" fill="#2CAAA0" opacity=".1"/>
                <circle cx="390" cy="255" r="34" fill="#2CAAA0" opacity=".18"/>
                <g transform="translate(390 255)" filter="url(#shadow)">
                  <path d="M0 -26 a20 20 0 1 1 -0.1 0 Z M0 34 L-12 8 L12 8 Z" fill="#012257"/>
                  <circle cx="0" cy="-6" r="8" fill="#2CAAA0"/>
                </g>
              </svg>

              {/* Popup card */}
              <div className="absolute z-20" style={{ left: '50%', top: '36%', transform: 'translateX(-50%)' }}>
                <div className="bg-white rounded-2xl pl-2 pr-3 sm:pr-4 py-2 flex items-center gap-2 sm:gap-2.5 shadow-lg whitespace-nowrap">
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-(--teal) text-white flex items-center justify-center shrink-0">
                    <Pin s={14} c="#fff"/>
                  </span>
                  <div className="text-left">
                    <div className="text-[11.5px] sm:text-[12.5px] font-semibold text-(--navy)">UniCare Hospitals</div>
                    <div className="text-[9.5px] sm:text-[10.5px] text-(--muted)">A 201, 2nd Floor, Saanvi Antalya Homes</div>
                    <div className="text-[9px] sm:text-[9.5px] text-(--muted)/70">Kokapet, Telangana</div>
                  </div>
                </div>
              </div>

              {/* Zoom controls */}
              <div className="absolute z-20 top-3 sm:top-4 right-3 sm:right-4 flex flex-col gap-1.5">
                <button aria-label="Zoom in" className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white text-(--navy) flex items-center justify-center shadow-sm text-base font-bold cursor-pointer">+</button>
                <button aria-label="Zoom out" className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white text-(--navy) flex items-center justify-center shadow-sm text-base font-bold leading-none cursor-pointer">−</button>
              </div>

              {/* Bottom bar */}
              <div className="absolute z-20 left-3 sm:left-4 bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center justify-between gap-2 sm:gap-3 flex-wrap">
                <span className="pill text-[11px] sm:text-[12px] inline-flex items-center gap-1.5 shadow-sm">
                  <Pin s={11}/> Kokapet
                </span>
                <a href="https://www.google.com/maps/place/UniCare+Hospitals/@17.390425,78.3436576,21z/data=!4m14!1m7!3m6!1s0x3bcb95005da665df:0x2bd6417591e43792!2sSaanvi+Antalya+Homes!8m2!3d17.3904212!4d78.3436241!16s%2Fg%2F11vyrdgvv5!3m5!1s0x3bcb91dc874272cd:0xbc4ad3918afe8fcb!8m2!3d17.3902459!4d78.3437231!16s%2Fg%2F11zb6wm04j?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="btn-dark text-[11px] sm:text-[12px]">
                  <span>Get Directions</span>
                  <span className="arrow"><Arrow s={11}/></span>
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
