import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword } from "../../store/slices/authSlice";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };
  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit="{handleSubmit}">
      <h1>Login Page</h1>
      <FloatingLabel controlId="email" label="Email address">
        <Form.Control
          type="email"
          placeholder="Email address"
          value={email}
          onChange={handleEmailChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="password" label="Password">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </FloatingLabel>
      <Button type="submit">Login</Button>
      <Form.Text>
        Don't have an Account? <Link to="/register">Signup</Link>
      </Form.Text>
    </Form>
  );
}

export default Login;
