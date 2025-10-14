document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const comp = document.querySelector('.comp');
  
    const startWidth = 600;      // px, initial logo size
    const endWidth = 120;         // px, final logo size in header
    const startX = 0    // initial X offset
    const startY = 0;            // initial Y offset
    const endX = 20;             // final X in header
    const endY = 12;             // final Y in header
    const maxScroll = 250;       // scroll distance to finish animation
  
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const t = Math.min(scrollTop / maxScroll, 1); // 0 → 1
  
      // scale from startWidth → endWidth
      const scale = 1 - t * (1 - endWidth / startWidth);
  
      // move from center (startX,startY) → header (endX,endY)
      const translateX = startX + t * (endX - startX);
      const translateY = startY + t * (endY - startY);
  
      logo.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      logo.style.position = 'fixed';
      logo.style.top = '0';
      logo.style.left = '0';
      logo.style.zIndex = '1000';
      comp.style.zIndex= '0';
      
    });
  });
  
  