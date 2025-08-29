'use client'

import type { Post as PostType } from '@/types/models'
import { memo } from 'react'
import { useInView } from 'react-intersection-observer'
import { VirtualPost } from './VirtualPost'

interface PostProps {
  post: PostType
  onClick?: ((postId: number) => void) | undefined
}

export const Post = memo<PostProps>(({ post, onClick }) => {
  // Use react-intersection-observer for detecting viewport visibility
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: '200px 0px',
  })

  const handleClick = () => {
    onClick?.(post.id)
  }

  // Only render the actual post content when in view or near viewport
  return (
    <div ref={ref}>
      {inView ? (
        <article
          className="border p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
          onClick={handleClick}
        >
          <h2 className="text-lg font-semibold line-clamp-2">{post.title}</h2>
          <p className="mt-2 text-gray-200 line-clamp-3">{post.body}</p>
          <div className="mt-4 text-sm text-gray-500">
            User ID: {post.userId} • Post ID: {post.id}
          </div>
        </article>
      ) : (
        <VirtualPost post={post} />
      )}
    </div>
  )
})

Post.displayName = 'Post'
