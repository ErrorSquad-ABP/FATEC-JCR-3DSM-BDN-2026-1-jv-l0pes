// Banco de Dados Nao Relacional - Atividade ABP
// Tema: Sistema de Gestao de Leads - 1000 Valle Multimarcas

use("bdn_abp_1000valle");

// Colecoes obrigatorias
db.createCollection("clientes");
db.createCollection("usuarios");
db.createCollection("lojas");
db.createCollection("leads");
db.createCollection("negociacoes");
db.createCollection("logs");

// Indices principais
db.leads.createIndex({ clienteId: 1 });
db.leads.createIndex({ atendenteId: 1, lojaId: 1 });
db.leads.createIndex({ origem: 1, status: 1, createdAt: -1 });
db.negociacoes.createIndex(
  { leadId: 1, ativa: 1 },
  { unique: true, partialFilterExpression: { ativa: true } }
);
db.logs.createIndex({ leadId: 1, createdAt: -1 });

// Dados base (quantidade minima exigida)
db.lojas.insertMany([
  { nome: "1000 Valle Centro", cidade: "Jacarei", uf: "SP" },
  { nome: "1000 Valle Zona Sul", cidade: "Sao Jose dos Campos", uf: "SP" },
  { nome: "1000 Valle Litoral", cidade: "Caraguatatuba", uf: "SP" }
]);

db.usuarios.insertMany([
  { nome: "Joao Victor", perfil: "admin", ativo: true },
  { nome: "Leo", perfil: "gerente", ativo: true },
  { nome: "Felipe", perfil: "atendente", ativo: true },
  { nome: "Carlos", perfil: "atendente", ativo: true },
  { nome: "Caio", perfil: "atendente", ativo: true }
]);

// Observacao:
// completar inserts de clientes/leads/negociacoes/logs mantendo os minimos:
// 5 clientes, 10 leads, 10 negociacoes, 10 logs.

print("Script base criado com colecoes, indices e sementes iniciais.");

