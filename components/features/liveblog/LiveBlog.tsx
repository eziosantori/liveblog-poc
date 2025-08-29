'use client'

import { ErrorDisplay } from '@/components/ui/ErrorDisplay'
import type { Post as PostType } from '@/types/models'
import { memo } from 'react'
import { Post } from './Post'
import { PostSkeleton } from './PostSkeleton'

interface LiveBlogProps {
  posts?: PostType[]
  isLoading?: boolean
  error?: string | undefined
  onPostClick?: (postId: number) => void
  onRetry?: (() => void) | undefined
}

export const LiveBlog = memo<LiveBlogProps>(
  ({ posts = [], isLoading, error, onPostClick, onRetry }) => {
    if (error) {
      return <ErrorDisplay error={error} resetAction={onRetry} />
    }

    return (
      <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Live Blog</h1>

        {isLoading ? (
          <PostSkeleton count={5} />
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No posts available</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Post key={post.id} post={post} onClick={onPostClick} />
            ))}
          </div>
        )}
      </div>
    )
  },
)

LiveBlog.displayName = 'LiveBlog'
