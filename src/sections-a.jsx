import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SectionMark, Reveal } from './chrome.jsx';

export function Hero({ tweaks, statement, identity }) {
  const variant = tweaks.heroVariant;
  const showOverlays = tweaks.overlays;

  return (
    <section id="reel" style={{
      position: 'relative', height: '100vh', minHeight: 720,
      overflow: 'hidden', background: '#000',
    }}>
      {variant !== 'statement' && (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/stills/ferrari-testarossa.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.78) contrast(1.06) saturate(0.92)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 32%, transparent 50%, rgba(0,0,0,0.95) 100%)',
          }} />
        </>
      )}

      {variant === 'grid' && (
        <div style={{
          position: 'absolute', inset: '120px 48px 220px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, opacity: 0.55,
        }}>
          {['headlight.jpg','coffee-window.jpg','coffee-pour.jpg','car-motion.jpg','taillights.jpg','coffee-setup.jpg','portrait-01.jpg','porsche-headlight.jpg'].map((s, i) => (
            <div key={i} style={{
              backgroundImage: `url(/stills/${s})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              aspectRatio: '4/5', filter: 'brightness(0.78) saturate(0.9)',
            }} />
          ))}
        </div>
      )}

      {showOverlays && (
        <div className="mono" style={{
          position: 'absolute', top: 88, left: 48,
          fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.10em',
          display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 320,
        }}>
          <span style={{ color: 'var(--fg-2)' }}>CINEMATIC STORYTELLING · BRANDING</span>
          <span style={{ color: 'var(--fg-4)' }}>2019 — 2026 · SELECTED FRAMES</span>
        </div>
      )}

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 200, padding: '0 48px' }}>
        <h1 className="serif" style={{
          margin: 0,
          fontSize: 'clamp(72px, 11vw, 168px)',
          lineHeight: 0.90, letterSpacing: '-0.035em',
          color: 'var(--fg-1)', textWrap: 'balance',
        }}>
          {statement.lead}<br />
          <em style={{ color: 'var(--fg-2)' }}>{statement.italic}</em>
        </h1>
      </div>

      <div className="mono" style={{
        position: 'absolute', left: 48, right: 48, bottom: 110,
        display: 'flex', alignItems: 'center', gap: 16,
        fontSize: 10.5, color: 'var(--fg-3)', letterSpacing: '0.10em',
      }}>
        <span style={{ color: 'var(--fg-1)' }}>SCROLL ↓</span>
        <div style={{ flex: 1, height: 1, background: 'var(--ink-5)' }} />
        <span>14 SELECTED FILMS · 2025-2026</span>
      </div>
    </section>
  );
}

function resolveEmbed(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const h = u.hostname.replace(/^www\./, '');
    if (h.endsWith('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id) return { kind: 'iframe', embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`, ratio: '16 / 9' };
    }
    if (h === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return { kind: 'iframe', embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`, ratio: '16 / 9' };
    }
    if (h.endsWith('youtube.com')) {
      const id = u.searchParams.get('v') || u.pathname.match(/\/shorts\/([^/]+)/)?.[1];
      if (id) return { kind: 'iframe', embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`, ratio: u.pathname.includes('/shorts/') ? '9 / 16' : '16 / 9' };
    }
    if (h.endsWith('instagram.com')) {
      const m = u.pathname.match(/\/(reel|reels|p|tv)\/([^/]+)/);
      if (m) return { kind: 'iframe', embedUrl: `https://www.instagram.com/${m[1] === 'reels' ? 'reel' : m[1]}/${m[2]}/embed/`, ratio: '9 / 16' };
    }
    if (h.endsWith('tiktok.com')) {
      const m = u.pathname.match(/\/video\/(\d+)/);
      if (m) return { kind: 'iframe', embedUrl: `https://www.tiktok.com/player/v1/${m[1]}?autoplay=1&music_info=0&description=0&controls=1&loop=0`, ratio: '9 / 16' };
    }
  } catch (_) {}
  return { kind: 'external', embedUrl: url, ratio: '16 / 9' };
}

function Lightbox({ film, onClose }) {
  const embed = film && resolveEmbed(film.url);
  useEffect(() => {
    if (!film) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [film, onClose]);

  if (!film || !embed) return null;

  const isPortrait = embed.ratio === '9 / 16';
  const isInstagram = embed.embedUrl.includes('instagram.com');
  const IG_TOP_CROP = 54;
  const IG_BOTTOM_CROP = 165;

  return ReactDOM.createPortal((
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.78)',
      backdropFilter: 'blur(18px) saturate(0.9)',
      WebkitBackdropFilter: 'blur(18px) saturate(0.9)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 48,
    }}>
      <div className="mono" style={{
        position: 'absolute', top: 24, left: 32, right: 96,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.12em',
        pointerEvents: 'none',
      }}>
        <span><span style={{ color: 'var(--red)' }}>●</span>&nbsp; NOW PLAYING — {film.num}&nbsp; <span style={{ color: 'var(--fg-1)' }}>{film.title.toUpperCase()}</span></span>
        <span>{film.kind} · {film.format} · {film.runtime} · {film.year}</span>
      </div>

      <button onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close" style={{
        position: 'absolute', top: 24, right: 24,
        width: 48, height: 48,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(20,20,20,0.55)',
        backdropFilter: 'blur(20px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.5)',
        color: 'var(--fg-1)', cursor: 'pointer', borderRadius: 999,
        transition: 'transform 200ms var(--ease-cine), background 200ms var(--ease-cine)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(40,40,40,0.7)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20,20,20,0.55)'; e.currentTarget.style.transform = 'scale(1)'; }}>
        <span className="ms" style={{ fontSize: 22, fontVariationSettings: "'wght' 300" }}>close</span>
      </button>

      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'relative', padding: 10, borderRadius: 14,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(24px) saturate(1.1)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.1)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 120px -20px rgba(0,0,0,0.9)',
      }}>
        <div style={{
          position: 'relative',
          height: isPortrait ? 'min(82vh, 860px)' : 'auto',
          width: isPortrait ? 'auto' : 'min(88vw, 1400px)',
          aspectRatio: embed.ratio,
          background: '#000', borderRadius: 6, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {isInstagram ? (
            <div style={{ position: 'absolute', left: 0, right: 0, top: -IG_TOP_CROP, bottom: -IG_BOTTOM_CROP }}>
              <iframe src={embed.embedUrl} allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen frameBorder="0" scrolling="no"
                style={{ width: '100%', height: '100%', display: 'block', border: 0, background: '#000' }} />
            </div>
          ) : (
            <iframe src={embed.embedUrl} allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen frameBorder="0" scrolling="no"
              style={{ width: '100%', height: '100%', display: 'block', border: 0 }} />
          )}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 32, left: 32, right: 32, textAlign: 'center',
        fontFamily: 'SF Pro, sans-serif', fontStyle: 'italic', fontSize: 15,
        color: 'var(--fg-2)', maxWidth: 720, margin: '0 auto', pointerEvents: 'none',
      }}>
        {film.logline}
      </div>
    </div>
  ), document.body);
}

function WorkRow({ film, idx, hovered, setHovered, onOpen }) {
  const isHovered = hovered === idx;
  const hasLink = !!film.url;
  const embed = hasLink && resolveEmbed(film.url);
  const willLightbox = embed && embed.kind === 'iframe';
  return (
    <a href={film.url || '#'}
       target={hasLink && !willLightbox ? '_blank' : undefined}
       rel={hasLink && !willLightbox ? 'noopener noreferrer' : undefined}
       onClick={(e) => {
         if (!hasLink) { e.preventDefault(); return; }
         if (willLightbox) { e.preventDefault(); onOpen(film); }
       }}
       onMouseEnter={() => setHovered(idx)}
       style={{
         display: 'grid',
         gridTemplateColumns: '64px 1.6fr 1fr 140px 120px 120px 80px',
         alignItems: 'center', gap: 24, padding: '28px 8px',
         borderBottom: '1px solid var(--ink-4)',
         transition: 'background 240ms var(--ease-cine), color 240ms var(--ease-cine)',
         background: isHovered ? 'var(--ink-1)' : 'transparent',
         cursor: 'pointer', position: 'relative',
       }}>
      <span className="mono" style={{
        fontSize: 11, color: film.selected ? 'var(--red)' : 'var(--fg-3)',
        letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        {hasLink && (
          <span className="ms" style={{
            fontSize: 14, color: isHovered ? 'var(--red)' : 'var(--fg-3)',
            fontVariationSettings: "'wght' 300, 'FILL' 1",
            transition: 'color 240ms var(--ease-cine)',
          }}>play_circle</span>
        )}
        {film.num}
      </span>

      <div>
        <div className="serif" style={{
          fontSize: 30, lineHeight: 1.05, color: 'var(--fg-1)', letterSpacing: '-0.015em',
        }}>{film.title}</div>
        <div style={{
          fontFamily: 'SF Pro, sans-serif', fontSize: 14, color: 'var(--fg-2)',
          marginTop: 4, lineHeight: 1.4, fontStyle: 'italic', maxWidth: 520,
        }}>{film.logline}</div>
      </div>

      <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
        {film.director}{film.client ? ' · ' + film.client : ''}
      </span>
      <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{film.kind}</span>
      <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{film.format} · {film.runtime}</span>
      <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{film.aspect}</span>
      <span className="mono" style={{ fontSize: 11, color: isHovered ? 'var(--red)' : 'var(--fg-4)', textAlign: 'right' }}>
        {film.year}
      </span>
    </a>
  );
}

export function Work({ films, overlays }) {
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [openFilm, setOpenFilm] = useState(null);
  const kinds = ['ALL', ...Array.from(new Set(films.map((f) => f.kind)))];
  const visible = filter === 'ALL' ? films : films.filter((f) => f.kind === filter);

  return (
    <section id="work" style={{ padding: '160px 48px 0', maxWidth: 1600, margin: '0 auto', position: 'relative' }}>
      <SectionMark
        num="02" label="SELECTED VIDEOGRAPHY"
        title="Three years," italic="one obsession."
        right={<>INDEX 01 — 06<br /><span style={{ color: 'var(--fg-1)' }}>SHOWING ALL ↘</span></>}
        overlays={overlays} />

      <div className="mono" style={{ display: 'flex', gap: 6, marginBottom: 32, fontSize: 11, letterSpacing: '0.12em' }}>
        {kinds.map((k) => {
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
          {visible.length} OF {films.length} RESULTS
        </span>
      </div>

      <div className="mono" style={{
        display: 'grid',
        gridTemplateColumns: '64px 1.6fr 1fr 140px 120px 120px 80px',
        gap: 24, padding: '0 8px 12px',
        fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.14em',
        borderBottom: '1px solid var(--ink-4)',
      }}>
        <span>NO.</span>
        <span>TITLE</span>
        <span>DIRECTOR · CLIENT</span>
        <span>KIND</span>
        <span>FORMAT · RUN</span>
        <span>ASPECT</span>
        <span style={{ textAlign: 'right' }}>YEAR</span>
      </div>

      <div onMouseLeave={() => setHovered(null)}>
        {visible.map((f, i) => (
          <WorkRow key={f.num} film={f} idx={i} hovered={hovered}
            setHovered={setHovered} onOpen={setOpenFilm} />
        ))}
      </div>

      <Lightbox film={openFilm} onClose={() => setOpenFilm(null)} />
    </section>
  );
}

export function Notes({ notes, overlays }) {
  return (
    <section id="notes" style={{ padding: '192px 48px 0', maxWidth: 1400, margin: '0 auto' }}>
      <SectionMark
        num="03" label="NOTES — WRITING"
        title="Small signals," italic="written down."
        right={<>{notes.length} ENTRIES<br /><span style={{ color: 'var(--fg-1)' }}>2024 — 2026</span></>}
        overlays={overlays} />
      <div>
        {notes.map((n) => <NoteCard key={n.num} note={n} />)}
        <div style={{ borderTop: '1px solid var(--ink-4)' }} />
      </div>
    </section>
  );
}

function NoteCard({ note }) {
  const [hover, setHover] = useState(false);
  return (
    <a href="#" onClick={(e) => e.preventDefault()}
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(false)}
       style={{
         display: 'block', padding: '32px 0',
         borderTop: '1px solid var(--ink-4)',
         position: 'relative', cursor: 'pointer',
       }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '80px 1fr 1fr 100px',
        gap: 32, alignItems: 'start',
      }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
          NO. {note.num}
        </span>
        <div>
          <div className="serif" style={{
            fontSize: 36, lineHeight: 1.0, color: 'var(--fg-1)', letterSpacing: '-0.02em', marginBottom: 8,
          }}>{note.title}</div>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--fg-4)', letterSpacing: '0.12em' }}>
            {note.kind} · {note.date} · {note.runtime}
          </div>
        </div>
        <p style={{
          margin: 0, fontFamily: 'SF Pro, sans-serif', fontSize: 15, lineHeight: 1.55,
          color: 'var(--fg-2)', fontStyle: 'italic', textWrap: 'pretty',
        }}>{note.excerpt}</p>
        <div style={{ textAlign: 'right' }}>
          <span className="mono" style={{
            fontSize: 11, color: hover ? 'var(--red)' : 'var(--fg-3)',
            letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'color 240ms var(--ease-cine)',
          }}>
            READ <span className="ms" style={{ fontSize: 14, fontVariationSettings: "'wght' 300" }}>arrow_outward</span>
          </span>
        </div>
      </div>
    </a>
  );
}
