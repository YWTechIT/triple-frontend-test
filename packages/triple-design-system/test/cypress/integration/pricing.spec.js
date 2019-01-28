describe('Pricing', () => {
  beforeEach(() => {
    cy.visit('/pricing.html')
  })

  context('when using listing layout', () => {
    it('listing have padding 22px', () => {
      cy.get('.listing-pressed > div')
        .should('have.css', 'padding')
        .and('eq', '22px 0px 0px')
    })

    it('DescountRate Text have pink color', () => {
      cy.get('.listing-pressed > div')
        .find('span')
        .contains('16%')
        .should('have.css', 'color')
        .and('eq', 'rgb(253, 46, 105)')
    })

    it('Price Text have font-size 20px', () => {
      cy.get('.listing-pressed > div')
        .find('span')
        .contains('30,000원')
        .should('have.css', 'font-size')
        .and('eq', '20px')
    })

    it('BasePrice Text have absolute', () => {
      cy.get('.listing-pressed > div')
        .find('span')
        .contains('25,000')
        .should('have.css', 'position')
        .and('eq', 'absolute')
    })
  })

  context('when using regular layout', () => {
    it('regular have padding 18px', () => {
      cy.get('.regular-pressed > div')
        .should('have.css', 'padding')
        .and('eq', '18px 0px 0px')
    })

    it('Price Text have font-size 18px', () => {
      cy.get('.regular-pressed > div')
        .find('span')
        .contains('30,000원')
        .should('have.css', 'font-size')
        .and('eq', '18px')
    })

    it('BasePrice Text have absolute', () => {
      cy.get('.regular-pressed > div')
        .find('span')
        .contains('25,000')
        .should('have.css', 'display')
        .and('eq', 'inline-block')
    })
  })
})
