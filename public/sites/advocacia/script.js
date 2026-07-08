document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================
    // 1. HEADER SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    const handleScrollNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScrollNavbar);
    handleScrollNavbar(); // Initial check

    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navbar.classList.toggle('menu-open');
            navToggle.setAttribute('aria-label', isOpen ? 'Fechar Menu' : 'Abrir Menu');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navbar.classList.remove('menu-open');
            });
        });
    }

    // ==========================================
    // 3. ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for sticky header
            const sectionId = current.getAttribute('id');
            const linkElement = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (linkElement) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    linkElement.classList.add('active');
                } else {
                    linkElement.classList.remove('active');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollActive);

    // ==========================================
    // 4. TESTIMONIALS SLIDER/CAROUSEL
    // ==========================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (n) => {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Calculate new index
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        showSlide(currentSlide - 1);
    };

    if (slides.length > 0) {
        // Event Listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
                resetInterval();
            });
        });

        // Auto slide interval setup
        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 6000);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        startInterval();

        // Pause auto-sliding on hover
        const sliderContainer = document.querySelector('.testimonials-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderContainer.addEventListener('mouseleave', startInterval);
        }
    }

    // ==========================================
    // 5. FAQ ACCORDION
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            const isActive = item.classList.contains('active');

            // Close all other open accordion items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });

    // ==========================================
    // 6. CONTACT FORM VALIDATION & SIMULATION
    // ==========================================
    const form = document.getElementById('form-contato');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic phone format helper (not blocking, just informational)
            const telefone = document.getElementById('telefone').value;
            const email = document.getElementById('email').value;
            const nome = document.getElementById('nome').value;

            // Submit visual feedback
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Enviando dados...</span> <i data-lucide="loader" class="animate-spin"></i>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();

            // Simulate form submission (e.g. webhook/API post)
            setTimeout(() => {
                // Reset form button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                if (typeof lucide !== 'undefined') lucide.createIcons();

                // Show success status
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `<strong>Sucesso!</strong> Olá, ${nome}. Seus dados foram enviados. Um de nossos advogados entrará em contato pelo telefone ${telefone} ou e-mail ${email} nas próximas horas.`;
                
                // Reset form fields
                form.reset();

                // Auto-fade status message after 10s
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 10000);

            }, 1800); // Wait 1.8 seconds (feel premium and realistic)
        });
    }

    // ==========================================
    // 7. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after showing
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Start loading slightly before entering viewport
    });

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
});
