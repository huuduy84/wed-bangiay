"use client";
import { ConfigProvider, Layout, Row, Col } from "antd";
import HeaderComponent from "../components/Header";
import "./globals.css";
import { FacebookFilled, InstagramFilled, YoutubeFilled } from "@ant-design/icons";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <ConfigProvider theme={{ token: { colorPrimary: "#dc2626" } }}>
          <Layout style={{ minHeight: "100vh", background: "#fff" }}>
            <HeaderComponent />
            <Layout.Content>{children}</Layout.Content>
            
            {/* Footer với phông chữ Crimson Text và địa chỉ Đại học Lạc Hồng */}
            <div style={{ background: '#f9f9f9', color: '#000', padding: '60px 10%', borderTop: '1px solid #eee', fontFamily: "'Crimson Text', serif" }}>
              <Row gutter={60}>
                <Col span={14}>
                  <div style={{ marginBottom: "25px" }}>
                    <h2 style={{ margin: 0, fontWeight: 700, fontSize: "32px", color: "#dc2626" }}>ZUNO</h2>
                    {/* Cập nhật tên hộ kinh doanh mới */}
                    <p style={{ fontSize: "17px", marginTop: "5px" }}>Hộ Kinh Doanh Truong Huu Duy and Hoang Trung Nam</p>
                    <p style={{ fontSize: "17px" }}>ZUNO - Nhà sưu tầm và phân phối chính hãng các thương hiệu thời trang hàng đầu.</p>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "20px", marginBottom: "15px" }}>HỆ THỐNG CỬA HÀNG</h3>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "17px", lineHeight: "2" }}>
                    {/* Cập nhật địa chỉ theo các cơ sở của Đại học Lạc Hồng */}
                    <li>• Cơ sở 1: Số 10, Huỳnh Văn Nghệ, Phường Bửu Long, TP. Biên Hòa, Đồng Nai</li>
                    <li>• Cơ sở 2: Số 15, đường Lạc Hồng, Phường Bửu Long, TP. Biên Hòa, Đồng Nai</li>
                    <li>• Email: huuduy08042006@gmail.com</li>
                  </ul>
                </Col>

                <Col span={10}>
                  <h3 style={{ fontWeight: 700, fontSize: "20px", marginBottom: "15px" }}>HỖ TRỢ KHÁCH HÀNG</h3>
                  <ul style={{ paddingLeft: "20px", fontSize: "18px", lineHeight: "2.2" }}>
                    <li>Hướng dẫn mua hàng</li>
                    <li>Chính đổi trả và bảo hành</li>
                    <li>Chính sách thanh toán</li>
                    <li>Vận chuyển giao hàng</li>
                  </ul>
                  <div style={{ display: "flex", gap: "20px", marginTop: "30px", fontSize: "35px" }}>
                    <FacebookFilled style={{ cursor: "pointer" }} />
                    <InstagramFilled style={{ cursor: "pointer" }} />
                    <div style={{ background: "#000", color: "#fff", width: "35px", height: "35px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                      <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                    </div>
                    <YoutubeFilled style={{ cursor: "pointer" }} />
                  </div>
                </Col>
              </Row>
            </div>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}