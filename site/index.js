import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Header } from './Header'
import { Cart } from './Cart'
import { Products } from './Products'

const fetchProducts = () => {
  return fetch('http://localhost:8080/products')
    .then(res => res.json())
}

const Index = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [viewingCart, setViewingCart] = useState(false)
  const [content, setContent] = useState([])

  useEffect(() => {
    if (!viewingCart) {
      fetchProducts()
        .then(products => setProducts(products))
    }
  }, [viewingCart])

  useEffect(() => {
    if (viewingCart) setContent(<Cart items={cart} removeFromCart={id => removeFromCart(id)}/>)
    else setContent(<Products items={products} addToCart={id => addToCart(id)}/>)
  }, [products, cart, viewingCart])

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
        <h1
          style={{ cursor: 'pointer', padding: '.5rem' }}
          onClick={() => setViewingCart(false)}
          onMouseOver={e => e.target.style.color = 'rgba(0, 0, 0, .7)'}
          onMouseOut={e => e.target.style.color = 'rgba(0, 0, 0, 1)'}
        >{header}
        </h1>
        <div
          style={{ margin: 'auto 0', cursor: 'pointer', padding: '.5rem' }}
          onClick={() => setViewingCart(true)}
          onMouseOver={e => e.target.style.color = 'rgba(0, 0, 0, .7)'}
          onMouseOut={e => e.target.style.color = 'rgba(0, 0, 0, 1)'}
        >Cart ({cart.reduce((total, item) => total + item.qty, 0)})
        </div>
      </Header>
      {content}
    </>
  )
}

ReactDOM.render(<Index />, document.querySelector('#root'))