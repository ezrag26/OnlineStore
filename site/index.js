import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Header } from './Header'

const randomBits = () => Math.random().toString(36).slice(2)

const Cart = ({ items, removeFromCart }) => {
  return (
    <>
      {items.map(item =>
        <div key={randomBits()} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 30px' }}>
          <div>
            <div style={{ fontSize: '1.5em' }}>{item.product}</div>
            <div>Price: {item.price}{item.currency}</div>
            <div>Qty: <span>{item.qty}</span></div>
          </div>
          <button onClick={() => removeFromCart(item.productId)} style={{ backgroundColor: 'red' }}>Remove 1 From Cart</button>
        </div>
      )}
    </>
  )
}

const AllProducts = ({ items, addToCart }) => {
  return (
    <>
      {items.map(item =>
        <div key={randomBits()} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 30px' }}>
          <div>
            <div style={{ fontSize: '1.5em' }}>{item.product}</div>
            <div>Price: {item.price}{item.currency}</div>
            <div style={{ fontSize: '.7em' }}>There are <span>{item.qty}</span> left in stock</div>
          </div>
          <button onClick={() => addToCart(item.productId)} style={{ backgroundColor: 'green' }}>Add To Cart</button>
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
      currency: 'USD',
      qty: 5
    },
    {
      product: 'Baseball',
      productId: '2',
      price: '5.99',
      currency: 'USD',
      qty: 7
    }
  ]
  const [cart, setCart] = useState([])
  const [viewingCart, setViewingCart] = useState(false)

  const addToCart = id => {
    let exists = false
    setCart(cart => {
      const update = cart.map(item => {
        if (item.productId === id) {
          ++item.qty

          exists = true
        }

        return item
      })

      if (exists) return update

      return [
        ...cart,
        products.reduce((item, { qty, ...p }) => {
          return p.productId === id ? { ...p, qty: 1 } : item
        }, {})
      ]
    })


  }

  const removeFromCart = id => {
    setCart(cart => {
      return cart.map(item => {
        if (item.productId === id) --item.qty
        return item
      }).filter(item => item.qty !== 0)
    })
  }

  const setView = () => { setViewingCart(current => !current) }

  return (
    <>
      <Header />
      {
        viewingCart ?
        <>
          <button onClick={setView}>All Products</button>
          <Cart items={cart} removeFromCart={id => removeFromCart(id)}/>
        </>
          :
        <>
          <button onClick={setView}>Cart ({cart.reduce((total, item) => total + item.qty, 0)})</button>
          <AllProducts items={products} addToCart={id => addToCart(id)}/>
        </>
      }
    </>
  )
}

ReactDOM.render(<Index />, document.querySelector('#root'))