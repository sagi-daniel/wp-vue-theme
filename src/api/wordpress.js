import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_WP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const wordpress = {
  getPosts: (page = 1, perPage = 10) =>
    api.get(`/posts?page=${page}&per_page=${perPage}&_embed`),

  getPost: (slug) => api.get(`/posts?slug=${slug}&_embed`),

  getCategories: () => api.get('/categories'),

  getPostsByCategory: (categoryId, page = 1) =>
    api.get(`/posts?categories=${categoryId}&page=${page}&_embed`),
}
