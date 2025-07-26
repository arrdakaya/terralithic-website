const { createApp, ref, reactive, onMounted, onUnmounted } = Vue;

createApp({
    setup() {
        const particles = ref([]);
        const chosenPlayer = ref(2);
        const playerImages = [
            'characters/JaneHead.png',
            'characters/JenniferHead.png',
            'characters/JakeHead.png',
            'characters/LavukHead.png'
        ];
        const maskRotation = ref(0);
        const isSelecting = ref(false);
        const showModal = ref(false);
        const selectedRole = ref('');
        const applicationSubmitted = ref(false);

        const players = reactive([
            { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
        ]);

        const jobs = reactive([
            {
                role: 'developer',
                symbol: '⚔',
                title: 'Battle-Tested Developer',
                tagline: 'Forge the mechanics of fear',
                backTitle: 'Code Warlock',
                skills: ['Unity/Unreal expertise', 'Network programming', 'Horror game mechanics'],
                isFlipped: false
            },
            {
                role: 'artist',
                symbol: '🎭',
                title: 'Visual Conjurer',
                tagline: 'Paint shadows and light',
                backTitle: 'Shadow Artist',
                skills: ['3D modeling & texturing', 'Atmospheric design', 'Horror aesthetics'],
                isFlipped: false
            },
            {
                role: 'designer',
                symbol: '🔮',
                title: 'Experience Architect',
                tagline: 'Design paths through terror',
                backTitle: 'Fear Designer',
                skills: ['Level design mastery', 'Player psychology', 'Multiplayer balance'],
                isFlipped: false
            }
        ]);

        const applicationForm = reactive({
            email: '',
            message: ''
        });

        let selectionInterval;
        let particleInterval;

        const initParticleSystem = () => {
            const createSnowflake = () => {
                const size = Math.random() * 4 + 2;
                const particle = {
                    id: Date.now() + Math.random(),
                    style: {
                        position: 'fixed',
                        width: `${size}px`,
                        height: `${size}px`,
                        background: 'radial-gradient(circle, rgba(224, 242, 254, 0.9) 0%, rgba(37, 99, 235, 0.3) 70%)',
                        borderRadius: '50%',
                        left: `${Math.random() * window.innerWidth}px`,
                        top: '-10px',
                        pointerEvents: 'none',
                        animation: `snow-fall ${Math.random() * 15 + 10}s linear infinite`,
                        zIndex: 1,
                        boxShadow: '0 0 6px rgba(224, 242, 254, 0.5)'
                    }
                };

                particles.value.push(particle);

                setTimeout(() => {
                    const index = particles.value.findIndex(p => p.id === particle.id);
                    if (index > -1) {
                        particles.value.splice(index, 1);
                    }
                }, 25000);
            };

            for (let i = 0; i < 60; i++) {
                setTimeout(createSnowflake, i * 100);
            }

            particleInterval = setInterval(createSnowflake, 1500);
        };

        const startRitualSelection = () => {
            selectionInterval = setInterval(() => {
                isSelecting.value = true;

                setTimeout(() => {
                    const newChosen = Math.floor(Math.random() * 4);
                    chosenPlayer.value = newChosen;
                    maskRotation.value = newChosen * 90;

                    createRitualEffect();

                    setTimeout(() => {
                        isSelecting.value = false;
                    }, 1000);
                }, 500);
            }, 8000);
        };

        const createRitualEffect = () => {
            const chamber = document.querySelector('.ritual-chamber');
            if (!chamber) return;

            const effect = document.createElement('div');
            effect.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 200px;
                height: 200px;
                border: 2px solid rgba(37, 99, 235, 0.7);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ritual-wave 2s ease-out forwards;
                pointer-events: none;
                z-index: 5;
                box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
            `;

            chamber.appendChild(effect);
            setTimeout(() => effect.remove(), 2000);
        };

        const scrollToSection = (sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        };

        const enterRitual = () => {
            createRitualEffect();
            window.open('https://store.steampowered.com/app/3820880/Rush_Roulette/', '_blank');

        };

        const watchTrailer = () => {
            alert('Trailer will be revealed when the stars align... Soon.');
        };

        const showApplicationModal = (role) => {
            selectedRole.value = role;
            showModal.value = true;
            applicationSubmitted.value = false;
            applicationForm.email = '';
            applicationForm.message = '';
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const submitApplication = () => {
            if (applicationForm.email && applicationForm.message) {
                applicationSubmitted.value = true;
                console.log('Application submitted:', {
                    role: selectedRole.value,
                    email: applicationForm.email,
                    message: applicationForm.message
                });
            }
        };

        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;

            const ritualChamber = document.querySelector('.ritual-chamber');
            if (ritualChamber) {
                ritualChamber.style.transform = `translate(-50%, -50%) translateY(${parallax}px)`;
            }
        };

        const observeElements = () => {
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

            setTimeout(() => {
                const sections = document.querySelectorAll('.glass-panel, .artifact-card, .job-card');
                sections.forEach(section => {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(30px)';
                    section.style.transition = 'all 0.8s ease';
                    observer.observe(section);
                });
            }, 100);
        };

        onMounted(() => {
            initParticleSystem();
            startRitualSelection();
            observeElements();
            window.addEventListener('scroll', handleScroll);

            const style = document.createElement('style');
            style.textContent = `
                @keyframes snow-fall {
                    0% {
                        transform: translateY(-10px) translateX(0px) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                        opacity: 0;
                    }
                }
                
                @keyframes ritual-wave {
                    0% {
                        transform: translate(-50%, -50%) scale(0.5);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(3);
                        opacity: 0;
                    }
                }
                
                .eye.glowing {
                    box-shadow: 0 0 20px var(--crimson-threat), 0 0 30px var(--crimson-threat) !important;
                }
                
                .mask-glow.active {
                    opacity: 0.8 !important;
                    transform: scale(1.5) !important;
                }
                
                .job-card.flipped .card-front {
                    transform: rotateY(180deg);
                }
                
                .job-card.flipped .card-back {
                    transform: rotateY(0deg);
                }
                
                .application-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(10, 10, 10, 0.9);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    animation: modal-fade-in 0.3s ease;
                }
                
                .modal-content {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 3rem;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    color: #D6B85A;
                }
                
                .modal-content h3 {
                    margin-bottom: 1rem;
                    color: #2563EB;
                }
                
                .modal-content p {
                    margin-bottom: 2rem;
                    color: #94A3B8;
                }
                
                .form-group {
                    margin-bottom: 2rem;
                }
                
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    color: #D6B85A;
                    margin-bottom: 1rem;
                    font-family: 'Orbitron', monospace;
                }
                
                .form-group textarea {
                    height: 100px;
                    resize: vertical;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }
                
                .submit-application {
                    background: linear-gradient(45deg, #2563EB, #1E3A8A);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    text-transform: uppercase;
                    font-family: 'Orbitron', monospace;
                }
                
                .close-modal {
                    background: transparent;
                    color: #E0F2FE;
                    border: 2px solid #E0F2FE;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    text-transform: uppercase;
                    font-family: 'Orbitron', monospace;
                }
                
                @keyframes modal-fade-in {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        });

        onUnmounted(() => {
            if (selectionInterval) clearInterval(selectionInterval);
            if (particleInterval) clearInterval(particleInterval);
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            particles,
            players,
            chosenPlayer,
            playerImages,
            maskRotation,
            isSelecting,
            jobs,
            showModal,
            selectedRole,
            applicationSubmitted,
            applicationForm,
            scrollToSection,
            enterRitual,
            watchTrailer,
            showApplicationModal,
            closeModal,
            submitApplication
        };
    }
}).mount('#app');