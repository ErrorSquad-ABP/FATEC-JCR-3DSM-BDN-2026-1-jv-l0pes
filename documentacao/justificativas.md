# Justificativas de Modelagem

## Onde usamos Embedding e por que

- Em `negociacoes.historico` (array de eventos de estágio/status com data e responsável).
- Motivo: cada negociação é lida frequentemente com seu próprio histórico completo; manter no mesmo documento reduz joins lógicos e simplifica leitura sequencial.

## Onde usamos Referencing e por que

- `leads.clienteId -> clientes._id`
- `leads.atendenteId -> usuarios._id`
- `leads.lojaId -> lojas._id`
- `negociacoes.leadId -> leads._id`
- `logs.leadId` e `logs.usuarioId`

Motivo: `clientes`, `usuarios` e `lojas` são entidades reutilizadas por muitos leads e mudam de forma independente; referencing evita redundância e inconsistências.

## Vantagens do modelo não relacional neste contexto

- Flexibilidade para evoluir schema de lead/negociação sem migrações pesadas.
- Escrita rápida de eventos e histórico comercial.
- Estruturas de dashboard com aggregation pipeline nativa.
- Boa aderência ao domínio de funil comercial (eventos e estágios dinâmicos).

## Trade-offs aceitos

- Maior responsabilidade da aplicação para validação de regras de negócio.
- Necessidade de índices para manter desempenho das consultas analíticas.
- Governança de consistência entre coleções referenciadas.

