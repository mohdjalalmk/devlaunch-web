import { defineStore } from 'pinia'

export interface User {
  _id: string
  name: string
  email: string
  role: 'user'
  enrolledCourses: Array<{
    courseId: string
    progress: number
    completedVideos: { key: string }[]
    certificate?: string
  }>
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),
  actions: {
    setUser(data: { user: User; token: string }) {
      this.user = data.user
      this.token = data.token
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
    },
    loadUserFromStorage() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user) as User
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    setLoading(status: boolean) {
      this.loading = status
    },
    setError(message: string | null) {
      this.error = message
    },
  }
})
