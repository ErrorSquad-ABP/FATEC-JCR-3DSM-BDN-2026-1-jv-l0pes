# BDN — Documento ABP — Sistema de Gestão de Leads

**Disciplina:** Banco de Dados Não Relacional  
**Professora:** Lucineide  
**Tema:** 1000 Valle Multimarcas  
**Grupo:** ErrorSquad-ABP  
**Database:** `valle_leads`

---

## 1. Contextualização

A 1000 Valle Multimarcas é uma revendedora de veículos com múltiplas unidades. O processo comercial inicia com a geração de um **lead** — potencial cliente interessado em automóvel — por canais como visita presencial, telefone, WhatsApp, Instagram e formulários digitais.

Após o registro, o sistema deve:

- Associar o cliente ao lead
- Vincular o lead a uma loja e a um atendente
- Permitir a evolução da negociação
- Registrar mudanças de status e estágio
- Gerar indicadores para análise gerencial

---

## 2. Estrutura do banco

### 2.1 Coleções obrigatórias

| Coleção | Responsabilidade | Volume mínimo |
|---------|------------------|---------------|
| `lojas` | Unidades físicas da rede | 3 |
| `usuarios` | Atendentes, gerentes e admin | 5 |
| `clientes` | Cadastro de interessados | 5 |
| `leads` | Oportunidades comerciais | 10 |
| `negociacoes` | Processo comercial por lead | 10 |
| `logs` | Auditoria de operações | 10 |

### 2.2 Diagrama de relações

```mermaid
flowchart LR
    Clientes[(clientes)]
    Lojas[(lojas)]
    Usuarios[(usuarios)]
    Leads[(leads)]
    Negociacoes[(negociacoes)]
    Logs[(logs)]

    Leads -->|clienteId| Clientes
    Leads -->|lojaId| Lojas
    Leads -->|atendenteId| Usuarios
    Negociacoes -->|leadId| Leads
    Negociacoes -->|historico[]| Negociacoes
    Logs -->|leadId| Leads
    Logs -->|usuarioId| Usuarios
```

### 2.3 Modelagem — Embedding vs Referencing

| Padrão | Onde | Por quê |
|--------|------|---------|
| **Referencing** | `leads → clientes, usuarios, lojas` | Entidades reutilizadas; evita redundância |
| **Referencing** | `negociacoes → leads` | Uma negociação por lead; histórico de encerradas |
| **Referencing** | `logs → leads, usuarios` | Auditoria sem duplicar cadastro |
| **Embedding** | `negociacoes.historico[]` | Lido sempre junto; eventos sequenciais do funil |

Detalhes em [justificativas.md](./justificativas.md).

---

## 3. Script MongoDB

O script completo (índices, inserts, regras de negócio) está em:

**[script-mongodb.js](./script-mongodb.js)**

Resumo do que o script faz:

1. Seleciona o database `valle_leads`
2. Cria índices (incluindo índice único parcial para negociação ativa)
3. Insere 3 lojas, 5 usuários, 5 clientes, 10 leads, 10 negociações e 10 logs

Para executar: abra o MongoDB Compass → aba **Mongosh** → cole o conteúdo do arquivo.

---

## 4. Regras de negócio

| Regra | Como foi atendida |
|-------|-------------------|
| Lead vinculado a cliente | `leads.clienteId` referencia `clientes._id` |
| Lead vinculado a loja e atendente | `leads.lojaId` e `leads.atendenteId` |
| Apenas uma negociação ativa por lead | `negociacoes.ativo: true` + índice único parcial |
| Histórico de negociação | Array `negociacoes.historico` (embedding) |
| Controle de status e estágio | `leads.status` + `negociacoes.estagioAtual` |

---

## 5. Consultas obrigatórias

Documentação completa em [consultas-e-aggregations.md](./consultas-e-aggregations.md).

| Operador / recurso | Consulta |
|--------------------|----------|
| `$and` + `$or` | Leads novos/em atendimento de WhatsApp ou Instagram |
| `$gt` + `$lt` | Negociações com valor entre 30k e 120k |
| `$exists` | Clientes com e-mail preenchido |
| Projeção | Campos selecionados de leads |
| `sort` | Ordenação por `createdAt` decrescente |
| `skip` + `limit` | Paginação de leads (5 por página) |

---

## 6. Aggregations — Dashboard

| Indicador | Pipeline |
|-----------|----------|
| Leads por origem | `$match` → `$group` → `$project` → `$sort` |
| Leads por status | `$match` → `$group` → `$project` → `$sort` |
| Taxa de conversão | `$group` com `$cond` → `$project` com percentual |
| Leads por atendente | `$match` → `$group` → `$project` → `$sort` |
| Leads por importância | `$match` → `$group` → `$project` → `$sort` |

Complementares com `$lookup`: valor proposto por loja, conversão por loja, média de valor por status.

---

## 7. Justificativas

Respostas obrigatórias do enunciado:

- **Embedding:** `negociacoes.historico` — histórico lido junto com a negociação
- **Referencing:** leads → clientes/usuarios/lojas; negociacoes → leads; logs → leads/usuarios
- **Vantagens não relacionais:** schema flexível, escrita rápida de eventos, aggregations nativas, aderência ao funil comercial

Ver [justificativas.md](./justificativas.md).

---

## 8. Evidências (prints)

Os prints de tela inteira das execuções no MongoDB Compass estão nos PDFs por dia de aula:

| Dia | Conteúdo | PDF |
|-----|----------|-----|
| 1 | Leitura do problema e coleções | [dia1-leitura-problema-colecoes.pdf](../docs/entregas/PDFs/dia1-leitura-problema-colecoes.pdf) |
| 2 | Modelagem embedding vs referencing | [dia2-modelagem-mongodb-embedding-referencing.pdf](../docs/entregas/PDFs/dia2-modelagem-mongodb-embedding-referencing.pdf) |
| 3 | Inserção de dados e consultas | [dia3-inserção-de-dados-e-consultas.pdf](../docs/entregas/PDFs/dia3–inserção-de-dados-e-consultas.pdf) |
| 4 | Aggregations e finalização | [dia4_aggregations_finalizacao.pdf](../docs/entregas/PDFs/dia4_aggregations_finalizacao.pdf) |

Documentação markdown detalhada por dia:

- [Dia 1 — Coleções](../docs/entregas/diagramas/01-dia1-leitura-problema-e-colecoes.md)
- [Dia 2 — Modelagem](../docs/entregas/diagramas/02-dia2-modelagem-mongodb-embedding-vs-referencing.md)
- [Dia 3 — Dados e consultas](../docs/entregas/diagramas/03-dia3-insercao-dados-consultas.md)
- [Dia 4 — Aggregations](../docs/entregas/diagramas/04-dia4-aggregations-finalizacao.md)

---

## 9. Checklist de entrega

- [x] Script MongoDB completo → `script-mongodb.js`
- [x] Prints de tela inteira → PDFs em `docs/entregas/PDFs/`
- [x] Documento com justificativas → `justificativas.md`
- [x] Consultas obrigatórias → `consultas-e-aggregations.md`
- [x] Aggregations de dashboard → `consultas-e-aggregations.md`
- [x] Coleções com volume mínimo → script com 3/5/5/10/10/10
- [ ] PDF consolidado `BDN-Documento-ABP.pdf` (gerar a partir deste .md ou dos PDFs existentes)
- [ ] Commit no GitHub + link no Kanban da professora

---

## 10. Arquivos desta pasta

| Arquivo | Descrição |
|---------|-----------|
| [BDN-Documento-ABP.md](./BDN-Documento-ABP.md) | Este documento (índice principal) |
| [script-mongodb.js](./script-mongodb.js) | Script executável completo |
| [justificativas.md](./justificativas.md) | Embedding, referencing e vantagens |
| [consultas-e-aggregations.md](./consultas-e-aggregations.md) | Consultas e pipelines |
| [modelagem.md](./modelagem.md) | Estrutura das coleções e campos |
