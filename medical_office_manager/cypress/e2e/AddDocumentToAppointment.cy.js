describe('test suite SeePatientMedicalRecord', () => {
    it('A document is added to an appointment. Appointment data: consulta de João Dantas em 17/05/2024 às 08:00h. Document title: "Raio-X" ', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_add_document_to_appointment.py")
       
        // Acessar página de home do médico
        cy.visit('/office/home_doctor/');

        // Login como usuário do grupo medico
        cy.get('[name="username"]').type('medico1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção "Consultas" na navbar da home
        cy.get('#appointmentsListDoctor').click()

        // selecionar a data da consulta a qual será adicionado um documento
        cy.get('#inputDataConsultas').type('2024-05-17')
        cy.get('#btBuscarDataConsultas').click()

        // Clicar em "Ver" na linha do horário 08:00
        cy.get('#bt08').click()

        // Digitar o título do documento
        cy.get('[name="ipt_title_document"]').type('Raio-X')
        // Selecionar o documento a ser adicionado      
        cy.get('#ipt_add_document_to_appointment').selectFile('cypress/fixtures/raio_x.jpg')
        // Adicionar o documento 
        cy.get('#btAdicionar').click()

        // Verificar que o documento adicionado agora consta no detalhamento da consulta
        cy.get('#pageName').invoke("text").should("eq", "DETALHAMENTO DE CONSULTA")
        cy.get('#appointmentDate').invoke("text").should("eq", "Data: 17 de Maio de 2024")
        cy.get('#appointmentHour').invoke("text").should("eq", "Hora: 08:00")
        cy.get('#patientNameCPF').invoke("text").should("eq", "Paciente: João Dantas (CPF 02367016062)")
        cy.get('#Raio-X').invoke("text").should("eq", "- Raio-X")
        cy.get("#btDeletarRaio-X").invoke("val").should("eq", "Deletar")
      
        // Abrir prontuário completo do paciente
        cy.get('#btVerProntuario').click()

        // Verificar que o documento adicionado agora consta no prontuário do paciente
        cy.get('#pageName').invoke("text").should("eq", "PRONTUÁRIO DO PACIENTE")
        cy.get('#patientName').invoke("text").should("eq", "Nome: João Dantas")
        cy.get('#patientCPF').invoke("text").should("eq", "CPF: 02367016062")
        cy.get('#patientBirthDate').invoke("text").should("eq", "Data de nascimento: 17/07/2002")
        cy.get('#appointmentDate').invoke("text").should("eq", "Data da consulta: 17 de Maio de 2024")
        cy.get('#Raio-X').invoke("text").should("eq", "Raio-X")
      
    })
})