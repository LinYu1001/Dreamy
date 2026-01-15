<script setup>
import { ref } from "vue";
import { PostsAPI } from "../api";

const title = ref("");
const image = ref("");

async function savePost() {
  await PostsAPI.create({
    title: title.value,
    image: image.value,
  });
  location.reload();
}
</script>
