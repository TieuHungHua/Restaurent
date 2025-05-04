'use client'
import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    return (
        <div className='h-[70vh] flex flex-col mt-24 justify-center items-center'>
            <AiOutlineLoading3Quarters className='animate-spin' size={64} />
            <p className="text-xl font-semibold text-orange-700 animate-fade-in-slow mt-3">
                Đang tải dữ liệu...
            </p>

            {/* Custom animation keyframe */}
            <style jsx>{`
        @keyframes fadeInSlow {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-slow {
          animation: fadeInSlow 1.8s ease-out forwards;
        }
      `}</style>
        </div>
    )
}

export default Loading
