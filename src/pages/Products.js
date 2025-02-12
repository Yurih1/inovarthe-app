import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import { Card, Button, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  // Paginação
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
      </Pagination>
    </div>
  );
}

export default Products;