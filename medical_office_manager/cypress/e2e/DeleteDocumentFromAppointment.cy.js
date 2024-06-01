describe('test suite SeePatientMedicalRecord', () => {
    it('A document is delete from an appointment. Appointment data: consulta de João Dantas em 17/05/2024 às 08:00h. Document title: "Hemograma" ', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_delete_document_from_appointment.py")
       
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

        // Clicar no botão "Deletar" correspondente ao documento "Hemograma"
        cy.get("#btDeletarHemograma").click()

        // Confirmar a deleção
        cy.get("#bt_deletar").click()
        
        // Abrir prontuário completo do paciente
        cy.get('#btVerProntuario').click()

        // Verificar que o documento "Hemograma" não consta mais no prontuário
        cy.get('#pageName').invoke("text").should("eq", "PRONTUÁRIO DO PACIENTE")
        cy.get('#patientName').invoke("text").should("eq", "Nome: João Dantas")
        cy.get('#patientCPF').invoke("text").should("eq", "CPF: 02367016062")
        cy.get('#patientBirthDate').invoke("text").should("eq", "Data de nascimento: 17/07/2002")
        cy.get('#appointmentDate').invoke("text").should("eq", "Data da consulta: 17 de Maio de 2024")
        cy.get('#documentsList').should(($ul) => {
            const text = $ul.text()
            expect(text).not.to.include('Hemograma')
        })
        
    })
})