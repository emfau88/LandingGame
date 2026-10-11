(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.getElementById('mobile-nav');
  const hasOpenDialog = () => Boolean(document.querySelector('dialog[open]'));

  function closeMenu(returnFocus = false) {
    if (!menuButton || !mobileNav) return;
    const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menü öffnen');
    mobileNav.hidden = true;
    if (returnFocus && wasOpen) menuButton.focus();
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      mobileNav.hidden = !open;
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !hasOpenDialog()) closeMenu(true);
    });
    matchMedia('(min-width: 901px)').addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const variantLinks = [...document.querySelectorAll('[data-variant-link]')];
  const variantTargets = new Map(variantLinks.map(link => [link, link.getAttribute('href')]));
  const sharedSections = new Set(['arbeit', 'kontakt', 'leistungen', 'emfau', 'zusammenarbeit']);
  function updateVariantLinks() {
    const currentUrl = new URL(location.href);
    let section = '';
    try { section = decodeURIComponent(currentUrl.hash.slice(1)); } catch { /* Ignore malformed fragments. */ }
    const keepSection = sharedSections.has(section) && document.getElementById(section);
    variantLinks.forEach(link => {
      const target = new URL(variantTargets.get(link), document.baseURI);
      ['owl', 'owl-style'].forEach(parameter => {
        if (currentUrl.searchParams.has(parameter)) {
          target.searchParams.set(parameter, currentUrl.searchParams.get(parameter));
        }
      });
      target.hash = keepSection ? currentUrl.hash : '';
      link.href = target.href;
    });
  }
  updateVariantLinks();
  window.addEventListener('hashchange', updateVariantLinks);
  // Owl controls update the URL with replaceState; refresh links before following them.
  variantLinks.forEach(link => {
    ['pointerenter', 'focus', 'click', 'auxclick'].forEach(event => {
      link.addEventListener(event, updateVariantLinks);
    });
  });

  const dialogTriggers = new WeakMap();
  document.querySelectorAll('[data-open]').forEach(button => {
    button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.open);
      if (!dialog || typeof dialog.showModal !== 'function' || dialog.open) return;
      dialogTriggers.set(dialog, button);
      dialog.showModal();
      document.body.classList.add('modal-open');
    });
  });

  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('[data-close]').forEach(button => {
      button.addEventListener('click', () => dialog.close());
    });
    dialog.addEventListener('close', () => {
      document.body.classList.toggle('modal-open', hasOpenDialog());
      const trigger = dialogTriggers.get(dialog);
      if (trigger?.isConnected && !hasOpenDialog()) trigger.focus({preventScroll: true});
      dialogTriggers.delete(dialog);
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) dialog.close();
    });
  });

  const form = document.getElementById('project-form');
  if (!form) return;
  const result = document.getElementById('inquiry-result');
  const inquiryText = document.getElementById('inquiry-text');
  const copyStatus = document.getElementById('copy-status');
  const copyButton = document.getElementById('copy-inquiry');
  const downloadButton = document.getElementById('download-inquiry');
  const nameField = form.elements.namedItem('name');
  const emailField = form.elements.namedItem('email');
  const messageField = form.elements.namedItem('message');
  let preparedValues = null;

  // Always stop a default GET submission: these previews do not send enquiries.
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!result || !inquiryText || !copyStatus || !nameField || !emailField || !messageField) return;

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();
    nameField.setCustomValidity(name ? '' : 'Bitte geben Sie Ihren Namen ein.');
    messageField.setCustomValidity(message.length >= 10 ? '' : 'Beschreiben Sie Ihr Vorhaben bitte mit mindestens 10 Zeichen.');
    if (!form.reportValidity()) return;

    preparedValues = [nameField.value, emailField.value, messageField.value];
    inquiryText.value = `Hallo emfau,\n\nich möchte mit Ihnen über eine Website sprechen.\n\nName: ${name}\nE-Mail: ${email}\n\n${message}\n\nViele Grüße\n${name}`;
    copyStatus.textContent = '';
    result.hidden = false;
    result.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'nearest'
    });
    inquiryText.focus({preventScroll: true});
  });

  if (!result || !inquiryText || !copyStatus || !nameField || !emailField || !messageField) return;

  // The HTML can disable submit buttons until this local-only handler is ready.
  form.querySelectorAll('button[type="submit"], input[type="submit"]').forEach(button => {
    button.disabled = false;
  });

  function invalidatePreparedInquiry(event) {
    if (![nameField, emailField, messageField].includes(event.target)) return;
    event.target.setCustomValidity('');
    const currentValues = [nameField.value, emailField.value, messageField.value];
    if (preparedValues?.every((value, index) => value === currentValues[index])) return;
    preparedValues = null;
    result.hidden = true;
    inquiryText.value = '';
    copyStatus.textContent = '';
  }
  form.addEventListener('input', invalidatePreparedInquiry);
  form.addEventListener('change', invalidatePreparedInquiry);

  copyButton?.addEventListener('click', async () => {
    if (result.hidden || !inquiryText.value) return;
    const preparedText = inquiryText.value;
    try {
      await navigator.clipboard.writeText(preparedText);
      if (!result.hidden && inquiryText.value === preparedText) {
        copyStatus.textContent = 'Kopiert. Ihre Nachricht liegt in Ihrer Zwischenablage.';
      }
    } catch {
      if (result.hidden || inquiryText.value !== preparedText) return;
      inquiryText.focus({preventScroll: true});
      inquiryText.select();
      inquiryText.setSelectionRange(0, inquiryText.value.length);
      copyStatus.textContent = 'Bitte kopieren Sie den markierten Text mit Strg+C oder über das Auswahlmenü.';
    }
  });

  downloadButton?.addEventListener('click', () => {
    if (result.hidden || !inquiryText.value) return;
    const url = URL.createObjectURL(new Blob([inquiryText.value], {type: 'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meine-anfrage-an-emfau.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    copyStatus.textContent = 'Ihre Nachricht wurde als Text zum Herunterladen vorbereitet.';
  });
})();
