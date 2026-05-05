"use client";
import { Typography, Divider } from "antd";
const { Title, Paragraph } = Typography;

export default function GuidePage() {
  return (
    <div style={{ marginTop: "180px", padding: "0 20% 80px 20%" }}>
      <Title level={2}>HƯỚNG DẪN MUA HÀNG</Title>
      <Divider />
      <Paragraph><strong>Bước 1:</strong> Truy cập website ZUNO và lựa chọn sản phẩm yêu thích.</Paragraph>
      <Paragraph><strong>Bước 2:</strong> Chọn size phù hợp và nhấn "Thêm vào giỏ hàng" hoặc "Mua ngay"[cite: 4].</Paragraph>
      <Paragraph><strong>Bước 3:</strong> Vào giỏ hàng, kiểm tra lại số lượng và tiến hành Thanh toán[cite: 3].</Paragraph>
      <Paragraph><strong>Bước 4:</strong> Điền đầy đủ thông tin giao hàng và chọn đơn vị vận chuyển.</Paragraph>
      <Paragraph><strong>Bước 5:</strong> Xác nhận đơn hàng. Nhân viên ZUNO sẽ liên hệ xác nhận trong vòng 15 phút.</Paragraph>
    </div>
  );
}