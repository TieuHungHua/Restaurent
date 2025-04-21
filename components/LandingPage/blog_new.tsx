import Image from 'next/image';
import React from 'react'
import { Card, CardContent } from '../ui/card';
interface FoodCardProps {
    imageUrl: string;
    time: string;
    date: string;
    title: string;
}



const ListPost = () => {
    return (
        <div className='w-full'>
            <p className='text-center text-2xl font-semibold text-black m-4'>Bài viết nổi bật</p>
            <div className="flex items-center w-[90%] min-h-[70vh] p-4 overflow-x-scroll m-auto">
                <div className="flex gap-x-5 pl-5">

                    <Post
                        key={1}
                        imageUrl="https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg"  // đổi sang link ảnh bạn muốn
                        time="08:44"
                        date="29-12-2024"
                        title="Tuyển tập 8 món xào đơn giản giúp tiết kiệm thời gian"
                    />
                    <Post
                        key={2}
                        imageUrl="https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg"  // đổi sang link ảnh bạn muốn
                        time="08:44"
                        date="29-12-2024"
                        title="Tuyển tập 8 món xào đơn giản giúp tiết kiệm thời gian"
                    />
                    <Post
                        key={3}
                        imageUrl="https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg"  // đổi sang link ảnh bạn muốn
                        time="08:44"
                        date="29-12-2024"
                        title="Tuyển tập 8 món xào đơn giản giúp tiết kiệm thời gian"
                    />
                    <Post
                        key={4}
                        imageUrl="https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg"  // đổi sang link ảnh bạn muốn
                        time="08:44"
                        date="29-12-2024"
                        title="Tuyển tập 8 món xào đơn giản giúp tiết kiệm thời gian"
                    />
                    <Post
                        key={5}
                        imageUrl="https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg"  // đổi sang link ảnh bạn muốn
                        time="08:44"
                        date="29-12-2024"
                        title="Tuyển tập 8 món xào đơn giản giúp tiết kiệm thời gian"
                    />
                    <Post
                        key={6}
                        imageUrl="https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg"  // đổi sang link ảnh bạn muốn
                        time="08:44"
                        date="29-12-2024"
                        title="Tuyển tập 8 món xào đơn giản giúp tiết kiệm thời gian"
                    />
                    <Post
                        key={7}
                        imageUrl="https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg"  // đổi sang link ảnh bạn muốn
                        time="08:44"
                        date="29-12-2024"
                        title="Tuyển tập 8 món xào đơn giản giúp tiết kiệm thời gian"
                    />
                </div>
            </div>
        </div >
    )
}

export default ListPost

export const Post = ({ imageUrl, time, date, title }: FoodCardProps) => {
    return (
        <Card className="w-[300px]  rounded-lg ml-5 shadow-md px-3.5 transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="relative h-48 w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <CardContent className="p-4 ">
                <div className="text-xs text-amber-500 mb-2 whitespace-nowrap">
                    {time}, {date}
                </div>
                <h2 className="text-base font-semibold text-gray-800 hover:text-amber-500">
                    {title}
                </h2>
            </CardContent>
        </Card>
    )
}


