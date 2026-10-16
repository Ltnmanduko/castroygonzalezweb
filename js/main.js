/* CASTRO & GONZÁLEZ — comportamiento mínimo: menú móvil y estado del encabezado. */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');
  if (!header || !toggle || !nav) { return; }

  var label = toggle.querySelector('.nav-toggle__label');

  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 8);
  }

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (label) { label.textContent = open ? 'Cerrar' : 'Menú'; }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) { setOpen(false); }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  var desktop = window.matchMedia('(min-width: 900px)');
  if (desktop.addEventListener) {
    desktop.addEventListener('change', function () { setOpen(false); });
  }
})();
