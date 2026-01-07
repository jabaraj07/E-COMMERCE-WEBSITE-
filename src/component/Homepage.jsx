import React, { useContext } from 'react'
import { ProductContext } from '../App'
import Navbar from './Navbar'

const Homepage = ({nav}) => {
   let context1 =  useContext(ProductContext)
   const handleadd = (item)=>{
    context1.setcart((pre)=>{
      const proindx = pre.find(product =>product.id === item.id)      
      if(proindx ){
        return pre.map((product)=>
          product.id === item.id ? {...product,quantity : product.quantity+1} : product
        )
      }
      else{
        return [...pre , {...item,quantity:1}]
      }
    })
   }

   const renderStars = (rating) => {
     const fullStars = Math.floor(rating)
     const hasHalfStar = rating % 1 !== 0
     const stars = []
     
     for (let i = 0; i < fullStars; i++) {
       stars.push(<span key={i}>⭐</span>)
     }
     if (hasHalfStar) {
       stars.push(<span key="half">⭐</span>)
     }
     return stars
   }

  return (
    <>
    {nav}
    <>
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '3rem 2rem',
      textAlign: 'center',
      color: 'white',
      marginBottom: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        Welcome to Fake Store
      </h1>
      <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
        Discover amazing products at unbeatable prices
      </p>
    </div>
    <div className="Product-full-div">
        {
          context1.data.map((item,indx)=>{
            return(
                <div key={indx}  className="product-content-div">
                    <h5 className='product-content-title'>{item.title}</h5>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'contain' }}/>
                    <h5 style={{ color: '#6366f1', fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>
                      ${item.price}
                    </h5>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
                      <div style={{ display: 'flex', gap: '0.2rem' }}>
                        {renderStars(item.rating.rate)}
                      </div>
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        ({item.rating.rate})
                      </span>
                    </div>
                    <h5 style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.25rem 0' }}>
                      {item.rating.count} in stock
                    </h5>
                    <button onClick={()=>handleadd(item)}>ADD TO CART</button>
                </div>
            )
          })  
        
        }
    </div>
    </>
    </>

  )
}

export default Homepage