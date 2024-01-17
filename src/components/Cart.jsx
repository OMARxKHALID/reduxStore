import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, updateQuantity } from '../redux/cartSlice';
import { Button, Container, Table } from 'react-bootstrap';
import { FaMinus, FaPlus, FaTrash, FaArrowRight } from 'react-icons/fa';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (itemId) => {
    dispatch(remove(itemId));
  };

  const handleQuantity = (itemId, newQuantity) => {
    dispatch(updateQuantity({ itemId, newQuantity }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <h2>
          Shopping Cart
        </h2>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="align-middle">
                  <div className="d-flex align-items-center">
                    <span className="ml-2">{item.title}</span>
                  </div>
                </td>
                <td className="align-middle">${item.price}</td>
                <td className="align-middle">
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-dark"
                      onClick={() => handleQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                    >
                      <FaMinus size={8} />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-dark"
                      onClick={() => handleQuantity(item.id, item.quantity + 1)}
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                    >
                      <FaPlus size={8} />
                    </Button>
                  </div>
                </td>
                <td className="align-middle">
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    <FaTrash/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="text-center mt-3">
        <h4>Total: ${calculateTotal()}</h4>
      </div>
      <div className="text-center mt-4">
        <Button variant="dark" className="checkout-button">
          Proceed to Checkout <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
