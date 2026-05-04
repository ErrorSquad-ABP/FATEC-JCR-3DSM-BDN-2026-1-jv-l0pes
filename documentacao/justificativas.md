# Justificativas de Modelagem

## Onde usamos Embedding e por que

- Em `negociacoes.historico` (array de eventos de estagio/status com data e responsavel).
- Motivo: cada negociacao e lida frequentemente com seu proprio historico completo; manter no mesmo documento reduz joins logicos e simplifica leitura sequencial.

## Onde usamos Referencing e por que

- `leads.clienteId -> clientes._id`
- `leads.atendenteId -> usuarios._id`
- `leads.lojaId -> lojas._id`
- `negociacoes.leadId -> leads._id`
- `logs.leadId` e `logs.usuarioId`

Motivo: `clientes`, `usuarios` e `lojas` sao entidades reutilizadas por muitos leads e mudam de forma independente; referencing evita redundancia e inconsistencias.

## Vantagens do modelo nao relacional neste contexto

- Flexibilidade para evoluir schema de lead/negociacao sem migracoes pesadas.
- Escrita rapida de eventos e historico comercial.
- Estruturas de dashboard com aggregation pipeline nativa.
- Boa aderencia ao dominio de funil comercial (eventos e estagios dinamicos).

## Trade-offs aceitos

- Maior responsabilidade da aplicacao para validacao de regras de negocio.
- Necessidade de indices para manter desempenho das consultas analiticas.
- Governanca de consistencia entre colecoes referenciadas.

