"use client";
import { Row, Col, Typography, Carousel, Button } from "antd";
import Link from "next/link";

const { Text, Title } = Typography;

export default function Home() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .home-wrap { margin-top: 140px !important; }
          .banner-wrap { padding: 0 3% !important; }
          .brand-section { padding: 20px 3% !important; }
          .brand-col { padding: 0 8px !important; }
          .brand-col img { height: 150px !important; }
          .brand-col .brand-title { font-size: 13px !important; }
          .brand-col .brand-label { font-size: 10px !important; }
          .suggest-wrap { padding: 0 3% !important; }
          .product-col {
            border-right: none !important;
            border-bottom: 1px solid #eee !important;
            padding: 16px 8px !important;
          }
          .product-col:last-child { border-bottom: none !important; }
          .product-img-box { height: 200px !important; }
          .product-title { font-size: 15px !important; }
          .product-price { font-size: 16px !important; }
        }
      `}</style>

      <div className="home-wrap" style={{ marginTop: "175px", paddingBottom: "80px" }}>

        {/* 1. CAROUSEL BANNER */}
        <div className="banner-wrap" style={{ padding: "0 10%", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ border: "2px solid #3b82f6", padding: "3px", borderRadius: "8px", overflow: "hidden" }}>
            <Carousel arrows infinite autoplay>
              {["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"].map((src, i) => (
                <div key={i} style={{ height: "350px" }}>
                  <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={`Banner ${i + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* 2. CÁC HÃNG GIÀY */}
        <div className="brand-section" style={{ padding: "40px 10%", maxWidth: "1300px", margin: "0 auto" }}>
          <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
            {[
              { label: "MIỄN PHÍ VẬN CHUYỂN", sub: "CHO ĐƠN HÀNG TRÊN 500K", img: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=600", brand: "ADIDAS" },
              { label: "HOÀN TIỀN NHANH", sub: "TRONG VÒNG 3 NGÀY", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600", brand: "JORDAN" },
              { label: "MÃ GIẢM GIÁ", sub: "NHẬP MÃ ZUNO2026", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600", brand: "NIKE" },
            ].map((item) => (
              <Col key={item.brand} xs={8} md={8} className="brand-col" style={{ padding: "0 20px" }}>
                <Title level={5} className="brand-label" style={{ margin: 0, fontSize: "14px", fontWeight: 800 }}>{item.label}</Title>
                <Text className="brand-label" style={{ fontSize: "12px", display: "block", marginBottom: "10px" }}>{item.sub}</Text>
                <img src={item.img} className="brand-col" style={{ width: "100%", height: "240px", objectFit: "cover", marginBottom: "8px" }} alt={item.brand} />
                <Text className="brand-title" style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "2px" }}>{item.brand}</Text>
              </Col>
            ))}
          </Row>
        </div>

        {/* 3. ĐỀ XUẤT DÀNH CHO BẠN */}
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <Title level={2} style={{ fontWeight: 900, textTransform: "uppercase" }}>ĐỀ XUẤT DÀNH CHO BẠN</Title>
        </div>

        <div className="suggest-wrap" style={{ padding: "0 10%", maxWidth: "1300px", margin: "0 auto" }}>
          <Row>
            {/* CẬP NHẬT: Đổi đường dẫn ảnh sang chuẩn mới (/products/ID-1.jpg) và gán đúng ID */}
            <ProductCard id={9} title="Nike Air Max 270 React" price="₫2,800,000" colors={["#000", "#3b82f6", "#06b6d4"]} imgSrc="/products/9-1.jpg" />
            <ProductCard id={1} title="Nike Dunk Low 'Panda'" price="₫3,200,000" colors={["#000", "#fff"]} imgSrc="/products/1-1.jpg" />
            <ProductCard id={6} title="Adidas Forum Low 'Core Black'" price="₫3,500,000" colors={["#000", "#fff", "#ef4444"]} isLast imgSrc="/products/6-1.jpg" />
          </Row>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/cua-hang">
              <Button size="large" style={{ borderRadius: "25px", padding: "0 50px", height: "50px", fontWeight: "bold", border: "2px solid #000" }}>
                XEM TẤT CẢ SẢN PHẨM
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductCard({ id, title, price, colors, isLast, imgSrc }: any) {
  return (
    <Col
      xs={24} md={8}
      className="product-col"
      style={{
        borderRight: isLast ? "none" : "1px solid #eee",
        padding: "0 30px",
        textAlign: "left",
      }}
    >
      <Link href={`/san-pham/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ cursor: "pointer" }}>
          <div
            className="product-img-box"
            style={{
              background: "#f9f9f9",
              height: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              overflow: "hidden",
            }}
          >
            <img
              src={imgSrc}
              style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }}
              alt={title}
            />
          </div>
          <Title level={5} className="product-title" style={{ fontSize: "18px", fontWeight: 500, margin: "0 0 8px 0" }}>{title}</Title>
          <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
            {colors.map((c: string) => (
              <span key={c} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid #ddd" }} />
            ))}
          </div>
          <Title level={4} className="product-price" style={{ fontWeight: 800, margin: 0 }}>{price}</Title>
        </div>
      </Link>
    </Col>
  );
}