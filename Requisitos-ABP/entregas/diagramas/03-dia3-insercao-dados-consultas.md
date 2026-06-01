# Dia 3 (18/05/26) - Inserção de Dados e Consultas

## 1) Objetivo do dia

Este documento descreve os comandos executados no MongoDB Compass para atender os requisitos de entrega do Dia 3:

- inserção dos dados nas coleções obrigatórias;
- aplicação das regras de negócio do modelo;
- execução das consultas obrigatórias;
- geração de indicadores com aggregations.

A estrutura segue o padrão dos documentos anteriores, com explicações, comandos e evidências em imagens.

## 2) Inserção de dados

Nesta etapa foram populadas as coleções obrigatórias do projeto:

- `lojas`
- `usuarios`
- `clientes`
- `leads`
- `negociacoes`
- `logs`

Os comandos usados seguem a modelagem definida nos dias anteriores: referências entre entidades reutilizáveis e embedding de histórico de negociação.

### 2.1) Inserção em `lojas`

O comando insere três lojas da 1000 Valle Multimarcas, garantindo que as referências de cada lead sejam feitas por `lojaId`.

```javascript
db.lojas.insertMany([
  {
    _id: ObjectId("650000000000000000000001"),
    nome: "1000 Valle Centro",
    endereco: "Av. Brasil, 1234",
    telefone: "11 4002-8922",
    createdAt: new Date("2026-05-18T09:00:00Z")
  },
  {
    _id: ObjectId("650000000000000000000002"),
    nome: "1000 Valle Norte",
    endereco: "Rua das Palmeiras, 432",
    telefone: "11 4002-8923",
    createdAt: new Date("2026-05-18T09:10:00Z")
  },
  {
    _id: ObjectId("650000000000000000000003"),
    nome: "1000 Valle Sul",
    endereco: "Av. das Nações, 987",
    telefone: "11 4002-8924",
    createdAt: new Date("2026-05-18T09:20:00Z")
  }
]);
```

Este comando garante o cadastro das unidades físicas da empresa e permite relacionar leads e vendas a cada loja.

![Inserção de lojas](../PDFs/dia3/loja.png)

### 2.2) Inserção em `usuarios`

Aqui são criados atendentes, gerente comercial e administrador. O campo `perfil` identifica o papel de cada usuário.

```javascript
db.usuarios.insertMany([
  {
    _id: ObjectId("650000000000000000000011"),
    nome: "Marcos Silva",
    cargo: "Atendente",
    area: "Vendas",
    email: "marcos.silva@1000valle.com",
    telefone: "11 99999-0001",
    createdAt: new Date("2026-05-18T09:30:00Z")
  },
  {
    _id: ObjectId("650000000000000000000012"),
    nome: "Ana Costa",
    cargo: "Gerente Comercial",
    area: "Vendas",
    email: "ana.costa@1000valle.com",
    telefone: "11 99999-0002",
    createdAt: new Date("2026-05-18T09:35:00Z")
  },
  {
    _id: ObjectId("650000000000000000000013"),
    nome: "Juliana Ramos",
    cargo: "Atendente",
    area: "Vendas",
    email: "juliana.ramos@1000valle.com",
    telefone: "11 99999-0003",
    createdAt: new Date("2026-05-18T09:40:00Z")
  },
  {
    _id: ObjectId("650000000000000000000014"),
    nome: "Pedro Almeida",
    cargo: "Atendente",
    area: "Vendas",
    email: "pedro.almeida@1000valle.com",
    telefone: "11 99999-0004",
    createdAt: new Date("2026-05-18T09:45:00Z")
  },
  {
    _id: ObjectId("650000000000000000000015"),
    nome: "Carla Souza",
    cargo: "Admin",
    area: "TI",
    email: "carla.souza@1000valle.com",
    telefone: "11 99999-0005",
    createdAt: new Date("2026-05-18T09:50:00Z")
  }
]);
```

Os usuários cadastrados suportam o fluxo comercial e a auditoria das ações em `logs`.

![Inserção de usuários](../PDFs/dia3/usuario.png)

### 2.3) Inserção em `clientes`

A coleção `clientes` armazena os dados dos interessados, permitindo o vínculo entre lead e cliente.

```javascript
db.clientes.insertMany([
  {
    _id: ObjectId("650000000000000000000021"),
    nome: "Alice Fernandes",
    cpf: "111.111.111-11",
    telefone: "11 98888-1111",
    email: "alice.fernandes@gmail.com",
    createdAt: new Date("2026-05-18T10:00:00Z")
  },
  {
    _id: ObjectId("650000000000000000000022"),
    nome: "Bruno Lima",
    cpf: "222.222.222-22",
    telefone: "11 98888-2222",
    email: "bruno.lima@gmail.com",
    createdAt: new Date("2026-05-18T10:05:00Z")
  },
  {
    _id: ObjectId("650000000000000000000023"),
    nome: "Camila Sousa",
    cpf: "333.333.333-33",
    telefone: "11 98888-3333",
    email: "camila.sousa@gmail.com",
    createdAt: new Date("2026-05-18T10:10:00Z")
  },
  {
    _id: ObjectId("650000000000000000000024"),
    nome: "Diego Pereira",
    cpf: "444.444.444-44",
    telefone: "11 98888-4444",
    email: "diego.pereira@gmail.com",
    createdAt: new Date("2026-05-18T10:15:00Z")
  },
  {
    _id: ObjectId("650000000000000000000025"),
    nome: "Elisa Martins",
    cpf: "555.555.555-55",
    telefone: "11 98888-5555",
    email: "elisa.martins@gmail.com",
    createdAt: new Date("2026-05-18T10:20:00Z")
  }
]);
```

Os dados de clientes permitem que cada lead esteja corretamente vinculado a uma pessoa real.

![Inserção de clientes](../PDFs/dia3/cliente.png)

### 2.4) Inserção em `leads`

A coleção `leads` representa as oportunidades comerciais. Cada documento referencia `clienteId`, `lojaId` e `atendenteId`.

```javascript
db.leads.insertMany([
  {
    _id: ObjectId("650000000000000000000031"),
    nomeLead: "Lead Alice - SUV",
    clienteId: ObjectId("650000000000000000000021"),
    lojaId: ObjectId("650000000000000000000001"),
    atendenteId: ObjectId("650000000000000000000011"),
    origem: "whatsapp",
    status: "novo",
    importancia: "alta",
    createdAt: new Date("2026-05-18T10:30:00Z")
  },
  {
    _id: ObjectId("650000000000000000000032"),
    nomeLead: "Lead Bruno - seminovo",
    clienteId: ObjectId("650000000000000000000022"),
    lojaId: ObjectId("650000000000000000000002"),
    atendenteId: ObjectId("650000000000000000000013"),
    origem: "instagram",
    status: "em_atendimento",
    importancia: "media",
    createdAt: new Date("2026-05-18T10:35:00Z")
  },
  {
    _id: ObjectId("650000000000000000000033"),
    nomeLead: "Lead Camila - hatch",
    clienteId: ObjectId("650000000000000000000023"),
    lojaId: ObjectId("650000000000000000000001"),
    atendenteId: ObjectId("650000000000000000000014"),
    origem: "telefone",
    status: "em_atendimento",
    importancia: "alta",
    createdAt: new Date("2026-05-18T10:40:00Z")
  },
  {
    _id: ObjectId("650000000000000000000034"),
    nomeLead: "Lead Diego - troca",
    clienteId: ObjectId("650000000000000000000024"),
    lojaId: ObjectId("650000000000000000000003"),
    atendenteId: ObjectId("650000000000000000000011"),
    origem: "presencial",
    status: "convertido",
    importancia: "media",
    createdAt: new Date("2026-05-18T10:45:00Z")
  },
  {
    _id: ObjectId("650000000000000000000035"),
    nomeLead: "Lead Elisa - executivo",
    clienteId: ObjectId("650000000000000000000025"),
    lojaId: ObjectId("650000000000000000000002"),
    atendenteId: ObjectId("650000000000000000000013"),
    origem: "formulario",
    status: "perdido",
    importancia: "baixa",
    createdAt: new Date("2026-05-18T10:50:00Z")
  }
]);
```

A modelagem garante:

- cada lead é vinculado a um cliente;
- cada lead é vinculado a uma loja e a um atendente;
- o campo `status` controla o fluxo comercial.

![Inserção de leads](../PDFs/dia3/lead.png)

### 2.5) Inserção em `negociacoes`

A coleção `negociacoes` registra o andamento de cada oportunidade, com apenas uma negociação ativa por lead e histórico embutido.

```javascript
db.negociacoes.insertMany([
  {
    _id: ObjectId("650000000000000000000051"),
    leadId: ObjectId("650000000000000000000031"),
    status: "aberta",
    valorProposto: 45000,
    valorFinal: null,
    ativo: true,
    historico: [
      { data: new Date("2026-05-18T11:20:00Z"), etapa: "abertura", observacao: "Lead entrou pelo WhatsApp" }
    ],
    createdAt: new Date("2026-05-18T11:20:00Z")
  },
  {
    _id: ObjectId("650000000000000000000052"),
    leadId: ObjectId("650000000000000000000032"),
    status: "em_negociacao",
    valorProposto: 52000,
    valorFinal: null,
    ativo: true,
    historico: [
      { data: new Date("2026-05-18T11:25:00Z"), etapa: "primeira proposta", observacao: "Negociação em andamento" }
    ],
    createdAt: new Date("2026-05-18T11:25:00Z")
  }
]);
```

O histórico de negociações está embutido no documento, o que facilita consultas operacionais sobre a evolução do processo.

![Inserção de negociações](../PDFs/dia3/negociacoes.png)

### 2.6) Inserção em `logs`

Os logs documentam ações de criação e atualização de leads e negociações.

```javascript
db.logs.insertMany([
  {
    _id: ObjectId("650000000000000000000071"),
    entidade: "lead",
    operacao: "criação",
    usuarioId: ObjectId("650000000000000000000011"),
    referenciaId: ObjectId("650000000000000000000031"),
    descricao: "Lead criado via WhatsApp",
    createdAt: new Date("2026-05-18T11:21:00Z")
  },
  {
    _id: ObjectId("650000000000000000000072"),
    entidade: "lead",
    operacao: "atualização",
    usuarioId: ObjectId("650000000000000000000013"),
    referenciaId: ObjectId("650000000000000000000032"),
    descricao: "Status alterado para em_atendimento",
    createdAt: new Date("2026-05-18T11:26:00Z")
  }
]);
```

Os logs permitem auditoria e rastreabilidade, confirmando cada operação realizada no sistema.

![Inserção de logs](../PDFs/dia3/logs.png)

## 3) Consultas obrigatórias

Nesta seção estão os comandos que comprovam os filtros e operações exigidos no requisito.

### 3.1) `$and` + `$or`

Esta consulta retorna leads com status `novo` ou `em_atendimento`, que vieram de `whatsapp` ou `instagram`.

```javascript
db.leads.find({
  $and: [
    { status: { $in: ["novo", "em_atendimento"] } },
    { $or: [{ origem: "whatsapp" }, { origem: "instagram" }] }
  ]
});
```

- o `$and` define condições simultâneas;
- o `$or` permite aceitar mais de uma origem;
- o `$in` filtra os statuses esperados.

![Consulta AND e OR](../PDFs/dia3/leads_find.png)

### 3.2) `$gt` + `$lt`

A consulta busca negociações com valor proposto entre 30.000 e 120.000.

```javascript
db.negociacoes.find({
  valorProposto: { $gt: 30000, $lt: 120000 }
});
```

- `$gt` retorna valores maiores que 30.000;
- `$lt` retorna valores menores que 120.000;
- juntos, definem um intervalo de valores.

![Consulta GT e LT](../PDFs/dia3/negociacoes_find.png)

### 3.3) `$exists`

A consulta valida que apenas clientes com email preenchido são retornados.

```javascript
db.clientes.find({
  email: { $exists: true, $ne: "" }
});
```

- `$exists: true` garante a presença do campo;
- `$ne: ""` evita valores vazios.

![Consulta EXISTS](../PDFs/dia3/cliente_find.png)

### 3.4) Projeção + ordenação

A consulta demonstra seleção de campos específicos e ordenação por data de criação.

```javascript
db.leads
  .find({}, { nomeLead: 1, status: 1, origem: 1, _id: 0 })
  .sort({ createdAt: -1 });
```

- a projeção limita os campos retornados;
- `sort({ createdAt: -1 })` ordena do mais recente ao mais antigo.

![Projeção e ordenação](../PDFs/dia3/leads_find_list.png)

### 3.5) Paginação

Esta consulta mostra como dividir os resultados em páginas de cinco documentos.

```javascript
db.leads
  .find({})
  .sort({ createdAt: -1 })
  .skip(0)
  .limit(5);
```

- `skip` define o deslocamento;
- `limit` define o tamanho da página;
- isso permite exibir resultados paginados em interfaces.

![Paginação](../PDFs/dia3/leads_find_list5.png)

## 4) Aggregations de dashboard

As consultas de aggregation geram indicadores gerenciais a partir dos leads cadastrados.

### 4.1) Leads por origem

```javascript
db.leads.aggregate([
  { $group: { _id: "$origem", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
```

Agrupa leads por canal de entrada e ordena pela quantidade.

![Leads por origem](../PDFs/dia3/leads_aggregate.png)

### 4.2) Leads por status

```javascript
db.leads.aggregate([
  { $group: { _id: "$status", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
```

Permite visualizar o estágio atual do funil comercial.

![Leads por status](../PDFs/dia3/lead_aggregate_status.png)

### 4.3) Taxa de conversão

```javascript
db.leads.aggregate([
  {
    $group: {
      _id: null,
      totalLeads: { $sum: 1 },
      totalConvertidos: {
        $sum: { $cond: [{ $eq: ["$status", "convertido"] }, 1, 0] }
      }
    }
  },
  {
    $project: {
      _id: 0,
      totalLeads: 1,
      totalConvertidos: 1,
      taxaConversaoPercentual: {
        $multiply: [{ $divide: ["$totalConvertidos", "$totalLeads"] }, 100]
      }
    }
  }
]);
```

Calcula a porcentagem de leads convertidos contra o total.

![Taxa de conversão](../PDFs/dia3/lead_aggregate_group.png)

### 4.4) Leads por atendente

```javascript
db.leads.aggregate([
  {
    $group: {
      _id: "$atendenteId",
      totalLeads: { $sum: 1 }
    }
  },
  { $sort: { totalLeads: -1 } }
]);
```

Mostra quais atendentes têm mais leads sob responsabilidade.

![Leads por atendente](../PDFs/dia3/leads_aggregate_atendente.png)

### 4.5) Leads por importância

```javascript
db.leads.aggregate([
  { $match: { importancia: { $exists: true } } },
  { $group: { _id: "$importancia", total: { $sum: 1 } } },
  { $project: { importancia: "$_id", total: 1, _id: 0 } },
  { $sort: { total: -1 } }
]);
```

Classifica leads por nível de importância, útil para priorização das ações.

![Leads por importância](../PDFs/dia3/leads_aggregate_importancia.png)

## 5) Conclusão

O Dia 3 conclui a entrega com:

- carga de dados mínima exigida nas coleções obrigatórias;
- cumprimento das regras de negócio do modelo;
- execução das consultas obrigatórias com filtros, projeção, ordenação e paginação;
- geração de indicadores com aggregations.

O documento segue o padrão do repositório, com explicações de comandos, justificativas e evidências visuais.
