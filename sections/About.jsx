import { useState } from 'react';
import { motion } from 'framer-motion';
import { Arrow, ArrowLeft, ArrowRight, Pin } from '../components/icons';
import HospitalPhoto from '../components/HospitalPhoto';
import exteriorMainImg from '../assets/hospital-exterior-main.png';
import { fadeUp, scaleIn, stagger, vp } from '../lib/animations';

const headingStagger = stagger(0.1, 0);

const areas = [
  { name: 'Narsingi',           time: '5 min',  cx: 185, cy: 125, viewBox: '0 30 450 300'   },
  { name: 'Financial District', time: '10 min', cx: 645, cy: 105, viewBox: '360 20 440 300'  },
  { name: 'Gachibowli',        time: '12 min', cx: 705, cy: 205, viewBox: '380 60 420 300'  },
  { name: 'Manikonda',         time: '8 min',  cx: 300, cy: 390, viewBox: '60 220 480 300'  },
];

export default function About() {
  const [areaIdx, setAreaIdx] = useState(0);
  const area = areas[areaIdx];
  const nextArea = () => setAreaIdx(i => (i + 1) % areas.length);
  const prevArea = () => setAreaIdx(i => (i - 1 + areas.length) % areas.length);

  return (
    <section className="px-4 sm:px-6 py-14 lg:py-28" data-screen-label="02 About">
      <div className="max-w-330 mx-auto">

        {/* Section heading - staggered fade-up */}
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
                For too long, Kokapet families had two choices - a corporate hospital 15km away, or a clinic that couldn't handle anything serious.
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-(--muted)">
                UniCare exists to end that compromise. A boutique multispecialty hospital with the warmth of a family doctor and the capability of a specialist centre.
              </p>
            </div>
            <div className="mt-6 md:mt-8">
              <button className="btn-dark"><span>Learn More</span><span className="arrow"><Arrow s={12}/></span></button>
            </div>
          </motion.div>

          {/* Center - large featured image */}
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

          {/* Right - mini-map + nav buttons */}
          <motion.div
            className="col-span-12 md:col-span-4"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            transition={{ delay: 0.1 }}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-50 sm:h-65 md:h-75" style={{ background: '#E6F4F2' }}>

              {/* SVG mini-map - viewBox pans on area change */}
              <svg
                viewBox={area.viewBox}
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
                style={{ transition: 'all 0.65s cubic-bezier(0.22,1,0.36,1)' }}
              >
                <defs>
                  <pattern id="aboutMapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0V40" fill="none" stroke="#012257" strokeOpacity=".05" strokeWidth="1"/>
                  </pattern>
                  <linearGradient id="aboutLake" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2CAAA0" stopOpacity=".25"/>
                    <stop offset="1" stopColor="#012257" stopOpacity=".15"/>
                  </linearGradient>
                  <filter id="aboutShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#012257" floodOpacity=".18"/>
                  </filter>
                </defs>

                {/* Background grid */}
                <rect width="800" height="520" fill="url(#aboutMapGrid)"/>

                {/* Green zones */}
                <path d="M0 60 L240 80 L260 200 L120 260 L0 240 Z"       fill="#D5ECE9" opacity=".8"/>
                <path d="M520 40 L800 60 L800 220 L580 240 L500 160 Z"   fill="#D5ECE9" opacity=".6"/>
                <path d="M180 330 L420 310 L520 420 L300 490 L160 450 Z" fill="#D5ECE9" opacity=".75"/>

                {/* Lake */}
                <path d="M540 290 q70 -45 150 -8 q60 32 38 95 q-22 63 -115 62 q-92 0 -122 -52 q-28 -52 49 -97 Z" fill="url(#aboutLake)"/>

                {/* Roads */}
                <path d="M-20 390 Q 200 330 400 370 T 820 310" fill="none" stroke="#fff"    strokeWidth="16" strokeLinecap="round"/>
                <path d="M-20 390 Q 200 330 400 370 T 820 310" fill="none" stroke="#012257" strokeWidth="2"  strokeDasharray="7 9" opacity=".25"/>
                <path d="M130 -10 Q 210 205 385 268 T 488 530" fill="none" stroke="#fff"    strokeWidth="12" strokeLinecap="round"/>
                <path d="M130 -10 Q 210 205 385 268 T 488 530" fill="none" stroke="#012257" strokeWidth="1.5" strokeDasharray="6 8" opacity=".22"/>
                <path d="M-20 185 Q 165 225 285 205 T 545 145 T 820 105" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity=".9"/>

                {/* Area pins - inactive */}
                {areas.map((a, i) => i !== areaIdx && (
                  <circle key={a.name} cx={a.cx} cy={a.cy} r="5" fill="#012257" opacity=".25"/>
                ))}

                {/* Active area pin + label */}
                <circle cx={area.cx} cy={area.cy} r="18" fill="#2CAAA0" opacity=".15"/>
                <circle cx={area.cx} cy={area.cy} r="10" fill="#2CAAA0" opacity=".3"/>
                <circle cx={area.cx} cy={area.cy} r="5" fill="#2CAAA0"/>
                {/* Label pill - offset right if near right edge */}
                <rect
                  x={area.cx > 600 ? area.cx - 130 : area.cx + 14}
                  y={area.cy - 11}
                  width={area.name === 'Financial District' ? 142 : area.name === 'Gachibowli' ? 110 : 100}
                  height={22}
                  rx="11"
                  fill="#fff"
                  opacity=".92"
                />
                <text
                  x={area.cx > 600 ? area.cx - 124 : area.cx + 20}
                  y={area.cy + 4}
                  fontFamily="ui-monospace, monospace"
                  fontSize="9.5"
                  fill="#012257"
                  opacity=".8"
                >
                  {area.name} · {area.time}
                </text>

                {/* UniCare pin at center */}
                <circle cx="390" cy="255" r="40" fill="#2CAAA0" opacity=".08"/>
                <circle cx="390" cy="255" r="26" fill="#2CAAA0" opacity=".15"/>
                <g transform="translate(390 255)" filter="url(#aboutShadow)">
                  <path d="M0 -22 a18 18 0 1 1 -0.1 0 Z M0 28 L-10 6 L10 6 Z" fill="#012257"/>
                  <circle cx="0" cy="-4" r="7" fill="#2CAAA0"/>
                </g>
              </svg>

              {/* Gradient overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(1,34,87,.1) 0%, rgba(1,34,87,0) 50%, rgba(1,34,87,.35) 100%)' }}/>

              {/* Top-left chip - updates with area */}
              <div className="absolute left-4 top-4">
                <span className="chip" style={{ transition: 'opacity 0.3s' }}>{area.name}</span>
              </div>

              {/* Bottom-left - distance pill */}
              <div className="absolute left-4 bottom-4">
                <span className="pill text-[12px] inline-flex items-center gap-1.5">
                  <Pin s={12}/> {area.time} away
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
              <p className="text-[13.5px] leading-relaxed text-(--muted) max-w-65">
                <span className="font-semibold text-(--navy)">{area.name}</span> · {area.time} from UniCare Hospital, Kokapet
              </p>
              <div className="flex gap-2 shrink-0">
                <button onClick={prevArea} aria-label="Previous area" className="w-10 h-10 rounded-full border border-(--line) flex items-center justify-center text-(--navy) cursor-pointer"><ArrowLeft s={14} c="#012257"/></button>
                <button onClick={nextArea} aria-label="Next area" className="w-10 h-10 rounded-full bg-(--navy) flex items-center justify-center text-white cursor-pointer"><ArrowRight s={14} c="#fff"/></button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
