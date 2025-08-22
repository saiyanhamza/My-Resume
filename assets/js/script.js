// Futuristic Resume JavaScript - Web 3.0
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen
    const createLoadingScreen = () => {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loader"></div>
        `;
        document.body.appendChild(loadingOverlay);
        
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1500);
    };

    // Particle System
    const createParticles = () => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 12000);
        };
        
        // Create initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(createParticle, i * 200);
        }
        
        // Continuously create particles
        setInterval(createParticle, 800);
    };

    // Advanced Typing Effect with Glitch
    const addAdvancedTypingEffect = () => {
        const title = document.querySelector('.header h1');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            title.setAttribute('data-text', text);
            title.classList.add('glitch');
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    
                    // Random glitch effect
                    if (Math.random() < 0.1) {
                        title.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
                        setTimeout(() => {
                            title.style.transform = 'translateX(0)';
                        }, 50);
                    }
                    
                    i++;
                    setTimeout(typeWriter, 100 + Math.random() * 100);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    };

    // Scroll Reveal Animation
    const addScrollReveal = () => {
        const elements = document.querySelectorAll('.section');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal', 'active');
                    
                    // Add staggered animation to child elements
                    const children = entry.target.querySelectorAll('.experience-item, .project-item, .education-item, .skill-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.animation = `fadeInUp 0.6s ease-out forwards`;
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        elements.forEach(element => {
            element.classList.add('reveal');
            observer.observe(element);
        });
    };

    // Enhanced Skill Items with Progress Bars
    const enhanceSkillItems = () => {
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

        skillItems.forEach((item, index) => {
            const skillName = item.textContent.trim();
            const level = skillLevels[skillName] || 75;
            
            // Add progress bar
            const progressContainer = document.createElement('div');
            progressContainer.style.cssText = `
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                margin-top: 15px;
                overflow: hidden;
                position: relative;
            `;
            
            const progress = document.createElement('div');
            progress.style.cssText = `
                width: 0%;
                height: 100%;
                background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
                border-radius: 2px;
                transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
            `;
            
            // Add glowing effect
            progress.style.boxShadow = '0 0 10px rgba(0, 245, 255, 0.5)';
            
            progressContainer.appendChild(progress);
            item.appendChild(progressContainer);
            
            // Animate when visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            progress.style.width = level + '%';
                        }, index * 200);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(item);
            
            // Add hover sound effect simulation
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-8px) scale(1.02)';
                progress.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.8)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                progress.style.boxShadow = '0 0 10px rgba(0, 245, 255, 0.5)';
            });
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
        
        // Print button
        const printBtn = document.createElement('button');
        printBtn.className = 'floating-btn print-btn';
        printBtn.innerHTML = '🖨️';
        printBtn.setAttribute('aria-label', 'Print resume');
        document.body.appendChild(printBtn);
        
        // Dark mode toggle (always dark in this version, but keep for future)
        const darkModeBtn = document.createElement('button');
        darkModeBtn.className = 'floating-btn dark-mode-toggle';
        darkModeBtn.innerHTML = '🔮';
        darkModeBtn.setAttribute('aria-label', 'Futuristic mode');
        document.body.appendChild(darkModeBtn);
        
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
        
        // Print functionality
        printBtn.addEventListener('click', () => {
            window.print();
        });
        
        // Futuristic mode toggle (adds extra effects)
        let futuristicMode = false;
        darkModeBtn.addEventListener('click', () => {
            futuristicMode = !futuristicMode;
            if (futuristicMode) {
                document.body.style.filter = 'hue-rotate(30deg) saturate(1.2)';
                darkModeBtn.innerHTML = '✨';
                createLightningEffect();
            } else {
                document.body.style.filter = 'none';
                darkModeBtn.innerHTML = '🔮';
            }
        });
    };

    // Lightning Effect for Futuristic Mode
    const createLightningEffect = () => {
        const lightning = document.createElement('div');
        lightning.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(0, 245, 255, 0.1), transparent);
            pointer-events: none;
            z-index: 9998;
            opacity: 0;
        `;
        document.body.appendChild(lightning);
        
        const flash = () => {
            lightning.style.opacity = '1';
            setTimeout(() => {
                lightning.style.opacity = '0';
            }, 100);
        };
        
        flash();
        setTimeout(flash, 200);
        setTimeout(flash, 400);
        
        setTimeout(() => {
            lightning.remove();
        }, 1000);
    };

    // Matrix Rain Effect
    const createMatrixRain = () => {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00f5ff';
            ctx.font = fontSize + 'px JetBrains Mono';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 50);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    };

    // Enhanced Hover Effects
    const addEnhancedHoverEffects = () => {
        const experienceItems = document.querySelectorAll('.experience-item, .project-item');
        
        experienceItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(0, 245, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (rect.width / 2 - size / 2) + 'px';
                ripple.style.top = (rect.height / 2 - size / 2) + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Cursor Trail Effect
    const createCursorTrail = () => {
        const trail = [];
        const trailLength = 20;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: ${8 - i * 0.3}px;
                height: ${8 - i * 0.3}px;
                background: rgba(0, 245, 255, ${1 - i * 0.05});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }
        
        document.addEventListener('mousemove', (e) => {
            trail.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.left = e.clientX + 'px';
                    dot.style.top = e.clientY + 'px';
                }, index * 10);
            });
        });
    };

    // Holographic Text Effect
    const addHolographicEffect = () => {
        const titles = document.querySelectorAll('.section h2');
        titles.forEach(title => {
            title.addEventListener('mouseenter', function() {
                this.style.textShadow = `
                    0 0 5px var(--accent-cyan),
                    0 0 10px var(--accent-cyan),
                    0 0 15px var(--accent-cyan),
                    0 0 20px var(--accent-cyan)
                `;
            });
            
            title.addEventListener('mouseleave', function() {
                this.style.textShadow = 'none';
            });
        });
    };

    // Parallax Scrolling Effect
    const addParallaxEffect = () => {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.header, .section');
            
            parallaxElements.forEach((element, index) => {
                const rate = scrolled * -0.5 * (index * 0.1 + 0.1);
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    };

    // Sound Simulation (Visual Feedback)
    const addSoundSimulation = () => {
        const buttons = document.querySelectorAll('.nav-links a, .floating-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Visual sound wave effect
                const wave = document.createElement('div');
                wave.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border: 2px solid var(--accent-cyan);
                    border-radius: 50%;
                    top: 0;
                    left: 0;
                    animation: soundWave 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.appendChild(wave);
                
                setTimeout(() => {
                    wave.remove();
                }, 600);
            });
        });
        
        // Add sound wave animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes soundWave {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scale(1.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Data Stream Effect
    const createDataStream = () => {
        const stream = document.createElement('div');
        stream.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            width: 200px;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            color: var(--accent-cyan);
            overflow: hidden;
        `;
        
        const generateData = () => {
            const data = [];
            for (let i = 0; i < 100; i++) {
                data.push(Math.random().toString(36).substring(2, 15));
            }
            return data.join('<br>');
        };
        
        stream.innerHTML = generateData();
        document.body.appendChild(stream);
        
        // Animate data stream
        let position = 0;
        setInterval(() => {
            position -= 1;
            stream.style.transform = `translateY(${position}px)`;
            
            if (position < -stream.offsetHeight) {
                position = window.innerHeight;
                stream.innerHTML = generateData();
            }
        }, 50);
    };

    // Terminal-style Console Log
    const addTerminalEffect = () => {
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            const messages = [
                'Initializing neural networks...',
                'Loading quantum processors...',
                'Connecting to the matrix...',
                'System ready. Welcome to the future.'
            ];
            
            let messageIndex = 0;
            const originalText = subtitle.textContent;
            
            const showMessages = () => {
                if (messageIndex < messages.length) {
                    subtitle.textContent = '> ' + messages[messageIndex] + '_';
                    messageIndex++;
                    setTimeout(showMessages, 1000);
                } else {
                    setTimeout(() => {
                        subtitle.textContent = originalText;
                    }, 1000);
                }
            };
            
            setTimeout(showMessages, 2000);
        }
    };

    // Magnetic Effect for Interactive Elements
    const addMagneticEffect = () => {
        const magneticElements = document.querySelectorAll('.nav-links a, .floating-btn');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    };

    // Copy to Clipboard with Futuristic Feedback
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
                        // Futuristic copy confirmation
                        const originalHTML = this.innerHTML;
                        this.innerHTML = `
                            <span class="icon" style="color: var(--accent-green); font-size: 2em;">✓</span>
                            <h3 style="color: var(--accent-green);">COPIED TO BUFFER</h3>
                            <p style="color: var(--text-secondary);">${text}</p>
                        `;
                        
                        this.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(0, 245, 255, 0.1))';
                        this.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
                        
                        setTimeout(() => {
                            this.innerHTML = originalHTML;
                            this.style.background = '';
                            this.style.boxShadow = '';
                        }, 2000);
                    });
                });
            }
        });
    };

    // Glitch Effect on Hover
    const addGlitchEffects = () => {
        const glitchElements = document.querySelectorAll('.experience-item h3, .project-item h3');
        glitchElements.forEach(element => {
            element.classList.add('glitch');
            element.setAttribute('data-text', element.textContent);
        });
    };

    // Initialize all effects
    createLoadingScreen();
    setTimeout(() => {
        createParticles();
        addAdvancedTypingEffect();
        addScrollReveal();
        enhanceSkillItems();
        createFloatingButtons();
        addEnhancedHoverEffects();
        addHolographicEffect();
        addMagneticEffect();
        addGlitchEffects();
        createMatrixRain();
        createDataStream();
        createCursorTrail();
        addTerminalEffect();
        
        // Add copy functionality only on contact page
        if (window.location.pathname.includes('contact')) {
            addCopyFunctionality();
        }
    }, 1500);

    // Smooth scrolling for all links
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

    // Performance optimization - Reduce effects on mobile
    if (window.innerWidth < 768) {
        // Disable heavy effects on mobile
        const style = document.createElement('style');
        style.textContent = `
            .particles { display: none; }
            body::before, body::after { animation: none; }
        `;
        document.head.appendChild(style);
    }

    // Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Activate super futuristic mode
            document.body.style.filter = 'hue-rotate(180deg) saturate(2) brightness(1.2)';
            createLightningEffect();
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            konamiCode = [];
        }
    });
});