import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Form>
      <h1>Login Page</h1>
      <FloatingLabel label="Email address">
        <Form.Control placeholder="Email address" />
      </FloatingLabel>
      <FloatingLabel label="Password">
        <Form.Control placeholder="Password" />
      </FloatingLabel>
      <Button type="submit">Login</Button>
      <Form.Text>
        Don't have an Account? <Link to="/register">Signup</Link>
      </Form.Text>
    </Form>
  );
}

export default Login;
