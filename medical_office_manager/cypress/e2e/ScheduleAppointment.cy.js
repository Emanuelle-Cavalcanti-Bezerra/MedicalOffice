describe('test suite ScheduleAppointment', () => {
    it('Assitant schedule an appointment', () => {
        cy.visit('/office/home_assistant/');
        cy.get('[name="username"]').type('assistente1')
        cy.get('[name="password"]').type('fds20241')
        cy.get(':nth-child(11)').click()
        cy.get('.navbar-nav > :nth-child(3) > .nav-link > b').click()
        cy.get('[type="date"]').type('2024-07-30')
        cy.get('form > button').click()
        cy.get(':nth-child(10) > :nth-child(3) > button').click()
        cy.get("select")
            .select("17181402404")
            .invoke("val")
            .should("eq", "17181402404")
        cy.get('[type="submit"]').click()
        cy.get(':nth-child(4) > button').click()
    })

})