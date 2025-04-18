export interface FormNavType {
    id: string,
    title: string,
    url: string
}

interface ProductCardProps {
    image: string
    name: string
    price: number
    oldPrice: number
    discount: string
}

export interface ReviewItem_Param {
    userName: string
    rating: number
    comment: string
    createdAt: Date
    likes: number
    dislikes: number
}