import type { Post, User } from '@/types/models'
import { fetchData } from './client'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

const mockPosts: Post[] = [
  { id: 1, title: 'Mock Post 1', body: 'This is a mock post.', userId: 1 },
  {
    id: 2,
    title: 'Mock Post 2',
    body: 'This is another mock post.',
    userId: 2,
  },
]

const mockUser: User = {
  id: 1,
  name: 'Mock User',
  username: 'mockuser',
  email: 'mockuser@example.com',
  phone: '123-456-7890',
  website: 'mockuser.com',
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetchData<Post[]>(`${BASE_URL}/posts`)
    if (response.error) {
      console.error('Error fetching posts:', response.error)
      throw new Error(response.error)
    }
    return response.data || []
  } catch (error) {
    console.error(
      'Unexpected error fetching posts, returning mock data:',
      error,
    )
    return mockPosts
  }
}

export async function getUser(userId: number): Promise<User> {
  try {
    const response = await fetchData<User>(`${BASE_URL}/users/${userId}`)
    if (response.error) {
      console.error(`Error fetching user with ID ${userId}:`, response.error)
      throw new Error(response.error)
    }
    return response.data!
  } catch (error) {
    console.error(
      `Unexpected error fetching user with ID ${userId}, returning mock data:`,
      error,
    )
    return mockUser
  }
}
