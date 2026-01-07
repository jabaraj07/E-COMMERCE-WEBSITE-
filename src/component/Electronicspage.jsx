import React, { useContext } from "react";
import { ProductContext } from "../App";

const Electronicspage = ({nav}) => {
  let context = useContext(ProductContext);
  let filterproduct = context.data.filter(
    (item) => item.category === "electronics"
  );
  const handleadd = (item) => {
    context.setcart((pre) => {
      const proindx = pre.find((newitem)=>newitem.id === item.id)
      if(proindx){
        return pre.map((product)=>
        product.id === item.id ? {...product,quantity:product.quantity+1} : product
    )
      }
      else{
        return [...pre , {...item,quantity:1}]
      }
    });
  };
  
  return (
    <>
    {nav}
    <div style={{ marginTop: '70px' }}>
    <div className="Product-full-div">
      {filterproduct.map((item, indx) => {
        return (
          <div key={indx} className="product-content-div">
            <h5 className='product-content-title'>{item.title}</h5>
            <img src={item.image} width={150} height={150} />
            <h5>PRICE : ${item.price}</h5>
            <h5>RATING : {item.rating.rate}</h5>
            <h5>IN STOCK : {item.rating.count}</h5>
            <button onClick={() => handleadd(item)}>ADD CART</button>
          </div>
        );
      })}
    </div>
    </div>
    </>
  );
};

export default Electronicspage;
