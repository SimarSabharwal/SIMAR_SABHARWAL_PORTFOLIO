"use strict";
(() => {
  // src/client/app.ts
  var cursorDot = document.getElementById("cursor-dot");
  var cursorRing = document.getElementById("cursor-ring");
  var cursor = { x: 0, y: 0 };
  var ring = { x: 0, y: 0 };
  document.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    cursorDot.style.left = `${cursor.x - 4}px`;
    cursorDot.style.top = `${cursor.y - 4}px`;
    const mx = (e.clientX / window.innerWidth - 0.5) * 20;
    const my = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelectorAll(".orb").forEach((orb, i) => {
      const f = (i + 1) * 0.5;
      orb.style.transform = `translate(${mx * f}px, ${my * f}px)`;
    });
  });
  function animateRing() {
    ring.x += (cursor.x - ring.x) * 0.12;
    ring.y += (cursor.y - ring.y) * 0.12;
    cursorRing.style.left = `${ring.x - 18}px`;
    cursorRing.style.top = `${ring.y - 18}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll("a, button, .pill, .skill-card, .tool-badge, .contact-card, .social-btn, .exp-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("hover");
      cursorRing.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("hover");
      cursorRing.classList.remove("hover");
    });
  });
  var navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
  var mobileToggle = document.getElementById("mobile-toggle");
  var navLinksUl = document.getElementById("nav-links");
  mobileToggle.addEventListener("click", () => {
    navLinksUl.classList.toggle("open");
  });
  var sections = document.querySelectorAll(".section");
  var navLinks = document.querySelectorAll(".nav-link");
  var navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach((sec) => navObserver.observe(sec));
  var revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  var revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const children = entry.target.querySelectorAll(".skill-card, .tool-badge, .exp-card");
        children.forEach((child, i) => {
          child.style.opacity = "0";
          child.style.transform = "translateY(20px)";
          child.style.transition = `opacity 0.5s ease ${i * 50}ms, transform 0.5s ease ${i * 50}ms`;
          setTimeout(() => {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          }, 50);
        });
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => revealObserver.observe(el));
  var phrases = [
    "I build digital experiences.",
    "I architect scalable systems.",
    "I engineer the future.",
    "I design stunning visuals."
  ];
  var typedEl = document.getElementById("typed-text");
  var phraseIdx = 0;
  var charIdx = 0;
  var deleting = false;
  var typeSpeed = 60;
  function typeLoop() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        typeSpeed = 2e3;
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
  navLinks.forEach((link) => {
    link.addEventListener("click", () => navLinksUl.classList.remove("open"));
  });
})();
