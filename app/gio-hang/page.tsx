"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Typography, Button, Input, Modal, Select, Empty, message, Divider, Spin, Tag, Card } from "antd";
import { ShoppingCartOutlined, DeleteOutlined, HistoryOutlined } from "@ant-design/icons";
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
interface Ward    { code: number; name: string; }

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [provinces, setProvinces] = useState<{ value: number; label: string }[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Lấy dữ liệu từ máy khách khi trang web vừa load xong
    const savedOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
    setOrders(savedOrders);
  }, []);
  const [districts, setDistricts] = useState<{ value: number; label: string }[]>([]);
  const [wards,     setWards]     = useState<{ value: number; label: string }[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards,     setLoadingWards]     = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Thanh toán khi nhận hàng (COD)");
  const [showQRModal, setShowQRModal] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<{
    fullName: string;
    phone: string;
    detailAddress: string;
    province: number | undefined;
    provinceLabel: string;
    district: number | undefined;
    districtLabel: string;
    ward: number | undefined;
    wardLabel: string;
    method: string | undefined;
    payment: string;
    note: string;
  }>({
    fullName: "",
    phone: "",
    detailAddress: "",
    province: undefined,
    provinceLabel: "",
    district: undefined,
    districtLabel: "",
    ward: undefined,
    wardLabel: "",
    method: undefined,
    payment: "cod",
    note: "",
  });

  useEffect(() => { setIsClient(true); }, []);

  // Lấy 63 tỉnh/thành khi mở modal
  useEffect(() => {
    if (!isModalOpen || provinces.length > 0) return;
    setLoadingProvinces(true);
    fetch("https://provinces.open-api.vn/api/p/")
      .then((r) => r.json())
      .then((data: Province[]) => {
        setProvinces(data.map((p) => ({ value: p.code, label: p.name })));
      })
      .catch(() => message.error("Không tải được danh sách tỉnh/thành. Vui lòng thử lại."))
      .finally(() => setLoadingProvinces(false));
  }, [isModalOpen]);

  // Chọn tỉnh → load quận/huyện
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
      .catch(() => message.error("Không tải được danh sách quận/huyện."))
      .finally(() => setLoadingDistricts(false));
  };

  // Chọn huyện → load phường/xã
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
      .catch(() => message.error("Không tải được danh sách phường/xã."))
      .finally(() => setLoadingWards(false));
  };

  const handleWardChange = (code: number, option: any) => {
    setShippingInfo((prev) => ({ ...prev, ward: code, wardLabel: option.label }));
  };

  const handleOrder = () => {
    const newOrder = {
    id: "ZUNO-" + Math.floor(Math.random() * 100000), // Tạo mã đơn hàng ngẫu nhiên
    items: cartItems, // Danh sách sản phẩm đã mua
    total: totalPrice, // Tổng tiền
    payment: shippingInfo.payment, // Chuyển khoản hay COD
    date: new Date().toLocaleString("vi-VN"), // Ngày giờ mua
    status: "Đang xử lý" // Trạng thái mặc định
  };

  // Lưu vào localStorage để khi F5 trang không bị mất
  const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
  localStorage.setItem("userOrders", JSON.stringify([newOrder, ...existingOrders]));

  if (shippingInfo.payment === "bank") {
    setShowQRModal(true);
  } else {
    message.success("Đặt hàng thành công!");
    clearCart();
    setIsModalOpen(false);
  }
    const { province, district, ward, fullName, phone, method } = shippingInfo;
    if (!fullName.trim()) return message.warning("Vui lòng nhập họ và tên!");
    if (!phone.trim())    return message.warning("Vui lòng nhập số điện thoại!");
    if (!province)        return message.warning("Vui lòng chọn Tỉnh/Thành phố!");
    if (!district)        return message.warning("Vui lòng chọn Quận/Huyện!");
    if (!ward)            return message.warning("Vui lòng chọn Phường/Xã!");
    if (!method)          return message.warning("Vui lòng chọn đơn vị vận chuyển!");
 message.success("ZUNO đã tiếp nhận thông tin đơn hàng của bạn!");
    
    if (paymentMethod === "Chuyển khoản ngân hàng") {
      setShowQRModal(true); // Hiện mã QR ngay lập tức
    } else {
      message.success("Đặt hàng thành công! Chúng tôi sẽ liên hệ bạn sớm.");
      clearCart();
      setIsModalOpen(false);
      router.push("/");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc: number, item: any) => acc + item.price * (item.quantity || 1), 0
  );

  if (!isClient) return null;

  return (
    <div style={{ marginTop: "180px", padding: "0 10% 80px 10%", minHeight: "70vh" }}>
      <div style={{ textAlign: "center", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
        <ShoppingCartOutlined style={{ fontSize: "32px" }} />
        <Title level={2} style={{ margin: 0, textTransform: "uppercase", fontWeight: "bold" }}>
          Giỏ hàng của bạn
        </Title>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Empty description="Giỏ hàng đang trống" />
          <Button onClick={() => router.push("/cua-hang")} style={{ marginTop: "20px" }}>
            Tiếp tục mua sắm
          </Button>
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
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                <Text>Phí vận chuyển:</Text>
                <Text>Miễn phí</Text>
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
                <Text strong style={{ fontSize: "18px" }}>Tổng cộng:</Text>
                <Text strong style={{ fontSize: "22px", color: "#dc2626" }}>{totalPrice.toLocaleString()} ₫</Text>
              </div>
              <Button
                type="primary" block size="large"
                onClick={() => setIsModalOpen(true)}
                style={{ background: "#dc2626", height: "55px", fontWeight: "bold", fontSize: "16px" }}
              >
                TIẾN HÀNH THANH TOÁN
              </Button>
            </div>
          </Col>
        </Row>
      )}
      {/* PHẦN LỊCH SỬ ĐƠN HÀNG - DÁN RIÊNG BIỆT */}
      <div style={{ marginTop: "60px", marginBottom: "40px" }}>
      <Divider>
          <Title level={3} style={{ fontSize: "22px", fontWeight: "bold", color: "#dc2626" }}>
            LỊCH SỬ ĐƠN HÀNG
          </Title>
        </Divider>

        {orders.length === 0 ? (
          <Empty description="Bạn chưa có đơn hàng nào" />
        ) : (
          <Row gutter={[20, 20]}>
            {orders.map((order, index) => (
              <Col span={24} key={index}>
                <Card variant="borderless" style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", borderRadius: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <Text strong style={{ fontSize: "16px", color: "#dc2626" }}>Mã đơn: {order.id}</Text>
                      <br />
                      <Text type="secondary">{order.date}</Text>
                    </div>
                    <Tag color="orange" style={{ borderRadius: "15px", padding: "2px 12px" }}>{order.status}</Tag>
                  </div>
                  <Divider style={{ margin: "12px 0" }} />
                  {order.items.map((it: any, idx: number) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <Text>{it.name} (Size {it.size}) x {it.quantity}</Text>
                      <Text strong>{(it.price * it.quantity).toLocaleString()} ₫</Text>
                    </div>
                  ))}
                  <Divider style={{ margin: "12px 0" }} />
                  <div style={{ textAlign: "right" }}>
                    <Text>Thanh toán: <strong>{order.payment}</strong></Text>
                    <br />
                    <Text style={{ fontSize: "18px" }}>Tổng tiền: <strong style={{ color: "#dc2626" }}>{order.total.toLocaleString()} ₫</strong></Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)} width={650} centered>
        <div style={{ textAlign: "center", padding: "10px" }}>
          <div style={{ background: "#b8923a", padding: "15px", marginBottom: "25px", borderRadius: "4px" }}>
            <Title level={4} style={{ color: "#fff", margin: 0, letterSpacing: "1px" }}>
              THÔNG TIN MUA HÀNG
            </Title>
          </div>

          <Row gutter={[15, 15]}>
            <Col span={12}>
              <Input
                placeholder="HỌ VÀ TÊN"
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                style={{ height: "45px", background: "#f0f0f0", border: "none" }}
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder="SỐ ĐIỆN THOẠI"
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                style={{ height: "45px", background: "#f0f0f0", border: "none" }}
              />
            </Col>

            <Col span={24}>
              <Input
                placeholder="ĐỊA CHỈ CỤ THỂ (SỐ NHÀ, TÊN ĐƯỜNG...)"
                value={shippingInfo.detailAddress}
                onChange={(e) => setShippingInfo({ ...shippingInfo, detailAddress: e.target.value })}
                style={{ height: "45px", background: "#f0f0f0", border: "none" }}
              />
            </Col>

            {/* TỈNH/THÀNH PHỐ */}
            <Col span={8}>
              <Select
                showSearch
                placeholder={loadingProvinces ? <Spin size="small" /> : "Tỉnh/Thành phố"}
                options={provinces}
                loading={loadingProvinces}
                value={shippingInfo.province}
                onChange={handleProvinceChange}
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                style={{ width: "100%", height: "45px" }}
                listHeight={250}
              />
            </Col>

            {/* QUẬN/HUYỆN */}
            <Col span={8}>
              <Select
                showSearch
                placeholder={loadingDistricts ? <Spin size="small" /> : "Quận/Huyện"}
                options={districts}
                loading={loadingDistricts}
                disabled={!shippingInfo.province || loadingDistricts}
                value={shippingInfo.district}
                onChange={handleDistrictChange}
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                style={{ width: "100%", height: "45px" }}
                listHeight={250}
              />
            </Col>

            {/* PHƯỜNG/XÃ */}
            <Col span={8}>
              <Select
                showSearch
                placeholder={loadingWards ? <Spin size="small" /> : "Phường/Xã"}
                options={wards}
                loading={loadingWards}
                disabled={!shippingInfo.district || loadingWards}
                value={shippingInfo.ward}
                onChange={handleWardChange}
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                style={{ width: "100%", height: "45px" }}
                listHeight={250}
              />
            </Col>

            <Col span={24}>
              <Select
                placeholder="Đơn vị vận chuyển"
                options={SHIPPING_METHODS}
                value={shippingInfo.method}
                onChange={(val) => setShippingInfo({ ...shippingInfo, method: val })}
                style={{ width: "100%", height: "45px" }}
              />
            </Col>

            <Col span={24}>
              <Select
                placeholder="Phương thức thanh toán"
                defaultValue="cod"
                options={[
                  { value: "cod",  label: "Thanh toán khi nhận hàng (COD)" },
                  { value: "bank", label: "Chuyển khoản ngân hàng" },
                ]}
             onChange={(val) => {
  setShippingInfo({ ...shippingInfo, payment: val });
  setPaymentMethod(val === "bank" ? "Chuyển khoản ngân hàng" : "Thanh toán khi nhận hàng (COD)");
}}
              />
            </Col>

            <Col span={24}>
              <TextArea
                rows={3}
                placeholder="Ghi chú thêm về đơn hàng của bạn..."
                value={shippingInfo.note}
                onChange={(e) => setShippingInfo({ ...shippingInfo, note: e.target.value })}
                style={{ background: "#f0f0f0", border: "none", borderRadius: "8px" }}
              />
            </Col>
          </Row>

          <Button
            onClick={handleOrder}
            style={{
              marginTop: "30px",
              width: "100%",
              height: "55px",
              background: "#dc2626",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            XÁC NHẬN MUA HÀNG
          </Button>
        </div>
      </Modal>
      {/* MODAL QR THANH TOÁN - CHỈ HIỆN KHI CHỌN CHUYỂN KHOẢN */}
      <Modal
        open={showQRModal}
        footer={null}
        onCancel={() => setShowQRModal(false)}
        centered
        width={450}
        styles={{ body: { padding: '20px' } }}
      >
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={{ color: "#dc2626", marginBottom: '20px' }}>
            THANH TOÁN CHUYỂN KHOẢN
          </Title>
          <Divider />
          
          <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <Text strong style={{ fontSize: "16px", display: "block", marginBottom: "15px" }}>
              Quét mã để thanh toán đơn hàng ZUNO
            </Text>
            
            {/* Sử dụng API VietQR để tạo mã QR tự động từ thông tin của bạn */}
            <img 
              src="https://api.vietqr.io/image/970422-0369739651-compact2.jpg?amount=0&addInfo=Thanh%20toan%20don%20hang%20ZUNO" 
              alt="Mã QR VietQR" 
              style={{ width: "100%", borderRadius: "8px", border: "1px solid #ddd", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} 
            />
            
            <div style={{ marginTop: "20px", textAlign: "left", fontSize: '15px' }}>
              <p style={{ margin: '5px 0' }}><strong>Ngân hàng:</strong> MB Bank (Quân Đội)</p>
              <p style={{ margin: '5px 0' }}><strong>Số tài khoản:</strong> 0369739651</p>
              <p style={{ margin: '5px 0' }}><strong>Chủ tài khoản:</strong> TRUONG HUU DUY</p>
              <p style={{ margin: '5px 0' }}><strong>Nội dung:</strong> [Tên của bạn] - Thanh toan ZUNO</p>
            </div>
          </div>

          <Button 
            type="primary" 
            size="large" 
            block 
            onClick={() => {
              message.success("ZUNO đã ghi nhận giao dịch. Chúng tôi sẽ kiểm tra và gửi hàng ngay!");
              setShowQRModal(false);
            }}
            style={{ height: "55px", background: "#dc2626", borderRadius: "30px", fontWeight: "bold", fontSize: '16px' }}
          >
            TÔI ĐÀ CHUYỂN KHOẢN XONG
          </Button>
        </div>
      </Modal>
      
    </div>
    
  );
}