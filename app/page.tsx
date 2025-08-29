import { getPosts } from '@/lib/api/jsonplaceholder'

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-xl font-bold">Fetched Posts</h1>
        <pre className="p-4 rounded w-full max-w-lg text-sm">
          {JSON.stringify(posts, null, 2)}
        </pre>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  )
}
