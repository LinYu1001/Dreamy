<script setup>
import gsap from "gsap";

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  // Get the top position of the target element
  const top = target.getBoundingClientRect().top + window.scrollY;

  gsap.to(window, {
    scrollTo: top,
    duration: 1,      // scroll duration in seconds
    ease: "power2.inOut",
  });
}

</script>

<template>
  <header class="header">
    <nav class="navbar container">
      <div class="logo">
        <span class="logo-text">Dreamy Studio</span>
      </div>
      <ul class="nav-links">
        <li><a href="#home" @click.prevent="scrollToSection('home')" class="nav-item">Home</a></li>
        <li><a href="#about" @click.prevent="scrollToSection('about')" class="nav-item">About</a></li>
        <li><a href="#works" @click.prevent="scrollToSection('works')" class="nav-item">Works</a></li>
        <li><a href="#contact" @click.prevent="scrollToSection('contact')" class="nav-item contact-btn">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>
