import { LiveBlog } from '@/components/features/liveblog/LiveBlog'
import { getPosts } from '@/lib/api/jsonplaceholder'

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto py-8">
      <LiveBlog posts={posts} />
    </div>
  )
}
