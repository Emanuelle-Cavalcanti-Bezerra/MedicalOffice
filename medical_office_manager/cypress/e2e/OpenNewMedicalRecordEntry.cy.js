describe('test suite OpenNewMedicalRecordEntry', () => {
    it('Doctor open a new medical record entry for the appointment of patient "João Dantas" (CPF = 02367016062) on 2024-05-17 at 08:00', () => {
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_test_open_medical_record_entry.py")
        
        // Acessar página de home do médico
        cy.visit('/office/home_doctor/');
        
        // Login como usuário do grupo médicos
        cy.get('[name="username"]').type('medico1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção "Consultas" na navbar da home
        cy.get('#appointmentsListDoctor').click()

        // Escolher a data '2024-07-17' para visualizar a programação de consultas do dia 
        cy.get('#inputDataConsultas').type('2024-05-17')
        cy.get('#btBuscarDataConsultas').click()

        // Clicar em "Ver" na linha do horário 08:00
        cy.get('#bt08').click()

        // Preencher e capturar o conteúdo da entrada de prontuário
        cy.get('[name="new_medical_record_entry"]').type('Testando - Conteúdo da entrada de prontuário do paciente João Dantas para consulta do dia 17-05-2024 às 08am.')
        cy.get('#btSalvar').click()

        // Verificar se a nova entrada de prontuário agora consta na página de detalhes da consulta
        cy.contains('Testando - Conteúdo da entrada de prontuário do paciente João Dantas para consulta do dia 17-05-2024 às 08am.').should('be.visible')

        // Abrir prontuário completo do paciente
        cy.get('#btVerProntuario').click()

        // Verificar se a nova entrada de prontuário agora consta no prontuário do paciente
        cy.contains('PRONTUÁRIO DO PACIENTE').should('be.visible')
        cy.contains('João Dantas').should('be.visible')
        cy.contains('02367016062').should('be.visible')
        cy.contains('17 de Maio de 2024').should('be.visible')
        cy.contains('Testando - Conteúdo da entrada de prontuário do paciente João Dantas para consulta do dia 17-05-2024 às 08am.').should('be.visible')
    })

})