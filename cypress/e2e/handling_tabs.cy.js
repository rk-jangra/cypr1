/// <reference types="cypress" />

// test suite detail description

describe('handling tabs', function () {
  
      it('remove target attribute', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.get('a').contains('Click Here').invoke('removeAttr','target').click()

        //cy.get('a').contains('Click Here').click()   // gives error

        cy.url().should('include','windows/new')
  
        cy.go('back')  // go back to original domain
      })


      it('go to target url directly', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.get('a').contains('Click Here').then((e)=>{
            let url = e.prop('href')
            cy.visit(url)
        })
        
        cy.url().should('include','windows/new')
        cy.go('back')  // go back to original domain
      })


      
      it.only('cross origin using cy.origin', () => {
        cy.visit('https://www.wikipedia.org/')
        cy.url().should('include','https://www.wikipedia.org/')

        cy.get('span').contains('Wikivoyage').click()

        cy.origin('https://www.wikivoyage.org', () => {
            cy.url().should('include','https://www.wikivoyage.org/')
            cy.get('span.central-textlogo').should('contain','Wikivoyage')
            
            // go back to wikipedia             
            cy.get('span').contains('Wikipedia').click()
        })
        // back to original domain
        cy.url().should('include','https://www.wikipedia.org/')
        
      })
  
  })




