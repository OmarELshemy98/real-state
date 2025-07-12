// Real Estate Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const titleElem = document.getElementById('carouselTitle');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  let current = 0;
  let autoPlayInterval = null;

  // إنشاء الدوتس
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (idx === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      goToSlide(idx);
      resetAutoPlay();
    });
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

  function nextSlide() {
    current = (current + 1) % slides.length;
    updateCarousel();
  }

  function resetAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });

  // إظهار أول صورة عند التحميل
  updateCarousel();
  resetAutoPlay();

  // Language toggle functionality
  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', function () {
      const html = document.documentElement;
      // Determine the new language after toggle
      const willBeArabic = html.getAttribute('lang') === 'en';
      // Set new lang and dir
      html.setAttribute('dir', willBeArabic ? 'rtl' : 'ltr');
      html.setAttribute('lang', willBeArabic ? 'ar' : 'en');
      // Show/hide elements based on the new language
      document.querySelectorAll('.ar').forEach(el => {
        el.classList.toggle('hidden', !willBeArabic);
      });
      document.querySelectorAll('.en').forEach(el => {
        el.classList.toggle('hidden', willBeArabic);
      });
      // Update time select options to show the OPPOSITE language
      updateTimeOptions(!willBeArabic);
    });
  }
});

// Time options translation
const timeOptions = [
  { ar: "اختر الوقت", en: "Select Time", id: "optionSelectTime" },
  { ar: "12:00 ظهراً", en: "12:00 PM", id: "option12" },
  { ar: "1:00 ظهراً", en: "1:00 PM", id: "option13" },
  { ar: "2:00 مساءً", en: "2:00 PM", id: "option14" },
  { ar: "3:00 مساءً", en: "3:00 PM", id: "option15" },
  { ar: "4:00 مساءً", en: "4:00 PM", id: "option16" },
  { ar: "5:00 مساءً", en: "5:00 PM", id: "option17" },
  { ar: "6:00 مساءً", en: "6:00 PM", id: "option18" },
  { ar: "7:00 مساءً", en: "7:00 PM", id: "option19" },
  { ar: "8:00 مساءً", en: "8:00 PM", id: "option20" },
  { ar: "9:00 مساءً", en: "9:00 PM", id: "option21" }
];
function updateTimeOptions(isArabic) {
  timeOptions.forEach(opt => {
    const el = document.getElementById(opt.id);
    if (el) el.textContent = isArabic ? opt.ar : opt.en;
  });
} 