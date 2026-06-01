// BDN 2026/1 - 1000 Valle Multimarcas - Script MongoDB completo
// Executar no MongoDB Shell ou MongoDB Compass (aba Mongosh)

use("valle_leads");

// ---------------------------------------------------------------------------
// 0) Limpeza opcional (descomente se for reexecutar do zero)
// ---------------------------------------------------------------------------
// db.lojas.deleteMany({});
// db.usuarios.deleteMany({});
// db.clientes.deleteMany({});
// db.leads.deleteMany({});
// db.negociacoes.deleteMany({});
// db.logs.deleteMany({});

// ---------------------------------------------------------------------------
// 1) Índices
// ---------------------------------------------------------------------------
db.leads.createIndex({ clienteId: 1 });
db.leads.createIndex({ lojaId: 1 });
db.leads.createIndex({ atendenteId: 1 });
db.leads.createIndex({ status: 1, createdAt: -1 });
db.leads.createIndex({ createdAt: -1 });

db.negociacoes.createIndex({ leadId: 1 });
db.negociacoes.createIndex(
  { leadId: 1 },
  { unique: true, partialFilterExpression: { ativo: true } }
);

db.logs.createIndex({ referenciaId: 1, createdAt: -1 });
db.logs.createIndex({ usuarioId: 1, createdAt: -1 });

// ---------------------------------------------------------------------------
// 2) Inserção - lojas (3)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// 3) Inserção - usuarios (5)
// ---------------------------------------------------------------------------
db.usuarios.insertMany([
  {
    _id: ObjectId("650000000000000000000011"),
    nome: "Marcos Silva",
    cargo: "Atendente",
    perfil: "atendente",
    area: "Vendas",
    email: "marcos.silva@1000valle.com",
    telefone: "11 99999-0001",
    ativo: true,
    createdAt: new Date("2026-05-18T09:30:00Z")
  },
  {
    _id: ObjectId("650000000000000000000012"),
    nome: "Ana Costa",
    cargo: "Gerente Comercial",
    perfil: "gerente",
    area: "Vendas",
    email: "ana.costa@1000valle.com",
    telefone: "11 99999-0002",
    ativo: true,
    createdAt: new Date("2026-05-18T09:35:00Z")
  },
  {
    _id: ObjectId("650000000000000000000013"),
    nome: "Juliana Ramos",
    cargo: "Atendente",
    perfil: "atendente",
    area: "Vendas",
    email: "juliana.ramos@1000valle.com",
    telefone: "11 99999-0003",
    ativo: true,
    createdAt: new Date("2026-05-18T09:40:00Z")
  },
  {
    _id: ObjectId("650000000000000000000014"),
    nome: "Pedro Almeida",
    cargo: "Atendente",
    perfil: "atendente",
    area: "Vendas",
    email: "pedro.almeida@1000valle.com",
    telefone: "11 99999-0004",
    ativo: true,
    createdAt: new Date("2026-05-18T09:45:00Z")
  },
  {
    _id: ObjectId("650000000000000000000015"),
    nome: "Carla Souza",
    cargo: "Admin",
    perfil: "admin",
    area: "TI",
    email: "carla.souza@1000valle.com",
    telefone: "11 99999-0005",
    ativo: true,
    createdAt: new Date("2026-05-18T09:50:00Z")
  }
]);

// ---------------------------------------------------------------------------
// 4) Inserção - clientes (5)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// 5) Inserção - leads (10)
// ---------------------------------------------------------------------------
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
  },
  {
    _id: ObjectId("650000000000000000000036"),
    nomeLead: "Lead Alice - pickup",
    clienteId: ObjectId("650000000000000000000021"),
    lojaId: ObjectId("650000000000000000000003"),
    atendenteId: ObjectId("650000000000000000000014"),
    origem: "whatsapp",
    status: "novo",
    importancia: "alta",
    createdAt: new Date("2026-05-18T11:00:00Z")
  },
  {
    _id: ObjectId("650000000000000000000037"),
    nomeLead: "Lead Bruno - SUV premium",
    clienteId: ObjectId("650000000000000000000022"),
    lojaId: ObjectId("650000000000000000000001"),
    atendenteId: ObjectId("650000000000000000000011"),
    origem: "telefone",
    status: "em_atendimento",
    importancia: "media",
    createdAt: new Date("2026-05-18T11:05:00Z")
  },
  {
    _id: ObjectId("650000000000000000000038"),
    nomeLead: "Lead Camila - compacto",
    clienteId: ObjectId("650000000000000000000023"),
    lojaId: ObjectId("650000000000000000000002"),
    atendenteId: ObjectId("650000000000000000000013"),
    origem: "instagram",
    status: "convertido",
    importancia: "alta",
    createdAt: new Date("2026-05-18T11:10:00Z")
  },
  {
    _id: ObjectId("650000000000000000000039"),
    nomeLead: "Lead Diego - utilitário",
    clienteId: ObjectId("650000000000000000000024"),
    lojaId: ObjectId("650000000000000000000001"),
    atendenteId: ObjectId("650000000000000000000014"),
    origem: "formulario",
    status: "perdido",
    importancia: "baixa",
    createdAt: new Date("2026-05-18T11:15:00Z")
  },
  {
    _id: ObjectId("650000000000000000000040"),
    nomeLead: "Lead Elisa - híbrido",
    clienteId: ObjectId("650000000000000000000025"),
    lojaId: ObjectId("650000000000000000000003"),
    atendenteId: ObjectId("650000000000000000000011"),
    origem: "presencial",
    status: "novo",
    importancia: "media",
    createdAt: new Date("2026-05-18T11:20:00Z")
  }
]);

// ---------------------------------------------------------------------------
// 6) Inserção - negociacoes (10) — uma por lead, apenas uma ativa por lead
// ---------------------------------------------------------------------------
db.negociacoes.insertMany([
  {
    _id: ObjectId("650000000000000000000051"),
    leadId: ObjectId("650000000000000000000031"),
    status: "aberta",
    estagioAtual: "qualificacao",
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
    estagioAtual: "proposta",
    valorProposto: 52000,
    valorFinal: null,
    ativo: true,
    historico: [
      { data: new Date("2026-05-18T11:25:00Z"), etapa: "primeira proposta", observacao: "Negociação em andamento" },
      { data: new Date("2026-05-18T12:00:00Z"), etapa: "contraproposta", observacao: "Cliente pediu desconto" }
    ],
    createdAt: new Date("2026-05-18T11:25:00Z")
  },
  {
    _id: ObjectId("650000000000000000000053"),
    leadId: ObjectId("650000000000000000000033"),
    status: "em_negociacao",
    estagioAtual: "proposta",
    valorProposto: 38000,
    valorFinal: null,
    ativo: true,
    historico: [
      { data: new Date("2026-05-18T11:30:00Z"), etapa: "contato telefônico", observacao: "Cliente interessado em hatch" }
    ],
    createdAt: new Date("2026-05-18T11:30:00Z")
  },
  {
    _id: ObjectId("650000000000000000000054"),
    leadId: ObjectId("650000000000000000000034"),
    status: "convertido",
    estagioAtual: "fechamento",
    valorProposto: 78000,
    valorFinal: 76500,
    ativo: false,
    historico: [
      { data: new Date("2026-05-18T11:35:00Z"), etapa: "abertura", observacao: "Visita presencial" },
      { data: new Date("2026-05-18T14:00:00Z"), etapa: "fechamento", observacao: "Venda concluída com troca" }
    ],
    createdAt: new Date("2026-05-18T11:35:00Z")
  },
  {
    _id: ObjectId("650000000000000000000055"),
    leadId: ObjectId("650000000000000000000035"),
    status: "perdido",
    estagioAtual: "desistencia",
    valorProposto: 95000,
    valorFinal: null,
    ativo: false,
    historico: [
      { data: new Date("2026-05-18T11:40:00Z"), etapa: "proposta", observacao: "Proposta enviada" },
      { data: new Date("2026-05-18T16:00:00Z"), etapa: "desistencia", observacao: "Cliente comprou em concorrente" }
    ],
    createdAt: new Date("2026-05-18T11:40:00Z")
  },
  {
    _id: ObjectId("650000000000000000000056"),
    leadId: ObjectId("650000000000000000000036"),
    status: "aberta",
    estagioAtual: "qualificacao",
    valorProposto: 89000,
    valorFinal: null,
    ativo: true,
    historico: [
      { data: new Date("2026-05-18T11:45:00Z"), etapa: "abertura", observacao: "Segundo interesse da Alice" }
    ],
    createdAt: new Date("2026-05-18T11:45:00Z")
  },
  {
    _id: ObjectId("650000000000000000000057"),
    leadId: ObjectId("650000000000000000000037"),
    status: "em_negociacao",
    estagioAtual: "proposta",
    valorProposto: 110000,
    valorFinal: null,
    ativo: true,
    historico: [
      { data: new Date("2026-05-18T11:50:00Z"), etapa: "contato", observacao: "Cliente retornou ligação" }
    ],
    createdAt: new Date("2026-05-18T11:50:00Z")
  },
  {
    _id: ObjectId("650000000000000000000058"),
    leadId: ObjectId("650000000000000000000038"),
    status: "convertido",
    estagioAtual: "fechamento",
    valorProposto: 42000,
    valorFinal: 41500,
    ativo: false,
    historico: [
      { data: new Date("2026-05-18T11:55:00Z"), etapa: "abertura", observacao: "Lead via Instagram" },
      { data: new Date("2026-05-18T15:00:00Z"), etapa: "fechamento", observacao: "Financiamento aprovado" }
    ],
    createdAt: new Date("2026-05-18T11:55:00Z")
  },
  {
    _id: ObjectId("650000000000000000000059"),
    leadId: ObjectId("650000000000000000000039"),
    status: "perdido",
    estagioAtual: "desistencia",
    valorProposto: 55000,
    valorFinal: null,
    ativo: false,
    historico: [
      { data: new Date("2026-05-18T12:00:00Z"), etapa: "proposta", observacao: "Formulário digital" },
      { data: new Date("2026-05-18T17:00:00Z"), etapa: "desistencia", observacao: "Sem retorno do cliente" }
    ],
    createdAt: new Date("2026-05-18T12:00:00Z")
  },
  {
    _id: ObjectId("650000000000000000000060"),
    leadId: ObjectId("650000000000000000000040"),
    status: "aberta",
    estagioAtual: "qualificacao",
    valorProposto: 72000,
    valorFinal: null,
    ativo: true,
    historico: [
      { data: new Date("2026-05-18T12:05:00Z"), etapa: "abertura", observacao: "Visita presencial - interesse em híbrido" }
    ],
    createdAt: new Date("2026-05-18T12:05:00Z")
  }
]);

// ---------------------------------------------------------------------------
// 7) Inserção - logs (10)
// ---------------------------------------------------------------------------
db.logs.insertMany([
  {
    _id: ObjectId("650000000000000000000071"),
    entidade: "lead",
    operacao: "criacao",
    usuarioId: ObjectId("650000000000000000000011"),
    leadId: ObjectId("650000000000000000000031"),
    referenciaId: ObjectId("650000000000000000000031"),
    descricao: "Lead criado via WhatsApp",
    createdAt: new Date("2026-05-18T11:21:00Z")
  },
  {
    _id: ObjectId("650000000000000000000072"),
    entidade: "lead",
    operacao: "atualizacao",
    usuarioId: ObjectId("650000000000000000000013"),
    leadId: ObjectId("650000000000000000000032"),
    referenciaId: ObjectId("650000000000000000000032"),
    descricao: "Status alterado para em_atendimento",
    createdAt: new Date("2026-05-18T11:26:00Z")
  },
  {
    _id: ObjectId("650000000000000000000073"),
    entidade: "negociacao",
    operacao: "criacao",
    usuarioId: ObjectId("650000000000000000000014"),
    leadId: ObjectId("650000000000000000000033"),
    referenciaId: ObjectId("650000000000000000000053"),
    descricao: "Negociação aberta para lead hatch",
    createdAt: new Date("2026-05-18T11:31:00Z")
  },
  {
    _id: ObjectId("650000000000000000000074"),
    entidade: "negociacao",
    operacao: "atualizacao",
    usuarioId: ObjectId("650000000000000000000011"),
    leadId: ObjectId("650000000000000000000034"),
    referenciaId: ObjectId("650000000000000000000054"),
    descricao: "Negociação convertida - venda com troca",
    createdAt: new Date("2026-05-18T14:01:00Z")
  },
  {
    _id: ObjectId("650000000000000000000075"),
    entidade: "lead",
    operacao: "atualizacao",
    usuarioId: ObjectId("650000000000000000000013"),
    leadId: ObjectId("650000000000000000000035"),
    referenciaId: ObjectId("650000000000000000000035"),
    descricao: "Lead marcado como perdido",
    createdAt: new Date("2026-05-18T16:01:00Z")
  },
  {
    _id: ObjectId("650000000000000000000076"),
    entidade: "lead",
    operacao: "criacao",
    usuarioId: ObjectId("650000000000000000000014"),
    leadId: ObjectId("650000000000000000000036"),
    referenciaId: ObjectId("650000000000000000000036"),
    descricao: "Segundo lead da Alice - pickup",
    createdAt: new Date("2026-05-18T11:01:00Z")
  },
  {
    _id: ObjectId("650000000000000000000077"),
    entidade: "negociacao",
    operacao: "atualizacao",
    usuarioId: ObjectId("650000000000000000000011"),
    leadId: ObjectId("650000000000000000000037"),
    referenciaId: ObjectId("650000000000000000000057"),
    descricao: "Contraproposta registrada no histórico",
    createdAt: new Date("2026-05-18T12:01:00Z")
  },
  {
    _id: ObjectId("650000000000000000000078"),
    entidade: "negociacao",
    operacao: "atualizacao",
    usuarioId: ObjectId("650000000000000000000013"),
    leadId: ObjectId("650000000000000000000038"),
    referenciaId: ObjectId("650000000000000000000058"),
    descricao: "Negociação convertida - financiamento aprovado",
    createdAt: new Date("2026-05-18T15:01:00Z")
  },
  {
    _id: ObjectId("650000000000000000000079"),
    entidade: "lead",
    operacao: "atualizacao",
    usuarioId: ObjectId("650000000000000000000014"),
    leadId: ObjectId("650000000000000000000039"),
    referenciaId: ObjectId("650000000000000000000039"),
    descricao: "Lead perdido - sem retorno",
    createdAt: new Date("2026-05-18T17:01:00Z")
  },
  {
    _id: ObjectId("650000000000000000000080"),
    entidade: "lead",
    operacao: "criacao",
    usuarioId: ObjectId("650000000000000000000011"),
    leadId: ObjectId("650000000000000000000040"),
    referenciaId: ObjectId("650000000000000000000040"),
    descricao: "Lead criado em visita presencial",
    createdAt: new Date("2026-05-18T11:21:00Z")
  }
]);
