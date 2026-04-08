# Meu Marido

Um aplicativo web moderno para conectar clientes a profissionais de serviços.

## Funcionalidades

- **Autenticação**: Login e cadastro para clientes e profissionais
- **Listagem de Profissionais**: Visualização de profissionais com filtros
- **Contratação de Serviços**: Sistema de agendamento e contratação
- **Dashboards**: Interfaces específicas para clientes e profissionais
- **Avaliações**: Sistema de feedback com estrelas
- **Design Responsivo**: Mobile-first com gradientes modernos

## Tecnologias

- React 18
- React Router DOM
- CSS3 com gradientes
- Local Storage para persistência (simulação)

## Estrutura do Banco de Dados

### Tabelas

1. **users**
   - id (SERIAL PRIMARY KEY)
   - name (VARCHAR)
   - email (VARCHAR UNIQUE)
   - password (VARCHAR)
   - user_type (VARCHAR: 'cliente' ou 'profissional')

2. **professionals**
   - id (SERIAL PRIMARY KEY)
   - user_id (INTEGER REFERENCES users)
   - service (VARCHAR)
   - description (TEXT)
   - average_price (DECIMAL)
   - photo_url (VARCHAR)
   - rating (DECIMAL)

3. **services**
   - id (SERIAL PRIMARY KEY)
   - client_id (INTEGER REFERENCES users)
   - professional_id (INTEGER REFERENCES professionals)
   - service_date (DATE)
   - description (TEXT)
   - status (VARCHAR: 'pendente', 'aceito', 'concluido', 'cancelado')

4. **reviews**
   - id (SERIAL PRIMARY KEY)
   - service_id (INTEGER REFERENCES services)
   - rating (INTEGER: 1-5)
   - comment (TEXT)

## Como Executar

1. Instalar dependências:
   ```bash
   npm install
   ```

2. Executar o projeto:
   ```bash
   npm run dev
   ```

3. Abrir http://localhost:5173 no navegador

## Telas do Aplicativo

1. **Home**: Listagem pública de profissionais
2. **Login**: Autenticação de usuários
3. **Cadastro**: Registro de novos usuários
4. **Dashboard Cliente**: Busca e contratação de profissionais
5. **Detalhes do Profissional**: Informações completas
6. **Contratação**: Agendamento de serviços
7. **Confirmação**: Feedback de sucesso
8. **Dashboard Profissional**: Gerenciamento de solicitações
9. **Perfil**: Edição de dados pessoais

## Fluxos

### Cliente
1. Visualizar profissionais na home
2. Fazer login/cadastro se necessário
3. Filtrar e selecionar profissional
4. Agendar serviço
5. Receber confirmação

### Profissional
1. Criar conta
2. Aparecer na listagem pública
3. Receber solicitações
4. Aceitar ou recusar serviços
5. Gerenciar perfil

## Dados Mockados

O aplicativo utiliza dados simulados armazenados em `src/data/mockData.js` para demonstração.

