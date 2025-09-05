import { animateIn } from "./modules/animations.js";
import { particles } from "./modules/particles.js";
import { presaleUI } from "./modules/presale.js";
import { startCountdown } from "./modules/countdown.js";
import { setupFeaturedMarquee, setupFeaturedClicks } from "./modules/featured.js";
import { setupObservers, setupGlobalErrorGuards } from "./modules/system.js";
import { initTokenomicsChart } from "./modules/tokenomics.js";
import { initRoadmap } from "./modules/roadmap.js";
import { initMonument } from "./modules/monument.js";
import { initFAQ } from './modules/faq.js';

window.addEventListener("DOMContentLoaded", () => {
  animateIn(); 
  particles(); 
  presaleUI(); 
  startCountdown();
  setupObservers(); 
  setupFeaturedMarquee(); 
  setupFeaturedClicks();
  setupGlobalErrorGuards();
  initTokenomicsChart();
  initRoadmap();
  initMonument();
  initFAQ();
});