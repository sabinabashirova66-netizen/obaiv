import { useState } from 'react'
import type { FormEvent } from 'react'
import { API_URL } from './types'

type Props = {
  onAdded: () => void
}

export default function AdForm({ onAdded }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [fileKey, setFileKey] = useState(0) // меняем key, чтобы очистить поле файла
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')

    // Content-Type не ставим вручную: браузер сам добавит boundary
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)
    if (image) formData.append('image', image)

    try {
      const response = await fetch(`${API_URL}/ads`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) throw new Error('Ошибка сервера')

      // Очищаем форму и обновляем список
      setTitle('')
      setDescription('')
      setPrice('')
      setImage(null)
      setFileKey(fileKey + 1)
      onAdded()
    } catch {
      setError('Не удалось отправить объявление')
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Цена"
        min="0"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        key={fileKey}
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />
      <button type="submit" disabled={sending}>
        {sending ? 'Отправка...' : 'Отправить'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
