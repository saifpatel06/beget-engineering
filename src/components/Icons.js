// Small set of line icons (inline SVG, no dependency).
// Usage: <Icon name="shield" size={28} />

const paths = {
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.7 2.7L16 9.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.2a3.2 3.2 0 010 5.6M18 14.3c1.8.8 3 2.7 3 5.7" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M16 7l3 3M14 9l2 2" />
    </>
  ),
  layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  flag: <path d="M5 21V4M5 4h11l-2 4 2 4H5" />,
  gauge: (
    <>
      <path d="M4 17a8 8 0 1116 0" />
      <path d="M12 17l4-6" />
    </>
  ),
  bolt: <path d="M13 2L5 13h6l-1 9 8-11h-6l1-9z" />,
  hammer: (
    <>
      <path d="M14 6l4 4M9 11l4 4M3 21l7-7" />
      <path d="M13 3l8 8-3 3-8-8 3-3z" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="10" height="18" />
      <path d="M14 9h6v12h-6M8 7h2M8 11h2M8 15h2" />
    </>
  ),
  wrench: (
    <path d="M14.5 6.5a4 4 0 005 5L21 13l-8 8-4-4 8-8-2.5-2.5zM5 17l2 2" />
  ),
  factory: (
    <>
      <path d="M3 21V9l6 4V9l6 4V5h3v16H3z" />
      <path d="M8 21v-4M12 21v-4" />
    </>
  ),
  box: (
    <>
      <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
      <path d="M3 7l9 4 9-4M12 11v10" />
    </>
  ),
  drop: <path d="M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z" />,
  phone: (
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5a7 7 0 00-14 0C5 14.800 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  arrowRight: <path d="M4 12h16M14 6l6 6-6 6" />,
  play: <path d="M8 5l11 7-11 7V5z" fill="currentColor" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  shrink: <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  upload: <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 11v6M8 7.5v.01M12 17v-6M12 13.5c0-3 5-3 5 0V17" />
    </>
  ),
  facebook: <path d="M15 3h-2.5A4.5 4.5 0 008 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5c0-.8.4-1.5 1.5-1.5H15V3z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10 9.5v5l4.500-2.500L10 9.500z" />
    </>
  ),
};

const Icon = ({ name, size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    {paths[name] || null}
  </svg>
);


export default Icon;
