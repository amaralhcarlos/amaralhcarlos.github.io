import { pt } from './i18n/pt.js';
import { en } from './i18n/en.js';

const dictionaries = { pt, en };

function detectLang() {
  const saved = localStorage.getItem('lang');
  if (saved === 'en' || saved === 'pt') return saved;

  const browserLang = (navigator.languages?.[0] || navigator.language || '').toLowerCase();
  return browserLang.startsWith('en') ? 'en' : 'pt';
}

function applyLang(lang) {
  const strings = dictionaries[lang];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (strings[key] !== undefined) {
      el.textContent = strings[key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (strings[key] !== undefined) {
      el.innerHTML = strings[key];
    }
  });

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyLang(lang);
}

function initLangToggle() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

function initMobileNav() {
  const burger = document.getElementById('nav-burger');
  const links = document.getElementById('nav-links');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((el) => observer.observe(el));
}

applyLang(detectLang());
initLangToggle();
initMobileNav();
initScrollReveal();
