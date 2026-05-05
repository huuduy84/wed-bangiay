"use client";
import React from "react";
import { Row, Col, Typography } from "antd";
import { FacebookFilled, InstagramFilled, YoutubeFilled } from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

export default function Footer() {
  return (
    <footer style={{ 
      background: '#000', // Đổi nền sang màu đen
      color: '#fff', // Đổi màu chữ chủ đạo sang trắng
      padding: '60px 10%', 
      borderTop: '1px solid #333', 
      fontFamily: "'Crimson Text', serif" 
    }}>
      <Row gutter={60}>
        {/* CỘT 1: THÔNG TIN THƯƠNG HIỆU */}
        <Col xs={24} md={14}>
          <div style={{ marginBottom: "25px" }}>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: "32px", color: "#dc2626" }}>ZUNO</h2>
            <p style={{ fontSize: "17px", marginTop: "5px", fontWeight: "bold", color: "#fff" }}>Hộ Kinh Doanh Truong Huu Duy and Hoang Trung Nam</p>
            <p style={{ fontSize: "17px", color: "#ccc" }}>ZUNO - Nhà sưu tầm và phân phối chính hãng các thương hiệu thời trang hàng đầu.</p>
          </div>
          
          <h3 style={{ fontWeight: 700, fontSize: "20px", marginBottom: "15px", color: "#fff" }}>HỆ THỐNG CỬA HÀNG</h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "17px", lineHeight: "2", color: "#ccc" }}>
            <li>• Cơ sở 1: Số 10, Huỳnh Văn Nghệ, Phường Bửu Long, TP. Biên Hòa, Đồng Nai</li>
            <li>• Cơ sở 2: Số 15, đường Lạc Hồng, Phường Bửu Long, TP. Biên Hòa, Đồng Nai</li>
            <li>• Email: huuduy08042006@gmail.com</li>
          </ul>
        </Col>

        {/* CỘT 2: HỖ TRỢ & MẠNG XÃ HỘI */}
        <Col xs={24} md={10}>
          <h3 style={{ fontWeight: 700, fontSize: "20px", marginBottom: "15px", color: "#fff" }}>HỖ TRỢ KHÁCH HÀNG</h3>
          <ul style={{ paddingLeft: "0", fontSize: "18px", lineHeight: "2.5", listStyle: "none" }}>
            <li>
              <Link href="/ho-tro/huong-dan-mua-hang" style={{ color: "#ccc", textDecoration: "none" }} className="footer-link">
                • Hướng dẫn mua hàng
              </Link>
            </li>
            <li>
              <Link href="/ho-tro/doi-tra-bao-hanh" style={{ color: "#ccc", textDecoration: "none" }} className="footer-link">
                • Chính sách đổi trả và bảo hành
              </Link>
            </li>
            <li>
              <Link href="/ho-tro/thanh-toan" style={{ color: "#ccc", textDecoration: "none" }} className="footer-link">
                • Chính sách thanh toán
              </Link>
            </li>
            <li>
              <Link href="/ho-tro/van-chuyen" style={{ color: "#ccc", textDecoration: "none" }} className="footer-link">
                • Vận chuyển giao hàng
              </Link>
            </li>
          </ul>

          {/* CÁC NÚT MXH - ĐÃ FIX LỖI THẲNG HÀNG */}
          <div style={{ display: "flex", gap: "20px", marginTop: "30px", fontSize: "32px", alignItems: "center" }}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#1877F2", display: "flex" }}>
              <FacebookFilled />
            </a>
            
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#E4405F", display: "flex" }}>
              <InstagramFilled />
            </a>

            {/* TIKTOK - ĐÃ CĂN CHỈNH LẠI KÍCH THƯỚC ĐỂ KHÔNG BỊ CHÒI */}
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" style={{ display: "flex" }}>
              <div style={{ 
                background: "#fff", 
                color: "#000", 
                width: "30px", 
                height: "30px", 
                borderRadius: "50%", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center" 
              }}>
                <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </div>
            </a>

            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: "#FF0000", display: "flex" }}>
              <YoutubeFilled />
            </a>
          </div>
        </Col>
      </Row>

      <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid #333', paddingTop: '20px', color: '#666', fontSize: '14px' }}>
        © 2026 ZUNO - Cửa hàng giày Sneaker chính hãng. All rights reserved.
      </div>

      <style jsx>{`
        .footer-link:hover {
          color: #dc2626 !important;
          padding-left: 10px;
          transition: 0.3s;
        }
        a:hover {
          opacity: 0.8;
          transform: scale(1.1);
          transition: 0.2s;
        }
      `}</style>
    </footer>
  );
}