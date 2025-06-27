export interface Course {
  id: string
  name: string
  displayCategory: string
  imageUrl: string
  startDateTime: number
  endDateTime: number
  price: number
  ageRestriction: string
  status: string
}

export interface CartItem extends Course {
  quantity: number
}
