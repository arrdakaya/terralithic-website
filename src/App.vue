<template>
  <div id="app">
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

export default {
  name: 'App',
  components: {
    ParticleSystem,
    Navigation,
    Footer,
    ApplicationModal
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Cinzel:wght@400;600&display=swap');
@import './assets/styles/styles.css';
</style>