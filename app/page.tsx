"use client";
import { Row, Col, Typography, Carousel, Button } from "antd";
import Link from "next/link";

const { Text, Title } = Typography;

export default function Home() {
  return (
    <div style={{ marginTop: "175px", paddingBottom: "80px" }}>
      
      {/* 1. CAROUSEL BANNER */}
      <div style={{ padding: "0 10%", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ border: "2px solid #3b82f6", padding: "3px", borderRadius: "8px", overflow: "hidden" }}>
          <Carousel arrows infinite autoplay>
            <div style={{ height: '350px' }}>
              <img src="/banner1.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Banner 1" />
            </div>
            <div style={{ height: '350px' }}>
              <img src="/banner2.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Banner 2" />
            </div>
            <div style={{ height: '350px' }}>
              <img src="/banner3.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Banner 3" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* 2. CÁC HÃNG GIÀY */}
      <div style={{ padding: "40px 10%", maxWidth: "1300px", margin: "0 auto" }}>
        <Row gutter={40} style={{ textAlign: "center" }}>
          <Col span={8}>
            <Title level={5} style={{ margin: 0, fontSize: "14px", fontWeight: 800 }}>MIỄN PHÍ VẬN CHUYỂN</Title>
            <Text style={{ fontSize: "12px", display: "block", marginBottom: "15px" }}>CHO ĐƠN HÀNG TRÊN 500K</Text>
            <img src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=600" style={{ width: "100%", height: "240px", objectFit: "cover", marginBottom: "10px" }} />
            <Text style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "2px" }}>ADIDAS</Text>
          </Col>
          <Col span={8}>
            <Title level={5} style={{ margin: 0, fontSize: "14px", fontWeight: 800 }}>HOÀN TIỀN NHANH</Title>
            <Text style={{ fontSize: "12px", display: "block", marginBottom: "15px" }}>TRONG VÒNG 3 NGÀY</Text>
            <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600" style={{ width: "100%", height: "240px", objectFit: "cover", marginBottom: "10px" }} />
            <Text style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "2px" }}>JORDAN</Text>
          </Col>
          <Col span={8}>
            <Title level={5} style={{ margin: 0, fontSize: "14px", fontWeight: 800 }}>MÃ GIẢM GIÁ</Title>
            <Text style={{ fontSize: "12px", display: "block", marginBottom: "15px" }}>NHẬP MÃ ZUNO2026</Text>
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600" style={{ width: "100%", height: "240px", objectFit: "cover", marginBottom: "10px" }} />
            <Text style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "2px" }}>NIKE</Text>
          </Col>
        </Row>
      </div>

      {/* 3. ĐỀ XUẤT DÀNH CHO BẠN */}
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <Title level={2} style={{ fontWeight: 900, textTransform: "uppercase" }}>ĐỀ XUẤT DÀNH CHO BẠN</Title>
      </div>
      
      <div style={{ padding: "0 10%", maxWidth: "1300px", margin: "0 auto" }}>
        <Row align="top">
          {/* Cập nhật ID đúng theo danh sách sản phẩm thực tế */}
          <ProductCard 
            id={9}
            title="Nike Air Max 270 React" 
            price="₫2,800,000" 
            colors={["#000", "#3b82f6", "#06b6d4"]} 
            imgSrc="/nike-270.png" 
          />
          <ProductCard 
            id={6} // Nike Dunk Low Panda trong kho là ID 6
            title="Nike Dunk Low 'Panda'" 
            price="₫3,200,000" 
            colors={["#000", "#fff"]} 
            imgSrc="/nike-panda.png"
          />
          <ProductCard 
            id={1} // Adidas Forum Low trong kho là ID 1
            title="Adidas Forum Low 'Core Black'" 
            price="₫3,500,000" 
            colors={["#000", "#fff", "#ef4444"]} 
            isLast 
            imgSrc="/adidas-forum.png"
          />
        </Row>

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Link href="/cua-hang">
            <Button size="large" style={{ borderRadius: "25px", padding: "0 50px", height: "50px", fontWeight: "bold", border: "2px solid #000" }}>
              XEM TẤT CẢ SẢN PHẨM
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ id, title, price, colors, isLast, imgSrc }: any) {
  return (
    <Col span={8} style={{ 
      borderRight: isLast ? "none" : "1px solid #eee", 
      padding: "0 30px", 
      textAlign: "left" 
    }}>
      <Link href={`/san-pham/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ cursor: 'pointer' }}>
          <div style={{ 
            background: "#f9f9f9", 
            height: "280px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            marginBottom: "15px",
            overflow: "hidden"
          }}>
            <img 
              src={imgSrc} 
              style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} 
              alt={title} 
            />
          </div>
          <Title level={5} style={{ fontSize: "18px", fontWeight: 500, margin: "0 0 8px 0" }}>{title}</Title>
          <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
            {colors.map((c: string) => (
              <span key={c} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid #ddd" }}></span>
            ))}
          </div>
          <Title level={4} style={{ fontWeight: 800, margin: 0 }}>{price}</Title>
        </div>
      </Link>
    </Col>
  );
}