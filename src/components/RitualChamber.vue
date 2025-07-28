<template>
  <div class="ritual-chamber enhanced-chamber">
    <!-- Energy Streams -->
    <div class="energy-streams">
      <div v-for="stream in energyStreams" :key="stream.id"
           class="energy-stream" :style="stream.style"></div>
    </div>

    <!-- Mystical Floor Pattern -->
    <div class="chamber-floor enhanced-floor">
      <div class="floor-pattern">
        <div class="pattern-ring ring-1"></div>
        <div class="pattern-ring ring-2"></div>
        <div class="pattern-ring ring-3"></div>
      </div>
      
      <div class="rune-circle enhanced-runes">
        <div class="rune rune-1 animated-rune">᚛</div>
        <div class="rune rune-2 animated-rune">᚜</div>
        <div class="rune rune-3 animated-rune">ᚐ</div>
        <div class="rune rune-4 animated-rune">ᚑ</div>
        <div class="rune rune-5 animated-rune">ᚒ</div>
        <div class="rune rune-6 animated-rune">ᚓ</div>
      </div>
      
      <!-- Pulsing Energy Lines -->
      <div class="energy-lines">
        <div v-for="line in energyLines" :key="line.id"
             class="energy-line" :style="line.style"></div>
      </div>
    </div>

    <!-- Enhanced Players Circle -->
    <div class="players-circle enhanced-players">
      <div v-for="(player, index) in players" :key="index"
           :class="['player', `player-${index + 1}`, { 
             chosen: chosenPlayer === index,
             rotating: isSelecting 
           }]">
        <div class="player-aura" :class="{ active: chosenPlayer === index }"></div>
        <img :src="chosenPlayer === index ? '/characters/hunterHead.png' : playerImages[index]"
             :alt="`Player ${index + 1}`" class="player-heads enhanced-head" />
        <div v-if="chosenPlayer === index" class="crimson-light enhanced-crimson">
          <div class="crimson-particles">
            <div v-for="particle in crimsonParticles" :key="particle.id"
                 class="crimson-particle" :style="particle.style"></div>
          </div>
        </div>
        <div class="player-connection" :class="{ active: chosenPlayer === index }"></div>
      </div>
    </div>

    <!-- Enhanced Central Artifact -->
    <div class="central-artifact enhanced-artifact">
      <div class="artifact-base">
        <div class="base-glow"></div>
        <div class="rotating-symbols">
          <div class="symbol-ring outer-ring">
            <span v-for="symbol in outerSymbols" :key="symbol" class="floating-symbol">{{ symbol }}</span>
          </div>
          <div class="symbol-ring inner-ring">
            <span v-for="symbol in innerSymbols" :key="symbol" class="floating-symbol">{{ symbol }}</span>
          </div>
        </div>
      </div>
      
      <div class="floating-mask enhanced-mask">
        <img src="/characters/MonsterHead.png" alt="Monster" class="monster-head">
        <div class="mask-glow" :class="{ active: isSelecting }"></div>
        <div class="mask-energy" :class="{ pulsing: isSelecting }"></div>
        
        <!-- Power Orbs around the mask -->
        <div class="power-orbs">
          <div v-for="orb in powerOrbs" :key="orb.id"
               class="power-orb" :style="orb.style"></div>
        </div>
      </div>
    </div>

    <!-- Ritual Effects -->
    <div class="ritual-effects">
      <div v-if="isSelecting" class="selection-wave"></div>
      <div class="ambient-sparkles">
        <div v-for="sparkle in ambientSparkles" :key="sparkle.id"
             class="sparkle" :style="sparkle.style"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

export default {
  name: 'RitualChamber',
  setup() {
    const chosenPlayer = ref(2)
    const playerImages = [
      '/characters/JaneHead.png',
      '/characters/JenniferHead.png',
      '/characters/JakeHead.png',
      '/characters/LavukHead.png'
    ]
    const maskRotation = ref(0)
    const isSelecting = ref(false)
    
    // Enhanced visual elements
    const energyStreams = ref([])
    const energyLines = ref([])
    const crimsonParticles = ref([])
    const powerOrbs = ref([])
    const ambientSparkles = ref([])
    
    const outerSymbols = ['◊', '◈', '❋', '⟐', '⬟', '◇']
    const innerSymbols = ['᚛', '᚜', 'ᚐ', 'ᚑ', 'ᚒ', 'ᚓ']

    const players = reactive([
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
    ])

    let selectionInterval
    let effectIntervals = []

    const initEnergyStreams = () => {
      for (let i = 0; i < 6; i++) {
        const stream = {
          id: i,
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '2px',
            height: '150px',
            background: 'linear-gradient(180deg, transparent, var(--ice-blue), transparent)',
            transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
            animation: `energy-flow ${3 + Math.random() * 2}s infinite`,
            animationDelay: `${i * 0.5}s`
          }
        }
        energyStreams.value.push(stream)
      }
    }

    const initEnergyLines = () => {
      for (let i = 0; i < 12; i++) {
        const line = {
          id: i,
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--ice-blue), transparent)',
            transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
            animation: `line-pulse ${2 + Math.random()}s infinite`,
            animationDelay: `${i * 0.2}s`
          }
        }
        energyLines.value.push(line)
      }
    }

    const initPowerOrbs = () => {
      for (let i = 0; i < 4; i++) {
        const angle = i * 90
        const radius = 60
        const x = Math.cos(angle * Math.PI / 180) * radius
        const y = Math.sin(angle * Math.PI / 180) * radius
        
        const orb = {
          id: i,
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '8px',
            height: '8px',
            background: 'var(--ice-blue)',
            borderRadius: '50%',
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            boxShadow: '0 0 15px var(--ice-blue)',
            animation: `orb-orbit ${4 + i}s infinite linear`
          }
        }
        powerOrbs.value.push(orb)
      }
    }

    const createCrimsonParticles = () => {
      crimsonParticles.value = []
      for (let i = 0; i < 15; i++) {
        const particle = {
          id: i,
          style: {
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: '#DC2626',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `crimson-float ${2 + Math.random() * 2}s infinite`,
            animationDelay: `${Math.random() * 2}s`
          }
        }
        crimsonParticles.value.push(particle)
      }
    }

    const createAmbientSparkles = () => {
      const createSparkle = () => {
        const sparkle = {
          id: Date.now() + Math.random(),
          style: {
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: 'var(--frost-white)',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `sparkle-twinkle ${1 + Math.random() * 2}s infinite`,
            boxShadow: '0 0 4px var(--frost-white)'
          }
        }
        
        ambientSparkles.value.push(sparkle)
        
        setTimeout(() => {
          const index = ambientSparkles.value.findIndex(s => s.id === sparkle.id)
          if (index > -1) {
            ambientSparkles.value.splice(index, 1)
          }
        }, 3000)
      }
      
      // Create initial sparkles
      for (let i = 0; i < 8; i++) {
        setTimeout(createSparkle, i * 200)
      }
      
      // Continue creating sparkles
      const sparkleInterval = setInterval(createSparkle, 800)
      effectIntervals.push(sparkleInterval)
    }

    const startRitualSelection = () => {
      selectionInterval = setInterval(() => {
        isSelecting.value = true

        setTimeout(() => {
          const newChosen = Math.floor(Math.random() * 4)
          chosenPlayer.value = newChosen
          maskRotation.value = newChosen * 90

          createRitualEffect()
          createCrimsonParticles()

          setTimeout(() => {
            isSelecting.value = false
          }, 1000)
        }, 500)
      }, 8000)
    }

    const createRitualEffect = () => {
      const chamber = document.querySelector('.ritual-chamber')
      if (!chamber) return

      // Multiple expanding rings
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const effect = document.createElement('div')
          effect.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            border: 2px solid rgba(37, 99, 235, ${0.8 - i * 0.2});
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ritual-wave 2s ease-out forwards;
            pointer-events: none;
            z-index: 5;
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
          `

          chamber.appendChild(effect)
          setTimeout(() => effect.remove(), 2000)
        }, i * 300)
      }
    }

    onMounted(() => {
      initEnergyStreams()
      initEnergyLines()
      initPowerOrbs()
      createCrimsonParticles()
      createAmbientSparkles()
      startRitualSelection()
    })

    onUnmounted(() => {
      if (selectionInterval) clearInterval(selectionInterval)
      effectIntervals.forEach(interval => clearInterval(interval))
    })

    return {
      players,
      chosenPlayer,
      playerImages,
      maskRotation,
      isSelecting,
      energyStreams,
      energyLines,
      crimsonParticles,
      powerOrbs,
      ambientSparkles,
      outerSymbols,
      innerSymbols
    }
  }
}
</script>

<style scoped>
/* Enhanced Ritual Chamber Styles */
.enhanced-chamber {
  position: relative;
  width: 600px;
  height: 600px;
}

/* Energy Streams */
.energy-streams {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

@keyframes energy-flow {
  0%, 100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) rotate(var(--rotation)) scaleY(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--rotation)) scaleY(1.2);
  }
}

/* Enhanced Floor Pattern */
.enhanced-floor {
  position: relative;
  z-index: 1;
}

.floor-pattern {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
}

.pattern-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.ring-1 {
  width: 150px;
  height: 150px;
  animation: ring-rotate 20s infinite linear;
}

.ring-2 {
  width: 250px;
  height: 250px;
  animation: ring-rotate 30s infinite linear reverse;
}

.ring-3 {
  width: 350px;
  height: 350px;
  animation: ring-rotate 40s infinite linear;
}

@keyframes ring-rotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Enhanced Runes */
.enhanced-runes {
  position: relative;
  z-index: 3;
}

.animated-rune {
  animation: rune-pulse 4s infinite;
  text-shadow: 0 0 15px var(--ice-blue);
  transition: all 0.3s ease;
}

.animated-rune:hover {
  transform: scale(1.3);
  text-shadow: 0 0 25px var(--ice-blue);
}

@keyframes rune-pulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* Energy Lines */
.energy-lines {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
}

@keyframes line-pulse {
  0%, 100% {
    opacity: 0.2;
    transform: translate(-50%, -50%) rotate(var(--rotation)) scaleX(0.5);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) rotate(var(--rotation)) scaleX(1);
  }
}

/* Enhanced Players */
.enhanced-players {
  position: relative;
  z-index: 4;
}

.player {
  position: relative;
  transition: all 0.5s ease;
}

.player.rotating {
  animation: player-selection 1s ease-in-out;
}

@keyframes player-selection {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(5deg); }
}

.player-aura {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, transparent 40%, rgba(37, 99, 235, 0.1) 100%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.player-aura.active {
  opacity: 1;
  animation: aura-pulse 2s infinite;
}

@keyframes aura-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0.4;
  }
}

.enhanced-head {
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
}

.player.chosen .enhanced-head {
  box-shadow: 0 0 30px #DC2626;
  filter: drop-shadow(0 0 10px #DC2626);
}

.enhanced-crimson {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%);
  animation: crimson-pulse 1.5s infinite;
}

@keyframes crimson-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
}

.crimson-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

@keyframes crimson-float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
    opacity: 1;
  }
}

.player-connection {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 100px;
  background: linear-gradient(180deg, transparent, var(--ice-blue), transparent);
  transform: translate(-50%, -50%) rotate(var(--angle, 0deg));
  opacity: 0;
  transition: opacity 0.5s ease;
}

.player-connection.active {
  opacity: 1;
  animation: connection-pulse 2s infinite;
}

@keyframes connection-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Enhanced Artifact */
.enhanced-artifact {
  position: relative;
  z-index: 5;
}

.artifact-base {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
}

.base-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: base-breathe 4s infinite;
}

@keyframes base-breathe {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
}

.rotating-symbols {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.symbol-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.outer-ring {
  width: 180px;
  height: 180px;
  animation: symbol-rotate 25s infinite linear;
}

.inner-ring {
  width: 120px;
  height: 120px;
  animation: symbol-rotate 20s infinite linear reverse;
}

@keyframes symbol-rotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.floating-symbol {
  position: absolute;
  color: var(--ice-blue);
  font-size: 16px;
  text-shadow: 0 0 10px var(--ice-blue);
  animation: symbol-float 3s infinite;
}

.floating-symbol:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
.floating-symbol:nth-child(2) { top: 50%; right: 0; transform: translateY(-50%); }
.floating-symbol:nth-child(3) { bottom: 0; left: 50%; transform: translateX(-50%); }
.floating-symbol:nth-child(4) { top: 50%; left: 0; transform: translateY(-50%); }
.floating-symbol:nth-child(5) { top: 25%; right: 25%; }
.floating-symbol:nth-child(6) { bottom: 25%; left: 25%; }

@keyframes symbol-float {
  0%, 100% {
    opacity: 0.6;
    transform: translateY(0px) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateY(-5px) scale(1.1);
  }
}

.enhanced-mask {
  position: relative;
  z-index: 6;
}

.mask-energy {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  border: 2px solid transparent;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.5s ease;
}

.mask-energy.pulsing {
  opacity: 1;
  border-color: var(--ice-blue);
  box-shadow: 0 0 30px var(--ice-blue);
  animation: mask-energy-pulse 1s infinite;
}

@keyframes mask-energy-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.power-orbs {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
}

@keyframes orb-orbit {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg);
  }
}

/* Ritual Effects */
.ritual-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 7;
}

.selection-wave {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  border: 3px solid var(--ice-blue);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: selection-expand 1.5s ease-out;
}

@keyframes selection-expand {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(6);
    opacity: 0;
  }
}

.ambient-sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@keyframes sparkle-twinkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}

@keyframes ritual-wave {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
}

.mask-glow.active {
  opacity: 0.8 !important;
  transform: scale(1.5) !important;
  animation: mask-active-glow 1s infinite;
}

@keyframes mask-active-glow {
  0%, 100% {
    box-shadow: 0 0 20px var(--ice-blue);
  }
  50% {
    box-shadow: 0 0 40px var(--ice-blue), 0 0 60px var(--ice-blue);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .enhanced-chamber {
    width: 400px;
    height: 400px;
  }
  
  .floor-pattern {
    width: 350px;
    height: 350px;
  }
  
  .ring-1 { width: 100px; height: 100px; }
  .ring-2 { width: 180px; height: 180px; }
  .ring-3 { width: 250px; height: 250px; }
  
  .rotating-symbols {
    width: 150px;
    height: 150px;
  }
  
  .outer-ring {
    width: 130px;
    height: 130px;
  }
  
  .inner-ring {
    width: 90px;
    height: 90px;
  }
  
  .floating-symbol {
    font-size: 12px;
  }
}
</style>