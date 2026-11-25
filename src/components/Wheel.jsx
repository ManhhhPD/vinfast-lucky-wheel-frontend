import React from 'react'

const COLORS = ['#0877cb', '#fff0bd', '#0862b0', '#fff0bd', '#0877cb', '#fff0bd']

const TAU = Math.PI * 2

function polar(cx, cy, r, angle) {
  return { x: cx + r * Math.sin(angle), y: cy - r * Math.cos(angle) }
}

function sectorPath(cx, cy, r, start, end) {
  const p1 = polar(cx, cy, r, start)
  const p2 = polar(cx, cy, r, end)
  const largeArc = end - start > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`
}

function wrapLabel(label, maxCharacters = 14) {
  const lines = []
  let line = ''

  for (const word of label.trim().split(/\s+/)) {
    if (line && `${line} ${word}`.length > maxCharacters) {
      lines.push(line)
      line = word
    } else {
      line = line ? `${line} ${word}` : word
    }
  }
  if (line) lines.push(line)
  return lines
}

export default function Wheel({ prizes, rotation, spinning }) {
  const count = prizes.length
  const size = 460
  const center = size / 2
  const radius = size / 2 - 12
  const step = TAU / count

  return (
    <div className="wheel-wrap">
      <div className="wheel-pointer" aria-hidden="true" />
      <svg
        className="wheel"
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        role="img"
        aria-label="Vòng quay may mắn"
      >
        {prizes.map((prize, index) => {
          const start = index * step
          const end = start + step
          const mid = start + step / 2
          const labelPoint = polar(center, center, radius * 0.64, mid)
          const lines = wrapLabel(prize.name)
          const longestLine = Math.max(...lines.map((line) => line.length))
          const fontSize = Math.min(15, 180 / longestLine, 76 / (lines.length * 1.25))
          const lineHeight = fontSize * 1.25
          const angle = (mid * 180) / Math.PI
          const labelRotation = angle > 90 && angle < 270 ? angle + 180 : angle
          return (
            <g key={prize.code}>
              <path d={sectorPath(center, center, radius, start, end)} fill={COLORS[index % COLORS.length]} stroke="#f7e08a" strokeWidth="3" />
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                fill={index % 2 === 0 ? '#ffffff' : '#07559a'}
                fontSize={fontSize}
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${labelRotation} ${labelPoint.x} ${labelPoint.y})`}
              >
                {lines.map((line, lineIndex) => (
                  <tspan
                    key={lineIndex}
                    x={labelPoint.x}
                    y={labelPoint.y + (lineIndex - (lines.length - 1) / 2) * lineHeight}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          )
        })}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#edbf58" strokeWidth="10" />
        {Array.from({ length: 36 }, (_, index) => {
          const point = polar(center, center, radius, index * TAU / 36)
          return <circle key={index} cx={point.x} cy={point.y} r="3" fill="#fff9d9" />
        })}
        <circle cx={center} cy={center} r={54} fill="#0a2f6b" stroke="#f7e08a" strokeWidth="4" />
        <text x={center} y={center - 6} fill="#ffd75e" fontSize="17" fontWeight="800" textAnchor="middle">
          VINFAST
        </text>
        <text x={center} y={center + 16} fill="#ffffff" fontSize="12" textAnchor="middle">
          HOÀNG ANH
        </text>
      </svg>
      {spinning && <div className="wheel-glow" aria-hidden="true" />}
    </div>
  )
}

export { TAU }
