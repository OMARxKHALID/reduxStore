import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { removeAll } from '../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
    });

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleCheckout = (e) => {
        e.preventDefault();

        if (validateForm()) {
            dispatch(removeAll());
            toast.success('Thank you for your purchase!', { autoClose: 2000 });
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            toast.error('Please fill in all required fields.', { autoClose: 2000 });
        }
    };

    const validateForm = () => {
        return Object.values(formData).every((value) => value.trim() !== '');
    };

    return (
        <div style={{ padding: '15px' }} >
            <div className="mt-3">
                <Row>
                    <Col md={6}>
                        <h2 style={{ marginBottom: '20px' }}>Checkout</h2>
                        <Form noValidate>
                            {Object.entries(formData).map(([key, value]) => (
                                <Form.Group key={key} controlId={key}>
                                    <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Enter your ${key.toLowerCase()}`}
                                        name={key}
                                        value={value}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', marginBottom: '15px' }}
                                    />
                                </Form.Group>
                            ))}
                            <Button
                                variant="dark"
                                onClick={handleCheckout}
                                className="mt-3"
                                style={{ width: '100%' }}
                            >
                                Complete Purchase <FaArrowRight style={{ marginLeft: '5px' }} />
                            </Button>
                        </Form>
                    </Col>
                    <Col md={3} style={{ marginTop: '20px' }} className="container border rounded p-4">
                        <h3 style={{ marginBottom: '15px' }}>Order Summary</h3>
                        <div style={{ textAlign: 'left' }}>
                            <strong>Total items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</strong>
                            <br />
                            <strong>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</strong>
                        </div>
                    </Col>
                </Row>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Checkout;
