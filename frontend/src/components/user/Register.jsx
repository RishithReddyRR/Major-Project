import React from "react";
import vnrLogo from "../../images/vnr-logo.png";
import "./register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import MetaData from "../structure/MetaData";
import ui from "../../images/Profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../actions/userActions";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Blocks } from "react-loader-spinner";

const Register = () => {
  const dispatch = useDispatch();
  var { error, isAuthenticated, loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(ui);
  const [avatar, setAvatar] = useState();
  const [description, setDescription] = useState("");
  const [gsProfile, setGsProfile] = useState("");
  const [wosProfile, setWosProfile] = useState("");
  const [scopusProfile, setScopusProfile] = useState("");
  const [vidwanProfile, setVidwanProfile] = useState("");
  const [gsCitations, setGsCitations] = useState("");
  const [wosCitations, setWosCitations] = useState("");
  const [scopusCitations, setScopusCitations] = useState("");
  const [gsHIndex, setGsHIndex] = useState("");
  const [wosHIndex, setWosHIndex] = useState("");
  const [scopusHIndex, setScopusHIndex] = useState("");
  const [vidwanScore, setvidwanScore] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [phd, setPhd] = useState({
    period: "",
    degree: "",
    institution: "",
  });
  const [masters, setMasters] = useState({
    period: "",
    degree: "",
    institution: "",
  });
  const [grad, setGrad] = useState({
    period: "",
    degree: "",
    institution: "",
  });
  const [se, setSe] = useState({
    period: "",
    degree: "",
    institution: "",
  });

  const navigate = useNavigate();
  const onRegister = async () => {
    dispatch(
      register({
        name,
        email,
        password,
        avatar,
        gsProfile,
        wosCitations,
        scopusProfile,
        vidwanProfile,
        gsCitations,
        wosCitations,
        scopusCitations,
        vidwanScore,
        gsHIndex,
        wosHIndex,
        scopusHIndex,
        dob,
        city,
        education: {
          phd,
          masters,
          grad,
          se,
        },
      })
    );
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 4000,
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

      navigate("/");
    }
  }, [error, isAuthenticated, dispatch, navigate]);
  return (
    <div id="register-page">
      <MetaData title={`Register`} />
      <div id="vnr-logo" className="logo-r">
        <h1 style={{ textAlign: "center" }}>
          Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering
          &Technology
        </h1>
        <img src={vnrLogo} alt="unable to load" />
      </div>

      <div id="register">
        {loading ? (
          <Blocks
            visible={true}
            height="600"
            width="600"
            ariaLabel="blocks-loading"
            wrapperStyle={{ marginTop: "2vmax" }}
            wrapperClass="blocks-wrapper"
          />
        ) : (
          <div id="registerM">
            <h1 id="heading">Register</h1>
            <fieldset>
              <legend>Personal Details</legend>

              <div>
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email:name@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // console.log(e.target.value)
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    // console.log(e.target.value)
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Date Of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                    // console.log(e.target.value)
                  }}
                />
              </div>
              <div>
                <label htmlFor="">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    // console.log(e.target.value)
                  }}
                />
              </div>
              <div>
                <label htmlFor="">
                  Describe about yourself like "Iam a Associate
                  Professer/Student... at X Institution"
                </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor="">Profile Photo</label>
                <div id="registerImage" style={{ marginTop: "unset" }}>
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
              </div>
            </fieldset>
            <fieldset>
              <legend>Google Scholar Details</legend>
              <div>
                <label htmlFor="">Google Scholar Profile Link</label>
                <input
                  type="text"
                  value={gsProfile}
                  on
                  onChange={(e) => setGsProfile(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Nummber Of Citations in Google Scholar</label>
                <input
                  type="text"
                  value={gsCitations}
                  on
                  onChange={(e) => setGsCitations(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">H-index in Google Scholar</label>
                <input
                  type="text"
                  value={gsHIndex}
                  on
                  onChange={(e) => setGsHIndex(e.target.value)}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Web Of Sciences Details</legend>
              <div>
                <label htmlFor="">Web Of Science Profile Link</label>
                <input
                  type="text"
                  value={wosProfile}
                  on
                  onChange={(e) => setWosProfile(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Nummber Of Citations in Web Of Science</label>
                <input
                  type="text"
                  value={wosCitations}
                  on
                  onChange={(e) => setWosCitations(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">H-index in Web Of Science</label>
                <input
                  type="text"
                  value={wosHIndex}
                  on
                  onChange={(e) => setWosHIndex(e.target.value)}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Scopus Details</legend>
              <div>
                <label htmlFor="">Scopus Profile Link</label>
                <input
                  type="text"
                  value={scopusProfile}
                  on
                  onChange={(e) => setScopusProfile(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Nummber Of Citations in Scopus</label>
                <input
                  type="text"
                  value={scopusCitations}
                  on
                  onChange={(e) => setScopusCitations(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">H-index in Scopus</label>
                <input
                  type="text"
                  value={scopusHIndex}
                  on
                  onChange={(e) => setScopusHIndex(e.target.value)}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Vidwan Details</legend>
              <div>
                <label htmlFor="">Vidwan Profile Link</label>
                <input
                  type="text"
                  value={vidwanProfile}
                  on
                  onChange={(e) => setVidwanProfile(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Vidwan Score</label>
                <input
                  type="text"
                  value={vidwanScore}
                  on
                  onChange={(e) => setvidwanScore(e.target.value)}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Education Details</legend>
              <fieldset>
                <legend>Phd Details</legend>
                <div>
                  <label htmlFor="">Period</label>
                  <input
                    type="text"
                    placeholder="start year - end year"
                    value={phd.period}
                    onChange={(e) =>
                      setPhd({
                        ...phd,
                        period: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Course</label>
                  <input
                    type="text"
                    value={phd.degree}
                    onChange={(e) =>
                      setPhd({
                        ...phd,
                        degree: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Institution/College Name</label>
                  <input
                    type="text"
                    value={phd.institution}
                    onChange={(e) =>
                      setPhd({
                        ...phd,
                        institution: e.target.value,
                      })
                    }
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend>Masters Details</legend>
                <div>
                  <label htmlFor="">Period</label>
                  <input
                    type="text"
                    placeholder="start year - end year"
                    value={masters.period}
                    onChange={(e) =>
                      setMasters({
                        ...masters,
                        period: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Course</label>
                  <input
                    type="text"
                    value={masters.degree}
                    onChange={(e) =>
                      setMasters({
                        ...masters,
                        degree: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Institution/College Name</label>
                  <input
                    type="text"
                    value={masters.institution}
                    onChange={(e) =>
                      setMasters({
                        ...masters,
                        institution: e.target.value,
                      })
                    }
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend>Graduation Details</legend>
                <div>
                  <label htmlFor="">Period</label>
                  <input
                    type="text"
                    placeholder="start year - end year"
                    value={grad.period}
                    onChange={(e) =>
                      setGrad({
                        ...grad,
                        period: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Course</label>
                  <input
                    type="text"
                    value={grad.degree}
                    onChange={(e) =>
                      setGrad({
                        ...grad,
                        degree: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Institution/College Name</label>
                  <input
                    type="text"
                    value={grad.institution}
                    onChange={(e) =>
                      setGrad({
                        ...grad,
                        institution: e.target.value,
                      })
                    }
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend>Secondary Education(inter/diploma...) Details</legend>
                <div>
                  <label htmlFor="">Period</label>
                  <input
                    type="text"
                    placeholder="start year - end year"
                    value={se.period}
                    onChange={(e) =>
                      setSe({
                        ...se,
                        period: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Course</label>
                  <input
                    type="text"
                    value={se.degree}
                    onChange={(e) =>
                      setSe({
                        ...se,
                        degree: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Institution/College Name</label>
                  <input
                    type="text"
                    value={se.institution}
                    onChange={(e) =>
                      setSe({
                        ...se,
                        institution: e.target.value,
                      })
                    }
                  />
                </div>
              </fieldset>
            </fieldset>
            <button id="registerb" className="registerA" onClick={onRegister}>
              Register
            </button>

            <div id="links" style={{ marginBottom: ".6vmax" }}>
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
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
