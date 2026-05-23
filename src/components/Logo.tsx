export default function Logo() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      width="34" 
      height="34" 
      className="logo-svg"
      style={{ display: 'block' }}
    >
      {/* Outer Speed Ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="42" 
        stroke="var(--accent-primary)" 
        strokeWidth="6" 
        strokeDasharray="200 60"
        strokeLinecap="round"
        fill="none" 
      />
      {/* Piston head */}
      <path 
        d="M38 32h24v12H38z" 
        fill="var(--text-primary)" 
      />
      {/* Piston grooves */}
      <line x1="41" y1="36" x2="59" y2="36" stroke="var(--bg-primary)" strokeWidth="2" />
      <line x1="41" y1="40" x2="59" y2="40" stroke="var(--bg-primary)" strokeWidth="2" />
      {/* Piston rod */}
      <path 
        d="M46 44l-3 20h14l-3-20z" 
        fill="var(--text-primary)" 
      />
      {/* Piston pin circle */}
      <circle 
        cx="50" 
        cy="48" 
        r="3" 
        fill="var(--bg-primary)" 
      />
      {/* Bottom rod cap */}
      <circle 
        cx="50" 
        cy="66" 
        r="6" 
        fill="var(--text-primary)" 
      />
    </svg>
  );
}
