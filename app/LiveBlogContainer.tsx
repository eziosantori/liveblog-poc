'use client'

import { LiveBlog } from '@/components/features/liveblog/LiveBlog'
import { usePostsInfiniteQuery } from '@/hooks/queries/usePosts'
import { useEffect, useRef } from 'react'
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

  // Ref to track if we're already loading to prevent duplicate calls
  const isLoadingRef = useRef(false)

  // Create a ref that detects when element is in view
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when at least 10% of the element is visible
    rootMargin: '0px 0px 200px 0px', // Load more 200px before reaching the bottom
  })

  // Effect to handle loading more posts when the element comes into view
  useEffect(() => {
    // Only load more if in view, has more posts, not already loading, and our ref is not set
    if (
      inView &&
      hasMorePosts &&
      !isLoadingMorePosts &&
      !isLoadingRef.current
    ) {
      isLoadingRef.current = true
      loadMorePosts()
    }

    return () => {}
  }, [inView, hasMorePosts, isLoadingMorePosts, loadMorePosts])

  // Separate effect to reset the loading ref when loading state changes
  useEffect(() => {
    // If we were loading and now we're not, reset the ref
    if (!isLoadingMorePosts) {
      isLoadingRef.current = false
    }
  }, [isLoadingMorePosts])

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
