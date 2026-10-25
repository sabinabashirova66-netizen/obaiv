import { API_URL } from './types'
import type { Ad } from './types'

type Props = {
  ads: Ad[]
}

export default function AdList({ ads }: Props) {
  if (ads.length === 0) {
    return <p>Объявлений пока нет</p>
  }

  return (
    <div className="list">
      {ads.map((ad) => (
        <div className="card" key={ad.id}>
          {/* Картинку показываем, только если она есть */}
          {ad.image_url && <img src={API_URL + ad.image_url} alt={ad.title} />}
          <h3>{ad.title}</h3>
          <p>{ad.description}</p>
          <p className="price">{ad.price} ₽</p>
        </div>
      ))}
    </div>
  )
}
