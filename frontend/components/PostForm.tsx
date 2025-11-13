'use client'

import React, { useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Label } from './ui/Label'
import { uploadToCloudinary } from '@/lib/cloudinary'

type Props = {
  initial?: { name: string; description: string; imageUrl?: string | null }
  onSave: (data: { name: string; description: string; imageUrl?: string | null }) => Promise<void>
}

export default function PostForm({ initial, onSave }: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(initial?.imageUrl ?? null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !description.trim()) {
      setError('Name and description are required')
      return
    }
    setLoading(true)
    try {
      await onSave({ name: name.trim(), description: description.trim(), imageUrl })
    } catch (err) {
      setError((err as Error).message || 'Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)
      setError('')
      const url = await uploadToCloudinary(file)
      setImageUrl(url)
    } catch (err) {
      setError((err as Error).message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6">
        <Label className="block mb-2 text-base font-semibold">Post Name *</Label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter post name..."
          disabled={loading}
          required
        />
      </div>

      <div className="mb-6">
        <Label className="block mb-2 text-base font-semibold">Description *</Label>
        <textarea
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:opacity-50 min-h-32"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter post description..."
          disabled={loading}
          required
        />
      </div>

      <div className="mb-6">
        <Label className="block mb-2 text-base font-semibold">Image (Optional)</Label>
        <p className="text-sm text-slate-600 mb-3">Upload from your device or provide a URL</p>

        {/* File upload */}
        <div className="mb-4 p-4 border-2 border-dashed border-slate-300 rounded-lg">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading || loading}
            className="w-full"
          />
          {uploading && <p className="text-sm text-slate-500 mt-2">Uploading...</p>}
        </div>

        {/* URL input */}
        <Input
          value={imageUrl ?? ''}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="Or paste image URL..."
          disabled={loading}
          type="url"
        />

        {/* Image preview */}
        {imageUrl && (
          <div className="mt-4">
            <img
              src={imageUrl}
              alt="Preview"
              className="max-w-xs max-h-48 rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading || uploading}>
          {loading ? 'Saving...' : 'Save Post'}
        </Button>
      </div>
    </form>
  )
}
