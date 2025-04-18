import React from 'react'
import { Mail, MapPin, Phone, Clock, Facebook, Twitter, Globe, Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white px-8 py-10 relative mt-15">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Về chúng tôi */}
                <div>
                    <h3 className="font-bold mb-3">Về chúng tôi</h3>
                    <p className="text-sm mb-3">
                        Gangster Restaurant luôn bảo đảm về chất lượng cũng như an toàn thực phẩm.
                    </p>
                    <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2">
                            <MapPin size={16} /> Kí túc xá khu B, Đại học Quốc gia, Đông Hòa, Dĩ An, Bình Dương
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={16} /> tuonglinhleng@gmail.com
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone size={16} /> (84) 32-950-8683
                        </li>
                        <li className="flex items-center gap-2">
                            <Clock size={16} /> Các ngày trong tuần 7:00am - 22:00pm
                        </li>
                    </ul>
                </div>

                {/* Chính sách */}
                <div>
                    <h3 className="font-bold mb-3">Chính sách</h3>
                    <ul className="text-sm space-y-2">
                        <li>- Điều khoản sử dụng</li>
                        <li>- Chính sách bảo mật</li>
                        <li>- Chính sách vận chuyển</li>
                        <li>- Chính sách An toàn thực phẩm</li>
                        <li>- Chính sách liên hệ</li>
                    </ul>
                </div>

                {/* Instagram Feed */}
                <div>
                    <h3 className="font-bold mb-3">Instagram Feed</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {[...Array(6)].map((_, i) => (
                            <img
                                key={i}
                                src={`https://kagawa.vn/wp-content/uploads/2021/05/do-an-vat-lanh-manh-giau-dinh-duong-1.jpg`}
                                alt={`food ${i}`}
                                className="rounded-md object-cover"
                            />
                        ))}
                    </div>
                </div>

                {/* Logo & Follow */}
                <div className="flex flex-col items-start md:items-end">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-orange-500">🍴 Gangster</h2>
                        <p className="text-sm">Theo dõi nhà hàng qua</p>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <p>Follow us</p>

                        <a href="https://www.facebook.com/lenguyen.tuonglinh.5" target="_blank" rel="noopener noreferrer">
                            <Facebook size={18} className="hover:text-blue-500 transition-colors" />
                        </a>

                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <Twitter size={18} className="hover:text-sky-400 transition-colors" />
                        </a>

                        <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
                            <Globe size={18} className="hover:text-green-400 transition-colors" />
                        </a>

                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram size={18} className="hover:text-pink-500 transition-colors" />
                        </a>
                    </div>
                </div>
            </div>


            <div className="text-center text-xs text-gray-400 mt-10">
                -- Copyright © 2025 Web site | Tieu Hung Hua Coder --
            </div>

        </footer>
    );
}


