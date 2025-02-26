# Sistema de Controle de Acesso e Pagamento em Refeitórios

## Descrição do Projeto
Este projeto consiste em um sistema de controle de acesso e pagamento para refeitórios, permitindo a automação do processo de validação de entrada e compra de refeições por meio de cartões RFID. O objetivo é proporcionar maior agilidade e segurança no gerenciamento de refeições em empresas, escolas e universidades.

O sistema será desenvolvido utilizando **Next.js (React)** para a interface do usuário e **Spring Boot (Java)** para o backend. O banco de dados utilizado será o **PostgreSQL**, rodando em um contêiner **Docker**.

## Funcionalidades Principais
- **Controle de Acesso:** Entrada no refeitório via cartão RFID.
- **Registro de Consumo:** Identificação de itens via código de barras ou balança integrada.
- **Pagamentos:** Uso de saldo pré-pago ou faturamento posterior.
- **Relatórios e Painel de Controle:** Monitoramento do consumo dos usuários.
- **Cadastro e Controle de Produtos:** Registro de itens disponíveis no refeitório.
- **Gestão de Usuários:** Controle de permissões e acesso ao sistema.

## Tecnologias Utilizadas
- **Frontend:** Next.js (React)
- **Backend:** Spring Boot (Java)
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker
- **Documentação da API:** Swagger
- **Controle de Versão:** Git
- **Testes Automatizados**

## Estrutura do Projeto
```
root/
│── les-app/        # Aplicação Next.js
│── les-api/         # API desenvolvida em Spring Boot
│── docker/          # Configuração de containers Docker
│── docs/            # Documentação do projeto
│── README.md        # Informações gerais do projeto
```

## Requisitos do Sistema
- Docker e Docker Compose instalados
- Node.js e npm/yarn para o frontend
- Java 17+ e Maven para o backend

## Como Executar o Projeto
### 1. Clonar o repositório
```bash
git clone https://github.com/seu-repositorio.git
cd seu-repositorio
```

### 2. Configurar e iniciar os containers Docker
```bash
docker-compose up -d
```

### 3. Iniciar o backend (Spring Boot)
```bash
cd les-api
mvn spring-boot:run
```

### 4. Iniciar o frontend (Next.js)
```bash
cd les-app
npm install  # ou yarn install
npm run dev  # ou yarn dev
```

## Contato
Para dúvidas ou sugestões, entre em contato com os desenvolvedores ou abra uma issue no repositório.

---

Este README fornece uma visão geral do projeto e instruções para configuração e execução. Caso precise de ajustes ou mais informações, estou à disposição!

