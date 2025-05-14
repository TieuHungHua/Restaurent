// app/orders/page.tsx
"use client";

import { useEffect, useState } from "react";
import OrderList from "@/components/listOrder/OrderList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
const OrderPageClient = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<string>("all");
  const updateOrderStatus = async (id: string, state: string) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkODQ5NGVhLTcwOTgtNGQwOS04YWE1LTIwNjZlNDg5NDUwYiIsImVtYWlsIjoic3VwZXJBZG1pbkBleGFtcGxlLmNvbSIsIm5hbWUiOiJTdXBlciBBZG1pbiIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlzQmFuIjpmYWxzZSwiYWRtaW5JZCI6ImY1MzE5NjM5LWIxOWItNDkwZi1hMTE2LWZkYzZmMGRiY2Y2YSIsImd1ZXN0SWQiOm51bGwsImlhdCI6MTc0NzEyMDA0MCwiZXhwIjoxNzQ3MjA2NDQwfQ.4wlsKBrREHnLBHWLg-Trh2S0PyTUsr4JgaLrkoZMSKU";

    try {
      if (status === "all") {
        const res = await fetch(
          `http://localhost:8000/api/v1/order/status/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: state }),
          }
        );
      } else {
        const res = await fetch(
          `http://localhost:8000/api/v1/order/status/${id}?status=${state}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: state }),
          }
        );
      }

      const res = await fetch(
        `http://localhost:8000/api/v1/order/status/${id}?status=${state}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: state }),
        }
      );
      if (!res.ok) {
        throw new Error(`Lỗi cập nhật: ${res.statusText}`);
      }

      const data = await res.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: state } : order
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    }
  };
  useEffect(() => {
    const fetchOrders = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkODQ5NGVhLTcwOTgtNGQwOS04YWE1LTIwNjZlNDg5NDUwYiIsImVtYWlsIjoic3VwZXJBZG1pbkBleGFtcGxlLmNvbSIsIm5hbWUiOiJTdXBlciBBZG1pbiIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlzQmFuIjpmYWxzZSwiYWRtaW5JZCI6ImY1MzE5NjM5LWIxOWItNDkwZi1hMTE2LWZkYzZmMGRiY2Y2YSIsImd1ZXN0SWQiOm51bGwsImlhdCI6MTc0NzEyNzQ0MiwiZXhwIjoxNzQ3MjEzODQyfQ.pvSA7FLW_Upe0K8hBICJ3_Wp_BNGX2wXCouk9nMfV_M";
      const url =
        status === "all"
          ? `http://localhost:8000/api/v1/order`
          : `http://localhost:8000/api/v1/order?status=${status}`;
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        const ordersFromApi = json.data.orders;
        console.log("Response:", ordersFromApi);

        const formatted = ordersFromApi.map((order: any) => ({
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
          listOrder: order.listOrder.map((item: any) => ({
            dishId: item.dishId,
            nameDish: item.nameDish,
            number: item.number,
            url: item.url,
          })),
        }));

        setOrders(formatted);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [status]);

  return (
    <div className="container mx-auto p-5 2xl:px-20 2xl:py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Danh sách đơn hàng
      </h1>
      <Tabs defaultValue="all" className=" flex flex-col text-center p-4">
        <TabsList className="flex justify-center text-center flex-wrap gap-2 mb-4">
          <TabsTrigger
            value="all"
            className={`w-[200px] ${
              status !== "all" ? "cursor-pointer bg-gray-400" : ""
            }`}
            onClick={() => setStatus("all")}
          >
            Tất cả
          </TabsTrigger>

          <TabsTrigger
            value="pending"
            className={`w-[200px] ${
              status !== "pending" ? "cursor-pointer  bg-gray-400" : ""
            }`}
            onClick={() => setStatus("pending")}
          >
            Đang chờ xử lí
          </TabsTrigger>

          <TabsTrigger
            value="confirmed"
            className={`w-[200px] ${
              status !== "confirmed" ? "cursor-pointer bg-gray-400" : ""
            }`}
            onClick={() => setStatus("confirmed")}
          >
            Đã xác nhận
          </TabsTrigger>

          <TabsTrigger
            value="completed"
            className={`w-[200px] ${
              status !== "completed" ? "cursor-pointer bg-gray-400" : ""
            }`}
            onClick={() => setStatus("completed")}
          >
            Đã giao
          </TabsTrigger>

          <TabsTrigger
            value="canceled"
            className={`w-[200px] ${
              status !== "canceled" ? "cursor-pointer bg-gray-400" : ""
            }`}
            onClick={() => setStatus("canceled")}
          >
            Đã hủy
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="bg-[#f3f4f6]">
        <OrderList orders={orders} onClick={updateOrderStatus} />
      </div>
    </div>
  );
};

export default OrderPageClient;
