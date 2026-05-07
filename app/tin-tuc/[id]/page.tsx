"use client";
import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Typography, Breadcrumb, Divider, Button, Tag, Empty, 
  Input, Avatar, Card, Row, Col, Flex, message
} from "antd";
import { 
  ArrowLeftOutlined, CalendarOutlined, UserOutlined, 
  MessageOutlined, SendOutlined 
} from "@ant-design/icons";
import { newsList } from "../page"; 
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;


const COMMENT_POOL = [
  { author: "Hoàng Long",   avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",  content: "Bài viết rất hữu ích, mình cũng đang tính hốt đôi NB 1906R này!", datetime: "1 giờ trước" },
  { author: "Minh Thư",     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",  content: "Công nghệ đệm mới nghe ấn tượng quá, cảm ơn bài review chi tiết!", datetime: "3 giờ trước" },
  { author: "Tuấn Kiệt",    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",  content: "Mình đang dùng đôi này rồi, đi cực kỳ êm luôn, recommend 100%!", datetime: "5 giờ trước" },
  { author: "Phương Linh",  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",  content: "Giá hơi cao nhưng chất lượng xứng đáng từng đồng, mình đã mua 2 đôi rồi.", datetime: "2 giờ trước" },
  { author: "Bảo Châu",     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",  content: "Colorway này đẹp nhất trong dòng hiện tại luôn nha!", datetime: "6 giờ trước" },
  { author: "Nhật Hào",     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",  content: "Đang chờ sale 6/6 để chốt đôi này rồi, save bài lại để nhớ 😍", datetime: "30 phút trước" },
  { author: "Trà My",       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=7",  content: "Cảm ơn bài review chi tiết, mình đã quyết định được rồi, sẽ ghé shop cuối tuần!", datetime: "4 giờ trước" },
  { author: "Gia Huy",      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=8",  content: "Đế ngoài bám đường tốt không bạn? Mình hay đi trong thời tiết mưa.", datetime: "7 giờ trước" },
  { author: "Quỳnh Anh",    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=9",  content: "Nhìn ảnh thực tế trong bài đẹp hơn ảnh quảng cáo nhiều luôn đấy.", datetime: "2 giờ trước" },
  { author: "Minh Khoa",    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=10", content: "Size có đúng không bạn? Mình đi 42 thường nên hay phân vân khi mua online.", datetime: "1 giờ trước" },
  { author: "Hải Đăng",     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=11", content: "Thương hiệu này làm giày chạy ngon nhất hiện tại, không có đối thủ.", datetime: "8 giờ trước" },
  { author: "Thu Hương",    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=12", content: "Bài viết hay quá, mình sẽ ghé cửa hàng xem thực tế luôn cuối tuần này!", datetime: "3 giờ trước" },
];

const ArticleDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [commentInput, setCommentInput] = useState("");


  const articleId = Number(params.id) || 1;
  const defaultComments = useMemo(() => {
    const idx1 = (articleId * 3) % COMMENT_POOL.length;
    const idx2 = (articleId * 3 + 1) % COMMENT_POOL.length;
    return [COMMENT_POOL[idx1], COMMENT_POOL[idx2]];
  }, [articleId]);


  const [comments, setComments] = useState(defaultComments);

  
  const article = newsList.find(item => item.id.toString() === params.id);

  // Bài viết liên quan
  const relatedPosts = newsList
    .filter(item => item.id.toString() !== params.id)
    .slice(0, 3);

  if (!article) return <div style={{ marginTop: "200px" }}><Empty description="Bài báo không tồn tại" /></div>;

  // Gửi bình luận: thêm ngay vào đầu danh sách
  const handleSendComment = () => {
    const text = commentInput.trim();
    if (!text) return;

    const newComment = {
      author: "Bạn",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=me",
      content: text,
      datetime: "Vừa xong",
    };

    setComments(prev => [newComment, ...prev]);
    setCommentInput("");
    message.success("Đã gửi bình luận!");
  };

  return (
    <div style={{ marginTop: "180px", padding: "0 20%", marginBottom: "100px" }}>
      {/* ĐIỀU HƯỚNG */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Tin tức', href: '/tin-tuc' }, { title: 'Chi tiết' }]} />
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/tin-tuc')}>Quay lại</Button>
      </div>

      {/* NỘI DUNG CHÍNH */}
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

      {/* BÀI VIẾT LIÊN QUAN */}
      <section style={{ marginBottom: "60px" }}>
        <Title level={3} style={{ marginBottom: "30px" }}>Bài viết khác</Title>
        <Row gutter={[20, 20]}>
          {relatedPosts.map(post => (
            <Col span={8} key={post.id}>
              <Link href={`/tin-tuc/${post.id}`}>
                <Card
                  hoverable
                  cover={<img alt={post.title} src={post.img} style={{ height: 150, objectFit: 'cover' }} />}
                  styles={{ body: { padding: '15px' } }}
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
        <Title level={3} style={{ marginBottom: "30px" }}>
          <MessageOutlined /> Bình luận ({comments.length})
        </Title>
        
        {/* Ô nhập bình luận */}
        <div style={{ marginBottom: "40px", display: "flex", gap: "15px", alignItems: "flex-start" }}>
          <Avatar size="large" icon={<UserOutlined />} />
          <div style={{ flex: 1 }}>
            <TextArea 
              rows={3} 
              placeholder="Chia sẻ ý kiến của bạn..." 
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onPressEnter={(e) => {
            
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSendComment();
                }
              }}
              style={{ borderRadius: "8px", marginBottom: "10px" }}
            />
            <Button 
              type="primary"
              style={{ background: "#dc2626", borderColor: "#dc2626" }}
              icon={<SendOutlined />} 
              onClick={handleSendComment}
              disabled={!commentInput.trim()}
            >
              Gửi bình luận
            </Button>
          </div>
        </div>

        {/* Danh sách bình luận */}
        <Flex vertical gap="large">
          {comments.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                gap: '15px', 
                paddingBottom: '20px', 
                borderBottom: '1px solid #f0f0f0',
                // Highlight bình luận mới nhất (index 0 sau khi gửi)
                background: index === 0 && item.datetime === "Vừa xong" ? "#fff8f8" : "transparent",
                borderRadius: index === 0 && item.datetime === "Vừa xong" ? "8px" : "0",
                padding: index === 0 && item.datetime === "Vừa xong" ? "12px" : "0 0 20px 0",
              }}
            >
              <Avatar src={item.avatar} />
              <div style={{ flex: 1 }}>
                <Flex align="center" gap="small" style={{ marginBottom: '5px' }}>
                  <Text strong style={{ color: item.datetime === "Vừa xong" ? "#dc2626" : undefined }}>
                    {item.author}
                  </Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>{item.datetime}</Text>
                </Flex>
                <Text style={{ color: "#444" }}>{item.content}</Text>
              </div>
            </div>
          ))}
        </Flex>
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