import logoSrc            from '../assets/logo.png?w=400&format=webp&quality=85';
import logoTransparentSrc from '../assets/logo-transparent.png?w=400&format=webp&quality=85';
import logoHorizontalSrc  from '../assets/logo-horizontal.png?w=530&format=webp&quality=90';

export default function Logo({ mono = false, transparent = false, horizontal = false, className = 'h-12 w-auto' }) {
  const src = horizontal ? logoHorizontalSrc : transparent ? logoTransparentSrc : logoSrc;
  return (
    <img
      src={src}
      alt="UniCare Hospitals"
      className={`${className} object-contain`}
      style={mono && !transparent && !horizontal ? { filter: 'brightness(0) invert(1)' } : undefined}
    />
  );
}
