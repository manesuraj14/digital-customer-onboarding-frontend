import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function LoginPrompt() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="text-center">
            <Card.Header as="h5">Access Your Dashboard</Card.Header>
            <Card.Body>
              <Card.Title>Authentication Required</Card.Title>
              <Card.Text>
                Please log in to manage your account and access all features.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/login')} className="mx-2">
                Login
              </Button>
              <Button variant="secondary" onClick={() => navigate('/register')} className="mx-2">
                Register
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPrompt;