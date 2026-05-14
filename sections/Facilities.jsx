import { useState } from 'react';
import { motion } from 'framer-motion';
import { Arrow, ArrowLeft, ArrowRight } from '../components/icons';
import HospitalPhoto from '../components/HospitalPhoto';
import maternityImg from '../assets/maternity.png';
import pediatricImg from '../assets/pediatric.png';
import orthoImg from '../assets/ortho.png';
import generalMedImg from '../assets/general-medicine.png';
import surgeryImg from '../assets/surgery-ot.png';
import pharmacyImg from '../assets/pharmacy.png';
import labImg from '../assets/diagnostics.png';
import { fadeUp, stagger, vp } from '../lib/animations';

const facilitiesData = [
  { tag: "Maternity & Women's Health", title: "From first scan to a\npremium delivery experience", img: maternityImg },
  { tag: 'Paediatrics', title: 'Newborn to teenage -\npatient, kind, trusted', img: pediatricImg },
  { tag: 'Orthopaedics', title: 'Back, knee & joint care\nfor IT professionals', img: orthoImg },
  { tag: 'General Medicine', title: 'Diabetes, BP, thyroid -\nthe family doctor, modernised', img: generalMedImg },
  { tag: 'General Surgery', title: 'Minimally invasive surgery\nwith personal accountability', img: surgeryImg },
  { tag: 'Pharmacy', title: 'In-house pharmacy,\neverything you need on-site', img: pharmacyImg },
  { tag: 'Lab', title: 'In-house diagnostics &\nfast turnaround reports', img: labImg },
];

const cardStagger = stagger(0.1, 0.1);

const scrollToForm = () => document.getElementById('notify-form')?.scrollIntoView({ behavior: 'smooth' });

function Card({ f }) {
  return (
    <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 hover-lift w-full shrink-0">
      <HospitalPhoto src={f.img} alt={f.tag} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(1,34,87,.2) 0%, rgba(1,34,87,0) 35%, rgba(1,34,87,.75) 100%)' }}/>
      <div className="absolute left-3 top-3">
        <span className="chip">{f.tag}</span>
      </div>
      <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
        <div className="text-white font-display text-[17px] leading-snug whitespace-pre-line">{f.title}</div>
        <button onClick={scrollToForm} aria-label={`View ${f.tag} details`} className="w-9 h-9 rounded-full bg-white text-(--navy) flex items-center justify-center shrink-0 cursor-pointer">
          <Arrow s={12}/>
        </button>
      </div>
    </div>
  );
}

function NavControls({ idx, total, onPrev, onNext, onDot }) {
  return (
    <div className="flex items-center gap-3 mt-6">
      <button onClick={onPrev} aria-label="Previous" className="w-10 h-10 rounded-full border border-(--line) bg-white flex items-center justify-center cursor-pointer">
        <ArrowLeft s={13} c="#012257"/>
      </button>
      <button onClick={onNext} aria-label="Next" className="w-10 h-10 rounded-full bg-(--navy) text-white flex items-center justify-center cursor-pointer">
        <ArrowRight s={13} c="#fff"/>
      </button>
      <div className="flex items-center gap-1.5 ml-1">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            aria-label={`Go to ${i + 1}`}
            aria-current={i === idx ? 'true' : undefined}
            className="rounded-full transition-all cursor-pointer"
            style={{ width: i === idx ? 22 : 8, height: 8, background: i === idx ? 'var(--navy)' : 'rgba(1,34,87,.25)' }}
          />
        ))}
      </div>
      <span className="mono text-[12px] text-(--muted) ml-auto">
        {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
}

export default function Facilities() {
  // Desktop: 3 cards per page (2 pages)
  const PER_PAGE = 3;
  const totalPages = Math.ceil(facilitiesData.length / PER_PAGE);
  const [page, setPage] = useState(0);
  const nextPage = () => setPage(p => (p + 1) % totalPages);
  const prevPage = () => setPage(p => (p - 1 + totalPages) % totalPages);

  // Mobile: 1 card per step (6 steps)
  const [mobileIdx, setMobileIdx] = useState(0);
  const nextMobile = () => setMobileIdx(i => (i + 1) % facilitiesData.length);
  const prevMobile = () => setMobileIdx(i => (i - 1 + facilitiesData.length) % facilitiesData.length);

  return (
    <section id="specialties" className="px-4 sm:px-6 py-6 sm:py-8 scroll-mt-32 lg:scroll-mt-40" data-screen-label="04 Facilities">
      <div className="max-w-330 mx-auto">
        <div className="rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 md:p-12" style={{ background: 'var(--teal-soft)' }}>

          {/* Header */}
          <motion.div
            className="flex items-start sm:items-center justify-between gap-4 flex-wrap mb-6 sm:mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <div className="flex items-start sm:items-center gap-3 flex-wrap">
              <span className="pill text-[12px]">What to Expect</span>
              <h2 className="font-display text-[22px] sm:text-[28px] md:text-[34px]" style={{ color: 'var(--navy)' }}>
                Seven specialties. One neighbourhood hospital.
              </h2>
            </div>
            <button onClick={() => document.getElementById('notify-form')?.scrollIntoView({ behavior: 'smooth' })} className="btn-dark cursor-pointer">
              <span>Reserve My Spot</span>
              <span className="arrow"><Arrow s={12}/></span>
            </button>
          </motion.div>

          {/* ── Mobile carousel: 1 card at a time ── */}
          <div className="md:hidden">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${mobileIdx * 100}%)` }}
              >
                {facilitiesData.map((f, i) => (
                  <Card key={i} f={f} />
                ))}
              </div>
            </div>
            <NavControls
              idx={mobileIdx}
              total={facilitiesData.length}
              onPrev={prevMobile}
              onNext={nextMobile}
              onDot={setMobileIdx}
            />
          </div>

          {/* ── Desktop carousel: 3 cards per page ── */}
          <div className="hidden md:block">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, pi) => (
                  <motion.div
                    key={pi}
                    className="w-full shrink-0 grid grid-cols-3 gap-5"
                    variants={pi === page ? cardStagger : {}}
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                  >
                    {facilitiesData.slice(pi * PER_PAGE, pi * PER_PAGE + PER_PAGE).map((f, i) => (
                      <motion.div key={i} variants={fadeUp}>
                        <Card f={f} />
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-end justify-between gap-6 mt-8 flex-wrap">
              <NavControls
                idx={page}
                total={totalPages}
                onPrev={prevPage}
                onNext={nextPage}
                onDot={setPage}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
