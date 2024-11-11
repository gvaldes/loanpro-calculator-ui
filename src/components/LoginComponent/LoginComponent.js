import React, { useState } from 'react';
import { Button, Form, Container, Modal, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    if (username === 'loanproAdmin' && password === 'P@ssw0rdT3st') {
      navigate('/calculator');
    } else {
      alert('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <h1> Calculator Login </h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <br></br>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" size="lg" onClick={handleLogin}>
          Login
        </Button>
      </Form>

      <Modal show={loading} size="sm" centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal>

    </Container>
  );
}

export default LoginComponent;