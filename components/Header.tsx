"use client";
import { Input } from "antd";
import { 
  SearchOutlined, ShoppingCartOutlined, UserOutlined, 
  PhoneOutlined, CaretRightOutlined, CaretLeftOutlined
} from "@ant-design/icons";
import Link from "next/link";

export default function HeaderComponent() {
  return (
    <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      {/* Thanh đen bự hơn */}
      <div className="top-bar" style={{ height: "50px", padding: "0 10%" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
          <PhoneOutlined /> <span>Hotline: 0369739651</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '1px', fontSize: '15px', fontWeight: 'bold' }}>
          <CaretRightOutlined /> 
          <span>GIẢM 20% CHO SẢN PHẨM MỚI</span> 
          <CaretLeftOutlined />
        </div>

        <div style={{ display: 'flex', gap: '30px', fontSize: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
             <UserOutlined />
             <span style={{ fontSize: '14px', fontWeight: '600' }}>Tài khoản</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
            <ShoppingCartOutlined />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Giỏ hàng</span>
          </div>
        </div>
      </div>

      <div className="main-header">
        <Link href="/">
          {/* Bạn hãy để ảnh logo vào thư mục public/logo.png */}
          <img src="/logo.png" alt="ZUNO" style={{ height: "70px" }} onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150x70?text=ZUNO")} />
        </Link>

        <div style={{ width: '55%' }}>
          <Input 
            suffix={<SearchOutlined style={{ fontSize: '20px' }} />} 
            placeholder="Bạn đang tìm kiếm gì?" 
            style={{ borderRadius: '30px', height: '45px', background: '#f5f5f5' }}
          />
        </div>
        <div style={{ width: "70px" }}></div> 
      </div>

      <div className="nav-red-bar">
        <Link href="/" className="nav-item">TRANG CHỦ</Link>
        <div className="nav-divider"></div>
        <Link href="/cua-hang" className="nav-item">CỬA HÀNG</Link>
        <div className="nav-divider"></div>
        <Link href="/tin-tuc" className="nav-item">TIN TỨC</Link>
      </div>
    </div>
  );
}