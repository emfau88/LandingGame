const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Menü öffnen');mobileNav.hidden=true;}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.getElementById('year').textContent=new Date().getFullYear();

// Audience panels work with mouse, touch and the standard tablist keyboard keys.
const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(tab, moveFocus = false) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
  if (moveFocus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if(event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if(event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if(event.key === 'Home') next = 0;
    if(event.key === 'End') next = tabs.length - 1;
    if(next !== undefined) { event.preventDefault(); activateTab(tabs[next], true); }
  });
});

document.querySelectorAll('[data-project]').forEach(link => {
  link.addEventListener('click', () => {
    const radio = [...document.querySelectorAll('[name="projectType"]')].find(item => item.value === link.dataset.project);
    if(radio) radio.checked = true;
  });
});

// This private preview intentionally prepares a local text; it never sends data.
const projectForm = document.getElementById('project-form');
const result = document.getElementById('inquiry-result');
const inquiryText = document.getElementById('inquiry-text');
const copyStatus = document.getElementById('copy-status');
projectForm.addEventListener('submit', event => {
  event.preventDefault();
  if(!projectForm.reportValidity()) return;
  const data = new FormData(projectForm);
  const name = String(data.get('name')).trim();
  const message = String(data.get('message')).trim();
  if(!name || message.length < 10) {
    const field = !name ? projectForm.elements.name : projectForm.elements.message;
    field.setCustomValidity(!name ? 'Bitte gib deinen Namen ein.' : 'Beschreibe dein Vorhaben bitte mit mindestens 10 Zeichen.');
    field.reportValidity();
    return;
  }
  inquiryText.value = `Hallo emfau,\n\nich möchte mit dir über eine Website sprechen.\n\nName: ${name}\nE-Mail: ${String(data.get('email')).trim()}\nProjekt: ${data.get('projectType')}\n\n${message}\n\nViele Grüße\n${name}`;
  result.hidden = false;
  copyStatus.textContent = '';
  result.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'nearest'});
  inquiryText.focus({preventScroll:true});
});
projectForm.addEventListener('input', event => {
  if(typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
  if(!result.hidden) { result.hidden = true; copyStatus.textContent = ''; }
});
document.getElementById('copy-inquiry').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(inquiryText.value);
    copyStatus.textContent = 'Kopiert. Deine Anfrage liegt jetzt in deiner Zwischenablage.';
  } catch {
    inquiryText.focus();
    inquiryText.select();
    copyStatus.textContent = 'Bitte kopiere den markierten Text mit Strg+C oder über das Auswahlmenü.';
  }
});
document.getElementById('download-inquiry').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([inquiryText.value], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url; link.download = 'meine-anfrage-an-emfau.txt';
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  copyStatus.textContent = 'Der Download deiner Anfrage wurde gestartet.';
});

document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById(button.dataset.dialog).showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('.dialog-close,.dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => {
    if(event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if(event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
});

// Content stays visible without JS and when reduced motion is requested.
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting) { entry.target.classList.remove('is-pending'); observer.unobserve(entry.target); }
  }), {threshold:.08});
  document.querySelectorAll('.section-heading,.project-story,.scope-grid,.process-list li,.about-grid,.faq-grid').forEach(element => {
    element.classList.add('reveal');
    if(element.getBoundingClientRect().top > innerHeight) { element.classList.add('is-pending'); observer.observe(element); }
  });
}
