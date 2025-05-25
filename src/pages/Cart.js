import React from 'react';
import { useCart } from '../pages/CartContext';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const handlePurchase = () => {
    if (cart.length === 0) return;
  
    // Calcular o total geral do carrinho
    const totalGeral = cart.reduce((acc, product) => {
      const totalPrice = parseFloat(product.PrecoVendaFormatado.replace(',', '.')) * product.quantity;
      return acc + totalPrice;
    }, 0).toFixed(2);
  
    // Construir a mensagem com os detalhes dos produtos no carrinho
    const productDetails = cart.map(product => {
      const totalPrice = (parseFloat(product.PrecoVendaFormatado.replace(',', '.')) * product.quantity).toFixed(2);
      return `- ${product.Nome} (Quantidade: ${product.quantity}, Preço unitário: R$ ${product.PrecoVendaFormatado}, Total: R$ ${totalPrice.replace('.', ',')})`;
    }).join('\n');
  
    //]
    const message = `Olá, gostaria de finalizar a compra com os seguintes produtos:\n\n${productDetails}\n\nTotal geral: R$ ${totalGeral.replace('.', ',')}\n\nVendido por: Inovarthe!!`;
  
    // URL do WhatsApp
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="cart-container container py-4">
      <h3 className="mb-4">
        <i className="bi bi-cart-fill text-warning"></i> Seu carrinho 
      </h3>
      <p className="text-muted mb-4">Vendido por: <strong>Inovarthe!!</strong></p>

      {cart.length > 0 ? (
        <div>
          {cart.map((product) => {
            const totalPrice = (parseFloat(product.PrecoVendaFormatado.replace(',', '.')) * product.quantity).toFixed(2);

            return (
              <div key={product.IdProduto} className="cart-item d-flex align-items-start mb-4 border-bottom pb-3">
                {/* Imagem do Produto */}
                <img
                  src={product.ImageLink || 'assets/images/default_image.jpg'}
                  alt={product.Nome}
                  className="product-image me-3"
                />
                {/* Informações do Produto */}
                <div className="cart-item-info flex-grow-1">
                  <h5 className="text-primary">{product.Marca}</h5>
                  <h6>{product.Nome}</h6>
                  <p className="text-success mb-2">
                    Preço unitário: <strong>R$ {product.PrecoVendaFormatado}</strong>
                  </p>
                  <p className="text-muted">
                    Parcelado no cartão em até  <strong>10x</strong> sem juros<strong></strong>
                  </p>
                  <div className="badges">
                    {/* <span className="badge bg-warning text-dark me-2">OFERTA BLACK FRIDAY</span> */}
                    <span className="badge bg-danger">OFERTA</span>
                  </div>
                </div>
                {/* Controles do Produto */}
                <div className="cart-item-controls text-center">
                  {/* Controle de Quantidade */}
                  <div className="quantity-control d-flex align-items-center mb-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateQuantity(product.IdProduto, product.quantity - 1)}
                      disabled={product.quantity <= 1}
                    >
                      &lt;
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateQuantity(product.IdProduto, product.quantity + 1)}
                    >
                      &gt;
                    </button>
                  </div>
                  {/* Preço Total do Produto */}
                  <p className="text-end fw-bold text-success">Total: R$ {totalPrice.replace('.', ',')}</p>
                  {/* Botão de Remover */}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(product.IdProduto)}
                  >
                    <i className="bi bi-trash"></i> REMOVER
                  </button>
                </div>
              </div>
            );
          })}
          {/* Botão para Limpar o Carrinho */}
          <button className="btn btn-danger mt-3" onClick={clearCart}>
            <i className="bi bi-trash"></i> REMOVER TODOS OS PRODUTOS
          </button>
          {/* Botão para finalizar a compra */}
          <button variant="success" className="btn btn-success mt-3 ms-2" onClick={handlePurchase}>
            FINALIZAR COMPRA!
          </button>
        </div>
      ) : (
        <p className="text-muted">Seu carrinho está vazio.</p>
      )}
    </div>
  );
}

export default Cart;