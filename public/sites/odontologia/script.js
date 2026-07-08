document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. STICKY HEADER & SCROLL SPY
       ========================================================================== */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header Effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Spy (Highlight active nav link)
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    /* ==========================================================================
       2. MOBILE MENU TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            menuIcon.className = 'ph-bold ph-x';
        } else {
            menuIcon.className = 'ph-bold ph-list';
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.className = 'ph-bold ph-list';
        });
    });

    /* ==========================================================================
       3. BEFORE & AFTER IMAGE COMPARISON SLIDER
       ========================================================================== */
    const sliderContainer = document.getElementById('imageComparison');
    
    if (sliderContainer) {
        const beforeImgContainer = sliderContainer.querySelector('.before-image');
        const beforeImg = beforeImgContainer.querySelector('img');
        const sliderHandle = document.getElementById('sliderHandle');
        let isSliding = false;

        // Keep the clipped before-image width matching the container size during resize
        const syncImgWidth = () => {
            const containerWidth = sliderContainer.offsetWidth;
            beforeImg.style.width = containerWidth + 'px';
        };

        window.addEventListener('resize', syncImgWidth);
        syncImgWidth(); // initial sync

        const moveSlider = (clientX) => {
            const rect = sliderContainer.getBoundingClientRect();
            let positionX = clientX - rect.left;
            
            // Constrain within bounds
            if (positionX < 0) positionX = 0;
            if (positionX > rect.width) positionX = rect.width;
            
            // Calculate percentage
            const percentage = (positionX / rect.width) * 100;
            
            // Apply positioning
            beforeImgContainer.style.width = `${percentage}%`;
            sliderHandle.style.left = `${percentage}%`;
        };

        // Mouse Events
        sliderContainer.addEventListener('mousedown', () => isSliding = true);
        window.addEventListener('mouseup', () => isSliding = false);
        
        sliderContainer.addEventListener('mousemove', (e) => {
            if (!isSliding) return;
            moveSlider(e.clientX);
        });

        // Touch Events for Mobile
        sliderContainer.addEventListener('touchstart', () => isSliding = true);
        window.addEventListener('touchend', () => isSliding = false);
        
        sliderContainer.addEventListener('touchmove', (e) => {
            if (!isSliding) return;
            // Prevent default scrolling behaviour when dragging the slider
            e.preventDefault();
            moveSlider(e.touches[0].clientX);
        });

        // Clicking anywhere on slider moves it to that spot
        sliderContainer.addEventListener('click', (e) => {
            if (e.target.closest('#sliderHandle')) return; // let drag handle carry it
            moveSlider(e.clientX);
        });
    }

    /* ==========================================================================
       4. TECHNOLOGY TABS
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tech-tab-btn');
    const tabPanes = document.querySelectorAll('.tech-tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Remove active states
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active states
            btn.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       5. TESTIMONIALS SLIDER
       ========================================================================== */
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('sliderDots');
    let currentIndex = 0;
    let autoSlideInterval;

    if (testimonialsTrack && testimonialCards.length > 0) {
        const totalSlides = testimonialCards.length;

        // Render Dots dynamically if not already set or for safety
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        const dots = dotsContainer.querySelectorAll('.dot');

        const updateSlider = () => {
            testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateSlider();
            resetAutoSlide();
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        // Auto slide
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        startAutoSlide();
    }

    /* ==========================================================================
       6. INTERACTIVE BOOKING FORM & TIMESPOT SELECTOR
       ========================================================================== */
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');
    const timeSlots = document.querySelectorAll('.time-slot');
    const selectedTimeInput = document.getElementById('selectedTime');
    const bookingDateInput = document.getElementById('bookingDate');
    const btnResetBooking = document.getElementById('btnResetBooking');

    // Prevent past dates in booking date picker
    if (bookingDateInput) {
        const today = new Date().toISOString().split('T')[0];
        bookingDateInput.setAttribute('min', today);
    }

    // Time slots click behavior
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            const timeValue = slot.getAttribute('data-time');
            selectedTimeInput.value = timeValue;
        });
    });

    // Handle Form Submit
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check time slot selected
            if (!selectedTimeInput.value) {
                alert('Por favor, selecione um período de atendimento.');
                return;
            }

            const name = document.getElementById('clientName').value;
            const phone = document.getElementById('clientPhone').value;
            const treatmentElement = document.getElementById('treatment');
            const treatmentText = treatmentElement.options[treatmentElement.selectedIndex].text;
            const rawDate = bookingDateInput.value;

            // Format date to Brazilian Standard (DD/MM/AAAA)
            const dateParts = rawDate.split('-');
            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

            // Populate Success Screen
            document.getElementById('successName').textContent = name;
            document.getElementById('successDate').textContent = formattedDate;
            document.getElementById('successTime').textContent = selectedTimeInput.value;
            document.getElementById('successTreatment').textContent = treatmentText;

            // Show Success screen with animation
            bookingSuccess.classList.add('active');
        });
    }

    // Reset Booking Form
    if (btnResetBooking) {
        btnResetBooking.addEventListener('click', () => {
            bookingForm.reset();
            timeSlots.forEach(s => s.classList.remove('selected'));
            selectedTimeInput.value = '';
            bookingSuccess.classList.remove('active');
        });
    }

    /* ==========================================================================
       7. FAQ ACCORDIONS
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0px';
            });

            // Toggle selected FAQ
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            }
        });
    });
});
