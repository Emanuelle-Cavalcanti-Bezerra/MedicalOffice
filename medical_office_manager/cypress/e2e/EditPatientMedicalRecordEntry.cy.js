describe('test suite SeePatientMedicalRecord', () => {
    it('Patient medical record entry is edited. Existing entry: "entrada de teste para consulta de João Dantas em 17/05/2024 às 08:00h". New edited entry: "entrada de teste para consulta de João Dantas em 17/05/2024 às 08:00h EDITADA." ', () => {      
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

        // Clicar em "Ver" na linha do horário 08:00
        cy.get('#bt08').click()

        // Clicar em "Editar"
        cy.get('#btEditar').click()

        // Preencher e capturar o conteúdo da nova entrada de prontuário editada
        cy.get('[name="edited_medical_record_entry"]').type(' EDITADA')
        cy.get('#btSalvarEditedEntry').click()

        // Verificar se a entrada de prontuário editada agora consta na página de detalhes da consulta
        cy.get('#pageName').invoke("text").should("eq", "DETALHAMENTO DE CONSULTA")
        cy.get('#appointmentDate').invoke("text").should("eq", "Data: 17 de Maio de 2024")
        cy.get('#appointmentHour').invoke("text").should("eq", "Hora: 08:00")
        cy.get('#patientNameCPF').invoke("text").should("eq", "Paciente: João Dantas (CPF 02367016062)")
        cy.get('#medicalRecordEntryContent').should(($div) => {
            expect($div.text().trim()).equal("entrada de teste para consulta de João Dantas em 17/05/2024 às 08:00h. EDITADA");
        });

        // Abrir prontuário completo do paciente
        cy.get('#btVerProntuario').click()

        // Verificar se a entrada de prontuário editada agora consta no prontuário do paciente
        cy.get('#pageName').invoke("text").should("eq", "PRONTUÁRIO DO PACIENTE")
        cy.get('#patientName').invoke("text").should("eq", "Nome: João Dantas")
        cy.get('#patientCPF').invoke("text").should("eq", "CPF: 02367016062")
        cy.get('#patientBirthDate').invoke("text").should("eq", "Data de nascimento: 17/07/2002")
        cy.get('#appointmentDate').invoke("text").should("eq", "Data da consulta: 17 de Maio de 2024")
        cy.get('#medicalRecordRealContent').should(($div) => {
            expect($div.text().trim()).equal("entrada de teste para consulta de João Dantas em 17/05/2024 às 08:00h. EDITADA");
        });
    })
})