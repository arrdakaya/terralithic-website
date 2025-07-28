<template>
  <div class="particle-container">
    <!-- Snow particles -->
    <div 
      v-for="particle in snowParticles" 
      :key="`snow-${particle.id}`" 
      class="particle snow-particle" 
      :style="particle.style"
    ></div>
    
    <!-- Mystical orbs -->
    <div 
      v-for="orb in mysticalOrbs" 
      :key="`orb-${orb.id}`" 
      class="particle mystical-orb" 
      :style="orb.style"
    ></div>
    
    <!-- Floating runes -->
    <div 
      v-for="rune in floatingRunes" 
      :key="`rune-${rune.id}`" 
      class="particle floating-rune" 
      :style="rune.style"
    >
      {{ rune.symbol }}
    </div>
    
    <!-- Energy wisps -->
    <div 
      v-for="wisp in energyWisps" 
      :key="`wisp-${wisp.id}`" 
      class="particle energy-wisp" 
      :style="wisp.style"
    ></div>
    
    <!-- Ambient sparkles -->
    <div 
      v-for="sparkle in ambientSparkles" 
      :key="`sparkle-${sparkle.id}`" 
      class="particle ambient-sparkle" 
      :style="sparkle.style"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ParticleSystem',
  setup() {
    const snowParticles = ref([])
    const mysticalOrbs = ref([])
    const floatingRunes = ref([])
    const energyWisps = ref([])
    const ambientSparkles = ref([])
    
    let intervals = []

    const runeSymbols = ['᚛', '᚜', 'ᚐ', 'ᚑ', 'ᚒ', 'ᚓ', '◊', '◈', '❋', '⟐', '⬟', '◇']

    const createSnowParticle = () => {
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
          boxShadow: '0 0 6px rgba(224, 242, 254, 0.5)',
          filter: `brightness(${0.8 + Math.random() * 0.4})`
        }
      }

      snowParticles.value.push(particle)

      setTimeout(() => {
        const index = snowParticles.value.findIndex(p => p.id === particle.id)
        if (index > -1) {
          snowParticles.value.splice(index, 1)
        }
      }, 25000)
    }

    const createMysticalOrb = () => {
      const size = Math.random() * 8 + 4
      const colors = [
        'rgba(37, 99, 235, 0.6)',
        'rgba(30, 58, 138, 0.6)',
        'rgba(224, 242, 254, 0.4)',
        'rgba(59, 130, 246, 0.5)'
      ]
      
      const orb = {
        id: Date.now() + Math.random(),
        style: {
          position: 'fixed',
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`,
          borderRadius: '50%',
          left: `${Math.random() * window.innerWidth}px`,
          top: `${window.innerHeight + 10}px`,
          pointerEvents: 'none',
          animation: `orb-float ${Math.random() * 20 + 15}s ease-in-out infinite`,
          zIndex: 2,
          boxShadow: `0 0 ${size * 2}px ${colors[Math.floor(Math.random() * colors.length)]}`,
          filter: 'blur(1px)'
        }
      }

      mysticalOrbs.value.push(orb)

      setTimeout(() => {
        const index = mysticalOrbs.value.findIndex(o => o.id === orb.id)
        if (index > -1) {
          mysticalOrbs.value.splice(index, 1)
        }
      }, 35000)
    }

    const createFloatingRune = () => {
      const symbol = runeSymbols[Math.floor(Math.random() * runeSymbols.length)]
      const size = Math.random() * 16 + 12
      
      const rune = {
        id: Date.now() + Math.random(),
        symbol: symbol,
        style: {
          position: 'fixed',
          fontSize: `${size}px`,
          color: 'rgba(37, 99, 235, 0.4)',
          fontFamily: 'Cinzel, serif',
          left: `${Math.random() * window.innerWidth}px`,
          top: `${window.innerHeight + 20}px`,
          pointerEvents: 'none',
          animation: `rune-drift ${Math.random() * 25 + 20}s linear infinite`,
          zIndex: 2,
          textShadow: '0 0 10px rgba(37, 99, 235, 0.6)',
          opacity: Math.random() * 0.6 + 0.2
        }
      }

      floatingRunes.value.push(rune)

      setTimeout(() => {
        const index = floatingRunes.value.findIndex(r => r.id === rune.id)
        if (index > -1) {
          floatingRunes.value.splice(index, 1)
        }
      }, 45000)
    }

    const createEnergyWisp = () => {
      const width = Math.random() * 3 + 1
      const height = Math.random() * 30 + 20
      
      const wisp = {
        id: Date.now() + Math.random(),
        style: {
          position: 'fixed',
          width: `${width}px`,
          height: `${height}px`,
          background: 'linear-gradient(180deg, transparent, rgba(37, 99, 235, 0.6), transparent)',
          borderRadius: '50px',
          left: `${Math.random() * window.innerWidth}px`,
          top: `${window.innerHeight + 10}px`,
          pointerEvents: 'none',
          animation: `wisp-flow ${Math.random() * 12 + 8}s ease-in-out infinite`,
          zIndex: 2,
          boxShadow: '0 0 8px rgba(37, 99, 235, 0.4)',
          filter: 'blur(0.5px)'
        }
      }

      energyWisps.value.push(wisp)

      setTimeout(() => {
        const index = energyWisps.value.findIndex(w => w.id === wisp.id)
        if (index > -1) {
          energyWisps.value.splice(index, 1)
        }
      }, 20000)
    }

    const createAmbientSparkle = () => {
      const size = Math.random() * 2 + 1
      
      const sparkle = {
        id: Date.now() + Math.random(),
        style: {
          position: 'fixed',
          width: `${size}px`,
          height: `${size}px`,
          background: 'rgba(224, 242, 254, 0.8)',
          borderRadius: '50%',
          left: `${Math.random() * window.innerWidth}px`,
          top: `${Math.random() * window.innerHeight}px`,
          pointerEvents: 'none',
          animation: `sparkle-twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
          zIndex: 1,
          boxShadow: '0 0 4px rgba(224, 242, 254, 0.8)'
        }
      }

      ambientSparkles.value.push(sparkle)

      setTimeout(() => {
        const index = ambientSparkles.value.findIndex(s => s.id === sparkle.id)
        if (index > -1) {
          ambientSparkles.value.splice(index, 1)
        }
      }, 5000)
    }

    const initParticleSystem = () => {
      // Initial particles
      for (let i = 0; i < 50; i++) {
        setTimeout(createSnowParticle, i * 100)
      }
      
      for (let i = 0; i < 8; i++) {
        setTimeout(createMysticalOrb, i * 500)
      }
      
      for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingRune, i * 1000)
      }
      
      for (let i = 0; i < 6; i++) {
        setTimeout(createEnergyWisp, i * 800)
      }
      
      for (let i = 0; i < 15; i++) {
        setTimeout(createAmbientSparkle, i * 200)
      }

      // Continuous creation intervals
      intervals.push(setInterval(createSnowParticle, 1200))
      intervals.push(setInterval(createMysticalOrb, 4000))
      intervals.push(setInterval(createFloatingRune, 6000))
      intervals.push(setInterval(createEnergyWisp, 3000))
      intervals.push(setInterval(createAmbientSparkle, 800))
    }

    onMounted(() => {
      initParticleSystem()
    })

    onUnmounted(() => {
      intervals.forEach(interval => clearInterval(interval))
    })

    return {
      snowParticles,
      mysticalOrbs,
      floatingRunes,
      energyWisps,
      ambientSparkles
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
  overflow: hidden;
}

/* Snow Particles */
.snow-particle {
  filter: drop-shadow(0 0 3px rgba(224, 242, 254, 0.6));
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

/* Mystical Orbs */
.mystical-orb {
  filter: blur(1px) brightness(1.2);
  animation-timing-function: ease-in-out;
}

@keyframes orb-float {
  0% {
    transform: translateY(0px) translateX(0px) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  25% {
    transform: translateY(-25vh) translateX(20px) scale(1);
  }
  50% {
    transform: translateY(-50vh) translateX(-15px) scale(1.1);
  }
  75% {
    transform: translateY(-75vh) translateX(25px) scale(0.9);
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) translateX(-10px) scale(0.6);
    opacity: 0;
  }
}

/* Floating Runes */
.floating-rune {
  font-weight: bold;
  user-select: none;
  animation-timing-function: ease-in-out;
}

@keyframes rune-drift {
  0% {
    transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.7);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  20% {
    transform: translateY(-20vh) translateX(30px) rotate(45deg) scale(1);
  }
  40% {
    transform: translateY(-40vh) translateX(-20px) rotate(135deg) scale(0.9);
  }
  60% {
    transform: translateY(-60vh) translateX(25px) rotate(225deg) scale(1.1);
  }
  80% {
    transform: translateY(-80vh) translateX(-15px) rotate(315deg) scale(0.8);
  }
  95% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) translateX(10px) rotate(360deg) scale(0.5);
    opacity: 0;
  }
}

/* Energy Wisps */
.energy-wisp {
  filter: blur(0.5px) brightness(1.3);
  border-radius: 50px;
}

@keyframes wisp-flow {
  0% {
    transform: translateY(0px) translateX(0px) scaleY(0.5);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
    transform: translateY(-10vh) translateX(5px) scaleY(1);
  }
  30% {
    transform: translateY(-30vh) translateX(-20px) scaleY(1.2);
  }
  50% {
    transform: translateY(-50vh) translateX(15px) scaleY(0.8);
  }
  70% {
    transform: translateY(-70vh) translateX(-10px) scaleY(1.1);
  }
  90% {
    opacity: 0.4;
    transform: translateY(-90vh) translateX(5px) scaleY(0.6);
  }
  100% {
    transform: translateY(-100vh) translateX(0px) scaleY(0.3);
    opacity: 0;
  }
}

/* Ambient Sparkles */
.ambient-sparkle {
  filter: brightness(1.5);
}

@keyframes sparkle-twinkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  20% {
    opacity: 0.6;
    transform: scale(0.8) rotate(90deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(180deg);
  }
  80% {
    opacity: 0.8;
    transform: scale(0.9) rotate(270deg);
  }
}

/* Additional particle effects */
@keyframes particle-shimmer {
  0%, 100% {
    filter: brightness(1) hue-rotate(0deg);
  }
  50% {
    filter: brightness(1.3) hue-rotate(10deg);
  }
}

/* Enhanced visual effects */
.mystical-orb:nth-child(odd) {
  animation-delay: 1s;
  filter: blur(1px) brightness(1.2) hue-rotate(15deg);
}

.energy-wisp:nth-child(even) {
  animation-delay: 0.5s;
  filter: blur(0.5px) brightness(1.3) hue-rotate(-10deg);
}

.floating-rune:nth-child(3n) {
  animation-delay: 2s;
  text-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
}

.ambient-sparkle:nth-child(2n) {
  animation-delay: 1.5s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .floating-rune {
    font-size: 10px !important;
  }
  
  .mystical-orb {
    width: 6px !important;
    height: 6px !important;
  }
  
  .energy-wisp {
    width: 1px !important;
    height: 15px !important;
  }
}

/* Performance optimizations */
.particle {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Layer management */
.snow-particle {
  z-index: 1;
}

.mystical-orb {
  z-index: 2;
}

.floating-rune {
  z-index: 2;
}

.energy-wisp {
  z-index: 2;
}

.ambient-sparkle {
  z-index: 1;
}
</style>