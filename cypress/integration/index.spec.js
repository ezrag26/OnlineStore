const expectProduct = ({ product, price }) => {
  cy.contains(product)
  cy.contains(price)
}

describe('cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows cart tab', () => {
    cy.contains(/Cart/i)
  })

  it('displays product info of products available', () => {
    cy.server()
    cy.route('/', {
      body: [
        {
          product: 'Hockey Puck',
          productId: `doesn't matter`,
          price: '9.99',
          currency: 'USD'
        },
        {
          product: 'Baseball',
          productId: `neither does this one`,
          price: '5.99',
          currency: 'USD'
        }
      ]
    })

    expectProduct({ product: 'Hockey Puck', price: '9.99' })
    expectProduct({ product: 'Baseball', price: '5.99' })
  })

  it('increments counter next to cart when clicking on add to cart', () => {
    cy.server()
    cy.route('/', {
      body: [
        {
          product: 'Hockey Puck',
          productId: `doesn't matter`,
          price: '9.99',
          currency: 'USD'
        }
      ]
    })

    cy.contains(/Add.*To.*Cart/i).click()

    cy.contains(/^Cart.*1.*/i)
  })

  it('shows items in cart after clicking on cart button', () => {
    cy.server()
    cy.route('/', {
      body: [
        {
          product: 'Hockey Puck',
          productId: `doesn't matter`,
          price: '9.99',
          currency: 'USD'
        }
      ]
    })

    cy.contains(/Add.*To.*Cart/i).click()
    cy.contains(/^Cart.*1.*/i).click()

    expectProduct({ product: 'Hockey Puck', price: '9.99' })
  })

  it('places button to go back to all products after clicking on cart button', () => {
    cy.server()
    cy.route('/', {
      body: [
        {
          product: 'Hockey Puck',
          productId: `doesn't matter`,
          price: '9.99',
          currency: 'USD'
        }
      ]
    })

    cy.contains(/^Cart.*/i).click()
    cy.contains(/^All.*Products.*/i).click()

    expectProduct({ product: 'Hockey Puck', price: '9.99' })
  })

  it('removes item from cart after clicking remove from cart button', () => {
    cy.server()
    cy.route('/', {
      body: [
        {
          product: 'Hockey Puck',
          productId: `doesn't matter`,
          price: '9.99',
          currency: 'USD'
        }
      ]
    })

    cy.contains(/Add.*To.*Cart/i).click()
    cy.contains(/^Cart.*1.*/i).click()
    cy.contains(/Remove.*From.*Cart/i).click()

    cy.contains(/^All.*Products.*/i).click()
    cy.contains(/^Cart.*0.*/i)
  })

  it('displays quantities in.*stock for products', () => {
    cy.server()
    cy.route('/', {
      body: [
        {
          product: 'Hockey Puck',
          productId: `doesn't matter`,
          price: '9.99',
          currency: 'USD'
        }
      ]
    })

    cy.contains(/.*in.*stock.*/i)
  })

  it('increments quantity chosen for item if product of that id is already in the cart', () => {
    cy.server()
    cy.route('/', {
      body: [
        {
          product: 'Hockey Puck',
          productId: `doesn't matter`,
          price: '9.99',
          currency: 'USD'
        }
      ]
    })

    cy.contains(/Add.*To.*Cart/i).click()
    cy.contains(/^Cart.*/i).click()
    cy.contains(/Qty.*1/i)

    cy.contains(/^All.*Products.*/i).click()
    cy.contains(/Add.*To.*Cart/i).click()
    cy.contains(/^Cart.*/i).click()
    cy.contains(/Qty.*2/i)
  })

  it('decrements quantity chosen for item if product of that id is in the cart', () => {
    cy.server()
    cy.route('/', {
      body: [
        {
          product: 'Hockey Puck',
          productId: `doesn't matter`,
          price: '9.99',
          currency: 'USD'
        }
      ]
    })

    cy.contains(/Add.*To.*Cart/i).click()
    cy.contains(/Add.*To.*Cart/i).click()
    cy.contains(/^Cart.*/i).click()

    cy.contains(/Remove.*From.*Cart/i).click()
    cy.contains(/Qty.*1/i)
  })
})