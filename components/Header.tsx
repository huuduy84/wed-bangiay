"use client";
import React, { useEffect, useState } from "react";
import { Input, Typography, Badge, Dropdown, message, type MenuProps } from "antd";
import { 
  SearchOutlined, ShoppingCartOutlined, UserOutlined, 
  PhoneOutlined, CaretRightOutlined, CaretLeftOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Text } = Typography;

export default function HeaderComponent() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const updateUser = () => {
      const user = localStorage.getItem("currentUser");
      if (user) setCurrentUser(JSON.parse(user));
      else setCurrentUser(null);
    };

    updateUser();
    window.addEventListener("storage", updateUser);
    const interval = setInterval(updateUser, 1000);

    return () => {
      window.removeEventListener("storage", updateUser);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    message.success("Đã đăng xuất tài khoản");
    router.push("/dang-nhap");
  };

  const menuItems: MenuProps['items'] = currentUser ? [
    { key: 'hello', label: <Text strong>Chào, {currentUser.ten}!</Text>, disabled: true },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true, onClick: handleLogout },
  ] : [
    { key: 'login', icon: <UserOutlined />, label: <Link href="/dang-nhap">Đăng nhập / Đăng ký</Link> },
  ];

  return (
    <header style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      {/* 1. THANH ĐEN (TOP BAR) - Giữ nguyên phong cách của bạn nhưng căn chỉnh chuẩn hơn */}
      <div style={{ 
        height: "40px", 
        background: "#000", 
        color: "#fff", 
        padding: "0 10%", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        fontSize: "13px"
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PhoneOutlined /> <span>Hotline: 0369739651</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '1px', fontWeight: 'bold' }}>
          <CaretRightOutlined /> 
          <span>GIẢM 20% CHO SẢN PHẨM MỚI</span> 
          <CaretLeftOutlined />
        </div>

        <div style={{ display: 'flex', gap: "25px" }}>
          <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '5px' }}>
               <UserOutlined style={{ fontSize: '16px' }} />
               <span style={{ fontWeight: '500' }}>{currentUser ? currentUser.ten : "Tài khoản"}</span>
            </div>
          </Dropdown>

          <Link href="/gio-hang" style={{ color: "#fff", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Badge count={0} size="small" offset={[5, 0]}>
              <ShoppingCartOutlined style={{ fontSize: '18px', color: "#fff" }} />
            </Badge>
            <span style={{ fontWeight: '500' }}>Giỏ hàng</span>
          </Link>
        </div>
      </div>

      {/* 2. THANH TRẮNG (LOGO & SEARCH) */}
      <div style={{ 
        height: "90px", 
        padding: "0 10%", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
      }}>
        <Link href="/">
          <img src="/logo.png" alt="ZUNO" style={{ height: "60px" }} onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150x70?text=ZUNO")} />
        </Link>

        <div style={{ width: '50%' }}>
          <Input 
            suffix={<SearchOutlined style={{ fontSize: '18px', color: '#888' }} />} 
            placeholder="Bạn đang tìm kiếm gì?" 
            style={{ borderRadius: '25px', height: '42px', background: '#f5f5f5', border: 'none' }}
          />
        </div>
        <div style={{ width: "60px" }}></div> 
      </div>

      {/* 3. THANH ĐỎ (NAVIGATION) */}
      <nav style={{ 
        background: "#dc2626", 
        height: "45px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: "50px" 
      }}>
        <Link href="/" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: "14px", letterSpacing: "1px" }}>TRANG CHỦ</Link>
        <div style={{ width: "1px", height: "15px", background: "rgba(255,255,255,0.3)" }}></div>
        <Link href="/cua-hang" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: "14px", letterSpacing: "1px" }}>CỬA HÀNG</Link>
        <div style={{ width: "1px", height: "15px", background: "rgba(255,255,255,0.3)" }}></div>
        <Link href="/tin-tuc" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: "14px", letterSpacing: "1px" }}>TIN TỨC</Link>
      </nav>
    </header>
  );
}