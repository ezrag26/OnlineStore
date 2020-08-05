import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Header } from './Header'

const randomBits = () => Math.random().toString(36).slice(2)

const Cart = ({ items, onClick }) => {
  return (
    <>
      {items.map(item =>
        <div key={randomBits()}>
          <div>{item.product} : {item.price}{item.currency}</div>
          <button onClick={() => onClick(item.productId)}>Remove From Cart</button>
        </div>
      )}
    </>
  )
}

const AllProducts = ({ items, onClick }) => {
  return (
    <>
      {items.map(item =>
        <div key={randomBits()}>
          <div>{item.product} : {item.price}{item.currency}</div>
          <button onClick={() => onClick(item.productId)}>Add To Cart</button>
        </div>
      )}
    </>
  )
}

const Index = () => {
  const products = [
    {
      product: 'Hockey Puck',
      productId: '1',
      price: '9.99',
      currency: 'USD'
    },
    {
      product: 'Baseball',
      productId: '2',
      price: '5.99',
      currency: 'USD'
    }
  ]
  const [cart, setCart] = useState([])
  const [viewingCart, setViewingCart] = useState(false)

  const addToCart = id => { setCart(cart => cart.concat(products.filter(item => item.productId === id)[0])) }

  const removeFromCart = id => { setCart(cart => cart.filter(item => item.productId !== id)) }

  const setView = () => { setViewingCart(current => !current) }

  return (
    <>
      <Header />
      {
        viewingCart ?
        <>
          <button onClick={setView}>All Products</button>
          <Cart items={cart} onClick={id => removeFromCart(id)}/>
        </>
          :
        <>
          <button onClick={setView}>Cart ({cart.length})</button>
          <AllProducts items={products} onClick={id => addToCart(id)}/>
        </>
      }
    </>
  )
}

ReactDOM.render(<Index />, document.querySelector('#root'))