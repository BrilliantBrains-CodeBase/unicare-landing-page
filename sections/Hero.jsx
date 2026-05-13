import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Arrow, Play, Menu } from '../components/icons';
import Logo from '../components/Logo';
import heroVideo from '../assets/hero.mp4';
import { fadeIn, fadeUp, stagger } from '../lib/animations';

const navLinks = ['Our Story', 'Specialties', 'Founders', 'Location'];

const scrollToForm = () =>
  document.getElementById('notify-form')?.scrollIntoView({ behavior: 'smooth' });

const glassStyle = {
  background: 'rgba(255,255,255,0.10)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.22)',
};

export default function Hero() {
  const sceneRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isNavPinned, setIsNavPinned] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  });

  const shellInset = useTransform(scrollYProgress, [0, 0.55], [16, 0]);
  const shellRadius = useTransform(scrollYProgress, [0, 0.55], [28, 0]);
  const foregroundScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.08]);
  const foregroundY = useTransform(scrollYProgress, [0, 0.6], [10, 0]);
  const proofScale = useTransform(scrollYProgress, [0, 0.6], [0.96, 1]);
  const proofY = useTransform(scrollYProgress, [0, 0.6], [12, 0]);

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const threshold = prefersReducedMotion ? 0.08 : 0.58;
    setIsNavPinned(latest >= threshold);
  });

  const navShellClass = isNavPinned
    ? 'fixed top-0 left-0 right-0 z-[999] px-4 sm:px-6 pt-3 sm:pt-4'
    : 'absolute left-0 right-0 top-0 z-20 px-4 sm:px-6 pt-4 sm:pt-6';

  const navSurfaceStyle = isNavPinned
    ? {
        background: 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(1,34,87,0.10)',
        boxShadow: '0 18px 48px rgba(1,34,87,0.12)',
      }
    : glassStyle;

  const navTextClass = isNavPinned ? 'text-(--navy)' : 'text-white/90';
  const navButtonClass = isNavPinned
    ? 'text-(--navy) hover:bg-(--bg)'
    : 'text-white/90 hover:bg-white/10';
  const navArrowStyle = isNavPinned
    ? {
        width: 28,
        height: 28,
        minWidth: 28,
        minHeight: 28,
        borderRadius: '9999px',
        background: 'rgba(1,34,87,0.10)',
        color: '#012257',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        lineHeight: 0,
      }
    : undefined;

  const navVariants = prefersReducedMotion
    ? {}
    : stagger(0.07, 0.1);

  return (
    <section ref={sceneRef} className="relative z-40 h-[210vh] bg-white" data-screen-label="01 Hero">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="h-full"
          style={
            prefersReducedMotion
              ? { padding: 0 }
              : {
                  padding: shellInset,
                }
          }
        >
          <motion.div
            className="relative h-full overflow-hidden"
            style={
              prefersReducedMotion
                ? { borderRadius: 0 }
                : {
                    borderRadius: shellRadius,
                  }
            }
          >

        {/* Background video */}
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover ken-burns"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(1,34,87,.55) 0%, rgba(1,34,87,.10) 40%, rgba(1,34,87,.55) 100%)' }}/>
        </div>

        {/* ── Glassmorphic navbar ── */}
        <motion.div
          className={navShellClass}
          style={navSurfaceStyle}
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Desktop pill: logo left · nav links right · CTA */}
          <div className="hidden lg:flex items-center gap-2 rounded-full px-3 py-2" style={{ background: 'transparent' }}>
            <motion.div variants={fadeIn}>
              <Logo mono={false} transparent={false} className="h-20 w-auto shrink-0" />
            </motion.div>
            <div className="flex-1" />
            <div className="flex items-center gap-0.5">
              {navLinks.map(x => (
                <motion.button
                  key={x}
                  variants={fadeIn}
                  className={`${navTextClass} text-[13px] font-medium px-3.5 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap ${isNavPinned ? 'hover:bg-(--bg)' : 'hover:bg-white/10'}`}
                >{x}</motion.button>
              ))}
            </div>
            <div className={`w-px h-6 mx-1 shrink-0 ${isNavPinned ? 'bg-(--line)' : 'bg-white/20'}`} />
            <motion.button
              variants={fadeIn}
              onClick={scrollToForm}
              className={`text-[13px] py-2 pl-4 shrink-0 cursor-pointer rounded-full inline-flex items-center gap-2 ${isNavPinned ? 'bg-(--navy) text-white' : 'btn-dark'}`}
            >
              <span>Notify Me</span>
              <span
                className="arrow"
                style={navArrowStyle}
              >
                <Arrow s={10} c={isNavPinned ? '#fff' : '#012257'} />
              </span>
            </motion.button>
          </div>

          {/* Mobile pill: logo left · hamburger right */}
          <div className="lg:hidden flex items-center justify-between rounded-full px-3 py-2" style={{ background: 'transparent' }}>
            <Logo mono={false} transparent={false} className="h-14 w-auto" />
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: isNavPinned ? 'rgba(1,34,87,0.08)' : 'rgba(255,255,255,0.15)' }}
            >
              <Menu s={16} c={isNavPinned ? '#012257' : '#fff'}/>
            </button>
          </div>

          {/* Mobile drawer */}
          {open && (
            <div className="lg:hidden mt-2 rounded-2xl p-4 flex flex-col gap-1" style={navSurfaceStyle}>
              {navLinks.map(x => (
                <button
                  key={x}
                  className={`text-left text-[14px] font-medium py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${navTextClass} ${isNavPinned ? 'hover:bg-(--bg)' : 'hover:bg-white/10'}`}
                >{x}</button>
              ))}
              <div className={`my-2 h-px ${isNavPinned ? 'bg-(--line)' : 'bg-white/20'}`} />
              <button onClick={scrollToForm} className={`w-full justify-center cursor-pointer ${isNavPinned ? 'btn-dark' : 'btn-dark'}`}>
                <span>Notify Me When We Open</span>
                <span className="arrow"><Arrow s={12}/></span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 mt-28 sm:mt-32 lg:mt-36 px-4 sm:px-6 lg:px-10 max-w-184"
          style={prefersReducedMotion ? undefined : { scale: foregroundScale, y: foregroundY, transformOrigin: 'top left' }}
        >
          <motion.div
            className="chip mb-5 sm:mb-6 w-fit text-[12px] sm:text-[13px] px-3.5 py-2"
            initial={false}
            animate={{}}
          >
            <span className="dot" style={{ background: '#2CAAA0' }}/> Opening Soon · Kokapet, Hyderabad
          </motion.div>

          <motion.h1
            className="font-display text-white text-[48px] sm:text-[72px] lg:text-[96px] leading-[0.96] tracking-[-0.03em]"
            initial={false}
            animate={{}}
          >
            Expert Care,<br/>Close to{' '}<br className="sm:hidden"/>Home.
          </motion.h1>

          <motion.p
            className="text-white/95 text-[16px] sm:text-[18px] max-w-136 mt-5 sm:mt-7 leading-relaxed"
            initial={false}
            animate={{}}
          >
            A new generation of multispecialty hospital, founded by practising doctors. Opening soon in the heart of Kokapet.
          </motion.p>

          <motion.div
            className="mt-6 sm:mt-8 flex items-center flex-wrap gap-3.5"
            initial={false}
            animate={{}}
          >
            <motion.button onClick={scrollToForm} className="btn-dark text-[15px] sm:text-[16px] py-3.5 pl-5.5 cursor-pointer">
              <span>Notify Me When We Open</span>
              <span className="arrow"><Arrow s={13}/></span>
            </motion.button>
            <motion.button className="pill pill-ghost text-white flex items-center gap-2 py-3.5 px-5.5 cursor-pointer text-[15px] sm:text-[16px]">
              <Play s={11}/> Watch our story
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom-right social proof */}
        <motion.div
          className="hidden lg:block absolute right-6 bottom-6 z-10 max-w-60"
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
        </motion.div>
      </div>
    </section>
  );
}
