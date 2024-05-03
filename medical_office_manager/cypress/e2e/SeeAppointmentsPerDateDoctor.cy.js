describe('test suite SeeAppointmentsPerDateDoctor', () => {
    it('List of appointments of a chosen date is displayed to doctor', () => {
        cy.visit('/office/home_doctor/');
        cy.get('[name="username"]').type('medico1')
        cy.get('[name="password"]').type('fds20241')
        cy.get(':nth-child(11)').click()
        cy.get('.navbar-nav > :nth-child(3) > .nav-link > b').click()
        cy.get('[type="date"]').type('2024-07-17')
        cy.get('form > button').click()
    })

})