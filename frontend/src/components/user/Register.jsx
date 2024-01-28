import React from "react";
import vnrLogo from "../../images/vnr-logo.png";
import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import MetaData from "../structure/MetaData";
import ui from "../../images/Profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { register } from "../../actions/userActions";
import { useEffect } from "react";
import Swal from "sweetalert2"
import { Blocks } from "react-loader-spinner";

const Register = () => {
  const dispatch=useDispatch()
  var {error,isAuthenticated,loading}=useSelector(state=>state.user)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(ui);
  const [avatar, setAvatar] = useState();
  const navigate = useNavigate();
  const onRegister = async () => {
    dispatch(register({
      name,
      email,
      password,
      avatar,
    }))
  };
  useEffect(()=>{
    if(error){
      toast.error(error,{
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
      dispatch({type:"CLEAR_ERRORS"})
    }
    if(isAuthenticated){
      Swal.fire( 'Success',
      'You logged In',
      'success')

      navigate("/")
    }
  },[error,isAuthenticated,dispatch,navigate])
  return (
    <div id="login-page">
        <MetaData title={`Register`} />
      <div id="vnr-logo">
        <h1 style={{ textAlign: "center" }}>
          Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering
          &Technology
        </h1>
        <img src={vnrLogo} alt="unable to load" />
      </div>

      <div id="register">
        <div id="registerM">
          <h1 id="heading">Register</h1>
          <div className="name">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
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
          <div id="registerImage">
            <img src={avatarPreview} alt="Avatar Preview" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={(e) => {
                const reader = new FileReader();

                reader.onload = () => {
                  if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                  }
                };

                reader.readAsDataURL(e.target.files[0]);
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
            <button id="registerb" onClick={onRegister}>
            Register
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
            <Link to="/login" id="fp" style={{ margin: "unset" }}>
              Do you have an account?Log in
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer/>

    </div>
  );
};

export default Register;
