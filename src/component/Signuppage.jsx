import React, { useContext, useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './Signup.css'
import { ProductContext } from "../App";

// const hashpasswordwithsalt= async(password,salt)=>{
//   const encoder = new TextEncoder();
//   const data = encoder.encode(password+salt)
//   const hash = await window.crypto.subtle.digest("SHA-256",data)
//   return Array.from(new Uint8Array(hash))
//   .map((byte)=>byte.toString(16).padStart(2,'0'))
//   .join('')
// }

// const generateSalt=()=>{
//   return Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
//   .map((byte)=>byte.toString(16).padStart(2,'0'))
//   .join("")
// }

const Signuppage = ({nav1}) => {
  let context = useContext(ProductContext)
  const [Username, setUsername] = useState("");
  const [Useremail, setUseremail] = useState("");
  const [Userpassword, setUserpassword] = useState("");
  const [error, seterror] = useState('')
  let nav = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const userdetails = JSON.parse(localStorage.getItem('userDetails')) || []
    const salt = context.generateSalt()
    const hashpassword = await context.hashpasswordwithsalt(Userpassword,salt)    

    if (userdetails&& Username!==userdetails.Username && Useremail!==userdetails.Useremail && Userpassword) {
 
      localStorage.setItem(
        "userDetails",
        JSON.stringify({ Username, Useremail, Userpassword:hashpassword ,salt})
      );
      nav("/login");
      seterror('')
    }
    else{
      alert("Uset Already Exist")
      setUseremail('')
      setUsername('')
      setUserpassword('')
      seterror('')
    }
  }
  const handlepassword =(e)=>{
   let value = e.target.value;
    setUserpassword(value)
    evaluatepass(value)
  }
  const evaluatepass=(password)=>{
    if(password.length<6){
      seterror("Weak-Password")
    }
    else if(password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[@$!%*?&#]/)){
      seterror("Strong")
    }    
    else{
      seterror("Medium")
    }
  }
  const handleblur=(value)=>{
    if(!value){
      seterror("")
    }
  }
 
  return (
    <>
      {/* <Navbar /> */}
      {nav1}
      <div className="signup-full-div">

        <div className="signup-content-full-div">

          <h3>Sign Up Form</h3>

          <div className="signup-form-div" >
            
            <form onSubmit={handlesubmit} className="signup-form">
              <label htmlFor="UserName">UserName</label>
              <input
                type="text"
                id="UserName"
                required
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Name"
                
              />

              <label htmlFor="UserEmail">UserEmail</label>
              <input
                type="email"
                id="UserEmail"
                required
                value={Useremail}
                onChange={(e) => setUseremail(e.target.value)}
                placeholder="Enter Email"
              />

              <label htmlFor="UserPassword">UserPassword</label>
              <input
                type="password"
                id="UserPassword"
                required
                value={Userpassword}
                onChange={handlepassword}
                onBlur={(e)=>handleblur(e.target.value)}
                placeholder="Enter password"
              />
              {error && <div className={`${error}`}>{error}</div>}
            <button type="submit">Signup</button>

            <div>
            <p>Already Have Account ? <span> <Link to="/Login">Login</Link> </span></p>
            </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Signuppage;

