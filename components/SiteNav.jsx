import { useEffect, useState } from 'react';
import { Arrow, Menu } from './icons';
import Logo from './Logo';

const navLinks = [
  { label: 'Our Story',   id: 'our-story'   },
  { label: 'Specialties', id: 'specialties'  },
  { label: 'Founders',    id: 'founders'     },
  { label: 'Location',    id: 'location'     },
];

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const scrollToForm = () => scrollTo('notify-form');

const glassStyle = {
  background: 'rgba(255,255,255,0.10)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.22)',
};

const pinnedStyle = {
  background: 'rgba(255,255,255,0.94)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(1,34,87,0.10)',
  boxShadow: '0 18px 48px rgba(1,34,87,0.12)',
};

export default function SiteNav() {
  const [pinned, setPinned] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textCls = pinned ? 'text-(--navy)' : 'text-white/90';
  const hoverCls = pinned ? 'hover:bg-(--bg)' : 'hover:bg-white/10';
  const arrowStyle = pinned
    ? { width: 28, height: 28, minWidth: 28, minHeight: 28, borderRadius: '9999px', background: 'rgba(1,34,87,0.10)', color: '#012257', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', lineHeight: 0 }
    : undefined;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] px-4 sm:px-6 pt-1 sm:pt-2"
      style={pinned ? pinnedStyle : glassStyle}
    >
      {/* Desktop */}
      <div className="hidden lg:flex items-center gap-2 rounded-full px-3 py-0">
        <Logo className="h-32 w-auto shrink-0" />
        <div className="flex-1" />
        <div className="flex items-center gap-0.5">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`${textCls} text-[13px] font-medium px-3.5 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap ${hoverCls}`}
            >{label}</button>
          ))}
        </div>
        <div className={`w-px h-6 mx-1 shrink-0 ${pinned ? 'bg-(--line)' : 'bg-white/20'}`} />
        <button
          onClick={scrollToForm}
          className={`text-[13px] py-2 pl-4 shrink-0 cursor-pointer rounded-full inline-flex items-center gap-2 ${pinned ? 'bg-(--navy) text-white' : 'btn-dark'}`}
        >
          <span>Book Appointment</span>
          <span className="arrow" style={arrowStyle}>
            <Arrow s={10} c={pinned ? '#fff' : '#012257'} />
          </span>
        </button>
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
              className={`text-left text-[14px] font-medium py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${textCls} ${hoverCls}`}
            >{label}</button>
          ))}
          <div className={`my-2 h-px ${pinned ? 'bg-(--line)' : 'bg-white/20'}`} />
          <button onClick={scrollToForm} className="w-full justify-center cursor-pointer btn-dark">
            <span>Book an Appointment</span>
            <span className="arrow"><Arrow s={12} /></span>
          </button>
        </div>
      )}
    </div>
  );
}
