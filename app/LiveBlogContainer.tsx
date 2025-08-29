'use client'

import { LiveBlog } from '@/components/features/liveblog/LiveBlog'
import { usePostsInfiniteQuery } from '@/hooks/queries/usePosts'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export function LiveBlogContainer() {
  const {
    posts,
    isLoading,
    error,
    loadMorePosts,
    hasMorePosts,
    isLoadingMorePosts,
    refetch,
  } = usePostsInfiniteQuery()

  // Create a ref that detects when element is in view
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when at least 10% of the element is visible
    rootMargin: '0px 0px 200px 0px', // Load more 200px before reaching the bottom
  })

  // Load more posts when the load more element comes into view
  useEffect(() => {
    if (inView && hasMorePosts && !isLoadingMorePosts) {
      loadMorePosts()
    }
  }, [inView, hasMorePosts, isLoadingMorePosts, loadMorePosts])

  const handlePostClick = (postId: number) => {
    console.log(`Post clicked: ${postId}`)
    // Future implementation: Open post details, etc.
  }

  return (
    <div className="flex flex-col min-h-screen">
      <LiveBlog
        posts={posts}
        isLoading={isLoading}
        error={error?.message || undefined}
        onPostClick={handlePostClick}
        onRetry={refetch}
      />

      {hasMorePosts && (
        <div ref={ref} className="py-4 text-center">
          {isLoadingMorePosts ? 'Loading more posts...' : 'Load more posts'}
        </div>
      )}
    </div>
  )
}
