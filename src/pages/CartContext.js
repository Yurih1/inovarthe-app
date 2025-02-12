import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto
const CartContext = createContext();

// Provedor do contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Função para salvar o carrinho no sessionStorage
  const saveCartToSessionStorage = (newCart) => {
    sessionStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Carregar o carrinho do sessionStorage
  const loadCartFromSessionStorage = () => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };

  // Carregar o carrinho ao iniciar o componente
  useEffect(() => {
    const initialCart = loadCartFromSessionStorage();
    setCart(initialCart);
  }, []);

  // Adicionar ao carrinho
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.IdProduto === product.IdProduto);
      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.IdProduto === product.IdProduto
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        saveCartToSessionStorage(updatedCart);
        return updatedCart;
      }
      const updatedCart = [...prevCart, { ...product, quantity: 1 }];
      saveCartToSessionStorage(updatedCart);
      return updatedCart;
    });
  };

  // Remover do carrinho
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.IdProduto !== id);
      saveCartToSessionStorage(updatedCart);
      return updatedCart;
    });
  };

  // Limpar carrinho
  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem('cart'); // Limpa o carrinho do sessionStorage
  };

  // Atualizar quantidade
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.IdProduto === id ? { ...item, quantity: newQuantity } : item
      );
      saveCartToSessionStorage(updatedCart);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useCart = () => {
  return useContext(CartContext);
};