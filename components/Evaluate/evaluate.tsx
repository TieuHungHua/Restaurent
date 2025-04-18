'use client'

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import ReviewItem from "./evaluate_cmt"
import { ReviewItem_Param } from "@/lib/interface"



export const mockReviews: ReviewItem_Param[] = [
    {
        userName: "1",
        rating: 5,
        comment: "OK",
        createdAt: new Date("2025-04-05T03:48:02"),
        likes: 0,
        dislikes: 0
    },
    {
        userName: "2",
        rating: 4,
        comment: "Sản phẩm khá ổn, giao hàng nhanh.",
        createdAt: new Date("2025-04-10T12:30:00"),
        likes: 3,
        dislikes: 1
    },
    {
        userName: "3",
        rating: 3,
        comment: "Chất lượng trung bình, chưa hài lòng lắm.",
        createdAt: new Date("2025-04-12T15:45:22"),
        likes: 1,
        dislikes: 2
    },
    {
        userName: "4",
        rating: 5,
        comment: "Rất tuyệt vời, sẽ ủng hộ lần sau!",
        createdAt: new Date("2025-04-14T09:18:45"),
        likes: 5,
        dislikes: 0
    }
]

export default function ProductReview() {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(`Đánh giá: ${rating} sao`)
        console.log(`Góp ý: ${comment}`)
        // ở đây có thể gọi API hoặc xử lý form
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm w-full  mx-auto space-y-6">
            <div>
                <h2 className="text-xl font-bold">Tổng quan đánh giá</h2>
                <div className="text-yellow-500 text-3xl font-semibold mt-2">{rating}/5</div>

            </div>
            {mockReviews.map((review, idx) => {
                return <ReviewItem key={idx} comment={review} />
            })}

            <div>
                <Label className="block mb-2">Đánh giá chất lượng sản phẩm:</Label>
                <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                        <svg
                            key={star}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(star)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill={(hover || rating) >= star ? "#FACC15" : "#E5E7EB"}
                            className="w-8 h-8 cursor-pointer transition-colors"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.91c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.977-2.89a1 1 0 00-1.176 0l-3.977 2.89c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.977-2.89c-.783-.57-.38-1.81.588-1.81h4.91a1 1 0 00.95-.69l1.518-4.674z" />
                        </svg>
                    ))}
                </div>
            </div>

            <div>
                <Label className="block mb-2">Góp ý của bạn:</Label>
                <Textarea
                    placeholder="Nhập góp ý của bạn tại đây..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[100px]"
                />
            </div>

            <Button type="submit" className="w-40">Gửi đánh giá</Button>
        </form>
    )
}
