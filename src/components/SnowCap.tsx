import { EVENT_CONFIG } from '../config/eventData';
import { resolveAssetUrl } from '../utils/assets';

interface SnowCapProps {
  align?: 'left' | 'right';
  width?: 'sm' | 'md' | 'lg';
}

export function SnowCap({ align = 'left', width = 'md' }: SnowCapProps) {
  const frostUrl = resolveAssetUrl(EVENT_CONFIG.assets.frostEdge);

  const sizeClass =
    width === 'sm'
      ? 'w-32 sm:w-40'
      : width === 'lg'
      ? 'w-44 sm:w-56 lg:w-64'
      : 'w-40 sm:w-48';

  const placementClass =
    align === 'left'
      ? 'top-0 left-0 -translate-y-[38%] -translate-x-[8%]'
      : 'top-0 right-0 -translate-y-[38%] translate-x-[8%] scale-x-[-1]';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 select-none ${placementClass} ${sizeClass}`}
    >
      <img
        src={frostUrl}
        alt=""
        width={600}
        height={200}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="block h-auto w-full object-contain opacity-95 drop-shadow-[0_4px_10px_rgba(6,6,15,0.65)]"
      />
    </div>
  );
}
