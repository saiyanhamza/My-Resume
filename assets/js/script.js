// Minimalistic Aesthetic Resume JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Simple Loading Screen
    const createLoadingScreen = () => {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loadingOverlay);
        
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 800);
    };

    // Subtle Typing Effect
    const addTypingEffect = () => {
        const title = document.querySelector('.header h1');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    };

    // Scroll Reveal Animation
    const addScrollReveal = () => {
        const elements = document.querySelectorAll('.section');
        
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal', 'active');
                    
                    // Staggered animation for child elements
                    const children = entry.target.querySelectorAll('.experience-item, .project-item, .education-item, .skill-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        elements.forEach(element => {
            element.classList.add('reveal');
            
            // Set initial state for child elements
            const children = element.querySelectorAll('.experience-item, .project-item, .education-item, .skill-item');
            children.forEach(child => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = 'all 0.6s ease';
            });
            
            observer.observe(element);
        });
    };

    // Floating Action Buttons
    const createFloatingButtons = () => {
        // Scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'floating-btn scroll-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
        
        // Theme toggle button
        const themeBtn = document.createElement('button');
        themeBtn.className = 'floating-btn theme-toggle';
        themeBtn.innerHTML = '🌙';
        themeBtn.setAttribute('aria-label', 'Toggle theme');
        document.body.appendChild(themeBtn);
        
        // Print button
        const printBtn = document.createElement('button');
        printBtn.className = 'floating-btn print-btn';
        printBtn.innerHTML = '🖨';
        printBtn.setAttribute('aria-label', 'Print resume');
        document.body.appendChild(printBtn);
        
        // Scroll to top functionality
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Theme toggle functionality
        let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const updateTheme = () => {
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                themeBtn.innerHTML = '☀️';
            } else {
                document.body.classList.remove('dark-mode');
                themeBtn.innerHTML = '🌙';
            }
        };
        
        updateTheme();
        
        themeBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            updateTheme();
        });
        
        // Print functionality
        printBtn.addEventListener('click', () => {
            window.print();
        });
    };

    // Subtle Hover Effects
    const addHoverEffects = () => {
        const hoverElements = document.querySelectorAll('.experience-item, .project-item, .education-item, .skill-item');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    };

    // Smooth Navigation
    const addSmoothNavigation = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Copy to Clipboard (for contact page)
    const addCopyFunctionality = () => {
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            const emailLink = item.querySelector('a[href^="mailto:"]');
            const phoneLink = item.querySelector('a[href^="tel:"]');
            
            if (emailLink || phoneLink) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    const text = emailLink ? emailLink.textContent : phoneLink.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        // Minimal copy confirmation
                        const originalHTML = this.innerHTML;
                        this.style.background = 'var(--accent-soft)';
                        this.style.transform = 'scale(1.02)';
                        
                        const icon = this.querySelector('.icon');
                        if (icon) {
                            icon.textContent = '✓';
                            icon.style.color = 'var(--accent-primary)';
                        }
                        
                        setTimeout(() => {
                            this.innerHTML = originalHTML;
                            this.style.background = '';
                            this.style.transform = '';
                        }, 1500);
                    });
                });
            }
        });
    };

    // Keyboard Navigation
    const addKeyboardNavigation = () => {
        const focusableElements = document.querySelectorAll('a, button, [tabindex]');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.transform = 'translateY(-1px)';
            });
            
            element.addEventListener('blur', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    };

    // Intersection Observer for Performance
    const optimizeAnimations = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (reduceMotion) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    };

    // Initialize all features
    createLoadingScreen();
    
    setTimeout(() => {
        addTypingEffect();
        addScrollReveal();
        createFloatingButtons();
        addHoverEffects();
        addSmoothNavigation();
        addKeyboardNavigation();
        optimizeAnimations();
        
        // Add copy functionality only on contact page
        if (window.location.pathname.includes('contact')) {
            addCopyFunctionality();
        }
    }, 800);

    // Performance optimization for mobile
    if (window.innerWidth < 768) {
        const style = document.createElement('style');
        style.textContent = `
            .section {
                animation: fadeIn 0.4s ease-out;
            }
        `;
        document.head.appendChild(style);
    }

    // Accessibility improvements
    const improveAccessibility = () => {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-primary);
            color: var(--bg-secondary);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            transition: top 0.3s ease;
            z-index: 10000;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content id
        const mainContent = document.querySelector('.main-content') || document.querySelector('.container');
        if (mainContent) {
            mainContent.id = 'main-content';
        }
    };

    improveAccessibility();
});