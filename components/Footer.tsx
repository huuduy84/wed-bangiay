"use client";
import { Layout, Row, Col, Typography } from "antd";

const { Footer } = Layout;
const { Title, Text } = Typography;

export default function FooterComponent() {
  return (
    <Footer style={{ background: "#000", color: "#fff", padding: "40px 50px" }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Title level={4} style={{ color: "#fff" }}>MEMOL STUDIO</Title>
          <Text style={{ color: "#aaa" }}>Cửa hàng giày Sneaker chính hãng dẫn đầu xu hướng 2026.</Text>
        </Col>
        <Col xs={12} md={8}>
          <Title level={4} style={{ color: "#fff" }}>HỖ TRỢ</Title>
          <ul style={{ listStyle: "none", padding: 0, color: "#aaa", lineHeight: '2' }}>
            <li>Chính sách bảo hành</li>
            <li>Đổi trả trong 7 ngày</li>
            <li>Hướng dẫn chọn size</li>
          </ul>
        </Col>
        <Col xs={12} md={8}>
          <Title level={4} style={{ color: "#fff" }}>LIÊN HỆ</Title>
          <Text style={{ color: "#aaa" }}>Địa chỉ: Lạc Hồng University, Biên Hòa<br />Hotline: 1900 1234</Text>
        </Col>
      </Row>
      <div style={{ textAlign: 'center', marginTop: '30px', color: '#555', borderTop: '1px solid #222', paddingTop: '20px' }}>
        © 2026 MEMOL STUDIO. All rights reserved.
      </div>
    </Footer>
  );
}