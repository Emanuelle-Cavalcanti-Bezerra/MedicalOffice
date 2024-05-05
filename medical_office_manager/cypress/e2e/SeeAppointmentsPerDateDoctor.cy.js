describe('test suite SeeAppointmentsPerDateDoctor', () => {
    it('List of appointments of default date (current day) is displayed to doctor', () => {
            // Executar setup de preparação para o teste
            cy.exec("python scripts/setup_test_see_appointments_per_date_doctor.py")
    
            // Acessar página de home do médico
            cy.visit('/office/home_doctor/');
            
            // Login como usuário do grupo médicos
            cy.get('[name="username"]').type('medico1')
            cy.get('[name="password"]').type('fds20241')
            cy.get('#loginButton').click()
    
            // Clicar na opção "Consultas" na navbar da home
            cy.get('#appointmentsListDoctor').click()
    
            // Escolher uma data para visualizar a programação de consultas do dia escolhido
            cy.get('#inputDataConsultas').type('2024-07-17')
            cy.get('#btBuscarDataConsultas').click()
    
            // Verificar se a programação de consultas do dia escolhido foi renderizada corretamente
            cy.contains('CONSULTAS - 17/07/2024').should('be.visible')  
            cy.contains('João Dantas').should('be.visible')  
            cy.contains('Ester Oliveira').should('be.visible')    
            cy.contains('--------------------').should('be.visible') 
            cy.contains('Ver').should('be.visible')  
        })

})