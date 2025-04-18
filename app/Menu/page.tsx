'use client'
import FilterGroup from '@/components/FilterGroup/filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import FoodItemCard from './foodItemCard';
import { Search } from 'lucide-react';


const MenuPage: React.FC = () => {
    const [category, setCategory] = useState('Tất cả');
    const [brand, setBrand] = useState('Tất cả');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleApply = () => {

    };
    return (
        <div style={{ display: 'flex', minHeight: '150vh' }}>

            <aside style={{ width: '320px', padding: '20px', borderRight: '1px solid #ddd', }}>
                <FilterGroup
                    title="Danh mục"
                    options={['Tất cả', 'Khai vị', 'Món chính', 'Canh - Tiềm - Súp', 'Cơm - Mì - Cháo', 'Bánh trang miệng', 'Đồ uống']}
                    selected={category}
                    onChange={setCategory}
                />
                <FilterGroup
                    title="Thương hiệu"
                    options={['Tất cả', 'Món Âu', 'Món Ý', 'Món Nhật', 'Món Việt']}
                    selected={brand}
                    onChange={setBrand}
                />
                <p className='font-bold'>Lọc theo giá</p>
                <div className="flex flex-col gap-2 w-full mt-2">

                    <div className="flex items-center gap-2">
                        <Input type="number" placeholder="Từ" min={0} className="flex-1 border p-2 rounded" />
                        <span>-</span>
                        <Input type="number" placeholder="Đến" min={0} className="flex-1 border p-2 rounded" />
                    </div>

                </div>
                <Button
                    onClick={handleApply}
                    className="bg-[#f16320] text-white py-2 border-none cursor-pointer rounded font-bold mt-5 w-full"
                >
                    Áp dụng
                </Button>
            </aside>
            <main style={{ flex: 1, padding: '20px', marginBottom: '10px' }}>
                <div className="flex flex-row relative w-full max-w-3xl mb-5 ">
                    <Input
                        type="text"
                        placeholder="Tìm món ăn, bài viết..."
                        className="pl-10"
                    />
                    <Search
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 ml-3 rounded-md">
                        Tìm kiếm
                    </Button>
                </div>
                <div>
                    <FoodItemCard
                        name="Cơm chiên hải sản"
                        slug="com-chien-hai-san"
                        description="Cơm chiên hải sản mang đến hương vị đặc sắc khi dùng nguyên liệu chính là gạo Basmati - một loại gạo Ấn Độ"
                        priceOld={120000}
                        priceNew={99000}
                        quantity={31}
                        rating={0}
                        type="Món Việt"
                        image="https://cdn.eva.vn/upload/3-2023/images/2023-07-28/com-chien-hai-san-ngon-hap-dan-cach-lam-don-gian-nhat-5-1690517403-179-width605height416.jpg"
                    />
                    <FoodItemCard
                        name="Cơm chiên hải sản"
                        slug="com-chien-hai-san"
                        description="Cơm chiên hải sản mang đến hương vị đặc sắc khi dùng nguyên liệu chính là gạo Basmati - một loại gạo Ấn Độ"
                        priceOld={120000}
                        priceNew={99000}
                        quantity={31}
                        rating={0}
                        type="Món Việt"
                        image="https://cdn.eva.vn/upload/3-2023/images/2023-07-28/com-chien-hai-san-ngon-hap-dan-cach-lam-don-gian-nhat-5-1690517403-179-width605height416.jpg"
                    />
                    <FoodItemCard
                        name="Cơm chiên hải sản"
                        slug="com-chien-hai-san"
                        description="Cơm chiên hải sản mang đến hương vị đặc sắc khi dùng nguyên liệu chính là gạo Basmati - một loại gạo Ấn Độ"
                        priceOld={120000}
                        priceNew={99000}
                        quantity={31}
                        rating={0}
                        type="Món Việt"
                        image="https://cdn.eva.vn/upload/3-2023/images/2023-07-28/com-chien-hai-san-ngon-hap-dan-cach-lam-don-gian-nhat-5-1690517403-179-width605height416.jpg"
                    />
                    <FoodItemCard
                        name="Cơm chiên hải sản"
                        slug="com-chien-hai-san"
                        description="Cơm chiên hải sản mang đến hương vị đặc sắc khi dùng nguyên liệu chính là gạo Basmati - một loại gạo Ấn Độ"
                        priceOld={120000}
                        priceNew={99000}
                        quantity={31}
                        rating={0}
                        type="Món Việt"
                        image="https://cdn.eva.vn/upload/3-2023/images/2023-07-28/com-chien-hai-san-ngon-hap-dan-cach-lam-don-gian-nhat-5-1690517403-179-width605height416.jpg"
                    />
                    <FoodItemCard
                        name="Cơm chiên hải sản"
                        slug="com-chien-hai-san"
                        description="Cơm chiên hải sản mang đến hương vị đặc sắc khi dùng nguyên liệu chính là gạo Basmati - một loại gạo Ấn Độ"
                        priceOld={120000}
                        priceNew={99000}
                        quantity={31}
                        rating={0}
                        type="Món Việt"
                        image="https://cdn.eva.vn/upload/3-2023/images/2023-07-28/com-chien-hai-san-ngon-hap-dan-cach-lam-don-gian-nhat-5-1690517403-179-width605height416.jpg"
                    />
                </div>
            </main>

        </div>
    );
};

export default MenuPage;
