import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CartItemProps {
    imageUrl: string;
    name: string;
    price: number;
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    onDelete: () => void;
}

export const CartItem = ({ imageUrl, name, price, quantity, onQuantityChange, onDelete }: CartItemProps) => {
    return (
        <Card className="flex justify-between items-center p-4 mb-4 shadow-sm">
            <div className="flex items-center gap-4 ">
                <div className="relative w-20 h-20">
                    <Image src={imageUrl} alt={name} fill className="object-cover rounded-md" />
                </div>
                <div>
                    <h2 className="font-semibold text-base">{name}</h2>
                    <p className="text-sm text-muted-foreground">Giá: {price.toLocaleString()} VND</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Input
                    type="number"
                    min={1}
                    value={quantity}
                    className="w-16"
                    onChange={(e) => onQuantityChange(Number(e.target.value))}
                />
                <p className="font-semibold">{(price * quantity).toLocaleString()} VND</p>
                <Link href="/ProductDetail" className="text-red-500 text-sm hover:underline">Chi tiết</Link>
                <Button variant="ghost" onClick={onDelete} className="text-red-500 text-sm">Xoá</Button>
            </div>
        </Card>
    )
}