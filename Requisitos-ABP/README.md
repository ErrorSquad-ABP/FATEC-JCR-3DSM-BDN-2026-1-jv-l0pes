# Requisitos-ABP

## Checklist de Entrega

- [ ] Script MongoDB completo
- [ ] Prints de tela inteira
- [ ] Documento de justificativas
- [ ] PDF final com nome **BDN-Documento-ABP.pdf**

## Conteudo Minimo

### Colecoes obrigatorias

- `clientes`
- `leads`
- `usuarios` (atendentes, gerentes, admin)
- `negociacoes`
- `logs`
- `lojas`

### Regras obrigatorias

- [ ] Cada lead vinculado a um cliente
- [ ] Cada lead vinculado a uma loja e a um atendente
- [ ] Apenas uma negociacao ativa por lead
- [ ] Historico de negociacao registrado
- [ ] Controle de status e estagio

### Volume minimo de dados

- 5 clientes
- 10 leads
- 10 negociacoes
- 5 usuarios
- 10 logs
- 3 lojas

### Consultas obrigatorias

- [ ] `$and` e `$or`
- [ ] `$gt` e `$lt`
- [ ] `$exists`
- [ ] Projecao
- [ ] Ordenacao (`sort`)
- [ ] Paginacao (`skip`, `limit`)

### Dashboard (aggregation)

- [ ] Leads por origem
- [ ] Leads por status
- [ ] Taxa de conversao
- [ ] Leads por atendente
- [ ] Leads por importancia

## Fluxo de Publicacao

1. Commitar os artefatos neste repositorio.
2. Fazer upload do `BDN-Documento-ABP.pdf`.
3. Copiar o link do PDF no GitHub.
4. Comentar o link no card **BDN-Entrega do Documento** no Kanban da disciplina.
5. Mover o card para **Entregue** no Kanban do proprio repositorio.

