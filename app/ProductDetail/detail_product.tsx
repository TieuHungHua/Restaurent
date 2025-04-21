'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Minus, Plus } from 'lucide-react';
import React, { useState } from 'react'

const DetailProduct = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <Card className="flex flex-row  h-[488px] ">
            <img
                src="https://heyyofoods.com/wp-content/uploads/2023/12/2-5.jpg" // Đổi path thành đúng ảnh bạn dùng
                alt="Ức gà nướng"
                width={400}
                height={250}
                className="rounded-lg object-cover m-4 h-[400px] w-[400px]"
            />
            <CardContent className="space-y-3 pt-4">
                <p className=' text-2xl font-semibold text-black m-4'>Gà nướng sa tế</p>
                <div className="text-sm text-red-500 font-medium">
                    -3%{' '}
                    <span className="text-lg font-bold text-red-600">195,000 VND</span>{' '}
                    <s className="text-gray-400">225,000 VND</s>
                </div>
                <p className="text-sm text-gray-600">
                    Sử dụng phương pháp nướng cách thủy đặc biệt mang đến hương vị mới mẻ cho món Ức gà đút lò phủ lá chanh vừa giữ được sự mềm dai vừa thấm đều nước sốt hấp dẫn.
                </p>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Số lượng:</span>
                    <div className="flex items-center border rounded-md overflow-hidden">
                        <Button variant="ghost" size="icon" onClick={handleDecrease}>
                            <Minus className="w-4 h-4" />
                        </Button>
                        <div className="px-4">{quantity}</div>
                        <Button variant="ghost" size="icon" onClick={handleIncrease}>
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        Thêm vào giỏ hàng
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Đặt bàn tại đây
                    </Button>
                </div>

                <Button variant="ghost" className="text-gray-500 hover:text-black flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4" /> Thêm vào yêu thích
                </Button>
            </CardContent>
        </Card>
    );
}

export default DetailProduct
