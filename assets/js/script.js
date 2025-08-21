// Modern Resume JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for internal links
    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Add loading animation
    const addLoadingAnimation = () => {
        const sections = document.querySelectorAll('.section');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    };

    // Add typing effect to main title
    const addTypingEffect = () => {
        const title = document.querySelector('.header h1');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            title.style.borderRight = '2px solid #3498db';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            setTimeout(typeWriter, 500);
        }
    };

    // Add hover effects to skill items
    const enhanceSkillItems = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Add progress bars to skills (if we want to show proficiency levels)
    const addSkillProgress = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        const skillLevels = {
            'Arduino/C++ Programming': 95,
            'Python Programming': 75,
            'CAD Modeling': 85,
            'CNC Control': 70,
            'PCB Design & Development': 90,
            'Circuit Design (Proteus)': 88,
            'Embedded Systems': 92,
            'IoT Solutions': 90,
            'Project Management': 80
        };

        skillItems.forEach(item => {
            const skillName = item.textContent.trim();
            const level = skillLevels[skillName] || 75;
            
            // Create progress bar
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                width: 100%;
                height: 4px;
                background: #ecf0f1;
                border-radius: 2px;
                margin-top: 10px;
                overflow: hidden;
            `;
            
            const progress = document.createElement('div');
            progress.style.cssText = `
                width: 0%;
                height: 100%;
                background: linear-gradient(90deg, #3498db, #e74c3c);
                border-radius: 2px;
                transition: width 1.5s ease;
            `;
            
            progressBar.appendChild(progress);
            item.appendChild(progressBar);
            
            // Animate progress bar when item comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            progress.style.width = level + '%';
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(item);
        });
    };

    // Add click-to-copy functionality for contact info
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
                        // Show copy confirmation
                        const originalText = this.innerHTML;
                        this.innerHTML = '<span class="icon">✅</span><h3>Copied!</h3><p>' + text + '</p>';
                        setTimeout(() => {
                            this.innerHTML = originalText;
                        }, 1500);
                    });
                });
            }
        });
    };

    // Add scroll-to-top button
    const addScrollToTop = () => {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #3498db;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.transform = 'translateY(0)';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.transform = 'translateY(10px)';
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // Add dark mode toggle
    const addDarkModeToggle = () => {
        const toggle = document.createElement('button');
        toggle.innerHTML = '🌙';
        toggle.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #2c3e50;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(toggle);
        
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    };

    // Initialize all features
    smoothScroll();
    addLoadingAnimation();
    addTypingEffect();
    enhanceSkillItems();
    addSkillProgress();
    addScrollToTop();
    addDarkModeToggle();
    
    // Add copy functionality only on contact page
    if (window.location.pathname.includes('contact')) {
        addCopyFunctionality();
    }

    // Add print functionality
    const addPrintButton = () => {
        if (!window.location.pathname.includes('contact')) {
            const printBtn = document.createElement('button');
            printBtn.innerHTML = '🖨️ Print Resume';
            printBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 30px;
                padding: 12px 20px;
                background: #e74c3c;
                color: white;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            `;
            
            document.body.appendChild(printBtn);
            
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }
    };
    
    addPrintButton();
});

// Add dark mode CSS
const darkModeStyles = `
.dark-mode {
    --primary-color: #ecf0f1;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #ecf0f1;
    --light-gray: #34495e;
    --dark-gray: #bdc3c7;
    --white: #2c3e50;
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.dark-mode .section {
    background: #34495e;
    color: #ecf0f1;
}

.dark-mode .experience-item,
.dark-mode .project-item,
.dark-mode .education-item {
    background: #2c3e50;
}

.dark-mode .skill-item {
    background: #2c3e50;
    color: #ecf0f1;
}
`;

// Inject dark mode styles
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);