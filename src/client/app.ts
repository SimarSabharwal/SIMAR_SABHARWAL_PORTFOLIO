// ══════════════ TYPES ══════════════
interface CursorPos { x: number; y: number }

// ══════════════ CUSTOM CURSOR ══════════════
const cursorDot = document.getElementById('cursor-dot') as HTMLElement;
const cursorRing = document.getElementById('cursor-ring') as HTMLElement;
const cursor: CursorPos = { x: 0, y: 0 };
const ring: CursorPos = { x: 0, y: 0 };

document.addEventListener('mousemove', (e: MouseEvent) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
  cursorDot.style.left = `${cursor.x - 4}px`;
  cursorDot.style.top = `${cursor.y - 4}px`;

  // Parallax orbs
  const mx = (e.clientX / window.innerWidth - 0.5) * 20;
  const my = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelectorAll<HTMLElement>('.orb').forEach((orb, i) => {
    const f = (i + 1) * 0.5;
    orb.style.transform = `translate(${mx * f}px, ${my * f}px)`;
  });
});

function animateRing(): void {
  ring.x += (cursor.x - ring.x) * 0.12;
  ring.y += (cursor.y - ring.y) * 0.12;
  cursorRing.style.left = `${ring.x - 18}px`;
  cursorRing.style.top = `${ring.y - 18}px`;
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover scale on interactive elements
document.querySelectorAll('a, button, .pill, .skill-card, .tool-badge, .contact-card, .social-btn, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.classList.add('hover');
    cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('hover');
    cursorRing.classList.remove('hover');
  });
});

// ══════════════ NAVBAR SCROLL ══════════════
const navbar = document.getElementById('navbar') as HTMLElement;
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ══════════════ MOBILE MENU ══════════════
const mobileToggle = document.getElementById('mobile-toggle') as HTMLElement;
const navLinksUl = document.getElementById('nav-links') as HTMLElement;
mobileToggle.addEventListener('click', () => {
  navLinksUl.classList.toggle('open');
});

// ══════════════ ACTIVE NAV LINK ══════════════
const sections = document.querySelectorAll<HTMLElement>('.section');
const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(sec => navObserver.observe(sec));

// ══════════════ SCROLL REVEAL ══════════════
const revealEls = document.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Stagger children (skill cards, tool badges)
      const children = entry.target.querySelectorAll<HTMLElement>('.skill-card, .tool-badge, .exp-card');
      children.forEach((child, i) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        child.style.transition = `opacity 0.5s ease ${i * 50}ms, transform 0.5s ease ${i * 50}ms`;
        setTimeout(() => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, 50);
      });
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ══════════════ TYPED TEXT ══════════════
const phrases: string[] = [
  'I build digital experiences.',
  'I architect scalable systems.',
  'I engineer the future.',
  'I design stunning visuals.'
];

const typedEl = document.getElementById('typed-text') as HTMLElement;
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
let typeSpeed = 60;

function typeLoop(): void {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      typeSpeed = 2000; // pause
    } else {
      typeSpeed = 60;
    }
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    typeSpeed = 35;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400;
    }
  }
  setTimeout(typeLoop, typeSpeed);
}
setTimeout(typeLoop, 1500);

// ══════════════ CLOSE MOBILE ON LINK CLICK ══════════════
navLinks.forEach(link => {
  link.addEventListener('click', () => navLinksUl.classList.remove('open'));
});
