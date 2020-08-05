const expectProduct = ({ product, price }) => {
  cy.contains(product)
  cy.contains(price)
}

describe('cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows cart tab', () => {
    cy.contains(/[Cc]art/)
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

    cy.contains('Add To Cart').click()

    cy.contains(/^[Cc]art.*1.*/)
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

    cy.contains('Add To Cart').click()
    cy.contains(/^[Cc]art.*1.*/).click()

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

    cy.contains(/^[Cc]art.*/).click()
    cy.contains(/^[Aa]ll.*[Pp]roducts.*/).click()

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

    cy.contains('Add To Cart').click()
    cy.contains(/^[Cc]art.*1.*/).click()
    cy.contains('Remove From Cart').click()

    cy.contains(/^[Aa]ll.*[Pp]roducts.*/).click()
    cy.contains(/^[Cc]art.*0.*/)
  })
})