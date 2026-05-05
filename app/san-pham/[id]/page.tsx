"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Row, Col, Button, Rate, Tag, Divider, Modal, Typography, Progress, Card } from "antd";
import { ShoppingCartOutlined, ThunderboltOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { useCart } from "@/context/CartContext"; 

const { Title, Text } = Typography;

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart(); 
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("40");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  // DANH SÁCH DỮ LIỆU ĐẦY ĐỦ TỪ SHOP
  const allProducts = [
    { id: 1, name: "Adidas Forum Low 'Core Black'", brand: "Adidas", price: 3500000, img: "/adidas-forum.png", category: "SẢN PHẨM", salesCount: 150 },
    { id: 2, name: "New Balance 1906R 'White Gold'", brand: "New Balance", price: 3500000, img: "/nb-1906r.png", category: "SẢN PHẨM", salesCount: 120 },
    { id: 3, name: "Jordan 1 Travis Scott Reverse Mocha", brand: "Jordan", price: 37000000, img: "/jordan-travis.png", category: "SẢN PHẨM", salesCount: 650 },
    { id: 6, name: "Nike Dunk Low 'Panda'", brand: "Nike", price: 3200000, img: "/nike-panda.png", category: "SẢN PHẨM", salesCount: 800 },
    { id: 7, name: "Adidas Samba OG 'White'", brand: "Adidas", price: 2700000, img: "/adidas-samba.png", category: "SẢN PHẨM", salesCount: 450 },
    { id: 9, name: "Nike Air Max 270 React", brand: "Nike", price: 2800000, img: "/nike-270.png", category: "ĐANG GIẢM GIÁ", salesCount: 60 },
  ];

  const product = useMemo(() => allProducts.find((p) => p.id === Number(params.id)), [params.id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts.filter((p) => p.id !== product.id && p.brand === product.brand).slice(0, 3);
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, size: selectedSize }); 
      setShowModal(true); 
    }
  };

  if (!isClient || !product) return null;

  return (
    <div style={{ marginTop: "180px", padding: "0 10% 80px 10%", background: "#fff" }}>
      {/* PHẦN 1: ẢNH VÀ THÔNG TIN MUA HÀNG */}
      <Row gutter={[40, 40]}>
        <Col xs={24} md={12}>
          <div style={{ background: "#f9f9f9", padding: "40px", borderRadius: "12px", textAlign: "center" }}>
            <img src={product.img} alt={product.name} style={{ width: "90%", height: "400px", objectFit: "contain" }} />
          </div>
          <Row gutter={10} style={{ marginTop: "15px" }}>
            {[1, 2, 3].map((i) => (
              <Col span={8} key={i}>
                <img src={product.img} style={{ width: "100%", border: "1px solid #eee", borderRadius: "8px", opacity: 0.6 }} />
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={24} md={12}>
          <Text style={{ color: "#1890ff", fontWeight: "600" }}>GIÀY {product.brand?.toUpperCase()}</Text>
          <Title level={1} style={{ margin: "10px 0", fontSize: "32px" }}>{product.name}</Title>
          <div style={{ marginBottom: "15px" }}>
            <Rate disabled defaultValue={5} style={{ fontSize: "14px" }} />
            <span style={{ marginLeft: "10px", color: "#888" }}>4.99 / 5 ({product.salesCount} đã bán)</span>
          </div>
          <Title level={2} style={{ color: "#dc2626", margin: "20px 0" }}>{product.price.toLocaleString()} ₫</Title>

          <Text strong>CHỌN KÍCH CỠ / SIZE</Text>
          <div style={{ display: "flex", gap: "10px", margin: "15px 0 30px 0" }}>
            {["40", "41", "42", "43"].map(size => (
              <Button 
                key={size}
                type={selectedSize === size ? "primary" : "default"}
                onClick={() => setSelectedSize(size)}
                style={{ width: "60px", height: "45px", borderRadius: "10px", fontWeight: "bold" }}
              >
                {size}
              </Button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <Button 
              size="large" icon={<ShoppingCartOutlined />} 
              onClick={handleAddToCart}
              style={{ flex: 1, height: "55px", background: "#fce7e7", color: "#dc2626", fontWeight: "bold", border: "none", borderRadius: "30px" }}
            >
              THÊM GIỎ HÀNG
            </Button>
            <Button 
              size="large" type="primary" icon={<ThunderboltOutlined />} 
              onClick={() => router.push("/gio-hang")}
              style={{ flex: 1, height: "55px", background: "#dc2626", fontWeight: "bold", border: "none", borderRadius: "30px" }}
            >
              MUA NGAY
            </Button>
          </div>
        </Col>
      </Row>

      {/* PHẦN 2: MÔ TẢ VÀ ĐÁNH GIÁ (GIỮ NGUYÊN GIAO DIỆN FIGMA) */}
      <Divider style={{ margin: "60px 0" }} />
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Button style={{ background: '#000', color: '#fff', borderRadius: '25px', padding: '0 50px', height: '45px', fontWeight: "bold" }}>MÔ TẢ</Button>
      </div>
      <div style={{ padding: "0 5%", fontSize: "16px", lineHeight: "1.8" }}>
        <p>Sản phẩm <strong>{product.name}</strong> mang phong cách hiện đại, phù hợp với mọi hoạt động hằng ngày. Chất liệu da cao cấp kết hợp cùng công nghệ đế êm ái giúp bạn tự tin trong từng bước đi.</p>
        <Text strong>CHI TIẾT ĐẶC TRƯNG:</Text>
        <ul style={{ marginTop: "10px" }}>
          <li>Thiết kế ôm chân, tôn dáng người mang.</li>
          <li>Đế cao su chống trơn trượt tối ưu.</li>
          <li>Dễ dàng phối đồ với nhiều phong cách khác nhau.</li>
        </ul>
      </div>

      <Divider style={{ margin: "50px 0" }} />
      <Row gutter={[40, 20]} align="middle">
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: "56px", color: "#faad14", margin: 0 }}>4.99 <Rate disabled defaultValue={1} count={1} /></h1>
          <Text strong>4444 đánh giá</Text>
        </Col>
        <Col xs={24} md={16}>
          {[99, 1, 0, 0, 0].map((percent, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: "8px" }}>
              <span style={{ width: '30px' }}>{5-idx}★</span>
              <Progress percent={percent} strokeColor="#faad14" showInfo={false} style={{ flex: 1 }} />
              <span style={{ width: '45px', color: "#888" }}>{percent}%</span>
            </div>
          ))}
        </Col>
      </Row>

      {/* PHẦN 3: SẢN PHẨM LIÊN QUAN */}
      <div style={{ marginTop: "80px" }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Tag color="black" style={{ padding: '8px 30px', fontSize: '16px', borderRadius: '20px', fontWeight: "bold" }}>SẢN PHẨM LIÊN QUAN</Tag>
        </div>
        <Row gutter={[24, 24]}>
          {relatedProducts.map((p) => (
            <Col xs={24} sm={12} md={8} key={p.id}>
              <Card
                hoverable
                onClick={() => router.push(`/san-pham/${p.id}`)}
                cover={<img src={p.img} style={{ padding: '20px', height: "200px", objectFit: "contain" }} />}
                style={{ borderRadius: '16px', textAlign: 'center' }}
              >
                <Text strong style={{ display: "block", height: "40px" }}>{p.name}</Text>
                <Text style={{ color: "#dc2626", fontWeight: "bold", fontSize: "18px" }}>{p.price.toLocaleString()} ₫</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* MODAL THÔNG BÁO THÀNH CÔNG */}
      <Modal open={showModal} footer={null} onCancel={() => setShowModal(false)} centered width={500}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Title level={3}>Sản phẩm đã thêm.</Title>
          <Text style={{ fontSize: "16px", display: "block", marginBottom: "30px" }}>Sản phẩm đã được thêm vào giỏ hàng!</Text>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <Button onClick={() => router.push("/")} style={{ background: "#fadb14", color: "#000", fontWeight: "bold", borderRadius: "25px", height: "50px", padding: "0 30px", border: "none" }}>VỀ TRANG CHỦ</Button>
            <Button onClick={() => router.push("/gio-hang")} style={{ background: "#fadb14", color: "#000", fontWeight: "bold", borderRadius: "25px", height: "50px", padding: "0 30px", border: "none" }}>XEM GIỎ HÀNG</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}