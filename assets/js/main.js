/* Discorbit — site behaviour (no dependencies) */
(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var CONTACT_EMAIL = 'info@discorbit.com';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- Load-in: start the hero animation once fonts are ready ---------- */
  function ready() { root.classList.add('is-ready'); }
  if (document.fonts && document.fonts.ready) {
    var fallback = setTimeout(ready, 1200);
    document.fonts.ready.then(function () { clearTimeout(fallback); requestAnimationFrame(ready); });
  } else {
    ready();
  }

  /* ---------- Navigation bar state ---------- */
  var shell = document.getElementById('nav-shell');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      if (shell) shell.classList.toggle('is-scrolled', window.scrollY > 40);
      updateStatement();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 920) setMenu(false); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (hasIO && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Statement: words light up as you scroll through it ---------- */
  var statement = document.getElementById('statement-text');
  var words = [];
  if (statement) {
    var parts = statement.textContent.trim().split(/\s+/);
    statement.textContent = '';
    parts.forEach(function (word, i) {
      var span = document.createElement('span');
      span.className = 'w';
      span.textContent = word;
      statement.appendChild(span);
      if (i < parts.length - 1) statement.appendChild(document.createTextNode(' '));
      words.push(span);
    });
  }
  var lit = -1;
  function updateStatement() {
    if (!words.length) return;
    var rect = statement.getBoundingClientRect();
    var vh = window.innerHeight;
    var start = vh * 0.82;                       // first word lights when the top reaches here
    var end = vh * 0.38;                         // all lit when the bottom reaches here
    var progress = (start - rect.top) / (rect.height + start - end);
    var count = reduceMotion ? words.length : Math.round(Math.max(0, Math.min(1, progress)) * words.length);
    if (count === lit) return;
    lit = count;
    for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i < count);
  }
  updateStatement();

  /* ---------- Active nav link ---------- */
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = [];
  navLinks.forEach(function (link) {
    var target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) sections.push({ el: target, link: link });
  });
  function setActive(el) {
    sections.forEach(function (s) {
      var on = s.el === el;
      s.link.classList.toggle('is-active', on);
      if (on) s.link.setAttribute('aria-current', 'true');
      else s.link.removeAttribute('aria-current');
    });
  }
  if (sections.length && hasIO) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) setActive(entry.target); });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { navObserver.observe(s.el); });
    ['top', 'statement', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) setActive(null);
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 }).observe(el);
    });
  }

  /* ---------- Pointer light on glass panels (mouse only) ---------- */
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-spot]').forEach(function (panel) {
      panel.addEventListener('pointermove', function (e) {
        var r = panel.getBoundingClientRect();
        panel.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        panel.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Work filter ---------- */
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.work-card');
  var grid = document.getElementById('work-grid');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      if (grid) grid.classList.toggle('is-filtered', cat !== 'all');
      cards.forEach(function (card) {
        var show = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.hidden = !show;
        if (show) card.classList.add('in');
      });
    });
  });

  /* ---------- Contact form -> opens the visitor's email app ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var company = form.elements.company.value.trim();
      var type = form.elements.type.value;
      var message = form.elements.message.value.trim();

      if (!name || !message) {
        if (status) status.textContent = 'Please add your name and a few words about the project.';
        (name ? form.elements.message : form.elements.name).focus();
        return;
      }

      var subject = 'Project brief: ' + type + (company ? ' (' + company + ')' : '');
      var lines = ['Name: ' + name];
      if (company) lines.push('Company: ' + company);
      lines.push('Need: ' + type, '', message);

      window.location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      if (status) status.textContent = 'Your email app should open now. If it does not, write to ' + CONTACT_EMAIL + '.';
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
