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
export interface FoodItemProps {
    id: string;
    name: string;
    slug: string;
    description: string;
    priceOld: number;
    priceNew: number;
    quantity: number;
    rating: number;
    type: string;
    image: string;
    fun: (e: React.MouseEvent) => void;
}


export interface FoodDetailProps {
    name: string;
    slug: string;
    description: string;
    priceOld: number;
    priceNew: number;
    quantity: number;
    rating: number;
    type: string;
    image: string;

}
export interface Detail_ProduceProps {
    name: string;
    costOld: number;
    costNew: number;
    description: string;
    quantity_food: number;
    url: string;
}