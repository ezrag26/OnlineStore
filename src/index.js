const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

require('dotenv').config()
const { PORT, APP_NAME } = process.env

const app = express()

// app.use(cors())

const replace = ({ file, replacements }) => {
  return Object.keys(replacements).reduce((updated, replacement) =>
    updated.replace(`{{${replacement}}}`, replacements[replacement]), file)
}

app.get('/', (req, res) => {
  console.log('GET /')
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, data) => {
    if (err) res.sendStatus(404)
    else {
      res.send(replace({
        file: data.toString(),
        replacements: {
          title: APP_NAME,
          header: APP_NAME
        }
      }))
    }
  })
})

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/products', (req, res) => {
  console.log('GET /products')
  res.send([
    {
      product: 'Hockey Puck',
      productId: '1',
      price: 9.99,
      currency: 'USD',
      qty: 5
    },
    {
      product: 'Baseball',
      productId: '2',
      price: 5.99,
      currency: 'USD',
      qty: 7
    }
  ])
})

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))