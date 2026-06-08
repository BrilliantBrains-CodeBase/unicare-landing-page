import { createPortal } from 'react-dom';
import { Arrow, Phone, WhatsAppIc } from './icons';

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const whatsappMsg = encodeURIComponent('Hello, thank you for contacting UniCare Hospitals, Kokapet, Hyderabad. How can we help you today – appointment or health enquiry?');
const whatsappUrl = `https://wa.me/919090546363?text=${whatsappMsg}`;

const HomeIc = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12L12 4l9 8"/>
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9"/>
  </svg>
);

const GridIc = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
);

export default function MobileBottomBar() {
  return createPortal(
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[9998]"
      style={{
        background: 'rgba(255,255,255,0.97)',
        borderTop: '1px solid rgba(1,34,87,0.10)',
        boxShadow: '0 -4px 24px rgba(1,34,87,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}
    >
      <div className="flex items-end justify-around px-2 pt-2 pb-2">

        {/* Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 px-3 py-1 cursor-pointer text-(--navy) opacity-70 hover:opacity-100 transition-opacity"
        >
          <HomeIc />
          <span className="text-[9px] font-medium tracking-wide">Home</span>
        </button>

        {/* Specialties */}
        <button
          onClick={() => scrollTo('specialties')}
          className="flex flex-col items-center gap-1 px-3 py-1 cursor-pointer text-(--navy) opacity-70 hover:opacity-100 transition-opacity"
        >
          <GridIc />
          <span className="text-[9px] font-medium tracking-wide">Specialties</span>
        </button>

        {/* Book — elevated center CTA */}
        <div className="flex flex-col items-center gap-1 -mt-4">
          <button
            onClick={() => scrollTo('notify-form')}
            className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: 'var(--teal)',
              boxShadow: '0 4px 16px rgba(44,170,160,0.45)',
            }}
          >
            <Arrow s={18} c="#fff" />
          </button>
          <span className="text-[9px] font-medium tracking-wide" style={{ color: 'var(--teal)' }}>Book</span>
        </div>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 px-3 py-1 text-(--navy) opacity-70 hover:opacity-100 transition-opacity"
        >
          <WhatsAppIc s={20} />
          <span className="text-[9px] font-medium tracking-wide">WhatsApp</span>
        </a>

        {/* Call */}
        <a
          href="tel:+919090546363"
          className="flex flex-col items-center gap-1 px-3 py-1 text-(--navy) opacity-70 hover:opacity-100 transition-opacity"
        >
          <Phone s={20} />
          <span className="text-[9px] font-medium tracking-wide">Call</span>
        </a>

      </div>
    </div>,
    document.body
  );
}
