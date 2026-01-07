import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../App";
import Navbar from "./Navbar";
import "./Login.css";

const Loginpage = ({ onlogin }) => {
  let context = useContext(ProductContext);
  let nav = useNavigate();
  const [useremail, setuseremail] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();

    const userdetails = JSON.parse(localStorage.getItem("userDetails"));
    const hashpassword = await context.hashpasswordwithsalt(userpassword,userdetails.salt)    

    if (
      userdetails &&
      useremail === userdetails.Useremail &&
      userdetails.Userpassword === hashpassword
    ) {
      alert("Login Success");
      context.handlelogin();
      localStorage.setItem("loggedin", "true");
    } else {
      alert("Invalid UserMail And Password");
      setuseremail("");
      setuserpassword("");
    }
  };

  return (
    <>
      <Navbar />
      {
        <div className="Login-full-div">
          <div className="Login-content-full-div">
            <h3>Login Form</h3>
            
            <div className="Login-form-div">
              <form onSubmit={handlesubmit} className="Login-form">
                <label htmlFor="Mail">Email</label>
                <input
                  type="email"
                  id="Mail"
                  value={useremail}
                  onChange={(e) => setuseremail(e.target.value)}
                  required
                  placeholder="Enter Email"
                />

                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  id="Password"
                  value={userpassword}
                  onChange={(e) => setuserpassword(e.target.value)}
                  required
                  placeholder="Enter Password"
                />

                <button type="submit">Login</button>

                <div className="Link-div">
                <p>
                  Dont Have Account ?{" "} <br />
                
                  <span className="Login-Link">
                    {" "}
                    <Link to={"/signup"}>
                      SignUp
                    </Link>{" "}
                  </span>{" "} | {" "}
                  <span className="Login-Link">
                    <Link to={"/ForgotPassword"}>
                      ForgotPassword
                    </Link>{" "}
                  </span>
                </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Loginpage;
