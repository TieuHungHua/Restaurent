'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Detail_ProduceProps } from '@/lib/interface';
import { Heart, Minus, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'



const DetailProduct = ({ name, costOld, costNew, description, quantity_food, url }: Detail_ProduceProps) => {
    const [quantity, setQuantity] = useState(1);
    const [percentageChange, setPercentageChange] = useState<number | null>(null);
    const handleIncrease = () => setQuantity((prev) => (prev + 1 > quantity_food ? quantity_food : prev + 1));
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    useEffect(() => {
        if (costOld !== 0) {
            const change = ((costNew - costOld) / costOld) * 100;
            setPercentageChange(Math.round(change));
        }
    }, [costNew, costOld]);
    return (

        <Card className="flex flex-row  h-[488px] ">
            <img
                src={url} // Đổi path thành đúng ảnh bạn dùng
                alt={name}
                width={400}
                height={250}
                className="rounded-lg object-cover m-4 h-[400px] w-[400px]"
            />
            <CardContent className="space-y-3 pt-4">
                <p className=' text-2xl font-semibold text-black m-4'>{name}</p>
                <div className="text-sm text-red-500 font-medium ">
                    {percentageChange}%{'  '}
                    <span className="text-lg font-bold text-red-600 mr-1.5"> {costNew},000 VND</span>{' '}
                    <s className="text-gray-400">{costOld},000 VND</s>
                </div>
                <p className="text-sm text-gray-600">
                    {description}
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
