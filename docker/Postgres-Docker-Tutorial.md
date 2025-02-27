**Guia Prático: Executando um Banco de Dados PostgreSQL com Docker e pgAdmin**

## Introdução
O PostgreSQL é um dos bancos de dados relacionais mais utilizados, e executá-lo via Docker facilita a configuração e o gerenciamento. Este guia apresenta um passo a passo para instalar e rodar um banco de dados PostgreSQL utilizando Docker e **pgAdmin** para administração, garantindo persistência de dados e acesso simplificado.

## 1. Instale o Docker
Antes de iniciar, é necessário ter o Docker instalado em sua máquina. Caso ainda não o tenha, acesse o [site oficial do Docker](https://www.docker.com/) e siga as instruções de instalação conforme seu sistema operacional.

## 2. Baixe a imagem do PostgreSQL
Com o Docker instalado, abra o terminal e execute o seguinte comando para baixar a imagem oficial do PostgreSQL:

```bash
docker pull postgres
```

## 3. Execute o container do PostgreSQL
Após baixar a imagem, inicie um container com o seguinte comando:

```bash
docker run --name meu_postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=minha_senha -d postgres
```

- Substitua `meu_postgres` pelo nome desejado para o container.
- Defina `minha_senha` como a senha para o usuário `postgres`.

## 4. Conecte-se ao banco de dados
Para visualizar e gerenciar o banco de dados, utilize ferramentas como **DBeaver**, **pgAdmin** ou **psql**.

## 5. Configurando a persistência de dados
Por padrão, os dados armazenados dentro do container são voláteis e serão perdidos se o container for removido. Para garantir a persistência dos dados, é necessário mapear um volume local para o diretório de dados do PostgreSQL dentro do container.

Se já houver um container em execução, remova-o antes de prosseguir. Depois, utilize o seguinte comando:

```bash
docker run --name meu_postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=minha_senha -v /caminho/para/seu/volume:/var/lib/postgresql/data -d postgres
```

- Substitua `/caminho/para/seu/volume` pelo diretório onde deseja armazenar os dados localmente.

Após essa configuração, reconecte-se ao banco conforme descrito no **passo 4**.

## 6. Utilizando Docker Compose
Uma forma prática de gerenciar containers é utilizando o **Docker Compose**, que permite definir serviços em um arquivo `docker-compose.yml`. Crie um arquivo `docker-compose.yml` com o seguinte conteúdo:

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:latest
    container_name: postgres_container
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    networks:
      - postgres_network

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin_container
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: postgres
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - postgres_network

networks:
  postgres_network:
    driver: bridge
```

Depois de salvar o arquivo, execute o seguinte comando para iniciar os serviços:

```bash
docker-compose up -d
```

Isso criará e iniciará os containers do **PostgreSQL** e **pgAdmin**. Para parar os serviços, utilize:

```bash
docker-compose down
```

## 7. Acessando o pgAdmin
Para acessar a interface gráfica do **pgAdmin**, abra o navegador e acesse:

👉 **http://localhost:5050**

Faça login com:
- **Email**: `admin@example.com`
- **Senha**: `postgres`

### Conectando ao PostgreSQL no pgAdmin
1. Após fazer login no pgAdmin, clique com o botão direito em **Servers** e selecione **Create > Server**.
2. Na aba **General**, escolha um nome para o servidor (exemplo: `PostgreSQL Local`).
3. Na aba **Connection**, preencha os seguintes dados:
   - **Host**: `postgres` (nome do serviço no `docker-compose.yml`)
   - **Porta**: `5432`
   - **Username**: `postgres`
   - **Password**: `postgres`
4. Clique em **Save** para finalizar a conexão.

Agora você pode gerenciar seu banco de dados diretamente pelo **pgAdmin**! 🎉

## Conclusão
Seguindo essas etapas, você terá um ambiente PostgreSQL funcional rodando em um container Docker, com a opção de gerenciá-lo via pgAdmin. Além disso, o uso do Docker Compose simplifica ainda mais o gerenciamento do banco de dados, garantindo uma configuração rápida e eficiente.

