"use client";
import React from "react";
import { Form, Input, Button, Typography, Breadcrumb, Radio, DatePicker, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function RegisterPage() {
  const router = useRouter();

  const onFinish = (values: any) => {
    // Lấy danh sách tài khoản hiện có từ localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Kiểm tra email đã tồn tại chưa
    const isExisted = existingUsers.some((user: any) => user.email === values.email);
    if (isExisted) {
      return message.error("Email này đã được đăng ký!");
    }

    // Thêm tài khoản mới vào mảng
    existingUsers.push(values);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    
    message.success("Đăng ký thành công! Đang chuyển hướng sang Đăng nhập...");
    setTimeout(() => router.push("/dang-nhap"), 1500);
  };

  return (
    <div style={{ marginTop: "180px", padding: "0 10%", paddingBottom: "60px", minHeight: "80vh", background: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "1200px", marginBottom: "20px" }}>
        <Breadcrumb items={[{ title: "Trang chủ" }, { title: "Đăng nhập" }, { title: "Tạo tài khoản" }]} />
      </div>

      <div style={{ background: "#fff", padding: "40px", borderRadius: "8px", width: "100%", maxWidth: "500px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <Title level={2} style={{ fontWeight: "bold", textAlign: "center", marginBottom: "40px" }}>Tạo tài khoản</Title>

        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item name="ho" rules={[{ required: true, message: "Vui lòng nhập họ!" }]}>
            <Input placeholder="Họ" style={{ height: "45px", background: "#eee", border: "none" }} />
          </Form.Item>
          <Form.Item name="ten" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
            <Input placeholder="Tên" style={{ height: "45px", background: "#eee", border: "none" }} />
          </Form.Item>
          <Form.Item name="gender" initialValue="Nữ"><Radio.Group><Radio value="Nữ">Nữ</Radio><Radio value="Nam">Nam</Radio></Radio.Group></Form.Item>
          <Form.Item name="birthday"><DatePicker placeholder="mm/dd/yyyy" style={{ width: "100%", height: "45px", background: "#eee", border: "none" }} /></Form.Item>
          <Form.Item name="email" rules={[{ required: true, type: "email", message: "Email không hợp lệ!" }]}><Input placeholder="Email" style={{ height: "45px", background: "#eee", border: "none" }} /></Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Nhập mật khẩu!" }]}><Input.Password placeholder="Mật khẩu" style={{ height: "45px", background: "#eee", border: "none" }} /></Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" style={{ width: "100%", height: "50px", background: "#000", border: "none", fontWeight: "bold" }}>ĐĂNG KÝ</Button></Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: "20px" }}><Link href="/dang-nhap" style={{ color: "#000", fontWeight: "500" }}><ArrowLeftOutlined /> Quay lại đăng nhập</Link></div>
      </div>
    </div>
  );
}