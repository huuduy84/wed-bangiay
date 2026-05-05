"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Typography, Button, Input, Modal, Select, Empty, message, Divider } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { TextArea } = Input;

// BỘ DỮ LIỆU TOÀN QUỐC CẬP NHẬT CHUẨN ĐỂ FIX LỖI "LABEL OF VALUE"
const VIETNAM_DATA: any = {
  "hcm": {
    label: "Thành phố Hồ Chí Minh",
    districts: {
      "q1": { label: "Quận 1", wards: ["Phường Bến Nghé", "Phường Bến Thành", "Phường Đa Kao"] },
      "q7": { label: "Quận 7", wards: ["Phường Tân Phong", "Phường Tân Kiểng", "Phường Phú Mỹ"] },
      "td": { label: "TP. Thủ Đức", wards: ["Phường Linh Trung", "Phường Bình Thọ", "Phường Hiệp Bình Chánh"] }
    }
  },
  "hn": {
    label: "Thành phố Hà Nội",
    districts: {
      "hk": { label: "Quận Hoàn Kiếm", wards: ["Phường Hàng Bạc", "Phường Hàng Đào", "Phường Tràng Tiền"] },
      "cg": { label: "Quận Cầu Giấy", wards: ["Phường Dịch Vọng", "Phường Quan Hoa", "Phường Mai Dịch"] }
    }
  },
  "đn": {
    label: "Tỉnh Đồng Nai",
    districts: {
      "bh": { label: "Thành phố Biên Hòa", wards: ["Phường Quyết Thắng", "Phường Thống Nhất", "Phường Trảng Dài", "Phường Tân Phong"] },
      "lk": { label: "Thành phố Long Khánh", wards: ["Phường Xuân Trung", "Phường Xuân Thanh", "Phường Bảo Vinh"] }
    }
  },
  "đà_nẵng": {
    label: "Thành phố Đà Nẵng",
    districts: {
      "hc": { label: "Quận Hải Châu", wards: ["Phường Thạch Thang", "Phường Hải Châu I"] },
      "st": { label: "Quận Sơn Trà", wards: ["Phường An Hải Bắc", "Phường Thọ Quang"] }
    }
  }
};

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [address, setAddress] = useState({ province: undefined, district: undefined, ward: undefined });

  useEffect(() => setIsClient(true), []);

  const totalPrice = cartItems.reduce((acc: number, item: any) => acc + (item.price * (item.quantity || 1)), 0);

  // Fix lỗi Warning: Chuyển đổi dữ liệu sang định dạng chuẩn Ant Design
  const provinceOptions = useMemo(() => 
    Object.keys(VIETNAM_DATA).map(key => ({ 
      value: key, 
      label: VIETNAM_DATA[key].label 
    })), []);
  
  const districtOptions = useMemo(() => {
    if (!address.province) return [];
    const districts = VIETNAM_DATA[address.province as string].districts;
    return Object.keys(districts).map(key => ({ 
      value: key, 
      label: districts[key].label 
    }));
  }, [address.province]);

  const wardOptions = useMemo(() => {
    if (!address.district || !address.province) return [];
    const wards = VIETNAM_DATA[address.province as string].districts[address.district as string].wards;
    return wards.map((w: string) => ({ 
      value: w, 
      label: w 
    }));
  }, [address.province, address.district]);

  const handleOrder = () => {
    if (!address.province || !address.district || !address.ward) {
      return message.warning("Vui lòng chọn đầy đủ thông tin địa chỉ!");
    }
    message.success("Đặt hàng thành công! Cảm ơn bạn.");
    clearCart();
    setIsModalOpen(false);
    router.push("/");
  };

  if (!isClient) return null;

  return (
    <div style={{ marginTop: "180px", padding: "0 10% 80px 10%", minHeight: "70vh" }}>
      <div style={{ textAlign: "center", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
        <ShoppingCartOutlined style={{ fontSize: "32px" }} />
        <Title level={2} style={{ margin: 0, textTransform: "uppercase", fontWeight: "bold" }}>Giỏ hàng</Title>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}><Empty description="Giỏ hàng trống" /></div>
      ) : (
        <Row gutter={40}>
          <Col span={16}>
            {cartItems.map((item: any) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", padding: "20px", borderBottom: "1px solid #eee", gap: "20px" }}>
                <img src={item.img} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                <div style={{ flex: 1 }}>
                  <Title level={5}>{item.name}</Title>
                  <Text strong>{item.price.toLocaleString()} ₫</Text>
                </div>
                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeFromCart(item.id)} />
              </div>
            ))}
          </Col>

          <Col span={8}>
            <div style={{ background: "#f9f9f9", padding: "30px", borderRadius: "12px" }}>
              <Title level={4}>TỔNG CỘNG</Title>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <Text>Thành tiền:</Text>
                <Text strong style={{ fontSize: "20px", color: "#dc2626" }}>{totalPrice.toLocaleString()} ₫</Text>
              </div>
              <Button type="primary" block size="large" onClick={() => setIsModalOpen(true)} style={{ background: "#dc2626", height: "55px", fontWeight: "bold" }}>THANH TOÁN</Button>
            </div>
          </Col>
        </Row>
      )}

      {/* MODAL FIGMA - FIX LỖI WARNING VÀ THÊM TÍNH NĂNG CUỘN */}
      <Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)} width={600} centered>
        <div style={{ textAlign: "center", padding: "10px" }}>
          <div style={{ background: "#b8923a", padding: "12px", marginBottom: "30px" }}>
            <Title level={4} style={{ color: "#fff", margin: 0 }}>THÔNG TIN MUA HÀNG</Title>
          </div>

          <Row gutter={[15, 15]}>
            <Col span={12}><Input placeholder="HỌ VÀ TÊN" style={{ height: "45px", background: "#d9d9d9", border: "none" }} /></Col>
            <Col span={12}><Input placeholder="SĐT" style={{ height: "45px", background: "#d9d9d9", border: "none" }} /></Col>
            <Col span={24}><Input placeholder="ĐỊA CHỈ CỤ THỂ" style={{ height: "45px", background: "#d9d9d9", border: "none" }} /></Col>
            
            {/* TỈNH THÀNH - TÍCH HỢP CUỘN (SCROLL) */}
            <Col span={8}>
              <Select 
                showSearch
                placeholder="Tỉnh/Thành phố" 
                options={provinceOptions}
                onChange={(val) => setAddress({ province: val, district: undefined, ward: undefined })}
                style={{ width: "100%", height: "45px" }}
                listHeight={250} // Độ cao tối đa của danh sách để có thanh cuộn
              />
            </Col>

            {/* QUẬN HUYỆN - TÍCH HỢP CUỘN */}
            <Col span={8}>
              <Select 
                showSearch
                placeholder="Quận/Huyện" 
                options={districtOptions}
                disabled={!address.province}
                value={address.district}
                onChange={(val) => setAddress({ ...address, district: val, ward: undefined })}
                style={{ width: "100%", height: "45px" }}
                listHeight={250} 
              />
            </Col>

            {/* PHƯỜNG XÃ - TÍCH HỢP CUỘN */}
            <Col span={8}>
              <Select 
                showSearch
                placeholder="Phường/Xã" 
                options={wardOptions}
                disabled={!address.district}
                value={address.ward}
                onChange={(val) => setAddress({ ...address, ward: val })}
                style={{ width: "100%", height: "45px" }}
                listHeight={250}
              />
            </Col>

            <Col span={24}>
              <Select placeholder="Đơn vị vận chuyển" options={[{value:'ghn', label:'Giao hàng nhanh'}]} style={{ width: "100%", height: "45px" }} />
            </Col>
            <Col span={24}>
              <Select placeholder="Thanh toán" options={[{value:'cod', label:'COD'}]} style={{ width: "100%", height: "45px" }} />
            </Col>
            
            <Col span={10}><Select placeholder="Mã giảm giá" style={{ width: "100%", height: "45px" }} /></Col>
            <Col span={24}><TextArea rows={3} placeholder="Ghi chú..." style={{ background: "#d9d9d9", border: "none" }} /></Col>
          </Row>

          <Button onClick={handleOrder} style={{ marginTop: "30px", width: "250px", height: "50px", background: "red", color: "#fff", fontWeight: "bold", border: "none" }}>MUA HÀNG</Button>
        </div>
      </Modal>
    </div>
  );
}