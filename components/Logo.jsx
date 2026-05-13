import logoSrc from '../assets/logo.png';
import logoTransparentSrc from '../assets/logo-transparent.png';

export default function Logo({ mono = false, transparent = false, className = 'h-10 w-auto' }) {
  const src = transparent ? logoTransparentSrc : logoSrc;
  return (
    <img
      src={src}
      alt="UniCare Hospital"
      className={`${className} object-contain`}
      style={mono && !transparent ? { filter: 'brightness(0) invert(1)' } : undefined}
    />
  );
}
