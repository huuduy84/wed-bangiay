"use client";
import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Row, Col, Button, Rate, Tag, Divider, Progress, Card, Empty } from "antd";
import { ShoppingCartOutlined, ThunderboltOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";

// DỮ LIỆU TỪ SHOP CỦA BẠN
const allProducts = [
  { id: 1, name: "Adidas Forum Low 'Core Black'", brand: "Adidas", price: 3500000, img: "/adidas-forum.png", category: "SẢN PHẨM", popularity: 95, salesCount: 150, date: "2026-05-01", collection: "Classic" },
  { id: 2, name: "New Balance 1906R 'White Gold'", brand: "New Balance", price: 3500000, img: "/nb-1906r.png", category: "SẢN PHẨM", popularity: 88, salesCount: 120, date: "2026-05-02", collection: "Retro" },
  { id: 3, name: "Jordan 1 Travis Scott Reverse Mocha", brand: "Jordan", price: 37000000, img: "/jordan-travis.png", category: "SẢN PHẨM", popularity: 100, salesCount: 650, date: "2026-04-20", collection: "Travis Scott" },
  { id: 4, name: "Nike Kobe 6 Protro 'EYBL'", brand: "Nike", price: 13390000, img: "/nike-kobe.png", category: "SẢN PHẨM", popularity: 92, salesCount: 80, date: "2026-05-04", collection: "Basketball" },
  { id: 5, name: "Yeezy Boost 350 V2 'Onyx'", brand: "Adidas", price: 7500000, img: "/yeezy-onyx.png", category: "SẢN PHẨM", popularity: 90, salesCount: 210, date: "2026-05-03", collection: "Yeezy" },
  { id: 6, name: "Nike Dunk Low 'Panda'", brand: "Nike", price: 3200000, img: "/nike-panda.png", category: "SẢN PHẨM", popularity: 99, salesCount: 800, date: "2026-04-15", collection: "Dunk" },
  { id: 7, name: "Adidas Samba OG 'White'", brand: "Adidas", price: 2700000, img: "/adidas-samba.png", category: "SẢN PHẨM", popularity: 97, salesCount: 450, date: "2026-05-01", collection: "Classic" },
  { id: 8, name: "Nike Air Force 1 '07", brand: "Nike", price: 2900000, img: "/nike-af1.png", category: "SẢN PHẨM", popularity: 96, salesCount: 1000, date: "2026-01-01", collection: "Classic" },
  { id: 9, name: "Nike Air Max 270 React", brand: "Nike", price: 2800000, originalPrice: 4000000, discount: 30, img: "/nike-270.png", category: "ĐANG GIẢM GIÁ", popularity: 85, salesCount: 60, date: "2026-03-01" },
  { id: 10, name: "Nike Pegasus Premium", brand: "Nike", price: 2100000, originalPrice: 4200000, discount: 50, img: "/nike-pegasus.png", category: "ĐANG GIẢM GIÁ", popularity: 80, salesCount: 90, date: "2026-05-01" },
  { id: 11, name: "Áo Khoác Adidas Tiro Track", brand: "Adidas", price: 1200000, img: "/ao-adidas.png", category: "QUẦN ÁO", popularity: 60, salesCount: 50, date: "2026-04-05" },
  { id: 12, name: "Hoodie Nike Tech Fleece", brand: "Nike", price: 2800000, img: "/ao-nike.png", category: "QUẦN ÁO", popularity: 91, salesCount: 140, date: "2026-05-01" },
  { id: 13, name: "Áo Bomber MLB NY NY", brand: "MLB", price: 3200000, img: "/ao-bomber.png", category: "QUẦN ÁO", popularity: 88, salesCount: 75, date: "2026-05-04" },
  { id: 14, name: "Kính Thể Thao Oakley Radar", brand: "Oakley", price: 4500000, img: "/kinh.png", category: "PHỤ KIỆN", popularity: 40, salesCount: 15, date: "2026-03-10" },
  { id: 15, name: "Nón Kết MLB Boston Red Sox", brand: "MLB", price: 850000, img: "/non-mlb.png", category: "PHỤ KIỆN", popularity: 95, salesCount: 500, date: "2026-05-05" },
];

export default function DynamicProductDetail() {
  const params = useParams();
  const [selectedSize, setSelectedSize] = useState("40");

  // 1. LẤY DỮ LIỆU SẢN PHẨM DỰA TRÊN ID URL
  const product = useMemo(() => {
    return allProducts.find((p) => p.id === Number(params.id));
  }, [params.id]);

  // 2. LẤY SẢN PHẨM LIÊN QUAN (Cùng brand hoặc cùng category)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
      .slice(0, 3);
  }, [product]);

  if (!product) return (
    <div style={{ padding: "200px 10%", textAlign: "center" }}>
      <Empty description="Không tìm thấy sản phẩm này trong kho!" />
      <Button href="/cua-hang" type="primary" style={{ marginTop: 20 }}>Quay lại cửa hàng</Button>
    </div>
  );

  return (
    <div style={{ padding: "180px 10% 60px 10%", background: "#fff", minHeight: "100vh" }}>
      {/* PHẦN TRÊN: CHI TIẾT ĐỘNG */}
      <Row gutter={[40, 40]}>
        <Col xs={24} md={12}>
          <div style={{ background: "#f9f9f9", borderRadius: "12px", padding: "20px", display: "flex", justifyContent: "center" }}>
            <img 
              src={product.img} 
              alt={product.name} 
              style={{ width: "80%", height: "400px", objectFit: "contain", transition: "0.5s" }} 
              onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x400?text=San+Pham")}
            />
          </div>
          {/* Vì là dữ liệu động, các ảnh nhỏ ta có thể dùng ảnh chính làm demo */}
          <Row gutter={10} style={{ marginTop: "15px" }}>
            {[1, 2, 3].map((idx) => (
              <Col span={8} key={idx}>
                <img src={product.img} style={{ width: "100%", border: "1px solid #eee", opacity: 0.6, borderRadius: "8px", height: "100px", objectFit: "contain" }} />
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={24} md={12}>
          <Tag color="red" style={{ fontWeight: "600", marginBottom: "10px" }}>{product.category}</Tag>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0", lineHeight: "1.2" }}>{product.name}</h1>
          <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Rate disabled defaultValue={5} style={{ fontSize: "14px", color: "#faad14" }} />
            <span style={{ color: "#888" }}>4.99 / 5 ({product.salesCount} đã bán)</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" }}>
            <h2 style={{ color: "#dc2626", fontSize: "32px", fontWeight: "bold", margin: 0 }}>
              {product.price.toLocaleString()} ₫
            </h2>
            {product.originalPrice && (
              <span style={{ textDecoration: "line-through", color: "#999", fontSize: "18px" }}>
                {product.originalPrice.toLocaleString()} ₫
              </span>
            )}
          </div>

          {/* Chỉ hiện chọn Size nếu là Giày hoặc Quần áo */}
          {(product.category === "SẢN PHẨM" || product.category === "QUẦN ÁO") && (
            <>
              <p style={{ fontWeight: "700", marginBottom: "12px", fontSize: "14px" }}>CHỌN KÍCH CỠ / SIZE</p>
              <div style={{ display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap" }}>
                {["S", "M", "L", "XL"].map(size => (
                  <Button 
                    key={size}
                    type={selectedSize === size ? "primary" : "default"}
                    onClick={() => setSelectedSize(size)}
                    style={{ width: "55px", height: "45px", borderRadius: "10px", fontWeight: "600" }}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </>
          )}

          <div style={{ display: "flex", gap: "15px" }}>
            <Button size="large" icon={<ShoppingCartOutlined />} style={{ flex: 1, height: "55px", fontWeight: "bold", background: "#fce7e7", color: "#dc2626", border: "none", borderRadius: "12px" }}>
              THÊM GIỎ HÀNG
            </Button>
            <Button size="large" type="primary" icon={<ThunderboltOutlined />} style={{ flex: 1, height: "55px", fontWeight: "bold", background: "#dc2626", borderRadius: "12px", border: "none" }}>
              MUA NGAY
            </Button>
          </div>
          
          <p style={{ marginTop: "20px", color: "#666", fontSize: "13px" }}>* Miễn phí vận chuyển cho đơn hàng trên 2.000.000đ tại Biên Hòa.</p>
        </Col>
      </Row>

      {/* PHẦN GIỮA: MÔ TẢ ĐỘNG (Dựa trên category) */}
      <div style={{ marginTop: "80px" }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Button style={{ background: '#000', color: '#fff', borderRadius: '25px', padding: '0 50px', height: '45px', fontWeight: "bold" }}>THÔNG TIN CHI TIẾT</Button>
        </div>
        <div style={{ padding: "0 5%", color: "#333", lineHeight: "1.8", fontSize: "16px" }}>
          <p>Sản phẩm <strong>{product.name}</strong> thuộc thương hiệu <strong>{product.brand}</strong>. Đây là dòng sản phẩm cao cấp được ZUNO tuyển chọn kỹ lưỡng, đảm bảo độ bền và tính thẩm mỹ cao nhất.</p>
          <p style={{ marginTop: "15px", fontWeight: "bold" }}>ĐẶC ĐIỂM NỔI BẬT:</p>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Chất liệu cao cấp, thoáng khí và êm ái khi sử dụng.</li>
            <li>Thiết kế hiện đại, dễ dàng phối đồ cho nhiều dịp khác nhau.</li>
            <li>Đế giày (nếu có) được tích hợp công nghệ chống trơn trượt tối ưu.</li>
            <li>Cam kết chính hãng 100% từ {product.brand}.</li>
          </ul>
        </div>

        <Divider style={{ margin: "50px 0" }} />

        {/* Đánh giá mẫu - Giữ nguyên style Figma */}
        <Row gutter={[40, 20]} align="middle">
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: "56px", color: "#faad14", margin: 0, fontWeight: "bold" }}>4.99 <Rate disabled defaultValue={1} count={1} style={{ fontSize: "32px" }} /></h1>
            <p style={{ fontWeight: '700', fontSize: "18px" }}>{product.salesCount * 3} lượt xem</p>
          </Col>
          <Col xs={24} md={16}>
            {[99, 1, 0, 0, 0].map((percent, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: "8px" }}>
                <span style={{ width: '30px', fontWeight: "600" }}>{5-idx}★</span>
                <Progress percent={percent} strokeColor="#faad14" showInfo={false} style={{ flex: 1 }} />
                <span style={{ width: '45px', color: "#888" }}>{percent}%</span>
              </div>
            ))}
          </Col>
        </Row>
      </div>

      {/* PHẦN CUỐI: SẢN PHẨM LIÊN QUAN ĐỘNG */}
      <div style={{ marginTop: "100px" }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Tag color="black" style={{ padding: '8px 30px', fontSize: '16px', borderRadius: '20px', fontWeight: "bold" }}>CÓ THỂ BẠN CŨNG THÍCH</Tag>
        </div>
        <Row gutter={[24, 24]}>
          {relatedProducts.map((p) => (
            <Col xs={24} sm={12} md={8} key={p.id}>
              <Card
                hoverable
                onClick={() => window.location.href = `/san-pham/${p.id}`}
                cover={<img alt={p.name} src={p.img} style={{ padding: '15px', height: "200px", objectFit: "contain" }} />}
                style={{ borderRadius: '16px', textAlign: 'center' }}
              >
                <p style={{ fontWeight: "600", height: '40px', overflow: 'hidden' }}>{p.name}</p>
                <p style={{ color: "#dc2626", fontWeight: "bold" }}>{p.price.toLocaleString()} ₫</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}