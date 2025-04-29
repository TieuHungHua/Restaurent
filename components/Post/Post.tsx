import { Image } from 'lucide-react'
import React from 'react'
interface PostProps {
    urlImage: string,
    tilte: string,
    date: Date,
    description: string
}


const demo = [
    {
        title: 'Lòng gà xào mướp hương',
        createdAt: "20/04/2025",
        ingredient: " Lòng gà: 2 bộ- Mướp hương: 2 quả- Hành hoa: 2 nhánh- Dầu ăn- Bột nêm, súp, mì chính",
        cb: ' Mướp gọt vỏ, rửa sạch, thái miếng vừa ăn.- Lòng gà sau khi làm sạch ướp gia vị với 1 thìa hạt nêm, hành băm nhỏ.- Phi thơm hành với chút xíu dầu ăn cho lòng gà vào xào chín. Sau đó xúc lòng gà ra đĩa.- Vẫn chảo đó thêm chút dầu ăn cho mướp hương vào xào nhanh tay, nêm chút xíu gia vị.- Cuối cùng cho lòng gà vào xào đảo đều, nêm gia vị vừa miệng.- Thêm chút hành hoa thái nhỏ và chút mì chính'
    }
]



const Post_Detail = () => {
    return (
        <div className="w-full mb-6 bg-amber-50 rounded-xl shadow-lg flex flex-row overflow-hidden">
            <div className="p-4 flex justify-center items-center bg-amber-100">
                <img
                    className="w-[400px] h-[400px] object-cover rounded-lg"
                    src="https://scontent.fhan4-5.fna.fbcdn.net/v/t39.30808-6/473579873_122197852022103167_790182599939989134_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEHbwQNaNfy4gir84xIldkK6VElM4RkNenpUSUzhGQ16S-FDLTLrvAhnMIM9rmUflIC4rliaW6z3R1RItChOAzV&_nc_ohc=BirYVRAce08Q7kNvwH5oBjd&_nc_oc=AdnyqoIRImTHKJ3XYCsbo303xIiHUk067yAuYcXzuKNj23Loh960lKx8eLR_jdnZhg4&_nc_zt=23&_nc_ht=scontent.fhan4-5.fna&_nc_gid=C6lk12Xg8stA5k9_PegL0g&oh=00_AfHSaffkQ1PgHqRHh2aGeSjZG2RxNHr5K6P3M4LE-1AXQg&oe=68155EEF"
                    alt="Hình ảnh món ăn"
                />
            </div>

            <div className="p-6 flex-1">
                {demo.map((x, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="font-bold text-2xl text-amber-800 mb-1">{x.title}</h2>
                        <p className="text-sm text-gray-500 mb-3">🕓 Đăng ngày: {x.createdAt}</p>

                        <h3 className="text-lg font-semibold text-amber-700 mb-2">Nguyên Liệu:</h3>
                        <ul className="list-disc list-inside text-gray-800 mb-4">
                            {x.ingredient.split('-').map((y, i) => (
                                <li key={i}>{y.trim()}</li>
                            ))}
                        </ul>

                        <h3 className="text-lg font-semibold text-amber-700 mb-2">Cách Làm:</h3>
                        <ul className="list-decimal list-inside text-gray-800">
                            {x.cb.split('-').map((y, i) => (
                                <li key={i}>{y.trim()}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default Post_Detail
