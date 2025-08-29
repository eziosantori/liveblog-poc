import { memo } from 'react'

interface PostSkeletonProps {
  count?: number
}

export const PostSkeleton = memo<PostSkeletonProps>(({ count = 3 }) => {
  return (
    <div className={count > 1 ? 'space-y-4 w-full' : 'w-full'}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border p-4 rounded-lg animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="mt-4 h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  )
})

PostSkeleton.displayName = 'PostSkeleton'
