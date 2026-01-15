<script setup>
import { ref, onMounted } from "vue";
import { PostsAPI } from "../api";

const posts = ref([]);

onMounted(async () => {
  posts.value = await PostsAPI.get();
});

function remove(id) {
  PostsAPI.delete(id).then(() => {
    posts.value = posts.value.filter(p => p._id !== id);
  });
}
</script>
