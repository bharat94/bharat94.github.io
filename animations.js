// --- brand animations ---
const brand = document.querySelector('.brand');
if (brand) {
  const text = brand.textContent;
  brand.innerHTML = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.setProperty('--i', i);
    brand.appendChild(span);
  });

  brand.addEventListener('click', (e) => {
    brand.classList.remove('thump');
    void brand.offsetWidth;
    brand.classList.add('thump');
    
    // 1. Soft Ripple from Brand
    const ripple = document.createElement('div');
    ripple.className = 'brand-ripple';
    brand.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);

    // 2. Fluid Wave Down the Page
    const elementsToDrift = document.querySelectorAll('section, .hero-card, .project-card, .patent-card, .robotics-card, footer');
    elementsToDrift.forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove('fluid-drift');
        void el.offsetWidth;
        el.classList.add('fluid-drift');
        setTimeout(() => el.classList.remove('fluid-drift'), 1400);
      }, i * 80); // Slower stagger for a more fluid wave
    });
    
    // Existing dot swap logic
    const lastSpan = brand.querySelector('span:last-child');
    if (lastSpan && lastSpan.textContent === '.') {
      const symbolsSwap = ['!', 'ツ', '◆', '★'];
      const randomSymbol = symbolsSwap[Math.floor(Math.random() * symbolsSwap.length)];
      const original = '.';
      lastSpan.textContent = randomSymbol;
      lastSpan.style.fontFamily = "'Caveat', cursive";
      setTimeout(() => {
        lastSpan.textContent = original;
        lastSpan.style.fontFamily = '';
      }, 800);
    }
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('mobile-menu-btn');
  const isActive = menu.classList.toggle('active');
  btn.textContent = isActive ? '✕' : '☰';
  document.body.style.overflow = isActive ? 'hidden' : '';
}

const menuBtn = document.getElementById('mobile-menu-btn');
if (menuBtn) {
  menuBtn.addEventListener('click', toggleMobileMenu);
}

// --- theme toggle ---
function toggleTheme() {
  const t = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = t;
  try { localStorage.setItem('fj-theme', t); } catch {}
}
try { const t = localStorage.getItem('fj-theme'); if (t) document.body.dataset.theme = t; } catch {}

// --- cursor follower ---
const cursor = document.querySelector('.cursor');
let cx = 0, cy = 0, tx = 0, ty = 0;
window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
(function loop() {
  cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
  if (cursor) {
    cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
  }
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { 
    if (cursor) {
      cursor.style.width = '36px'; cursor.style.height = '36px'; cursor.style.background = 'rgba(185,80,43,0.15)'; 
    }
  });
  el.addEventListener('mouseleave', () => { 
    if (cursor) {
      cursor.style.width = '16px'; cursor.style.height = '16px'; cursor.style.background = 'transparent'; 
    }
  });
});

// --- projects ---
const projects = [
  { name: 'CleanHood', cat: 'Social Good', win: 'Winner', desc: 'Crowd-sourced platform for neighborhood reporting and clean-up drives.', stack: 'Android · Node · Mongo · Firebase', url: 'https://devpost.com/software/cleanhood', viz: 'map' },
  { name: 'AuToDo', cat: 'Android', win: 'Winner', desc: 'Smart automation app for intelligent to-do execution and workflow.', stack: 'Android · IBM Watson · Java', url: 'https://devpost.com/software/autodo', viz: 'waves' },
  { name: 'AgentHub', cat: 'AI Agents', desc: 'Privacy-first AI agent orchestration platform with per-agent data isolation.', stack: 'Python · Self-hosted', url: 'https://github.com/bharat94/AgentHub', viz: 'agent' },
  { name: 'openISL', cat: 'CLI / TUI', desc: 'Interactive smart log for Git — a Rust-based CLI for history visualization.', stack: 'Rust · Git · TUI', url: 'https://github.com/bharat94/openISL', viz: 'log' },
  { name: 'globe.io', cat: '3D Visualization', desc: 'Interactive 3D globe for exploring cities, weather, and population data.', stack: 'Node.js · 3D Web · Data Viz', url: 'https://github.com/bharat94/globe.io', viz: 'globe' },
  { name: 'CloverCoders', cat: 'AR / VR', desc: 'AR tool to visualize 3D models in the real world before printing.', stack: 'Unity · ARCore · C#', url: 'https://devpost.com/software/clovercoders', viz: 'ar' },
];

// abstract SVG identifiers per project — no literal branding, just form
const vizMap = {
  agent: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="280" fill="var(--cream)"/>
    <g fill="none" stroke="var(--rust)" stroke-width="1.2">
      <circle cx="200" cy="140" r="22" fill="var(--rust)"/>
      <circle cx="100" cy="80" r="14"/><circle cx="320" cy="90" r="14"/>
      <circle cx="90" cy="210" r="14"/><circle cx="310" cy="210" r="14"/>
      <circle cx="200" cy="50" r="10"/><circle cx="200" cy="230" r="10"/>
      <line x1="200" y1="140" x2="100" y2="80"/><line x1="200" y1="140" x2="320" y2="90"/>
      <line x1="200" y1="140" x2="90" y2="210"/><line x1="200" y1="140" x2="310" y2="210"/>
      <line x1="200" y1="140" x2="200" y2="50"/><line x1="200" y1="140" x2="200" y2="230"/>
    </g>
    <g stroke="var(--sage)" stroke-width="0.8" stroke-dasharray="3 3" fill="none" opacity="0.7">
      <circle cx="200" cy="140" r="70"/><circle cx="200" cy="140" r="110"/>
    </g>
  </svg>`,
  log: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="280" fill="var(--cream)"/>
    <g stroke="var(--ink)" stroke-width="1.2" fill="none">
      <path d="M60 40 L60 240"/>
      <path d="M60 60 C 90 60, 100 100, 120 100 L 120 200 C 120 220, 100 240, 60 240"/>
      <path d="M60 140 C 140 140, 150 170, 180 170"/>
    </g>
    <g fill="var(--rust)">
      <circle cx="60" cy="60" r="6"/><circle cx="120" cy="100" r="6"/>
      <circle cx="60" cy="140" r="6"/><circle cx="180" cy="170" r="6"/>
      <circle cx="120" cy="200" r="6"/><circle cx="60" cy="240" r="6"/>
    </g>
    <g font-family="JetBrains Mono, monospace" font-size="10" fill="var(--ink-soft)">
      <text x="80" y="64">feat: init</text>
      <text x="140" y="104">fix: memory leak</text>
      <text x="80" y="144">refactor: tree view</text>
      <text x="200" y="174">feat: keybinds</text>
      <text x="140" y="204">docs: readme</text>
      <text x="80" y="244">chore: release v0.1</text>
    </g>
  </svg>`,
  globe: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="280" fill="var(--cream)"/>
    <g transform="translate(200 140)">
      <circle r="90" fill="none" stroke="var(--ink)" stroke-width="1.2"/>
      <g fill="none" stroke="var(--ink)" stroke-width="0.8" opacity="0.5">
        <ellipse rx="90" ry="30"/><ellipse rx="90" ry="60"/>
        <ellipse rx="30" ry="90"/><ellipse rx="60" ry="90"/>
      </g>
      <g fill="var(--rust)">
        <circle cx="-40" cy="-30" r="4"/><circle cx="20" cy="-50" r="4"/>
        <circle cx="50" cy="10" r="4"/><circle cx="-20" cy="40" r="4"/>
        <circle cx="-60" cy="20" r="4"/>
      </g>
      <g fill="var(--sage)" opacity="0.8">
        <circle cx="60" cy="-40" r="8"/><circle cx="-70" cy="-10" r="10"/>
        <circle cx="10" cy="60" r="7"/>
      </g>
    </g>
  </svg>`,
  map: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="280" fill="var(--cream)"/>
    <g stroke="var(--ink)" stroke-width="0.8" fill="none" opacity="0.35">
      <path d="M0 80 Q 100 60 200 90 T 400 70"/>
      <path d="M0 140 Q 100 120 200 150 T 400 130"/>
      <path d="M0 200 Q 100 180 200 210 T 400 190"/>
      <path d="M80 0 Q 100 100 60 200 T 100 280"/>
      <path d="M200 0 Q 220 100 180 200 T 220 280"/>
      <path d="M320 0 Q 340 100 300 200 T 340 280"/>
    </g>
    <g fill="var(--rust)">
      <path d="M130 100 L 120 130 L 140 130 Z"/>
      <circle cx="130" cy="95" r="10"/>
      <circle cx="130" cy="95" r="4" fill="var(--cream)"/>
    </g>
    <g fill="var(--sage)">
      <path d="M260 150 L 250 180 L 270 180 Z"/>
      <circle cx="260" cy="145" r="8"/>
      <circle cx="260" cy="145" r="3" fill="var(--cream)"/>
    </g>
    <g fill="var(--rust)" opacity="0.6">
      <circle cx="80" cy="220" r="5"/><circle cx="320" cy="80" r="5"/><circle cx="350" cy="200" r="5"/>
    </g>
  </svg>`,
  waves: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="280" fill="var(--cream)"/>
    <g fill="none" stroke="var(--rust)" stroke-width="1.5" stroke-linecap="round">
      <path d="M20 140 Q 60 80, 100 140 T 180 140 T 260 140 T 340 140 T 380 140"/>
      <path d="M20 180 Q 60 120, 100 180 T 180 180 T 260 180 T 340 180 T 380 180" opacity="0.6"/>
      <path d="M20 100 Q 60 40, 100 100 T 180 100 T 260 100 T 340 100 T 380 100" opacity="0.4"/>
    </g>
    <g font-family="JetBrains Mono" font-size="9" fill="var(--ink-soft)">
      <text x="30" y="30">06:00 · wake</text>
      <text x="30" y="48">07:30 · coffee</text>
      <text x="30" y="246">22:00 · wind down</text>
      <text x="30" y="264">23:00 · sleep, handled.</text>
    </g>
  </svg>`,
  ar: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="280" fill="var(--cream)"/>
    <g stroke="var(--ink)" stroke-width="0.8" fill="none" opacity="0.25">
      <path d="M0 220 L 400 220"/>
      <path d="M0 220 L 200 60"/>
      <path d="M400 220 L 200 60"/>
      <path d="M100 140 L 300 140"/>
    </g>
    <g transform="translate(200 160)">
      <g stroke="var(--rust)" stroke-width="1.5" fill="none">
        <path d="M-50 -30 L 50 -30 L 50 30 L -50 30 Z"/>
        <path d="M-50 -30 L -20 -60 L 80 -60 L 50 -30"/>
        <path d="M50 -30 L 80 -60 L 80 0 L 50 30"/>
        <path d="M-50 30 L -20 0 L 80 0" opacity="0.4"/>
        <path d="M-20 -60 L -20 0" opacity="0.4"/>
      </g>
      <g fill="var(--sage)">
        <circle cx="-50" cy="-30" r="3"/><circle cx="50" cy="-30" r="3"/>
        <circle cx="50" cy="30" r="3"/><circle cx="-50" cy="30" r="3"/>
        <circle cx="-20" cy="-60" r="3"/><circle cx="80" cy="-60" r="3"/>
        <circle cx="80" cy="0" r="3"/><circle cx="-20" cy="0" r="3"/>
      </g>
    </g>
    <g font-family="JetBrains Mono" font-size="9" fill="var(--rust)">
      <text x="300" y="40">[ AR · TRACK ]</text>
    </g>
  </svg>`,
};

const carousel = document.getElementById('carousel');
if (carousel) {
  carousel.innerHTML = projects.map(p => `
    <article class="project-card">
      <div class="project-viz">${vizMap[p.viz]}</div>
      <div class="project-body">
        <div class="project-cat"><span>${p.cat}</span>${p.win ? `<span class="win">${p.win}</span>` : ''}</div>
        <h3 class="project-name">${p.name}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-stack">${p.stack}</div>
        <a href="${p.url}" target="_blank" class="project-link">Visit ↗</a>
      </div>
    </article>
  `).join('');
}

function scrollCarousel(dir) {
  if (carousel) {
    carousel.scrollBy({ left: dir * 472, behavior: 'smooth' });
  }
}

// --- drag to scroll ---
let isDown = false;
let startX;
let scrollLeft;

if (carousel) {
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.scrollSnapType = 'none';
    carousel.style.cursor = 'grabbing';
  });
  
  // Touch support
  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.scrollSnapType = 'none';
  }, { passive: true });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.style.cursor = '';
    carousel.style.scrollSnapType = 'x mandatory';
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.style.cursor = '';
    carousel.style.scrollSnapType = 'x mandatory';
  });

  carousel.addEventListener('touchend', () => {
    isDown = false;
    carousel.style.scrollSnapType = 'x mandatory';
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  }, { passive: true });
}

// ==== TWEAKS ====
const TWEAK_DEFAULTS = {
  "accent": "#4a6e8c",
  "paper": "#f1e8d6",
  "displayFont": "'Instrument Serif', Georgia, serif",
  "heroSize": 100,
  "cardJitter": 0.5,
  "showTape": "on",
  "customCursor": "on",
  "heroMeta": "passion drives curiosity",
  "signoff": "— always open to a good problem.",
  "theme": "dark"
};

let tweaks = { ...TWEAK_DEFAULTS };

function mixDeeper(hex) {
  // darken a hex ~8% toward black for the "deep" variant
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.max(0, r - 18); g = Math.max(0, g - 18); b = Math.max(0, b - 18);
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

function applyTweaks() {
  const root = document.documentElement;
  root.style.setProperty('--rust', tweaks.accent);
  if (document.body.dataset.theme !== 'dark') {
    root.style.setProperty('--cream', tweaks.paper);
    root.style.setProperty('--cream-deep', mixDeeper(tweaks.paper));
  }
  document.body.dataset.theme = tweaks.theme;
  document.body.style.setProperty('--display-font', tweaks.displayFont);
  // hero size
  const hero = document.querySelector('.hero h1');
  if (hero) hero.style.fontSize = tweaks.heroSize + 'px';
  // display font on headings + body serif
  document.querySelectorAll('.hero h1, .section-title, .project-name, .patent-title, .robotics-card h3, .contact h2, .about-text p, .hero-card p').forEach(el => {
    el.style.fontFamily = tweaks.displayFont;
  });
  // card jitter
  document.querySelectorAll('.project-card').forEach((c, i) => {
    const j = tweaks.cardJitter;
    const r = (i % 2 === 0) ? -j * 0.6 : j * 0.6;
    c.style.setProperty('--card-rot', r + 'deg');
    c.style.transform = `rotate(${r}deg)`;
  });
  // tape visibility
  const tapeOn = tweaks.showTape === 'on';
  document.body.classList.toggle('no-tape', !tapeOn);
  // cursor
  const cursorEl = document.querySelector('.cursor');
  if (cursorEl) cursorEl.style.display = tweaks.customCursor === 'on' ? '' : 'none';
  // hero meta
  const meta = document.querySelector('.hero-meta');
  if (meta) meta.textContent = tweaks.heroMeta;
  // signoff
  const so = document.querySelector('.contact .signoff');
  if (so) so.textContent = tweaks.signoff;
}

// tape hide via dynamic stylesheet
const tapeStyle = document.createElement('style');
tapeStyle.textContent = `
  body.no-tape .project-card::before,
  body.no-tape .hero-card::before,
  body.no-tape .robotics-card::before { display: none !important; }
`;
document.head.appendChild(tapeStyle);

applyTweaks();

// ===== edit mode protocol =====
window.addEventListener('message', (e) => {
  if (!e.data || typeof e.data !== 'object') return;
  if (e.data.type === '__activate_edit_mode') {
    const panel = document.getElementById('tweaks-panel');
    if (panel) {
      panel.style.display = 'flex';
      initTweaksUI();
    }
  } else if (e.data.type === '__deactivate_edit_mode') {
    const panel = document.getElementById('tweaks-panel');
    if (panel) panel.style.display = 'none';
  }
});

function initTweaksUI() {
  const panel = document.getElementById('tweaks-panel');
  if (!panel) return;
  if (panel.dataset.inited) { syncTweaksUI(); return; }
  panel.dataset.inited = '1';

  // swatches
  panel.querySelectorAll('.tw-swatches').forEach(group => {
    const key = group.dataset.key;
    group.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        setTweak(key, btn.dataset.val);
      });
    });
  });
  // selects
  panel.querySelectorAll('select[data-key]').forEach(sel => {
    sel.addEventListener('change', () => setTweak(sel.dataset.key, sel.value));
  });
  // ranges
  panel.querySelectorAll('input[type="range"][data-key]').forEach(r => {
    r.addEventListener('input', () => setTweak(r.dataset.key, parseFloat(r.value)));
  });
  // text inputs
  panel.querySelectorAll('input[type="text"][data-key]').forEach(i => {
    i.addEventListener('input', () => setTweak(i.dataset.key, i.value));
  });
  syncTweaksUI();
}

function syncTweaksUI() {
  const panel = document.getElementById('tweaks-panel');
  if (!panel) return;
  panel.querySelectorAll('.tw-swatches').forEach(group => {
    const key = group.dataset.key; const cur = tweaks[key];
    group.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.val === cur));
  });
  panel.querySelectorAll('[data-key]').forEach(el => {
    const k = el.dataset.key;
    if (el.tagName === 'SELECT' || el.tagName === 'INPUT') {
      if (el.type === 'range') el.value = tweaks[k];
      else if (el.type === 'text') el.value = tweaks[k];
      else el.value = tweaks[k];
    }
  });
  panel.querySelectorAll('.tw-val').forEach(el => {
    el.textContent = tweaks[el.dataset.val];
  });
}

function setTweak(key, value) {
  tweaks[key] = value;
  applyTweaks();
  syncTweaksUI();
}

// --- reveal on scroll ---
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
