<template>
  <div class="particle-container">
    <div 
      v-for="particle in particles" 
      :key="particle.id" 
      class="particle" 
      :style="particle.style"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ParticleSystem',
  setup() {
    const particles = ref([])
    let particleInterval

    const initParticleSystem = () => {
      const createSnowflake = () => {
        const size = Math.random() * 4 + 2
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
        }

        particles.value.push(particle)

        setTimeout(() => {
          const index = particles.value.findIndex(p => p.id === particle.id)
          if (index > -1) {
            particles.value.splice(index, 1)
          }
        }, 25000)
      }

      for (let i = 0; i < 60; i++) {
        setTimeout(createSnowflake, i * 100)
      }

      particleInterval = setInterval(createSnowflake, 1500)
    }

    onMounted(() => {
      initParticleSystem()
    })

    onUnmounted(() => {
      if (particleInterval) clearInterval(particleInterval)
    })

    return {
      particles
    }
  }
}
</script>

<style scoped>
.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

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
    transform: translateY(100vh) translateX(50px) rotate(360deg);
    opacity: 0;
  }
}
</style>