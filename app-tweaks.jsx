// nvEnvy — Tweaks panel wiring. Drives <html> data-* attributes which
// the stylesheet keys off. Accent options are sampled directly from the
// app icon: spiral coral, stem sage, notepad navy, petal coral, pad gold.

const NVE_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "coral",
  "density": "regular"
}/*EDITMODE-END*/;

const ACCENT_SWATCHES = [
  { name: 'coral', hex: '#D5754A' },
  { name: 'sage',  hex: '#7A8954' },
  { name: 'navy',  hex: '#1F2754' },
  { name: 'petal', hex: '#C46B5D' },
  { name: 'gold',  hex: '#C99840' },
];

function NvEnvyTweaks() {
  const [t, setTweak] = useTweaks(NVE_TWEAK_DEFAULTS);

  React.useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme   = t.theme;
    html.dataset.accent  = t.accent;
    html.dataset.density = t.density;
  }, [t.theme, t.accent, t.density]);

  // Map swatch hex → named accent and back. Lowercase comparison
  // because <input type=color> emits lowercase per spec.
  const accentByHex = {};
  ACCENT_SWATCHES.forEach((s) => { accentByHex[s.hex.toLowerCase()] = s.name; });
  const currentHex = ACCENT_SWATCHES.find((s) => s.name === t.accent)?.hex
                  || ACCENT_SWATCHES[0].hex;

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Appearance">
        <TweakRadio
          label="Theme"
          value={t.theme}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark',  label: 'Dark'  },
          ]}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'regular', label: 'Regular' },
            { value: 'airy',    label: 'Airy'    },
          ]}
          onChange={(v) => setTweak('density', v)}
        />
      </TweakSection>

      <TweakSection label="Accent (from the icon)">
        <TweakColor
          label="Color"
          value={currentHex}
          options={ACCENT_SWATCHES.map((s) => s.hex)}
          onChange={(hex) => {
            const name = accentByHex[hex.toLowerCase()] || 'coral';
            setTweak('accent', name);
          }}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<NvEnvyTweaks />);
