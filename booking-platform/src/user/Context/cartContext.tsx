import React, { createContext, useContext, useState } from "react";

interface CartContextProps {
  cartItemsNum: number;
  addOneToCart: () => void;
  removeOneFromCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItemsNum, setCartItemsNum] = useState<number>(0);

  const addOneToCart = () => {
    setCartItemsNum((prev) => prev + 1);
  };

  const removeOneFromCart = () => {
    setCartItemsNum((prev) => Math.max(0, prev - 1));
  };

  return (
    <CartContext.Provider
      value={{ cartItemsNum, addOneToCart, removeOneFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
