import { useState, useCallback } from 'react';
import { SectionMark } from './chrome.jsx';

function StillCard({ s, span }) {
  return (
    <figure style={{
      margin: 0,
      gridColumn: `span ${span.c}`,
      gridRow: `span ${span.r}`,
      position: 'relative', overflow: 'hidden',
      background: '#000', border: '1px solid var(--ink-3)',
    }}>
      <div className="still-bg" style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${s.src})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.92) contrast(1.04)',
        transition: 'filter 420ms var(--ease-cine), transform 420ms var(--ease-cine)',
      }} />
      <figcaption className="mono" style={{
        position: 'absolute', left: 12, bottom: 12,
        fontSize: 9.5, color: '#f4f1e9', letterSpacing: '0.14em',
        padding: '4px 10px',
        background: 'rgba(15,15,15,0.62)',
        backdropFilter: 'blur(14px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.3)',
        borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}>
        {s.caption}
      </figcaption>
    </figure>
  );
}

const STILLS_LAYOUT = [
  { c: 8, r: 5 }, { c: 4, r: 5 },
  { c: 6, r: 3 }, { c: 6, r: 3 },
  { c: 12, r: 4 },
  { c: 8, r: 5 }, { c: 4, r: 5 },
  { c: 6, r: 3 }, { c: 6, r: 3 },
  { c: 4, r: 5 }, { c: 8, r: 5 },
  { c: 6, r: 3 }, { c: 6, r: 3 },
  { c: 12, r: 4 },
  { c: 8, r: 5 }, { c: 4, r: 5 },
  { c: 8, r: 5 }, { c: 4, r: 5 },
  { c: 6, r: 3 }, { c: 6, r: 3 },
  { c: 8, r: 5 }, { c: 4, r: 5 },
];

export function Stills({ stills, overlays }) {
  const [filter, setFilter] = useState('ALL');
  const tags = ['ALL', ...Array.from(new Set(stills.map((s) => s.tag).filter(Boolean)))];
  const visible = filter === 'ALL' ? stills : stills.filter((s) => s.tag === filter);

  return (
    <section id="stills" style={{ padding: '192px 48px 0', maxWidth: 1600, margin: '0 auto' }}>
      <SectionMark
        num="03" label="STILLS — PHOTOGRAPHY"
        title="Frames that" italic="never moved."
        right={<>{stills.length} SELECTED FRAMES<br /><span style={{ color: 'var(--fg-1)' }}>FULL ARCHIVE ↗</span></>}
        overlays={overlays} />

      <div className="mono" style={{ display: 'flex', gap: 6, marginBottom: 24, fontSize: 11, letterSpacing: '0.12em' }}>
        {tags.map((k) => {
          const active = filter === k;
          return (
            <button key={k} onClick={() => setFilter(k)} style={{
              padding: '8px 14px',
              background: active ? 'var(--ink-2)' : 'transparent',
              border: '1px solid ' + (active ? 'var(--fg-3)' : 'var(--ink-4)'),
              color: active ? 'var(--fg-1)' : 'var(--fg-3)',
              borderRadius: 999, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 11,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              transition: 'all 240ms var(--ease-cine)',
            }}>{k}</button>
          );
        })}
        <div style={{ flex: 1 }} />
        <span style={{ color: 'var(--fg-4)', alignSelf: 'center', fontSize: 10.5 }}>
          {visible.length} OF {stills.length} FRAMES
        </span>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoRows: '110px', gap: 12,
      }}>
        {visible.map((s, i) => (
          <StillCard key={s.src} s={s} span={STILLS_LAYOUT[i % STILLS_LAYOUT.length]} />
        ))}
      </div>
    </section>
  );
}

export function Clients({ clients, overlays }) {
  const rows = [...clients].sort((a, b) => b.year.localeCompare(a.year));
  return (
    <section id="clients" style={{ padding: '192px 48px 0', maxWidth: 1400, margin: '0 auto' }}>
      <SectionMark
        num="04" label="CLIENTS — SELECTED"
        title="Select" italic="clients."
        right={<>{rows.length} ORGANIZATIONS<br /><span style={{ color: 'var(--fg-1)' }}>2024 — 2025</span></>}
        overlays={overlays} />

      <div className="mono" style={{
        display: 'grid', gridTemplateColumns: '80px 1fr 1fr 100px',
        gap: 32, padding: '0 8px 12px',
        fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.14em',
        borderBottom: '1px solid var(--ink-4)',
      }}>
        <span>NO.</span><span>NAME</span><span>SECTOR</span>
        <span style={{ textAlign: 'right' }}>YEAR</span>
      </div>

      {rows.map((c, i) => {
        const hasLink = !!c.url;
        const Tag = hasLink ? 'a' : 'div';
        const tagProps = hasLink ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' } : {};
        return (
          <Tag key={c.name} {...tagProps} style={{
            display: 'grid', gridTemplateColumns: '80px 1fr 1fr 100px',
            gap: 32, padding: '24px 8px',
            borderBottom: '1px solid var(--ink-4)',
            alignItems: 'center',
            transition: 'background 200ms var(--ease-cine)',
            cursor: hasLink ? 'pointer' : 'default',
            textDecoration: 'none', color: 'inherit',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ink-1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="serif" style={{
              fontSize: 28, lineHeight: 1.0, color: 'var(--fg-1)', letterSpacing: '-0.02em',
              display: 'inline-flex', alignItems: 'baseline', gap: 10,
            }}>
              {c.name}
              {hasLink && <span className="mono" style={{ fontSize: 11, color: 'var(--fg-4)', letterSpacing: 0 }}>↗</span>}
            </span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{c.sector}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'right' }}>{c.year}</span>
          </Tag>
        );
      })}
    </section>
  );
}

export function About({ about, overlays }) {
  return (
    <section id="about" style={{ padding: '192px 48px 0', maxWidth: 1400, margin: '0 auto' }}>
      <SectionMark
        num="05" label="MY STORY · ON RECORD"
        title="The story," italic="in full."
        right={<>FIRST-PERSON<br /><span style={{ color: 'var(--fg-1)' }}>READ TIME · 3 MIN</span></>}
        overlays={overlays} />

      {/* (I) WHO I AM */}
      <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 64, marginBottom: 96 }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'relative', aspectRatio: '4/5', background: '#000',
            border: '1px solid var(--ink-4)', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${about.portrait})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'brightness(0.96) contrast(1.06)',
            }} />
            {overlays && [
              { top: 8, left: 8, b: ['t', 'l'] }, { top: 8, right: 8, b: ['t', 'r'] },
              { bottom: 8, left: 8, b: ['b', 'l'] }, { bottom: 8, right: 8, b: ['b', 'r'] },
            ].map((c, i) => (
              <div key={i} style={{
                position: 'absolute', width: 14, height: 14,
                top: c.top, left: c.left, right: c.right, bottom: c.bottom,
                borderTop:    c.b.includes('t') ? '1px solid var(--fg-1)' : 'none',
                borderBottom: c.b.includes('b') ? '1px solid var(--fg-1)' : 'none',
                borderLeft:   c.b.includes('l') ? '1px solid var(--fg-1)' : 'none',
                borderRight:  c.b.includes('r') ? '1px solid var(--fg-1)' : 'none',
              }} />
            ))}
            {overlays && (
              <div className="mono" style={{
                position: 'absolute', top: 18, left: 18,
                fontSize: 9, color: 'var(--fg-1)', letterSpacing: '0.18em',
                padding: '4px 8px',
                background: 'rgba(20,20,20,0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 999,
              }}>SUBJECT · DITTMAR</div>
            )}
          </div>
          <div className="mono" style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.14em', marginTop: 10,
          }}>
            <span>STUDY 09 · 2025</span>
            <span>50 MM · T 1.4</span>
          </div>
        </div>

        <div style={{ paddingTop: 16 }}>
          <div className="mono" style={{
            fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.18em',
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ color: 'var(--fg-4)' }}>(I)</span>
            <span>WHO I AM</span>
            <span style={{ flex: 1, height: 1, background: 'var(--ink-4)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 620 }}>
            {about.who.map((p, i) => (
              <p key={i} className="serif" style={{
                margin: 0,
                fontSize: 'clamp(22px, 1.9vw, 28px)',
                lineHeight: 1.25, letterSpacing: '-0.01em',
                color: 'var(--fg-1)', textWrap: 'balance',
              }}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        borderTop: '1px solid var(--ink-4)', borderBottom: '1px solid var(--ink-4)',
        marginBottom: 96,
      }}>
        {about.stats.map((s, i) => (
          <div key={s.l} style={{
            padding: '40px 24px',
            borderRight: i < about.stats.length - 1 ? '1px solid var(--ink-4)' : 'none',
            display: 'flex', flexDirection: 'column', gap: 10, position: 'relative',
          }}>
            <span className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.16em' }}>(0{i + 1})</span>
            <div className="compressed" style={{
              fontSize: 88, lineHeight: 0.9, color: 'var(--fg-1)',
              fontVariationSettings: "'wdth' 75", letterSpacing: '-0.03em',
            }}>{s.v}</div>
            <span className="mono" style={{ fontSize: 10.5, color: 'var(--fg-3)', letterSpacing: '0.14em' }}>{s.l}</span>
          </div>
        ))}
      </div>

      {/* (II) HOW I GOT HERE */}
      <div style={{ marginBottom: 96 }}>
        <div className="mono" style={{
          fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.18em',
          marginBottom: 36, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ color: 'var(--fg-4)' }}>(II)</span>
          <span>HOW I GOT HERE</span>
          <span style={{ flex: 1, height: 1, background: 'var(--ink-4)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'start' }}>
          <div className="mono" style={{
            fontSize: 10.5, color: 'var(--fg-4)', letterSpacing: '0.14em', paddingTop: 6, lineHeight: 1.6,
          }}>
            <div>FOLIO 05.II</div>
            <div>ENTRY · 2018 TO PRESENT</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 660 }}>
            {about.journey.map((p, i) => (
              <p key={i} style={{
                margin: 0, fontFamily: 'SF Pro, sans-serif',
                fontSize: 17, lineHeight: 1.6, color: 'var(--fg-2)', textWrap: 'pretty',
              }}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* (III) WHAT I BELIEVE */}
      <div style={{ marginBottom: 96 }}>
        <div className="mono" style={{
          fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.18em',
          marginBottom: 36, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ color: 'var(--fg-4)' }}>(III)</span>
          <span>WHAT I BELIEVE</span>
          <span style={{ flex: 1, height: 1, background: 'var(--ink-4)' }} />
        </div>
        <div style={{ borderBottom: '1px solid var(--ink-4)', padding: '24px 0 72px' }}>
          <p className="serif" style={{
            margin: '0 auto 56px', maxWidth: 980,
            fontSize: 'clamp(34px, 3.4vw, 48px)',
            lineHeight: 1.12, letterSpacing: '-0.02em',
            color: 'var(--fg-1)', fontStyle: 'italic',
            textWrap: 'balance', textAlign: 'center',
          }}>
            {about.lead}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 660, margin: '0 auto' }}>
            {about.closing.map((p, i) => (
              <p key={i} className="serif" style={{
                margin: 0,
                fontSize: 'clamp(17px, 1.35vw, 19px)',
                lineHeight: 1.55, letterSpacing: '-0.005em',
                color: 'var(--fg-2)', fontStyle: 'italic', textWrap: 'pretty',
              }}>{p}</p>
            ))}
          </div>

          {about.tenets && (
            <div style={{ maxWidth: 820, margin: '72px auto 0', paddingTop: 48, borderTop: '1px solid var(--ink-4)' }}>
              <div className="mono" style={{
                fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.2em',
                textAlign: 'center', marginBottom: 36,
              }}>(TENETS)</div>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
                {about.tenets.map((t, i) => (
                  <li key={i} style={{
                    display: 'grid', gridTemplateColumns: '56px 1fr', gap: 24,
                    padding: '20px 0',
                    borderTop: i === 0 ? 'none' : '1px dashed var(--ink-4)',
                    alignItems: 'baseline',
                  }}>
                    <span className="mono" style={{ fontSize: 10.5, color: 'var(--fg-4)', letterSpacing: '0.16em' }}>
                      {'0' + (i + 1)}
                    </span>
                    <span className="serif" style={{
                      fontSize: 'clamp(17px, 1.4vw, 20px)',
                      lineHeight: 1.45, letterSpacing: '-0.005em',
                      color: 'var(--fg-1)', textWrap: 'pretty',
                    }}>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Kit */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32 }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.14em' }}>
          (KIT · TYPICAL)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {about.kit.map(([k, v], i) => (
            <div key={k} style={{
              display: 'grid', gridTemplateColumns: '160px 1fr',
              padding: '20px 0',
              borderTop: i === 0 ? '1px solid var(--ink-4)' : 'none',
              borderBottom: '1px solid var(--ink-4)',
              alignItems: 'center', gap: 32,
            }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.14em' }}>{k}</span>
              <span style={{ fontFamily: 'SF Pro, sans-serif', fontSize: 16, color: 'var(--fg-1)', lineHeight: 1.45 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ identity, overlays }) {
  const [copied, setCopied] = useState(false);
  const copyEmail = useCallback(() => {
    try {
      navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      window.location.href = 'mailto:' + identity.email;
    }
  }, [identity.email]);

  return (
    <section id="contact" style={{
      padding: '192px 48px 0', maxWidth: 1600, margin: '0 auto',
      textAlign: 'center', position: 'relative',
    }}>
      <div className="mono" style={{
        fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.14em', marginBottom: 32,
      }}>(BOOKING · Q2 2026)</div>

      <h2 className="serif" style={{
        margin: 0,
        fontSize: 'clamp(72px, 11vw, 168px)',
        lineHeight: 0.92, letterSpacing: '-0.035em',
        color: 'var(--fg-1)', textWrap: 'balance',
      }}>
        Let's make<br />
        <em style={{ color: 'var(--fg-2)' }}>something essential.</em>
      </h2>

      <div style={{ marginTop: 56, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <button onClick={copyEmail} style={{
          padding: '18px 28px', background: 'transparent',
          color: 'var(--fg-1)', border: '1px solid var(--fg-3)', borderRadius: 999,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.12em',
          textTransform: 'uppercase', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 12,
          transition: 'all 240ms var(--ease-cine)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--fg-1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--fg-3)'; }}>
          <span className="ms" style={{ fontSize: 18, fontVariationSettings: "'wght' 300" }}>
            {copied ? 'check' : 'mail'}
          </span>
          {copied ? 'COPIED · ' : ''}{identity.email}
        </button>

        <a href={'mailto:' + identity.email} style={{
          padding: '18px 24px', color: 'var(--fg-1)', borderRadius: 999,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.12em',
          textTransform: 'uppercase', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 10,
          border: '1px solid #c83a3a', background: '#c83a3a',
          transition: 'all 240ms var(--ease-cine)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#7a2424'; e.currentTarget.style.borderColor = '#7a2424'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#c83a3a'; e.currentTarget.style.borderColor = '#c83a3a'; }}>
          BOOK A CALL
          <span className="ms" style={{ fontSize: 16, fontVariationSettings: "'wght' 300" }}>arrow_outward</span>
        </a>
      </div>

      <div className="mono" style={{
        marginTop: 80, display: 'flex', justifyContent: 'center', gap: 48,
        fontSize: 10.5, color: 'var(--fg-3)', letterSpacing: '0.14em',
      }}>
        <span>{identity.location}</span>
        <span style={{ color: 'var(--fg-4)' }}>·</span>
        <span style={{ color: 'var(--fg-2)' }}>{identity.available}</span>
        <span style={{ color: 'var(--fg-4)' }}>·</span>
        <span>RESPONSE WITHIN 48H</span>
      </div>
    </section>
  );
}
