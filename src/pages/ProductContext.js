import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedProducts = localStorage.getItem('randomProducts');
    if (storedProducts) {
      setAllProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Filtra os produtos conforme o texto buscado
  const filteredProducts = searchQuery
    ? allProducts.filter((product) =>
        product.Nome.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProducts;

  return (
    <ProductContext.Provider
      value={{ allProducts, searchQuery, setSearchQuery, filteredProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};