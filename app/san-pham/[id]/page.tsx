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

// 1. BỘ DỮ LIỆU ĐÁNH GIÁ ĐA DẠNG
const MOCK_REVIEWS_POOL = [
  { name: "Lê Minh Khôi", rating: 5, comment: "Đã mua đôi thứ 2 tại ZUNO, vẫn rất hài lòng.", date: "22/04/2026" },
  { name: "Trần Bảo Ngọc", rating: 5, comment: "Giày đi ôm chân, phối đồ cực dễ luôn ạ.", date: "18/04/2026" },
  { name: "Trương Hữu Duy", rating: 5, comment: "Giao hàng cực nhanh, đóng gói cẩn thận lắm.", date: "03/05/2026" },
  { name: "Phạm Minh Nhật", rating: 5, comment: "Giày rất đẹp, shop tư vấn nhiệt tình!", date: "02/05/2026" },
  { name: "Hoàng Trung Nam", rating: 4, comment: "Hàng chuẩn authentic, mỗi tội hộp hơi móp xíu.", date: "28/04/2026" },
  { name: "Ngô Gia Bảo", rating: 5, comment: "Đế êm, đi rất sướng chân. Sẽ ủng hộ shop dài.", date: "01/05/2026" },
  { name: "Nguyễn Văn Tâm", rating: 5, comment: "Giày nhẹ, thoáng khí, đi tập gym hay chạy bộ đều ổn.", date: "04/05/2026" },
  { name: "Đặng Thu Thảo", rating: 4, comment: "Màu sắc bên ngoài đẹp hơn trong ảnh.", date: "25/04/2026" },
  { name: "Trần Thế Vinh", rating: 5, comment: "Size chuẩn, form đẹp. Chủ shop nói chuyện rất dễ thương.", date: "20/04/2026" },
  { name: "Bùi Anh Tuấn", rating: 5, comment: "Sản phẩm tuyệt vời, xứng đáng đồng tiền bát gạo!", date: "10/04/2026" },
  { name: "Phan Tuyết Nhi", rating: 5, comment: "Mua tặng người yêu mà ông ý khen suốt. Cảm ơn ZUNO nhé!", date: "05/05/2026" }
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart(); 
  const [isClient, setIsClient] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState("40");

  // State cho phần Mua Ngay (Thanh toán nhanh)
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "", phone: "", detailAddress: "",
    province: undefined, district: undefined, ward: undefined,
    payment: "cod", method: undefined, note: ""
  });

  // State cho phần Đánh giá
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [ratingStats, setRatingStats] = useState({ 5: 25, 4: 5, 3: 1, 2: 0, 1: 0, total: 31 });

  useEffect(() => {
    setIsClient(true);
    // Random bình luận khi load trang
    const shuffled = [...MOCK_REVIEWS_POOL].sort(() => 0.5 - Math.random());
    setReviews(shuffled.slice(0, 6));

    if (isBuyNowOpen && provinces.length === 0) {
      setLoadingLoc(true);
      fetch("https://provinces.open-api.vn/api/p/")
        .then(r => r.json())
        .then(data => setProvinces(data.map((p: any) => ({ value: p.code, label: p.name }))))
        .finally(() => setLoadingLoc(false));
    }
  }, [isBuyNowOpen, provinces.length]);

  const averageRating = useMemo(() => {
    const sum = (ratingStats[5]*5) + (ratingStats[4]*4) + (ratingStats[3]*3) + (ratingStats[2]*2) + (ratingStats[1]*1);
    return (sum / ratingStats.total).toFixed(1);
  }, [ratingStats]);

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
    message.success("Đặt hàng thành công! ZUNO sẽ liên hệ bạn sớm.");
    setIsBuyNowOpen(false);
    router.push("/gio-hang");
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
          <div style={{ background: "#f9f9f9", padding: "40px", borderRadius: "12px", textAlign: "center" }}>
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
          <div style={{ marginBottom: "15px" }}>
            <Rate disabled value={Number(averageRating)} />
            <span style={{ marginLeft: "10px", color: "#888" }}>{averageRating} / 5 ({ratingStats.total} đánh giá)</span>
          </div>
          <Title level={2} style={{ color: "#dc2626", margin: "20px 0" }}>{product.price.toLocaleString()} ₫</Title>
          <Divider />
          <Text strong>CHỌN SIZE:</Text>
          <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
            {["40", "41", "42", "43"].map(size => (
              <Button key={size} type={selectedSize === size ? "primary" : "default"} onClick={() => setSelectedSize(size)} style={{ borderRadius: "8px", width: "50px" }}>{size}</Button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <Button size="large" onClick={() => {addToCart({...product, size: selectedSize}); message.success("Đã thêm vào giỏ hàng!")}} style={{ flex: 1, height: "55px", borderRadius: "30px", fontWeight: "bold" }}>THÊM GIỎ HÀNG</Button>
            <Button size="large" type="primary" onClick={() => setIsBuyNowOpen(true)} style={{ flex: 1, height: "55px", background: "#dc2626", borderRadius: "30px", fontWeight: "bold" }}>MUA NGAY</Button>
          </div>
        </Col>
      </Row>

      {/* PHẦN ĐÁNH GIÁ (KHÔI PHỤC THEO ẢNH) */}
      <Divider style={{ margin: "60px 0" }} />
      <Row gutter={[40, 40]}>
        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center', background: "#fffbe6", padding: "40px", borderRadius: "12px", border: "1px solid #ffe58f" }}>
            <Title level={1} style={{ fontSize: "64px", color: "#faad14", margin: 0 }}>{averageRating}</Title>
            <Rate disabled value={Number(averageRating)} style={{ fontSize: "24px" }} />
            <div style={{ marginTop: "10px" }}><Text strong style={{ color: "#888" }}>{ratingStats.total} đánh giá</Text></div>
            <Divider style={{ margin: "20px 0" }} />
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: "8px" }}>
                <span style={{ width: '25px' }}>{star}★</span>
                <Progress percent={Math.round((ratingStats[star as keyof typeof ratingStats] / ratingStats.total) * 100)} strokeColor="#faad14" showInfo={false} style={{ flex: 1 }} />
                <span style={{ width: '35px', color: '#888', fontSize: '12px' }}>{Math.round((ratingStats[star as keyof typeof ratingStats] / ratingStats.total) * 100)}%</span>
              </div>
            ))}
          </div>
        </Col>

        <Col xs={24} md={16}>
          <Title level={4}><MessageOutlined /> Viết đánh giá của bạn</Title>
          <div style={{ marginBottom: "30px", background: "#f5f5f5", padding: "24px", borderRadius: "12px" }}>
            <Rate value={userRating} onChange={setUserRating} style={{ marginBottom: "10px" }} />
            <TextArea rows={3} placeholder="Chia sẻ cảm nhận của bạn..." value={userComment} onChange={(e) => setUserComment(e.target.value)} style={{ borderRadius: "8px", marginBottom: "15px" }} />
            <Button type="primary" icon={<SendOutlined />} onClick={() => message.success("Cảm ơn Nam đã đánh giá!")}>Gửi đánh giá</Button>
          </div>
          <div style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
            {reviews.map((rev, i) => (
              <div key={i} style={{ marginBottom: "25px", padding: "15px", borderBottom: "1px solid #f0f0f0" }}>
                <Avatar icon={<UserOutlined />} /> <Text strong style={{ marginLeft: "10px" }}>{rev.name}</Text>
                <Rate disabled value={rev.rating} style={{ fontSize: "12px", marginLeft: "15px" }} />
                <Paragraph style={{ color: "#444", marginTop: "10px" }}>{rev.comment}</Paragraph>
                <Text type="secondary" style={{ fontSize: "12px" }}>{rev.date}</Text>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      {/* MODAL MUA NGAY (KHÔI PHỤC GIAO DIỆN VÀNG ĐẤT THEO ẢNH) */}
      <Modal open={isBuyNowOpen} footer={null} onCancel={() => setIsBuyNowOpen(false)} width={600} centered styles={{ body: { padding: "20px" } }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ background: "#b8923a", padding: "12px", marginBottom: "25px", borderRadius: "4px" }}>
            <Text strong style={{ color: "#fff", fontSize: "20px", letterSpacing: "1px" }}>THÔNG TIN MUA HÀNG</Text>
          </div>
          <Row gutter={[12, 12]}>
            <Col span={12}><Input placeholder="HỌ VÀ TÊN" onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} style={{ height: "45px", borderRadius: "4px" }} /></Col>
            <Col span={12}><Input placeholder="SỐ ĐIỆN THOẠI" onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} style={{ height: "45px", borderRadius: "4px" }} /></Col>
            <Col span={24}><Input placeholder="ĐỊA CHỈ CỤ THỂ" onChange={e => setShippingInfo({...shippingInfo, detailAddress: e.target.value})} style={{ height: "45px", borderRadius: "4px" }} /></Col>
            <Col span={8}><Select placeholder="Tỉnh/Thành" options={provinces} loading={loadingLoc} onChange={handleProvinceChange} style={{ width: "100%", height: "45px" }} /></Col>
            <Col span={8}><Select placeholder="Quận/Huyện" options={districts} disabled={!shippingInfo.province} onChange={handleDistrictChange} style={{ width: "100%", height: "45px" }} /></Col>
            <Col span={8}><Select placeholder="Phường/Xã" options={wards} disabled={!shippingInfo.district} onChange={val => setShippingInfo({...shippingInfo, ward: val as any})} style={{ width: "100%", height: "45px" }} /></Col>
            <Col span={24}>
              <Select placeholder="Đơn vị vận chuyển" style={{ width: "100%", height: "45px" }} onChange={val => setShippingInfo({...shippingInfo, method: val})}
                options={[{ value: 'ghn', label: 'Giao hàng nhanh (GHN)' }, { value: 'ghtk', label: 'Giao hàng tiết kiệm (GHTK)' }]} />
            </Col>
            <Col span={24}>
              <Select defaultValue="cod" style={{ width: "100%", height: "45px" }} onChange={val => setShippingInfo({...shippingInfo, payment: val})}
                options={[{ value: 'cod', label: 'COD' }, { value: 'bank', label: 'CHUYỂN KHOẢN NGÂN HÀNG' }]} />
            </Col>
            <Col span={24}><TextArea rows={3} placeholder="Ghi chú..." style={{ borderRadius: "4px" }} /></Col>
          </Row>
          <Button onClick={handleQuickOrder} block size="large" style={{ marginTop: "30px", height: "55px", background: "#e32d2d", color: "#fff", fontWeight: "bold", border: "none", borderRadius: "4px" }}>
            XÁC NHẬN MUA HÀNG
          </Button>
        </div>
      </Modal>
    </div>
  );
}