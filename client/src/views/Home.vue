<script setup>
import { ref, onMounted, nextTick } from "vue";
import "../assets/style.css";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Contact from "@/components/Contact.vue";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);;

// -------------------
// Works array
// -------------------
const works = ref([
  { id: 1, img: "/images/1.jpg", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 2, img: "/images/1.png", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 3, img: "/images/1light.jpg", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 4, img: "/images/2.jpg", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 5, img: "/images/3.png", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 6, img: "/images/Creampuff or cake_ (1).jpeg", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 7, img: "/images/DSC00728.JPG", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 8, img: "/images/DSC00743.JPG", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 9, img: "/images/DSC00785.jpg", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 10, img: "/images/DSC00928.JPG", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 11, img: "/images/DSC00998.JPG", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 12, img: "/images/IMG_1004-02 (1).jpg", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 13, img: "/images/IMG_1571.PNG", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 14, img: "/images/IMG_1836.PNG", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 15, img: "/images/IMG_6555.JPG", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 16, img: "/images/kinegram-frames (1).png", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 17, img: "/images/photography.JPG", tags: "#作品 #設計", link: "#", target: "project" },
  { id: 18, img: "/images/white.jpg", tags: "#作品 #設計", link: "#", target: "project" },
]);

// -------------------
// Cursor trail
// -------------------
onMounted(() => {
  const flair = gsap.utils.toArray("#cursor-trail .flair");
  let gap = 100;
  let index = 0;
  const wrapper = gsap.utils.wrap(0, flair.length);

  let mousePos = { x: 0, y: 0 };
  let lastMousePos = { x: 0, y: 0 };
  let cachedMousePos = { x: 0, y: 0 };

  window.addEventListener("mousemove", (e) => {
    mousePos = { x: e.clientX, y: e.clientY };
  });

  function playAnimation(shape) {
    const tl = gsap.timeline();
    tl.from(shape, { opacity: 0, scale: 0, ease: "elastic.out(1,0.3)" })
      .to(shape, { rotation: "random([-360, 360])" }, "<")
      .to(shape, { y: "120vh", ease: "back.in(.4)", duration: 1 }, 0);
  }

  function ImageTrail() {
    const travelDistance = Math.hypot(
      lastMousePos.x - mousePos.x,
      lastMousePos.y - mousePos.y
    );

    cachedMousePos.x = gsap.utils.interpolate(cachedMousePos.x || mousePos.x, mousePos.x, 0.1);
    cachedMousePos.y = gsap.utils.interpolate(cachedMousePos.y || mousePos.y, mousePos.y, 0.1);

    if (travelDistance > gap) {
      animateImage();
      lastMousePos = { ...mousePos };
    }
  }

  function animateImage() {
    const wrappedIndex = wrapper(index);
    const img = flair[wrappedIndex];

    gsap.killTweensOf(img);
    gsap.set(img, { clearProps: "all" });
    gsap.set(img, { opacity: 1, left: mousePos.x, top: mousePos.y, xPercent: -50, yPercent: -50, position: "fixed" });
    playAnimation(img);
    index++;
  }

  gsap.ticker.add(ImageTrail);

  // -------------------
  // SplitText scroll animation
  // -------------------
  const splitTexts = document.querySelectorAll(".split-text-animation");
  if (splitTexts) {
    splitTexts.forEach(text => {
      const splitTitle = new SplitText(text, { type: "chars, words" });
      gsap.from(splitTitle.chars, {
        scrollTrigger: { trigger: text, start: "top 80%" },
        opacity: 0,
        y: 50,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)"
      });
    });
  }

  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => {
    const splitH2 = new SplitText(title, { type: "chars, words" });
    gsap.from(splitH2.chars, {
      scrollTrigger: { trigger: title, start: "top 85%" },
      opacity: 0,
      y: 30,
      stagger: 0.03,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // Hero Banner zoom
  gsap.to(".hero-banner img", {
    scale: 1.1,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
});

// -------------------
// FLIP Gallery Modal
// -------------------
const flipModal = ref(false);
const flipImage = ref("");
const lastRect = ref(null);
const modalImageRef = ref(null);

function openFlipModal(imgUrl, event) {
  flipImage.value = imgUrl;
  lastRect.value = event.target.getBoundingClientRect();
  flipModal.value = true;

  nextTick(() => {
    const modalImg = modalImageRef.value;
    const first = lastRect.value;
    const last = modalImg.getBoundingClientRect();

    const invertX = first.left - last.left;
    const invertY = first.top - last.top;
    const scaleX = first.width / last.width;
    const scaleY = first.height / last.height;

    gsap.set(modalImg, { x: invertX, y: invertY, scaleX: scaleX, scaleY: scaleY, transformOrigin: "top left" });

    gsap.to(modalImg, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: "power2.out" });
  });
}

function closeFlipModal() {
  const modalImg = modalImageRef.value;
  const first = lastRect.value;
  const last = modalImg.getBoundingClientRect();

  const invertX = first.left - last.left;
  const invertY = first.top - last.top;
  const scaleX = first.width / last.width;
  const scaleY = first.height / last.height;

  gsap.to(modalImg, {
    x: invertX,
    y: invertY,
    scaleX: scaleX,
    scaleY: scaleY,
    duration: 0.6,
    ease: "power2.in",
    onComplete: () => {
      flipModal.value = false;
      flipImage.value = "";
    }
  });
}
</script>

<template>
  <Header />

  <main>
    <!-- Hero Banner -->
    <section id="home" class="hero-banner">
      <img src="/images/background.jpg" alt="background" />
      <div class="banner-content container">
        <h1 class="main-title split-text-animation">Draw your dream, <br />design your world</h1>
        <p class="subtitle">林佳毓 / 多媒體設計學生作品集</p>
        <!-- Admin Dashboard Button -->
        <div style=" z-index: 9999;">
          <router-link to="/admin">
            <button class="cta-button">Go to Admin Page</button>
          </router-link>
        </div>

      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section about-intro container">
      <h2 class="section-title scroll-reveal split-text-animation">About Dreamy Studio</h2>
      <div class="about-grid">
        <div class="about-image scroll-reveal">
          <img src="/images/logo_me.PNG" alt="林佳毓插畫肖像" class="styled-img" />
        </div>
        <div class="about-text scroll-reveal">
          <h3>林佳毓 | 設計理念與成長</h3>
          <p>嗨，我是佳毓！一個熱愛將奇思妙想轉化為視覺的設計系學生...</p>
        </div>
      </div>
    </section>

    <!-- Works Section -->
    <section id="works" class="section featured-works">
      <div class="container">
        <h2 class="section-title scroll-reveal split-text-animation">Selected Projects</h2>
        <p class="section-subtitle scroll-reveal">探索我最新的設計與創意成果</p>
        <div class="works-grid">
          <div v-for="work in works" :key="work.id" class="work-card">
            <img :src="work.img" @click="openFlipModal(work.img, $event)" />
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <Contact />

    <!-- Cursor Trail -->
    <div id="cursor-trail">
      <img class="flair" src="https://assets.codepen.io/16327/Revised+Flair.png" />
      <img class="flair" src="https://assets.codepen.io/16327/Revised+Flair-1.png" />
      <img class="flair" src="https://assets.codepen.io/16327/Revised+Flair-2.png" />
    </div>

    <!-- FLIP Modal -->
    <div v-if="flipModal" class="flip-modal" @click.self="closeFlipModal">
      <img :src="flipImage" ref="modalImageRef" class="flip-modal-img" />
      <span class="close-btn" @click="closeFlipModal">&times;</span>
    </div>
  </main>

  <Footer />
</template>