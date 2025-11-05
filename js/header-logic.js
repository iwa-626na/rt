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

document.querySelectorAll('.slider').forEach(setupCarousel);

function setupCarousel(slider) {
  const slides = slider.querySelector('.slides');
  const slideElements = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  let slideWidth = slideElements[0].offsetWidth + 20; // 20 = gap
  let currentIndex = 1;

  // Clone first and last for infinite loop
  const firstClone = slideElements[0].cloneNode(true);
  const lastClone = slideElements[slideElements.length - 1].cloneNode(true);
  slides.appendChild(firstClone);
  slides.insertBefore(lastClone, slideElements[0]);

  const allSlides = slider.querySelectorAll('.slide');
  let totalSlides = allSlides.length;

  // Position the first real slide
  slides.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  // Update on window resize
  window.addEventListener('resize', () => {
    slideWidth = slideElements[0].offsetWidth + 20;
    updateSlider();
  });

  function updateSlider() {
    slides.style.transition = 'transform 0.5s ease';
    slides.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  function nextSlide() {
    if (currentIndex >= totalSlides - 1) return;
    currentIndex++;
    updateSlider();
  }

  function prevSlide() {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSlider();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Loop seamlessly
  slides.addEventListener('transitionend', () => {
    if (allSlides[currentIndex].isSameNode(firstClone)) {
      slides.style.transition = 'none';
      currentIndex = 1;
      slides.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
    if (allSlides[currentIndex].isSameNode(lastClone)) {
      slides.style.transition = 'none';
      currentIndex = totalSlides - 2;
      slides.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
  });
}


  });
  
  