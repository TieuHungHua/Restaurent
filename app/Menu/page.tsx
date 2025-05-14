'use client'
import FilterGroup from '@/components/FilterGroup/filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useCallback, useEffect, useState } from 'react';
import FoodItemCard from '../../components/Menu/foodItemCard';
import { Search } from 'lucide-react';
import { FoodItemProps } from '@/lib/interface';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading/Loading';


const MenuPage: React.FC = () => {
    const { data: session, status } = useSession()
    const [category, setCategory] = useState('Tất cả');
    const [brand, setBrand] = useState('Tất cả');
    const [from, setFrom] = useState(1);
    const [foodSearch, setToFood] = useState('');
    const [dishes, setDishes] = useState<any[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const handleApply = () => { };

    const searchFood = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/v1/dish/search-by-name?name=${foodSearch}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.user.accessToken}`
                    },
                }

            )
            if (!res.ok) {
                throw new Error('Fetch failed: 1 ' + res.status);
            }
            setIsLoading(false)
            const data = await res.json()
            setDishes(data.data)
        } catch (e) {
            alert('Fetch data search error ')
        }
    }
    const fetchDataFood = async () => {
        try {
            setIsLoading(false)
            const response = await fetch(`http://localhost:8000/api/v1/dish/guest?page=${from}&limit=8`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.accessToken}`
                },

            })
            if (!response.ok) {
                throw new Error('Fetch failed: 2 ' + response.status);
            }
            setIsLoading(true)
            const data = await response.json();
            setDishes(data.data.dishes)
            setTotalPage(data.data.totalPages)
            window.scrollTo({ top: 0, behavior: 'smooth', });
        } catch (error) {
            setIsLoading(false)
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }
    useEffect(() => {
        if (status === 'authenticated') {
            fetchDataFood();
        }
    }, [status])

    const handleAddToCart = async (id: string) => {
        try {

            const response = await fetch('http://localhost:8000/api/v1/cart/add-dish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.accessToken}`
                },
                body: JSON.stringify({
                    dishId: id,
                    number: 1,
                }),

            })
            if (!response.ok) {
                throw new Error('Fetch failed: 3 ' + response.status);
            }
            alert("Món ăn đã được thêm!")
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='flex m-h-[150vh' >
            <aside className='w-[320px] p-[20px] border-r-[1px] border-solid #ddd' >
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
                        onChange={(e) => {
                            setToFood(e.target.value)
                        }}
                    />
                    <Search
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <Button onClick={searchFood} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 ml-3 rounded-md">
                        Tìm kiếm
                    </Button>
                </div>
                <div>
                    {dishes.map((dish) => {
                        return (<FoodItemCard
                            key={dish.id}
                            id={dish.id}
                            name={dish.name}
                            slug=""
                            description={dish.description}
                            priceOld={dish.priceOld}
                            priceNew={dish.priceNew}
                            rating={dish.ration}
                            image={dish.url}
                            type={dish.type}
                            quantity={31}
                            fun={(e) => {
                                e.preventDefault();
                                handleAddToCart(dish.id)
                            }}
                        />)
                    })}
                    {isLoading ? (
                        <div className="flex justify-center w-[750px] mt-6 space-x-2">
                            {/* Trang đầu */}
                            {from > 1 && (
                                <button
                                    onClick={() => setFrom(1)} // Đặt currentPage = 1 khi nhấn nút Trang đầu
                                    disabled={from === 1}
                                    className=" select-none cursor-pointer px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-default"
                                >
                                    Đầu
                                </button>
                            )}
                            {/* Trang trước */}
                            <button
                                onClick={() => setFrom((prev) => Math.max(prev - 1, 1))}
                                disabled={from === 1}
                                className=" select-none cursor-pointer px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-default"
                            >
                                Trước
                            </button>
                            {/* Hiển thị trang hiện tại */}
                            <span className="px-3 py-1 select-none">{`Trang ${from} / ${totalPage}`}</span>
                            {/* Trang sau */}
                            <button
                                onClick={() =>
                                    setFrom((prev) => Math.min(prev + 1, totalPage))
                                }
                                disabled={from === totalPage}
                                className=" select-none cursor-pointer px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-default"
                            >
                                Sau
                            </button>
                            {/* Trang cuối */}
                            {from < totalPage && (
                                <button
                                    onClick={() => setFrom(totalPage)} // Đặt currentPage = totalPages khi nhấn nút Trang cuối
                                    disabled={from === totalPage}
                                    className=" select-none cursor-pointer px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-default"
                                >
                                    Cuối
                                </button>
                            )}
                        </div>) : (<></>)
                    }
                </div>
            </main>

        </div>
    );
};

export default MenuPage;
