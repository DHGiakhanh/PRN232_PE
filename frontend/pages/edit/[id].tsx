import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { uploadToCloudinary } from '../../lib/cloudinary'

type Movie = {
  id: string
  title: string
  genre?: string | null
  rating?: number | null
  posterImageUrl?: string | null
}

export default function Edit() {
  const router = useRouter()
  const { id } = router.query
  const [movie, setMovie] = useState<Movie | null>(null)
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [rating, setRating] = useState<number | ''>('')
  const [posterImageUrl, setPosterImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

  useEffect(() => {
    if (!id) return

    const loadPost = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/movies/${id}`)
        if (res.ok) {
          const data = await res.json()
          setMovie(data)
          setTitle(data.title)
          setGenre(data.genre || '')
          setRating(data.rating ?? '')
          setPosterImageUrl(data.posterImageUrl || '')
        }
      } catch (err) {
        console.error('Error loading post:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id, apiUrl])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const url = await uploadToCloudinary(file)
      setPosterImageUrl(url)
    } catch (err) {
      alert('Failed to upload image: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('Title is required')
      return
    }

    try {
      setSaving(true)
      const res = await fetch(`${apiUrl}/api/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          genre: genre.trim() || null,
          rating: rating === '' ? null : Number(rating),
          posterImageUrl: posterImageUrl || null,
        }),
      })

      if (res.ok) {
        router.push('/')
      } else {
        alert('Failed to update movie')
      }
    } catch (err) {
      alert('Error: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 flex items-center justify-center">
        <p className="text-slate-600 text-lg">⏳ Loading movie...</p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Movie not found</p>
          <Link href="/">
            <button className="btn-primary">Back to Movies</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">✏️ Edit Movie</h1>

        <form onSubmit={handleSubmit} className="card">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter movie title"
              className="input-field"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Genre</label>
            <input
              type="text"
              value={genre}
              onChange={e => setGenre(e.target.value)}
              placeholder="e.g. Action, Drama"
              className="input-field"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
            <select
              className="input-field"
              value={rating}
              onChange={e => setRating(e.target.value === '' ? '' : Number(e.target.value))}
            >
              <option value="">No rating</option>
              {[1,2,3,4,5].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Poster (Optional)</label>
            <div className="flex gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex-1"
                disabled={uploading}
              />
              {uploading && <span className="text-blue-600">⏳ Uploading...</span>}
            </div>
            {posterImageUrl && (
              <div className="mt-4">
                <img src={posterImageUrl} alt="Preview" className="w-40 h-32 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => setPosterImageUrl('')}
                  className="text-red-600 text-sm mt-2"
                >
                  Remove Image
                </button>
              </div>
            )}
            <input
              type="url"
              value={posterImageUrl}
              onChange={e => setPosterImageUrl(e.target.value)}
              placeholder="Or paste poster URL directly"
              className="input-field mt-2"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary flex-1" disabled={saving}>
              {saving ? '💾 Saving...' : '💾 Save Changes'}
            </button>
            <Link href="/">
              <button type="button" className="btn-secondary flex-1">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
