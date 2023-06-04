/// <reference types="cypress" />

describe('example to-do app', () => {
 
  it('clears the iframe content', () => {
    cy.visit("http://the-internet.herokuapp.com/iframe")
  
    const iframe_body = cy.get('#mce_0_ifr').its('0.contentDocument.body').should('be.visible').then(cy.wrap)
  
    iframe_body.clear()
    iframe_body.find('p').type("Welcome {ctrl+a}")
  
    cy.get("[aria-label='Bold']").click()
  })

  it('iframe using then', () => {
    cy.visit("http://the-internet.herokuapp.com/iframe")
  
    cy.get('#mce_0_ifr').then(($iframe) => {
      const $body = $iframe.contents().find('body')
      cy.wrap($body).should('be.visible').clear().type("Welcome {ctrl+a}")
    })
  
    cy.get("[aria-label='Bold']").click()
  })

  //Go to documentation on npmjs.com/package/cypress-iframe
  //Npm install cypress-iframe -D
  //Add in command.js :  import 'cypress-iframe'

  it('iframe using plugin', () => {
    cy.visit("http://the-internet.herokuapp.com/iframe")
  
    cy.frameLoaded('#mce_0_ifr')
    cy.iframe('#mce_0_ifr').find('p').clear()
    cy.iframe('#mce_0_ifr').find('p').type("Welcome {ctrl+a}")
  
    cy.get("[aria-label='Bold']").click()
  })



})
