"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaBox,
  FaUser,
  FaUsers,
  FaIdBadge,
} from "react-icons/fa";
import { IoMdClose, IoMdNotificationsOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const InfUser = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [numberread, setNumberRead] = useState(0);
  const [notifications, setNotifications] = useState<any>();
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/notify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
      const data = await response.json();
      console.log("Notifications:", data);
      setNotifications(data.data);
      setNumberRead(
        data.data.filter((item: any) => item.read === false).length
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const markAsRead = async () => {
    try {
      if (numberread > 0) {
        const response = await fetch("http://localhost:8000/api/v1/notify", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to mark notification as read");
        }
        setNumberRead(0);
      }

      setShowNotifications(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === "authenticated") {
      fetchNotifications(); // gọi lần đầu

      interval = setInterval(() => {
        fetchNotifications(); // gọi mỗi 5s
      }, 5000); // 5000ms = 5s
    }

    return () => {
      if (interval) clearInterval(interval); // cleanup khi component unmount
    };
  }, [status]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/v1/auth/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
    } catch (e) {
      console.log("Lỗi khi đăng xuất!", e);
    }
    localStorage.clear();
    router.push("/auth/Login");
  };

  return (
    <div className="flex flex-col items-center text-gray-700 text-sm space-y-1 text-nowrap">
      <div className="flex space-x-4 items-center">
        <MenuItem icon={<FaSearch />} label="Tìm kiếm" />
        <Link href={"/Cart"} className="w-auto">
          <MenuItem icon={<FaShoppingCart />} label="Giỏ hàng" />
        </Link>
        <Link href={"/Order"} className="w-auto">
          <MenuItem icon={<FaBox />} label="Đơn hàng" />
        </Link>

        {/* THÔNG BÁO */}
        <div className="relative">
          <div
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative cursor-pointer flex items-center text-black hover:text-blue-600"
          >
            <IoMdNotificationsOutline className="text-2xl" />
            {numberread > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                {numberread}
              </span>
            )}
          </div>

          {showNotifications && (
            <div className="absolute right-[-120px] mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in-down">
              <div className="flex items-center justify-between p-3 border-b bg-gray-100">
                <div className="font-semibold text-gray-800 text-center w-full">
                  Thông báo
                </div>
                <button
                  onClick={() => markAsRead()}
                  className="text-sm  text-gray-500 hover:text-red-500 "
                >
                  <IoMdClose className="text-xl cursor-pointer" />
                </button>
              </div>

              <ul className="max-h-[340px] overflow-y-auto divide-y">
                {notifications.map((item: any) => (
                  <li
                    key={item.id}
                    className={`${
                      item.read ? "" : "bg-gray-300"
                    } px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all `}
                  >
                    <div className="text-sm text-gray-800 text-wrap">
                      {item.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(item.createdAt).toLocaleString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </li>
                ))}
                {notifications.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-gray-500">
                    Không có thông báo nào.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* TÀI KHOẢN */}
        {!session ? (
          <Link href={"/auth/Login"} className="w-auto">
            <MenuItem icon={<FaUser />} label="Tài khoản" />
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuItem
                icon={<FaUser />}
                label={session.user.name ?? "Tài khoản"}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/Information"} className="flex items-center gap-2">
                  <FaIdBadge /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <FaUsers /> Team
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => signOut()}
              >
                <MdLogout /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="text-xs text-gray-500 space-x-2 mt-1">
        <Link href={"/Favourite"} className="hover:underline">
          Danh sách yêu thích
        </Link>
        <span>|</span>
        <Link href={"/Reserve"} className="hover:underline">
          Đặt bàn
        </Link>
        <span>|</span>
        <span>Chính sách</span>
      </div>
    </div>
  );
};

export default InfUser;

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center space-x-1 cursor-pointer hover:text-black">
      {icon}
      <span>{label}</span>
    </div>
  );
}
