describe('test suite SeePatientMedicalRecord', () => {
    it('Patient medical record entry is edited. Edited entry: "entrada de teste para consulta de João Dantas em 17/05/2024 às 08:00h EDITADA. ', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_test_edit_medical_record_entry.py")
       
        // Acessar página de home do médico
        cy.visit('/office/home_doctor/');

        // Login como usuário do grupo medico
        cy.get('[name="username"]').type('medico1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção "Consultas" na navbar da home
        cy.get('#appointmentsListDoctor').click()

        // selecionar a data da consulta cuja entrada de prontuário se deseja editar
        cy.get('#inputDataConsultas').type('2024-05-17')
        cy.get('#btBuscarDataConsultas').click()

        // Verificar se a programação de consultas do dia escolhido contém a consulta buscada
        cy.contains('CONSULTAS - 17/05/2024').should('be.visible')  
        cy.contains('João Dantas').should('be.visible') 
        cy.contains('Ver').should('be.visible') 

        // Clicar em "Ver" na linha do horário 08:00
        cy.get('#bt08').click()

        // Clicar em "Editar"
        cy.get('#btEditar').click()

        // Preencher e capturar o conteúdo da nova entrada de prontuário editada
        cy.get('[name="edited_medical_record_entry"]').type('entrada de teste para consulta de João Dantas em 17/05/2024 às 08:00h EDITADA.')
        cy.get('#btSalvarEditedEntry').click()

        // Verificar se a entrada de prontuário editada agora consta na página de detalhes da consulta
        cy.contains('entrada de teste para consulta de João Dantas em 17/05/2024 às 08:00h EDITADA.').should('be.visible')

        // Abrir prontuário completo do paciente
        cy.get('#btVerProntuario').click()

        // Verificar se a entrada de prontuário editada agora consta no prontuário do paciente
        cy.contains('PRONTUÁRIO DO PACIENTE').should('be.visible')
        cy.contains('João Dantas').should('be.visible')
        cy.contains('02367016062').should('be.visible')
        cy.contains('17 de Maio de 2024').should('be.visible')
        cy.contains('entrada de teste para consulta de João Dantas em 17/05/2024 às 08:00h EDITADA.').should('be.visible')
    })
})