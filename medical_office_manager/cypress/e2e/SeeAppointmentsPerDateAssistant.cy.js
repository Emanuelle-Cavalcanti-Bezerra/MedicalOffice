describe('test suite SeeAppointmentsPerDateAssistant', () => {
    it('List of appointments of a chosen date is displayed to assistant', () => {
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_test_see_appointments_per_date_assistant.py")
        
        // Acessar página de home do assistente
        cy.visit('/office/home_assistant/');
        
        // Login como usuário do grupo assistentes
        cy.get('[name="username"]').type('assistente1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção "Consultas" na navbar da home
        cy.get('#appointmentsListAssistant').click()

        // Escolher uma data para visualizar a programação de consultas do dia escolhido
        cy.get('#inputDataConsultas').type('2024-07-17')
        cy.get('#btBuscarDataConsultas').click()

        // Verificar se a programação de consultas do dia escolhido foi renderizada corretamente
        cy.contains('CONSULTAS - 17/07/2024').should('be.visible')  
        cy.contains('João Dantas').should('be.visible')  
        cy.contains('Ester Oliveira').should('be.visible')    
        cy.contains('Agendar').should('be.visible') 
        cy.contains('Desmarcar').should('be.visible')  
    })

})