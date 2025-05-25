import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import { ProductProvider } from './pages/ProductContext'; // IMPORTANTE
import './App.css';

function App() {
  return (
    <ProductProvider>
      <div className="page-container">
        <Router>
          <Header />
          <div className="content-wrap">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/carrinho" element={<Cart />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </ProductProvider>
  );
}

export default App;