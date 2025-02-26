**Guia Prático: Executando um Banco de Dados PostgreSQL com Docker**

### Introdução
O PostgreSQL é um dos bancos de dados relacionais mais utilizados, e executá-lo via Docker facilita a configuração e o gerenciamento. Este guia apresenta um passo a passo para instalar e rodar um banco de dados PostgreSQL utilizando Docker, garantindo persistência de dados e acesso simplificado.

### 1. Instale o Docker
Antes de iniciar, é necessário ter o Docker instalado em sua máquina. Caso ainda não o tenha, acesse o [site oficial do Docker](https://www.docker.com/) e siga as instruções de instalação conforme seu sistema operacional.

### 2. Baixe a imagem do PostgreSQL
Com o Docker instalado, abra o terminal e execute o seguinte comando para baixar a imagem oficial do PostgreSQL:

```bash
docker pull postgres
```

### 3. Execute o container do PostgreSQL
Após baixar a imagem, inicie um container com o seguinte comando:

```bash
docker run --name meu_postgres -e POSTGRES_PASSWORD=minha_senha -d postgres
```

- Substitua `meu_postgres` pelo nome desejado para o container.
- Defina `minha_senha` como a senha para o usuário `postgres`.

### 4. Conecte-se ao banco de dados
Para visualizar e gerenciar o banco de dados, utilize o **DBeaver** ou outro software de administração de bancos de dados.

### 5. Configurando a persistência de dados
Por padrão, os dados armazenados dentro do container são voláteis e serão perdidos se o container for removido. Para garantir a persistência dos dados, é necessário mapear um volume local para o diretório de dados do PostgreSQL dentro do container.

Se já houver um container em execução, remova-o antes de prosseguir. Depois, utilize o seguinte comando:

```bash
docker run --name meu_postgres -e POSTGRES_PASSWORD=minha_senha -v /caminho/para/seu/volume:/var/lib/postgresql/data -d postgres
```

- Substitua `/caminho/para/seu/volume` pelo diretório onde deseja armazenar os dados localmente.

Após essa configuração, reconecte-se ao banco conforme descrito no **passo 4**.

### 6. Utilizando Docker Compose
Outra forma prática de gerenciar containers é utilizando o **Docker Compose**, que permite definir serviços em um arquivo `docker-compose.yml`. Crie um arquivo `docker-compose.yml` com o seguinte conteúdo:

```yaml
version: "3.8"

services:
  postgres-docker:
    image: postgres
    environment:
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
```

Depois de salvar o arquivo, execute o seguinte comando para iniciar o serviço:

```bash
docker-compose up -d
```

Isso criará e iniciará um container PostgreSQL conforme a configuração definida no arquivo. Para parar o serviço, utilize:

```bash
docker-compose down
```

### Conclusão
Seguindo essas etapas, você terá um ambiente PostgreSQL funcional rodando em um container Docker, com a opção de gerenciá-lo via DBeaver ou outro software de sua escolha. Com a persistência configurada, seus dados permanecerão disponíveis mesmo após a remoção do container. Além disso, o uso do Docker Compose simplifica ainda mais o gerenciamento do banco de dados.