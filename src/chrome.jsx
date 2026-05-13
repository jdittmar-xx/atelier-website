import { useState, useEffect, useRef } from 'react';

export function useMobile(bp = 768) {
  const [m, setM] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const h = () => setM(window.innerWidth < bp);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [bp]);
  return m;
}

export function Wordmark({ size = 22, color }) {
  return (
    <span style={{
      fontFamily: '"HV Fitzgerald"',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: 17,
      color: color || 'var(--fg-1)',
      letterSpacing: '-1px',
      lineHeight: 1,
      textTransform: 'none',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    }}>
      atelier \ maison<span style={{ color: 'var(--red)', fontSize: 12, fontWeight: 200 }}></span>
    </span>
  );
}

export function Grain({ opacity = 0.05 }) {
  return (
    <div aria-hidden="true" style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999,
      backgroundImage: 'url(/grain.svg)',
      backgroundSize: '220px 220px',
      opacity,
      mixBlendMode: 'overlay'
    }} />
  );
}

export function TopBar({ identity, current, theme = 'dark', onToggleTheme }) {
  const isLight = theme === 'light';
  const isMobile = useMobile();
  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, top: 0, zIndex: 40,
      height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      background: isLight ? 'rgba(244,241,233,0.62)' : 'rgba(12,12,12,0.50)',
      backdropFilter: 'blur(22px) saturate(1.4)',
      WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
      borderBottom: '1px solid ' + (isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)'),
      boxShadow: isLight
        ? 'inset 0 1px 0 rgba(255,255,255,0.55)'
        : 'inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      <a href="#reel" style={{ cursor: 'pointer', fontFamily: '"JetBrains Mono"', display: 'flex', alignItems: 'center' }}>
        <Wordmark size={13} />
      </a>
      <div className="mono" style={{
        display: 'flex', gap: 24, alignItems: 'center',
        fontSize: 10.5, letterSpacing: '0.1em',
        color: 'var(--fg-3)'
      }}>
        {!isMobile && <span><span style={{ color: 'var(--red)' }}></span>  </span>}
        {!isMobile && <span>{identity.location}</span>}
        {!isMobile && <span style={{ color: current ? 'var(--fg-2)' : 'var(--fg-4)' }}>
          ({(current === 'REEL' ? 'HOME' : current) || 'INDEX'})
        </span>}
        {onToggleTheme && (
          <button onClick={onToggleTheme} aria-label="Toggle theme" style={{
            width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent',
            border: '1px solid var(--ink-4)',
            borderRadius: 999,
            color: 'var(--fg-2)',
            cursor: 'pointer',
            padding: 0,
            transition: 'border-color 200ms var(--ease-cine), color 200ms var(--ease-cine)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--fg-3)'; e.currentTarget.style.color = 'var(--fg-1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--ink-4)'; e.currentTarget.style.color = 'var(--fg-2)'; }}>
            <span className="ms" style={{ fontSize: 15, fontVariationSettings: "'wght' 300" }}>
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export const NAV_ITEMS = [
  { id: 'reel',    icon: 'play_arrow',  label: 'REEL' },
  { id: 'work',    icon: 'collections', label: 'WORK' },
  { id: 'stills',  icon: 'image',       label: 'STILLS' },
  { id: 'clients', icon: 'apartment',   label: 'CLIENTS' },
  { id: 'about',   icon: 'person',      label: 'STORY' },
  { id: 'contact', icon: 'mail',        label: 'CONTACT' },
  { id: 'writing', icon: 'edit_note',   label: 'WRITING' },
];

export function FloatNav({ activeId, showLabels, theme = 'dark' }) {
  const isLight = theme === 'light';
  return (
    <div style={{
      position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)',
      zIndex: 50, display: 'flex', alignItems: 'center', gap: 12
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '8px 12px',
        background: isLight ? 'rgba(252,249,243,0.92)' : 'rgba(20,20,20,0.55)',
        backdropFilter: 'blur(28px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
        border: '1px solid ' + (isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.08)'),
        borderRadius: 999,
        boxShadow: isLight
          ? 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 6px rgba(20,18,12,0.06), 0 12px 32px rgba(20,18,12,0.16)'
          : 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.5)',
      }}>
        {NAV_ITEMS.map((it) => {
          const active = activeId === it.id;
          const activeBg = isLight ? 'rgba(0,0,0,0.09)' : 'rgba(255,255,255,0.10)';
          const href = it.href ? it.href : '#' + it.id;
          return (
            <a key={it.id} href={href} title={it.label}
               target={it.external ? '_blank' : undefined}
               style={{
                 position: 'relative',
                 height: 42,
                 minWidth: 42,
                 padding: showLabels ? '0 14px 0 12px' : 0,
                 background: active ? activeBg : 'transparent',
                 borderRadius: 999, cursor: 'pointer',
                 display: 'flex', alignItems: 'center', gap: 8,
                 justifyContent: 'center',
                 transition: 'background 240ms var(--ease-cine)',
               }}>
              <span className="ms" style={{
                fontSize: 22, color: active ? 'var(--fg-1)' : 'var(--fg-2)',
                fontVariationSettings: "'wght' 300",
              }}>{it.icon}</span>
              {showLabels && (
                <span className="mono" style={{
                  fontSize: 10, color: active ? 'var(--fg-1)' : 'var(--fg-2)',
                  letterSpacing: '0.12em',
                }}>{it.label}</span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function Footer({ identity, theme = 'dark' }) {
  const isLight = theme === 'light';
  const isMobile = useMobile();
  const year = '2026';
  return (
    <footer style={{
      marginTop: 192,
      padding: isMobile ? '56px 24px 120px' : '72px 48px 140px',
      background: isLight ? 'rgba(244,241,233,0.62)' : 'rgba(12,12,12,0.50)',
      backdropFilter: 'blur(22px) saturate(1.4)',
      WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
      borderTop: '1px solid ' + (isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)'),
      boxShadow: isLight
        ? 'inset 0 1px 0 rgba(255,255,255,0.55)'
        : 'inset 0 1px 0 rgba(255,255,255,0.05)',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : '1.4fr 1fr 1fr 1fr',
      gap: isMobile ? 32 : 48,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.10em',
      color: 'var(--fg-3)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Wordmark size={32} />
        <span style={{ marginTop: 8 }}>© {year} · ALL FILMS RESERVED</span>
        <span style={{ color: 'var(--fg-4)' }}>{identity.location}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ color: 'var(--fg-4)' }}>(WORK)</span>
        <a href="#work" className="link-line">Selected films</a>
        <a href={identity.substack || '#'} target="_blank" rel="noopener noreferrer" className="link-line">Writing <span style={{ color: 'var(--fg-4)', marginLeft: 4 }}>↗</span></a>
        <a href="#stills" className="link-line">Stills</a>
        <a href="#clients" className="link-line">Clients</a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ color: 'var(--fg-4)' }}>(ELSEWHERE)</span>
        <a href="https://www.instagram.com/dittmars.archive/" target="_blank" rel="noopener noreferrer" className="link-line">Instagram <span style={{ color: 'var(--fg-4)', marginLeft: 4 }}>↗</span></a>
        <a href="https://www.tiktok.com/@dittmar.x" target="_blank" rel="noopener noreferrer" className="link-line">TikTok <span style={{ color: 'var(--fg-4)', marginLeft: 4 }}>↗</span></a>
        <a href="https://www.youtube.com/@dittmar.x" target="_blank" rel="noopener noreferrer" className="link-line">YouTube <span style={{ color: 'var(--fg-4)', marginLeft: 4 }}>↗</span></a>
        <a href="https://x.com/jamiedittmar" target="_blank" rel="noopener noreferrer" className="link-line">X <span style={{ color: 'var(--fg-4)', marginLeft: 4 }}>↗</span></a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ color: 'var(--fg-4)' }}>(CONTACT)</span>
        <a href={'mailto:' + identity.email} className="link-line">{identity.email}</a>
        <span style={{
          color: 'var(--fg-2)', textTransform: 'none', letterSpacing: 0,
          fontFamily: 'SF Pro, sans-serif', fontStyle: 'italic', marginTop: 4,
        }}>
          {identity.available.replace('AVAILABLE ', 'Available ')}.
        </span>
      </div>
    </footer>
  );
}

export function Reveal({ children, delay = 0, as: Tag = 'div', style = {}, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('in'), delay);
          io.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} data-reveal="" style={style} {...rest}>{children}</Tag>;
}

export function SectionMark({ num, label, title, italic, right, overlays = true }) {
  const isMobile = useMobile();
  return (
    <div style={{
      position: 'relative',
      padding: '0 0 48px',
      borderBottom: '1px solid var(--ink-4)',
      marginBottom: isMobile ? 40 : 64,
    }}>
      {overlays && !isMobile && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(to right, rgba(232,234,236,0.04) 1px, transparent 1px),
            linear-gradient(to right, rgba(232,234,236,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '33.33% 100%, 66.66% 100%',
          backgroundPosition: '0 0, 0 0',
        }} />
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'auto 1fr' : 'auto 1fr auto',
        alignItems: 'end',
        gap: isMobile ? 16 : 48,
      }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span className="compressed" style={{
            fontSize: isMobile ? 'clamp(56px, 16vw, 96px)' : 180,
            lineHeight: 0.78, color: 'var(--fg-1)',
            fontWeight: 400, letterSpacing: '-0.04em', display: 'inline-block',
            fontVariationSettings: "'wdth' 75",
          }}>{num}</span>
          {overlays && !isMobile && (
            <span className="mono" style={{
              position: 'absolute', top: -8, right: -22,
              fontSize: 9, color: 'var(--fg-4)', letterSpacing: '0.14em',
            }}>1.0X</span>
          )}
        </div>

        <div>
          <div className="mono" style={{ fontSize: isMobile ? 10 : 11, color: 'var(--fg-3)', marginBottom: 14 }}>
            ({label})
          </div>
          <h2 className="serif" style={{
            margin: 0,
            fontSize: isMobile ? 'clamp(28px, 8vw, 48px)' : 'clamp(40px, 5vw, 64px)',
            lineHeight: 0.98, letterSpacing: '-0.025em',
            color: 'var(--fg-1)', textWrap: 'balance',
          }}>
            {title}{italic && <><br /><em style={{ color: 'var(--fg-2)' }}>{italic}</em></>}
          </h2>
        </div>

        {!isMobile && (
          <div className="mono" style={{
            textAlign: 'right', fontSize: 10.5, color: 'var(--fg-3)',
            lineHeight: 1.6, minWidth: 140,
          }}>
            {right}
          </div>
        )}
      </div>
    </div>
  );
}
