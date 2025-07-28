<template>
  <nav class="main-nav">
    <div class="nav-content">
      <div class="logo">
        <img
          src="/terralithiclogo.png"
          alt="Terralithic Logo"
          class="terralithic-logo"
        />
        <span class="logo-text">TERRALITHIC</span>
      </div>
      <ul class="nav-links">
        <li><a href="#hero" @click="scrollToSection('hero')">Home</a></li>
        <li>
          <a href="#trailer" @click="scrollToSection('trailer')">Trailer</a>
        </li>
        <li>
          <a href="#features" @click="scrollToSection('features')">Features</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        const offsetTop = element.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        })
      }
    },
  },
}
</script>