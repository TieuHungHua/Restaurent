"use client";

import React, { useEffect, useState } from "react";

const VoucherPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isAdd, setIsAdd] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [newVoucher, setNewVoucher] = useState<any>({
    title: "",
    code: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    discount: 0,
  });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkODQ5NGVhLTcwOTgtNGQwOS04YWE1LTIwNjZlNDg5NDUwYiIsImVtYWlsIjoic3VwZXJBZG1pbkBleGFtcGxlLmNvbSIsIm5hbWUiOiJTdXBlciBBZG1pbiIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlzQmFuIjpmYWxzZSwiYWRtaW5JZCI6ImY1MzE5NjM5LWIxOWItNDkwZi1hMTE2LWZkYzZmMGRiY2Y2YSIsImd1ZXN0SWQiOm51bGwsImlhdCI6MTc0NzEwMzU5NCwiZXhwIjoxNzQ3MTg5OTk0fQ.FEP9dmUNeKpssI62ox_okBJbQ1Jv68EyS-f9VXEOCZc"; // Giả sử bạn lưu token trong localStorage

  const fetchAllVouchers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/voucher?page=${currentPage}&limit=6`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không thể tải dữ liệu.");
      }

      const data = await response.json();
      setVouchers(data.data.vouchers);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  const fetchValidVouchers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/voucher/valid?page=${currentPage}&limit=6`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không thể tải dữ liệu.");
      }

      const data = await response.json();
      setVouchers(data.data.vouchers);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  const addVoucher = async (voucher: any) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/voucher/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voucher),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi thêm voucher.");
      }

      alert("Thêm voucher thành công!");
      setIsAdd(false);
      setNewVoucher({
        title: "",
        code: "",
        description: "",
        dateStart: "",
        dateEnd: "",
        discount: 0,
      });
      if (isValid) {
        fetchValidVouchers(); // Tải lại danh sách vouchers
      } else {
        fetchAllVouchers(); // Tải lại danh sách vouchers
      }
    } catch (error) {
      console.error("Lỗi khi thêm voucher:", error);
    }
  };

  const handleEdit = (voucher: any) => {
    setEditingVoucher(voucher);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa voucher này?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/voucher/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi xóa voucher.");
      }

      alert("Xóa voucher thành công!");
      if (isValid) {
        fetchValidVouchers(); // Tải lại danh sách vouchers
      } else {
        fetchAllVouchers(); // Tải lại danh sách vouchers
      } // Tải lại danh sách vouchers
    } catch (err) {
      console.error("Lỗi khi xóa voucher:", err);
    }
  };

  const updateVoucher = async (voucher: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/voucher/${voucher.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(voucher),
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật voucher.");
      }

      alert("Cập nhật voucher thành công!");
      setEditingVoucher(null);
      if (isValid) {
        fetchValidVouchers(); // Tải lại danh sách vouchers
      } else {
        fetchAllVouchers(); // Tải lại danh sách vouchers
      } // Tả // Tải lại danh sách vouchers
    } catch (err) {
      console.error("Lỗi khi cập nhật voucher:", err);
    }
  };

  useEffect(() => {
    setIsClient(true); // Set isClient thành true khi mã chạy trên client
    if (isValid) {
      fetchValidVouchers(); // Tải lại danh sách vouchers
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      fetchAllVouchers(); // Tải lại danh sách vouchers
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  if (!isClient) {
    return null; // Trả về null hoặc có thể hiển thị loading nếu chưa ở client
  }
  return (
    <>
      {isAdd && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Thêm Voucher</h2>

            {/* Tiêu đề */}
            <input
              type="text"
              value={newVoucher.title}
              onChange={(e) =>
                setNewVoucher({
                  ...newVoucher,
                  title: e.target.value,
                })
              }
              className="w-full p-2 border mb-3"
              placeholder="Tiêu đề"
            />

            {/* Mã */}
            <input
              type="text"
              value={newVoucher.code}
              onChange={(e) =>
                setNewVoucher({ ...newVoucher, code: e.target.value })
              }
              className="w-full p-2 border mb-3"
              placeholder="Mã giảm giá"
            />

            {/* Mô tả */}
            <textarea
              value={newVoucher.description}
              onChange={(e) =>
                setNewVoucher({
                  ...newVoucher,
                  description: e.target.value,
                })
              }
              className="w-full p-2 border mb-3"
              placeholder="Miêu tả"
            />

            {/* Ngày bắt đầu */}
            <label className="block mb-1 font-medium">Ngày bắt đầu</label>
            <input
              type="date"
              value={newVoucher.dateStart.split("T")[0]}
              onChange={(e) =>
                setNewVoucher({
                  ...newVoucher,
                  dateStart: new Date(e.target.value).toISOString(),
                })
              }
              className="w-full p-2 border mb-3"
            />

            {/* Ngày kết thúc */}
            <label className="block mb-1 font-medium">Ngày kết thúc</label>
            <input
              type="date"
              value={newVoucher.dateEnd.split("T")[0]}
              onChange={(e) =>
                setNewVoucher({
                  ...newVoucher,
                  dateEnd: new Date(e.target.value).toISOString(),
                })
              }
              className="w-full p-2 border mb-3"
            />

            {/* Giảm giá */}
            <label className="block mb-1 font-medium">Giảm giá (%)</label>
            <input
              type="number"
              value={newVoucher.discount}
              onChange={(e) => {
                const value = e.target.value;
                setNewVoucher({
                  ...newVoucher,
                  discount: value === "" ? "" : parseInt(value, 10),
                });
              }}
              className="w-full p-2 border mb-3"
              placeholder="Phần trăm giảm giá"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setNewVoucher({
                    title: "",
                    code: "",
                    description: "",
                    dateStart: "",
                    dateEnd: "",
                    discount: 0,
                  });
                  setIsAdd(false); // Đóng modal sau khi thêm thành công
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Hủy
              </button>
              <button
                onClick={() => addVoucher(newVoucher)} // Thêm voucher mới
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 min-h-[80vh] relative">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Danh sách Voucher
        </h1>
        <div></div>
        <div className="flex justify-center mb-6">
          <div
            className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            onClick={() => setIsAdd(true)}
          >
            Thêm Voucher
          </div>
        </div>
        <div className="flex justify-center gap-4 mb-6 absolute top-[73px] right-25">
          <div
            className={`px-4 py-2 rounded-lg cursor-pointer text-white ${
              isValid ? "bg-green-500" : "bg-gray-400 hover:bg-green-600"
            }`}
            onClick={() => {
              setCurrentPage(1); // Đặt lại trang hiện tại về 1

              setIsValid(true);

              fetchValidVouchers();
            }} // Tải lại danh sách vouchers
          >
            Còn hạn
          </div>
          <div
            className={`px-4 py-2 rounded-lg cursor-pointer text-white ${
              !isValid ? "bg-blue-600" : "bg-gray-400 hover:bg-blue-500"
            }`}
            onClick={
              () => {
                setCurrentPage(1); // Đặt lại trang hiện tại về 1
                setIsValid(false);
                fetchAllVouchers();
                window.scrollTo({ top: 0, behavior: "smooth" });
              } // Tải lại danh sách vouchers
            }
          >
            Tất cả
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto container px-20">
          {vouchers?.map((voucher) => {
            const now = new Date();
            const start = new Date(voucher.dateStart);
            const end = new Date(voucher.dateEnd);

            let status = "";
            if (now < start) status = "Sắp diễn ra";
            else if (now > end) status = "Đã hết hạn";
            else status = "Đang diễn ra";

            return (
              <div
                key={voucher.id}
                className="border p-4 rounded-xl shadow hover:shadow-lg transition-all duration-200 bg-white relative "
              >
                <div className="h-[200px] ">
                  <h2 className="text-lg font-semibold mb-2">
                    {voucher.title}
                  </h2>

                  <p>
                    <strong>Mã:</strong>{" "}
                    <span className="text-blue-600">{voucher.code}</span>
                  </p>
                  <p>
                    <strong>Miêu tả:</strong> {voucher.description}
                  </p>
                  <p>
                    <strong>Ngày bắt đầu:</strong>{" "}
                    {new Date(voucher.dateStart).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Ngày kết thúc:</strong>{" "}
                    {new Date(voucher.dateEnd).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Giảm giá:</strong>{" "}
                    <span className="text-green-600 font-bold">
                      {voucher.discount}%
                    </span>
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        status === "Đã hết hạn"
                          ? "text-red-600"
                          : status === "Đang diễn ra"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {status}
                    </span>
                  </p>
                </div>

                <div className=" flex justify-start mt-4 gap-4">
                  <button
                    onClick={() => handleEdit(voucher)}
                    className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => handleDelete(voucher.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {editingVoucher && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Cập nhật voucher</h2>
              <input
                type="text"
                value={editingVoucher.title}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    title: e.target.value,
                  })
                }
                className="w-full p-2 border mb-3"
                placeholder="Tiêu đề"
              />

              {/* Mã */}
              <input
                type="text"
                value={editingVoucher.code}
                onChange={(e) =>
                  setEditingVoucher({ ...editingVoucher, code: e.target.value })
                }
                className="w-full p-2 border mb-3"
                placeholder="Mã giảm giá"
              />

              {/* Mô tả */}
              <textarea
                value={editingVoucher.description}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border mb-3"
                placeholder="Miêu tả"
              />

              {/* Ngày bắt đầu */}
              <label className="block mb-1 font-medium">Ngày bắt đầu</label>
              <input
                type="date"
                value={editingVoucher.dateStart.split("T")[0]}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    dateStart: new Date(e.target.value).toISOString(),
                  })
                }
                className="w-full p-2 border mb-3"
              />

              {/* Ngày kết thúc */}
              <label className="block mb-1 font-medium">Ngày kết thúc</label>
              <input
                type="date"
                value={editingVoucher.dateEnd.split("T")[0]}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    dateEnd: new Date(e.target.value).toISOString(),
                  })
                }
                className="w-full p-2 border mb-3"
              />

              {/* Giảm giá */}
              <label className="block mb-1 font-medium">Giảm giá (%)</label>
              <input
                type="number"
                value={editingVoucher.discount}
                onChange={(e) => {
                  const value = e.target.value;
                  setEditingVoucher({
                    ...editingVoucher,
                    discount: value === "" ? "" : parseInt(value, 10),
                  });
                }}
                className="w-full p-2 border mb-3"
                placeholder="Phần trăm giảm giá"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingVoucher(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Hủy
                </button>
                <button
                  onClick={() => updateVoucher(editingVoucher)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {/* Trang đầu */}
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(1)} // Đặt currentPage = 1 khi nhấn nút Trang đầu
            disabled={currentPage === 1}
            className=" select-none cursor-pointer px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-default"
          >
            Đầu
          </button>
        )}
        {/* Trang trước */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className=" select-none cursor-pointer px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-default"
        >
          Trước
        </button>
        {/* Hiển thị trang hiện tại */}
        <span className="px-3 py-1 select-none">{`Trang ${currentPage} / ${totalPages}`}</span>
        {/* Trang sau */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className=" select-none cursor-pointer px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-default"
        >
          Sau
        </button>
        {/* Trang cuối */}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(totalPages)} // Đặt currentPage = totalPages khi nhấn nút Trang cuối
            disabled={currentPage === totalPages}
            className=" select-none cursor-pointer px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-default"
          >
            Cuối
          </button>
        )}
      </div>
    </>
  );
};

export default VoucherPage;
