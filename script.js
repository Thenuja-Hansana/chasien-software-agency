// --- 1. Smooth Scroll ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// --- 2. Cursor (Only Logic, CSS handles hiding on Mobile) ---
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
const magneticElements = document.querySelectorAll('.hover-magnetic');

let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Ambient light follows mouse
    gsap.to('#ambient-light', { x: mouseX - window.innerWidth / 2, y: mouseY - window.innerHeight / 2, duration: 2 });
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    dotX += (mouseX - dotX) * 0.5;
    dotY += (mouseY - dotY) * 0.5;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    requestAnimationFrame(animateCursor);
}
// Only run cursor animation if not on a touch device roughly
if (window.matchMedia("(hover: hover)").matches) {
    animateCursor();
}

magneticElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '60px'; cursor.style.height = '60px';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        cursor.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px'; cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });
});

// --- 3. Animations ---
gsap.registerPlugin(ScrollTrigger);

// Hero
const tl = gsap.timeline();
tl.to('.hero-title', { y: 0, duration: 1.5, ease: "power4.out", stagger: 0.2 });

// Marquee
gsap.to(".marquee-track", { xPercent: -50, ease: "none", duration: 20, repeat: -1 });

// Fade Up Utils
gsap.utils.toArray('.fade-up').forEach((el) => {
    gsap.from(el, { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: el, start: "top 85%" } });
});

// Service & Testimonial Numbers
const numberAnimations = document.querySelectorAll('.counter');
numberAnimations.forEach(counter => {
    let target = counter.getAttribute('data-target');
    gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        scrollTrigger: { trigger: counter, start: "top 85%" }
    });
});

// CTA Section Reveal
gsap.utils.toArray('.cta-reveal').forEach((el, i) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: "#cta", start: "top 70%" }
    });
});