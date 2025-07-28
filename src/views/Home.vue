<template>
  <main>
    <!-- Floating Decorative Elements -->
    <div class="floating-decorations">
      <div
        v-for="rune in floatingRunes"
        :key="rune.id"
        class="floating-rune"
        :style="rune.style"
      >
        {{ rune.symbol }}
      </div>
    </div>

    <!-- Animated Background Layers -->
    <div class="background-layers">
      <div class="bg-layer layer-1"></div>
      <div class="bg-layer layer-2"></div>
      <div class="bg-layer layer-3"></div>
    </div>

    <!-- Hero Section - Animated Game Screenshots -->
    <section id="hero" class="hero-screenshots">
      <div class="screenshots-carousel">
        <!-- Main Screenshot Display -->
        <div class="main-screenshot-container">
          <div class="screenshot-viewer">
            <img
              :src="activeScreenshot.src"
              :alt="activeScreenshot.alt"
              class="main-screenshot"
              :key="activeScreenshot.id"
            />

            <!-- Screenshot overlay with game info -->
            <div class="screenshot-info-overlay">
              <div class="screenshot-info">
                <h3 class="screenshot-title">{{ activeScreenshot.title }}</h3>
                <p class="screenshot-description">
                  {{ activeScreenshot.description }}
                </p>
              </div>
            </div>

            <!-- Navigation arrows -->
            <button class="nav-arrow prev-arrow" @click="previousScreenshot">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="nav-arrow next-arrow" @click="nextScreenshot">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <!-- Screenshot thumbnails -->
          <div class="screenshot-thumbnails">
            <div
              v-for="(screenshot, index) in gameScreenshots"
              :key="screenshot.id"
              :class="[
                'thumbnail',
                { active: currentScreenshotIndex === index },
              ]"
              @click="setActiveScreenshot(index)"
            >
              <img
                :src="screenshot.src"
                :alt="screenshot.alt"
                class="thumbnail-image"
              />
              <div class="thumbnail-overlay">
                <span class="thumbnail-number">{{ index + 1 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Game Information Panel -->
        <div class="game-info-panel">
          <div class="game-title-section">
            <h1 class="main-game-title">
              <span class="title-rush">RUSH</span>
              <span class="title-roulette">ROULETTE</span>
            </h1>
            <p class="game-tagline">
              A group of young thrill-seekers enters a cursed village. One is
              bound by a cursed mask and must tag another to break free. Each
              time the curse shifts, players choose a random ability card. Run,
              deceive, survive — or be claimed by the monster hunting the cursed
            </p>
          </div>

          <!-- Primary Wishlist CTA -->
          <div class="hero-cta-section">
            <button
              class="mega-wishlist-btn"
              @click="addToWishlist"
              @mouseenter="startButtonEffect"
              @mouseleave="stopButtonEffect"
            >
              <div class="btn-content">
                <img
                  src="https://store.steampowered.com/public/images/v6/logo_steam_footer.png"
                  alt="Steam"
                  class="platform-logo"
                />
                <div class="btn-text-content">
                  <span class="btn-main-text">WISHLIST NOW</span>
                </div>
              </div>
              <div class="btn-particles" v-if="buttonParticles">
                <div
                  v-for="particle in buttonParticleList"
                  :key="particle.id"
                  class="btn-particle"
                  :style="particle.style"
                ></div>
              </div>
              <div class="btn-glow-effect"></div>
            </button>

            <!-- Social Proof -->
          </div>
        </div>
      </div>

      <!-- Auto-play controls -->
      <div class="carousel-controls">
        <div class="progress-indicators">
          <div
            v-for="(_, index) in gameScreenshots"
            :key="index"
            :class="[
              'progress-dot',
              { active: currentScreenshotIndex === index },
            ]"
            @click="setActiveScreenshot(index)"
          ></div>
        </div>
      </div>
    </section>

    <!-- Trailer Section -->
    <section id="trailer" class="trailer-showcase">
      <div class="container">
        <div class="trailer-header">
          <h2 class="trailer-title">
            <span class="title-main">Watch Trailer</span>
          </h2>
          <p class="trailer-subtitle">
            See Rush Roulette's terrifying gameplay in action. Every decision
            matters, every moment could be your last.
          </p>
        </div>

        <div class="trailer-content">
          <div class="trailer-video-container">
            <video
              class="trailer-video"
              src="/RushRouletteTrailer.mp4"
              controls
              autoplay
              muted
              playsinline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>

    <!-- Game Features Section -->
    <section id="features" class="detailed-features">
      <div class="container">
        <h2 class="section-title">
          <span class="title-decoration">◊</span>
          Rush Roulette
          <span class="title-decoration">◊</span>
        </h2>

        <div class="features-grid">
          <div
            class="feature-card"
            v-for="(feature, index) in detailedFeatures"
            :key="index"
            :class="{ 'animate-in': true }"
            :style="{ animationDelay: index * 0.2 + 's' }"
          >
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>

        <!-- Final Conversion CTA -->
      </div>
    </section>
  </main>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import RitualChamber from '../components/RitualChamber.vue'

export default {
  name: 'Home',
  components: {
    RitualChamber,
  },
  setup() {
    const floatingRunes = ref([])
    const buttonParticles = ref(false)
    const buttonParticleList = ref([])
    const isPlaying = ref(false)
    const showControls = ref(false)
    const wishlistCount = ref(3247)
    const videoViews = ref(15643)
    const trailerVideo = ref(null)

    // Screenshot carousel state
    const currentScreenshotIndex = ref(0)
    const autoPlay = ref(true)

    const gameScreenshots = reactive([
      {
        id: 1,
        src: 'src/assets/images/1.png',
        alt: 'Rush Roulette Ritual Chamber',
        title: 'The Ritual Chamber',
        description:
          'Players gather in the mystical chamber where fate will decide who becomes the hunter',
        gameInfo:
          'Experience the ultimate horror multiplayer game where every decision matters',
      },
      {
        id: 2,
        src: 'src/assets/images/HunterCatch.jpg',
        alt: 'Character Abilities',
        title: 'Unique Abilities',
        description:
          'Each player possesses distinct skills and ability cards to survive the nightmare',
        gameInfo:
          'Strategic gameplay meets psychological horror in this asymmetric multiplayer experience',
      },
      {
        id: 3,
        src: 'src/assets/images/2.png',
        alt: 'Hunt or Hide',
        title: 'Hunt or Hide',
        description:
          'Will you be the hunter seeking victims, or will you hide in the shadows?',
        gameInfo:
          'Dynamic role-switching keeps every match unpredictable and terrifying',
      },
      {
        id: 4,
        src: 'src/assets/images/Cards.png',
        alt: 'Team Strategy',
        title: 'Teamwork & Betrayal',
        description:
          'Trust no one - your allies might become your greatest threat',
        gameInfo:
          'Psychological warfare meets survival horror in this intense 4-8 player experience',
      },
      {
        id: 5,
        src: 'src/assets/images/City.png',
        alt: 'Mystical Environment',
        title: 'Cursed Environments',
        description:
          'Navigate through procedurally generated chambers filled with ancient mysteries',
        gameInfo:
          'Every match offers new challenges with randomly generated ritual chambers',
      },
    ])

    const screenshotFeatures = reactive([
      [
        {
          icon: '🎭',
          title: 'Ritual Selection',
          description: 'Ancient ceremony chooses the hunter',
        },
        {
          icon: '👥',
          title: '4-8 Players',
          description: 'Perfect group size for maximum tension',
        },
        {
          icon: '🔮',
          title: 'Mystical Setting',
          description: 'Atmospheric horror environment',
        },
      ],
      [
        {
          icon: '🃏',
          title: 'Ability Cards',
          description: 'Strategic card system changes gameplay',
        },
        {
          icon: '⚡',
          title: 'Quick Powers',
          description: 'Fast-paced ability activation',
        },
        {
          icon: '🎯',
          title: 'Tactical Play',
          description: 'Every choice affects survival',
        },
      ],
      [
        {
          icon: '👻',
          title: 'Hunter Mode',
          description: 'Become the terrifying pursuer',
        },
        {
          icon: '🏃',
          title: 'Survivor Mode',
          description: 'Hide, run, and outlast others',
        },
        {
          icon: '⏱️',
          title: 'Time Pressure',
          description: 'Limited time increases tension',
        },
      ],
      [
        {
          icon: '🤝',
          title: 'Team Dynamics',
          description: 'Form alliances or go solo',
        },
        {
          icon: '🎪',
          title: 'Social Deduction',
          description: 'Read players and make moves',
        },
        {
          icon: '💀',
          title: 'Elimination',
          description: 'Last survivor wins the round',
        },
      ],
      [
        {
          icon: '🏛️',
          title: 'Procedural Maps',
          description: 'Every game offers new layouts',
        },
        {
          icon: '🔍',
          title: 'Hidden Secrets',
          description: 'Discover mystical artifacts',
        },
        {
          icon: '🌙',
          title: 'Dark Atmosphere',
          description: 'Immersive horror experience',
        },
      ],
    ])

    const detailedFeatures = reactive([
      {
        icon: '🪝',
        title: 'Pass the Curse',
        description:
          'One player starts with the cursed mask. To survive, they must tag another player and hand over the curse before the monster catches them. But beware: each transfer reshapes the game.',
      },
      {
        icon: '🃏',
        title: 'Shape Your Fate',
        description:
          'Every time the curse transfers, all players picks one of two randomized ability cards. Abilities include dash , invisibility, double jump, blinding other players, summoning a decoy clone, or even empowering the monster to force chaos on others.',
      },
      {
        icon: '🏛️',
        title: 'Ritual Chambers',
        description:
          'Set in a massive decayed village of crumbling rooftops and forgotten alleyways, the environment is built for high-mobility traversal. Run, vault, and wall-climb to outmaneuver both monster and mask.',
      },
      {
        icon: '💀',
        title: 'The Monster Never Rests',
        description:
          'Controlled by AI, the monster relentlessly hunts whoever bears the curse. It never stops. It never forgets. It grows more aggressive with each passing moment.',
      },
      {
        icon: '⚡',
        title: 'Asymmetric Mayhem',
        description:
          '3 Survivors, 1 Cursed. One goal: avoid the mask or survive with it long enough to pass it on.',
      },
      {
        icon: '🌐',
        title: 'Escape the Curse',
        description:
          'Collect the Relics, find the Portal, and escape — before it’s too late.',
      },
    ])

    const trailerFeatures = reactive([
      {
        timestamp: '0:00',
        title: 'Ritual Begins',
        description: 'See the mystical selection process in action',
      },
      {
        timestamp: '0:45',
        title: 'Hunter Revealed',
        description: 'Watch the transformation and chase begin',
      },
      {
        timestamp: '1:20',
        title: 'Ability Cards',
        description: 'Strategic gameplay mechanics showcase',
      },
      {
        timestamp: '2:00',
        title: 'Intense Finale',
        description: 'Final moments of survival and victory',
      },
    ])

    // Computed properties
    const activeScreenshot = computed(
      () => gameScreenshots[currentScreenshotIndex.value]
    )
    const currentFeatures = computed(
      () => screenshotFeatures[currentScreenshotIndex.value]
    )

    let runeInterval
    let buttonParticleInterval
    let wishlistInterval
    let carouselInterval

    const initFloatingRunes = () => {
      const runeSymbols = ['᚛', '᚜', 'ᚐ', 'ᚑ', 'ᚒ', 'ᚓ', '◊', '◈', '❋', '⟐']

      const createRune = () => {
        const rune = {
          id: Date.now() + Math.random(),
          symbol: runeSymbols[Math.floor(Math.random() * runeSymbols.length)],
          style: {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDuration: Math.random() * 10 + 5 + 's',
            animationDelay: Math.random() * 2 + 's',
            fontSize: Math.random() * 20 + 15 + 'px',
            opacity: Math.random() * 0.6 + 0.2,
          },
        }

        floatingRunes.value.push(rune)

        setTimeout(() => {
          const index = floatingRunes.value.findIndex(r => r.id === rune.id)
          if (index > -1) {
            floatingRunes.value.splice(index, 1)
          }
        }, 15000)
      }

      // Initial runes
      for (let i = 0; i < 8; i++) {
        setTimeout(createRune, i * 500)
      }

      runeInterval = setInterval(createRune, 3000)
    }

    const animateCounters = () => {
      wishlistInterval = setInterval(() => {
        wishlistCount.value += Math.floor(Math.random() * 4) + 1
        videoViews.value += Math.floor(Math.random() * 8) + 2
      }, 25000)
    }

    // Screenshot carousel functions
    const setActiveScreenshot = index => {
      currentScreenshotIndex.value = index
    }

    const nextScreenshot = () => {
      currentScreenshotIndex.value =
        (currentScreenshotIndex.value + 1) % gameScreenshots.length
    }

    const previousScreenshot = () => {
      currentScreenshotIndex.value =
        currentScreenshotIndex.value === 0
          ? gameScreenshots.length - 1
          : currentScreenshotIndex.value - 1
    }

    const toggleAutoPlay = () => {
      autoPlay.value = !autoPlay.value
      if (autoPlay.value) {
        startCarousel()
      } else {
        stopCarousel()
      }
    }

    const startCarousel = () => {
      if (carouselInterval) clearInterval(carouselInterval)
      carouselInterval = setInterval(() => {
        if (autoPlay.value) {
          nextScreenshot()
        }
      }, 4000)
    }

    const stopCarousel = () => {
      if (carouselInterval) {
        clearInterval(carouselInterval)
        carouselInterval = null
      }
    }

    const startButtonEffect = () => {
      buttonParticles.value = true
      buttonParticleInterval = setInterval(createButtonParticle, 80)
    }

    const stopButtonEffect = () => {
      buttonParticles.value = false
      if (buttonParticleInterval) {
        clearInterval(buttonParticleInterval)
      }
      buttonParticleList.value = []
    }

    const createButtonParticle = () => {
      const particle = {
        id: Date.now() + Math.random(),
        style: {
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDuration: Math.random() * 2 + 1 + 's',
        },
      }

      buttonParticleList.value.push(particle)

      setTimeout(() => {
        const index = buttonParticleList.value.findIndex(
          p => p.id === particle.id
        )
        if (index > -1) {
          buttonParticleList.value.splice(index, 1)
        }
      }, 3000)
    }

    const addToWishlist = () => {
      // Create explosion effect
      for (let i = 0; i < 30; i++) {
        setTimeout(createButtonParticle, i * 20)
      }

      // Increment wishlist count
      wishlistCount.value += 1

      setTimeout(() => {
        window.open(
          'https://store.steampowered.com/app/3820880/Rush_Roulette/',
          '_blank'
        )
      }, 300)
    }

    const playTrailer = () => {
      if (trailerVideo.value) {
        isPlaying.value = true
        showControls.value = true
        trailerVideo.value.play()

        trailerVideo.value.addEventListener('ended', () => {
          isPlaying.value = false
          showControls.value = false
        })
      }
    }

    const scrollToTrailer = () => {
      const trailerSection = document.getElementById('trailer')
      if (trailerSection) {
        trailerSection.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const handleScroll = () => {
      const scrolled = window.pageYOffset

      // Parallax for background layers
      const layers = document.querySelectorAll('.bg-layer')
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.03
        layer.style.transform = `translateY(${scrolled * speed}px)`
      })
    }

    const observeElements = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, observerOptions)

      setTimeout(() => {
        const sections = document.querySelectorAll(
          '.feature-card, .trailer-content, .cta-content-box'
        )
        sections.forEach(section => {
          observer.observe(section)
        })
      }, 100)
    }

    onMounted(() => {
      initFloatingRunes()
      animateCounters()
      startCarousel()
      observeElements()
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      if (runeInterval) clearInterval(runeInterval)
      if (buttonParticleInterval) clearInterval(buttonParticleInterval)
      if (wishlistInterval) clearInterval(wishlistInterval)
      if (carouselInterval) clearInterval(carouselInterval)
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      floatingRunes,
      buttonParticles,
      buttonParticleList,
      isPlaying,
      showControls,
      wishlistCount,
      videoViews,
      trailerVideo,
      currentScreenshotIndex,
      autoPlay,
      gameScreenshots,
      activeScreenshot,
      currentFeatures,
      detailedFeatures,
      trailerFeatures,
      setActiveScreenshot,
      nextScreenshot,
      previousScreenshot,
      toggleAutoPlay,
      addToWishlist,
      playTrailer,
      scrollToTrailer,
      startButtonEffect,
      stopButtonEffect,
    }
  },
}
</script>

<style scoped>
@import '../assets/styles/home-enhancements.css';
@import '../assets/styles/home-redesign.css';
@import '../assets/styles/screenshot-carousel.css';
</style>