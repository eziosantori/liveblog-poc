import type { Post as PostType } from '@/types/models'
import { memo } from 'react'

interface VirtualPostProps {
  post: PostType
}

/**
 * A lightweight placeholder component that maintains the same height as a Post
 * but with minimal DOM elements and no content rendering
 */
export const VirtualPost = memo<VirtualPostProps>(({ post }) => {
  return (
    <div
      className="border p-4 rounded-lg"
      style={{
        height: '154px', // Fixed height matching a typical Post component
      }}
      data-post-id={post.id}
      aria-hidden="true"
    >
      {/* Empty placeholder with minimal DOM footprint */}
    </div>
  )
})

VirtualPost.displayName = 'VirtualPost'
