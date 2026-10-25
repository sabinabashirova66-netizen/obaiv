import { useEffect, useState } from 'react'
import AdForm from './AdForm'
import AdList from './AdList'
import { API_URL } from './types'
import type { Ad } from './types'

export default function App() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Загружаем объявления с сервера
  async function loadAds() {
    try {
      const response = await fetch(`${API_URL}/ads`)
      if (!response.ok) throw new Error('Ошибка сервера')
      const data = await response.json()
      setAds(data.items)
      setError('')
    } catch {
      setError('Не удалось загрузить объявления')
    } finally {
      setLoading(false)
    }
  }

  // Загружаем список один раз при открытии страницы
  useEffect(() => {
    loadAds()
  }, [])

  return (
    <div className="container">
      <h1>Доска объявлений</h1>
      <AdForm onAdded={loadAds} />
      <h2>Объявления</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <AdList ads={ads} />}
    </div>
  )
}
