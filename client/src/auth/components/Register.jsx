import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  return (
    <Form>
      <h1>Registration Page</h1>
      <FloatingLabel label="Email address">
        <Form.Control placeholder="Email address" />
      </FloatingLabel>
      <FloatingLabel label="Password">
        <Form.Control placeholder="Password" />
      </FloatingLabel>
      <Button type="submit">Login</Button>
      <Form.Text>
        Already have an Account? <Link to="/login">Login</Link>
      </Form.Text>
    </Form>
  );
}

export default Register;
