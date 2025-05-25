import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './ProductDetails.css';
import { useCart } from '../pages/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const productsData = JSON.parse(localStorage.getItem('randomProducts')) || [];
    const selectedProduct = productsData.find((p) => String(p.IdProduto) === String(id));
    setProduct(selectedProduct);
  }, [id]);

  const handlePurchase = () => {
    if (!product) return;
    const message = `Olá, gostaria de comprar o produto: ${product.Nome}.\nPreço: R$ ${product.PrecoVendaFormatado}\nLink: ${product.SiteLink}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);

    Swal.fire({
      icon: 'success',
      title: 'Adicionado ao carrinho!',
      text: `O produto "${product.Nome}" foi adicionado com sucesso.`,
      showConfirmButton: true,
      confirmButtonText: 'Ir para o carrinho',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/carrinho'); // Redireciona para o carrinho
      }
    });
  };

  if (!product) {
    return (
      <div className="container mt-4">
        <p className="text-danger">Produto não encontrado ou não existe.</p>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div>
        <h1>{product.Nome}</h1>
        <img
          src={product.ImageLink || 'assets/images/default_image.jpg'}
          alt={product.Nome}
          className="product-image"
        />

        <div className="product-info my-4">
          <p className="product-description fw-semibold text-secondary">
            🎨 <strong>Descrição:</strong> {product.CorWebPrincipal}
          </p>
          <p className="product-price fs-4 fw-bold text-success">
            💰 Preço: R$ {product.PrecoVendaFormatado}
          </p>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button variant="primary" onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </Button>
          {/* Botão para finalizar a compra */}
          <Button variant="success" onClick={handlePurchase}>
            Finalizar Compra
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;