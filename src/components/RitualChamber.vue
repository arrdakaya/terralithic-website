<template>
  <div class="ritual-chamber">
    <div class="chamber-floor">
      <div class="rune-circle">
        <div class="rune rune-1">᚛</div>
        <div class="rune rune-2">᚜</div>
        <div class="rune rune-3">ᚐ</div>
        <div class="rune rune-4">ᚑ</div>
        <div class="rune rune-5">ᚒ</div>
        <div class="rune rune-6">ᚓ</div>
      </div>
    </div>

    <div class="players-circle">
      <div v-for="(player, index) in players" :key="index"
           :class="['player', `player-${index + 1}`, { chosen: chosenPlayer === index }]">
        <img :src="chosenPlayer === index ? '/characters/hunterHead.png' : playerImages[index]"
             :alt="`Player ${index + 1}`" class="player-heads" />
        <div v-if="chosenPlayer === index" class="crimson-light"></div>
      </div>
    </div>

    <div class="central-artifact">
      <div class="floating-mask">
        <img src="/characters/MonsterHead.png" alt="Monster" class="monster-head">
        <div class="mask-glow" :class="{ active: isSelecting }"></div>
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

    const players = reactive([
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
    ])

    let selectionInterval

    const startRitualSelection = () => {
      selectionInterval = setInterval(() => {
        isSelecting.value = true

        setTimeout(() => {
          const newChosen = Math.floor(Math.random() * 4)
          chosenPlayer.value = newChosen
          maskRotation.value = newChosen * 90

          createRitualEffect()

          setTimeout(() => {
            isSelecting.value = false
          }, 1000)
        }, 500)
      }, 8000)
    }

    const createRitualEffect = () => {
      const chamber = document.querySelector('.ritual-chamber')
      if (!chamber) return

      const effect = document.createElement('div')
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
      `

      chamber.appendChild(effect)
      setTimeout(() => effect.remove(), 2000)
    }

    onMounted(() => {
      startRitualSelection()
    })

    onUnmounted(() => {
      if (selectionInterval) clearInterval(selectionInterval)
    })

    return {
      players,
      chosenPlayer,
      playerImages,
      maskRotation,
      isSelecting
    }
  }
}
</script>

<style scoped>
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

.mask-glow.active {
  opacity: 0.8 !important;
  transform: scale(1.5) !important;
}
</style>