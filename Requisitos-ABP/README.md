# Requisitos-ABP

## Checklist de Entrega

- [ ] Script MongoDB completo
- [ ] Prints de tela inteira
- [ ] Documento de justificativas
- [ ] PDF final com nome **BDN-Documento-ABP.pdf**

## Conteúdo Mínimo

### Coleções obrigatórias

- `clientes`
- `leads`
- `usuarios` (atendentes, gerentes, admin)
- `negociacoes`
- `logs`
- `lojas`

### Regras obrigatórias

- [ ] Cada lead vinculado a um cliente
- [ ] Cada lead vinculado a uma loja e a um atendente
- [ ] Apenas uma negociação ativa por lead
- [ ] Histórico de negociação registrado
- [ ] Controle de status e estágio

### Volume mínimo de dados

- 5 clientes
- 10 leads
- 10 negociações
- 5 usuários
- 10 logs
- 3 lojas

### Consultas obrigatórias

- [ ] `$and` e `$or`
- [ ] `$gt` e `$lt`
- [ ] `$exists`
- [ ] Projeção
- [ ] Ordenação (`sort`)
- [ ] Paginação (`skip`, `limit`)

### Dashboard (aggregation)

- [ ] Leads por origem
- [ ] Leads por status
- [ ] Taxa de conversão
- [ ] Leads por atendente
- [ ] Leads por importância

## Fluxo de Publicação

1. Commitar os artefatos neste repositório.
2. Fazer upload do `BDN-Documento-ABP.pdf`.
3. Copiar o link do PDF no GitHub.
4. Comentar o link no card **BDN-Entrega do Documento** no Kanban da disciplina.
5. Mover o card para **Entregue** no Kanban do próprio repositório.

