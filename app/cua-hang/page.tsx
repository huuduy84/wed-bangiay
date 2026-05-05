"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Row, Col, Typography, Pagination, Breadcrumb, Tag, Card } from "antd";
import Link from "next/link"; // Thêm Link để chuyển trang

const { Text, Title } = Typography;

// DANH SÁCH 15 SẢN PHẨM (Giữ nguyên từ file cũ của bạn)
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

const collections = [
  { id: "Classic", name: "Bộ Sưu Tập Classic", img: "/adidas-samba.png", desc: "Vẻ đẹp vượt thời gian" },
  { id: "Retro", name: "Phong Cách Retro", img: "/nb-1906r.png", desc: "Sự trở lại của thập niên 90" },
  { id: "Yeezy", name: "Yeezy Series", img: "/yeezy-onyx.png", desc: "Đỉnh cao thiết kế Kanye West" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("SẢN PHẨM");
  const [selectedCol, setSelectedCol] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("PHỔ BIẾN");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory, selectedCol, currentPage]);

  const filteredProducts = useMemo(() => {
    let result = [];
    if (activeCategory === "SẢN PHẨM") {
      result = allProducts.filter(p => p.category === "SẢN PHẨM" || p.category === "ĐANG GIẢM GIÁ");
    } else if (activeCategory === "BỘ SƯU TẬP") {
      result = selectedCol ? allProducts.filter(p => p.collection === selectedCol) : [];
    } else {
      result = allProducts.filter(p => p.category === activeCategory);
    }

    if (sortBy === "PHỔ BIẾN") result.sort((a, b) => b.popularity - a.popularity);
    else if (sortBy === "MỚI NHẤT") result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    else if (sortBy === "BÁN CHẠY") result.sort((a, b) => b.salesCount - a.salesCount);
    
    return result;
  }, [activeCategory, selectedCol, sortBy]);

  const displayProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ marginTop: "180px", padding: "0 10%", marginBottom: "50px" }}>
      <Breadcrumb style={{ marginBottom: "20px" }} items={[{ title: 'Trang chủ' }, { title: 'Cửa hàng' }]} />

      <Row gutter={40}>
        <Col span={6}>
          <div style={{ position: "sticky", top: "240px", zIndex: 100 }}>
             <div style={{ background: "#eee", padding: "20px 0", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ padding: "0 20px", fontWeight: "bold", borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "15px", fontSize: "16px" }}>DANH MỤC</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["SẢN PHẨM", "ĐANG GIẢM GIÁ", "BỘ SƯU TẬP", "QUẦN ÁO", "PHỤ KIỆN"].map(cat => (
                    <li key={cat} className={`sidebar-item ${activeCategory === cat ? "active" : ""}`} 
                        onClick={() => { setActiveCategory(cat); setSelectedCol(null); setCurrentPage(1); }}>
                      {activeCategory === cat && "→ "} {cat}
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </Col>

        <Col span={18}>
          <div style={{ position: "sticky", top: "240px", background: "#eee", padding: "15px 20px", display: "flex", gap: "30px", marginBottom: "30px", zIndex: 99, borderBottom: "2px solid #ddd", borderRadius: "8px" }}>
            <span style={{ fontWeight: "bold" }}>SẮP XẾP THEO</span>
            {["PHỔ BIẾN", "MỚI NHẤT", "BÁN CHẠY"].map(item => (
              <span key={item} className={`sort-link ${sortBy === item ? "active-sort" : ""}`} onClick={() => setSortBy(item)}>{item}</span>
            ))}
          </div>

          {activeCategory === "BỘ SƯU TẬP" && !selectedCol ? (
            <Row gutter={[20, 20]}>
              {collections.map(col => (
                <Col span={8} key={col.id}>
                  <Card hoverable cover={<img src={col.img} style={{ height: 180, objectFit: 'contain', background: '#f5f5f5' }} />} onClick={() => setSelectedCol(col.id)}>
                    <Card.Meta title={col.name} description={col.desc} />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <>
              <Row gutter={[30, 40]}>
                {displayProducts.map((item) => (
                  <Col span={12} key={item.id}>
                    {/* Bọc toàn bộ card sản phẩm bằng Link để chuyển sang trang chi tiết */}
                    <Link href={`/san-pham/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="product-card">
                        <div className="img-box">
                          <img src={item.img} alt={item.name} onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300x300?text=San+Pham")} />
                          {item.discount && <div className="sale-label">-{item.discount}%</div>}
                        </div>
                        <Text className="brand-label">{item.brand}</Text>
                        <Title level={5} className="item-name">{item.name}</Title>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                          <Text className="curr-price">{item.price.toLocaleString()} ₫</Text>
                          {item.originalPrice && <Text delete className="old-price">{item.originalPrice.toLocaleString()} ₫</Text>}
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>

              <div style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
                <Pagination current={currentPage} total={filteredProducts.length} pageSize={pageSize} onChange={(p) => setCurrentPage(p)} showSizeChanger={false} />
              </div>
            </>
          )}
        </Col>
      </Row>

      <style jsx>{`
        .sidebar-item, .sort-link { user-select: none; cursor: pointer; }
        .sidebar-item { padding: 15px 25px; transition: 0.3s; border-bottom: 1px solid #ddd; font-weight: 600; text-transform: uppercase; }
        .sidebar-item:hover { background: #e5e5e5; }
        .sidebar-item.active { color: #dc2626; background: #fff; border-left: 4px solid #dc2626; }
        .sort-link { font-weight: 500; transition: 0.2s; }
        .active-sort { color: #dc2626; border-bottom: 2px solid #dc2626; }
        .product-card { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; }
        .product-card:hover { transform: translateY(-12px); }
        .img-box { background: #f9f9f9; height: 300px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; position: relative; overflow: hidden; border-radius: 12px; }
        .img-box img { max-width: 85%; max-height: 80%; object-fit: contain; transition: 0.5s; }
        .product-card:hover img { transform: scale(1.08); }
        .sale-label { position: absolute; top: 12px; right: 12px; background: #fde68a; color: #f59e0b; padding: 4px 10px; font-weight: bold; border-radius: 6px; }
        .brand-label { font-size: 12px; color: #888; font-style: italic; }
        .item-name { font-size: 16px; margin: 5px 0; min-height: 40px; color: #000; }
        .curr-price { font-size: 18px; font-weight: bold; color: #dc2626; }
        .old-price { font-size: 14px; color: #999; }
      `}</style>
    </div>
  );
}