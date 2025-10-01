let toastTimer;
const toast = (t)=>{const el=document.getElementById("toast");clearTimeout(toastTimer);el.textContent=t;el.classList.add("show");toastTimer=setTimeout(()=>el.classList.remove("show"),1600);};

export function setupFeaturedClicks(){
  const wrap=document.querySelector(".featured__logos");
  if(!wrap||wrap.dataset.clickInit) return;
  const handler=(e)=>{const a=e.target.closest("a.featured__logo"); if(a){e.preventDefault(); e.stopPropagation(); toast("Coming soon");}};
  wrap.addEventListener("click",handler,{passive:false});
  wrap.addEventListener("touchend",handler,{passive:false});
  wrap.dataset.clickInit="1";
}

export function setupFeaturedMarquee(){
  const c=document.querySelector(".featured__logos");
  if(!c||c.dataset.marqueeInit||window.innerWidth>600) return;
  const items=[...c.children], track=document.createElement("div");
  track.className="featured__track";
  items.forEach(el=>track.appendChild(el));
  items.forEach(el=>track.appendChild(el.cloneNode(true)));
  c.textContent=""; c.classList.add("marquee"); c.appendChild(track);
  track.querySelectorAll(".fi-observe").forEach(el=>el.classList.add("fi-in"));
  c.dataset.marqueeInit="1"; setupFeaturedClicks();
}