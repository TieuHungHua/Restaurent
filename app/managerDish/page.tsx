"use client";

import { useEffect, useState } from "react";

interface Dish {
  id: string;
  name: string;
  url: string;
  type: string;
  createdAt: string;
  priceOld: number;
  priceNew: number;
  FoodChart: string;
  description: string;
  ration: number;
  calo: number;
  ingredients: string;
  updateBy: string;
  brand: string;
}

export default function ManagerDishPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formValues, setFormValues] = useState<Partial<Dish>>({});
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkODQ5NGVhLTcwOTgtNGQwOS04YWE1LTIwNjZlNDg5NDUwYiIsImVtYWlsIjoic3VwZXJBZG1pbkBleGFtcGxlLmNvbSIsIm5hbWUiOiJTdXBlciBBZG1pbiIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlzQmFuIjpmYWxzZSwiYWRtaW5JZCI6ImY1MzE5NjM5LWIxOWItNDkwZi1hMTE2LWZkYzZmMGRiY2Y2YSIsImd1ZXN0SWQiOm51bGwsImlhdCI6MTc0NzEyMDA0MCwiZXhwIjoxNzQ3MjA2NDQwfQ.4wlsKBrREHnLBHWLg-Trh2S0PyTUsr4JgaLrkoZMSKU";

  const fetchDishes = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/dish?page=${currentPage}&limit=5`
      );
      const data = await res.json();
      setDishes(data.data.dishes || []);
      setTotalPages(data.data.totalPages || 1);
    } catch (err) {
      console.error("Lỗi fetch dishes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa món này?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/api/v1/dish/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Đã xóa thành công!");
        setDishes((prev) => prev.filter((dish) => dish.id !== id));
      } else {
        const errorData = await res.json();
        alert(`Xóa thất bại: ${errorData.message || "Lỗi không xác định"}`);
      }
    } catch (error) {
      console.error("Lỗi khi xóa món:", error);
      alert("Có lỗi xảy ra khi xóa món ăn.");
    }
  };
  const handleSaveUpdate = async () => {
    if (!selectedDish) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/dish/${selectedDish.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formValues),
        }
      );
      console.log(JSON.stringify(formValues));
      if (res.ok) {
        alert("Cập nhật thành công!");
        setShowUpdateModal(false);
        fetchDishes();
      } else {
        const data = await res.json();
        alert(`Cập nhật thất bại: ${data.message || "Lỗi không xác định"}`);
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật món ăn:", err);
      alert("Lỗi khi cập nhật!");
    }
  };

  const handleUpdate = (dish: Dish) => {
    setSelectedDish(dish);
    setFormValues(dish); // đổ dữ liệu vào form
    setShowUpdateModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        name === "priceOld" || name === "priceNew" || name === "ration"
          ? Number(value)
          : value,
    }));
  };

  useEffect(() => {
    fetchDishes();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Quản lý món ăn</h1>

      <table className="w-full border border-gray-300 text-sm h-[470px]">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Hình ảnh</th>
            <th className="border p-2">Tên món</th>
            <th className="border p-2">Loại</th>
            <th className="border p-2">Giá cũ</th>
            <th className="border p-2">Giá mới</th>
            <th className="border p-2">Khẩu phần</th>
            <th className="border p-2">Mô tả</th>
            <th className="border p-2">Thành phần</th>
            <th className="border p-2">Ngày tạo</th>
            <th className="border p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id} className="">
              <td className="border p-1">
                <div className="flex items-center justify-center">
                  {dish.url ? (
                    <img
                      src={dish.url}
                      alt={dish.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span>Không có ảnh</span>
                  )}
                </div>
              </td>
              <td className="border text-center p-2">{dish.name}</td>
              <td className="border text-center p-2">{dish.type}</td>
              <td className="border text-center p-2">{dish.priceOld} 000 đ</td>
              <td className="border text-center p-2">{dish.priceNew} 000 đ</td>
              <td className="border text-center p-2">{dish.ration}</td>
              <td className="border  p-2 w-[15%]">{dish.description}</td>
              <td className="border text-center p-2">{dish.ingredients}</td>
              <td className="border text-center p-2">
                {new Date(dish.createdAt).toLocaleDateString("vi-VN")}
              </td>
              <td className="border p-2 space-x-2 ">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(dish)}
                    className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 h-8 w-20"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => handleDelete(dish.id)}
                    className=" cursor-pointer bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded   cursor-pointer disabled:opacity-50 disabled:cursor-default"
        >
          Trước
        </button>
        <span className="self-center select-none">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50 disabled:cursor-default "
        >
          Sau
        </button>
      </div>

      {/* Modal cập nhật */}
      {showUpdateModal && selectedDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Cập nhật món ăn</h2>

            <div className="space-y-3">
              {/* Name */}
              <div>
                <label className="block font-medium mb-1">Tên món</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* URL */}
              <div>
                <label className="block font-medium mb-1">Link Ảnh</label>
                <input
                  type="text"
                  name="url"
                  value={formValues.url || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* Type */}
              <div>
                <label className="block font-medium mb-1">Loại</label>
                <input
                  type="text"
                  name="type"
                  value={formValues.type || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Price Old */}
              <div>
                <label className="block font-medium mb-1">Giá cũ</label>
                <input
                  type="number"
                  name="priceOld"
                  value={formValues.priceOld || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Price New */}
              <div>
                <label className="block font-medium mb-1">Giá mới</label>
                <input
                  type="number"
                  name="priceNew"
                  value={formValues.priceNew || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Ration */}
              <div>
                <label className="block font-medium mb-1">Khẩu phần</label>
                <input
                  type="number"
                  name="ration"
                  value={formValues.ration || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Calo */}
              <div>
                <label className="block font-medium mb-1">Calo</label>
                <input
                  type="number"
                  name="calo"
                  value={formValues.calo || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-1">Mô tả</label>
                <textarea
                  name="description"
                  value={formValues.description || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="block font-medium mb-1">Thành phần</label>
                <input
                  type="text"
                  name="ingredients"
                  value={formValues.ingredients || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* FoodChart */}
              <div>
                <label className="block font-medium mb-1">Thực đơn</label>
                <input
                  type="text"
                  name="FoodChart"
                  value={formValues.FoodChart || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block font-medium mb-1">Thương hiệu</label>
                <input
                  type="text"
                  name="brand"
                  value={formValues.brand || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* UpdateBy */}

              {/* URL */}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Đóng
              </button>
              <button
                onClick={handleSaveUpdate}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
