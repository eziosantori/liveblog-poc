import type { ApiResponse, ErrorResponse } from '@/types/models'

export async function fetchData<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json()
      throw new Error(errorData.message || 'An error occurred')
    }

    const data: T = await response.json()
    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
