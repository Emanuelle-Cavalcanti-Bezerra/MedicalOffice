describe('test suite ScheduleAppointment', () => {
    it('Assistant schedule an appointment for patient "João Dantas" (CPF = 02367016062) on 2024-07-17 at 14:00', () => {
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_test_schedule_appointment.py")
        
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

        // Clicar em "Agendar" na linha do horário 14:00
        cy.get('#bt14').click()

        // Escolher o paciente "João Dantas"
        cy.get("select").select("João Dantas-02367016062").invoke("val")
        cy.get('#btConfirm_selected_patient').click()
        cy.contains('CONSULTA AGENDADA COM SUCESSO!').should('be.visible')
        cy.contains('Data: 17/07/2024').should('be.visible')
        cy.contains('Hora: 14:00').should('be.visible')
        cy.contains('Voltar para visualização de consultas').should('be.visible')

        // Voltar para lista de consultas no dia 17/07/2024
        cy.get('#btBackToAppointmentsList').click()

        // Verificar se o paciente 'João Dantas' foi agendado para dia 17/07/2024 às 14:00
        cy.contains('CONSULTAS - 17/07/2024').should('be.visible')
        //cy.get('#appointment_slot14').should(($li) => {
            //const text = $li.text()
            //expect(text).to.include('João Dantas')
            //expect(text).to.match(/João Dantas/)
            //expect(text).not.to.include('algo que não se deve achar')
          //})
        cy.get('#appointment_slot14').invoke("text").should("eq", "João Dantas")
        cy.get("#bt14").invoke("val").should("eq", "Desmarcar")
    })

})