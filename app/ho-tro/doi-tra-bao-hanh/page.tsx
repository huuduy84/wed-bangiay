"use client";
import { Typography, Divider } from "antd";
const { Title, Paragraph } = Typography;

export default function PolicyPage() {
  return (
    <div style={{ marginTop: "180px", padding: "0 20% 80px 20%" }}>
      <Title level={2}>CHÍNH SÁCH ĐỔI TRẢ & BẢO HÀNH</Title>
      <Divider />
      <Title level={4}>1. Chính sách đổi trả</Title>
      <Paragraph>- Đổi trả miễn phí trong vòng 7 ngày kể từ khi nhận hàng nếu lỗi do nhà sản xuất.</Paragraph>
      <Paragraph>- Sản phẩm đổi trả phải còn nguyên tem, tag và chưa qua sử dụng.</Paragraph>
      <Title level={4}>2. Chính sách bảo hành</Title>
      <Paragraph>- Bảo hành keo và chỉ may trong vòng 6 tháng.</Paragraph>
      <Paragraph>- Miễn phí vệ sinh giày trọn đời cho mọi khách hàng của ZUNO.</Paragraph>
    </div>
  );
}