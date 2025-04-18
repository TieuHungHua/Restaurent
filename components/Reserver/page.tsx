'use client'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { useState } from "react"

const Reserver = () => {
    const [date, setDate] = useState<Date | undefined>()
    return (
        <div className=" bg-cover bg-center bg-no-repeat flex flex-col items-center m-28" style={{ backgroundImage: `url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')` }}>
            <p className="text-orange-500 text-[1.75rem] m-4">Đặt bàn ngay</p>
            <p className='text-center text-2xl font-semibold text-black m-4'>Lên lịch đặt bàn</p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto p-4 bg-amber-50">
                <Input placeholder="Tên của bạn" />
                <Input placeholder="Email của bạn" />
                <Input placeholder="Số điện thoại" />
                <Input placeholder="Số người" type="number" min={1} />

                {/* Date Picker */}
                <Popover>
                    <PopoverTrigger asChild>

                        <button
                            className="flex items-center justify-between w-full border rounded-md p-2 text-left"
                        >
                            {date ? format(date, "dd/MM/yyyy") : "dd/mm/yyyy"}
                            <CalendarIcon className="w-4 h-4 opacity-50" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {/* Time Picker - bạn có thể dùng input type="time" hoặc thư viện ngoài */}
                <Input type="time" placeholder="Chọn ngày" className="placeholder-gray-400 italic placeholder-opacity-75 border rounded px-3 py-2" />

                <Textarea placeholder="Ghi chú" className="md:col-span-2 min-h-[120px] max-h-[220px] resize-y overflow-auto" />

                <Button className="md:col-span-2 bg-orange-500 hover:bg-orange-600">
                    Đặt bàn ngay
                </Button>
                <p className="text-sm text-gray-600 col-span-2">
                    Khách đặt tiệc hội nghị, liên hoan vui lòng gọi trực tiếp: <span className="text-orange-500 font-semibold">(84) 981 487 6747</span>
                </p>
            </form>

        </div>
    )
}

export default Reserver


// https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500

