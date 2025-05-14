import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Banner = () => {
  return (
    <div className="select-none relative items-center flex flex-col ">
      <img
        width={920}
        src="https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/492144393_122164790096433358_5871678154703331075_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4s8IiLZ1FJcQ7kNvwF04E2l&_nc_oc=Adnf8vjzyIl4P701e9qtbO43boj3uYYrsXEniSToGaDohvvf37vk-F2D7ydGHX1DQ14&_nc_zt=23&_nc_ht=scontent.fhan4-1.fna&_nc_gid=wEFZMDxyBnhV4XQ913NQ5w&oh=00_AfKLIwwk1lSKQMMeD95u85Q84aLqJbvS1-uOUJBl4X5nOQ&oe=6827972B"
        alt="Banner"
        className="w-[100%] rounded-x1 size-1/2 "
      />
      <div className="absolute top-[52%] text-white flex flex-col items-center">
        <Link href={"buy-now"}>
          <Button
            variant={"secondary"}
            className="h-6 mt-2 md:h-10 md:text-[1.5rem] md:mt-4 md:p-4 font-bold"
          >
            Đặt Món Ngay
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
