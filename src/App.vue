<template>
  <div id="app">
    <div class="release-date-banner">
      <div class="banner-content">
        <img :src="currentLeftImage" alt="Character" class="banner-icon-img" />
        <span class="banner-text"><strong>20 • NOVEMBER • 2025</strong></span>
        <img :src="currentRightImage" alt="Character" class="banner-icon-img" />
      </div>
    </div>
    <ParticleSystem />
    <Navigation />
    <router-view />
    <Footer />
    <ApplicationModal />
  </div>
</template>

<script>
import ParticleSystem from './components/ParticleSystem.vue'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import ApplicationModal from './components/ApplicationModal.vue'
import HunterCircle from './assets/images/HunterCircle.png'
import JenniferCircle from './assets/images/JenniferCircle.png'
import JakeCircle from './assets/images/JakeCircle.png'
import JasonCircle from './assets/images/JasonCircle.png'
import JaneCircle from './assets/images/JaneCircle.png'

export default {
  name: 'App',
  components: {
    ParticleSystem,
    Navigation,
    Footer,
    ApplicationModal,
  },
  data() {
    return {
      images: [
        HunterCircle,
        JenniferCircle,
        JakeCircle,
        JasonCircle,
        JaneCircle,
      ],
      currentLeftIndex: 0,
      currentRightIndex: 1,
    }
  },
  computed: {
    currentLeftImage() {
      return this.images[this.currentLeftIndex]
    },
    currentRightImage() {
      return this.images[this.currentRightIndex]
    },
  },
  mounted() {
    // Sol taraftaki görseli her 3 saniyede bir değiştir
    setInterval(() => {
      this.currentLeftIndex = (this.currentLeftIndex + 1) % this.images.length
    }, 3000)

    // Sağ taraftaki görseli her 3 saniyede bir değiştir (1.5 saniye gecikmeyle)
    setTimeout(() => {
      setInterval(() => {
        this.currentRightIndex =
          (this.currentRightIndex + 1) % this.images.length
      }, 3000)
    }, 1500)
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Cinzel:wght@400;600&display=swap');
@import './assets/styles/styles.css';
</style>