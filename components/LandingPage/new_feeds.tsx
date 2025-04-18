import React from 'react'
import { Menubar } from '../ui/menubar'
import { MenubarMenu, MenubarTrigger } from '@radix-ui/react-menubar'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { ProductCard } from './New_foods'

const NewFeeds = () => {
    const List_ref = [
        {
            title: "Khai vị",
            key: "Appetizer"
        },
        {
            title: "Món chính",
            key: "Main"
        },
        {
            title: "Canh - Tiềm - Súp",
            key: "Soup"
        },
        {
            title: "Cơm - Mì - Cháo",
            key: "Rice"
        },
        {
            title: "Món ráng miệng",
            key: "Dessert"
        },
        {
            title: "Đồ uống",
            key: "Drink"
        }
    ]
    return (
        <div className='flex flex-col items-center justify-center m-2.5 select-none'>
            <p className='text-orange-500 text-[1.75rem] m-4'>Thực đơn</p>
            <p className='text-center text-2xl font-semibold text-black m-4'>Một số món ăn phổ biến theo thực đơn của nhà hàng</p>

            <div className="flex flex-wrap gap-2 mt-4">
                {List_ref.map((ref) => {
                    return (
                        <Button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:text-white hover:bg-amber-500"
                            key={ref.key}>{ref.title}</Button>
                    )
                })}
            </div>

            <Carousel className="w-full max-w-7xl mt-3.5" >
                <CarouselContent className='  items-center' >
                    <CarouselItem className="basis-1/5 m-1 flex flex-col items-center justify-center"><ProductCard /></CarouselItem>
                    <CarouselItem className="basis-1/5 m-1 flex flex-col items-center justify-center"><ProductCard /></CarouselItem>
                    <CarouselItem className="basis-1/5 m-1 flex flex-col items-center justify-center"><ProductCard /></CarouselItem>
                    <CarouselItem className="basis-1/5 m-1 flex flex-col items-center justify-center"><ProductCard /></CarouselItem>
                    <CarouselItem className="basis-1/5 m-1 flex flex-col items-center justify-center"><ProductCard /></CarouselItem>
                    <CarouselItem className="basis-1/5 m-1 flex flex-col items-center justify-center"><ProductCard /></CarouselItem>
                    <CarouselItem className="basis-1/5 m-1 flex flex-col items-center justify-center"><ProductCard /></CarouselItem>
                    <CarouselItem className="basis-1/5 m-1 flex flex-col items-center justify-center"><ProductCard /></CarouselItem>
                    <CarouselItem className="basis-1/5 m-1 flex flex-col items-center justify-center"><ProductCard /></CarouselItem>
                    <CarouselItem className="basis-1/5 m-1 flex flex-col items-center justify-center"><ProductCard /></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div >
    )
}

export default NewFeeds

