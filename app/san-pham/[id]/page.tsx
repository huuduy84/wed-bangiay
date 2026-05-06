"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Row, Col, Button, Rate, Tag, Divider, Modal, 
  Typography, Progress, Card, Input, Avatar, message, Select, Spin 
} from "antd";
import { 
  ShoppingCartOutlined, ThunderboltOutlined, 
  UserOutlined, SendOutlined, MessageOutlined 
} from "@ant-design/icons";
import { useCart } from "@/context/CartContext"; 

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const MOCK_REVIEWS_POOL = [
  { name: "Phạm Minh Nhật", rating: 5, comment: "Giày rất đẹp, shop tư vấn nhiệt tình!", date: "02/05/2026" },
  { name: "Ngô Gia Bảo", rating: 5, comment: "Đế êm, đi rất sướng chân. Sẽ ủng hộ shop dài.", date: "01/05/2026" },
  { name: "Trương Hữu Duy", rating: 5, comment: "Giao hàng cực nhanh, đóng gói cẩn thận lắm.", date: "03/05/2026" },
  { name: "Hoàng Trung Nam", rating: 4, comment: "Hàng chuẩn authentic, mỗi tội hộp hơi móp xíu.", date: "28/04/2026" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart(); 
  const [isClient, setIsClient] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState("40");

  // State cho phần Mua Ngay (Giống ảnh mẫu)
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "", phone: "", detailAddress: "",
    province: undefined, district: undefined, ward: undefined,
    payment: "cod", method: undefined, note: ""
  });

  const [reviews, setReviews] = useState<any[]>([]);
  const [ratingStats] = useState({ 5: 25, 4: 5, 3: 0, 2: 0, 1: 0, total: 30 });

  useEffect(() => {
    setIsClient(true);
    setReviews(MOCK_REVIEWS_POOL.slice(0, 4));
  }, []);

  useEffect(() => {
    if (isBuyNowOpen && provinces.length === 0) {
      setLoadingLoc(true);
      fetch("https://provinces.open-api.vn/api/p/")
        .then(r => r.json())
        .then(data => setProvinces(data.map((p: any) => ({ value: p.code, label: p.name }))))
        .finally(() => setLoadingLoc(false));
    }
  }, [isBuyNowOpen]);

  const allProducts = useMemo(() => {
    const baseProducts = [
      { id: 1, name: "Nike Dunk Low 'Panda'", brand: "Nike", price: 3200000, category: "SẢN PHẨM" },
      { id: 2, name: "New Balance 1906R 'White Gold'", brand: "New Balance", price: 3500000, category: "SẢN PHẨM" },
      { id: 3, name: "Jordan 1 Travis Scott Reverse Mocha", brand: "Jordan", price: 37000000, category: "SẢN PHẨM" },
      { id: 4, name: "Nike Kobe 6 Protro 'EYBL'", brand: "Nike", price: 13390000, category: "SẢN PHẨM" },
      { id: 5, name: "Yeezy Boost 350 V2 'Onyx'", brand: "Adidas", price: 7500000, category: "SẢN PHẨM" },
      { id: 6, name: "Adidas Forum Low 'Core Black'", brand: "Adidas", price: 3500000, category: "SẢN PHẨM" },
      { id: 7, name: "Adidas Samba OG 'White'", brand: "Adidas", price: 2700000, category: "SẢN PHẨM" },
      { id: 8, name: "Nike Air Force 1 '07", brand: "Nike", price: 2900000, category: "SẢN PHẨM" },
      { id: 9, name: "Nike Air Max 270 React", brand: "Nike", price: 2800000, category: "ĐANG GIẢM GIÁ" },
      { id: 10, name: "Nike Pegasus Premium", brand: "Nike", price: 2100000, category: "ĐANG GIẢM GIÁ" },
      { id: 11, name: "Áo Khoác Adidas Tiro Track", brand: "Adidas", price: 1200000, category: "QUẦN ÁO" },
      { id: 12, name: "Hoodie Nike Tech Fleece", brand: "Nike", price: 2800000, category: "QUẦN ÁO" },
      { id: 13, name: "Áo Bomber MLB NY NY", brand: "MLB", price: 3200000, category: "QUẦN ÁO" },
      { id: 14, name: "Kính Thể Thao Oakley Radar", brand: "Oakley", price: 4500000, category: "PHỤ KIỆN" },
      { id: 15, name: "Nón Kết MLB Boston Red Sox", brand: "MLB", price: 850000, category: "PHỤ KIỆN" },
    ];
    return baseProducts.map(p => ({
      ...p,
      img: `/products/${p.id}-1.jpg`,
      images: [`/products/${p.id}-1.jpg`, `/products/${p.id}-2.jpg`, `/products/${p.id}-3.jpg`]
    }));
  }, []);

  const product = useMemo(() => {
    const found = allProducts.find((p) => p.id === Number(params.id));
    if (found) setMainImage(found.images[0]);
    return found;
  }, [params.id, allProducts]);

  const handleQuickOrder = () => {
    const { fullName, phone, province, district, ward, method } = shippingInfo;
    if (!fullName || !phone || !province || !district || !ward || !method) {
      return message.warning("Vui lòng điền đầy đủ thông tin giao hàng!");
    }

    const newOrder = {
      id: "ZUNO-" + Math.floor(Math.random() * 100000),
      items: [{ ...product, size: selectedSize, quantity: 1 }],
      total: product?.price || 0,
      payment: shippingInfo.payment === "bank" ? "Chuyển khoản" : "COD",
      date: new Date().toLocaleString("vi-VN"),
      status: "Đang xử lý"
    };

    const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
    localStorage.setItem("userOrders", JSON.stringify([newOrder, ...existingOrders]));

    if (shippingInfo.payment === "bank") {
      setShowQRModal(true);
      setIsBuyNowOpen(false);
    } else {
      message.success("Đặt hàng thành công! ZUNO sẽ liên hệ bạn sớm.");
      setIsBuyNowOpen(false);
      router.push("/gio-hang");
    }
  };

  const handleProvinceChange = (val: number) => {
    setShippingInfo({ ...shippingInfo, province: val as any, district: undefined, ward: undefined });
    fetch(`https://provinces.open-api.vn/api/p/${val}?depth=2`)
      .then(r => r.json())
      .then(data => setDistricts(data.districts.map((d: any) => ({ value: d.code, label: d.name }))));
  };

  const handleDistrictChange = (val: number) => {
    setShippingInfo({ ...shippingInfo, district: val as any, ward: undefined });
    fetch(`https://provinces.open-api.vn/api/d/${val}?depth=2`)
      .then(r => r.json())
      .then(data => setWards(data.wards.map((w: any) => ({ value: w.code, label: w.name }))));
  };

  if (!isClient || !product) return null;

  return (
    <div style={{ marginTop: "180px", padding: "0 10% 80px 10%", background: "#fff" }}>
      <Row gutter={[40, 40]}>
        <Col xs={24} md={12}>
          <div style={{ background: "#f9f9f9", padding: "40px", borderRadius: "12px", textAlign: "center", minHeight: "450px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={mainImage} alt={product.name} style={{ width: "95%", height: "400px", objectFit: "contain" }} />
          </div>
          <Row gutter={10} style={{ marginTop: "15px" }}>
            {product.images.map((imgSrc, idx) => (
              <Col span={8} key={idx}>
                <div onClick={() => setMainImage(imgSrc)} style={{ cursor: "pointer", border: mainImage === imgSrc ? "2px solid #dc2626" : "1px solid #eee", borderRadius: "8px", overflow: "hidden", padding: "5px" }}>
                  <img src={imgSrc} style={{ width: "100%", height: "100px", objectFit: "contain" }} />
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={24} md={12}>
          <Tag color="red">{product.category}</Tag>
          <Title level={1} style={{ margin: "10px 0", fontSize: "32px" }}>{product.name}</Title>
          <Title level={2} style={{ color: "#dc2626", margin: "20px 0" }}>{product.price.toLocaleString()} ₫</Title>
          <Divider />
          <Text strong>CHỌN SIZE:</Text>
          <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
            {["40", "41", "42", "43"].map(size => (
              <Button key={size} type={selectedSize === size ? "primary" : "default"} onClick={() => setSelectedSize(size)} style={{ borderRadius: "8px", width: "50px" }}>{size}</Button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <Button size="large" onClick={() => {addToCart({...product, size: selectedSize}); message.success("Đã thêm vào giỏ hàng!")}} style={{ flex: 1, height: "55px", background: "#fce7e7", color: "#dc2626", fontWeight: "bold", border: "none", borderRadius: "30px" }}>THÊM GIỎ HÀNG</Button>
            <Button size="large" type="primary" onClick={() => setIsBuyNowOpen(true)} style={{ flex: 1, height: "55px", background: "#dc2626", fontWeight: "bold", border: "none", borderRadius: "30px" }}>MUA NGAY</Button>
          </div>
        </Col>
      </Row>

      {/* MODAL MUA NGAY - GIAO DIỆN THEO ẢNH MẪU */}
      <Modal 
        open={isBuyNowOpen} 
        footer={null} 
        onCancel={() => setIsBuyNowOpen(false)} 
        width={600} 
        centered
        styles={{ body: { padding: "20px" } }}
      >
        <div style={{ textAlign: "center" }}>
          {/* Header màu vàng đất */}
          <div style={{ background: "#b8923a", padding: "12px", marginBottom: "25px", borderRadius: "4px" }}>
            <Text strong style={{ color: "#fff", fontSize: "20px", letterSpacing: "1px" }}>THÔNG TIN MUA HÀNG</Text>
          </div>

          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Input placeholder="HỌ VÀ TÊN" onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} style={{ height: "45px", borderRadius: "4px" }} />
            </Col>
            <Col span={12}>
              <Input placeholder="SỐ ĐIỆN THOẠI" onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} style={{ height: "45px", borderRadius: "4px" }} />
            </Col>
            <Col span={24}>
              <Input placeholder="ĐỊA CHỈ CỤ THỂ" onChange={e => setShippingInfo({...shippingInfo, detailAddress: e.target.value})} style={{ height: "45px", borderRadius: "4px" }} />
            </Col>
            
            <Col span={8}>
              <Select placeholder="Tỉnh/Thành" options={provinces} loading={loadingLoc} onChange={handleProvinceChange} style={{ width: "100%", height: "45px" }} />
            </Col>
            <Col span={8}>
              <Select placeholder="Quận/Huyện" options={districts} disabled={!shippingInfo.province} onChange={handleDistrictChange} style={{ width: "100%", height: "45px" }} />
            </Col>
            <Col span={8}>
              <Select placeholder="Phường/Xã" options={wards} disabled={!shippingInfo.district} onChange={val => setShippingInfo({...shippingInfo, ward: val as any})} style={{ width: "100%", height: "45px" }} />
            </Col>

            <Col span={24}>
              <Select 
                placeholder="Đơn vị vận chuyển" 
                onChange={val => setShippingInfo({...shippingInfo, method: val})}
                style={{ width: "100%", height: "45px" }}
                options={[
                  { value: 'ghn', label: 'Giao hàng nhanh (GHN)' },
                  { value: 'ghtk', label: 'Giao hàng tiết kiệm (GHTK)' }
                ]}
              />
            </Col>

            <Col span={24}>
              <Select 
                defaultValue="cod" 
                onChange={val => setShippingInfo({...shippingInfo, payment: val})} 
                style={{ width: "100%", height: "45px" }}
              >
                <Select.Option value="cod">COD</Select.Option>
                <Select.Option value="bank">CHUYỂN KHOẢN NGÂN HÀNG</Select.Option>
              </Select>
            </Col>

            <Col span={24}>
              <TextArea 
                rows={3} 
                placeholder="Ghi chú..." 
                onChange={e => setShippingInfo({...shippingInfo, note: e.target.value})}
                style={{ borderRadius: "4px" }}
              />
            </Col>
          </Row>

          {/* Nút xác nhận màu đỏ rực */}
          <Button 
            onClick={handleQuickOrder} 
            block 
            size="large" 
            style={{ 
              marginTop: "30px", 
              height: "55px", 
              background: "#e32d2d", 
              color: "#fff", 
              fontWeight: "bold", 
              fontSize: "16px",
              border: "none",
              borderRadius: "4px" 
            }}
          >
            XÁC NHẬN MUA HÀNG
          </Button>
        </div>
      </Modal>

      {/* MODAL QR THANH TOÁN */}
      <Modal open={showQRModal} footer={null} onCancel={() => setShowQRModal(false)} centered width={400}>
        <div style={{ textAlign: "center" }}>
          <Title level={4} style={{ color: "#dc2626" }}>QUÉT MÃ THANH TOÁN</Title>
          <img src="https://api.vietqr.io/image/970422-0369739651-compact2.jpg?amount=0&addInfo=ZUNO" style={{ width: "100%", borderRadius: "12px" }} />
          <Button type="primary" block onClick={() => { setShowQRModal(false); router.push("/gio-hang"); message.success("ZUNO đã tiếp nhận!"); }} style={{ marginTop: "15px", height: "45px", background: "#dc2626" }}>TÔI ĐÃ CHUYỂN KHOẢN</Button>
        </div>
      </Modal>
    </div>
  );
}