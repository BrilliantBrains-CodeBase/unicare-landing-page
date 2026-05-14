import logoSrc from '../assets/logo.png';
import logoTransparentSrc from '../assets/logo-transparent.png';
import logoHorizontalSrc from '../assets/logo-horizontal.png';

export default function Logo({ mono = false, transparent = false, horizontal = false, className = 'h-12 w-auto' }) {
  const src = horizontal ? logoHorizontalSrc : transparent ? logoTransparentSrc : logoSrc;
  return (
    <img
      src={src}
      alt="UniCare Hospital"
      className={`${className} object-contain`}
      style={mono && !transparent && !horizontal ? { filter: 'brightness(0) invert(1)' } : undefined}
    />
  );
}
