import React from 'react'

function Scooter({ x, y, color, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="111" rx="51" ry="8" fill="#193a58" opacity=".2" />
      <g fill="#17222c" stroke="#46515b" strokeWidth="3">
        <ellipse cx="-29" cy="85" rx="13" ry="24" />
        <ellipse cx="28" cy="88" rx="13" ry="25" />
      </g>
      <path d="M-35 63 Q-57 32-38 18 L-6 22 23 48 29 82-16 88Z" fill={color} stroke="#334957" strokeWidth="2" />
      <path d="M-38 20 Q-33 9-11 14 L8 24-1 31-35 29Z" fill="#202830" />
      <path d="M14 14 L37 14 39 46 28 86 10 86 4 53Z" fill={color} stroke="#334957" strokeWidth="2" />
      <path d="M18 29 L32 29 29 43 17 43Z" fill="#f0fcff" stroke="#cad9df" strokeWidth="2" />
      <path d="M22 48 L18 69 M31 48 L27 69" stroke="#ffffff" opacity=".5" strokeWidth="2" />
      <path d="M25 17 L22-3 M23 2 L6-2 M25 2 L42-2 M7-2 L2-17 M41-2 L47-18" fill="none" stroke="#35414b" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="0" cy="-18" rx="9" ry="5" fill="#263845" transform="rotate(20 0 -18)" />
      <ellipse cx="49" cy="-19" rx="9" ry="5" fill="#263845" transform="rotate(-20 49 -19)" />
      <path d="M17 6 L30 6 33 17 13 17Z" fill="#273b49" />
      <path d="M-35 38 L-18 46-12 68-29 65Z" fill="#fff" opacity=".15" />
      <path d="M-11 76 L9 76" stroke="#aebcc5" strokeWidth="4" />
      <path d="M19 83 Q29 77 37 85" fill="none" stroke={color} strokeWidth="5" />
      <path d="M21 57 L24 61 28 56" fill="none" stroke="#eaf1f4" strokeWidth="2" />
    </g>
  )
}

export default function CampaignScene() {
  return (
    <svg className="campaign-scene" viewBox="0 0 1000 410" role="img" aria-label="Minh họa xe máy điện VinFast bên sông, cầu Rồng và đường chân trời thành phố">
      <defs>
        <linearGradient id="river" x2="0" y2="1"><stop stopColor="#75c5ed" /><stop offset=".5" stopColor="#d9eff9" /><stop offset="1" stopColor="#88bce4" /></linearGradient>
        <linearGradient id="ribbon" x2="0" y2="1"><stop stopColor="#ff6d50" /><stop offset=".45" stopColor="#e52435" /><stop offset="1" stopColor="#b40b27" /></linearGradient>
        <linearGradient id="tower" x2="1" y2="0"><stop stopColor="#1766a7" /><stop offset=".5" stopColor="#9ad6ed" /><stop offset="1" stopColor="#145392" /></linearGradient>
      </defs>
      <path d="M0 75 Q170 143 360 82 T700 78 T1000 47 L1000 76 Q800 141 600 104 T250 124 T0 102Z" fill="url(#ribbon)" />
      <path d="M0 78 Q170 146 360 85 T700 81 T1000 50" fill="none" stroke="#ffb398" strokeWidth="3" />
      <path d="M160 172 L275 99 332 137 397 102 470 161 538 119 630 177Z" fill="#699ec2" opacity=".55" />
      <path d="M0 188 Q120 159 230 180 L1000 176 1000 410 0 410Z" fill="url(#river)" />
      <g fill="#1e6b6c">
        {Array.from({ length: 20 }, (_, i) => <circle key={i} cx={i * 15} cy={165 - Math.sin(i * 2) * 12} r={19} />)}
      </g>
      <g stroke="#d1e6e5" strokeWidth="2">
        {Array.from({ length: 16 }, (_, i) => <rect key={i} x={660 + i * 22} y={112 - ((i * 37) % 68)} width="17" height={71 + ((i * 37) % 68)} fill={i % 3 === 0 ? '#d49783' : 'url(#tower)'} />)}
        <path d="M787 182 L787 63 794 63 794 37 800 37 800 15 805 15 805 0 808 0 808 47 816 47 816 85 824 85 824 182Z" fill="url(#tower)" />
      </g>
      <g fill="#f4e6bd" stroke="#716b60" strokeWidth="2">
        <path d="M64 182 L64 140 98 140 98 182Z M59 142 L81 127 103 142Z M69 126 L69 103 93 103 93 126Z M64 104 L81 90 98 104Z" />
        <path d="M75 181 L75 157 Q81 147 87 157 L87 181 M76 121 L76 111 85 111 85 121" fill="#274653" />
      </g>
      <g fill="none" stroke="#edb43b" strokeWidth="8">
        <path d="M330 184 Q395 75 460 184 Q510 102 560 184 Q600 125 640 184" />
        <path d="M320 177 Q340 157 358 162" />
      </g>
      <path d="M284 187 L681 187" stroke="#f7e1b0" strokeWidth="8" />
      <path d="M285 195 L681 195" stroke="#567b97" strokeWidth="4" />
      <g stroke="#fff" opacity=".4" strokeWidth="3"><path d="M40 220 H250 M560 228 H920 M180 258 H540 M620 287 H1000 M0 323 H180 M320 363 H690 M100 385 H880" /></g>
      <path d="M0 266 Q200 242 394 261 T1000 245 L1000 282 Q720 265 500 283 T0 288Z" fill="#f4e5c7" opacity=".6" />
      <Scooter x={84} y={235} color="#f1f5f3" scale={.75} />
      <Scooter x={204} y={226} color="#f2f1e7" scale={.92} />
      <Scooter x={342} y={224} color="#889796" scale={1.12} />
      <Scooter x={666} y={225} color="#be2737" scale={1.12} />
      <Scooter x={805} y={227} color="#343c40" scale={.92} />
      <Scooter x={920} y={237} color="#f2f5f1" scale={.75} />
      <Scooter x={503} y={208} color="#c4b8a1" scale={1.4} />
    </svg>
  )
}
