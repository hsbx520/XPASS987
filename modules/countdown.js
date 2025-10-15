export function startCountdown(){
  // Beijing time: 2025-10-06 00:00 => UTC: 2025-10-05 16:00
  const targetUtcMs = Date.UTC(2025, 9, 18, 16, 0, 0);
  const set=(id,v)=>{const el=document.getElementById(id); if(el) el.textContent=String(v).padStart(2,"0");};
  
  // Update countdown title
  const titleEl = document.querySelector('.countdown__title');
  if (titleEl) {
    titleEl.textContent = 'Final Presale Round';
  }
  
  (function tick(){
    const diff=Math.max(0,targetUtcMs-Date.now());
    set("cdDays",Math.floor(diff/86400000));
    set("cdHours",Math.floor((diff%86400000)/3600000));
    set("cdMinutes",Math.floor((diff%3600000)/60000));
    set("cdSeconds",Math.floor((diff%60000)/1000));
    if(diff>0) setTimeout(tick,1000);
  })();
}
