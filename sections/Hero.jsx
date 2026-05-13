import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Arrow, Play, Menu } from '../components/icons';
import Logo from '../components/Logo';
import heroBg from '../assets/hospital-exterior-main.png';
import { fadeIn, fadeUp, stagger } from '../lib/animations';

const navLinks = [
  { label: 'Our Story',   id: 'our-story'   },
  { label: 'Founders',    id: 'founders'     },
  { label: 'Specialties', id: 'specialties'  },
  { label: 'Location',    id: 'location'     },
];

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const scrollToForm = () => scrollTo('notify-form');

const glassStyle = {
  background: 'rgba(255,255,255,0.10)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.22)',
  transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
};

const pinnedStyle = {
  background: 'rgba(255,255,255,0.94)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(1,34,87,0.10)',
  boxShadow: '0 18px 48px rgba(1,34,87,0.12)',
  transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
};

const navVariants = stagger(0.07, 0.1);

export default function Hero() {
  const sceneRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  });

  const shellInset = useTransform(scrollYProgress, [0, 0.55], [16, 0]);
  const shellRadius = useTransform(scrollYProgress, [0, 0.55], [28, 0]);
  const shellClip = useMotionTemplate`inset(${shellInset}px round ${shellRadius}px)`;
  const foregroundScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.08]);
  const foregroundY = useTransform(scrollYProgress, [0, 0.6], [10, 0]);
  const proofScale = useTransform(scrollYProgress, [0, 0.6], [0.96, 1]);
  const proofY = useTransform(scrollYProgress, [0, 0.6], [12, 0]);

  useEffect(() => {
    const threshold = prefersReducedMotion ? 80 : window.innerHeight * 0.5;
    const onScroll = () => setPinned(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReducedMotion]);

  const textCls = pinned ? 'text-(--navy)' : 'text-white/90';
  const arrowStyle = pinned
    ? { width: 28, height: 28, minWidth: 28, minHeight: 28, borderRadius: '9999px', background: 'rgba(1,34,87,0.10)', color: '#012257', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', lineHeight: 0 }
    : undefined;

  // Portal ensures the navbar is rendered directly under <body>, fully escaping
  // any CSS stacking contexts created by the hero's clipPath animation.
  const navbar = createPortal(
    <motion.div
      className="fixed z-9999 px-4 sm:px-6 pt-1 sm:pt-2"
      style={prefersReducedMotion
        ? { ...(pinned ? pinnedStyle : glassStyle), top: 0, left: 0, right: 0 }
        : {
            ...(pinned ? pinnedStyle : glassStyle),
            top: shellInset,
            left: shellInset,
            right: shellInset,
            borderRadius: shellRadius,
          }
      }
      variants={prefersReducedMotion ? {} : navVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Desktop */}
      <div className="hidden lg:flex items-center gap-2 rounded-full px-3 py-0">
        <motion.div variants={fadeIn}>
          <Logo className="h-32 w-auto shrink-0" />
        </motion.div>
        <div className="flex-1" />
        <div className="flex items-center gap-0.5">
          {navLinks.map(({ label, id }) => (
            <motion.button
              key={id}
              variants={fadeIn}
              onClick={() => scrollTo(id)}
              className={`${textCls} text-[13px] font-medium px-3.5 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap ${pinned ? 'hover:bg-(--bg)' : 'hover:bg-white/10'}`}
            >{label}</motion.button>
          ))}
        </div>
        <div className={`w-px h-6 mx-1 shrink-0 ${pinned ? 'bg-(--line)' : 'bg-white/20'}`} />
        <motion.button
          variants={fadeIn}
          onClick={scrollToForm}
          className={`text-[13px] py-2 pl-4 shrink-0 cursor-pointer rounded-full inline-flex items-center gap-2 ${pinned ? 'bg-(--navy) text-white' : 'btn-dark'}`}
        >
          <span>Book Appointment</span>
          <span className="arrow" style={arrowStyle}>
            <Arrow s={10} c={pinned ? '#fff' : '#012257'} />
          </span>
        </motion.button>
      </div>

      {/* Mobile bar */}
      <div className="lg:hidden flex items-center justify-between rounded-full px-3 py-2">
        <Logo className="h-18 w-auto" />
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: pinned ? 'rgba(1,34,87,0.08)' : 'rgba(255,255,255,0.15)' }}
        >
          <Menu s={16} c={pinned ? '#012257' : '#fff'} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden mt-2 rounded-2xl p-4 flex flex-col gap-1" style={pinned ? pinnedStyle : glassStyle}>
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setOpen(false); }}
              className={`text-left text-[14px] font-medium py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${textCls} ${pinned ? 'hover:bg-(--bg)' : 'hover:bg-white/10'}`}
            >{label}</button>
          ))}
          <div className={`my-2 h-px ${pinned ? 'bg-(--line)' : 'bg-white/20'}`} />
          <button onClick={scrollToForm} className="w-full justify-center cursor-pointer btn-dark">
            <span>Book an Appointment</span>
            <span className="arrow"><Arrow s={12}/></span>
          </button>
        </div>
      )}
    </motion.div>,
    document.body
  );

  return (
    <>
      <section ref={sceneRef} className="relative h-[210vh] bg-white" data-screen-label="01 Hero">
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* ── Animated shell (hero image + content) ── */}
          <motion.div
            className="relative h-full overflow-hidden"
            style={prefersReducedMotion ? {} : { clipPath: shellClip }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={heroBg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover ken-burns"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(1,34,87,.55) 0%, rgba(1,34,87,.10) 40%, rgba(1,34,87,.55) 100%)' }}/>
            </div>

            {/* Hero content */}
            <motion.div
              className="relative z-10 mt-28 sm:mt-36 lg:mt-44 px-4 sm:px-6 lg:px-10 max-w-184"
              style={prefersReducedMotion ? undefined : { scale: foregroundScale, y: foregroundY, transformOrigin: 'top left' }}
            >
              <motion.div className="chip mb-5 sm:mb-6 w-fit text-[12px] sm:text-[13px] px-3.5 py-2" variants={fadeUp} initial="hidden" animate="visible">
                <span className="dot" style={{ background: '#2CAAA0' }}/> Kokapet, Hyderabad
              </motion.div>

              <motion.h1
                className="font-display text-white text-[48px] sm:text-[72px] lg:text-[96px] leading-[0.96] tracking-[-0.03em]"
                variants={fadeUp} initial="hidden" animate="visible"
              >
                Expert Care,<br/>Close to{' '}<br className="sm:hidden"/>Home.
              </motion.h1>

              <motion.p
                className="text-white/95 text-[16px] sm:text-[18px] max-w-136 mt-5 sm:mt-7 leading-relaxed"
                variants={fadeUp} initial="hidden" animate="visible"
              >
                A new generation of family hospital, founded by practising doctors. Located in the heart of Kokapet.
              </motion.p>

              <motion.div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3.5" variants={fadeUp} initial="hidden" animate="visible">
                <button onClick={scrollToForm} className="btn-dark text-[15px] sm:text-[16px] py-3.5 pl-5.5 cursor-pointer">
                  <span>Book an Appointment</span>
                  <span className="arrow"><Arrow s={13}/></span>
                </button>
                <button onClick={scrollToForm} className="pill pill-ghost text-white flex items-center gap-2 py-3.5 px-5.5 cursor-pointer text-[15px] sm:text-[16px]">
                  <Play s={11}/> Watch our story
                </button>
              </motion.div>
            </motion.div>

            {/* Bottom-right social proof */}
            <motion.div
              className="hidden lg:block absolute right-8 bottom-12 z-10 max-w-60"
              style={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: proofScale, y: proofY, transformOrigin: 'bottom right' }}
            >
              <div className="flex -space-x-3 mb-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-11 h-11 rounded-full border-2 border-white overflow-hidden" style={{ background: `hsl(${190 + i * 15} 30% ${60 + i * 4}%)` }}>
                    <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
                      <circle cx="20" cy="16" r="7" fill="#fff" opacity=".9"/>
                      <path d="M6 38c2-8 10-10 14-10s12 2 14 10" fill="#fff" opacity=".9"/>
                    </svg>
                  </div>
                ))}
              </div>
              <p className="text-white/90 text-[12.5px] leading-snug">
                Founded by practising doctors. The hospital we always wished existed in our own neighbourhood.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>
      {navbar}
    </>
  );
}
