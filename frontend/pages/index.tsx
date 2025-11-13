import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Movie = {
  id: string
  title: string
  genre?: string | null
  rating?: number | null
  posterImageUrl?: string | null
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [sortBy, setSortBy] = useState<'title' | 'rating'>('title')
  const [asc, setAsc] = useState(true)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

  const loadMovies = async () => {
    try {
      const params = new URLSearchParams()
      if (query) params.set('title', query)
      if (genre) params.set('genre', genre)
      if (sortBy) params.set('sortBy', sortBy)
      params.set('asc', String(asc))
      const res = await fetch(`${apiUrl}/api/movies?${params.toString()}`)
      if (res.ok) {
        setMovies(await res.json())
      }
    } catch (err) {
      console.error('Error loading movies:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, genre, sortBy, asc])

  const genres = Array.from(new Set(movies.map(m => (m.genre ?? '').trim()).filter(Boolean)))

  const handleDelete = async (id: string) => {
    if (confirm('Delete this post?')) {
      try {
        await fetch(`${apiUrl}/api/movies/${id}`, { method: 'DELETE' })
        loadMovies()
      } catch (err) {
        console.error('Error deleting movie:', err)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">🎬 Movies Watchlist</h1>
          <p className="text-slate-600">Search, filter and manage movies you want to watch</p>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="card mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <input
            type="text"
            placeholder="🔍 Search by title..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="input-field w-full"
          />
          <select
            className="input-field w-full"
            value={genre}
            onChange={e => setGenre(e.target.value)}
          >
            <option value="">All genres</option>
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <select
            className="input-field w-full"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'title' | 'rating')}
          >
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <div className="flex gap-2">
            <button onClick={() => setAsc(!asc)} className="btn-secondary flex-1">
              {asc ? '↑ Asc' : '↓ Desc'}
            </button>
            <Link href="/create" className="flex-1">
              <button className="btn-primary w-full">+ Add Movie</button>
            </Link>
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">⏳ Loading movies...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-slate-600 mb-4">No movies found</p>
            <Link href="/create">
              <button className="btn-primary">Add Your First Movie</button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map(movie => (
              <div key={movie.id} className="card overflow-hidden">
                {movie.posterImageUrl && (
                  <img src={movie.posterImageUrl} alt={movie.title} className="w-full h-56 object-cover mb-4 rounded" />
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-2">{movie.title}</h3>
                <p className="text-slate-600 text-sm mb-2">{movie.genre || '—'}</p>
                <p className="text-amber-600 font-medium mb-4">{movie.rating ? `⭐ ${movie.rating}/5` : 'No rating'}</p>
                <div className="flex gap-2">
                  <Link href={`/edit/${movie.id}`} className="flex-1">
                    <button className="btn-secondary w-full">✏️ Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(movie.id)} className="btn-danger">
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
