// Load the local design preference before the first paint.
(() => {
  const valid = value => ['clean', 'blue', 'dark'].includes(value);
  let selected = 'blue';
  try {
    const requested = new URLSearchParams(location.search).get('design');
    const saved = localStorage.getItem('emfau-design');
    selected = valid(requested) ? requested : valid(saved) ? saved : 'blue';
  } catch { /* The comparison also works when browser storage is disabled. */ }
  document.documentElement.dataset.design = selected;
  document.documentElement.dataset.layout = selected === 'dark' ? 'dark' : 'clean';

  document.addEventListener('DOMContentLoaded', () => {
    const buttons = [...document.querySelectorAll('[data-design-choice]')];
    function update() {
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.designChoice === selected)));
      document.querySelector('meta[name="theme-color"]').content = selected === 'dark' ? '#080e18' : '#ffffff';
    }
    buttons.forEach(button => button.addEventListener('click', () => {
      const next = button.dataset.designChoice;
      if (!valid(next) || next === selected) return;
      selected = next;
      document.documentElement.dataset.design = next;
      document.documentElement.dataset.layout = next === 'dark' ? 'dark' : 'clean';
      try { localStorage.setItem('emfau-design', next); } catch { /* Session-only fallback. */ }
      const url = new URL(location.href);
      url.searchParams.set('design', next);
      update();
      url.hash = '';
      history.replaceState(null, '', url);
      scrollTo({top: 0, behavior: 'instant'});
    }));
    update();
  });
})();
