"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Typography, Breadcrumb, Divider, Button, Tag, Empty, 
  Input, List, Avatar, Card, Row, Col 
} from "antd";
import { 
  ArrowLeftOutlined, CalendarOutlined, UserOutlined, 
  MessageOutlined, SendOutlined 
} from "@ant-design/icons";
import { newsList } from "../page"; 
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ArticleDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [comment, setComment] = useState("");

  // 1. Lấy dữ liệu bài viết hiện tại[cite: 1]
  const article = newsList.find(item => item.id.toString() === params.id);

  // 2. Lọc danh sách bài viết liên quan (bỏ qua bài hiện tại, lấy tối đa 3 bài)
  const relatedPosts = newsList
    .filter(item => item.id.toString() !== params.id)
    .slice(0, 3);

  // Dữ liệu bình luận mẫu
  const mockComments = [
    { author: "Hoàng Long", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1", content: "Bài viết rất hữu ích, mình cũng đang tính hốt đôi NB 1906R này!", datetime: "1 giờ trước" },
    { author: "Minh Thư", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2", content: "Công nghệ đệm mới của Nike nghe ấn tượng quá.", datetime: "3 giờ trước" },
  ];

  if (!article) return <div style={{ marginTop: "200px" }}><Empty description="Bài báo không tồn tại" /></div>;

  return (
    <div style={{ marginTop: "180px", padding: "0 20%", marginBottom: "100px" }}>
      {/* ĐIỀU HƯỚNG[cite: 1] */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Tin tức', href: '/tin-tuc' }, { title: 'Chi tiết' }]} />
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/tin-tuc')}>Quay lại</Button>
      </div>

      {/* NỘI DUNG CHÍNH[cite: 1] */}
      <Title level={1} style={{ fontSize: "38px", marginBottom: "20px" }}>{article.title}</Title>
      
      <div style={{ display: "flex", gap: "20px", color: "#888", marginBottom: "30px" }}>
        <span><CalendarOutlined /> {article.date}</span>
        <span><UserOutlined /> Tác giả: {article.author}</span>
      </div>

      <img 
        src={article.img} 
        alt={article.title} 
        style={{ width: "100%", borderRadius: "15px", marginBottom: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }} 
      />

      <div style={{ fontSize: "19px", lineHeight: "1.9", color: "#333", textAlign: "justify" }}>
        <Paragraph strong style={{ fontSize: "21px", color: "#555" }}>
          {article.summary}
        </Paragraph>
        
        <Divider />

        <div style={{ whiteSpace: 'pre-line', marginBottom: "40px" }}>
            {article.content}
        </div>
      </div>

      <div>
        <Text strong style={{ marginRight: "10px" }}>Chủ đề:</Text>
        {article.tags.map(tag => <Tag key={tag} color="volcano">#{tag}</Tag>)}
      </div>

      <Divider style={{ margin: "60px 0" }} />

      {/* PHẦN BÀI VIẾT LIÊN QUAN */}
      <section style={{ marginBottom: "60px" }}>
        <Title level={3} style={{ marginBottom: "30px" }}>Bài viết khác</Title>
        <Row gutter={[20, 20]}>
          {relatedPosts.map(post => (
            <Col span={8} key={post.id}>
              <Link href={`/tin-tuc/${post.id}`}>
                <Card
                  hoverable
                  cover={<img alt={post.title} src={post.img} style={{ height: 150, objectFit: 'cover' }} />}
                  bodyStyle={{ padding: '15px' }}
                >
                  <Card.Meta 
                    title={<Text strong style={{ fontSize: "14px" }}>{post.title}</Text>} 
                    description={<Text type="secondary" style={{ fontSize: "12px" }}>{post.date}</Text>}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>

      {/* PHẦN BÌNH LUẬN */}
      <section>
        <Title level={3} style={{ marginBottom: "30px" }}><MessageOutlined /> Bình luận</Title>
        
        {/* Khung nhập bình luận */}
        <div style={{ marginBottom: "40px", display: "flex", gap: "15px", alignItems: "flex-start" }}>
          <Avatar size="large" icon={<UserOutlined />} />
          <div style={{ flex: 1 }}>
            <TextArea 
              rows={3} 
              placeholder="Chia sẻ ý kiến của bạn..." 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ borderRadius: "8px", marginBottom: "10px" }}
            />
            <Button 
              type="primary" 
              icon={<SendOutlined />} 
              onClick={() => { alert("Cảm ơn bình luận của bạn!"); setComment(""); }}
              disabled={!comment.trim()}
            >
              Gửi bình luận
            </Button>
          </div>
        </div>

        {/* Danh sách bình luận */}
        <List
          itemLayout="horizontal"
          dataSource={mockComments}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<span><Text strong>{item.author}</Text> <Text type="secondary" style={{ fontSize: "12px", marginLeft: "10px" }}>{item.datetime}</Text></span>}
                description={<Text style={{ color: "#444" }}>{item.content}</Text>}
              />
            </List.Item>
          )}
        />
      </section>

      <style jsx>{`
        section { animation: fadeIn 0.8s ease-in-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;