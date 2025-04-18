import React from 'react'
import { Menubar } from '../ui/menubar'
import { MenubarMenu, MenubarTrigger } from '@radix-ui/react-menubar'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

const NewFoods = () => {
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
            <p className='text-center text-2xl font-semibold text-black m-4'>Món ăn mới</p>

            <Carousel className="w-full max-w-7xl mt-3.5 " >
                <CarouselContent  >
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

export default NewFoods


export function ProductCard() {
    return (
        <div className="w-[190px] rounded-xl overflow-hidden bg-white shadow-md transition-transform duration-500 ease-out hover:scale-105">
            <img src={"https://file.vfo.vn/hinh/2016/08/hinh-anh-mon-an-ngon-pho-2.jpg"} alt={"Phở"} className="w-full h-[160px] object-cover" />
            <div className="p-2">
                <p className="text-sm font-medium truncate">Phở</p>
                <div className="flex gap-1 items-baseline mt-1 justify-around">
                    <span className="text-red-500 text-[0.75rem] font-semibold">- 10%</span>
                    <span className="text-orange-500 text-sm font-bold">
                        90.000 VND
                    </span>
                </div>
                <span className="line-through text-xs text-gray-400">
                    100.000 VND
                </span>
            </div>
            <div className='flex justify-end'>
                <Button className='m-2 w-full h-7 text-[0.85rem] bg-amber-500 text-white  [clip-path:polygon(0%_0%,95%_0%,100%_50%,95%_100%,0%_100%)]'>Xem chi tiết</Button>
            </div>
        </div>
    )
}