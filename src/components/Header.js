import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../pages/CartContext';
import { ProductContext } from '../pages/ProductContext'; // correto
import './Header.css';
import logo from '../assents/images/inovarthe.png';

function Header() {
  const { cart } = useCart();
  const { searchQuery, setSearchQuery } = useContext(ProductContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // já está setando a pesquisa pelo setSearchQuery
  };

  return (
    <header className="header">
      <div className="top-bar d-flex justify-content-between align-items-center py-2 px-3">
        <div className="d-flex align-items-center">
          <FaPhone className="me-2" />
          <span>11 4002 8922 ATENDIMENTO</span>
          <FaWhatsapp className="ms-4 me-2" />
          <span>11 98771 6270 WHATSAPP</span>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          <form className="search-form d-flex mx-auto" onSubmit={handleSubmit}>
            <input
              type="search"
              className="form-control"
              placeholder="Digite o que procura..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success ms-2" type="submit">
              <FaSearch />
            </button>
          </form>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link btn btn-success text-white px-3">
                  VEJA TODOS OS PRODUTOS
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/about-us" className="nav-link">
                  QUEM SOMOS
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  ENTRE EM CONTATO
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/carrinho" className="nav-link position-relative">
                  <FaShoppingCart size={20} />
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cart.length}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;