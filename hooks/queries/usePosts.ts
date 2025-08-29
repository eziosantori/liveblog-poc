'use client'

import type { Post } from '@/types/models'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

const PAGE_SIZE = 10

interface FetchPostsResponse {
  posts: Post[]
  hasMore: boolean
  nextPage: number
}

// This is a simplified implementation where we paginate from an array in memory
// In a real API, you would fetch different pages from the server
const fetchPosts = async ({
  pageParam = 1,
}: {
  pageParam?: number
}): Promise<FetchPostsResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real implementation, this would be a fetch call with the page parameter
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }

  const posts = (await response.json()) as Post[]

  // JSONPlaceholder has 100 posts total, so we can calculate if there are more
  const hasMore = pageParam * PAGE_SIZE < 100

  return {
    posts,
    hasMore,
    nextPage: hasMore ? pageParam + 1 : pageParam,
  }
}

export function usePostsInfiniteQuery() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      // Flatten the pages for easier consumption
      posts: data.pages.flatMap((page) => page.posts),
    }),
  })

  // Create a memoized function to handle loading more posts
  const loadMorePosts = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return {
    posts: data?.posts || [],
    loadMorePosts,
    hasMorePosts: !!hasNextPage,
    isLoadingMorePosts: isFetchingNextPage,
    status,
    error,
    isLoading,
    refetch: () => fetchNextPage({ cancelRefetch: true }),
  }
}
