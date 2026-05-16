export default function HospitalPhoto({ src, alt = 'UniCare Hospital', label, variant = 1 }) {
  if (src) {
    return (
      <div className="relative w-full h-full">
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async"/>
        {label && (
          <div className="absolute left-3 top-3 mono text-[10px] uppercase tracking-widest text-white/85 bg-black/30 backdrop-blur px-2 py-1 rounded-full">
            {label}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full placeholder-photo ${variant === 1 ? 'photo-hosp-1' : variant === 2 ? 'photo-hosp-2' : 'photo-hosp-3'}`}>
      <svg className="hospital-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`sky${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8fb6d2"/>
            <stop offset="1" stopColor="#cfe1ee"/>
          </linearGradient>
          <linearGradient id={`bld${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3f6f9"/>
            <stop offset="1" stopColor="#c6d2dc"/>
          </linearGradient>
          <linearGradient id={`glass${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2CAAA0" stopOpacity=".35"/>
            <stop offset="1" stopColor="#012257" stopOpacity=".55"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#sky${variant})`}/>
        <rect x="40" y="80" width="80" height="150" fill={`url(#bld${variant})`}/>
        <rect x="130" y="60" width="180" height="180" fill={`url(#bld${variant})`}/>
        <rect x="138" y="72" width="164" height="160" fill={`url(#glass${variant})`}/>
        {Array.from({ length: 9 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => (
            <rect key={`w-${r}-${c}`} x={142 + c * 20} y={78 + r * 18} width="14" height="12" fill="#e9f1f6" opacity={(r + c) % 3 === 0 ? .95 : .6}/>
          ))
        )}
        <rect x="315" y="100" width="55" height="130" fill={`url(#bld${variant})`}/>
        <rect x="0" y="240" width="400" height="60" fill="#012257" opacity=".85"/>
        <rect x="0" y="248" width="400" height="4" fill="#2CAAA0"/>
      </svg>
    </div>
  );
}
