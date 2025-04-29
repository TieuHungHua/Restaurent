import OrderCard from '@/components/OrderCard/ordercard';
import { PackageX } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import React from 'react'

const Order = () => {
    return (
        <div className="min-h-screen w-full flex justify-center py-8">
            <Tabs defaultValue="all" className="w-[85%] flex flex-col text-center p-4">

                <TabsList className="flex justify-center text-center flex-wrap gap-2 mb-4">
                    <TabsTrigger value="all" className='w-[200px]'>Tất cả</TabsTrigger>
                    <TabsTrigger value="processing" className='w-[200px]'>Đang chờ xử lí</TabsTrigger>
                    <TabsTrigger value="confirmed" className='w-[200px]'>Đã xác nhận</TabsTrigger>
                    <TabsTrigger value="delivered" className='w-[200px]'>Đã giao</TabsTrigger>
                    <TabsTrigger value="canceled" className='w-[200px]'>Đã hủy</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                </TabsContent>

                <TabsContent value="processing">
                    <OrderCard />
                    <OrderCard />
                </TabsContent>

                <TabsContent value="confirmed">
                    <OrderCard />
                </TabsContent>

                <TabsContent value="delivered">
                    <OrderCard />
                </TabsContent>

                <TabsContent value="canceled">
                    <Empty
                        title="Không có đơn hàng"
                        description="Hãy tạo đơn hàng mới để bắt đầu."
                    />
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