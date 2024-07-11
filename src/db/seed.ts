import { Sidebar } from 'lucide-react'
import { type TProduct, db } from '.'
import * as dotenv from 'dotenv'

dotenv.config()

const getRandomPrice = () => {
  const PRICES = [10,20, 30, 40  ,50 , 60 ,  70, 80 ,90 , 100, 110 , 120 , 130 , 140 , 150 , 160, 170 ,180 , 190 , 200 ]
  return PRICES[Math.floor(Math.random() * PRICES.length)]
}

const COLORS = ['white', 'beige', 'blue', 'green', 'purple'] as const
const SIZES = ['S', 'M', 'L'] as const

const seed = async () => {
  const products: TProduct[] = []

  // 3 example products
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < SIZES.length; j++) {
      for (let k = 0; k < COLORS.length; k++) {
        const size = SIZES[j]
        const color = COLORS[k]
        products.push({
          id: `${color}-${size}-${i + 1}`,
          imageId: `/${color}_${i + 1}.png`,
          color,
          name: `${
            color.slice(0, 1).toUpperCase() + color.slice(1)
          } watch `,
          size,
          price: getRandomPrice(),
        })
      }
    }
  }

  const SIZE_MAP = {
    S: 0,
    M: 1,
    L: 2,
  }

  const COLOR_MAP = {
    white: 0,
    beige: 1,
    blue: 2,
    green: 3,
    purple: 4,
  }

  await db.upsert(
    products.map((product) => ({
      id: product.id,
      vector: [COLOR_MAP[product.color], SIZE_MAP[product.size], product.price],
      metadata: product,
    }))
  )
}

seed()
