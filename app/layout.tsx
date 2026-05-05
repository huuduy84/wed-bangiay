import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext"; // Kết nối tới nhà kho

export const metadata: Metadata = {
  title: "ZUNO - Wed Bán Giày",
  description: "Dự án cuối kỳ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Thẻ CartProvider phải bọc bên ngoài children thì giỏ hàng mới chạy */}
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}