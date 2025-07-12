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

  // Language toggle functionality with localStorage
  const langToggleBtn = document.getElementById('langToggle');
  const html = document.documentElement;
  function setLanguage(isArabic) {
    html.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
    html.setAttribute('lang', isArabic ? 'ar' : 'en');
    document.querySelectorAll('.ar').forEach(el => {
      el.classList.toggle('hidden', !isArabic);
    });
    document.querySelectorAll('.en').forEach(el => {
      el.classList.toggle('hidden', isArabic);
    });
    updateTimeOptions(isArabic);
    localStorage.setItem('site-lang', isArabic ? 'ar' : 'en');
  }

  // عند تحميل الصفحة: استخدم اللغة المحفوظة أو الإنجليزية كافتراضي
  const savedLang = localStorage.getItem('site-lang');
  if (savedLang === 'ar') {
    setLanguage(true);
  } else {
    setLanguage(false);
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', function () {
      const isArabic = html.getAttribute('lang') !== 'ar';
      setLanguage(isArabic);
    });
  }

  const companyBroker = document.getElementById('companyBroker');
  const companyNameInput = document.getElementById('companyName');
  const companyNameBox = document.getElementById('companyNameBox');
  companyBroker.addEventListener('change', function() {
    if (companyBroker.checked) {
      companyNameBox.classList.remove('hidden');
      companyNameInput.setAttribute('required', 'required');
    } else {
      companyNameBox.classList.add('hidden');
      companyNameInput.removeAttribute('required');
    }
  });
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

document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Collect data
  const date = document.getElementById('viewingDate').value;
  const timeSelect = document.getElementById('viewingTime');
  const time = timeSelect.options[timeSelect.selectedIndex].text;
  const name = document.getElementById('customerName').value;
  const userType = document.querySelector('input[name="userType"]:checked');
  const isBroker = userType && userType.value === 'broker';
  const isClient = userType && userType.value === 'client';
  let brokerPurpose = '';
  if (isBroker) {
    if (document.getElementById('hasClient').checked) {
      brokerPurpose = 'I have a client';
    } else if (document.getElementById('viewBeforeClient').checked) {
      brokerPurpose = 'Booking to view the apartment before showing to client';
    }
  }
  // Broker type
  let brokerType = '';
  let companyName = '';
  if (isBroker) {
    const brokerTypeRadio = document.querySelector('input[name="brokerType"]:checked');
    if (brokerTypeRadio) {
      brokerType = brokerTypeRadio.value;
      if (brokerType === 'company') {
        companyName = document.getElementById('companyName').value.trim();
      }
    }
  }

  // Validation (remains bilingual)
  const html = document.documentElement;
  const isArabic = html.getAttribute('lang') === 'ar';
  let missing = [];
  if (!name) missing.push(isArabic ? 'الاسم' : 'Name');
  if (!date) missing.push(isArabic ? 'التاريخ' : 'Date');
  if (!timeSelect.value) missing.push(isArabic ? 'الوقت' : 'Time');
  if (!userType) missing.push(isArabic ? 'نوع المستخدم (بروكر أو مشتري)' : 'User type (Broker or Buyer)');
  if (isBroker && !brokerPurpose) missing.push(isArabic ? 'سبب المعاينة' : 'Viewing reason');
  if (isBroker && !brokerType) missing.push(isArabic ? 'نوع البروكر' : 'Broker type');
  if (isBroker && brokerType === 'company' && !companyName) missing.push(isArabic ? 'اسم الشركة' : 'Company name');
  if (missing.length > 0) {
    alert((isArabic ? 'يرجى إدخال البيانات التالية: ' : 'Please enter the following: ') + '\n' + missing.join('\n'));
    return;
  }

  // Compose WhatsApp message in English only
  let message = `Apartment Viewing Booking:\n`;
  message += `Name: ${name}\n`;
  message += `Date: ${date}\n`;
  message += `Time: ${time}\n`;
  if (isBroker) message += `User Type: Broker\n`;
  if (isClient) message += `User Type: Buyer\n`;
  if (isBroker && brokerType === 'freelance') message += `Broker Type: Freelance Broker\n`;
  if (isBroker && brokerType === 'company') message += `Broker Type: Company Broker\n`;
  if (isBroker && brokerType === 'company' && companyName) message += `Company Name: ${companyName}\n`;
  if (brokerPurpose) message += `Viewing Reason: ${brokerPurpose}\n`;

  // Open WhatsApp
  const phone = '201026238072';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}); 