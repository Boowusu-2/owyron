interface DomainSchematicProps {
  type: 'ai' | 'systems' | 'engineering' | 'emerging';
}

export function DomainSchematic({ type }: DomainSchematicProps) {
  if (type === 'ai') {
    return (
      <svg
        viewBox="0 0 360 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* Layered inference & representation graph */}
        <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
          <line x1="60" y1="50" x2="180" y2="40" />
          <line x1="60" y1="50" x2="180" y2="120" />
          <line x1="60" y1="120" x2="180" y2="40" />
          <line x1="60" y1="120" x2="180" y2="120" />
          <line x1="60" y1="120" x2="180" y2="200" />
          <line x1="60" y1="190" x2="180" y2="120" />
          <line x1="60" y1="190" x2="180" y2="200" />
          <line x1="180" y1="40" x2="300" y2="85" />
          <line x1="180" y1="120" x2="300" y2="85" />
          <line x1="180" y1="120" x2="300" y2="155" />
          <line x1="180" y1="200" x2="300" y2="155" />
        </g>

        {/* Active indigo inference path */}
        <path
          d="M60 120 L180 40 L300 85"
          stroke="#5843FF"
          strokeWidth="1.5"
        />
        <path
          d="M60 190 L180 120 L300 155"
          stroke="#3815FC"
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />

        {/* Layer guides */}
        <line x1="60" y1="20" x2="60" y2="220" stroke="rgba(255,255,255,0.06)" />
        <line x1="180" y1="20" x2="180" y2="220" stroke="rgba(255,255,255,0.06)" />
        <line x1="300" y1="20" x2="300" y2="220" stroke="rgba(255,255,255,0.06)" />

        {/* Nodes */}
        {[50, 120, 190].map((y) => (
          <circle key={`l1-${y}`} cx="60" cy={y} r="4.5" fill="#0C0D12" stroke="#F5F6FA" strokeWidth="1.25" />
        ))}
        {[40, 120, 200].map((y, idx) => (
          <circle
            key={`l2-${y}`}
            cx="180"
            cy={y}
            r={idx === 0 ? 5.5 : 4.5}
            fill={idx === 0 ? '#3815FC' : '#0C0D12'}
            stroke={idx === 0 ? '#5843FF' : 'rgba(255,255,255,0.65)'}
            strokeWidth="1.25"
          />
        ))}
        {[85, 155].map((y, idx) => (
          <rect
            key={`l3-${y}`}
            x="295"
            y={y - 5}
            width="10"
            height="10"
            fill={idx === 0 ? '#F5F6FA' : '#0C0D12'}
            stroke={idx === 0 ? '#F5F6FA' : '#5843FF'}
            strokeWidth="1.25"
          />
        ))}
      </svg>
    );
  }

  if (type === 'systems') {
    return (
      <svg
        viewBox="0 0 360 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* Closed-loop autonomous control architecture */}
        <circle cx="180" cy="120" r="82" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="180" cy="120" r="52" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray="3 4" />
        <path
          d="M180 38 A82 82 0 0 1 262 120"
          stroke="#5843FF"
          strokeWidth="1.75"
        />
        <path
          d="M180 202 A82 82 0 0 1 98 120"
          stroke="#3815FC"
          strokeWidth="1.5"
        />

        {/* Orthogonal control blocks */}
        <rect x="148" y="24" width="64" height="26" fill="#0C0D12" stroke="rgba(255,255,255,0.35)" />
        <rect x="244" y="107" width="64" height="26" fill="#0C0D12" stroke="#5843FF" />
        <rect x="148" y="190" width="64" height="26" fill="#0C0D12" stroke="rgba(255,255,255,0.35)" />
        <rect x="52" y="107" width="64" height="26" fill="#0C0D12" stroke="rgba(255,255,255,0.35)" />

        {/* Central decision core */}
        <polygon points="180,96 204,120 180,144 156,120" fill="#3815FC" fillOpacity="0.2" stroke="#5843FF" strokeWidth="1.25" />
        <circle cx="180" cy="120" r="4" fill="#F5F6FA" />
      </svg>
    );
  }

  if (type === 'engineering') {
    return (
      <svg
        viewBox="0 0 360 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* Distributed topology & consensus mesh */}
        <g stroke="rgba(255,255,255,0.14)" strokeWidth="1">
          <rect x="44" y="42" width="76" height="44" />
          <rect x="142" y="42" width="76" height="44" stroke="#5843FF" />
          <rect x="240" y="42" width="76" height="44" />
          <rect x="93" y="154" width="76" height="44" />
          <rect x="191" y="154" width="76" height="44" />
        </g>

        {/* Inter-node bus */}
        <line x1="82" y1="86" x2="82" y2="120" stroke="rgba(255,255,255,0.22)" />
        <line x1="180" y1="86" x2="180" y2="120" stroke="#5843FF" strokeWidth="1.5" />
        <line x1="278" y1="86" x2="278" y2="120" stroke="rgba(255,255,255,0.22)" />
        <line x1="44" y1="120" x2="316" y2="120" stroke="rgba(255,255,255,0.28)" />
        <line x1="131" y1="120" x2="131" y2="154" stroke="rgba(255,255,255,0.22)" />
        <line x1="229" y1="120" x2="229" y2="154" stroke="#5843FF" strokeWidth="1.5" />

        {/* Node markers */}
        <circle cx="180" cy="120" r="4" fill="#5843FF" />
        <circle cx="131" cy="120" r="3" fill="#F5F6FA" />
        <circle cx="229" cy="120" r="3" fill="#F5F6FA" />
        <line x1="156" y1="64" x2="204" y2="64" stroke="#5843FF" strokeWidth="1.5" />
        <line x1="58" y1="64" x2="106" y2="64" stroke="rgba(255,255,255,0.35)" />
        <line x1="254" y1="64" x2="302" y2="64" stroke="rgba(255,255,255,0.35)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Robotics kinematics & next-generation compute lattice */}
      <line x1="36" y1="196" x2="324" y2="196" stroke="rgba(255,255,255,0.14)" />
      <circle cx="106" cy="196" r="10" fill="#0C0D12" stroke="#F5F6FA" strokeWidth="1.25" />

      {/* Kinematic arm vectors */}
      <line x1="106" y1="196" x2="164" y2="114" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <line x1="164" y1="114" x2="254" y2="78" stroke="#5843FF" strokeWidth="1.75" />
      <line x1="254" y1="78" x2="288" y2="112" stroke="#F5F6FA" strokeWidth="1.25" />

      {/* Precision joints & workspace arc */}
      <path d="M106 116 A80 80 0 0 1 258 76" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" />
      <circle cx="164" cy="114" r="6" fill="#0C0D12" stroke="#5843FF" strokeWidth="1.5" />
      <circle cx="254" cy="78" r="5" fill="#3815FC" stroke="#F5F6FA" strokeWidth="1.25" />

      {/* Compute lattice grid */}
      <g stroke="rgba(255,255,255,0.1)">
        <rect x="226" y="138" width="18" height="18" />
        <rect x="248" y="138" width="18" height="18" stroke="#5843FF" />
        <rect x="270" y="138" width="18" height="18" />
        <rect x="226" y="160" width="18" height="18" />
        <rect x="248" y="160" width="18" height="18" />
        <rect x="270" y="160" width="18" height="18" />
      </g>
    </svg>
  );
}

