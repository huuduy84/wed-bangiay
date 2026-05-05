"use client";
import React from "react";
import { Form, Input, Button, Typography, Breadcrumb, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();

  const onFinish = (values: any) => {
    // Lấy danh sách tài khoản đã đăng ký từ trình duyệt
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Tìm xem có tài khoản nào khớp Email và Mật khẩu không
    const user = existingUsers.find(
      (u: any) => u.email === values.email && u.password === values.password
    );

    if (user) {
      message.success(`Chào mừng ${user.ten} quay trở lại!`);
      // Lưu trạng thái đã đăng nhập để các trang khác biết
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      setTimeout(() => router.push("/"), 1500); // Về trang chủ
    } else {
      message.error("Email hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div style={{ marginTop: "180px", padding: "0 10%", minHeight: "70vh", background: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "1200px", marginBottom: "20px" }}>
        <Breadcrumb items={[{ title: "Trang chủ" }, { title: "Đăng nhập" }]} />
      </div>

      <div style={{ background: "#fff", padding: "40px", borderRadius: "8px", width: "100%", maxWidth: "500px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <Title level={2} style={{ fontWeight: "bold", textTransform: "uppercase", marginBottom: "10px" }}>ĐĂNG NHẬP TÀI KHOẢN</Title>
        <Text style={{ display: "block", marginBottom: "30px", color: "#666" }}>Nhập email và mật khẩu của bạn</Text>

        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item name="email" rules={[{ required: true, message: "Vui lòng nhập Email!" }]}>
            <Input placeholder="Email" style={{ height: "45px", borderRadius: "4px" }} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
            <Input.Password placeholder="Mật khẩu" style={{ height: "45px", borderRadius: "4px" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%", height: "50px", background: "#000", border: "none", fontWeight: "bold", fontSize: "16px" }}>
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
        </Form>

        <div style={{ marginTop: "20px" }}>
          <Text color="secondary">Khách hàng mới? </Text>
          <Link href="/tao-tai-khoan" style={{ color: "#1890ff" }}>Tạo Tài Khoản</Link>
          <br />
          <Link href="#" style={{ color: "#1890ff", display: "inline-block", marginTop: "10px" }}>Quên mật khẩu? Khôi phục mật khẩu</Link>
        </div>
      </div>
    </div>
  );
}