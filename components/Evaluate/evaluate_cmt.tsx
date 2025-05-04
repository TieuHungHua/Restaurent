import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { ReviewItem_Param } from "@/lib/interface"
import React from "react"
import { Ephesis } from "next/font/google"

interface ReviewItemProps {
    my: boolean
    creatAt: Date
    name: string
    rating: number
    cmt: string
    fun: (e: React.MouseEvent) => void;
}


const ReviewItem = ({ my, creatAt, name, rating, cmt, fun }: ReviewItemProps) => {
    return (

        <div className="p-4 min-h-[121px] bg-gray-50 rounded-md border space-y-2 ">
            <div className="flex items-center justify-between">
                <p className="font-semibold"> <span className="font-semibold text-gray-500">Khách hàng</span> {name}</p>
                <div className="flex space-x-1">
                    {Array.from({ length: rating }, (_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FACC15" className="w-4 h-4">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.91c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.977-2.89a1 1 0 00-1.176 0l-3.977 2.89c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.977-2.89c-.783-.57-.38-1.81.588-1.81h4.91a1 1 0 00.95-.69l1.518-4.674z" />
                        </svg>
                    ))}
                </div>
            </div>
            <p>{cmt}</p>
            <div className="text-xs text-gray-500">
                Đăng vào lúc: {format(creatAt, "yyyy-MM-dd HH:mm:ss")}
            </div>
            <Button
                variant="ghost"
                className={`p-0 text-red-500 hover:underline text-sm ${my ? '' : 'hidden'}`}
                onClick={fun}
            >
                Xoá đánh giá
            </Button>
        </div>
    )
}
export default ReviewItem