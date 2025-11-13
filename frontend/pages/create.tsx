import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { uploadToCloudinary } from '../lib/cloudinary'

export default function Create() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const url = await uploadToCloudinary(file)
      setImageUrl(url)
    } catch (err) {
      alert('Failed to upload image: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !description.trim()) {
      alert('Name and Description are required')
      return
    }

    try {
      setSaving(true)
      const res = await fetch(`${apiUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, imageUrl: imageUrl || null }),
      })

      if (res.ok) {
        router.push('/')
      } else {
        alert('Failed to create post')
      }
    } catch (err) {
      alert('Error: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">✍️ Create New Post</h1>

        <form onSubmit={handleSubmit} className="card">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Post Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter post name"
              className="input-field"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter post description"
              className="input-field h-32 resize-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Image (Optional)</label>
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
            {imageUrl && (
              <div className="mt-4">
                <img src={imageUrl} alt="Preview" className="w-40 h-32 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="text-red-600 text-sm mt-2"
                >
                  Remove Image
                </button>
              </div>
            )}
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="Or paste image URL directly"
              className="input-field mt-2"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary flex-1" disabled={saving}>
              {saving ? '💾 Saving...' : '💾 Create Post'}
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
