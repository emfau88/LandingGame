(() => {
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.getElementById('mobile-nav');
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menü öffnen');
    mobileNav.hidden = true;
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    mobileNav.hidden = !open;
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  matchMedia('(min-width: 621px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelectorAll('[data-open]').forEach(button => {
    button.addEventListener('click', () => {
      document.getElementById(button.dataset.open).showModal();
      document.body.classList.add('modal-open');
    });
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });

  const form = document.getElementById('project-form');
  const result = document.getElementById('inquiry-result');
  const text = document.getElementById('inquiry-text');
  const status = document.getElementById('copy-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim();
    const message = String(data.get('message')).trim();
    if (!name || message.length < 10) {
      const field = !name ? form.elements.name : form.elements.message;
      field.setCustomValidity(!name ? 'Bitte gib deinen Namen ein.' : 'Beschreibe dein Vorhaben bitte mit mindestens 10 Zeichen.');
      field.reportValidity();
      return;
    }
    text.value = `Hallo emfau,\n\nich möchte mit dir über eine Website sprechen.\n\nName: ${name}\nE-Mail: ${email}\n\n${message}\n\nViele Grüße\n${name}`;
    status.textContent = '';
    result.hidden = false;
    result.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest'});
    text.focus({preventScroll: true});
  });
  form.addEventListener('input', event => {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    if (!result.hidden) { result.hidden = true; status.textContent = ''; }
  });
  document.getElementById('copy-inquiry').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(text.value);
      status.textContent = 'Kopiert. Deine Anfrage liegt in deiner Zwischenablage.';
    } catch {
      text.focus(); text.select();
      status.textContent = 'Bitte kopiere den markierten Text mit Strg+C oder über das Auswahlmenü.';
    }
  });
  document.getElementById('download-inquiry').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([text.value], {type: 'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = 'meine-anfrage-an-emfau.txt';
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Deine Anfrage wurde als Text zum Herunterladen vorbereitet.';
  });
})();
