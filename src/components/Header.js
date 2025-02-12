import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../pages/CartContext';
import './Header.css';

function Header() {
  const { cart } = useCart(); // Obter os itens do carrinho

  return (
    <header className="header">
      {/* Topo com contatos */}
      <div className="top-bar d-flex justify-content-between align-items-center py-2 px-3">
        <div className="d-flex align-items-center">
          <FaPhone className="me-2" />
          <span>11 4002 8922 ATENDIMENTO</span>
          <FaWhatsapp className="ms-4 me-2" />
          <span>11 98771 6270 WHATSAPP</span>
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img src="inovarthe.png" alt="Logo" className="logo" />
          </Link>

          {/* Barra de Pesquisa */}
          <form className="search-form d-flex mx-auto">
            <input
              type="search"
              className="form-control"
              placeholder="Digite o que procura..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <FaSearch />
            </button>
          </form>

          {/* Menu de Navegação */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link btn btn-success text-white px-3">
                  VEJA TODOS OS PRODUTOS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about-us" className="nav-link">
                  QUEM SOMOS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  ENTRE EM CONTATO
                </Link>
              </li>
              {/* Botão do carrinho */}
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