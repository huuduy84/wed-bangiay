from PIL import Image, ImageDraw, ImageFont
import os

# Tạo thư mục nếu chưa tồn tại
os.makedirs('public/products', exist_ok=True)

# Danh sách sản phẩm cần tạo ảnh
products = {
    2: "New Balance 1906R",
    3: "Jordan 1 Travis Scott",
    4: "Nike Kobe 6 Protro",
    5: "Yeezy Boost 350 V2",
    6: "Nike Dunk Low Panda",
    7: "Adidas Samba OG",
    8: "Nike Air Force 1",
    9: "Nike Air Max 270",
    10: "Nike Pegasus",
    11: "Adidas Tiro Track",
    12: "Hoodie Nike Tech",
    13: "Áo Bomber MLB",
    14: "Kính Oakley Radar",
    15: "Nón MLB Boston"
}

# Màu sắc cho từng sản phẩm
colors = {
    2: (255, 200, 100),  # New Balance - vàng cam
    3: (100, 50, 200),   # Jordan - tím
    4: (200, 50, 50),    # Kobe - đỏ
    5: (50, 100, 200),   # Yeezy - xanh
    6: (200, 200, 200),  # Panda - xám (Panda theme)
    7: (100, 100, 100),  # Samba - đen
    8: (200, 100, 50),   # Air Force 1 - cam
    9: (100, 200, 100),  # Air Max 270 - xanh lá
    10: (50, 100, 200),  # Pegasus - xanh
    11: (50, 50, 200),   # Tiro - xanh đậm
    12: (100, 50, 100),  # Hoodie - tím
    13: (200, 0, 0),     # Bomber - đỏ
    14: (200, 150, 0),   # Kính - vàng
    15: (50, 50, 50)     # Nón - đen
}

for product_id, product_name in products.items():
    color = colors.get(product_id, (150, 150, 150))
    
    for img_num in range(1, 4):
        # Tạo ảnh 400x400 pixel
        img = Image.new('RGB', (400, 400), color=color)
        draw = ImageDraw.Draw(img)
        
        # Vẽ hình chữ nhật kích thước lớn hơn ở giữa (mô phỏng sản phẩm)
        rect_color = tuple(min(c + 50, 255) for c in color)
        draw.rectangle([50, 50, 350, 350], fill=rect_color, outline=(0, 0, 0), width=2)
        
        # Thêm số ảnh nhỏ ở góc
        try:
            font = ImageFont.truetype("arial.ttf", 20)
        except:
            font = ImageFont.load_default()
        
        draw.text((20, 20), f"Image {img_num}", fill=(0, 0, 0), font=font)
        
        # Lưu ảnh
        filename = f'public/products/{product_id}-{img_num}.jpg'
        img.save(filename)
        print(f"Created: {filename}")

print("✓ Tạo ảnh sản phẩm thành công!")
