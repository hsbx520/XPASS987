export function initRoadmap() {
  const nodes = document.querySelectorAll('.roadmap__node');
  const line = document.querySelector('.roadmap__line');
  
  // Set up intersection observer for animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate line first
        if (entry.target === line) {
          entry.target.classList.add('fi-in');
        }
        
        // Then animate nodes with delay
        if (entry.target.classList.contains('roadmap__node')) {
          const index = Array.from(nodes).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('fi-in');
          }, index * 200);
        }
      }
    });
  }, { threshold: 0.3 });
  
  // Observe line and nodes
  if (line) observer.observe(line);
  nodes.forEach(node => observer.observe(node));
  
  // Add hover pulse effect to dots
  nodes.forEach(node => {
    const dot = node.querySelector('.roadmap__node-dot');
    if (dot) {
      node.addEventListener('mouseenter', () => {
        dot.style.boxShadow = '0 0 25px rgba(0,255,255,.9), 0 0 50px rgba(0,255,255,.5)';
      });
      
      node.addEventListener('mouseleave', () => {
        dot.style.boxShadow = '0 0 0 rgba(0,255,255,.6)';
      });
    }
  });
}