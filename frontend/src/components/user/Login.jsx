import React from "react";
import vnrLogo from "../../images/vnr-logo.png";
import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Blocks } from "react-loader-spinner";
import MetaData from "../structure/MetaData";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const onLogin = () => {
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (isAuthenticated) {
      Swal.fire("Success", "You logged In", "success");

      navigate("/account");
    }
  }, [error, isAuthenticated, navigate, dispatch]);
  return (
    <div id="login-page">
      <MetaData title={`Login`} />
      <div id="vnr-logo">
        <h1 style={{ textAlign: "center" }}>
          Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering
          &Technology
        </h1>
        <img src={vnrLogo} alt="unable to load" />
      </div>

      <div id="login">
        <div id="loginM">
          <h1 id="heading">Log In</h1>

          <div className="email">
            <input
              type="email"
              placeholder="Email:name@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
                // console.log(e.target.value)
              }}
            />
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
                // console.log(e.target.value)
              }}
            />
          </div>
          {loading ? (
            <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{ marginTop: "2vmax" }}
              wrapperClass="blocks-wrapper"
            />
          ) : (
            <button id="loginb" onClick={onLogin}>
              Login
            </button>
          )}

          <div id="links">
            <Link to="/forgot-password" id="fp">
              Forgotten Your Password?
            </Link>
            <div className="or">
              <hr id="h-left" />
                Or
              <hr id="h-right" />
            </div>
            <Link to="/register" id="fp" style={{ margin: "unset" }}>
              Do you have an account?SignUp
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
