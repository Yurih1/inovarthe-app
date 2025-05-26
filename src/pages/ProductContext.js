import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts } from '../services/api'; 

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setAllProducts(products);
      setFilteredProducts(products); 
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allProducts.filter((product) =>
        product.Nome.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchQuery, allProducts]);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        filteredProducts,
        setFilteredProducts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
