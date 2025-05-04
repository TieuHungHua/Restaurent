'use client'
import React, { createContext, useState, ReactNode } from 'react';

type itemCart = {
  title: string;
  cost: number;
  url: string;
  quantity: number;
}

// 1. Kiểu dữ liệu cho info
export type InfoContextType = {
  name: string;
  email: string;
  isBan: boolean;
  avatar: string | null;
  role: string;
  guest: {
    gender: string;
    birthYear: number | null;
    address: string;
    phone: string;
    favouritefood: string | null;
    points: number | null;
    role: string;
  },
  shopingCart: itemCart[]
};

// 2. Kiểu dữ liệu cho context value (info + setInfo)
type InfoContextValue = {
  info: InfoContextType;
  setInfo: React.Dispatch<React.SetStateAction<InfoContextType>>;
};

// 3. Tạo context
const InformationContext = createContext<InfoContextValue | undefined>(undefined);

// 4. Provider component
const InformationProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<InfoContextType>({
    name: "Tài khoản",
    email: "",
    isBan: false,
    avatar: null,
    role: "",
    guest: {
      gender: '',
      birthYear: null,
      address: "",
      phone: "",
      favouritefood: null,
      points: null,
      role: ""
    },
    shopingCart: []
  });

  return (
    <InformationContext.Provider value={{ info, setInfo }}>
      {children}
    </InformationContext.Provider>
  );
};

// 5. Export
export { InformationProvider, InformationContext };
