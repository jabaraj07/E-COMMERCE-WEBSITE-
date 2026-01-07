import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../App";

const Productcart = ({nav1}) => {
  const nav = useNavigate()
  let context = useContext(ProductContext);
  // const [total, settotal] = useState(0);
  const handleremove = (indx) => {
    context.setcart((pre) => pre.filter((item, index) => index !== indx));
  };

  useEffect(() => {
    let newtotal = context.cart.reduce(
      (initial, item) => initial + (item.price * item.quantity),
      0
    );
    context.settotal(newtotal.toFixed(2));
  }, [context.cart]);

  const handleclear = () => {
    context.setcart([]);
    // settotal((0).toFixed(2))
  };

  const shorttitle = (title,wordlimit)=>{
    const words = title.split('')
    if(words.length > wordlimit){
      return words.slice(0,wordlimit).join('')+'...'
    }else{
      return words
    }
  }

  const Handledecrease = (item)=>{
    context.setcart((pre)=>{
            
      if(item.quantity >1 ){
        return pre.map((product)=>
          product.id === item.id ? {...product,quantity:product.quantity-1}:product
        )
      }else {
        return pre.filter((filteritem)=>filteritem.id !== item.id)
      }
    })
  }

  const Handleincrease = (item)=>{
    context.setcart((pre)=>{
      const proindx = pre.find(product =>product.id === item.id) // [{rg},{}]
      
      if(proindx){
        return pre.map((product)=>
          product.id === item.id ? {...product,quantity : product.quantity+1}:product
        )
      }
      else{
        return [...pre , {...item,quantity:1}]
      }
    })
   }

   const handlehomepage = ()=>{
    nav ('/')
   }
   const handlepaymentpage = () => {
    nav('/payment')
   }

  const btnDisable = context.cart.length > 0;
  return (
      <>
      {nav1}
          {/* <> */}
      <div className="cart-full-div">

        <button disabled={!btnDisable} onClick={handleclear}>
          CLEAR CART
        </button>
        <h4>Total : ${context.total}</h4>
        <button disabled={!btnDisable} onClick={handlepaymentpage}>PROCEED PAY</button>
      </div>

      <div className="cart-product-div">
        {context.cart.length > 0 ? 
        (
          <>
            {context.cart.map((item, indx) => {
              return (
                <div key={indx} className="cart-content-div">
                  <h5 className="cart-content-title">{shorttitle(item.title,40)}</h5>
                  <img src={item.image} />
                  <div className="cart-product-info">
                    <div className="cart-info-item">
                      <span className="cart-info-label">Price</span>
                      <span className="cart-info-value">${item.price}</span>
                    </div>
                    <div className="cart-info-item">
                      <span className="cart-info-label">Rating</span>
                      <span className="cart-info-value">⭐ {item.rating.rate}</span>
                    </div>
                    <div className="cart-info-item">
                      <span className="cart-info-label">Stock</span>
                      <span className="cart-info-value">{item.rating.count}</span>
                    </div>
                  </div>
                  <div className="cart-quantity-controls">
                    <span className="cart-quantity-label">Quantity:</span>
                    <button className="cart-quantity-btn" onClick={() => Handledecrease(item)}>−</button>
                    <span className="cart-quantity-value">{item.quantity}</span>
                    <button className="cart-quantity-btn" onClick={() => Handleincrease(item)}>+</button>
                  </div>
                  <button className="cart-remove-btn" onClick={() => handleremove(indx)}>Remove Item</button>
                </div>
              );
            })}
          </>
        ) 
        : 
        (
          <>
          <div className="cart-empty-div">
            <div className="cart-empty-div-content">
            <h2>Your Cart Is Empty</h2>
            <h3 className="cart-to-home" onClick={handlehomepage}>Click Here To Add</h3>
            </div>

          </div>
          </>
        )}
        
      </div>
    {/* </> */}
      </>
  );
};

export default Productcart;
