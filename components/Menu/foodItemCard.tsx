import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Eye, Heart } from "lucide-react";
import Link from 'next/link';
import { FoodItemProps } from '@/lib/interface';


export default function FoodItemCard({
  id,
  name,
  slug,
  description,
  priceOld,
  priceNew,
  quantity,
  rating,
  type,
  image,
  fun
}: FoodItemProps) {
  return (
    <div className="flex w-full max-w-3xl rounded-lg border p-4 shadow-sm bg-white mb-[10px]">
      <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-md">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>

      <div className="flex flex-col justify-between ml-4 flex-grow">
        <div>
          <h2 className="text-orange-600 font-semibold text-lg">{name}</h2>
          <p className="text-sm text-gray-500">{slug}</p>

          <div className="flex gap-2 mt-2 flex-wrap text-xs">
            <span className="bg-gray-200 px-2 py-1 rounded">Đã xác minh</span>
            <span className="bg-gray-200 px-2 py-1 rounded">Số lượng: {quantity}</span>
            <span className="bg-gray-200 px-2 py-1 rounded">{rating} Đánh giá</span>
            <span className="bg-gray-200 px-2 py-1 rounded">{type}</span>
          </div>

          <p className="text-gray-600 text-sm mt-2">{description}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="line-through text-gray-400 text-sm mr-2">
              {priceOld.toLocaleString()},000 VND
            </span>
            <span className="text-orange-500 font-bold text-lg">
              {priceNew.toString()},000 VND
            </span>
          </div>

          <div className="flex gap-2">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold" onClick={fun}>
              Thêm vào giỏ hàng
            </Button>
            <Button variant="outline" size="icon">
              <Link href={`/Menu/${id}`} >
                <Eye size={18} />
              </Link>
            </Button>
            <Button variant="outline" size="icon">
              <Heart size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
