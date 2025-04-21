import React from 'react'
import DetailProduct from './detail_product'
import FoodTabs from './foodtab'

const DetailProduce = () => {
    return (
        <main className="flex flex-col justify-start w-[75%]   bg-gray-100 p-6">
            <DetailProduct />
            <FoodTabs />
        </main>
    )
}

export default DetailProduce
