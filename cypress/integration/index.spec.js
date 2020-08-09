const goToProducts = () => {
  cy.contains('App').click()
}

const goToCart = () => {
  cy.contains(/Cart \(.*\)/i).click()
}

const expectProduct = ({ product, price, qty }) => {
  goToProducts()
  cy.contains(product)
    .next().contains(price)
    .next().contains(qty)
}

const expectItem = ({ product, price, qty }) => {
  goToCart()
  cy.contains(product)
    .next().contains(price)
    .next().contains(qty)
  // cy.contains(price)
  // cy.contains(qty)
}

const expectItemsInCart = (n) => {
  const exp = RegExp(`^Cart.*${n}.*`, 'i')
  cy.contains(exp)
}

const addToCartByName = ({ product }) => {
  goToProducts()
  cy.contains(product).parent().next().click()
}

const removeItemFromCartByName = ({ product }) => {
  goToCart()
  cy.contains(product).parent().next().click()
}

const expectTotal = (total) => {
  goToCart()
  cy.contains(RegExp(`Total: ${total}`, 'i'))
}

describe('header', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows app name', () => {
    cy.contains('App')
  })

  it('shows cart tab', () => {
    cy.contains(/Cart/i)
  })

  it('navigates to cart view when clicking on cart tab', () => {
    goToCart()
  })

  it('navigates to products view when clicking on the app name', () => {
    goToCart()
    goToProducts()
  })
})

describe('products', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '/products',
        status: 200,
        response: [
          {
            product: 'Hockey Puck',
            productId: `doesn't matter`,
            price: 9.99,
            currency: 'USD',
            qty: 5
          },
          {
            product: 'Baseball',
            productId: `neither does this one`,
            price: 5.99,
            currency: 'USD',
            qty: 7
          }
        ]
      }
    ).as('products')

    cy.visit('/')
    // cy.wait('@products')
  })

  it('displays product info of products available', () => {
    expectProduct({ product: 'Hockey Puck', price: 9.99, qty: 5 })
    expectProduct({ product: 'Baseball', price: 5.99, qty: 7 })
  })

  it('increments the cart item counter after adding item', () => {
    addToCartByName({ product: 'Hockey Puck' })
    expectItemsInCart(1)

    addToCartByName({ product: 'Hockey Puck' })
    expectItemsInCart(2)

    addToCartByName({ product: 'Baseball' })
    expectItemsInCart(3)
  })
})

describe('cart', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '/products',
        response: [
          {
            product: 'Hockey Puck',
            productId: `doesn't matter`,
            price: 9.99,
            currency: 'USD',
            qty: 5
          },
          {
            product: 'Baseball',
            productId: `neither does this one`,
            price: 5.99,
            currency: 'USD',
            qty: 7
          }
        ]
      }
    ).as('products')

    cy.visit('/')
    // cy.wait('@products')
  })

  it('displays proper message if no items are in the cart', () => {
    goToCart()
    cy.contains(/No items/i)
  })

  it('shows items in cart after clicking on cart button', () => {
    addToCartByName({ product: 'Hockey Puck' })
    expectItem({ product: 'Hockey Puck', price: 9.99, qty: 1 })

    addToCartByName({ product: 'Baseball' })
    expectItem({ product: 'Baseball', price: 5.99, qty: 1 })
  })

  it('has a way to go back to all products from the cart view', () => {
    goToCart()
    goToProducts()

    // expectProduct({ product: 'Hockey Puck', price: 9.99, qty: 5 })
  })

  it('decrements the cart item counter after removing item', () => {
    addToCartByName({ product: 'Hockey Puck' })
    addToCartByName({ product: 'Baseball' })

    removeItemFromCartByName({ product: 'Hockey Puck' })
    expectItemsInCart(1)

    removeItemFromCartByName(({ product: 'Baseball' }))
    expectItemsInCart(0)
  })

  it('increments quantity chosen for item if product of that id is already in the cart', () => {
    addToCartByName({ product: 'Hockey Puck' })
    expectItem({ product: 'Hockey Puck', price: 9.99, qty: 1})

    addToCartByName({ product: 'Baseball' })
    expectItem({ product: 'Baseball', price: 5.99, qty: 1})

    addToCartByName({ product: 'Hockey Puck' })
    expectItem({ product: 'Hockey Puck', price: 9.99, qty: 2})
  })

  it('decrements quantity chosen for item if product of that id is already in the cart', () => {
    addToCartByName({ product: 'Hockey Puck' })
    addToCartByName({ product: 'Hockey Puck' })
    addToCartByName({ product: 'Baseball' })
    addToCartByName({ product: 'Baseball' })
    addToCartByName({ product: 'Baseball' })

    removeItemFromCartByName({ product: 'Baseball' })
    expectItem({ product: 'Baseball', price: 5.99, qty: 2})

    removeItemFromCartByName({ product: 'Hockey Puck' })
    expectItem({ product: 'Hockey Puck', price: 9.99, qty: 1})

    removeItemFromCartByName({ product: 'Baseball' })
    expectItem({ product: 'Baseball', price: 5.99, qty: 1})

    removeItemFromCartByName({ product: 'Hockey Puck' })
  })

  it('displays the total cart value', () => {
    addToCartByName({ product: 'Hockey Puck' })
    expectTotal(9.99)

    addToCartByName({ product: 'Baseball' })
    expectTotal(15.98)

    removeItemFromCartByName(({ product: 'Hockey Puck' }))
    expectTotal(5.99)
  })
})