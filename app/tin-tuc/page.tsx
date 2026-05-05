"use client";
import React, { useState, useMemo } from "react";
import { Row, Col, Typography, Pagination, Breadcrumb, Divider } from "antd";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

// DỮ LIỆU TỔNG CHO 8 BÀI VIẾT
export const newsList = [
  { 
    id: 1, 
    title: "Trải nghiệm sự êm ái với Reebok Walk Ultra 7 DMX MAX", 
    summary: "Dòng giày đi bộ huyền thoại của Reebok trở lại với công nghệ đệm khí cải tiến.", 
    content: `Reebok Walk Ultra 7 DMX MAX không chỉ là một đôi giày, đó là một trải nghiệm di chuyển hoàn toàn mới. Công nghệ DMX MAX sử dụng dòng không khí chuyển động bên dưới lòng bàn chân, giúp giảm áp lực lên gót chân và mũi chân một cách tối đa. 

    Trong phiên bản thứ 7 này, lớp da upper đã được xử lý mềm hơn, giúp ôm sát nhưng không gây bí bách. Đế ngoài bằng cao su chống trượt được thiết kế đặc biệt cho những người thường xuyên đi bộ trên bề mặt cứng như bê tông hay gạch men. Đây chắc chắn là người bạn đồng hành lý tưởng cho sức khỏe xương khớp của bạn.`,
    img: "/news-1.png", date: "10/05/2026", author: "Admin", tags: ["Reebok", "Health"] 
  },
  { 
    id: 2, 
    title: "Hoka Kaha 2 Low GTX – Chinh phục mọi địa hình", 
    summary: "Với đế Vibram siêu bám và lớp màng GORE-TEX chống thấm, đây là lựa chọn hàng đầu cho trekking.", 
    content: `Hoka Kaha 2 Low GTX mang đến sự kết hợp hoàn hảo giữa trọng lượng nhẹ và khả năng bảo vệ tối ưu. Với đệm đế giữa đặc trưng của Hoka, đôi giày cung cấp sự êm ái tuyệt vời ngay cả trên những cung đường đá sỏi gồ ghề. 

    Lớp màng GORE-TEX đảm bảo chân bạn luôn khô ráo trong mọi điều kiện thời tiết. Đặc biệt, công nghệ gót giày HUBBLE® giúp chuyển đổi bước chân mượt mà hơn, giảm mệt mỏi cho những chuyến đi dài ngày.`,
    img: "/news-2.png", date: "08/05/2026", author: "Admin", tags: ["Hoka", "Hiking"] 
  },
  { 
    id: 3, 
    title: "Khám Phá Adidas Adizero Adios 9: Đôi Giày Siêu Nhẹ", 
    summary: "Sự kết hợp hoàn hảo giữa bọt Lightstrike Pro giúp tối ưu hóa tốc độ.", 
    content: `Adidas Adizero Adios 9 là minh chứng cho việc không ngừng cải tiến tốc độ. Trọng lượng của đôi giày đã được giảm xuống mức tối thiểu nhờ lớp lưới siêu thoáng khí phía trên. 

    Trái tim của Adios 9 chính là lớp đệm Lightstrike Pro kép, cung cấp độ đàn hồi cực cao. Thanh năng lượng ENERGYTORSION 2.0 giúp tăng độ cứng vững cho đế giày, biến mỗi bước chạy thành một cú hích về phía trước. Đây là lựa chọn hàng đầu cho các cuộc đua từ 10km đến Marathon.`,
    img: "/news-3.png", date: "05/05/2026", author: "Admin", tags: ["Adidas", "Running"] 
  },
  { 
    id: 4, 
    title: "Những đôi Air Jordan đẹp nhất nửa đầu năm 2026", 
    summary: "Điểm lại những phối màu gây sốt từ dòng High đến Low của thương hiệu Jordan.", 
    content: `Nửa đầu năm 2026 chứng kiến sự bùng nổ của các phối màu Retro được xử lý bằng chất liệu hiện đại. Các phiên bản 'Reimagined' tiếp tục làm mưa làm gió trên thị trường với hiệu ứng da nứt và màu sắc vintage.

    Đáng chú ý nhất là sự trở lại của phối màu OG trên dáng cổ thấp (Low OG), thu hút sự quan tâm lớn. Sự kết hợp giữa di sản của Michael Jordan và tư duy thiết kế đương đại vẫn là công thức chiến thắng của nhà Jumpman năm nay.`,
    img: "/news-4.png", date: "02/05/2026", author: "Admin", tags: ["Jordan", "Lifestyle"] 
  },
  { 
    id: 5, 
    title: "ASICS Gel Cumulus 27: Đối Tác Tin Cậy Mỗi Bước Chạy", 
    summary: "Công nghệ PureGEL mới giúp giảm chấn tối đa, bảo vệ xương khớp hiệu quả.", 
    content: `ASICS tiếp tục khẳng định vị thế trong dòng giày chạy bộ hằng ngày với Gel Cumulus 27. Điểm cải tiến đáng giá nhất là công nghệ PureGEL nhẹ hơn và êm hơn 65% so với phiên bản cũ.

    Đệm FF BLAST™ PLUS giúp mỗi bước tiếp đất trở nên mềm mại và phản hồi lực tốt hơn. Thiết kế thân giày bằng lưới dệt kỹ thuật mang lại sự thoải mái tối đa cho bàn chân. Đây là đôi giày không thể thiếu cho những ai tìm kiếm sự ổn định và bền bỉ.`,
    img: "/news-5.png", date: "28/04/2026", author: "Admin", tags: ["Asics", "Gel"] 
  },
  { 
    id: 6, 
    title: "Sự trỗi dậy của xu hướng 'Blockcore' đường phố", 
    summary: "Tại sao Adidas Samba và Gazelle vẫn chưa có dấu hiệu hạ nhiệt?", 
    content: `Blockcore không chỉ là một trào lưu nhất thời, nó đã trở thành một phong cách sống trong năm 2026. Sự kết hợp giữa văn hóa bóng đá thập niên 90 và thời trang hiện đại đã đưa Samba, Gazelle lên tầm cao mới.

    Năm nay, xu hướng này tiến hóa với việc sử dụng các tông màu đất và chất liệu bền vững. Việc đi một đôi giày bóng đá cổ điển cùng quần denim rộng hoặc quần short túi hộp tạo nên một vẻ ngoài cực kỳ có gu. Samba vẫn là 'vua' của mọi outfit đường phố năm nay.`,
    img: "/news-6.png", date: "15/05/2026", author: "Admin", tags: ["Fashion", "Samba"] 
  },
  { 
    id: 7, 
    title: "Nike Air Max DN: Tương lai của công nghệ đệm khí", 
    summary: "Hệ thống túi khí Dynamic Air mới hứa hẹn thay đổi hoàn toàn trải nghiệm êm ái.", 
    content: `Nike Air Max DN đánh dấu một kỷ nguyên mới của dòng Air Max. Công nghệ Dynamic Air với cấu trúc túi khí bốn ống cho phép áp suất không khí thay đổi linh hoạt theo bước chân.

    Cảm giác 'không trọng lực' là điều mà Nike hướng tới. Phần upper được thiết kế với các đường vân 3D tạo chiều sâu thị giác mạnh mẽ. Đây là mẫu giày hoàn hảo cho những ai muốn tiên phong trong phong cách Techwear và yêu thích sự êm ái tuyệt đối.`,
    img: "/news-7.png", date: "12/05/2026", author: "Admin", tags: ["Nike", "Air Max"] 
  },
  { 
    id: 8, 
    title: "Top 5 phối màu New Balance 1906R đáng sở hữu", 
    summary: "1906R đang dẫn đầu dòng Retro-Running với các phối màu trung tính.", 
    content: `New Balance 1906R tiếp tục giữ vững vị thế là 'it-shoe' của năm 2026. Lấy cảm hứng từ những đôi giày chạy bộ thập niên 2000, 1906R mang đến vẻ đẹp cơ khí chi tiết với khung nhựa gót chân độc đáo.

    Năm nay, các phối màu 'Metallic Silver' và 'Phantom' đang dẫn đầu xu hướng. Sự thoải mái từ bộ đế đệm Acteva Lite kết hợp với phong cách cổ điển giúp 1906R dễ dàng chinh phục mọi phong cách thời trang, từ Casual đến Streetwear.`,
    img: "/news-8.png", date: "11/05/2026", author: "Admin", tags: ["New Balance", "1906R"] 
  }
];

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const currentNews = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return newsList.slice(startIndex, startIndex + pageSize);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ marginTop: "180px", padding: "0 15%", marginBottom: "50px" }}>
      <style jsx>{`
        .news-item { margin-bottom: 20px; transition: 0.3s; }
        .news-img-wrapper { 
          width: 100%; height: 220px; overflow: hidden; border-radius: 8px; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.1); background: #f0f0f0; cursor: pointer;
        }
        .news-img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
        .news-item:hover img { transform: scale(1.05); }
        .news-title-text { margin-top: 10px !important; transition: 0.3s; cursor: pointer; }
        .news-title-text:hover { color: #dc2626; }
      `}</style>

      <Breadcrumb style={{ marginBottom: "30px" }} items={[{ title: 'Trang chủ' }, { title: 'Tin tức' }]} />
      <Title level={2} style={{ textAlign: "center", marginBottom: "50px", textTransform: "uppercase" }}>Tin tức Sneaker</Title>

      <div className="news-container">
        {currentNews.map((item) => (
          <div key={item.id} className="news-item">
            <Row gutter={[40, 20]} align="middle">
              <Col xs={24} md={10}>
                <Link href={`/tin-tuc/${item.id}`}>
                  <div className="news-img-wrapper">
                    <img src={item.img} alt={item.title} />
                  </div>
                </Link>
              </Col>
              <Col xs={24} md={14}>
                <div>
                  <Text type="secondary">{item.date}</Text>
                  <Link href={`/tin-tuc/${item.id}`}>
                    <Title level={4} className="news-title-text">{item.title}</Title>
                  </Link>
                  <Paragraph ellipsis={{ rows: 2 }} style={{ color: "#666", fontSize: "15px" }}>{item.summary}</Paragraph>
                  <Link href={`/tin-tuc/${item.id}`}>
                    <Text strong style={{ color: "#dc2626", cursor: "pointer" }}>Xem chi tiết →</Text>
                  </Link>
                </div>
              </Col>
            </Row>
            <Divider />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <Pagination current={currentPage} total={newsList.length} pageSize={pageSize} onChange={handlePageChange} showSizeChanger={false} />
      </div>
    </div>
  );
};

export default NewsPage;