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

      <button class="mobile-menu-toggle" @click="toggleMobileMenu" :class="{ active: mobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
        <li><a href="#hero" @click="handleNavClick('hero')">Home</a></li>
        <li>
          <a href="#trailer" @click="handleNavClick('trailer')">Trailer</a>
        </li>
        <li>
          <a href="#features" @click="handleNavClick('features')">Features</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    handleNavClick(sectionId) {
      this.scrollToSection(sectionId)
      this.mobileMenuOpen = false
    },
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

<style scoped>
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.mobile-menu-toggle span {
  width: 100%;
  height: 3px;
  background: #E0F2FE;
  border-radius: 10px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav-content {
    padding: 1rem 1.5rem;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .logo-text {
    font-size: 1.2rem;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    max-width: 300px;
    height: 100vh;
    background: rgba(10, 15, 26, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    transition: right 0.3s ease;
    border-left: 1px solid rgba(224, 242, 254, 0.1);
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .nav-links.mobile-open {
    right: 0;
  }

  .nav-links li {
    width: 100%;
    text-align: center;
  }

  .nav-links a {
    display: block;
    font-size: 1.2rem;
    padding: 0.8rem;
  }
}

@media (max-width: 480px) {
  .nav-content {
    padding: 0.8rem 1rem;
  }

  .logo-text {
    font-size: 1rem;
  }

  .terralithic-logo {
    width: 40px;
  }

  .mobile-menu-toggle {
    width: 25px;
    height: 20px;
  }

  .mobile-menu-toggle span {
    height: 2.5px;
  }

  .nav-links {
    width: 80%;
  }

  .nav-links a {
    font-size: 1.1rem;
  }
}
</style>