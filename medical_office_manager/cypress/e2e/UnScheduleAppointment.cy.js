describe('test suite ScheduleAppointment', () => {
    it('Assistant unschedule an appointment for patient "João Dantas" (CPF = 02367016062) on 2024-07-17 at 08:00', () => {
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_test_unschedule_appointment.py")
        
        // Acessar página de home do assistente
        cy.visit('/office/home_assistant/');
        
        // Login como usuário do grupo assistentes
        cy.get('[name="username"]').type('assistente1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção "Consultas" na navbar da home
        cy.get('#appointmentsListAssistant').click()

        // Escolher a data '2024-07-17' para visualizar a programação de consultas do dia 
        cy.get('#inputDataConsultas').type('2024-07-17')
        cy.get('#btBuscarDataConsultas').click()

        // Clicar em "Desmarcar" na linha do horário 08:00
        cy.get('#bt08').click()

        // Confirmar deleção
        cy.get('#btConfirm').click()
        cy.contains('CONSULTA DESMARCADA COM SUCESSO!').should('be.visible')
        cy.contains('Voltar para visualização de consultas').should('be.visible')
        

        // Voltar para lista de consultas no dia 17/07/2024
        cy.get('#btBackToAppointmentsList').click()

        // Verificar se o paciente 'João Dantas' foi desmarcado da consulta do dia 17/07/2024 às 08:00 e não aparece mais na listagem de consultas desse dia
        cy.contains('CONSULTAS - 17/07/2024').should('be.visible')
        cy.get('#appointment_slot08').invoke("text").should("eq", "DISPONÍVEL")
        cy.get("#bt08").invoke("val").should("eq", "Agendar")
    })

})