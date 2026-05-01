import { useState, useEffect, useRef } from 'react'

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1"/>
      <path d="M7 1.5V0.5M7 13.5V12.5M12.5 7H13.5M0.5 7H1.5M11.04 2.96L11.75 2.25M2.25 11.75L2.96 11.04M11.04 11.04L11.75 11.75M2.25 2.25L2.96 2.96" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
      <path d="M9.5 7.5A4.5 4.5 0 015 3a.45.45 0 00-.75-.34A5 5 0 1011.34 9.75.45.45 0 0011 9a4.5 4.5 0 01-1.5-1.5z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round"/>
    </svg>
  )
}

function RoomSymbol({ num, active }) {
  const line = active ? 'text-white/60' : 'text-white/18'
  const dot  = active ? 'text-white/90' : 'text-white/30'
  const dim  = active ? 'text-white/30' : 'text-white/10'

  switch (num) {
    case '01': {
      // Atrium — compass star (8 radiating rays, alternating long/short)
      const rays = [0, 45, 90, 135, 180, 225, 270, 315]
      return (
        <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
          {rays.map((deg, i) => {
            const r = deg * Math.PI / 180
            const len = i % 2 === 0 ? 22 : 11
            return (
              <line key={i} x1="30" y1="30"
                x2={30 + Math.cos(r) * len} y2={30 + Math.sin(r) * len}
                stroke="currentColor" strokeWidth="0.75" className={i % 2 === 0 ? line : dim} />
            )
          })}
          <circle cx="30" cy="30" r="2.5" fill="currentColor" className={dot} />
        </svg>
      )
    }
    case '02': {
      // Coffeehouse — fully connected web of nodes
      const pts = [[15,14],[45,14],[52,36],[30,52],[8,36]]
      const pairs = []
      for (let a = 0; a < pts.length; a++)
        for (let b = a + 1; b < pts.length; b++)
          pairs.push([pts[a], pts[b]])
      return (
        <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
          {pairs.map(([[x1,y1],[x2,y2]], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="currentColor" strokeWidth="0.5" className={dim} />
          ))}
          {pts.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i === 0 ? 2 : 1.5}
              fill="currentColor" className={i === 0 ? dot : line} />
          ))}
        </svg>
      )
    }
    case '03': {
      // Library — three stacked shelves + floating diamond
      return (
        <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
          <line x1="10" y1="43" x2="50" y2="43" stroke="currentColor" strokeWidth="0.75" className={dim} />
          <line x1="14" y1="34" x2="46" y2="34" stroke="currentColor" strokeWidth="0.75" className={line} />
          <line x1="18" y1="25" x2="42" y2="25" stroke="currentColor" strokeWidth="0.75" className={line} />
          <polygon points="30,8 34,15 30,22 26,15" fill="currentColor" className={dot} />
        </svg>
      )
    }
    case '04': {
      // Axis — crosshair target
      return (
        <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
          <circle cx="30" cy="30" r="17" stroke="currentColor" strokeWidth="0.75" className={dim} />
          <circle cx="30" cy="30" r="7"  stroke="currentColor" strokeWidth="0.75" className={line} />
          <line x1="30" y1="7"  x2="30" y2="21" stroke="currentColor" strokeWidth="0.75" className={line} />
          <line x1="30" y1="39" x2="30" y2="53" stroke="currentColor" strokeWidth="0.75" className={line} />
          <line x1="7"  y1="30" x2="21" y2="30" stroke="currentColor" strokeWidth="0.75" className={line} />
          <line x1="39" y1="30" x2="53" y2="30" stroke="currentColor" strokeWidth="0.75" className={line} />
          <circle cx="30" cy="30" r="2" fill="currentColor" className={dot} />
        </svg>
      )
    }
    case '05': {
      // Atelier — symmetrical diamond with center dot
      return (
        <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
          <polygon points="30,10 50,30 30,50 10,30"
            stroke="currentColor" strokeWidth="0.75" fill="none" className={line} />
          <circle cx="30" cy="30" r="2.5" fill="currentColor" className={dot} />
        </svg>
      )
    }
    default: return null
  }
}

function UniverseSphere({ isDark = true }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const dpr = window.devicePixelRatio || 1
    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    // Fibonacci sphere — evenly distributed nodes
    const N = 48
    const golden = (1 + Math.sqrt(5)) / 2
    const pts3d = Array.from({ length: N }, (_, i) => {
      const theta = Math.acos(1 - 2 * (i + 0.5) / N)
      const ang   = 2 * Math.PI * i / golden
      return [Math.sin(theta) * Math.cos(ang), Math.sin(theta) * Math.sin(ang), Math.cos(theta)]
    })

    // Connect every pair within ~50° angular distance
    const edges = []
    for (let a = 0; a < N; a++)
      for (let b = a + 1; b < N; b++) {
        const dot = pts3d[a][0]*pts3d[b][0] + pts3d[a][1]*pts3d[b][1] + pts3d[a][2]*pts3d[b][2]
        if (dot > 0.68) edges.push([a, b])
      }

    const cx = W / 2, cy = H / 2
    const R  = Math.min(W, H) * 0.42  // large enough to surround the content
    const TILT = 0.25

    let angle = 0

    function rotate(x, y, z, ay) {
      const cY = Math.cos(ay), sY = Math.sin(ay)
      const x1 = x * cY + z * sY, z1 = -x * sY + z * cY
      const cX = Math.cos(TILT), sX = Math.sin(TILT)
      return [x1, y * cX - z1 * sX, y * sX + z1 * cX]
    }

    function project([x, y, z]) {
      const fov = 4, scale = R * fov / (fov + z + 1)
      return [cx + x * scale, cy + y * scale, z]
    }

    const rgb = isDark ? '255,255,255' : '20,18,14'

    function draw() {
      ctx.clearRect(0, 0, W, H)

      const proj = pts3d.map(p => project(rotate(...p, angle)))

      // Edges — sorted back-to-front, depth-faded
      edges
        .map(([a, b]) => ({ a, b, z: (proj[a][2] + proj[b][2]) / 2 }))
        .sort((a, b) => a.z - b.z)
        .forEach(({ a, b, z }) => {
          const alpha = ((z + 1) / 2) * 0.10 + 0.02
          ctx.beginPath()
          ctx.moveTo(proj[a][0], proj[a][1])
          ctx.lineTo(proj[b][0], proj[b][1])
          ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        })

      // Nodes — depth-faded size + opacity
      proj
        .map((p, i) => ({ p, i }))
        .sort((a, b) => a.p[2] - b.p[2])
        .forEach(({ p: [x, y, z] }) => {
          const alpha = ((z + 1) / 2) * 0.22 + 0.06
          const r     = ((z + 1) / 2) * 1.2  + 0.4
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`
          ctx.fill()
        })

      angle += 0.0016
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}

const ROOMS = [
  {
    num: '01',
    name: 'The Atrium',
    desc: 'Your north star made visible. Creative mission, body of work, taste boards. You return here when you need to remember why you build.',
  },
  {
    num: '02',
    name: 'The Coffeehouse',
    desc: 'Where seeds live. Ideas, voice memos, research, sparks. Free-form, unhierarchical. AI surfaces connections quietly. You decide what matters.',
  },
  {
    num: '03',
    name: 'The Library',
    desc: 'Your domain of mastery. Every source, every insight, every spiky POV you have ever developed. This is where taste becomes expertise.',
  },
  {
    num: '04',
    name: 'The Axis',
    desc: 'Your strategic control room. Vision down to this week\'s deliverables. Goals, projects, deadlines. The map of where you are actually going.',
  },
  {
    num: '05',
    name: 'The Atelier',
    desc: 'The workshop. One project. One canvas. One thing. Relevant seeds surface. Flow begins. Agents handle distribution. You just make.',
  },
]

const QUOTES = [
  {
    text: 'There\'s a ton of value in there. I just can never find it.',
    attr: 'creator with 6,542 voice memos and 8,028 notes',
  },
  {
    text: 'I built a whole Notion system. It became another black hole. Seven layers of nested pages and none of my best thinking was actually connected to anything.',
    attr: 'writer and coder',
  },
  {
    text: 'I want a front room for regulars and a back room for close friends. Not a feed. Not content. A home.',
    attr: 'poet and musician',
  },
  {
    text: 'I think in rooms. Explore, evaluate, execute. I just need a tool that thinks the same way.',
    attr: 'filmmaker',
  },
]

function RoomCarousel({ isDark }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = ROOMS.length

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive(i => (i + 1) % n), 4200)
    return () => clearInterval(t)
  }, [paused, n])

  const go = (i) => {
    setPaused(true)
    setActive(((i % n) + n) % n)
  }

  const offset = (i) => {
    let off = (i - active + n) % n
    if (off > Math.floor(n / 2)) off -= n
    return off
  }

  const symbolGlow = isDark
    ? 'drop-shadow(0 0 5px rgba(255,255,255,0.45))'
    : 'drop-shadow(0 0 3px rgba(20,18,14,0.30))'

  return (
    <div className="mt-16 mb-4">
      {/* 3D stage */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: '1000px', height: '320px' }}
      >
        {ROOMS.map((room, i) => {
          const off  = offset(i)
          const abs  = Math.abs(off)
          const isActive = off === 0

          return (
            <div
              key={i}
              onClick={() => !isActive && go(i)}
              style={{
                position:        'absolute',
                width:           '220px',
                transform:       `translateX(${off * 190}px) translateZ(${-abs * 80}px) scale(${1 - abs * 0.12})`,
                opacity:         abs === 0 ? 1 : abs === 1 ? 0.60 : 0.22,
                zIndex:          10 - abs,
                transition:      'transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.65s ease',
                cursor:          isActive ? 'default' : 'pointer',
                backgroundColor: isDark
                  ? 'transparent'
                  : (isActive ? 'rgba(240, 236, 230, 0.95)' : 'rgba(235, 231, 225, 0.85)'),
              }}
              className={`p-7 select-none border transition-colors duration-500 ${
                isActive
                  ? 'border-white/20'
                  : 'border-white/[0.06]'
              }`}
            >
              {/* Symbol */}
              <div
                style={isActive ? { filter: symbolGlow } : {}}
                className={isActive ? 'text-white' : 'text-white/30'}
              >
                <RoomSymbol num={room.num} active={isActive} />
              </div>

              <p className="mono-caps text-[9px] text-white/20 mt-5 mb-1">{room.num}</p>
              <h3 className={`font-serif text-lg leading-snug mb-2 transition-colors duration-500 ${
                isActive ? 'text-white/80' : 'text-white/25'
              }`}>
                {room.name}
              </h3>
              <p className={`text-xs font-light leading-relaxed transition-colors duration-500 ${
                isActive ? 'text-white/40' : 'text-white/10'
              }`}>
                {room.desc}
              </p>
            </div>
          )
        })}
      </div>

      {/* Dot + arrow nav */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex items-center gap-2.5">
          {ROOMS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="flex items-center justify-center"
              aria-label={`Room ${i + 1}`}
            >
              <span
                className="block rounded-full transition-all duration-500"
                style={{
                  width:           i === active ? '20px' : '4px',
                  height:          '1px',
                  backgroundColor: i === active
                    ? 'rgba(255,255,255,0.5)'
                    : 'rgba(255,255,255,0.2)',
                }}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-8">
          <button
            onClick={() => go(active - 1)}
            className="mono-caps text-[10px] text-white/25 hover:text-white/55 transition-colors tracking-widest"
          >
            ← prev
          </button>
          <button
            onClick={() => go(active + 1)}
            className="mono-caps text-[10px] text-white/25 hover:text-white/55 transition-colors tracking-widest"
          >
            next →
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [email, setEmail]   = useState('')
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  return (
    <div className="min-h-screen bg-black text-white/80 overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center">
        <a href="/" className="block">
          <img src="/logo.png" alt="Atelier" className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity" />
        </a>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="text-white/30 hover:text-white/50 transition-colors"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href="#waitlist"
            className="mono-caps text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-2/3 left-1/3 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white/10 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/5 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1000"></div>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-center leading-[1.1] mb-8 max-w-4xl">
          <span className="text-white/90">A home for creators</span><br />
          <em className="italic text-white/60">who are done losing themselves</em>
        </h1>

        <p className="text-white/35 font-light text-center text-base md:text-lg max-w-xl leading-relaxed mb-12">
          Atelier is an integrated physical and digital home that maps to how you think. So your ideas compound instead of disappear. And you actually finish the work that matters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <a
            href="#waitlist"
            className="group flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 px-8 py-4 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500"
          >
            <span className="mono-caps text-xs text-white/60 group-hover:text-white/80">Join the Waitlist</span>
          </a>
          <a
            href="#mechanism"
            className="group flex items-center justify-center gap-2 px-8 py-4 text-white/30 hover:text-white/50 transition-all duration-500"
          >
            <span className="mono-caps text-xs">Explore</span>
            <span className="group-hover:translate-y-1 transition-transform duration-300">↓</span>
          </a>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">The Problem</p>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-16 leading-[1.15]">
            Clarity is the atomic element<br />
            <em className="italic text-white/40">of creative performance</em>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-8">
              <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">Your best ideas are buried.</p>
              <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">Somewhere in a voice memo.</p>
              <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">In the sixth app you opened today.</p>
            </div>
            <div className="space-y-8">
              <p className="text-white/25 font-light leading-relaxed">
                The problem is not that you lack ideas. It is that your best ones are buried. In a collapsed database. In a voice memo you never returned to.
              </p>
              <p className="text-white/25 font-light leading-relaxed">
                You are working constantly. But the work that actually matters never makes it out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE INSIGHT */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">The Insight</p>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-16 leading-[1.15]">
            The tools were not<br />
            <em className="italic text-white/40">built for you</em>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: (
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1" className="text-white/15" strokeDasharray="4 3" />
                  <path d="M20 8 L20 5 L23 8" stroke="currentColor" strokeWidth="1" className="text-white/30" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 32 L20 35 L17 32" stroke="currentColor" strokeWidth="1" className="text-white/30" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="20" cy="20" r="2" fill="currentColor" className="text-white/25" />
                </svg>
              ), label: 'They built in', name: 'Attention capture' },
              { icon: (
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <rect x="12" y="8" width="16" height="24" rx="2" stroke="currentColor" strokeWidth="1" className="text-white/15" />
                  <rect x="14" y="18" width="12" height="12" fill="currentColor" className="text-white/10" />
                  <line x1="20" y1="32" x2="20" y2="38" stroke="currentColor" strokeWidth="1" className="text-white/25" strokeDasharray="2 2" />
                  <circle cx="20" cy="13" r="2" stroke="currentColor" strokeWidth="1" className="text-white/30" />
                </svg>
              ), label: 'Every switch costs', name: 'Context and clarity' },
              { icon: (
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <rect x="8" y="28" width="24" height="4" stroke="currentColor" strokeWidth="1" className="text-white/15" />
                  <rect x="10" y="22" width="20" height="4" stroke="currentColor" strokeWidth="1" className="text-white/15" />
                  <rect x="12" y="16" width="16" height="4" stroke="currentColor" strokeWidth="1" className="text-white/20" />
                  <rect x="14" y="10" width="12" height="4" stroke="currentColor" strokeWidth="1" className="text-white/25" />
                  <rect x="16" y="4" width="8" height="4" stroke="currentColor" strokeWidth="1" className="text-white/30" />
                </svg>
              ), label: 'Features become', name: 'Decisions you didn\'t ask for' },
            ].map((card, i) => (
              <div key={i} className="border border-white/5 p-8 hover:border-white/10 transition-colors duration-500">
                <div className="w-10 h-10 mb-6">{card.icon}</div>
                <p className="text-white/50 text-sm mb-3">{card.label}</p>
                <p className="font-serif text-xl text-white/70">{card.name}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl">
            <p className="text-white/30 font-light leading-relaxed mb-6">
              They were built to capture your attention, not protect it. Every extra feature is a decision you did not ask to make.
            </p>
            <p className="text-white/50 font-light leading-relaxed text-lg">
              You do not need a more powerful workflow. You need simplicity. One place where your thinking can actually breathe.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: FIVE ROOMS */}
      <section id="mechanism" className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto w-full">
          <p className="mono-caps text-[10px] text-white/20 mb-6">The Mechanism</p>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-8 leading-[1.15]">
            Five rooms.<br />
            <em className="italic text-white/40">One home.</em>
          </h2>

          <p className="text-white/30 font-light text-lg mb-2 max-w-xl">
            A spatial environment that maps to how you actually work. Built around your goals, your context, your creative rhythm. Digital and physical. Notebook and app. One unified world.
          </p>

          <RoomCarousel isDark={isDark} />

          <p className="text-white/40 font-serif text-xl italic mt-12">
            "When you enter Atelier, the next step feels obvious. That is the whole point."
          </p>
        </div>
      </section>

      {/* SECTION 5: THE EXPERIENCE */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">The Experience</p>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-20 leading-[1.15]">
            Designed for wonder.<br />
            <em className="italic text-white/40">For stillness. For flow.</em>
          </h2>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              { label: 'Morning', quote: '"Let the light fade in"', body: 'Open session prompt. Set intention. Begin.' },
              { label: 'Deep Work', quote: '"The world fades out"', body: 'All distractions disappear. Only the edge of creation exists.' },
              { label: 'Evening', quote: '"Ideas you created today"', body: 'Integration, not accumulation. See what you built.' },
            ].map((col, i) => (
              <div key={i} className="text-center">
                <p className="mono-caps text-[10px] text-white/20 mb-6">{col.label}</p>
                <p className="font-serif text-2xl text-white/60 mb-4 italic">{col.quote}</p>
                <p className="text-white/25 font-light text-sm leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <p className="text-white/30 font-light leading-relaxed max-w-lg mx-auto">
              That pure focus. That edge. When everything disappears and the only thing that exists is the moment of creation.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE PHILOSOPHY */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">The Philosophy</p>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-20 leading-[1.15]">
            Think like<br />
            <em className="italic text-white/40">a genius</em>
          </h2>

          <div className="space-y-12 max-w-3xl">
            {[
              '"Excellence emerges when you create space for complete focus and stillness."',
              '"Thinking is leverage. Taste is the moat. Atelier is the fortress."',
              '"Everything is created twice. Every dream begins as a seed."',
            ].map((q, i) => (
              <blockquote key={i} className="border-l border-white/10 pl-8">
                <p className="text-white/50 text-xl md:text-2xl font-serif italic leading-relaxed">{q}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: SOCIAL PROOF */}
      <section className="py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-16">What Creators Are Saying</p>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {QUOTES.map((q, i) => (
              <blockquote key={i} className="border-l border-white/10 pl-8">
                <p className="text-white/50 font-serif italic leading-relaxed mb-5">"{q.text}"</p>
                <cite className="text-white/25 text-xs not-italic mono-caps tracking-wider">— {q.attr}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FOUNDER STORY */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">Origin</p>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-16 leading-[1.15]">
            I built this because<br />
            <em className="italic text-white/40">I had to</em>
          </h2>

          <div className="space-y-8 text-white/40 font-light leading-relaxed text-lg max-w-2xl">
            <p>I wanted somewhere my ideas could compound instead of disappear.</p>
            <p>Somewhere my work and life were one thing, not twelve tabs pulling in different directions.</p>
            <p className="text-white/60 font-serif text-xl italic pt-8">
              "Your attention is sacred. I am building something that treats it that way."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: CTA */}
      <section id="waitlist" className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        {/* Animated universe sphere — fills the section */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <UniverseSphere isDark={isDark} />
        </div>
        {/* Center darkening + edge vignette — text reads over the sphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 100%), radial-gradient(ellipse 85% 85% at 50% 50%, transparent 50%, rgba(0,0,0,0.5) 78%, black 95%)'
              : 'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(245,240,235,0.55) 0%, transparent 100%), radial-gradient(ellipse 85% 85% at 50% 50%, transparent 50%, rgba(245,240,235,0.5) 78%, rgb(245,240,235) 95%)',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center py-32">
          <p className="mono-caps text-[10px] text-white/20 mb-6">Enter</p>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white/80 mb-8 leading-[1.15]">
            Enter the<br />
            <em className="italic text-white/50">Atelier</em>
          </h2>

          <p className="text-white/30 font-light mb-12 max-w-md mx-auto">
            Join the waitlist. Be among the first to enter.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-4 text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors text-sm"
            />
            <button
              type="submit"
              className="mono-caps bg-white/[0.05] border border-white/10 px-8 py-4 text-white/60 hover:bg-white/[0.08] hover:text-white/80 transition-all duration-300 text-xs"
            >
              Join
            </button>
          </form>

          <p className="text-white/20 text-xs">No spam. No noise. Just signal.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Atelier" className="h-5 w-auto opacity-50" />
            <span className="text-white/20 text-xs">© 2026</span>
          </div>
          <p className="text-white/20 text-xs italic">Built with taste.</p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/50 transition-colors">Twitter</a>
            <a href="#" className="hover:text-white/50 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
