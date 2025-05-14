'use client'
import OrderCard from '@/components/OrderCard/ordercard';
import { PackageX } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
interface OrderForm {
    id: string;
    createdAt: Date; // ISO date string
    phone: string;
    address: string;
    payment: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'; // bạn có thể mở rộng nếu có thêm trạng thái
    type: 'cash' | 'atm' | 'momo';
    description: string | null;
    nameUser: string;
    email: string;
    note: string;
    listOrder: {
        dishId: string;
        nameDish: string;
        number: number;
        url: string;
        cost: number;
    }[];
}
const Order = () => {
    const { data: session, status } = useSession()

    const [orderItem, setOrderItem] = useState<OrderForm[]>([])

    const fetchOrderData = async () => {
        const token = await session?.user.accessToken
        console.log('token: ', token)
        try {
            const res = await fetch('http://localhost:8000/api/v1/order/guest', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })

            if (!res.ok) {
                alert('Fetch lỗi ở Ordercard')
            }
            const data = await res.json()
            setOrderItem(data.data.orders)
        } catch (error) {
            alert('Fetch lỗi ở Ordercard' + error)
        }
    }
    useEffect(() => {
        if (status === 'authenticated') {
            fetchOrderData();
        }
    }, [status]);


    const handleRenderCOrderCard = (filter: string) => {
        const orderFilter: OrderForm[] = orderItem.filter(item => item.status === filter);
        if (orderFilter.length > 0) {
            return orderFilter.map((item, idx) => (
                <OrderCard
                    key={idx}
                    id={item.id}
                    status={item.status}
                    payment={item.payment}
                    orderDate={item.createdAt}
                    listOrder={item.listOrder}
                />
            ));
        } else {
            return (
                <Empty
                    title="Không có đơn hàng"
                    description="Hãy tạo đơn hàng mới để bắt đầu."
                />
            );
        }
    }


    return (
        <div className="min-h-screen w-full flex justify-center py-8">
            <Tabs defaultValue="all" className="w-[85%] flex flex-col text-center p-4">

                <TabsList className="flex justify-center text-center flex-wrap gap-2 mb-4">
                    <TabsTrigger value="all" className='w-[200px] bg-blue-50 border border-gray-200'>Tất cả</TabsTrigger>
                    <TabsTrigger value="pending" className='w-[200px] bg-blue-50 border border-gray-200'>Đang chờ xử lí</TabsTrigger>
                    <TabsTrigger value="confirmed" className='w-[200px] bg-blue-50 border border-gray-200'>Đã xác nhận</TabsTrigger>
                    <TabsTrigger value="completed" className='w-[200px] bg-blue-50 border border-gray-200'>Đã giao</TabsTrigger>
                    <TabsTrigger value="cancelled" className='w-[200px] bg-blue-50 border border-gray-200'>Đã hủy</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    {orderItem.map((item, idx) => {
                        return (<OrderCard key={idx}
                            id={item.id}
                            status={item.status}
                            payment={item.payment}
                            orderDate={item.createdAt}
                            listOrder={item.listOrder} />)
                    })}
                </TabsContent>

                <TabsContent value="pending">
                    {handleRenderCOrderCard("pending")}
                </TabsContent>

                <TabsContent value="confirmed">
                    {handleRenderCOrderCard("confirmed")}
                </TabsContent>

                <TabsContent value="completed">
                    {handleRenderCOrderCard("completed")}
                </TabsContent>

                <TabsContent value="cancelled">
                    {handleRenderCOrderCard("canceled")}
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Order

interface EmptyProps {
    title: string;
    description?: string;
}

export function Empty({ title, description }: EmptyProps) {
    return (
        <div className="flex flex-col items-center justify-center h-60 text-center text-muted-foreground">
            <PackageX className="w-12 h-12 mb-4" />
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            {description && <p className="mt-2">{description}</p>}
        </div>
    );
}