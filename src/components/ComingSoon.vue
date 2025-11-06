<template>
  <div
    class="coming-soon-screen"
    :class="{ 'fade-out': isScrolled }"
    @wheel="handleScroll"
    @touchmove="handleScroll"
  >
    <div class="coming-soon-content">
      <div class="title-container">
        <h1 class="coming-soon-title">
          <span class="word word-1">COMING</span>
          <span class="word word-2">SOON</span>
        </h1>
      </div>

      <div class="date-container">
        <div class="date-box">
          <span class="date-number">20</span>
          <span class="date-separator">•</span>
          <span class="date-text">NOVEMBER</span>
          <span class="date-separator">•</span>
          <span class="date-number">2025</span>
        </div>
      </div>

      <div class="steam-link-container">
        <a
          href="https://store.steampowered.com/app/3820880/Rush_Roulette/"
          target="_blank"
          rel="noopener noreferrer"
          class="steam-wishlist-btn"
        >
          <img
            src="https://store.steampowered.com/public/images/v6/logo_steam_footer.png"
            alt="Steam"
            class="steam-logo"
          />
          <span class="btn-text">WISHLIST ON STEAM</span>
        </a>
      </div>

      <div class="scroll-indicator">
        <div class="scroll-arrow">
          <i class="fas fa-chevron-down"></i>
        </div>
        <span class="scroll-text">Scroll to explore</span>
      </div>
    </div>

    <!-- Animated particles -->
    <div class="particle-container">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="particle.style"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ComingSoon',
  emits: ['scrolled'],
  setup(props, { emit }) {
    const isScrolled = ref(false)
    const particles = ref([])
    let particleInterval = null

    const createParticle = () => {
      const particle = {
        id: Date.now() + Math.random(),
        style: {
          left: Math.random() * 100 + '%',
          animationDuration: (Math.random() * 3 + 2) + 's',
          animationDelay: Math.random() * 2 + 's',
          opacity: Math.random() * 0.5 + 0.3
        }
      }

      particles.value.push(particle)

      setTimeout(() => {
        const index = particles.value.findIndex(p => p.id === particle.id)
        if (index > -1) {
          particles.value.splice(index, 1)
        }
      }, 5000)
    }

    const handleScroll = (e) => {
      if (!isScrolled.value) {
        e.preventDefault()
        isScrolled.value = true

        setTimeout(() => {
          emit('scrolled')
        }, 400)
      }
    }

    onMounted(() => {
      // Create initial particles
      for (let i = 0; i < 15; i++) {
        setTimeout(() => createParticle(), i * 200)
      }

      // Keep creating particles
      particleInterval = setInterval(createParticle, 500)

      // Prevent scroll on body
      document.body.style.overflow = 'hidden'
    })

    onUnmounted(() => {
      if (particleInterval) {
        clearInterval(particleInterval)
      }
      document.body.style.overflow = ''
    })

    return {
      isScrolled,
      particles,
      handleScroll
    }
  }
}
</script>

<style scoped>
.coming-soon-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.coming-soon-screen::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0;
  transition: opacity 0.4s ease-out;
  pointer-events: none;
  z-index: 10;
}

.coming-soon-screen.fade-out {
  pointer-events: none;
}

.coming-soon-screen.fade-out::after {
  opacity: 1;
}

.coming-soon-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.title-container {
  margin-bottom: 3rem;
  overflow: hidden;
}

.coming-soon-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
               0 0 40px rgba(0, 180, 255, 0.3),
               0 0 60px rgba(0, 180, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.word {
  display: inline-block;
  opacity: 0;
  transform: translateY(100px);
}

.word-1 {
  animation: slideUp 1s ease-out 0.3s forwards;
}

.word-2 {
  animation: slideUp 1s ease-out 0.6s forwards;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.date-container {
  margin-bottom: 4rem;
  opacity: 0;
  animation: fadeIn 1s ease-out 1.2s forwards;
}

.date-box {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(0, 180, 255, 0.3);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 180, 255, 0.2),
              inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.date-number {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #00b4ff;
  text-shadow: 0 0 20px rgba(0, 180, 255, 0.6);
}

.date-text {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.2em;
}

.date-separator {
  color: rgba(0, 180, 255, 0.6);
  font-size: 2rem;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.steam-link-container {
  margin-bottom: 3rem;
  opacity: 0;
  animation: fadeIn 1s ease-out 1.5s forwards;
}

.steam-wishlist-btn {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 3rem;
  background: linear-gradient(135deg, rgba(0, 180, 255, 0.2), rgba(0, 120, 255, 0.3));
  border: 2px solid #00b4ff;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 180, 255, 0.3),
              inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.steam-wishlist-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.steam-wishlist-btn:hover::before {
  left: 100%;
}

.steam-wishlist-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 180, 255, 0.5),
              inset 0 1px 1px rgba(255, 255, 255, 0.2);
  border-color: #00d4ff;
}

.steam-logo {
  height: 30px;
  width: auto;
  filter: brightness(1.2);
}

.btn-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.15em;
  text-shadow: 0 0 10px rgba(0, 180, 255, 0.5);
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  animation: fadeInBounce 1s ease-out 1.8s forwards;
}

@keyframes fadeInBounce {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-arrow {
  width: 50px;
  height: 50px;
  border: 2px solid rgba(0, 180, 255, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 2s infinite;
}

.scroll-arrow i {
  color: #00b4ff;
  font-size: 1.5rem;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

.scroll-text {
  font-family: 'Orbitron', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  bottom: -10px;
  width: 3px;
  height: 3px;
  background: #00b4ff;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 180, 255, 0.8);
  animation: floatUp linear forwards;
}

@keyframes floatUp {
  0% {
    bottom: -10px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    bottom: 110vh;
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .date-box {
    padding: 1rem 2rem;
    gap: 0.5rem;
  }

  .coming-soon-title {
    gap: 0.2rem;
  }

  .steam-wishlist-btn {
    padding: 1rem 2rem;
    gap: 0.8rem;
  }

  .steam-logo {
    height: 25px;
  }

  .btn-text {
    font-size: 1rem;
  }
}
</style>
