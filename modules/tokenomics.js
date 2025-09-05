export function initTokenomicsChart() {
  const canvas = document.getElementById('tokenomicsChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  
  // Set canvas size
  const size = 400;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  
  const centerX = size / 2;
  const centerY = size / 2;
  const outerRadius = 150;
  const innerRadius = 80;
  
  const data = [
    { label: 'Presale', value: 40, color: '#00ffff', glowColor: 'rgba(0,255,255,0.6)', id: 'presale' },
    { label: 'Liquidity', value: 20, color: '#3b82f6', glowColor: 'rgba(59,130,246,0.6)', id: 'liquidity' },
    { label: 'Community', value: 15, color: '#10b981', glowColor: 'rgba(16,185,129,0.6)', id: 'community' },
    { label: 'Team', value: 10, color: '#8b5cf6', glowColor: 'rgba(139,92,246,0.6)', id: 'team' },
    { label: 'Marketing', value: 10, color: '#f59e0b', glowColor: 'rgba(245,158,11,0.6)', id: 'marketing' },
    { label: 'Reserve', value: 5, color: '#ef4444', glowColor: 'rgba(239,68,68,0.6)', id: 'reserve' }
  ];
  
  let hoveredSegment = -1;
  let startAngle = -Math.PI / 2;
  
  function getSegmentFromMouse(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - centerX;
    const y = event.clientY - rect.top - centerY;
    const distance = Math.sqrt(x * x + y * y);
    
    if (distance < innerRadius || distance > outerRadius) return -1;
    
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    
    let currentAngle = 0;
    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (data[i].value / 100) * 2 * Math.PI;
      if (angle >= currentAngle && angle <= currentAngle + sliceAngle) {
        return i;
      }
      currentAngle += sliceAngle;
    }
    return -1;
  }
  
  function drawChart() {
    ctx.clearRect(0, 0, size, size);
    let currentStartAngle = startAngle;
    
    data.forEach((item, index) => {
      const sliceAngle = (item.value / 100) * 2 * Math.PI;
      const isHovered = hoveredSegment === index;
      const radius = isHovered ? outerRadius + 10 : outerRadius;
      
      // Draw main slice
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentStartAngle, currentStartAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentStartAngle + sliceAngle, currentStartAngle, true);
      ctx.closePath();
      
      ctx.fillStyle = item.color;
      ctx.shadowBlur = isHovered ? 30 : 20;
      ctx.shadowColor = isHovered ? item.glowColor : 'rgba(0,255,255,0.3)';
      ctx.fill();
      
      // Draw percentage label
      const labelAngle = currentStartAngle + sliceAngle / 2;
      const labelRadius = (radius + innerRadius) / 2;
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;
      
      ctx.shadowBlur = 0;
      ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255,255,255,0.9)';
      ctx.font = isHovered ? 'bold 18px Orbitron, sans-serif' : 'bold 16px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${item.value}%`, labelX, labelY);
      
      currentStartAngle += sliceAngle;
    });
    
    // Draw center circle
    ctx.shadowBlur = 25;
    ctx.shadowColor = 'rgba(0,255,255,0.4)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fill();
    
    // Draw center text
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#00ffff';
    ctx.font = 'bold 14px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('XPASS', centerX, centerY - 8);
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText('1B Total', centerX, centerY + 12);
  }
  
  // Mouse interaction
  canvas.addEventListener('mousemove', (event) => {
    const newHovered = getSegmentFromMouse(event);
    if (newHovered !== hoveredSegment) {
      hoveredSegment = newHovered;
      drawChart();
      updateDescriptionHighlight();
    }
  });
  
  canvas.addEventListener('mouseleave', () => {
    if (hoveredSegment !== -1) {
      hoveredSegment = -1;
      drawChart();
      updateDescriptionHighlight();
    }
  });
  
  // Description item interaction
  function setupDescriptionInteraction() {
    const items = document.querySelectorAll('.tokenomics__item');
    items.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        hoveredSegment = index;
        drawChart();
        updateDescriptionHighlight();
      });
      
      item.addEventListener('mouseleave', () => {
        hoveredSegment = -1;
        drawChart();
        updateDescriptionHighlight();
      });
    });
  }
  
  function updateDescriptionHighlight() {
    const items = document.querySelectorAll('.tokenomics__item');
    items.forEach((item, index) => {
      if (hoveredSegment === index) {
        item.classList.add('tokenomics__item--highlighted');
      } else {
        item.classList.remove('tokenomics__item--highlighted');
      }
    });
  }
  
  // Animate chart on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        drawChart();
        setupDescriptionInteraction();
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(canvas);
}