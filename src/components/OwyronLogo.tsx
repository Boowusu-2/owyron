import { useId } from 'react';

export interface OwyronLogoProps {
  /** 'horizontal' for navbar/inline, 'stacked' for primary lockup matching brand reference, 'mark' for symbol only */
  variant?: 'horizontal' | 'stacked' | 'mark';
  /** 'dark' renders white primary ink on dark surfaces; 'light' renders black primary ink on light surfaces */
  theme?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const MARK_SIZE_CLASSES = {
  horizontal: {
    sm: 'h-5',
    md: 'h-6',
    lg: 'h-8',
    xl: 'h-10',
  },
  stacked: {
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-44',
    xl: 'w-56',
  },
  mark: {
    sm: 'h-5',
    md: 'h-7',
    lg: 'h-10',
    xl: 'h-14',
  },
};

export function OwyronLogo({
  variant = 'horizontal',
  theme = 'dark',
  className = '',
  size = 'md',
}: OwyronLogoProps) {
  const uid = useId().replace(/:/g, '');
  const clipId = `owyron-cut-${uid}`;
  const maskId = `owyron-mask-${uid}`;

  const primaryFill = theme === 'dark' ? '#F5F6FA' : '#060608';
  const indigoFill = theme === 'dark' ? '#4328FF' : '#3815FC';

  const markSvg = (classNameAttr: string) => (
    <svg
      viewBox="0 0 444 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNameAttr}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <polygon points="0,0 232,0 218,94 124,216 0,216" />
        </clipPath>
        <mask id={maskId}>
          <rect width="444" height="216" fill="black" />
          <circle cx="106" cy="107" r="101" fill="white" clipPath={`url(#${clipId})`} />
          <circle cx="108" cy="107" r="64.5" fill="black" />
        </mask>
      </defs>

      {/* Left geometric crescent-ring */}
      <rect width="444" height="216" fill={primaryFill} mask={`url(#${maskId})`} />

      {/* Central precision chevron */}
      <path
        d="M148 208 L242 82 Q250 72 263 72 L273 72 Q286 72 294 82 L390 208 L341 208 L272 117 Q268 112 264 117 L195 208 Z"
        fill={primaryFill}
      />

      {/* Indigo slanted accent */}
      <path
        d="M370 8 L434 8 Q438 8 436 12 L386 85 Q384 89 379 89 L319 89 Q315 89 317 85 L365 12 Q367 8 370 8 Z"
        fill={indigoFill}
      />
    </svg>
  );

  /** Precision geometric vector wordmark faithful to the supplied OWYRON brand lockup */
  const wordmarkSvg = (classNameAttr: string) => (
    <svg
      viewBox="0 0 696 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNameAttr}
      aria-hidden="true"
    >
      {/* O */}
      <rect
        x="7"
        y="7"
        width="74"
        height="64"
        rx="32"
        stroke={primaryFill}
        strokeWidth="11.5"
      />
      {/* W */}
      <path
        d="M118 5 L146 72 L178 14 L210 72 L238 5"
        stroke={primaryFill}
        strokeWidth="11.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      {/* Y */}
      <path
        d="M266 5 L309.5 44 L353 5 M309.5 44 L309.5 73"
        stroke={primaryFill}
        strokeWidth="11.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      {/* R — distinctive open-left-top futuristic construction */}
      <path
        d="M385 7 L434 7 C448 7 455 14 455 24.5 C455 35 448 42 434 42 L388 42 L388 73 M426 42 L455 73"
        stroke={primaryFill}
        strokeWidth="11.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      {/* O */}
      <rect
        x="500"
        y="7"
        width="74"
        height="64"
        rx="32"
        stroke={primaryFill}
        strokeWidth="11.5"
      />
      {/* N */}
      <path
        d="M622 73 L622 7 L686 73 L686 7"
        stroke={primaryFill}
        strokeWidth="11.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === 'mark') {
    return (
      <span className={`inline-flex items-center select-none ${className}`} role="img" aria-label="OWYRON">
        {markSvg(`${MARK_SIZE_CLASSES.mark[size]} w-auto`)}
      </span>
    );
  }

  if (variant === 'stacked') {
    return (
      <span
        className={`inline-flex flex-col items-center gap-3.5 select-none ${className}`}
        role="img"
        aria-label="OWYRON"
      >
        {markSvg('w-[62%] h-auto')}
        {wordmarkSvg('w-full h-auto')}
      </span>
    );
  }

  const heightClass = MARK_SIZE_CLASSES.horizontal[size];
  const wordmarkHeight =
    size === 'sm'
      ? 'h-3'
      : size === 'md'
        ? 'h-3.5'
        : size === 'lg'
          ? 'h-4.5'
          : 'h-5.5';

  return (
    <span
      className={`inline-flex items-center gap-3 select-none ${className}`}
      role="img"
      aria-label="OWYRON"
    >
      {markSvg(`${heightClass} w-auto shrink-0`)}
      {wordmarkSvg(`${wordmarkHeight} w-auto shrink-0`)}
    </span>
  );
}

