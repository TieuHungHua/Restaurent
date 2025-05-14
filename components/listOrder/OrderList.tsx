// app/components/listOrder/OrderList.tsx

import React from "react";
import { Button } from "../ui/button";

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
  listOrder: Dish[];
}

interface OrderListProps {
  orders: Order[];
  onClick: (id: string, status: string) => void; // Truyền hàm xử lý cập nhật trạng thái
}

const OrderList = ({ orders, onClick }: OrderListProps) => {
  return (
    <div className="p-4 ">
      {orders.map((order) => (
        <div key={order.id} className="border p-10 rounded-lg mb-8 shadow">
          <div className="grid grid-cols-2 gap-y-4 mb-4">
            <div>
              <strong>Mã đơn:</strong> {order.id}
            </div>
            <div>
              <strong>Thời gian:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div>
              <strong>SĐT:</strong> {order.phone}
            </div>
            <div>
              <strong>Địa chỉ:</strong> {order.address}
            </div>
            {order.nameUser && (
              <div>
                <strong>Khách hàng:</strong> {order.nameUser}
              </div>
            )}
            {order.email && (
              <div>
                <strong>Email:</strong> {order.email}
              </div>
            )}
            <div>
              <strong>Ghi chú:</strong> {order.note || "Không có"}
            </div>
            <div>
              <strong>Loại thanh toán:</strong> {order.type}
            </div>
            <div>
              <strong>Trạng thái đơn:</strong>
              <span
                className={`font-bold ml-1 ${
                  order.status === "pending"
                    ? "text-yellow-500"
                    : order.status === "confirmed"
                    ? "text-blue-500"
                    : order.status === "completed"
                    ? "text-green-500"
                    : order.status === "canceled"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {order.status === "pending"
                  ? "Đang chờ xử lý"
                  : order.status === "confirmed"
                  ? "Đã xác nhận"
                  : order.status === "completed"
                  ? "Hoàn thành"
                  : order.status === "canceled"
                  ? "Đã hủy"
                  : "Trạng thái chưa rõ"}
              </span>
            </div>
            <div>
              <strong>Tổng tiền:</strong> {order.payment}k
            </div>
            <div>
              <strong>Mô tả:</strong> {order.description}
            </div>
          </div>

          <div className="relative flex">
            <div className="flex-1 mt-5">
              {order.status === "pending" && (
                <Button
                  className="bg-green-500 text-white cursor-pointer mr-10"
                  onClick={() => onClick(order.id, "confirmed")}
                >
                  Xác nhận
                </Button>
              )}
              {order.status === "confirmed" && (
                <Button
                  className="bg-green-500 text-white cursor-pointer mr-10"
                  onClick={() => onClick(order.id, "completed")}
                >
                  Hoàn thành
                </Button>
              )}
              {order.status !== "completed" && order.status !== "canceled" && (
                <Button
                  className="bg-red-500 text-white cursor-pointer "
                  onClick={() => onClick(order.id, "canceled")}
                >
                  Hủy
                </Button>
              )}
            </div>
            <div className="flex-1">
              <strong>Món ăn:</strong>
              <ul className="list-disc pl-5">
                {order.listOrder.map((dish) => (
                  <li key={dish.dishId}>
                    {dish.nameDish} - SL: {dish.number}{" "}
                    <a
                      href={dish.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline ml-2"
                    >
                      Xem món
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
