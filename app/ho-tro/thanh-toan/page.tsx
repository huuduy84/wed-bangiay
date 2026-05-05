"use client";
import { Typography, Divider } from "antd";
const { Title, Paragraph } = Typography;

export default function PaymentPage() {
  return (
    <div style={{ marginTop: "180px", padding: "0 20% 80px 20%" }}>
      <Title level={2}>CHÍNH SÁCH THANH TOÁN</Title>
      <Divider />
      <Paragraph>ZUNO hỗ trợ các phương thức thanh toán linh hoạt sau:</Paragraph>
      <Paragraph><strong>1. Thanh toán khi nhận hàng (COD):</strong> Quý khách kiểm tra hàng và thanh toán tiền mặt cho shipper.</Paragraph>
      <Paragraph><strong>2. Chuyển khoản ngân hàng:</strong> Sau khi đặt hàng, nhân viên sẽ gửi số tài khoản để quý khách thanh toán.</Paragraph>
      <Paragraph><strong>3. Thanh toán qua ví điện tử:</strong> Hỗ trợ MoMo, ZaloPay (Đang cập nhật).</Paragraph>
    </div>
  );
}