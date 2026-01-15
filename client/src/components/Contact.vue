<script setup>
import { ref } from "vue";
import { ContactsAPI } from "../api.js";

const customerName = ref("");
const customerEmail = ref("");
const customerMessage = ref("");

async function submitContact() {
  if (!customerName.value || !customerEmail.value || !customerMessage.value) {
    alert("Please fill all fields!");
    return;
  }

  try {
    // Call backend API to create new contact
    await ContactsAPI.create({
      name: customerName.value,
      email: customerEmail.value,
      message: customerMessage.value
    });

    alert("Message sent!");

    // Reset form fields
    customerName.value = "";
    customerEmail.value = "";
    customerMessage.value = "";

  } catch (err) {
    console.log(err);
    alert("Failed to send message.");
  }
}
</script>

<template>
<section id="contact" class="section contact-form-section">
  <div class="container">
    <h2 class="section-title scroll-reveal split-text-animation">Let's Connect!</h2>
    <div class="contact-grid">
      <div class="contact-form scroll-reveal">
        <h3>聯繫我，開始一場夢幻合作</h3>
        <form @submit.prevent="submitContact">
          <input type="text" placeholder="您的姓名" v-model="customerName" required />
          <input type="email" placeholder="您的Email" v-model="customerEmail" required />
          <textarea placeholder="想說的話..." rows="4" v-model="customerMessage" required></textarea>
          <button type="submit" class="submit-btn">Send Message</button>
        </form>
      </div>
      <div class="social-links scroll-reveal">
        <h3>我的社群連結</h3>
        <a href="#" class="social-icon instagram">IG</a>
        <a href="mailto:your.email@example.com" class="social-icon email">Mail</a>
        <p class="contact-email">Email: linyuneh@gmail.com</p>
      </div>
    </div>
  </div>
</section>
</template>
