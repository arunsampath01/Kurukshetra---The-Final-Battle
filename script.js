/**
 * KURUKSHETRA — THE CHAKRAVYUHA
 * Cinematic Game Introduction & Prologue Experience
 * Vanilla JavaScript & GSAP ScrollTriggers (English Only)
 */

(function () {
    'use strict';

    // State & Preferences
    const state = {
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        mousePos: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        targetMousePos: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    };

    // DOM Elements
    const ambientCanvas = document.getElementById('ambient-canvas');
    const primaryPlayBtn = document.getElementById('primaryPlayBtn');
    const titleChakraBg = document.getElementById('titleChakraBg');

    // =========================================================================
    // 1. AMBIENT PARTICLES (Drifting Battlefield Dust & Embers)
    // =========================================================================
    function initAmbientParticles() {
        if (!ambientCanvas || state.reducedMotion) return;

        const ctx = ambientCanvas.getContext('2d');
        let width = (ambientCanvas.width = window.innerWidth);
        let height = (ambientCanvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = ambientCanvas.width = window.innerWidth;
            height = ambientCanvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            state.targetMousePos.x = e.clientX;
            state.targetMousePos.y = e.clientY;
        });

        const particleCount = window.innerWidth < 768 ? 30 : 65;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2.2 + 0.6,
                baseAlpha: Math.random() * 0.5 + 0.2,
                alpha: 0.4,
                speedY: -(Math.random() * 0.5 + 0.2),
                speedX: (Math.random() - 0.5) * 0.35,
                flickerSpeed: Math.random() * 0.03 + 0.01,
                flickerOffset: Math.random() * Math.PI * 2,
                isEmber: Math.random() > 0.45
            });
        }

        let animationFrameId;

        function renderParticles() {
            ctx.clearRect(0, 0, width, height);

            state.mousePos.x += (state.targetMousePos.x - state.mousePos.x) * 0.05;
            state.mousePos.y += (state.targetMousePos.y - state.mousePos.y) * 0.05;
            const mouseOffsetX = (state.mousePos.x / width - 0.5) * 15;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.y += p.speedY;
                p.x += p.speedX + mouseOffsetX * 0.02;

                p.flickerOffset += p.flickerSpeed;
                p.alpha = p.baseAlpha + Math.sin(p.flickerOffset) * 0.2;
                p.alpha = Math.max(0.1, Math.min(0.85, p.alpha));

                if (p.y < -10) {
                    p.y = height + 10;
                    p.x = Math.random() * width;
                }
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

                if (p.isEmber) {
                    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
                    grad.addColorStop(0, `rgba(255, 235, 175, ${p.alpha})`);
                    grad.addColorStop(0.6, `rgba(227, 188, 115, ${p.alpha * 0.6})`);
                    grad.addColorStop(1, 'rgba(142, 48, 33, 0)');
                    ctx.fillStyle = grad;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'rgba(227, 188, 115, 0.7)';
                } else {
                    ctx.fillStyle = `rgba(156, 141, 121, ${p.alpha * 0.35})`;
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(renderParticles);
        }

        renderParticles();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
            } else {
                renderParticles();
            }
        });
    }

    // =========================================================================
    // 2. SOLE INTERACTIVE BUTTON VISUAL FEEDBACK
    // =========================================================================
    function initSoleButton() {
        if (!primaryPlayBtn) return;

        primaryPlayBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Trigger brief ceremonial visual response
            primaryPlayBtn.style.transform = 'scale(0.97)';
            primaryPlayBtn.style.boxShadow = '0 0 70px rgba(227, 188, 115, 0.9), inset 0 0 30px rgba(255, 242, 199, 0.6)';

            setTimeout(() => {
                primaryPlayBtn.style.transform = '';
                primaryPlayBtn.style.boxShadow = '';

                window.location.href = './game/index.html';
            }, 300);
        });
    }

    // =========================================================================
    // 3. CINEMATIC SCROLL REVEALS & GSAP ENHANCEMENTS
    // =========================================================================
    function initCinematicScroll() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || state.reducedMotion) return;

        gsap.registerPlugin(ScrollTrigger);

        // Act I: Opening Inscriptions Reveal
        gsap.from('.monumental-heading-glory', {
            opacity: 0,
            y: 40,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.3
        });

        gsap.from('.cinematic-proclamation, .cinematic-intro-narrative', {
            opacity: 0,
            y: 25,
            stagger: 0.2,
            duration: 1.3,
            ease: 'power2.out',
            delay: 0.8
        });

        // Act II: Formation Media & Narrative Beats
        gsap.from('.formation-media-box', {
            scrollTrigger: {
                trigger: '.act-chakravyuha',
                start: 'top 75%'
            },
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.utils.toArray('.narrative-beat-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%'
                },
                opacity: 0,
                y: 35,
                duration: 0.9,
                delay: index * 0.12,
                ease: 'power2.out'
            });
        });

        // Act III: Dialogue Subtitles Sequential Reveal
        gsap.from('.dialogue-visual-frame', {
            scrollTrigger: {
                trigger: '.act-promise',
                start: 'top 75%'
            },
            opacity: 0,
            x: -40,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.utils.toArray('.dialogue-block').forEach((block, index) => {
            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: 'top 85%'
                },
                opacity: 0,
                x: 35,
                duration: 1,
                delay: index * 0.15,
                ease: 'power2.out'
            });
        });

        // Act IV: Seventh Circle Composition
        gsap.from('.seventh-circle-image-box', {
            scrollTrigger: {
                trigger: '.act-seventh-circle',
                start: 'top 75%'
            },
            opacity: 0,
            scale: 0.96,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.utils.toArray('.tragedy-beat-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                },
                opacity: 0,
                y: 25,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });

        // Act V: Rewrite Fate Dramatic Reveal
        gsap.from('.fate-line-upper', {
            scrollTrigger: {
                trigger: '.act-rewrite-fate',
                start: 'top 75%'
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        });

        gsap.from('.fate-line-lower', {
            scrollTrigger: {
                trigger: '.act-rewrite-fate',
                start: 'top 68%'
            },
            opacity: 0,
            scale: 0.92,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.from('.mission-stone-border', {
            scrollTrigger: {
                trigger: '.mission-briefing-panel',
                start: 'top 80%'
            },
            opacity: 0,
            y: 40,
            duration: 1.1,
            ease: 'power2.out'
        });

        // Act VI: Rules Tablet & Keycaps
        gsap.from('.rules-stone-tablet', {
            scrollTrigger: {
                trigger: '.act-rules',
                start: 'top 75%'
            },
            opacity: 0,
            y: 40,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.utils.toArray('.keycap').forEach((key, index) => {
            gsap.from(key, {
                scrollTrigger: {
                    trigger: '.keyboard-layout',
                    start: 'top 85%'
                },
                opacity: 0,
                scale: 0.8,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'back.out(1.7)'
            });
        });

        // Final Screen: Grand Title & Sole Button
        gsap.from('.grand-game-title span', {
            scrollTrigger: {
                trigger: '.act-final-title',
                start: 'top 65%'
            },
            opacity: 0,
            y: 40,
            stagger: 0.04,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.from('.sole-button-wrapper', {
            scrollTrigger: {
                trigger: '.act-final-title',
                start: 'top 60%'
            },
            opacity: 0,
            scale: 0.9,
            duration: 1.3,
            ease: 'power2.out'
        });

        // Subtle Parallax on Final Chakravyuha Background
        window.addEventListener('mousemove', (e) => {
            if (!titleChakraBg) return;
            const xPercent = (e.clientX / window.innerWidth - 0.5) * 15;
            const yPercent = (e.clientY / window.innerHeight - 0.5) * 15;
            titleChakraBg.style.transform = `translate(calc(-50% + ${xPercent}px), calc(-50% + ${yPercent}px))`;
        });

        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    }

    // Initialization
    document.addEventListener('DOMContentLoaded', () => {
        initAmbientParticles();
        initSoleButton();
        initCinematicScroll();
    });
})();
