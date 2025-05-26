import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from './ProductContext';
import { Card, Button, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api'; 

function Products() {
  const { filteredProducts, setFilteredProducts } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const navigate = useNavigate();

  //Carrega os produtos da API/localStorage ao montar
  useEffect(() => {
    fetchProducts().then((data) => {
      setFilteredProducts(data);
    });
  }, []);

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
          <div className="col-md-4 mb-4" key={product.IdProduto}>
            <Card>
              <Card.Img variant="top" src={product.ImageLink || 'assets/images/default_image.jpg'} />
              <Card.Body>
                <Card.Title>{product.Nome}</Card.Title>
                <Card.Text>{product.CorWebPrincipal}</Card.Text>
                <Card.Text><strong>R$ {product.PrecoVendaFormatado}</strong></Card.Text>
                <Button variant="primary" onClick={() => handleClick(product.IdProduto)}>Comprar</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Pagination className="mt-4">
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
        <Pagination.Next onClick={() => setCurrentPage(prev => prev + 1)} />
      </Pagination>
    </div>
  );
}

export default Products;
