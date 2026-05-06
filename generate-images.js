// Script để tạo placeholder images bằng SVG
const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'public', 'products');

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Danh sách sản phẩm và màu sắc
const products = [
  { id: 2, name: "New Balance 1906R", color: "#FFC864" },
  { id: 3, name: "Jordan 1 Travis Scott", color: "#6432C8" },
  { id: 4, name: "Nike Kobe 6", color: "#C83232" },
  { id: 5, name: "Yeezy Boost 350 V2", color: "#3264C8" },
  { id: 6, name: "Nike Dunk Low Panda", color: "#C8C8C8" },
  { id: 7, name: "Adidas Samba OG", color: "#646464" },
  { id: 8, name: "Nike Air Force 1", color: "#C86432" },
  { id: 9, name: "Nike Air Max 270", color: "#64C864" },
  { id: 10, name: "Nike Pegasus", color: "#3264C8" },
  { id: 11, name: "Adidas Tiro Track", color: "#3232C8" },
  { id: 12, name: "Hoodie Nike Tech", color: "#643264" },
  { id: 13, name: "Áo Bomber MLB", color: "#C80000" },
  { id: 14, name: "Kính Oakley", color: "#C89600" },
  { id: 15, name: "Nón MLB Boston", color: "#323232" }
];

// Tạo SVG placeholder cho mỗi sản phẩm
products.forEach(product => {
  for (let i = 1; i <= 3; i++) {
    const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="${product.color}"/>
  <rect x="50" y="50" width="300" height="300" fill="${adjustBrightness(product.color, 30)}" stroke="black" stroke-width="2"/>
  <circle cx="200" cy="150" r="40" fill="${adjustBrightness(product.color, 60)}" stroke="black" stroke-width="1"/>
  <ellipse cx="200" cy="280" rx="60" ry="40" fill="${adjustBrightness(product.color, 20)}" stroke="black" stroke-width="2"/>
  <text x="20" y="30" font-size="18" font-weight="bold" fill="black">Image ${i}</text>
  <text x="200" y="190" font-size="16" text-anchor="middle" fill="black" font-weight="bold">${product.name}</text>
</svg>`;

    const filename = path.join(productsDir, `${product.id}-${i}.svg`);
    fs.writeFileSync(filename, svg);
    console.log(`Created: ${product.id}-${i}.svg`);
  }
});

function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace("#",""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

console.log('✓ Image generation complete!');
