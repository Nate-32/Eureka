interface SnowCapProps {
  align?: 'left' | 'right';
  width?: 'sm' | 'md' | 'lg';
}

export function SnowCap({ align = 'left', width = 'md' }: SnowCapProps) {
  const positionClass =
    align === 'left'
      ? 'left-6 sm:left-10'
      : 'right-6 sm:right-10 scale-x-[-1]';

  const sizeClass =
    width === 'sm'
      ? 'w-32 sm:w-40'
      : width === 'lg'
      ? 'w-52 sm:w-72'
      : 'w-40 sm:w-56';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -top-[9px] z-20 ${positionClass} ${sizeClass} select-none`}
    >
      <svg
        viewBox="0 0 240 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full drop-shadow-[0_3px_6px_rgba(6,6,15,0.55)]"
      >
        <defs>
          <linearGradient id={`snow-fill-${align}-${width}`} x1="0" y1="0" x2="0" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
            <stop offset="52%" stopColor="#E6F4FF" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#B9DFFF" stopOpacity="0.58" />
          </linearGradient>
          <linearGradient id={`snow-rim-${align}-${width}`} x1="0" y1="9" x2="240" y2="9" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B9DFFF" stopOpacity="0" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#B9DFFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#B9DFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Soft organic drifted snow mound tapering along the upper glass edge */}
        <path
          d="M2 11.5C18 11.5 24 6.2 42 5.2C56 4.4 64 7.8 80 7.2C96 6.6 106 2.8 126 3.5C145 4.2 154 8.5 174 9.2C194 9.9 212 10.6 238 11.2C222 12.6 202 12.8 184 12.5C166 12.2 154 14.4 139 14.2C125 14 118 12.3 102 12.4C86 12.5 76 15.2 61 14.8C47 14.4 39 12.6 24 12.3C14 12.1 7 12 2 11.5Z"
          fill={`url(#snow-fill-${align}-${width})`}
        />

        {/* Delicate icy underside sheen along the glass bezel */}
        <path
          d="M6 11.6C54 11.8 132 12.2 232 11.4"
          stroke={`url(#snow-rim-${align}-${width})`}
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Subtle crystalline snow flecks */}
        <circle cx="52" cy="3.2" r="0.9" fill="#FFFFFF" fillOpacity="0.75" />
        <circle cx="132" cy="1.8" r="1.05" fill="#E6F4FF" fillOpacity="0.8" />
        <circle cx="170" cy="6.2" r="0.75" fill="#B9DFFF" fillOpacity="0.7" />
      </svg>
    </div>
  );
}
