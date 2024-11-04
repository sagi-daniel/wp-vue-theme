import { defineStore } from 'pinia'
import { wordpress } from '@/api/wordpress'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  }),

  actions: {
    async fetchPosts(page = 1) {
      this.loading = true
      try {
        const response = await wordpress.getPosts(page)
        this.posts = response.data
        this.totalPages = parseInt(response.headers['x-wp-totalpages'])
        this.currentPage = page
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchPost(slug) {
      this.loading = true
      try {
        const response = await wordpress.getPost(slug)
        this.currentPost = response.data[0]
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
  },
})
