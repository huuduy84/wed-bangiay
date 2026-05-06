"use client";
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { Row, Col, Typography, Pagination, Breadcrumb, Empty, Card, Tag } from "antd"; 
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const { Text, Title } = Typography;

const baseProducts = [
  { id: 1, name: "Nike Dunk Low 'Panda'", brand: "Nike", price: 3200000, category: "SẢN PHẨM", popularity: 99, salesCount: 800, date: "2026-04-15", collection: "Dunk" },
  { id: 2, name: "New Balance 1906R 'White Gold'", brand: "New Balance", price: 3500000, category: "SẢN PHẨM", popularity: 88, salesCount: 120, date: "2026-05-02", collection: "Retro" },
  { id: 3, name: "Jordan 1 Travis Scott Reverse Mocha", brand: "Jordan", price: 37000000, category: "SẢN PHẨM", popularity: 100, salesCount: 650, date: "2026-04-20", collection: "Travis Scott" },
  { id: 4, name: "Nike Kobe 6 Protro 'EYBL'", brand: "Nike", price: 13390000, category: "SẢN PHẨM", popularity: 92, salesCount: 80, date: "2026-05-04", collection: "Basketball" },
  { id: 5, name: "Yeezy Boost 350 V2 'Onyx'", brand: "Adidas", price: 7500000, category: "SẢN PHẨM", popularity: 90, salesCount: 210, date: "2026-05-03", collection: "Yeezy" },
  { id: 6, name: "Adidas Forum Low 'Core Black'", brand: "Adidas", price: 3500000, category: "SẢN PHẨM", popularity: 95, salesCount: 150, date: "2026-05-01", collection: "Classic" },
  { id: 7, name: "Adidas Samba OG 'White'", brand: "Adidas", price: 2700000, category: "SẢN PHẨM", popularity: 97, salesCount: 450, date: "2026-05-01", collection: "Classic" },
  { id: 8, name: "Nike Air Force 1 '07", brand: "Nike", price: 2900000, category: "SẢN PHẨM", popularity: 96, salesCount: 1000, date: "2026-01-01", collection: "Classic" },
  { id: 9, name: "Nike Air Max 270 React", brand: "Nike", price: 2800000, originalPrice: 4000000, discount: 30, category: "ĐANG GIẢM GIÁ", popularity: 85, salesCount: 60, date: "2026-03-01" },
  { id: 10, name: "Nike Pegasus Premium", brand: "Nike", price: 2100000, originalPrice: 4200000, discount: 50, category: "ĐANG GIẢM GIÁ", popularity: 80, salesCount: 90, date: "2026-05-01" },
  { id: 11, name: "Áo Khoác Adidas Tiro Track", brand: "Adidas", price: 1200000, category: "QUẦN ÁO", popularity: 60, salesCount: 50, date: "2026-04-05" },
  { id: 12, name: "Hoodie Nike Tech Fleece", brand: "Nike", price: 2800000, category: "QUẦN ÁO", popularity: 91, salesCount: 140, date: "2026-05-01" },
  { id: 13, name: "Áo Bomber MLB NY NY", brand: "MLB", price: 3200000, category: "QUẦN ÁO", popularity: 88, salesCount: 75, date: "2026-05-04" },
  { id: 14, name: "Kính Thể Thao Oakley Radar", brand: "Oakley", price: 4500000, category: "PHỤ KIỆN", popularity: 40, salesCount: 15, date: "2026-03-10" },
  { id: 15, name: "Nón Kết MLB Boston Red Sox", brand: "MLB", price: 850000, category: "PHỤ KIỆN", popularity: 95, salesCount: 500, date: "2026-05-05" },
];

const allProducts = baseProducts.map(p => ({
  ...p,
  img: `/products/${p.id}-1.jpg`
}));

function ShopContent() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";
  const [activeCategory, setActiveCategory] = useState("SẢN PHẨM");
  const [sortBy, setSortBy] = useState("PHỔ BIẾN");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory, currentPage, searchKeyword]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (searchKeyword) {
      return result.filter(p =>
        p.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    result = result.filter(p => p.category === activeCategory || (activeCategory === "SẢN PHẨM" && p.category === "ĐANG GIẢM GIÁ"));
    if (sortBy === "PHỔ BIẾN") result.sort((a, b) => b.popularity - a.popularity);
    else if (sortBy === "MỚI NHẤT") result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    else if (sortBy === "BÁN CHẠY") result.sort((a, b) => b.salesCount - a.salesCount);
    return result;
  }, [activeCategory, sortBy, searchKeyword]);

  const displayProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ marginTop: "200px", padding: "0 10%", marginBottom: "50px" }}>
      <Breadcrumb style={{ marginBottom: "20px" }} items={[{ title: "Trang chủ" }, { title: "Cửa hàng" }]} />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={6}>
          <div style={{ position: "sticky", top: "240px", zIndex: 100 }}>
            <div style={{ background: "#eee", padding: "20px 0", borderRadius: "8px" }}>
              <div style={{ padding: "0 20px", fontWeight: "bold", borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "15px", fontSize: "16px" }}>
                DANH MỤC
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["SẢN PHẨM", "ĐANG GIẢM GIÁ", "QUẦN ÁO", "PHỤ KIỆN"].map(cat => (
                  <li
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                    style={{
                      padding: "15px 25px", cursor: "pointer", fontWeight: "bold", transition: "0.3s",
                      color: activeCategory === cat ? "#dc2626" : "#333",
                      background: activeCategory === cat ? "#fff" : "transparent",
                      borderLeft: activeCategory === cat ? "4px solid #dc2626" : "none",
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={18}>
          <div style={{ background: "#eee", padding: "15px 20px", display: "flex", gap: "30px", marginBottom: "30px", borderRadius: "8px" }}>
            <span style={{ fontWeight: "bold" }}>SẮP XẾP THEO</span>
            {["PHỔ BIẾN", "MỚI NHẤT", "BÁN CHẠY"].map(item => (
              <span key={item} style={{ cursor: "pointer", color: sortBy === item ? "#dc2626" : "#333", fontWeight: sortBy === item ? "bold" : "normal" }} onClick={() => setSortBy(item)}>{item}</span>
            ))}
          </div>

          <Row gutter={[20, 30]}>
            {displayProducts.map(item => (
              <Col xs={12} sm={8} lg={8} key={item.id}>
                <Link href={`/san-pham/${item.id}`} style={{ textDecoration: "none" }}>
                  <Card
                    hoverable
                    style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #f0f0f0" }}
                    styles={{ body: { padding: "15px", textAlign: "center" } }} // Đã sửa từ bodyStyle sang styles.body
                    cover={
                      <div style={{ height: "220px", background: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <img
                          src={item.img}
                          alt={item.name}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }} 
                          onError={e => (e.currentTarget.src = "https://via.placeholder.com/300x220?text=Sneaker")}
                        />
                        {item.discount && (
                          <Tag color="red" style={{ position: "absolute", top: 10, right: 5, fontWeight: "bold" }}>-{item.discount}%</Tag>
                        )}
                      </div>
                    }
                  >
                    <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>{item.brand}</Text>
                    <Title level={5} style={{ fontSize: "15px", margin: "4px 0", height: "40px", overflow: "hidden" }} ellipsis={{ rows: 2 }}>{item.name}</Title>
                    <Text strong style={{ fontSize: "16px", color: "#dc2626" }}>{item.price.toLocaleString()} ₫</Text>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>

          <div style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
            <Pagination current={currentPage} total={filteredProducts.length} pageSize={pageSize} onChange={p => setCurrentPage(p)} showSizeChanger={false} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ marginTop: "200px", textAlign: "center" }}>Đang tải cửa hàng...</div>}>
      <ShopContent />
    </Suspense>
  );
}