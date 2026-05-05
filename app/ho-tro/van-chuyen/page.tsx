"use client";
import { Typography, Divider } from "antd";
const { Title, Paragraph } = Typography;

export default function ShippingPage() {
  return (
    <div style={{ marginTop: "180px", padding: "0 20% 80px 20%" }}>
      <Title level={2}>VẬN CHUYỂN & GIAO HÀNG</Title>
      <Divider />
      <Paragraph>- <strong>Miễn phí vận chuyển:</strong> Cho đơn hàng trên 1.480.000đ hoặc khách hàng tại Biên Hòa[cite: 7].</Paragraph>
      <Paragraph>- <strong>Thời gian giao hàng:</strong></Paragraph>
      <Paragraph>+ Nội thành Biên Hòa: Giao ngay trong ngày hoặc hỏa tốc qua Grab.</Paragraph>
      <Paragraph>+ Các tỉnh thành khác: Từ 2 - 4 ngày làm việc[cite: 1].</Paragraph>
      <Paragraph>- <strong>Đơn vị vận chuyển:</strong> GHN, GHTK và Viettel Post.</Paragraph>
    </div>
  );
}