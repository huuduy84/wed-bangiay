"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // 1. Theo dõi trạng thái đăng nhập để xác định giỏ hàng của ai
  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("currentUser");
      if (user) {
        const email = JSON.parse(user).email;
        setUserEmail(email);
        // Tải giỏ hàng riêng của người này từ localStorage
        const savedCart = localStorage.getItem(`cart_${email}`);
        if (savedCart) setCartItems(JSON.parse(savedCart));
        else setCartItems([]);
      } else {
        setUserEmail(null);
        setCartItems([]); // Nếu không đăng nhập thì giỏ hàng trống
      }
    };

    checkUser();
    // Lắng nghe thay đổi đăng nhập/đăng xuất
    window.addEventListener("storage", checkUser);
    const interval = setInterval(checkUser, 1000);
    return () => {
      window.removeEventListener("storage", checkUser);
      clearInterval(interval);
    };
  }, []);

  // 2. Lưu giỏ hàng vào localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userEmail]);

  const addToCart = (product: any) => {
    if (!userEmail) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }
    setCartItems((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    if (userEmail) localStorage.removeItem(`cart_${userEmail}`);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);