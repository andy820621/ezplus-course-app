export interface Course {
  id: number
  name: string
  status: string
  thumbnail: string
  price: number
}

export interface CartItem extends Course {
  quantity: number
}
