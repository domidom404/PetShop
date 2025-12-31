# Guia de Configuração Django + Vue.js

## Backend (Django)

### Instalação

1. **Criar virtual environment:**
   ```bash
   python -m venv venv
   ```

2. **Ativar virtual environment (Windows):**
   ```bash
   venv\Scripts\activate
   ```

3. **Instalar dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Executar migrações:**
   ```bash
   python manage.py migrate
   ```

5. **Criar superuser (admin):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Iniciar servidor Django:**
   ```bash
   python manage.py runserver
   ```

O servidor estará disponível em: `http://localhost:8000`
Admin: `http://localhost:8000/admin`
API: `http://localhost:8000/api/`

## Frontend (Vue.js)

### Instalar dependências:
```bash
npm install
```

### Executar em desenvolvimento:
```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:5173`

## APIs Disponíveis

### Medicamentos
- `GET /api/medicamentos/` - Listar todos
- `POST /api/medicamentos/` - Criar novo
- `GET /api/medicamentos/{id}/` - Obter um
- `PUT /api/medicamentos/{id}/` - Atualizar
- `DELETE /api/medicamentos/{id}/` - Deletar

### Vacinas
- `GET /api/vacinas/` - Listar todos
- `POST /api/vacinas/` - Criar novo
- `GET /api/vacinas/{id}/` - Obter um
- `PUT /api/vacinas/{id}/` - Atualizar
- `DELETE /api/vacinas/{id}/` - Deletar

### Agendamentos
- `GET /api/agendamentos/` - Listar todos
- `POST /api/agendamentos/` - Criar novo
- `GET /api/agendamentos/{id}/` - Obter um
- `PUT /api/agendamentos/{id}/` - Atualizar
- `DELETE /api/agendamentos/{id}/` - Deletar

## Estrutura de Dados

### Medicamento
```json
{
  "id": 1,
  "nome": "Antibiótico X",
  "descricao": "Descrição do medicamento",
  "preco": 99.90,
  "estoque": 50
}
```

### Vacina
```json
{
  "id": 1,
  "nome": "Vacina Raiva",
  "descricao": "Vacina contra raiva",
  "preco": 150.00,
  "fabricante": "Fabricante Y"
}
```

### Agendamento
```json
{
  "id": 1,
  "nome_cliente": "João Silva",
  "email": "joao@example.com",
  "telefone": "11999999999",
  "tipo_servico": "Consulta",
  "data_agendamento": "2025-12-01T10:00:00",
  "status": "pendente",
  "observacoes": "Observações opcionais"
}
```

## Usando o serviço API no Frontend

```typescript
import { medicamentosAPI, vacinasAPI, agendamentosAPI } from '@/services/api'

// Listar medicamentos
const medicamentos = await medicamentosAPI.listar()

// Criar novo
const novo = await medicamentosAPI.criar({
  nome: 'Novo medicamento',
  descricao: 'Descrição',
  preco: 100,
  estoque: 10
})

// Atualizar
await medicamentosAPI.atualizar(1, { ...medicamento })

// Deletar
await medicamentosAPI.deletar(1)
```

## Desenvolvimento

O Vite está configurado com proxy para `/api`, então no frontend você pode usar:
```typescript
fetch('/api/medicamentos/')
```

Isso será automaticamente redirecionado para `http://localhost:8000/api/medicamentos/`
