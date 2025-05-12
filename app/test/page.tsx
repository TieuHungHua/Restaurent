// app/orders/page.tsx

import React from "react";
import OrderList from "@/components/listOrder/OrderList"; // import OrderList để hiển thị danh sách đơn hàng

const orders: Order[] = [
  {
    id: "order001",
    createdAt: "2025-05-10T10:30:00Z",
    phone: "0987654321",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    nameUser: "Nguyễn Văn A",
    email: "a.nguyen@example.com",
    note: "Giao giờ trưa",
    payment: 250,
    status: "pending", // Chờ xử lý
    type: "Thanh toán khi nhận hàng",
    description: "Khách hàng thân thiết",
    orderAndDish: [
      {
        dishId: "dish001",
        dish: {
          name: "Phở bò",
          url: "https://example.com/pho-bo",
        },
        number: 1,
      },
      {
        dishId: "dish002",
        dish: {
          name: "Gà rán",
          url: "https://example.com/ga-ran",
        },
        number: 2,
      },
    ],
  },
  {
    id: "order002",
    createdAt: "2025-05-10T11:00:00Z",
    phone: "0987654322",
    address: "456 Đường Nguyễn Trãi, Quận 5, TP.HCM",
    nameUser: "Trần Thị B",
    email: "b.tran@example.com",
    note: "Giao muộn chút",
    payment: 300,
    status: "completed", // Hoàn thành
    type: "Thanh toán khi nhận hàng",
    description: "Đơn hàng khẩn",
    orderAndDish: [
      {
        dishId: "dish003",
        dish: {
          name: "Bánh mì kẹp thịt",
          url: "https://example.com/banh-mi",
        },
        number: 3,
      },
    ],
  },
];

// Định nghĩa kiểu dữ liệu cho order và dish
interface Dish {
  dishId: string;
  nameDish: string;
  number: number;
  url: string;
}

interface Order {
  id: string;
  createdAt: string;
  phone: string;
  address: string;
  nameUser: string;
  email: string;
  note: string;
  payment: number;
  status: string;
  type: string;
  description: string;
  orderAndDish: Array<{
    dishId: string;
    dish: { name: string; url: string };
    number: number;
  }>;
}

// Định dạng lại orders thành dữ liệu cần hiển thị
const formattedOrders = orders.map((order: Order) => ({
  id: order.id,
  createdAt: order.createdAt,
  phone: order.phone,
  address: order.address,
  nameUser: order.nameUser,
  email: order.email,
  note: order.note,
  payment: order.payment,
  status: order.status,
  type: order.type,
  description: order.description,
  listOrder: order.orderAndDish.map((item) => ({
    dishId: item.dishId,
    nameDish: item.dish.name,
    number: item.number,
    url: item.dish.url,
  })),
}));

const Page = () => {
  return (
    <div className="container mx-auto p-5 2xl:px-20 2xl:py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Danh sách đơn hàng
      </h1>
      {/* Hiển thị danh sách đơn hàng */}
      {/* Gọi component OrderList và truyền dữ liệu orders vào */}
      {/* <OrderList orders={orders} /> */}
      {/* Sử dụng dữ liệu đã định dạng */}
      <OrderList orders={formattedOrders} />;
    </div>
  );
};

export default Page;
