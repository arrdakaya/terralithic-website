<template>
  <main>
    <section id="hero" class="hero-section">
      <RitualChamber />
      
      <div class="hero-content">
        <div class="glass-panel hero-panel">
          <h1 class="game-title">
            <span class="title-main">RUSH</span>
            <span class="title-sub">ROULETTE</span>
          </h1>
          <div class="hero-actions">
            <button class="btn-primary" @click="enterRitual">Wishlist Now!</button>
          </div>
        </div>
      </div>
    </section>

    <section id="trailer" class="lore-section">
      <div class="lore-trailer">
        <h3>Uncover the Origins</h3>
        <video class="trailer-video" 
               src="/RushRouletteTrailer.mp4" 
               controls 
               autoplay 
               muted 
               playsinline>
          Your browser does not support the video tag.
        </video>
      </div>
    </section>

    <section id="game" class="game-section">
      <div class="section-content">
        <div class="glass-panel content-panel">
          <h2 class="section-title">Rush Roulette</h2>
          <div class="game-info">
            <div class="game-description">
              <h3>Masked Hunter-Chaser Mechanics</h3>
              <p>A group of young thrill-seekers enters a cursed village. One is bound by a cursed
                 mask and must tag another to break free. Each time the curse shifts, players
                 choose a random ability card. Run, deceive, survive — or be claimed by the
                 monster hunting the cursed</p>
              <ul class="feature-list">
                <li>Asymmetric multiplayer horror</li>
                <li>Dynamic role selection</li>
                <li>Procedural ritual chambers</li>
                <li>Mystical artifacts and abilities</li>
              </ul>
            </div>
            <div class="game-preview">
              <div class="preview-container">
                <img src="/rush-roulette-cover.png" 
                     alt="Rush Roulette Gameplay"
                     style="width: 100%; border-radius: 16px; box-shadow: 0 0 30px rgba(37, 99, 235, 0.3);">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { onMounted } from 'vue'
import RitualChamber from '../components/RitualChamber.vue'

export default {
  name: 'Home',
  components: {
    RitualChamber
  },
  setup() {
    const enterRitual = () => {
      window.open('https://store.steampowered.com/app/3820880/Rush_Roulette/', '_blank')
    }

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5

      const ritualChamber = document.querySelector('.ritual-chamber')
      if (ritualChamber) {
        ritualChamber.style.transform = `translate(-50%, -50%) translateY(${parallax}px)`
      }
    }

    const observeElements = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      }, observerOptions)

      setTimeout(() => {
        const sections = document.querySelectorAll('.glass-panel, .artifact-card, .job-card')
        sections.forEach(section => {
          section.style.opacity = '0'
          section.style.transform = 'translateY(30px)'
          section.style.transition = 'all 0.8s ease'
          observer.observe(section)
        })
      }, 100)
    }

    onMounted(() => {
      observeElements()
      window.addEventListener('scroll', handleScroll)
    })

    return {
      enterRitual
    }
  }
}
</script>