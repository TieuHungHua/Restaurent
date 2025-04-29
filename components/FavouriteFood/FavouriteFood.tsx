import React from 'react'
import { ShoppingCart, Play } from "lucide-react";
import Link from 'next/link';

interface FoodCardProps {
    imageUrl: string;
    name: string;
    description: string;
    quantity: number;
}
const FavouriteFood = ({ imageUrl, name, description, quantity }: FoodCardProps) => {
    return (
        <div className=''>
            <div className="bg-gradient-to-b from-neutral-800 to-neutral-700 rounded-2xl p-4 w-full h-screen shadow-lg flex flex-col items-center text-white">
                <div className="w-24 h-36 overflow-hidden rounded-lg mb-4">
                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-lg font-bold text-center">{name}</h2>
                <p className="text-sm text-neutral-300 mt-1 text-center">{description}</p>
                <p className="text-xs text-neutral-400 mt-2">{quantity} món</p>

                <div className="flex gap-3 mt-4">
                    <button className="flex items-center gap-2 bg-white text-black font-semibold py-1 px-4 rounded-full text-sm hover:bg-neutral-200">
                        <Link href={"/"} className="w-4 h-4" /> Xem món
                    </button>
                    <button className="flex items-center gap-2 bg-neutral-600 text-white py-1 px-4 rounded-full text-sm hover:bg-neutral-500">
                        <ShoppingCart className="w-4 h-4" /> Đặt món
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FavouriteFood
