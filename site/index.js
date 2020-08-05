import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Header } from './Header'

const randomBits = () => Math.random().toString(36).slice(2)

const Cart = ({ items, onClick }) => {
  return (
    <>
      {items.map(item =>
        <div key={randomBits()} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div>
            <div>{item.product} : {item.price}{item.currency}</div>
            <div>Qty: {item.qty}</div>
          </div>
          <button onClick={() => onClick(item.productId)}>Remove 1 From Cart</button>
        </div>
      )}
    </>
  )
}

const AllProducts = ({ items, onClick }) => {
  return (
    <>
      {items.map(item =>
        <div key={randomBits()} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div>
            <div>{item.product} : {item.price}{item.currency}</div>
            <div>There are {item.qty} left in stock</div>
          </div>
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
          <Cart items={cart} onClick={id => removeFromCart(id)}/>
        </>
          :
        <>
          <button onClick={setView}>Cart ({cart.reduce((total, item) => total + item.qty, 0)})</button>
          <AllProducts items={products} onClick={id => addToCart(id)}/>
        </>
      }
    </>
  )
}

ReactDOM.render(<Index />, document.querySelector('#root'))