import React, { useContext, useState } from 'react';
import { ProductContext } from './ProductContext';
import { Card, Button, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Products() {
  const { filteredProducts } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const navigate = useNavigate();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container">
      <h1>Todos Produtos</h1>
      <div className="row">
        {currentProducts.map(product => (
          <div className="col-md-4" key={product.IdProduto}>
            <Card>
              <Card.Img variant="top" src={product.ImageLink || 'assets/images/default_image.jpg'} />
              <Card.Body>
                <Card.Title>{product.Nome}</Card.Title>
                <Card.Text>{product.CorWebPrincipal}</Card.Text>
                <Card.Text>R$ {product.PrecoVendaFormatado}</Card.Text>
                <Button variant="primary" onClick={() => handleClick(product.IdProduto)}>Comprar</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Pagination>
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
        <Pagination.Next onClick={() => setCurrentPage(prev => prev + 1)} />
      </Pagination>
    </div>
  );
}

export default Products;