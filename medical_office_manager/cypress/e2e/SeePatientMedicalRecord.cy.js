describe('test suite SeePatientMedicalRecord', () => {
    it('Patient medical record is displayed clicking on patient CPF on patients list. Existing entry: "entrada de teste para consulta de João Dantas em 17/07/2024". ', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_test_see_medical_record.py")
       
        // Acessar página de listagem de pacientes
        cy.visit('/office/list_patients_doctor/');

        // Login como usuário do grupo medico
        cy.get('[name="username"]').type('medico1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Ver prontuário de paciente (listagem de pacientes -> detalhes do paciente -> prontuário)
        cy.get('#listPatientsDoctor').click()
        cy.contains('02367016062').click()
        cy.contains('Ver prontuário').click()


        // Verificar se prontuário foi renderizado corretamente
        cy.contains('PRONTUÁRIO DO PACIENTE').should('be.visible') 
        cy.contains('Nome: João Dantas').should('be.visible')  
        cy.contains('02367016062').should('be.visible')    
        cy.contains('Data de nascimento: 17/07/2002').should('be.visible')  
        cy.contains('entrada de teste para consulta de João Dantas em 17/07/2024').should('be.visible')
        cy.contains('Ir para detalhamento do paciente').should('be.visible') 
    })

    it('Patient medical record is displayed clicking on patient patient name on patients list. Existing entry: "entrada de teste para consulta de João Dantas em 17/07/2024". ', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_test_see_medical_record.py")
       
        // Acessar página de listagem de pacientes
        cy.visit('/office/list_patients_doctor/');

        // Login como usuário do grupo medico
        cy.get('[name="username"]').type('medico1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()


        // Ver prontuário de paciente (listagem de pacientes -> detalhes do paciente -> prontuário)
        cy.get('#listPatientsDoctor').click()
        cy.contains('João Dantas').click()
        cy.contains('Ver prontuário').click()

        // Verificar se prontuário foi renderizado corretamente
        cy.contains('PRONTUÁRIO DO PACIENTE').should('be.visible')  
        cy.contains('Nome: João Dantas').should('be.visible')  
        cy.contains('02367016062').should('be.visible') 
        cy.contains('Data de nascimento: 17/07/2002').should('be.visible')  
        cy.contains('entrada de teste para consulta de João Dantas em 17/07/2024').should('be.visible')    
        cy.contains('Ir para detalhamento do paciente').should('be.visible')  
    })
    
    it('Patient medical record is displayed clicking on patient patient name (João Dantas) on patients list. No existing entry. ', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_test_see_empty_medical_record.py")
       
        // Acessar página de listagem de pacientes
        cy.visit('/office/list_patients_doctor/');

        // Login como usuário do grupo medico
        cy.get('[name="username"]').type('medico1')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()


        // Ver prontuário de paciente (listagem de pacientes -> detalhes do paciente -> prontuário)
        cy.get('#listPatientsDoctor').click()
        cy.contains('João Dantas').click()
        cy.contains('Ver prontuário').click()

        // Verificar se prontuário foi renderizado corretamente sem nenhuma entrada
        cy.contains('PRONTUÁRIO DO PACIENTE').should('be.visible')  
        cy.contains('Nome: João Dantas').should('be.visible') 
        cy.contains('02367016062').should('be.visible')    
        cy.contains('Data de nascimento: 17/07/2002').should('be.visible')
        cy.get('#medicalRecordContent').should(($div) => {
            const text = $div.text()
            expect(text).not.to.include('Data da consulta')
          })     
        cy.contains('Ir para detalhamento do paciente').should('be.visible')  
    })
})