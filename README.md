#API RESTful Mongodb e Express
###Online em: https://rest-nodejs.herokuapp.com/
###Usuário demo: 
#####E-mail: `teste@test.com.br`
#####Senha: `teste`
#Principais rotas
##POST /usuario
**Descricao**: Criar um usuário.  
###Modelo:
- **nome** - O nome do usuário.
- **senha** - A senha do usuário.
- **email** - O email do usuário.
- **telefones** - Lista de possíveis telefones.  
    * **numero** - Número do telefone.
    * **ddd** - ddd do telefone.

##POST /sigin
**Descricao**: Verifica usuário cadastro através de email e senha.  
###Body:
- **email** - E-mail do usuário.
- **senha** - Senha do usuário.

##GET /api/usuarioEToken/:id
**Descricao**: Busca um usuário cadastro através do id passado no path mais um header com o valor "Bearer {token}" onde {token} é o valor do token de autentificação.

##Rotas que necessitam do header `Bearer`
GET /api/usuario/listar - Lista todos os usuários.

GET /api/usuario/:id - Busca um usuário de acordo com o id.

PUT /api/usuario/:id - Atualiza os dados de um usuário de acordo com o id.

DELETE /api/usuario/:id - Deleta um usuário de acordo com o id.

POST /api/usuario - Cadastra um novo usuário.
