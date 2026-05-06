"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Typography, Button, Input, Modal, Select, Empty, message, Divider, Spin, Tag, Card } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SHIPPING_METHODS = [
  { value: "ghn", label: "Giao hàng nhanh (GHN)" },
  { value: "ghtk", label: "Giao hàng tiết kiệm (GHTK)" },
  { value: "express", label: "Giao hàng hỏa tốc (Grab/Ahamove)" },
];

interface Province { code: number; name: string; }
interface District { code: number; name: string; }
interface Ward     { code: number; name: string; }

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [provinces, setProvinces] = useState<{ value: number; label: string }[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [districts, setDistricts] = useState<{ value: number; label: string }[]>([]);
  const [wards, setWards] = useState<{ value: number; label: string }[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    detailAddress: "",
    province: undefined as number | undefined,
    provinceLabel: "",
    district: undefined as number | undefined,
    districtLabel: "",
    ward: undefined as number | undefined,
    wardLabel: "",
    method: undefined as string | undefined,
    payment: "cod",
    note: "",
  });

  useEffect(() => {
    setIsClient(true);
    const savedOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    if (!isModalOpen || provinces.length > 0) return;
    setLoadingProvinces(true);
    fetch("https://provinces.open-api.vn/api/p/")
      .then((r) => r.json())
      .then((data: Province[]) => {
        setProvinces(data.map((p) => ({ value: p.code, label: p.name })));
      })
      .catch(() => message.error("Không tải được danh sách tỉnh/thành."))
      .finally(() => setLoadingProvinces(false));
  }, [isModalOpen, provinces.length]);

  const handleProvinceChange = (code: number, option: any) => {
    setShippingInfo((prev) => ({
      ...prev,
      province: code,
      provinceLabel: option.label,
      district: undefined,
      districtLabel: "",
      ward: undefined,
      wardLabel: "",
    }));
    setDistricts([]);
    setWards([]);
    setLoadingDistricts(true);
    fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      .then((r) => r.json())
      .then((data: { districts: District[] }) => {
        setDistricts(data.districts.map((d) => ({ value: d.code, label: d.name })));
      })
      .finally(() => setLoadingDistricts(false));
  };

  const handleDistrictChange = (code: number, option: any) => {
    setShippingInfo((prev) => ({
      ...prev,
      district: code,
      districtLabel: option.label,
      ward: undefined,
      wardLabel: "",
    }));
    setWards([]);
    setLoadingWards(true);
    fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
      .then((r) => r.json())
      .then((data: { wards: Ward[] }) => {
        setWards(data.wards.map((w) => ({ value: w.code, label: w.name })));
      })
      .finally(() => setLoadingWards(false));
  };

  const handleWardChange = (code: number, option: any) => {
    setShippingInfo((prev) => ({ ...prev, ward: code, wardLabel: option.label }));
  };

  // HÀM XỬ LÝ ĐẶT HÀNG CHUẨN
  const handleOrder = () => {
    const { province, district, ward, fullName, phone, method, payment } = shippingInfo;

    // BƯỚC 1: KIỂM TRA ĐIỀU KIỆN (VALIDATION) - PHẢI ĐƯA LÊN ĐẦU
    if (!fullName.trim()) return message.warning("Vui lòng nhập họ và tên!");
    if (!phone.trim()) return message.warning("Vui lòng nhập số điện thoại!");
    if (!province) return message.warning("Vui lòng chọn Tỉnh/Thành phố!");
    if (!district) return message.warning("Vui lòng chọn Quận/Huyện!");
    if (!ward) return message.warning("Vui lòng chọn Phường/Xã!");
    if (!method) return message.warning("Vui lòng chọn đơn vị vận chuyển!");

    // BƯỚC 2: NẾU HỢP LỆ THÌ MỚI TẠO ĐƠN HÀNG
    const newOrder = {
      id: "ZUNO-" + Math.floor(Math.random() * 100000),
      items: [...cartItems],
      total: totalPrice,
      payment: payment === "bank" ? "Chuyển khoản" : "COD",
      date: new Date().toLocaleString("vi-VN"),
      status: "Đang xử lý"
    };

    // BƯỚC 3: LƯU VÀO LỊCH SỬ
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("userOrders", JSON.stringify(updatedOrders));

    // BƯỚC 4: XỬ LÝ THEO PHƯƠNG THỨC THANH TOÁN
    if (payment === "bank") {
      setShowQRModal(true);
      setIsModalOpen(false); // Đóng modal thông tin, mở modal QR
    } else {
      message.success("Đặt hàng thành công! ZUNO sẽ sớm liên hệ bạn.");
      clearCart();
      setIsModalOpen(false);
      router.push("/"); // Quay về trang chủ
    }
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc: number, item: any) => acc + item.price * (item.quantity || 1), 0);
  }, [cartItems]);

  if (!isClient) return null;

  return (
    <div style={{ marginTop: "180px", padding: "0 10% 80px 10%", minHeight: "70vh" }}>
      <div style={{ textAlign: "center", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
        <ShoppingCartOutlined style={{ fontSize: "32px" }} />
        <Title level={2} style={{ margin: 0, textTransform: "uppercase", fontWeight: "bold" }}>Giỏ hàng của bạn</Title>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Empty description="Giỏ hàng đang trống" />
          <Button onClick={() => router.push("/cua-hang")} style={{ marginTop: "20px" }}>Tiếp tục mua sắm</Button>
        </div>
      ) : (
        <Row gutter={40}>
          <Col xs={24} lg={16}>
            {cartItems.map((item: any) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", padding: "20px", borderBottom: "1px solid #eee", gap: "20px" }}>
                <img src={item.img} alt={item.name} style={{ width: "100px", height: "100px", objectFit: "contain", background: "#f9f9f9", borderRadius: "8px" }} />
                <div style={{ flex: 1 }}>
                  <Title level={5} style={{ margin: 0 }}>{item.name}</Title>
                  <Text type="secondary">Size: {item.size || "Free size"}</Text>
                  <div style={{ marginTop: "5px" }}>
                    <Text strong style={{ color: "#dc2626" }}>{item.price.toLocaleString()} ₫</Text>
                  </div>
                </div>
                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeFromCart(item.id)} />
              </div>
            ))}
          </Col>

          <Col xs={24} lg={8}>
            <div style={{ background: "#f9f9f9", padding: "30px", borderRadius: "12px", border: "1px solid #eee" }}>
              <Title level={4}>TỔNG ĐƠN HÀNG</Title>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <Text>Tạm tính:</Text>
                <Text>{totalPrice.toLocaleString()} ₫</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
                <Text strong style={{ fontSize: "18px" }}>Tổng cộng:</Text>
                <Text strong style={{ fontSize: "22px", color: "#dc2626" }}>{totalPrice.toLocaleString()} ₫</Text>
              </div>
              <Button type="primary" block size="large" onClick={() => setIsModalOpen(true)} style={{ background: "#dc2626", height: "55px", fontWeight: "bold" }}>TIẾN HÀNH THANH TOÁN</Button>
            </div>
          </Col>
        </Row>
      )}

      {/* LỊCH SỬ ĐƠN HÀNG */}
      <div style={{ marginTop: "60px" }}>
        <Divider><Title level={3} style={{ color: "#dc2626" }}>LỊCH SỬ ĐƠN HÀNG</Title></Divider>
        {orders.length === 0 ? <Empty description="Bạn chưa có đơn hàng nào" /> : (
          <Row gutter={[20, 20]}>
            {orders.map((order, index) => (
              <Col span={24} key={index}>
                <Card style={{ borderRadius: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Text strong style={{ color: "#dc2626" }}>Mã đơn: {order.id}</Text>
                    <Tag color="orange">{order.status}</Tag>
                  </div>
                  <Text type="secondary">{order.date}</Text>
                  <Divider style={{ margin: "10px 0" }} />
                  {order.items.map((it: any, idx: number) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text>{it.name} (Size {it.size}) x {it.quantity || 1}</Text>
                      <Text strong>{(it.price * (it.quantity || 1)).toLocaleString()} ₫</Text>
                    </div>
                  ))}
                  <Divider style={{ margin: "10px 0" }} />
                  <div style={{ textAlign: "right" }}>
                    <Text>Thanh toán: <strong>{order.payment}</strong></Text><br />
                    <Text style={{ fontSize: "18px" }}>Tổng tiền: <strong style={{ color: "#dc2626" }}>{order.total.toLocaleString()} ₫</strong></Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* MODAL THÔNG TIN GIAO HÀNG */}
      <Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)} width={650} centered>
        <div style={{ textAlign: "center", padding: "10px" }}>
          <div style={{ background: "#b8923a", padding: "15px", marginBottom: "25px", borderRadius: "4px" }}>
            <Title level={4} style={{ color: "#fff", margin: 0 }}>THÔNG TIN MUA HÀNG</Title>
          </div>
          <Row gutter={[15, 15]}>
            <Col span={12}><Input placeholder="HỌ VÀ TÊN" value={shippingInfo.fullName} onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })} style={{ height: "45px" }} /></Col>
            <Col span={12}><Input placeholder="SỐ ĐIỆN THOẠI" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} style={{ height: "45px" }} /></Col>
            <Col span={24}><Input placeholder="ĐỊA CHỈ CỤ THỂ" value={shippingInfo.detailAddress} onChange={(e) => setShippingInfo({ ...shippingInfo, detailAddress: e.target.value })} style={{ height: "45px" }} /></Col>
            <Col span={8}><Select showSearch placeholder="Tỉnh/Thành" options={provinces} loading={loadingProvinces} value={shippingInfo.province} onChange={handleProvinceChange} style={{ width: "100%", height: "45px" }} /></Col>
            <Col span={8}><Select showSearch placeholder="Quận/Huyện" options={districts} loading={loadingDistricts} disabled={!shippingInfo.province} value={shippingInfo.district} onChange={handleDistrictChange} style={{ width: "100%", height: "45px" }} /></Col>
            <Col span={8}><Select showSearch placeholder="Phường/Xã" options={wards} loading={loadingWards} disabled={!shippingInfo.district} value={shippingInfo.ward} onChange={handleWardChange} style={{ width: "100%", height: "45px" }} /></Col>
            <Col span={24}><Select placeholder="Đơn vị vận chuyển" options={SHIPPING_METHODS} value={shippingInfo.method} onChange={(val) => setShippingInfo({ ...shippingInfo, method: val })} style={{ width: "100%", height: "45px" }} /></Col>
            <Col span={24}><Select placeholder="Phương thức thanh toán" options={[{ value: "cod", label: "COD" }, { value: "bank", label: "Chuyển khoản" }]} value={shippingInfo.payment} onChange={(val) => setShippingInfo({ ...shippingInfo, payment: val })} style={{ width: "100%", height: "45px" }} /></Col>
            <Col span={24}><TextArea rows={3} placeholder="Ghi chú..." value={shippingInfo.note} onChange={(e) => setShippingInfo({ ...shippingInfo, note: e.target.value })} /></Col>
          </Row>
          <Button onClick={handleOrder} style={{ marginTop: "30px", width: "100%", height: "55px", background: "#dc2626", color: "#fff", fontWeight: "bold" }}>XÁC NHẬN MUA HÀNG</Button>
        </div>
      </Modal>

      {/* MODAL QR THANH TOÁN */}
      <Modal open={showQRModal} footer={null} onCancel={() => setShowQRModal(false)} centered width={450}>
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={{ color: "#dc2626" }}>THANH TOÁN QR</Title>
          <img src="https://api.vietqr.io/image/970422-0369739651-compact2.jpg?amount=0&addInfo=ZUNO" style={{ width: "100%", borderRadius: "8px" }} alt="QR" />
          <Button type="primary" block size="large" onClick={() => { clearCart(); setShowQRModal(false); router.push("/"); message.success("Đã ghi nhận chuyển khoản!"); }} style={{ marginTop: "20px", background: "#dc2626", height: "50px" }}>TÔI ĐÃ CHUYỂN KHOẢN</Button>
        </div>
      </Modal>
    </div>
  );
}