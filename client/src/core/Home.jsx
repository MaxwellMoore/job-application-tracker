import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logout } from "../store/slices/authSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [auth.currentUser, navigate]);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <h1>Home.jsx</h1>
      <Button onClick={onLogout}>Logout</Button>
    </>
  );
}

export default Home;
