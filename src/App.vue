<script setup></script>

<template>
  <nav class="nav">
    <router-link to="/">Home</router-link>
  </nav>

  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
      <template #fallback>
        <div class="loading">Loading...</div>
      </template>
    </Suspense>
  </router-view>
</template>
