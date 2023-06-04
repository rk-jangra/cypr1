/// <reference types="cypress" />

describe('show custom command example', () => {
 
  it('login to orange hrm', () => {

    cy.visit('https://www.dummyticket.com/dummy-ticket-for-visa-application/')

    cy.get('input[placeholder="Username"]').type("Admin")
    cy.get('input[placeholder="Password"]').type("admin123")

  })

})
