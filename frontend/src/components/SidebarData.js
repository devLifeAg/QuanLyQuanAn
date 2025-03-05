import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [
    {
        title: "Trang chủ",
        icon: <HomeIcon />,
        link: "/trangchu"
    },
    {
        title: "Thông Tin Quán",
        icon: <TableRestaurantIcon />,
        link: "/thongtinquan"
    },
    {
        title: "Món Ăn",
        icon: <RamenDiningIcon />,
        link: "/monan"
    },
    {
        title: "Hóa Đơn Order",
        icon: <ReceiptIcon />,
        link: "/hoadonorder"
    },
    {
        title: "Kết Ca",
        icon: <ReceiptLongIcon />,
        link: "/ketca"
    },
    {
        title: "Doanh Thu",
        icon: <AttachMoneyIcon />,
        link: "/doanhthu"
    },
    {
        title: "Đăng Xuất",
        icon: <LogoutIcon />,
        link: "/dangxuat"
    }
]

