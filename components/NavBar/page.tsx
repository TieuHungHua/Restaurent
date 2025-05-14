import { useSession } from "next-auth/react";
import { FormNavType } from "@/lib/interface";
import React from "react";
import DesktopMenu from "./menu";

const NavBar = () => {
  const { data: session } = useSession();

  const defaultNav: FormNavType[] = [
    { id: "link1", title: "Trang chủ", url: "/" },
    { id: "link2", title: "Giới thiệu", url: "/Introduce" },
    { id: "link3", title: "Thực đơn", url: "/Menu" },
    { id: "link4", title: "Bài viết", url: "/Blog" },
    { id: "link5", title: "Liên hệ", url: "/Contact" },
  ];

  const adminNav: FormNavType[] = [
    { id: "link1", title: "Đơn hàng", url: "/ListOrder" },
    { id: "link2", title: "Món ăn", url: "/ManagerDish" },
    { id: "link3", title: "Người dùng", url: "/ManagerUser" },
    { id: "link4", title: "Vourcher", url: "/Vourcher" },
  ];
  const userRole = session?.user?.role || "Guest";

  const nav = userRole === "Super Admin" ? adminNav : defaultNav;
  return (
    <div className="sticky top-0 z-50 shadow-sm select-none">
      <nav className="hidden md:grid grid-cols-3 gap-4 items-center border-b-1 border-black bg-[#e8e8e8]">
        <DesktopMenu links={nav} />
      </nav>
    </div>
  );
};

export default NavBar;
