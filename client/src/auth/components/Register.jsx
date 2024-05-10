import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../store/slices/authSlice";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Register email: ${email}, password: ${password}`);

    dispatch(register({ email, password })).then((action) => {
      localStorage.setItem("accessToken", action.payload.token);
      navigate("/");
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <h1>Registration Page</h1>
      <FloatingLabel label="Email address">
        <Form.Control
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel label="Password">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>
      <Button type="submit">Register</Button>
      <Form.Text>
        Already have an Account? <Link to="/login">Login</Link>
      </Form.Text>
    </Form>
  );
}

export default Register;
