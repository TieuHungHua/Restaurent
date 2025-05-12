'use client'
import DetailProduct from '@/components/ProductDetail/detail_product'
import FoodTabs from '@/components/ProductDetail/foodtab'
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

import React, { useEffect, useState } from 'react'

const page = () => {

    const params = useParams()
    const id = params?.id as string;
    const { data: session } = useSession()
    const [food, setFood] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {

            try {
                const response = await fetch(`http://localhost:8000/api/v1/dish/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.user.accessToken}`
                    },
                });

                if (!response.ok) {
                    console.error('Lỗi lấy chi tiết món ăn:', response.status);
                    return;
                }

                const data = await response.json();
                console.log(data.data)
                setFood(data.data);
            } catch (e) {
                console.error('Lỗi fetch:', e);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getProduct();
        }
    }, [id]);

    return (
        <main className="flex flex-col justify-start w-[75%]   bg-gray-100 p-6">
            <DetailProduct
                name={food?.name}
                costOld={food?.priceOld}
                costNew={food?.priceNew}
                description={food?.description}
                quantity_food={food?.quantity}
                url={food.url}

            />
            <FoodTabs
                id={''}
                ratings={food.avgRating}
                description={food?.FoodChart}
                ingredients={food?.ingredients}
                ration={food?.ration}
                calo={food?.calo}
            />
        </main>
    )
}

export default page
