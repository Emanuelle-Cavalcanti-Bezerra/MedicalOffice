describe('test suite SeePatientMedicalRecord', () => {
    it('Manager registers an assistant user. User data: username - assistente1; email - assistente1@gmail.com; grupo - assistentes; senha - fds20241; senha de confirmação - fds2024.', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_register_user.py")
       
        // Acessar página de home do manager
        cy.visit('/office/register_user/');

        // Login como manager
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção Cadastrar usuários
        cy.get('#registerSystemUser').click()

        // Preencher formulário de cadastro de usuário e enviar dados
        cy.get('#username').type('assistente1')
        cy.get('#email').type('assistente1@gmail.com')
        cy.get('#assistentes').check()
        cy.get('#password').type('fds20241')
        cy.get('#cfpassword').type('fds20241')
        cy.get('#btRegister').click()

        // Verificar se o novo usuário agora consta na lista de usuários
        cy.get('#pageName').invoke("text").should("eq", "LISTA DE USUÁRIOS")
        cy.get('#tbUsersList').should(($table) => {
            const text = $table.text()
            expect(text).to.include('assistente1')
            expect(text).to.include('assistente1@gmail.com')
            expect(text).to.include('assistentes')
        })
    })

    it('Manager registers a doctor user. User data: username - medico1; email - medico1@gmail.com; grupo - medicos; senha - fds20241; senha de confirmação - fds2024.', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_register_user.py")
       
        // Acessar página de home do manager
        cy.visit('/office/register_user/');

        // Login como manager
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção Cadastrar usuários
        cy.get('#registerSystemUser').click()

        // Preencher formulário de cadastro de usuário e enviar dados
        cy.get('#username').type('medico1')
        cy.get('#email').type('medico1@gmail.com')
        cy.get('#médicos').check()
        cy.get('#password').type('fds20241')
        cy.get('#cfpassword').type('fds20241')
        cy.get('#btRegister').click()

        // Verificar se o novo usuário agora consta na lista de usuários
        cy.get('#pageName').invoke("text").should("eq", "LISTA DE USUÁRIOS")
        cy.get('#tbUsersList').should(($table) => {
            const text = $table.text()
            expect(text).to.include('medico1')
            expect(text).to.include('medico1@gmail.com')
            expect(text).to.include('médicos')
        })
    })

    it('Manager tries to register a doctor user, but fails to do so because passwords do not match. User data: username - medico1; email - medico1@gmail.com; grupo - medicos; senha - fds20241; senha de confirmação - fds20242.', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_register_user.py")
       
        // Acessar página de home do manager
        cy.visit('/office/register_user/');

        // Login como manager
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção Cadastrar usuários
        cy.get('#registerSystemUser').click()

        // Preencher formulário de cadastro de usuário e enviar dados
        cy.get('#username').type('medico1')
        cy.get('#email').type('medico1@gmail.com')
        cy.get('#médicos').check()
        cy.get('#password').type('fds20241')
        cy.get('#cfpassword').type('fds20242')
        cy.get('#btRegister').click()

        // Verificar se o erro no cadastro é exibido ao gerente
        cy.get('#pageName').invoke("text").should("eq", "CADASTRAR USUÁRIO")
        cy.get('#senhas_nao_conferem').should(($div) => {
            const text = $div.text()
            expect(text).to.include('senhas não conferem!')
        })

        // Verificar que o usuário não foi cadastrado e não consta na lista de usuários
        cy.get('#listSystemUsers').click()
        cy.get('#pageName').invoke("text").should("eq", "LISTA DE USUÁRIOS")
        cy.get('#tbUsersList').should(($table) => {
            const text = $table.text()
            expect(text).not.to.include('medico1')
            expect(text).not.to.include('medico1@gmail.com')
        })
    })

    it('Manager tries to register a doctor user, but fails to do so because password has less than six digits. User data: username - medico1; email - medico1@gmail.com; grupo - medicos; senha - fds20; senha de confirmação - fds20.', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_register_user.py")
       
        // Acessar página de home do manager
        cy.visit('/office/register_user/');

        // Login como manager
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção Cadastrar usuários
        cy.get('#registerSystemUser').click()

        // Preencher formulário de cadastro de usuário e enviar dados
        cy.get('#username').type('medico1')
        cy.get('#email').type('medico1@gmail.com')
        cy.get('#médicos').check()
        cy.get('#password').type('fds20')
        cy.get('#cfpassword').type('fds20')
        cy.get('#btRegister').click()

        // Verificar se o erro no cadastro é exibido ao gerente
        cy.get('#pageName').invoke("text").should("eq", "CADASTRAR USUÁRIO")
        cy.get('#senha_menor_que_6_digitos').should(($div) => {
            const text = $div.text()
            expect(text).to.include('senha deve ter 6 dígitos ou mais!!')
        })

        // Verificar que o usuário não foi cadastrado e não consta na lista de usuários
        cy.get('#listSystemUsers').click()
        cy.get('#pageName').invoke("text").should("eq", "LISTA DE USUÁRIOS")
        cy.get('#tbUsersList').should(($table) => {
            const text = $table.text()
            expect(text).not.to.include('medico1')
            expect(text).not.to.include('medico1@gmail.com')
        })
    })

    it('Manager tries to register a doctor user, but fails to do so because username already exists. User data: username - medico1; email - outro_medico1@gmail.com; grupo - medicos; senha - fds20241; senha de confirmação - fds20241.', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_failed_register_user_with_previously_registered_username.py")
       
        // Acessar página de home do manager
        cy.visit('/office/register_user/');

        // Login como manager
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção Cadastrar usuários
        cy.get('#registerSystemUser').click()

        // Preencher formulário de cadastro de usuário e enviar dados
        cy.get('#username').type('medico1')
        cy.get('#email').type('outro_medico1@gmail.com')
        cy.get('#médicos').check()
        cy.get('#password').type('fds20241')
        cy.get('#cfpassword').type('fds20241')
        cy.get('#btRegister').click()

        // Verificar se o erro no cadastro é exibido ao gerente
        cy.get('#pageName').invoke("text").should("eq", "CADASTRAR USUÁRIO")
        cy.get('#username_ja_cadastrado').should(($div) => {
            const text = $div.text()
            expect(text).to.include('Já existe usuário cadastrado com esse username. Escolha outro.')
        })

        // Verificar que o usuário não foi cadastrado e não consta na lista de usuários
        cy.get('#listSystemUsers').click()
        cy.get('#pageName').invoke("text").should("eq", "LISTA DE USUÁRIOS")
        cy.get('#tbUsersList').should(($table) => {
            const text = $table.text()
            expect(text).to.include('medico1')
            expect(text).not.to.include('outro_medico1@gmail.com')
        })
    })

    it('Manager tries to register a doctor user, but fails to do so because username is empty. User data: username - ""; email - medico1@gmail.com; grupo - medicos; senha - fds20241; senha de confirmação - fds20241.', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_register_user.py")
       
        // Acessar página de home do manager
        cy.visit('/office/register_user/');

        // Login como manager
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção Cadastrar usuários
        cy.get('#registerSystemUser').click()

        // Preencher formulário de cadastro de usuário e enviar dados
        cy.get('#email').type('medico1@gmail.com')
        cy.get('#médicos').check()
        cy.get('#password').type('fds20241')
        cy.get('#cfpassword').type('fds20241')
        cy.get('#btRegister').click()

        // Verificar se o erro no cadastro é exibido ao gerente
        cy.get('#pageName').invoke("text").should("eq", "CADASTRAR USUÁRIO")
        cy.get('#empty_fields').should(($div) => {
            const text = $div.text()
            expect(text).to.include('Preencha todos os campos obrigatórios!')
        })

        // Verificar que o usuário não foi cadastrado e não consta na lista de usuários
        cy.get('#listSystemUsers').click()
        cy.get('#pageName').invoke("text").should("eq", "LISTA DE USUÁRIOS")
        cy.get('#tbUsersList').should(($table) => {
            const text = $table.text()
            expect(text).not.to.include('medico1@gmail.com')
        })
    })

    it('Manager tries to register a doctor user, but fails to do so because email is empty. User data: username - "medico1"; email - ""; grupo - medicos; senha - fds20241; senha de confirmação - fds20241.', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_register_user.py")
       
        // Acessar página de home do manager
        cy.visit('/office/register_user/');

        // Login como manager
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção Cadastrar usuários
        cy.get('#registerSystemUser').click()

        // Preencher formulário de cadastro de usuário e enviar dados
        cy.get('#username').type('medico1')
        cy.get('#médicos').check()
        cy.get('#password').type('fds20241')
        cy.get('#cfpassword').type('fds20241')
        cy.get('#btRegister').click()

        // Verificar se o erro no cadastro é exibido ao gerente
        cy.get('#pageName').invoke("text").should("eq", "CADASTRAR USUÁRIO")
        cy.get('#empty_fields').should(($div) => {
            const text = $div.text()
            expect(text).to.include('Preencha todos os campos obrigatórios!')
        })

        // Verificar que o usuário não foi cadastrado e não consta na lista de usuários
        cy.get('#listSystemUsers').click()
        cy.get('#pageName').invoke("text").should("eq", "LISTA DE USUÁRIOS")
        cy.get('#tbUsersList').should(($table) => {
            const text = $table.text()
            expect(text).not.to.include('medico1')
        })
    })

    it('Manager tries to register a doctor user, but fails to do so because no group was chosen. User data: username - "medico1"; email - ""; grupo - ""; senha - fds20241; senha de confirmação - fds20241.', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_register_user.py")
       
        // Acessar página de home do manager
        cy.visit('/office/register_user/');

        // Login como manager
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção Cadastrar usuários
        cy.get('#registerSystemUser').click()

        // Preencher formulário de cadastro de usuário e enviar dados
        cy.get('#username').type('medico1')
        cy.get('#email').type('medico1@gmail.com')
        cy.get('#password').type('fds20241')
        cy.get('#cfpassword').type('fds20241')
        cy.get('#btRegister').click()

        // Verificar se o erro no cadastro é exibido ao gerente
        cy.get('#pageName').invoke("text").should("eq", "CADASTRAR USUÁRIO")
        cy.get('#empty_fields').should(($div) => {
            const text = $div.text()
            expect(text).to.include('Preencha todos os campos obrigatórios!')
        })

        // Verificar que o usuário não foi cadastrado e não consta na lista de usuários
        cy.get('#listSystemUsers').click()
        cy.get('#pageName').invoke("text").should("eq", "LISTA DE USUÁRIOS")
        cy.get('#tbUsersList').should(($table) => {
            const text = $table.text()
            expect(text).not.to.include('medico1')
            expect(text).not.to.include('medico1@gmail.com')
        })
    })

    it('Manager tries to register a doctor user, but fails to do so because password is empty. User data: username - "medico1"; email - ""; grupo - ""; senha - ""; senha de confirmação - fds20241.', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_register_user.py")
       
        // Acessar página de home do manager
        cy.visit('/office/register_user/');

        // Login como manager
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção Cadastrar usuários
        cy.get('#registerSystemUser').click()

        // Preencher formulário de cadastro de usuário e enviar dados
        cy.get('#username').type('medico1')
        cy.get('#email').type('medico1@gmail.com')
        cy.get('#cfpassword').type('fds20241')
        cy.get('#btRegister').click()

        // Verificar se o erro no cadastro é exibido ao gerente
        cy.get('#pageName').invoke("text").should("eq", "CADASTRAR USUÁRIO")
        cy.get('#empty_fields').should(($div) => {
            const text = $div.text()
            expect(text).to.include('Preencha todos os campos obrigatórios!')
        })

        // Verificar que o usuário não foi cadastrado e não consta na lista de usuários
        cy.get('#listSystemUsers').click()
        cy.get('#pageName').invoke("text").should("eq", "LISTA DE USUÁRIOS")
        cy.get('#tbUsersList').should(($table) => {
            const text = $table.text()
            expect(text).not.to.include('medico1')
            expect(text).not.to.include('medico1@gmail.com')
        })
    })

    it('Manager tries to register a doctor user, but fails to do so because confirmation password is empty. User data: username - "medico1"; email - ""; grupo - ""; senha - fds20241; senha de confirmação - "".', () => {      
        // Executar setup de preparação para o teste
        cy.exec("python scripts/setup_register_user.py")
       
        // Acessar página de home do manager
        cy.visit('/office/register_user/');

        // Login como manager
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('fds20241')
        cy.get('#loginButton').click()

        // Clicar na opção Cadastrar usuários
        cy.get('#registerSystemUser').click()

        // Preencher formulário de cadastro de usuário e enviar dados
        cy.get('#username').type('medico1')
        cy.get('#email').type('medico1@gmail.com')
        cy.get('#password').type('fds20241')
        cy.get('#btRegister').click()

        // Verificar se o erro no cadastro é exibido ao gerente
        cy.get('#pageName').invoke("text").should("eq", "CADASTRAR USUÁRIO")
        cy.get('#empty_fields').should(($div) => {
            const text = $div.text()
            expect(text).to.include('Preencha todos os campos obrigatórios!')
        })

        // Verificar que o usuário não foi cadastrado e não consta na lista de usuários
        cy.get('#listSystemUsers').click()
        cy.get('#pageName').invoke("text").should("eq", "LISTA DE USUÁRIOS")
        cy.get('#tbUsersList').should(($table) => {
            const text = $table.text()
            expect(text).not.to.include('medico1')
            expect(text).not.to.include('medico1@gmail.com')
        })
    })
})