import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './ProductDetails.css';
import { useCart } from '../pages/CartContext'; // Importa o contexto do carrinho

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Hook do carrinho

  useEffect(() => {
    const productsData = JSON.parse(localStorage.getItem('randomProducts')) || [];
    const selectedProduct = productsData.find((p) => p.IdProduto === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  const handlePurchase = () => {
    const message = `Olá, gostaria de comprar o produto: ${product.Nome}.\nPreço: R$ ${product.PrecoVendaFormatado}\nLink: ${product.SiteLink}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="product-details-container">
      {product ? (
        <div>
          <h1>{product.Nome}</h1>
          <img
            src={product.ImageLink || 'assets/images/default_image.jpg'}
            alt={product.Nome}
            className="product-image"
          />
          <p>Descrição: {product.CorWebPrincipal}</p>
          <p>Preço: R$ {product.PrecoVendaFormatado}</p>
          {/* Botão para adicionar ao carrinho */}
          <Button variant="primary" onClick={() => addToCart(product)}>
            Adicionar ao Carrinho
          </Button>
          {/* Botão para finalizar a compra */}
          <Button variant="success" onClick={handlePurchase}>
            Finalizar Compra
          </Button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default ProductDetails;