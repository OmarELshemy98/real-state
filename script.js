// Real Estate Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const titleElem = document.getElementById('carouselTitle');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  let current = 0;

  // إنشاء الدوتس
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (idx === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  function updateCarousel() {
    slides.forEach((slide, idx) => {
      slide.style.display = idx === current ? 'flex' : 'none';
    });
    // تحديث العنوان
    const ar = slides[current].dataset.titleAr || '';
    const en = slides[current].dataset.titleEn || '';
    titleElem.querySelector('.ar').textContent = ar;
    titleElem.querySelector('.en').textContent = en;
    // تحديث الدوتس
    dotsContainer.querySelectorAll('.dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === current);
    });
  }

  function goToSlide(idx) {
    current = idx;
    updateCarousel();
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateCarousel();
  });

  // إظهار أول صورة عند التحميل
  updateCarousel();
}); 