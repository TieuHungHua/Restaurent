"use client"; // Thêm dòng này

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isBan: boolean;
  avatar: string | null;
  createdAt: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const fetchUsers = async () => {
    try {
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkODQ5NGVhLTcwOTgtNGQwOS04YWE1LTIwNjZlNDg5NDUwYiIsImVtYWlsIjoic3VwZXJBZG1pbkBleGFtcGxlLmNvbSIsIm5hbWUiOiJTdXBlciBBZG1pbiIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlzQmFuIjpmYWxzZSwiYWRtaW5JZCI6ImY1MzE5NjM5LWIxOWItNDkwZi1hMTE2LWZkYzZmMGRiY2Y2YSIsImd1ZXN0SWQiOm51bGwsImlhdCI6MTc0NzEyMDA0MCwiZXhwIjoxNzQ3MjA2NDQwfQ.4wlsKBrREHnLBHWLg-Trh2S0PyTUsr4JgaLrkoZMSKU";
      const res = await fetch(
        `http://localhost:8000/api/v1/auth/guest?page=${currentPage}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("Fetched users:", data);
      setUsers(data.data.users || []);
      setTotalPages(data.data.totalPages || 1);
    } catch (err) {
      console.error("Lỗi fetch users:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleBanUnban = (userId: any) => {
    // Cập nhật trạng thái người dùng (ví dụ: gọi API hoặc thay đổi state)
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isBan: !user.isBan } : user
      )
    );
  };
  const fetchAdmin = async () => {
    try {
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkODQ5NGVhLTcwOTgtNGQwOS04YWE1LTIwNjZlNDg5NDUwYiIsImVtYWlsIjoic3VwZXJBZG1pbkBleGFtcGxlLmNvbSIsIm5hbWUiOiJTdXBlciBBZG1pbiIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlzQmFuIjpmYWxzZSwiYWRtaW5JZCI6ImY1MzE5NjM5LWIxOWItNDkwZi1hMTE2LWZkYzZmMGRiY2Y2YSIsImd1ZXN0SWQiOm51bGwsImlhdCI6MTc0NzEyMDA0MCwiZXhwIjoxNzQ3MjA2NDQwfQ.4wlsKBrREHnLBHWLg-Trh2S0PyTUsr4JgaLrkoZMSKU";
      const res = await fetch(
        `http://localhost:8000/api/v1/auth/admin?page=${currentPage}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("Fetched users:", data);
      setUsers(data.data.users || []);
      setTotalPages(data.data.totalPages || 1);
    } catch (err) {
      console.error("Lỗi fetch users:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isAdmin) {
      fetchAdmin();
    } else {
      fetchUsers();
    }
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
  }, [currentPage]);

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Danh sách người dùng
      </h2>
      <div className="flex justify-end gap-4 mb-4 items-end ">
        {/* Còn hạn */}
        <div
          className={`px-4 py-2 rounded-lg cursor-pointer text-white ${
            !isAdmin ? "bg-green-500" : "bg-gray-400 hover:bg-green-600"
          }`}
          onClick={() => {
            fetchUsers(); // Gọi hàm fetchUsers để tải lại danh sách người dùng
            setCurrentPage(1); // Đặt lại trang hiện tại về 1
            setIsAdmin(false);
          }}
        >
          Khách hàng
        </div>

        {/* Tất cả */}
        <div
          className={`px-4 py-2 rounded-lg cursor-pointer text-white ${
            isAdmin ? "bg-blue-600" : "bg-gray-400 hover:bg-blue-500"
          }`}
          onClick={() => {
            fetchAdmin();
            setCurrentPage(1); // Đặt lại trang hiện tại về 1
            setIsAdmin(true);

            // Admin sẽ có thể tải lại tất cả các vouchers hoặc làm thêm tác vụ khác
          }}
        >
          Trợ lý
        </div>
      </div>
      <table className="w-full border border-gray-300 ">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Avatar</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center h-fit">
              <td className="border p-2 text-center flex items-center justify-center ">
                {user.avatar ? (
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
              </td>
              <td className="border  p-2">{user.name}</td>
              <td className="border  p-2">{user.email}</td>
              <td className="border  p-2">{user.role}</td>
              <td className="border p-2 text-center align-middle">
                <div className="inline-flex items-center justify-center gap-2">
                  <div
                    className={
                      user.isBan
                        ? "text-red-500  w-20 text-start"
                        : "text-green-500 mr-5  w-20 text-start"
                    }
                  >
                    {user.isBan ? "Bị chặn" : "Hoạt động"}
                  </div>
                  <button
                    onClick={() => handleBanUnban(user.id)}
                    className={`w-16 cursor-pointer px-3 py-1 rounded text-white text-sm ${
                      user.isBan
                        ? "bg-green-500 hover:bg-green-600 ml-5 "
                        : "bg-red-500 hover:bg-red-600 "
                    }`}
                  >
                    {user.isBan ? "Unban" : "Ban"}
                  </button>
                </div>
              </td>
              <td className="border  p-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
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
    </div>
  );
}
