
const themes = {
  naruto: { accent: '#ff6b16', accent2: '#e62f22', bg: '#0b0806', panel: '#17100b', panel2: '#21140c' },
  hxh: { accent: '#b7e83f', accent2: '#35a56b', bg: '#070b08', panel: '#101811', panel2: '#17251a' },
  berserk: { accent: '#a51d2d', accent2: '#6f0f1c', bg: '#080707', panel: '#151111', panel2: '#201719' },
  jjk: { accent: '#9b73ff', accent2: '#34c7f3', bg: '#090711', panel: '#14111e', panel2: '#1c1830' }
};
function setTheme(theme) {
  document.body.dataset.theme = themes[theme] ? theme : 'default';
  if (themes[theme]) {
    const t = themes[theme];
    const root = document.documentElement;
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--accent2', t.accent2);
    root.style.setProperty('--bg', t.bg);
    root.style.setProperty('--panel', t.panel);
    root.style.setProperty('--panel2', t.panel2);
  } else {
    ['--accent','--accent2','--bg','--panel','--panel2'].forEach(k => document.documentElement.style.removeProperty(k));
  }
}
function currentPage() {
  const file = location.pathname.split('/').pop() || 'index.html';
  return file.replace('.html','') === 'index' ? 'home' : file.replace('.html','');
}
document.querySelectorAll('[data-nav]').forEach(a => {
  if (a.dataset.nav === currentPage()) a.classList.add('active');
});
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
});
document.querySelectorAll('[data-theme-link]').forEach(link => {
  link.addEventListener('mouseenter', () => setTheme(link.dataset.themeLink));
  link.addEventListener('mouseleave', () => setTheme('default'));
});
document.querySelectorAll('[data-story-theme]').forEach(card => {
  card.addEventListener('mouseenter', () => setTheme(card.dataset.storyTheme));
  card.addEventListener('mouseleave', () => setTheme('default'));
});
// Collection filter + URL deep link
const filterButtons = document.querySelectorAll('[data-filter]');
const figureCards = document.querySelectorAll('.figure-card');
const emptyNote = document.getElementById('empty-note');
function filterFigures(filter) {
  let shown = 0;
  figureCards.forEach(card => {
    const visible = filter === 'all' || card.dataset.series === filter;
    card.style.display = visible ? '' : 'none';
    if (visible) shown++;
  });
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  if (emptyNote) emptyNote.hidden = shown !== 0;
  setTheme(filter);
}
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterFigures(btn.dataset.filter);
  const url = new URL(location.href);
  if (btn.dataset.filter === 'all') url.searchParams.delete('series');
  else url.searchParams.set('series', btn.dataset.filter);
  history.replaceState({}, '', url);
}));
if (figureCards.length) {
  const initial = new URLSearchParams(location.search).get('series') || 'all';
  filterFigures(['all','naruto','hxh','berserk','jjk'].includes(initial) ? initial : 'all');
}
// Figure detail modal
const modal = document.getElementById('figure-modal');
const closeModal = document.querySelector('.modal-close');
function svgFor(name) {
  const card = [...figureCards].find(c => c.dataset.svg === name);
  return card ? card.querySelector('svg')?.outerHTML || '' : '';
}
figureCards.forEach(card => card.addEventListener('click', () => {
  if (!modal) return;
  document.getElementById('modal-series').textContent = card.querySelector('.series')?.textContent || card.dataset.series;
  document.getElementById('modal-title').textContent = card.dataset.title;
  document.getElementById('modal-desc').textContent = card.dataset.desc;
  document.getElementById('modal-type').textContent = card.dataset.type;
  document.getElementById('modal-status').textContent = card.dataset.status;
  const art = document.getElementById('modal-art');
  art.innerHTML = card.querySelector('svg')?.outerHTML || '';
  setTheme(card.dataset.series);
  modal.classList.add('open');
}));
function hideModal() { if (modal) modal.classList.remove('open'); }
if (closeModal) closeModal.addEventListener('click', hideModal);
if (modal) modal.addEventListener('click', e => { if (e.target === modal) hideModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') hideModal(); });
