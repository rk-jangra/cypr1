/// <reference types="cypress" />
// test suite detail description

describe('handling different types of alerts', function () {

    it('normal js alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.get('[onclick="jsAlert()"]').click();

        cy.on('window:alert',(t)=>{
            expect(t).to.contain('I am a JS Alert')
        })

        cy.get('#result').should('have.text','You successfully clicked an alert')
    })

    it('js confirm alert - ok', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.get('[onclick="jsConfirm()"]').click();

        cy.on('window:confirm',(t)=>{
            expect(t).to.contain('I am a JS Confirm')
        })

        cy.get('#result').should('have.text','You clicked: Ok')
    })


    it('js confirm alert - cancel', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        
        cy.get('[onclick="jsConfirm()"]').click();
        // cypress closes that confirm box using cancle with this statement
        cy.on('window:confirm',(t)=> false) 

        cy.get('#result').should('have.text','You clicked: Cancel')
    })


    // this will give prompt to enter some text in text box
    it('js prompt alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        
        cy.window().then((win)=>{
            cy.stub(win, 'prompt').returns('cypress is awsome')
        })

        cy.get('button[onclick="jsPrompt()"]').click();
        // cypress will close the alert automatically using ok by default
        
        cy.get('#result').should('have.text','You entered: cypress is awsome')
    })

    // Authentication alert
    it.only('js prompt alert', () => {

        //Pass auth as option to visit

        cy.log("user: " + Cypress.env('user_id'))
        cy.log("name: " + Cypress.env('name'))

        cy.log(Cypress.env('pwd'))
        Cypress.env('pwd','admin')
        cy.log(Cypress.env('pwd'))


        cy.visit('/basic_auth', 
        {auth: {
                username: Cypress.env('user_id'),
                password: Cypress.env('pwd')
                }
        })

        // embed creds in url
        //cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')

        cy.get('p').should('have.contain','Congratulations')


    })

})