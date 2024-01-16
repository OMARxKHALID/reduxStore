import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productSlice';
import { Card, Button, Container, Row, Spinner } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const cart = useSelector((state) => state.cart);

  const handleClick = (product) => {
    const updatedQuantity = (cart.find((item) => item.id === product.id)?.quantity || 0) + 1;
    dispatch(add({ ...product, quantity: updatedQuantity }));
    toast.success(`${product.title} - (${updatedQuantity}) added to cart`, { toastStyle: { background: '#4caf50', color: '#ffffff' }, autoClose: 1000 });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container className="mt-4">
      <Row>
        {products && products.length > 0 ? (
          products.map((item) => (
            <Card
              key={item.id}
              className="col-md-4 mb-4"
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                cursor: 'pointer',
              }}
            >
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.title}
                className="mx-auto mt-3"
                style={{ height: '200px', width: '200px', objectFit: 'contain', borderRadius: '10px' }}
              />
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className="text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>{item.title}</Card.Title>
                <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#555' }}>${item.price}</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => handleClick(item)}
                  style={{
                    marginTop: 'auto',
                    borderColor: '#343a40',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'background-color 0.3s',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <FaCartPlus style={{ marginRight: '8px' }} />
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Spinner animation="border" role="status" style={{ width: '7rem', height: '7rem' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Home;
