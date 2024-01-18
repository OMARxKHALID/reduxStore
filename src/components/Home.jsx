import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productSlice';
import { Card, Button, Container, Row, Col, Spinner, Pagination } from 'react-bootstrap';
import { FaCartPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.data);
  const cart = useSelector((state) => state.cart);
  const itemsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchProducts())
      .catch((error) => {
        console.error('Error fetching products:', error);
        // Handle the error, e.g., display an error message to the user
      });
  }, [dispatch]);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchInput.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (product) => {
    const updatedQuantity = (cart.find((item) => item.id === product.id)?.quantity || 0) + 1;
    dispatch(add({ ...product, quantity: updatedQuantity }));
    toast.success(`${product.title} - (${updatedQuantity}) added to cart`, {
      toastStyle: { background: '#4caf50', color: '#ffffff' },
      autoClose: 1000,
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <div className="text-center mb-4">
        <h2>New Products</h2>
      </div>
      <Container>
        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="form-control"
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <FaSearch size={24}/>
                </span>
              </div>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="input-group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-control"
              >
                <option value="">All Categories</option>
                {Array.from(new Set(allProducts.map((product) => product.category))).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="input-group-append">
                <span className="input-group-text">
                  <FaFilter size={24}/>
                </span>
              </div>
            </div>
          </Col>
        </Row>
        {allProducts.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Spinner animation="border" role="status" style={{ width: '7rem', height: '7rem' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h3>No products found.</h3>
          </div>
        ) : (
          <Row>
            {currentItems.map((item) => (
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
                  <Card.Title className="text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
                    {item.title}
                  </Card.Title>
                  <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#555' }}>
                    ${item.price}
                  </Card.Text>
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
                    <FaCartPlus style={{ marginRight: '8px', fontSize: '1.2em', color: '#fff' }} />
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Row>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination>
            {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Home;
