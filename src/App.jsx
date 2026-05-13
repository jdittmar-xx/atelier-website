import { useState, useEffect } from 'react';
import './portfolio.css';
import PORTFOLIO from './data.js';
import { Grain, TopBar, FloatNav, Footer, Reveal, NAV_ITEMS } from './chrome.jsx';
import { Hero, Work, Notes } from './sections-a.jsx';
import { Stills, Clients, About, Contact } from './sections-b.jsx';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle, TweakSlider } from './tweaks-panel.jsx';

const TWEAK_DEFAULTS = {
  heroVariant: 'reel',
  statementIdx: 0,
  overlays: true,
  density: 'breathy',
  grain: 5,
  accent: 'red',
  navLabels: false,
  theme: 'dark',
};

export default function App() {
  const data = PORTFOLIO;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeId, setActiveId] = useState('reel');

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, { rootMargin: '-50% 0px -45% 0px', threshold: 0 });
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.theme || 'dark');
  }, [t.theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (t.accent === 'silver') {
      root.style.setProperty('--red', 'var(--fg-1)');
      root.style.setProperty('--red-dim', 'var(--fg-3)');
    } else {
      root.style.removeProperty('--red');
      root.style.removeProperty('--red-dim');
    }
  }, [t.accent]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--section-pad-y',
      t.density === 'dense' ? '128px' : '192px'
    );
  }, [t.density]);

  const statement = data.statements[t.statementIdx] || data.statements[0];
  const currentLabel = (NAV_ITEMS.find((n) => n.id === activeId) || {}).label;

  return (
    <div style={{ position: 'relative' }}>
      <Grain opacity={t.grain / 100} />
      <TopBar
        identity={data.identity}
        current={currentLabel}
        theme={t.theme || 'dark'}
        onToggleTheme={() => setTweak('theme', (t.theme || 'dark') === 'dark' ? 'light' : 'dark')}
      />
      <FloatNav activeId={activeId} showLabels={t.navLabels} theme={t.theme || 'dark'} />

      <main>
        <Hero tweaks={t} statement={statement} identity={data.identity} />
        <Reveal><Work films={data.films} overlays={t.overlays} /></Reveal>
        <Reveal><Stills stills={data.stills} overlays={t.overlays} /></Reveal>
        <Reveal><Clients clients={data.clients} overlays={t.overlays} /></Reveal>
        <Reveal><About about={data.about} overlays={t.overlays} /></Reveal>
        <Reveal><Contact identity={data.identity} overlays={t.overlays} /></Reveal>
      </main>

      <Footer identity={data.identity} theme={t.theme || 'dark'} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Variant" value={t.heroVariant}
          options={['reel', 'statement', 'grid']}
          onChange={(v) => setTweak('heroVariant', v)} />
        <TweakSelect label="Statement"
          value={t.statementIdx}
          options={data.statements.map((s, i) => ({
            value: i, label: `${i + 1}. ${s.lead} ${s.italic}`,
          }))}
          onChange={(v) => setTweak('statementIdx', Number(v))} />

        <TweakSection label="Visual" />
        <TweakToggle label="Editorial overlays" value={t.overlays}
          onChange={(v) => setTweak('overlays', v)} />
        <TweakRadio label="Density" value={t.density}
          options={['breathy', 'dense']}
          onChange={(v) => setTweak('density', v)} />
        <TweakRadio label="Accent" value={t.accent}
          options={['red', 'silver']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Theme" value={t.theme || 'dark'}
          options={['dark', 'light']}
          onChange={(v) => setTweak('theme', v)} />
        <TweakSlider label="Grain" value={t.grain} min={0} max={20} step={1} unit="%"
          onChange={(v) => setTweak('grain', v)} />

        <TweakSection label="Navigation" />
        <TweakToggle label="Show labels" value={t.navLabels}
          onChange={(v) => setTweak('navLabels', v)} />
      </TweaksPanel>
    </div>
  );
}
