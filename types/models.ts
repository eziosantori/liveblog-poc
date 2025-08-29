// TypeScript interfaces for the application

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

export interface PostDetail extends Post {
  user: User
}

export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface ErrorResponse {
  message: string
}
