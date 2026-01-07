import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../App'
import './Navbar.css'

const Navbar = () => {
  const [first, setfirst] = useState(false)
  
   let context =  useContext(ProductContext)
   const handlelogout1 = ()=>{
    context.handleLogout()
   }   
  return (
    <div className='Navigation-full-div' >
        {
          context.islogin ? 
          <>
          <div className='main-navigation-full-div' >
            <h1>Fake Store</h1>
            <div className={`main-navigation-content-div ${first ? 'active' : ''}`}>
            <ul  >
          <li><Link to={'/'}>HOME</Link></li>
          <li ><Link to={'/mens'}  >MENS</Link></li>
          <li><Link to={'/womens'}>WOMENS</Link></li>
          <li><Link to={'/jewelery'}>JEWELERY</Link></li>
          <li><Link to={'/electronics'}>ELECTRONICS</Link></li>
          <li><Link to={'/cart'}>CART: {context.cart.length}</Link></li>
          <button onClick={handlelogout1}>Logout</button>
          </ul>
            </div>

            <div className='main-logout' onClick={()=>setfirst(!first)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
          </div>

          </div>
          
          </>  
          : 
          <>
          {/* <div className='Logout-navigation-full-div' >

          <h1 style={{color:"white"}}>Fake Store</h1>

          <div className={`Logout-navigation-content-div ${first ? 'active' : ''}`}>
            <ul>
            <li > <Link to="/signup">Sign Up</Link> </li>
            <li> <Link to="/login">Login In</Link> </li>
            </ul>
          </div>

          <div className='logout' onClick={()=>setfirst(!first)}>
                <span className="bar1"></span>
                <span className="bar1"></span>
                <span className="bar1"></span>
          </div>

          </div> */}
          </>
          }
    </div>
  )
}

export default Navbar