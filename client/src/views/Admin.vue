<script setup>
import { ref, onMounted } from "vue";
import { ContactsAPI } from "../api.js";

// ---------------- CONTACTS ----------------
const contacts = ref([]);

// Fetch contacts
async function fetchContacts() {
  contacts.value = await ContactsAPI.get();
}

// Delete a contact
async function deleteContact(id) {
  if (!confirm("Delete this contact?")) return;
  await ContactsAPI.delete(id);
  fetchContacts();
}

// Load contacts on mount
onMounted(() => {
  fetchContacts();
});
</script>

<template>
  <div class="admin-container">
    <h1>Admin Dashboard</h1>

    <!-- CONTACTS -->
    <section class="contacts-section">
      <h2>Contacts</h2>
      <div v-if="contacts.length === 0">No contacts yet.</div>
      <div v-else class="contacts-list">
        <div v-for="contact in contacts" :key="contact._id" class="contact-card">
          <p><strong>Name:</strong> {{ contact.name }}</p>
          <p><strong>Email:</strong> {{ contact.email }}</p>
          <p><strong>Message:</strong> {{ contact.message }}</p>
          <button @click="deleteContact(contact._id)">Delete</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.admin-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1,
h2 {
  text-align: center;
}

.contacts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 6px;
}

.contact-card button {
  cursor: pointer;
  margin-top: 0.5rem;
}
</style>
