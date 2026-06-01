# Requisitos-ABP — Entrega da Atividade

Sistema de Gestão de Leads — **1000 Valle Multimarcas**  
Disciplina: Banco de Dados Não Relacional (MongoDB)

---

## Documentação principal

| Arquivo | Descrição |
|---------|-----------|
| [BDN-Documento-ABP.md](./BDN-Documento-ABP.md) | Documento consolidado da entrega |
| [script-mongodb.js](./script-mongodb.js) | Script MongoDB completo (executável) |
| [modelagem.md](./modelagem.md) | Estrutura das coleções e campos |
| [justificativas.md](./justificativas.md) | Embedding, referencing e vantagens |
| [consultas-e-aggregations.md](./consultas-e-aggregations.md) | Consultas e pipelines de dashboard |

---

## PDFs com prints (evidências)

Os prints de tela inteira estão nos PDFs por dia:

- [Dia 1 — Coleções](../docs/entregas/PDFs/dia1-leitura-problema-colecoes.pdf)
- [Dia 2 — Modelagem](../docs/entregas/PDFs/dia2-modelagem-mongodb-embedding-referencing.pdf)
- [Dia 3 — Dados e consultas](../docs/entregas/PDFs/dia3–inserção-de-dados-e-consultas.pdf)
- [Dia 4 — Aggregations](../docs/entregas/PDFs/dia4_aggregations_finalizacao.pdf)

---

## Checklist de entrega

### Conteúdo técnico

- [x] Script MongoDB completo
- [x] Prints de tela inteira (PDFs por dia)
- [x] Documento com justificativas
- [x] Coleções: `clientes`, `leads`, `usuarios`, `negociacoes`, `logs`, `lojas`
- [x] Volume mínimo: 5/10/5/10/10/3
- [x] Consultas: `$and`, `$or`, `$gt`, `$lt`, `$exists`, projeção, sort, skip/limit
- [x] Aggregations: leads por origem, status, conversão, atendente, importância

### Regras de negócio

- [x] Lead vinculado a cliente, loja e atendente
- [x] Apenas uma negociação ativa por lead
- [x] Histórico de negociação (embedding)
- [x] Controle de status e estágio

### Publicação

- [ ] Gerar `BDN-Documento-ABP.pdf` (opcional — PDFs por dia já existem)
- [ ] Commit dos arquivos neste repositório
- [ ] Link do PDF no card **BDN-Entrega do Documento** (Kanban da professora)
- [ ] Mover card para **Entregue** no Kanban do grupo

---

## Como executar o script

1. Abra o **MongoDB Compass**
2. Conecte ao cluster/local
3. Aba **Mongosh**
4. Cole o conteúdo de [script-mongodb.js](./script-mongodb.js)
5. Execute as consultas de [consultas-e-aggregations.md](./consultas-e-aggregations.md)

---

## Estrutura do repositório

```
Requisitos-ABP/
├── README.md                      ← este arquivo
├── BDN-Documento-ABP.md           ← documento principal
├── script-mongodb.js              ← script completo
├── modelagem.md                   ← coleções e campos
├── justificativas.md              ← decisões de modelagem
└── consultas-e-aggregations.md    ← consultas e dashboard

docs/entregas/PDFs/                ← prints por dia de aula
documentacao/                      ← C4, docs complementares
```
