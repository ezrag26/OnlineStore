import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Header } from './Header'
import { Cart } from './Cart'
import { Products } from './Products'

const fetchProducts = () => {
  return [
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
}

const Index = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [viewingCart, setViewingCart] = useState(false)
  const [content, setContent] = useState(getProducts())

  useEffect(() => {
    if (!viewingCart) setProducts(fetchProducts())
  }, [viewingCart])

  useEffect(() => {
    if (viewingCart) setContent(<Cart items={cart} removeFromCart={id => removeFromCart(id)}/>)
    else setContent(getProducts())
  }, [products, cart, viewingCart])

  function getProducts() { return <Products items={products} addToCart={id => addToCart(id)}/> }

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

  return (
    <>
      <Header>
        <h1 onClick={() => setViewingCart(false)}>Welcome to the Online Store!</h1>
        <button onClick={() => setViewingCart(true)}>Cart ({cart.reduce((total, item) => total + item.qty, 0)})</button>
      </Header>
      {content}
    </>
  )
}

ReactDOM.render(<Index />, document.querySelector('#root'))