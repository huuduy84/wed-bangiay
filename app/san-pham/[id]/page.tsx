"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Row, Col, Button, Rate, Tag, Divider, Modal, 
  Typography, Progress, Card, Empty, Input, Avatar, message 
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
  { name: "Lê Minh Khôi", rating: 5, comment: "Đã mua đôi thứ 2 tại ZUNO, vẫn rất hài lòng.", date: "22/04/2026" },
  { name: "Trần Bảo Ngọc", rating: 5, comment: "Giày đi ôm chân, phối đồ cực dễ luôn ạ.", date: "18/04/2026" },
  { name: "Nguyễn Tuấn Anh", rating: 4, comment: "Chất lượng tốt so với tầm giá, sẽ quay lại.", date: "15/04/2026" },
  { name: "Vũ Hải Đăng", rating: 5, comment: "Nhân viên hỗ trợ đổi size rất nhanh, cảm ơn shop.", date: "10/04/2026" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart(); 
  const [isClient, setIsClient] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("40");

  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  
  const [ratingStats, setRatingStats] = useState({
    5: 25, 4: 5, 3: 0, 2: 0, 1: 0, total: 30
  });

  useEffect(() => {
    setIsClient(true);
    const shuffled = [...MOCK_REVIEWS_POOL].sort(() => 0.5 - Math.random());
    setReviews(shuffled.slice(0, 4));
    setRatingStats({ 5: 25, 4: 5, 3: 0, 2: 0, 1: 0, total: 30 });
  }, [params.id]);

  const averageRating = useMemo(() => {
    const sum = (ratingStats[5]*5) + (ratingStats[4]*4) + (ratingStats[3]*3) + (ratingStats[2]*2) + (ratingStats[1]*1);
    return (sum / ratingStats.total).toFixed(1);
  }, [ratingStats]);

  const allProducts = [
    { id: 1, name: "Adidas Forum Low 'Core Black'", brand: "Adidas", price: 3500000, img: "/adidas-forum.png", category: "SẢN PHẨM", salesCount: 150 },
    { id: 2, name: "New Balance 1906R 'White Gold'", brand: "New Balance", price: 3500000, img: "/nb-1906r.png", category: "SẢN PHẨM", salesCount: 120 },
    { id: 3, name: "Jordan 1 Travis Scott Reverse Mocha", brand: "Jordan", price: 37000000, img: "/jordan-travis.png", category: "SẢN PHẨM", salesCount: 650 },
    { id: 4, name: "Nike Kobe 6 Protro 'EYBL'", brand: "Nike", price: 13390000, img: "/nike-kobe.png", category: "SẢN PHẨM", salesCount: 80 },
    { id: 5, name: "Yeezy Boost 350 V2 'Onyx'", brand: "Adidas", price: 7500000, img: "/yeezy-onyx.png", category: "SẢN PHẨM", salesCount: 210 },
    { id: 6, name: "Nike Dunk Low 'Panda'", brand: "Nike", price: 3200000, img: "/nike-panda.png", category: "SẢN PHẨM", salesCount: 800 },
    { id: 7, name: "Adidas Samba OG 'White'", brand: "Adidas", price: 2700000, img: "/adidas-samba.png", category: "SẢN PHẨM", salesCount: 450 },
    { id: 8, name: "Nike Air Force 1 '07", brand: "Nike", price: 2900000, img: "/nike-af1.png", category: "SẢN PHẨM", salesCount: 1000 },
    { id: 9, name: "Nike Air Max 270 React", brand: "Nike", price: 2800000, originalPrice: 4000000, discount: 30, img: "/nike-270.png", category: "ĐANG GIẢM GIÁ", salesCount: 60 },
    { id: 10, name: "Nike Pegasus Premium", brand: "Nike", price: 2100000, originalPrice: 4200000, discount: 50, img: "/nike-pegasus.png", category: "ĐANG GIẢM GIÁ", salesCount: 90 },
    { id: 11, name: "Áo Khoác Adidas Tiro Track", brand: "Adidas", price: 1200000, img: "/ao-adidas.png", category: "QUẦN ÁO", salesCount: 50 },
    { id: 12, name: "Hoodie Nike Tech Fleece", brand: "Nike", price: 2800000, img: "/ao-nike.png", category: "QUẦN ÁO", salesCount: 140 },
    { id: 13, name: "Áo Bomber MLB NY NY", brand: "MLB", price: 3200000, img: "/ao-bomber.png", category: "QUẦN ÁO", salesCount: 75 },
    { id: 14, name: "Kính Thể Thao Oakley Radar", brand: "Oakley", price: 4500000, img: "/kinh.png", category: "PHỤ KIỆN", salesCount: 15 },
    { id: 15, name: "Nón Kết MLB Boston Red Sox", brand: "MLB", price: 850000, img: "/non-mlb.png", category: "PHỤ KIỆN", salesCount: 500 },
  ];

  const product = useMemo(() => {
    const found = allProducts.find((p) => p.id === Number(params.id));
    if (found) setMainImage(found.img); 
    return found;
  }, [params.id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts.filter((p) => p.id !== product.id && p.brand === product.brand).slice(0, 3);
  }, [product]);

  const handleSubmitReview = () => {
    if (!userComment.trim()) return message.warning("Vui lòng nhập nội dung đánh giá!");
    
    const savedUser = localStorage.getItem("currentUser");
    const currentUserName = savedUser ? JSON.parse(savedUser).ten : "Khách hàng ZUNO";

    const newReview = {
      name: currentUserName,
      rating: userRating,
      comment: userComment,
      date: new Date().toLocaleDateString("vi-VN")
    };

    setReviews([newReview, ...reviews]);
    setRatingStats(prev => ({
      ...prev,
      [userRating]: prev[userRating as keyof typeof prev] + 1,
      total: prev.total + 1
    }));
    setUserComment("");
    setUserRating(5);
    message.success("Đã gửi đánh giá thành công!");
  };

  if (!isClient || !product) return null;

  return (
    <div style={{ marginTop: "180px", padding: "0 10% 80px 10%", background: "#fff" }}>
      <Row gutter={[40, 40]}>
        <Col xs={24} md={12}>
          <div style={{ background: "#f9f9f9", padding: "40px", borderRadius: "12px", textAlign: "center", minHeight: "450px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={mainImage || product.img} alt={product.name} style={{ width: "95%", height: "400px", objectFit: "contain", transition: "0.3s" }} />
          </div>
          <Row gutter={10} style={{ marginTop: "15px" }}>
            {[product.img, "/adidas-forum.png", "/nb-1906r.png"].map((imgSrc, idx) => (
              <Col span={8} key={idx}>
                <div onClick={() => setMainImage(imgSrc)} style={{ cursor: "pointer", border: mainImage === imgSrc ? "2px solid #dc2626" : "1px solid #eee", borderRadius: "8px", overflow: "hidden", background: "#f9f9f9", padding: "5px" }}>
                  <img src={imgSrc} style={{ width: "100%", height: "100px", objectFit: "contain", opacity: mainImage === imgSrc ? 1 : 0.7 }} />
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={24} md={12}>
          <Tag color="red">{product.category}</Tag>
          <Title level={1} style={{ margin: "10px 0", fontSize: "32px" }}>{product.name}</Title>
          <div style={{ marginBottom: "15px" }}>
            <Rate disabled value={Number(averageRating)} style={{ fontSize: "14px" }} />
            <span style={{ marginLeft: "10px", color: "#888" }}>{averageRating} / 5 ({ratingStats.total} đánh giá)</span>
          </div>
          <Title level={2} style={{ color: "#dc2626", margin: "20px 0" }}>{product.price.toLocaleString()} ₫</Title>
          <div style={{ display: "flex", gap: "15px" }}>
            <Button size="large" icon={<ShoppingCartOutlined />} onClick={() => {addToCart({...product, size: selectedSize}); setShowModal(true)}} style={{ flex: 1, height: "55px", background: "#fce7e7", color: "#dc2626", fontWeight: "bold", border: "none", borderRadius: "30px" }}>THÊM GIỎ HÀNG</Button>
            <Button size="large" type="primary" icon={<ThunderboltOutlined />} onClick={() => router.push("/gio-hang")} style={{ flex: 1, height: "55px", background: "#dc2626", fontWeight: "bold", border: "none", borderRadius: "30px" }}>MUA NGAY</Button>
          </div>
        </Col>
      </Row>

      <Divider style={{ margin: "60px 0" }} />

      <Row gutter={[40, 40]}>
        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center', background: "#fffbe6", padding: "30px", borderRadius: "12px" }}>
            <Title level={1} style={{ fontSize: "56px", color: "#faad14", margin: 0 }}>{averageRating}</Title>
            <Rate disabled value={Number(averageRating)} style={{ fontSize: "20px" }} />
            <div style={{ marginTop: "10px" }}><Text strong>{ratingStats.total} đánh giá</Text></div>
          </div>
          <div style={{ marginTop: "20px" }}>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: "8px" }}>
                <span style={{ width: '30px' }}>{star}★</span>
                <Progress percent={Math.round((ratingStats[star as keyof typeof ratingStats] / ratingStats.total) * 100)} strokeColor="#faad14" showInfo={false} style={{ flex: 1 }} />
                <span style={{ width: '45px', color: "#888" }}>{Math.round((ratingStats[star as keyof typeof ratingStats] / ratingStats.total) * 100)}%</span>
              </div>
            ))}
          </div>
        </Col>

        <Col xs={24} md={16}>
          <Title level={4}><MessageOutlined /> Viết đánh giá của bạn</Title>
          <div style={{ marginBottom: "20px", background: "#f5f5f5", padding: "20px", borderRadius: "12px" }}>
            <div style={{ marginBottom: "10px" }}><Text strong>Số sao: </Text><Rate value={userRating} onChange={setUserRating} /></div>
            <TextArea rows={3} placeholder="Chia sẻ cảm nhận..." value={userComment} onChange={(e) => setUserComment(e.target.value)} style={{ borderRadius: "8px", marginBottom: "10px" }} />
            <Button type="primary" icon={<SendOutlined />} onClick={handleSubmitReview}>Gửi đánh giá</Button>
          </div>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {reviews.map((rev, i) => (
              <div key={i} style={{ marginBottom: "20px", padding: "15px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "5px" }}>
                  <Avatar icon={<UserOutlined />} />
                  <Text strong>{rev.name}</Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>• {rev.date}</Text>
                </div>
                <Rate disabled value={rev.rating} style={{ fontSize: "12px", marginBottom: "5px" }} />
                <Paragraph style={{ color: "#444" }}>{rev.comment}</Paragraph>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "80px" }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Tag color="black" style={{ padding: '8px 30px', fontSize: '16px', borderRadius: '20px', fontWeight: "bold" }}>SẢN PHẨM LIÊN QUAN</Tag>
        </div>
        <Row gutter={[24, 24]}>
          {relatedProducts.map((p) => (
            <Col xs={24} sm={12} md={8} key={p.id}>
              <Card hoverable onClick={() => router.push(`/san-pham/${p.id}`)} cover={<img src={p.img} style={{ padding: '20px', height: "200px", objectFit: "contain" }} />} style={{ borderRadius: '16px', textAlign: 'center' }}>
                <Text strong style={{ display: "block", height: "40px" }}>{p.name}</Text>
                <Text style={{ color: "#dc2626", fontWeight: "bold", fontSize: "18px" }}>{p.price.toLocaleString()} ₫</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal open={showModal} footer={null} onCancel={() => setShowModal(false)} centered width={500}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Title level={3}>Thành công!</Title>
          <Text style={{ fontSize: "16px", display: "block", marginBottom: "30px" }}>Đã thêm vào giỏ hàng!</Text>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <Button onClick={() => router.push("/")} style={{ background: "#fadb14", fontWeight: "bold", borderRadius: "25px", height: "50px", padding: "0 30px", border: "none" }}>VỀ TRANG CHỦ</Button>
            <Button onClick={() => router.push("/gio-hang")} style={{ background: "#fadb14", fontWeight: "bold", borderRadius: "25px", height: "50px", padding: "0 30px", border: "none" }}>XEM GIỎ HÀNG</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}