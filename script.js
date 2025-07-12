// Real Estate Website JavaScript

class RealEstateWebsite {
    constructor() {
        this.currentSlide = 0;
        this.images = [];
        this.isArabic = true;
        this.init();
    }

    init() {
        this.loadImages();
        this.setupCarousel();
        this.setupLightbox();
        this.setupLanguageToggle();
        this.setupBookingForm();
        this.setupContactButtons();
        this.setMinDate();
        
        // Add loading indicator
        this.showLoadingIndicator();
    }

    // Load images from the images folder
    loadImages() {
        // Updated list based on actual files in the images folder
        const imageFiles = [
           
        ];

        // Filter out any images that might not exist and create the full paths
        this.images = imageFiles.map(file => `images/${file}`);
        
        // Add error handling for image loading
        this.renderCarousel();
    }

    // Setup carousel functionality
    setupCarousel() {
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const dotsContainer = document.getElementById('carouselDots');

        if (!track) return;

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Auto-play carousel (only if there are images)
        if (this.images.length > 0) {
            this.autoPlayInterval = setInterval(() => {
                if (!this.pauseAutoPlay) {
                    this.nextSlide();
                }
            }, 5000);
        }

        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            } else if (e.key === 'Escape') {
                this.closeLightbox();
            }
        });
        
        // Pause auto-play on hover
        track.addEventListener('mouseenter', () => {
            this.pauseAutoPlay = true;
        });
        
        track.addEventListener('mouseleave', () => {
            this.pauseAutoPlay = false;
        });
    }

    // Render carousel slides
    renderCarousel() {
        const track = document.getElementById('carouselTrack');
        const dotsContainer = document.getElementById('carouselDots');

        if (!track || !dotsContainer) return;

        // Clear existing content
        track.innerHTML = '';
        dotsContainer.innerHTML = '';

        // Create slides with error handling
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Apartment Image ${index + 1}`;
            img.loading = 'lazy';
            
            // Add error handling for images
            img.onerror = () => {
                console.warn(`Failed to load image: ${image}`);
                slide.style.display = 'none'; // Hide broken images
            };
            
            img.onload = () => {
                slide.style.display = 'flex'; // Show loaded images
            };
            
            slide.appendChild(img);
            slide.addEventListener('click', () => this.openLightbox(image));
            track.appendChild(slide);

            // Create dot
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Initialize carousel position
        this.updateCarousel();
        
        // Hide loading indicator after images are loaded
        this.hideLoadingIndicator();
    }
    
    // Show loading indicator
    showLoadingIndicator() {
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            const loader = document.createElement('div');
            loader.id = 'carouselLoader';
            loader.className = 'absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-20';
            loader.innerHTML = `
                <div class="flex flex-col items-center space-y-3">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <div class="text-gray-600 font-medium">
                        <span class="ar">جاري تحميل الصور...</span>
                        <span class="en hidden">Loading images...</span>
                    </div>
                </div>
            `;
            carouselContainer.style.position = 'relative';
            carouselContainer.appendChild(loader);
        }
    }
    
    // Hide loading indicator
    hideLoadingIndicator() {
        const loader = document.getElementById('carouselLoader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 300);
        }
    }

    // Carousel navigation
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.images.length - 1 : this.currentSlide - 1;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const track = document.getElementById('carouselTrack');
        const dots = document.querySelectorAll('.dot');

        if (track) {
            track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        }

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    // Lightbox functionality
    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.getElementById('closeLightbox');

        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }
    }

    openLightbox(imageSrc) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');

        if (lightbox && lightboxImage) {
            lightboxImage.src = imageSrc;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // Language toggle functionality
    setupLanguageToggle() {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => this.toggleLanguage());
        }
    }

    toggleLanguage() {
        this.isArabic = !this.isArabic;
        const html = document.documentElement;
        const arElements = document.querySelectorAll('.ar');
        const enElements = document.querySelectorAll('.en');

        if (this.isArabic) {
            html.lang = 'ar';
            html.dir = 'rtl';
            arElements.forEach(el => el.classList.remove('hidden'));
            enElements.forEach(el => el.classList.add('hidden'));
        } else {
            html.lang = 'en';
            html.dir = 'ltr';
            arElements.forEach(el => el.classList.add('hidden'));
            enElements.forEach(el => el.classList.remove('hidden'));
        }
    }

    // Booking form functionality
    setupBookingForm() {
        const form = document.getElementById('bookingForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleBookingSubmit(e));
        }
    }

    handleBookingSubmit(e) {
        e.preventDefault();

        const date = document.getElementById('viewingDate').value;
        const time = document.getElementById('viewingTime').value;
        const name = document.getElementById('customerName').value;
        const isBroker = document.getElementById('isBroker').checked;

        if (!date || !time || !name) {
            this.showMessage(this.isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields', 'error');
            return;
        }

        // Create WhatsApp message
        const message = this.createWhatsAppMessage(date, time, name, isBroker);
        const whatsappUrl = `https://wa.me/201026238072?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        this.showMessage(
            this.isArabic ? 'تم إرسال طلبك بنجاح!' : 'Your request has been sent successfully!',
            'success'
        );

        // Reset form
        form.reset();
    }

    createWhatsAppMessage(date, time, name, isBroker) {
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString(this.isArabic ? 'ar-EG' : 'en-US');
        const userType = isBroker ? 
            (this.isArabic ? 'بروكر' : 'Broker') : 
            (this.isArabic ? 'مشتري' : 'Buyer');

        if (this.isArabic) {
            return `مرحباً! أريد حجز معاينة للشقة:

التاريخ: ${formattedDate}
الوقت: ${time}
الاسم: ${name}
النوع: ${userType}

شكراً لكم!`;
        } else {
            return `Hello! I would like to book a viewing for the apartment:

Date: ${formattedDate}
Time: ${time}
Name: ${name}
Type: ${userType}

Thank you!`;
        }
    }

    // Contact buttons functionality
    setupContactButtons() {
        const whatsappBtn = document.querySelector('a[href*="wa.me"]');
        const callBtn = document.querySelector('a[href*="tel:"]');

        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const message = this.isArabic ? 
                    'مرحباً! أريد معلومات أكثر عن الشقة' : 
                    'Hello! I would like more information about the apartment';
                const url = `https://wa.me/201026238072?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            });
        }
    }

    // Set minimum date for booking (today)
    setMinDate() {
        const dateInput = document.getElementById('viewingDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
    }

    // Show messages
    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        messageEl.textContent = message;

        // Add to page
        document.body.appendChild(messageEl);

        // Remove after 3 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RealEstateWebsite();
});

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('fade-in');
        });
    });
});

// Add intersection observer for animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}); 