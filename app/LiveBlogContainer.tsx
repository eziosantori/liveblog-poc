'use client'

import { LiveBlog } from '@/components/features/liveblog/LiveBlog'
import { usePostsInfiniteQuery } from '@/hooks/queries/usePosts'
import { useCallback, useEffect, useRef } from 'react'

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

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMorePosts) return

      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMorePosts) {
          loadMorePosts()
        }
      })

      if (node) {
        observerRef.current.observe(node)
      }
    },
    [isLoadingMorePosts, hasMorePosts, loadMorePosts],
  )

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

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
        <div ref={loadMoreRef} className="py-4 text-center">
          {isLoadingMorePosts ? 'Loading more posts...' : 'Load more posts'}
        </div>
      )}
    </div>
  )
}
