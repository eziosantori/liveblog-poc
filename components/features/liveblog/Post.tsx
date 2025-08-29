'use client'

import type { Post as PostType } from '@/types/models'
import { memo } from 'react'

interface PostProps {
  post: PostType
  onClick?: ((postId: number) => void) | undefined
}

export const Post = memo<PostProps>(({ post, onClick }) => {
  const handleClick = () => {
    onClick?.(post.id)
  }

  return (
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
  )
})

Post.displayName = 'Post'
