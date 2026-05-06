const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Danh sách URL ảnh Nike Dunk Low 'Panda' từ các nguồn
const imageUrls = [
  'https://i8.amplience.net/i/jpl/jd_CW1590-100_C_0001_a?qlt=92',
  'https://cdn.shopify.com/s/files/1/0625/5550/products/Nike-Dunk-Low-Retro-Panda-White-Black-DD1391-100-Release-Date.jpg',
  'https://images.vans.com/is/image/Vans/MV91W5-HERO?$pd-hero-img$'
];

const outputDir = path.join(__dirname, 'public', 'products');

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Hàm tải ảnh
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(path.join(outputDir, filename));
    
    protocol.get(url, (response) => {
      // Xử lý redirect
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(`Downloaded: ${filename}`);
      });
    }).on('error', (err) => {
      fs.unlink(path.join(outputDir, filename), () => {}); // Xóa file nếu lỗi
      reject(err);
    });
  });
}

// Tải 3 ảnh
async function downloadAll() {
  try {
    console.log('Bắt đầu tải ảnh Nike Dunk Low Panda...\n');
    
    for (let i = 0; i < 3; i++) {
      try {
        const result = await downloadImage(imageUrls[i], `6-${i + 1}.jpg`);
        console.log('✓ ' + result);
      } catch (err) {
        console.log(`✗ Lỗi tải ảnh ${i + 1}: ${err.message}`);
      }
    }
    
    console.log('\n✓ Hoàn tất tải ảnh!');
  } catch (err) {
    console.error('Lỗi:', err);
  }
}

downloadAll();
