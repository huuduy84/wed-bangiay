"use client";
import React, { useEffect, useState } from "react";
import { Input, Typography, Badge, Dropdown, message, type MenuProps } from "antd";
import {
  SearchOutlined, ShoppingCartOutlined, UserOutlined,
  PhoneOutlined, LogoutOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Text } = Typography;

export default function HeaderComponent() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");

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

  const handleSearch = () => {
    const keyword = searchValue.trim();
    if (keyword) router.push(`/cua-hang?search=${encodeURIComponent(keyword)}`);
    else router.push(`/cua-hang`);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    message.success("Đã đăng xuất tài khoản");
    router.push("/dang-nhap");
  };

  const menuItems: MenuProps["items"] = currentUser
    ? [
        { key: "hello", label: <Text strong>Chào, {currentUser.ten}!</Text>, disabled: true },
        { type: "divider" },
        { key: "logout", icon: <LogoutOutlined />, label: "Đăng xuất", danger: true, onClick: handleLogout },
      ]
    : [{ key: "login", icon: <UserOutlined />, label: <Link href="/dang-nhap">Đăng nhập / Đăng ký</Link> }];

  return (
    <>
      <style>{`
        /* Chữ chạy marquee */
        .marquee-wrapper {
          overflow: hidden;
          flex: 1;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 18s linear infinite;
        }
        .marquee-track span {
          padding: 0 40px;
          white-space: nowrap;
          font-weight: bold;
          letter-spacing: 1px;
          font-size: 13px;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* MOBILE dọc */
        @media (max-width: 768px) {
          .topbar-wrap {
            padding: 0 3% !important;
            height: 36px !important;
            font-size: 11px !important;
          }
          .topbar-hotline span { display: none; }
          .topbar-hotline { gap: 4px !important; }
          .topbar-actions { gap: 10px !important; }
          .topbar-actions .acc-label { display: none; }
          .logo-search-wrap {
            padding: 0 3% !important;
            height: 64px !important;
          }
          .logo-search-wrap img { height: 38px !important; }
          .search-box { width: 62% !important; }
          .nav-wrap {
            gap: 0 !important;
            justify-content: space-around !important;
            height: 40px !important;
          }
          .nav-wrap a {
            font-size: 12px !important;
            letter-spacing: 0 !important;
            flex: 1 !important;
            text-align: center !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            height: 100% !important;
          }
          .nav-divider { display: none !important; }
        }
      `}</style>

      <header style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>

        {/* 1. THANH ĐEN */}
        <div
          className="topbar-wrap"
          style={{
            height: "40px",
            background: "#000",
            color: "#fff",
            padding: "0 10%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "13px",
          }}
        >
          {/* Hotline - luôn hiển thị, ẩn chữ số trên mobile nhỏ xíu */}
          <div className="topbar-hotline" style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", flexShrink: 0 }}>
            <PhoneOutlined />
            <span>0369739651</span>
          </div>

          {/* Chữ chạy marquee */}
          <div className="marquee-wrapper">
            <div className="marquee-track">
              <span>► GIẢM 20% CHO SẢN PHẨM MỚI ◄</span>
              <span>► FREE SHIP ĐƠN TRÊN 500K ◄</span>
              <span>► NHẬP MÃ ZUNO2026 ĐỂ GIẢM THÊM ◄</span>
              <span>► GIẢM 20% CHO SẢN PHẨM MỚI ◄</span>
              <span>► FREE SHIP ĐƠN TRÊN 500K ◄</span>
              <span>► NHẬP MÃ ZUNO2026 ĐỂ GIẢM THÊM ◄</span>
            </div>
          </div>

          {/* Tài khoản & Giỏ hàng */}
          <div className="topbar-actions" style={{ display: "flex", gap: "20px", alignItems: "center", flexShrink: 0 }}>
            <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
              <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "5px" }}>
                <UserOutlined style={{ fontSize: "15px" }} />
                <span className="acc-label" style={{ fontWeight: "500" }}>
                  {currentUser ? currentUser.ten : "Tài khoản"}
                </span>
              </div>
            </Dropdown>

            <Link href="/gio-hang" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>
              <Badge count={0} size="small" offset={[5, 0]}>
                <ShoppingCartOutlined style={{ fontSize: "17px", color: "#fff" }} />
              </Badge>
              <span className="acc-label" style={{ fontWeight: "500" }}>Giỏ hàng</span>
            </Link>
          </div>
        </div>

        {/* 2. THANH TRẮNG (LOGO & SEARCH) */}
        <div
          className="logo-search-wrap"
          style={{
            height: "90px",
            padding: "0 10%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/">
            <img
              src="/logo.png"
              alt="ZUNO"
              style={{ height: "60px" }}
              onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150x70?text=ZUNO")}
            />
          </Link>

          <div className="search-box" style={{ width: "50%" }}>
            <Input
              suffix={
                <SearchOutlined
                  style={{ fontSize: "18px", color: "#888", cursor: "pointer" }}
                  onClick={handleSearch}
                />
              }
              placeholder="Bạn đang tìm kiếm gì?"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={handleSearch}
              style={{ borderRadius: "25px", height: "42px", background: "#f5f5f5", border: "none" }}
            />
          </div>
          <div style={{ width: "60px" }}></div>
        </div>

        {/* 3. THANH ĐỎ (NAVIGATION) */}
        <nav
          className="nav-wrap"
          style={{
            background: "#dc2626",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <Link href="/" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: "14px", letterSpacing: "1px" }}>
            TRANG CHỦ
          </Link>
          <div className="nav-divider" style={{ width: "1px", height: "15px", background: "rgba(255,255,255,0.3)" }}></div>
          <Link href="/cua-hang" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: "14px", letterSpacing: "1px" }}>
            CỬA HÀNG
          </Link>
          <div className="nav-divider" style={{ width: "1px", height: "15px", background: "rgba(255,255,255,0.3)" }}></div>
          <Link href="/tin-tuc" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: "14px", letterSpacing: "1px" }}>
            TIN TỨC
          </Link>
        </nav>
      </header>
    </>
  );
}