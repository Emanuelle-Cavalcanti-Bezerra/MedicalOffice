import {getCurrentDateUTC3} from './utils.js'
import {formatDateBR} from './utils.js'

describe('test suite SeeAppointmentsPerDateDoctor', () => {
    it('List of appointments of a chosen date (2024-07-17) is displayed to doctor.Temos consultas para João Dantas e Ester Oliveira agendadas para esse dia.', () => {
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
        it('List of appointments of current date is displayed to doctor. Doctor does not chose a day.', () => {
            // Executar setup de preparação para o teste
            cy.exec("python scripts/setup_test_see_appointments_per_date_doctor.py")
            
            // Acessar página de home do medico
            cy.visit('/office/home_doctor/');
            
            // Login como usuário do grupo medicos
            cy.get('[name="username"]').type('medico1')
            cy.get('[name="password"]').type('fds20241')
            cy.get('#loginButton').click()
    
            // Clicar na opção "Consultas" na navbar da home
            cy.get('#appointmentsListDoctor').click()
            
            // Verificar se a programação de consultas do dia atual foi renderizada corretamente
            cy.get("#inputDataConsultas").invoke("val").should("eq", getCurrentDateUTC3())
            cy.contains(`CONSULTAS - ${formatDateBR(getCurrentDateUTC3())}`).should('be.visible')
        })
 
})