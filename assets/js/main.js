/* Discorbit LLC site: menu, hero entrance, FAQ, enquiry form. No tracking, no cookies. */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero entrance, once on load
  document.querySelectorAll('[data-enter]').forEach(function (el) {
    Array.prototype.forEach.call(el.children, function (c, i) { c.style.setProperty('--i', i); });
    requestAnimationFrame(function () { el.classList.add('is-in'); });
  });

  // Phone menu
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  function setMenu(open) {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  if (toggle && links) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function () { setMenu(false); });
  }

  // FAQ: animated open and close
  document.querySelectorAll('.faq details').forEach(function (d) {
    var summary = d.querySelector('summary');
    var body = d.querySelector('.answer');
    summary.addEventListener('click', function (e) {
      if (reduced || !body.animate) return;
      e.preventDefault();
      if (d.open) {
        var a = body.animate([{ height: body.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 260, easing: 'ease' });
        a.onfinish = function () { d.open = false; };
      } else {
        d.open = true;
        body.animate([{ height: '0px', opacity: 0 }, { height: body.offsetHeight + 'px', opacity: 1 }], { duration: 320, easing: 'ease' });
      }
    });
  });

  // Enquiry form: checks the fields, then opens the visitor's email app with the message written
  var form = document.querySelector('[data-enquiry]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = [];
      form.querySelectorAll('[required]').forEach(function (f) {
        var err = document.getElementById(f.id + '-err');
        var ok = f.value.trim() !== '' && (f.type !== 'email' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value.trim()));
        f.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (err) err.hidden = ok;
        if (!ok) bad.push(f);
      });
      if (bad.length) {
        bad[0].focus();
        status.textContent = bad.length === 1 ? '1 field needs a correction.' : bad.length + ' fields need a correction.';
        return;
      }
      var v = function (n) { var f = form.elements[n]; return f ? f.value.trim() : ''; };
      var body = 'Name: ' + v('name') + '\nCompany: ' + v('company') + '\nEmail: ' + v('email') + '\nRole: ' + v('role') + '\n\n' + v('message');
      window.location.href = 'mailto:' + form.dataset.to + '?subject=' + encodeURIComponent('Wholesale enquiry from ' + (v('company') || v('name'))) + '&body=' + encodeURIComponent(body);
      status.textContent = 'Your email app is opening with the enquiry written. Press send there to reach us.';
    });
  }

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
