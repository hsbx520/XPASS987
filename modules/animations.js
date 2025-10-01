import { gsap } from "gsap";

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function animateIn() {
  if (prefersReduced) {
    const cont = document.querySelector(".hero__content");
    if (cont) { cont.style.opacity = 1; cont.style.transform = "none"; }
    return;
  }
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.to(".hero__content", { opacity: 1, y: 0, duration: 0.5 });
  tl.fromTo('[data-animate]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.2");
}

