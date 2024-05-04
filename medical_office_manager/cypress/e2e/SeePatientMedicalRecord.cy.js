describe('test suite SeePatientMedicalRecord', () => {
    it('Patient medical record is displayed clicking on patient CPF on patients list', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_test_see_medical_record.py")
       
        // Acessar página de listagem de pacientes
        cy.visit('/office/list_patients_doctor/');

        // Login como usuário do grupo medico
        cy.get('[name="username"]').type('medico1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

/*
        // Ver prontuário de paciente (listagem de pacientes -> detalhes do paciente -> prontuário)
        cy.get('#listPatients').click()
        cy.contains('02367016062').click()
        cy.contains('Ver prontuário').click()


        // Verificar se prontuário foi renderizado corretamente
        cy.contains('PRONTUÁRIO DO PACIENTE').should('be.visible')  
        cy.contains('Nome: João Dantas').should('be.visible')      
        cy.contains('Data de nascimento: 17/07/2024').should('be.visible')      
        cy.contains('Voltar').should('be.visible')  
*/
       
    })
/*    it('Patient medical record is displayed clicking on patient patient name on patients list', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_test_see_medical_record.py")
       
        // Acessar página de registro de paciente
        cy.visit('/office/register_patient/');


        // Login como usuário do grupo assistente
        cy.get('[name="username"]').type('assistente1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()


        // Registrar um novo paciente
        cy.get('[name="name"]').type('João Dantas')
        cy.get('[type="date"]').type('2024-07-17')
        cy.get('[name="CPF"]').type('023.670.160-62')
        cy.get('[name="phone"]').type('35351587')
        cy.get('[type="submit"]').click()


        // Logout
        cy.contains('Sair').click()


        // Redirecionar para login
        cy.get('#loginRedirectionButton').click()


        // Login como usuário do grupo medico
        cy.get('[name="username"]').type('medico1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()


        // Ver prontuário de paciente (listagem de pacientes -> detalhes do paciente -> prontuário)
        cy.get('#listPatients').click()
        cy.contains('João Dantas').click()
        cy.contains('Ver prontuário').click()


        // Verificar se prontuário foi renderizado corretamente
        cy.contains('PRONTUÁRIO DO PACIENTE').should('be.visible')  
        cy.contains('Nome: João Dantas').should('be.visible')      
        cy.contains('Data de nascimento: 17/07/2024').should('be.visible')      
        cy.contains('Voltar').should('be.visible')  
       
    })
*/
})
