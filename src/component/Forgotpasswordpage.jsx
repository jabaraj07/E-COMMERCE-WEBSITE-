import React, { useContext, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { ProductContext } from "../App";

const Forgotpasswordpage = () => {
  const [verifyemail, setverifyemail] = useState("");
  const [resetpassword, setresetpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [iscolor, setiscolor] = useState(false)
  const [state, setstate] = useState(1);
  const [message, setmessage] = useState('')
    let nav = useNavigate()
let context=useContext(ProductContext)
  
  const handlesubmit = (e) => {
    e.preventDefault();
    const userdetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userdetails.Useremail === verifyemail) {
      alert("Email Verified Successfully");
      setstate(2)
      setmessage('')
    } else {
      setmessage("Email Not Found")
      setstate(1)
    }
  };

  const handlepasswordreset = async(e)=>{
    e.preventDefault()
    const userdetail = JSON.parse(localStorage.getItem('userDetails'))
    const hashpassword = await context.hashpasswordwithsalt(resetpassword,userdetail.salt)    

    if(userdetail){

      if(confirmpassword === resetpassword){
        userdetail.Userpassword = hashpassword
        localStorage.setItem('userDetails',JSON.stringify(userdetail))
        setmessage('Password reset successfully')
        setiscolor(true)
        setTimeout(() => nav('/login'), 1500);
      }else{
        setmessage("Password Not Match")
        setiscolor(false)
        setTimeout(() => {
          setmessage('')
        }, 2000);
      }

    }
  }
  return (
    <div className="forgotpassword-full-div">
      {state === 1 ? (
        <div className="forgotpassword-content-div">
          <h2>Forgot Password</h2>
          <form onSubmit={handlesubmit} className="forgotpassword-form">
            <label htmlFor="verifyemail">Email</label>
            <input
              type="email"
              id="verifyemail"
              value={verifyemail}
              onChange={(e) => setverifyemail(e.target.value)}
              required
              onFocus={() => setmessage('')}
              placeholder="Enter Email"
            />
            <button type="submit">Verify Email</button>
            {message && <div className="forgotpassword-error-message">{message}</div>}
            <div className="forgotpassword-links">
              <p>
                <Link to={'/signup'}>Signup</Link> OR <Link to={'/login'}>Login</Link>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="forgotpassword-content-div">
          <h2>Reset Password</h2>
          <form onSubmit={handlepasswordreset} className="forgotpassword-form">
            <label htmlFor="resetpassword">New Password</label>
            <input
              type="password"
              id="resetpassword"
              required
              placeholder="Enter New Password"
              value={resetpassword}
              onChange={(e) => setresetpassword(e.target.value)}
            />
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              required
              placeholder="Confirm New Password"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
            />
            <button type="submit">Reset Password</button>
            {message && (
              <div className={iscolor ? 'forgotpassword-success-message' : 'forgotpassword-error-message'}>
                {message}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Forgotpasswordpage;
