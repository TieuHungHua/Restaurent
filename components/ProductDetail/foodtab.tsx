'use client';

import ProductReview from '@/components/Evaluate/evaluate';
import { Button } from '@/components/ui/button';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const policy = [
    {
        type: "Tiêu chuẩn",
        des: "Chính sách đổi trả áp dụng trong vòng 24 giờ nếu món ăn bị giao sai, không đúng mô tả, hoặc gặp sự cố trong quá trình vận chuyển."

    },
    {
        type: "Bảo vệ khách hàng",
        des: "Nếu món ăn không đúng như hình ảnh hoặc mô tả, quý khách có thể yêu cầu hoàn tiền hoặc đổi món trong vòng 12 giờ kể từ khi nhận hàng."

    },
    {
        type: "Linh hoạt",
        des: "Nhà hàng hỗ trợ đổi trả trong vòng 6 giờ đối với các trường hợp: món ăn sai, thiếu topping hoặc chất lượng không đảm bảo."

    },
    {
        type: "Trung lập",
        des: "Chính sách hoàn tiền / đổi món sẽ được áp dụng nếu khách hàng cung cấp hình ảnh món ăn kèm hóa đơn trong vòng 24 giờ kể từ khi giao hàng."

    },
    {
        type: "Cam kết chất lượng",
        des: "Nếu món ăn không đạt tiêu chuẩn về độ tươi ngon hoặc khác biệt lớn so với mô tả, nhà hàng sẽ hoàn tiền 100 % hoặc đổi món miễn phí."

    }
]

interface FoodTabsProps {
    id: string;
    ratings: string
    description: string;
    ingredients: string;
    ration: number;//khẩu phần
    calo: number;
}
export default function FoodTabs({ id, ratings, description, ingredients, ration, calo }: FoodTabsProps) {
    const [rating, setRating] = useState(ratings); // Rating mặc định
    const [reviews, setReviews] = useState([
        { id: 1, user: 'Khách hàng 1', comment: 'OK', date: '2023-04-05 00:48:02' },
        // Bạn có thể thêm nhiều đánh giá hơn ở đây
    ]);
    const handleAddReview = () => {
        // Logic để thêm đánh giá mới
    };
    return (
        <Tabs defaultValue="description" className="w-full mt-3 ">
            <TabsList className="w-full mb-4">
                <TabsTrigger value="description" className='w-[110px]'>Mô tả món ăn</TabsTrigger>
                <TabsTrigger value="review" className='w-[110px]'>Đánh giá</TabsTrigger>
                <TabsTrigger value="policy" className='w-[110px]'>Chính sách</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className='bg-white p-10 rounded-xl h-[300px]'>
                <h2 className="text-lg font-semibold mb-5">Sơ lược món ăn :</h2>
                <div className="text-sm text-gray-900 mb-2">
                    {description?.split('.')
                        .filter(step => step.trim() !== '')
                        .map((step, idx) => (
                            <p key={idx} className='p-2 text-[1rem]'>{step.trim()}.</p>
                        ))}
                </div>
                <h3 className="font-semibold">Thành phần :</h3>
                <p className="text-sm text-[1rem] text-gray-900 mb-2">
                    {ingredients}
                </p>
                <h3 className="font-semibold"> Khẩu phần :  </h3>
                <p className="text-sm text-[1rem] text-gray-900 mb-2"> {ration} người </p>

                <div>
                    <strong>Năng lượng :</strong> <br />
                    Total Kcal - {calo}
                </div>
                {/* Bạn có thể thêm danh sách nguyên liệu tại đây */}
            </TabsContent>

            <TabsContent value="review" className='bg-white p-10 rounded-xl h-[300px]'>
                <ProductReview />
            </TabsContent>

            <TabsContent value="policy" className='bg-white p-10 rounded-xl h-[300px]'>
                {policy.map((sts_policy, index) => {
                    return (
                        <p key={index} className="text-gray-700 leading-relaxed text-sm m-2" >  {sts_policy.des} ({sts_policy.type})</p>
                    )
                })}
            </TabsContent>
        </Tabs>
    );
}
