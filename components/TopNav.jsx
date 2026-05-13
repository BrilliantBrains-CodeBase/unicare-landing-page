import { useState } from 'react';
import { Arrow, Search, Menu } from './icons';
import Logo from './Logo';

export default function TopNav({ onLight = false }) {
  const [open, setOpen] = useState(false);
  const pillCls = onLight ? 'pill pill-ghost text-white' : 'pill text-(--navy)';

  return (
    <div>
      <div className="flex items-center justify-between gap-3 relative">

        {/* Desktop: left nav pills */}
        <div className="hidden lg:flex items-center gap-1.5">
          {['Our Story', 'Specialties', 'Founders', 'Location'].map(x => (
            <button key={x} className={pillCls}>{x}</button>
          ))}
        </div>

        {/* Mobile: inline logo (left) */}
        <div className="lg:hidden">
          <Logo mono={onLight} />
        </div>

        {/* Desktop: centered drop logo */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 bg-white rounded-b-3xl px-6 pt-3 pb-4" style={{ top: -24 }}>
          <Logo />
        </div>

        {/* Desktop: right controls */}
        <div className="hidden lg:flex items-center gap-2">
          <div className={`${pillCls} flex items-center gap-2 min-w-52.5`}>
            <Search s={14} c={onLight ? '#fff' : '#012257'}/>
            <input
              placeholder="Search hospital, doctor…"
              className="bg-transparent outline-none text-[13px] flex-1"
              style={{ color: onLight ? '#fff' : 'var(--navy)' }}
            />
          </div>
          <button className="btn-dark">
            <span>Notify Me</span>
            <span className="arrow"><Arrow s={12}/></span>
          </button>
          <button className={`w-10 h-10 rounded-full flex items-center justify-center ${onLight ? 'bg-white text-(--navy)' : 'bg-(--navy) text-white'}`}>
            <Menu s={16} c={onLight ? '#012257' : '#fff'}/>
          </button>
        </div>

        {/* Mobile: hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${onLight ? 'bg-white/20' : 'bg-(--navy)'}`}
        >
          <Menu s={16} c="#fff"/>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div id="mobile-nav" role="navigation" aria-label="Main navigation" className={`lg:hidden mt-3 rounded-2xl p-4 flex flex-col gap-1 ${onLight ? 'bg-black/40 backdrop-blur-md' : 'bg-white border border-(--line) shadow-lg'}`}>
          {['Our Story', 'Specialties', 'Founders', 'Location'].map(x => (
            <button
              key={x}
              className={`text-left text-[14px] font-medium py-2.5 px-3 rounded-xl transition-colors ${onLight ? 'text-white hover:bg-white/10' : 'text-(--navy) hover:bg-(--bg)'}`}
            >{x}</button>
          ))}
          <div className={`my-2 h-px ${onLight ? 'bg-white/20' : 'bg-(--line)'}`}/>
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${onLight ? 'bg-white/10' : 'bg-(--bg)'}`}>
            <Search s={14} c={onLight ? '#fff' : '#012257'}/>
            <input
              placeholder="Search hospital, doctor…"
              className="bg-transparent outline-none text-[13px] flex-1 min-w-0"
              style={{ color: onLight ? '#fff' : 'var(--navy)' }}
            />
          </div>
          <button className="btn-dark mt-1 w-full justify-center">
            <span>Notify Me</span>
            <span className="arrow"><Arrow s={12}/></span>
          </button>
        </div>
      )}
    </div>
  );
}
