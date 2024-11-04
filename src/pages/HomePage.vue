<template>
  <main class="home">
    <div v-if="postsStore.loading" class="loading">Loading posts...</div>

    <div v-else-if="postsStore.error" class="error">
      {{ postsStore.error }}
    </div>

    <div v-else class="posts-grid">
      <article
        v-for="post in postsStore.posts"
        :key="post.id"
        class="post-card"
      >
        <router-link :to="`/post/${post.slug}`">
          <img
            v-if="post._embedded?.['wp:featuredmedia']?.[0]?.source_url"
            :src="post._embedded['wp:featuredmedia'][0].source_url"
            :alt="post.title.rendered"
            class="post-image"
          />
          <h2 v-html="post.title.rendered"></h2>
          <div class="post-excerpt" v-html="post.excerpt.rendered"></div>
        </router-link>
      </article>
    </div>

    <div class="pagination">
      <button
        :disabled="postsStore.currentPage === 1"
        @click="loadPage(postsStore.currentPage - 1)"
      >
        Previous
      </button>
      <span
        >Page {{ postsStore.currentPage }} of {{ postsStore.totalPages }}</span
      >
      <button
        :disabled="postsStore.currentPage === postsStore.totalPages"
        @click="loadPage(postsStore.currentPage + 1)"
      >
        Next
      </button>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'

const postsStore = usePostsStore()

const loadPage = (page) => {
  postsStore.fetchPosts(page)
  window.scrollTo(0, 0)
}

onMounted(() => {
  postsStore.fetchPosts()
})
</script>

<style scoped>
.home {
  padding: 2rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.post-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.error {
  color: red;
  text-align: center;
  padding: 2rem;
}
</style>
