describe('Katalon Demo Cura', () => {
  beforeEach(() => {
    //cy.visit('https://katalon-demo-cura.herokuapp.com/')
    cy.visit('/')
  })

  it('should be able to schedule an appointment', () => {
    // Login
    cy.get('#btn-make-appointment').click()
    cy.url().should('include', '/profile.php#login')

    cy.get('#txt-username').type('John Doe')
    cy.get('#txt-password').type('ThisIsNotAPassword')
    cy.get('#btn-login').click()

    cy.url().should('include', '/#appointment')

    // Schedule an appointment
    cy.get('#btn-make-appointment').click()
    cy.url().should('include', '/#appointment')

    cy.get('#combo_facility').select('Hongkong CURA Healthcare Center')
    cy.get('#chk_hospotal_readmission').click()
    cy.get('#radio_program_medicaid').click()
    cy.get('#txt_visit_date').type('2023-05-25')
    cy.get('#txt_comment').click({force:true})
    cy.get('#txt_comment').type('This is a test appointment')
    cy.get('#btn-book-appointment').click()

    // Verify appointment confirmation
    cy.get('h2').should('have.text', 'Appointment Confirmation')

    cy.get(':nth-child(2) > .col-xs-4 > label')
    cy.get('#summary').find('.row').find('p')
      .first().should('contain.text', 'Please be informed that your appointment has been booked')
      .next().find('p').should('contain.text', 'Hongkong CURA Healthcare Center')
      .next('contain.text', 'This is test appointment')
      .next('contain.text', 'This is test appointment')
      .next('contain.text', '25/05/2023')
      .next('contain.text', 'Medicaid')
  })
})
