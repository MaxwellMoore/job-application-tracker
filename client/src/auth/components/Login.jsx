import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slices/authSlice";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Login email: ${email}, password: ${password}`);

    dispatch(login({ email, password })).then((action) => {
      localStorage.setItem("accessToken", action.payload.token);
      navigate("/");
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <h1>Login Page</h1>
      <FloatingLabel controlId="email" label="Email address">
        <Form.Control
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="password" label="Password">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
