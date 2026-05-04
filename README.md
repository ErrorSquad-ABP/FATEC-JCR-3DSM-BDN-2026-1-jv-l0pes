# FATEC - BDN 2026/1 - Sistema de Gestao de Leads (MongoDB)

Repositorio da atividade de Banco de Dados Nao Relacional (MongoDB), tema **1000 Valle Multimarcas**.

## Estrutura

- `Requisitos-ABP/README.md`: guia de entrega da atividade.
- `documentacao/modelagem.c4`: arquitetura e modelagem com foco em C4 + Mermaid.
- `documentacao/justificativas.md`: decisoes de embedding/referencing e vantagens do modelo.
- `documentacao/consultas-e-aggregations.md`: consultas obrigatorias e pipelines de dashboard.
- `scripts/mongodb-script.js`: script base para criacao de colecoes, dados e consultas.

## Escopo da Entrega

- Colecoes obrigatorias: `clientes`, `leads`, `usuarios`, `negociacoes`, `logs`, `lojas`.
- Regras de negocio atendidas (lead-cliente, lead-loja-atendente, negociacao ativa unica, historico, status/estagio).
- Consultas com filtros, projecao, ordenacao e paginacao.
- Aggregations para indicadores gerenciais.

## Visao Rapida da Solucao

```mermaid
flowchart LR
    A[Origens de Lead\nPresencial/Telefone/WhatsApp/Instagram/Form] --> B[leads]
    B --> C[negociacoes]
    B --> D[clientes]
    B --> E[usuarios]
    B --> F[lojas]
    C --> G[historico de estagios\n(embedding)]
    B --> H[logs de operacao]
```

## Como Usar

1. Abrir `scripts/mongodb-script.js` no MongoDB Compass ou mongosh.
2. Executar blocos de criacao de dados.
3. Executar consultas e aggregations.
4. Usar os prints em tela inteira e consolidar no PDF `BDN-Documento-ABP.pdf`.

