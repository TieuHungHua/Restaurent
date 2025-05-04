'use client'

import { useContext, useEffect } from 'react';
import { InformationContext } from './InformationContext';

const useFetchData = () => {
    const context = useContext(InformationContext);
    if (!context) {
        throw new Error("useFetchData must be used within an InformationProvider");
    }

    const { setInfo } = context;

    useEffect(() => {
        // 👇 Chỉ chạy khi client render
        const token = localStorage.getItem('access_Token');
        if (!token) return;

        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/v1/users/info', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error('Fetch failed');
                const req = await res.json();
                const data = req.data;
                console.log("đây là ở useFetch: ", data.name)
                setInfo(prev => ({
                    ...prev,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    isBan: data.isBan,
                    avatar: data.avatar,
                    guest: {
                        ...prev.guest,
                        gender: data.gender,
                        birthYear: data.birthYear,
                        address: data.address,
                        phone: data.phone,
                        favouritefood: data.favouritefood,
                        points: data.points,
                        role: data.partRole
                    }
                }));
            } catch (e) {
                console.error('Lỗi lấy thông tin:', e);
                alert('Lỗi lấy thông tin người dùng!');
            }
        };
        fetchData();
    }, []);
    return true
};

export default useFetchData;
