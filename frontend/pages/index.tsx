import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Post = {
  id: string
  name: string
  description: string
  imageUrl?: string | null
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [query, setQuery] = useState('')
  const [sortAsc, setSortAsc] = useState(true)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

  const loadPosts = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/posts`)
      if (res.ok) {
        setPosts(await res.json())
      }
    } catch (err) {
      console.error('Error loading posts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const filtered = posts
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))

  const handleDelete = async (id: string) => {
    if (confirm('Delete this post?')) {
      try {
        await fetch(`${apiUrl}/api/posts/${id}`, { method: 'DELETE' })
        loadPosts()
      } catch (err) {
        console.error('Error deleting post:', err)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">📝 Posts Manager</h1>
          <p className="text-slate-600">Create, edit, and manage your posts effortlessly</p>
        </div>

        {/* Search & Sort Controls */}
        <div className="card mb-6 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="🔍 Search posts..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="input-field flex-1"
          />
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="btn-secondary"
          >
            {sortAsc ? '↑ A→Z' : '↓ Z→A'}
          </button>
          <Link href="/create">
            <button className="btn-primary">+ New Post</button>
          </Link>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">⏳ Loading posts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-slate-600 mb-4">No posts found</p>
            <Link href="/create">
              <button className="btn-primary">Create Your First Post</button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <div key={post.id} className="card overflow-hidden">
                {post.imageUrl && (
                  <img src={post.imageUrl} alt={post.name} className="w-full h-40 object-cover mb-4 rounded" />
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{post.name}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">{post.description}</p>
                <div className="flex gap-2">
                  <Link href={`/edit/${post.id}`} className="flex-1">
                    <button className="btn-secondary w-full">✏️ Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(post.id)} className="btn-danger">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
