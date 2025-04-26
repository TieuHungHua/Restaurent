import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const FilterPost = () => {
    const categories = [
        { name: "Thực phẩm nhà hàng", count: 1 },
        { name: "Công thức nấu ăn", count: 4 },
        { name: "Công nghệ hiện đại", count: 0 },
        { name: "Sản phẩm", count: 0 },
        { name: "Cảm hứng", count: 0 },
    ];

    return (
        <div className="w-full p-8 bg-white shadow-md rounded-md">
            {/* Search Box */}
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Tìm kiếm từ khóa"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Button className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded">
                    Tìm kiếm
                </Button>
            </div>

            {/* Danh mục */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">Danh mục</h2>
                <ul className="space-y-2">
                    {categories.map((cat, index) => (
                        <li key={index} className="flex justify-between text-gray-700">
                            <span>{cat.name}</span>
                            <span>({cat.count})</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FilterPost
