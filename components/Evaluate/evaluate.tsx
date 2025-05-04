'use client'

import { useCallback, useEffect, useReducer, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import ReviewItem from "./evaluate_cmt"
import { ReviewItem_Param } from "@/lib/interface"
import { useParams, useRouter } from "next/navigation"


interface ReviewOfFood {
    id: string,
    comment: string,
    value: string,
    createdAt: Date,
    guestname: string,
    isMyEvalte: boolean
}
// export const mockReviews: ReviewItem_Param[] = [

// ]

export default function ProductReview() {
    const params = useParams()
    const id = params?.id as string;
    const token = localStorage.getItem('access_Token')
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState("")
    const [mockReview, setReview] = useState<ReviewOfFood[]>([])
    const [myEvaluate, setMyEvaluate] = useState<ReviewOfFood[]>([])

    useEffect(() => {
        const getEvaluate = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/review/by-dish/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    console.error('Lỗi lấy review món ăn:', response.status);
                    return;
                }
                const data = await response.json();
                const myEvaluates = data.data.filter((review: ReviewOfFood) => review.isMyEvalte === true);
                const otherEvaluates = data.data.filter((review: ReviewOfFood) => review.isMyEvalte === false);
                setReview(otherEvaluates);
                setMyEvaluate(myEvaluates)
            } catch (e) {
                console.error('Lỗi fetch:', e);
            }
        };
        if (id) {
            getEvaluate();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(id, rating.toString(), comment)
        try {
            const response = await fetch("http://localhost:8000/api/v1/review/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    dishId: id,
                    value: rating.toString(),
                    comment: comment
                }),
            });
            if (!response.ok) {
                throw new Error('Gửi đánh giá thất bại');
            }
            const result = await response.json();
            // console.log('Đánh giá đã được gửi:', result);
            setMyEvaluate([result?.data, ...myEvaluate])

            console.log('a', result.data)
        } catch (error) {
            alert('Gửi đánh giá thất bại. Vui lòng thử lại.');
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/review/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Xóa đánh giá thất bại');
            }
            const newMyEvaluate = myEvaluate.filter(item => item.id !== id);
            setMyEvaluate(newMyEvaluate);
        } catch (error) {
            alert('Xóa đánh giá thất bại. Vui lòng thử lại.');
        }

    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm w-full  mx-auto space-y-6">
            <div>
                <h2 className="text-xl font-bold">Tổng quan đánh giá</h2>
                <div className="text-yellow-500 text-3xl font-semibold mt-2">{4.5}/5</div>

            </div>
            {mockReview.map((review, idx) => {
                return <ReviewItem
                    key={review.id}
                    my={review.isMyEvalte}
                    creatAt={review.createdAt}
                    name={review.guestname}
                    rating={Number(review.value)}
                    cmt={review.comment}
                    fun={(e) => {
                        e.preventDefault(); // Nếu cần
                        handleDelete(review.id); // Gọi hàm xóa
                    }}
                />

            })}

            <div className={`${myEvaluate.length != 0 ? "hidden" : ''}`}>
                <Label className="block mb-2">Đánh giá chất lượng sản phẩm:</Label>
                <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                        <svg
                            key={star}

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

            <div className={`${myEvaluate.length != 0 ? "hidden" : ''}`} >
                <Label className="block mb-2">Góp ý của bạn:</Label>
                <Textarea
                    placeholder="Nhập góp ý của bạn tại đây..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[100px]"
                />
            </div>

            <Button type="submit" className={`${myEvaluate.length != 0 ? "hidden" : ''}`} >Gửi đánh giá</Button>

            {myEvaluate.length != 0 && (
                <div>
                    <p className="text-xl font-bold pb-1.5">Đánh giá của bạn: </p>
                    {myEvaluate.map((evalu, idx) => {
                        return (
                            <div className="pb-3" key={evalu.id}>
                                <ReviewItem

                                    my={true}
                                    creatAt={evalu.createdAt}
                                    name={evalu.guestname}
                                    rating={Number(evalu.value)}
                                    cmt={evalu.comment}
                                    fun={(e) => {
                                        e.preventDefault(); // Nếu cần
                                        handleDelete(evalu.id); // Gọi hàm xóa
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            )}

        </form>
    )
}
