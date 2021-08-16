import React from "react";
import "../styles/auth.css";
import { Card, Form, Container, Button, Row, Col } from 'react-bootstrap';

export default function SignUp() {
  return (
    <div className="auth">
      <Container className="d-flex justify-content-center">
      <Form>
        <Card style={{ width: 500}} className="mt-5">
          <Card.Header className="text-center bg-dark text-white">
            <h3>Formulario de registro</h3>
          </Card.Header>

          <Card.Body className="d-flex justify-content-center">
            <div className="w-75">
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Nombres:</Form.Label>
                  <Form.Control className="border-top-0 border-left-0 border-right-0" type="text" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Apellidos:</Form.Label>
                  <Form.Control type="text" className="border-top-0 border-left-0 border-right-0" />
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Label>Correo:</Form.Label>
                <Form.Control className="border-top-0 border-left-0 border-right-0" type="text" placeholder="example@gmail.com" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control type="password" className="border-top-0 border-left-0 border-right-0" />
              </Form.Group>

              <Form.Group className="mt-4"></Form.Group>
             
            </div>
          </Card.Body>
            <Card.Footer className="p-0 mt-5">
              <Button type="submit" variant="primary" block className="py-3 rounded-0">
                Registrarme
              </Button>
            </Card.Footer>
        </Card>
      </Form>
    </Container>
    </div>
  );
}
