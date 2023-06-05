## Banco de dados Prática IOK

Atualizado em:

> - 28/04/2023 - versão inicial.

#### Instâncias do banco de dados:

> - **bancopraticaiok** - utilizado pela plataforma da Maze, retirada de uso em janeiro de 2022.
> - **bancopraticaiok_teste** - utilizado pelos ambientes de desenvolvimento e testes.
> - **bancopraticaiok_prod** - utilizado pelo ambiente de produção <new.praticaiok.com>.
> - **bancopraticaiok_new** - utilizado durante o desenvolvimento da nova plataforma.
> - **bancopraticaiok_new_test** - utilizado durante o desenvolvimento de testes da nova plataforma.

##### Observações:

- Esta documentação se refere ao banco **bancopraticaiok_new** e, por consequência, **bancopraticaiok_new_test**.
- Serão documentadas apenas as tabelas em uso atualmente.
- Os valores de temperatura devem ser armazenados na unidade padrão Celsius.
- Os valores de peso devem ser armazenados na unidade padrão gramas.
- Os idiomas são armazenados pelas [abreviações ISO de duas letras](https://pt.wikipedia.org/wiki/ISO_639).

### Lista de tabelas do banco de dados:

> - User - Armazena as informações de usuário.
> - userType - Armazena os tipos de usuário, está tabela tem relação com a companyType
> - userType_PermissionType - Tabela responsavel relação nxn entre userType e permissionType
> - permissionType - Contem os tipos de permisão da plataforma
> - company - Armazena as informações da companhia do usuário (todo usuario deve ter uma companhia)
> - companyType - Armazena os tipos de companhia (Prática, Distribuidor, Rede, Dono)

### Campos por tabela:
---

### User

Armazena as informações de usuário.

> - id - Chave primária.

> - userTypeId - Chave estrangeira. Relaciona a tabela User com a tabela userType.

> - userTypeId - Chave estrangeira. Relaciona a tabela User com a tabela userType.

> - companyId - Chave estrangeira. Relaciona a tabela User com a tabela company.

> - username - Nome inserido pelo usuário no momento do registro.

> - email - E-mail inserido pelo usuário no momento do registro.

> - emailVerified - Indica se o usuário realizou a ativação do cadastro através da verificação do e-mail. O login só é possível após a confirmação.

> - phone - Telefone inserido pelo usuário no momento do registro.

> - password - Senha do usuário(utilizando Criptografia).

> - creationDAte - Data de criação da conta.

> - accessToken - Token gerado no momento do login e utilizado para verificação de request

> - activateToken - Token usando para ativação de conta e recuperação de senha

---

### userConfigs

Armazena as configurações daquele usuario.

> - id - Chave primária.

> - userId - Chave estrangeira. Relaciona a tabela user com a tabela userConfigs.

> - language - Idioma do usuario.
>   **Possíveis valores:** 'PT' para português, 'EN' para inglês, 'ES' para espanhol, 'FR' para francês, 'RU' para russo, 'PL' para polonês, 'DE' para alemão, 'ZH' para chinês, 'EL' para grego.
>   **Valor padrão:** 'EN' - inglês.

> - tempUnit - Unidade de temperatura salva pelo usuário.
>   **Possíveis valores:** '°C' ou '°F'.
>   **Valor padrão:** '°C'.

> - weighUnit - Unidade de peso salva pelo usuário.
>   **Possíveis valores:** 'Gramas' ou 'Oz'.
>   **Valor padrão:** 'Gramas'.

> - theme - Tema da plataforma.
>   **Possíveis valores:** 'Light' ou 'Dark'.
>   **Valor padrão:** 'Light'.

---

### userType

Armazena os tipo de usuário.

> - id - Chave primária.

> - companyTypeId - Chave estrangeira. Relaciona a tabela userType com a tabela companyType

> - userType- Nome do tipo do usuario.
> **Possíveis valores:** definir.

---

### userType

Tabela de relação nxn entre userType e permissionType.

> - userTypeId - Chave estrangeira. Relaciona a tabela userType.

> - permissionTypeId - Chave estrangeira. Relaciona a tabela permissionType.

---

### permissionType

Armazena os tipo de permisão da plataforma, definir.

> - id -  Chave primáriae.

> - permission - Definir.

---

### company

Armazena as informações da companhia.

> - id - Chave primária.

> - companyTypeId - Chave estrangeira. Relaciona a tabela company com a tabela companyType.

> - name - Nome da companhia.

---

### companyType

Armazena os tipo de companhia.

> - id - Chave primária.

> - companyType- Nome do tipo da companhia.
> **Possíveis valores:** Prática, Distribuidor, Rede, Dono.

---
