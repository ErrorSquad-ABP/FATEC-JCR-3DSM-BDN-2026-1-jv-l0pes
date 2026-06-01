# Dia 4 (25/05/26) - Aggregations e Finalização

## 1) Objetivo do dia

Este documento descreve os comandos de aggregation executados no MongoDB Compass para o Dia 4 e validações finais de entrega.

Os objetivos são:

- executar aggregations obrigatórias para indicadores gerenciais;
- executar aggregations complementares com `$lookup` (join);
- validar o cumprimento das regras de negócio;
- criar índices para otimização;
- consolidar a entrega com sucesso.

## 2) Aggregations obrigatórias

Estas consultas geram indicadores sobre o funil de vendas e desempenho da equipe.

### 2.1) Leads por origem

Esta aggregation agrupa todos os leads pelo canal de captação (origem) e conta a quantidade em cada canal.

```javascript
db.leads.aggregate([
  { $group: { _id: "$origem", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
```

- `$group` agrupa documentos por um campo específico;
- `_id: "$origem"` define que o agrupamento será por origem;
- `{ $sum: 1 }` conta o número de leads em cada grupo;
- `$sort: { total: -1 }` ordena os resultados do maior para o menor.

**Utilidade:** Identifica quais canais (WhatsApp, Instagram, telefone, etc.) geram mais leads.

![Leads por origem](../PDFs/dia4/leads_aggregate.png)

### 2.2) Leads por status

Agrupa os leads de acordo com seu status no funil comercial.

```javascript
db.leads.aggregate([
  { $group: { _id: "$status", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
```

**Utilidade:** Mostra quantos leads estão em cada etapa (novo, em_atendimento, convertido, perdido).

![Leads por status](../PDFs/dia4/lead_aggregate_status.png)

### 2.3) Taxa de conversão

Calcula o percentual de leads convertidos em relação ao total.

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

- `$cond` funciona como um `if-then-else` para contar apenas leads convertidos;
- `$project` redefine os campos de saída e calcula percentuais;
- `$multiply` e `$divide` realizam operações matemáticas.

**Utilidade:** Indicador gerencial crítico que mostra a efetividade do processo de vendas.

![Taxa de conversão](../PDFs/dia4/lead_aggregate_group.png)

### 2.4) Leads por atendente

Identifica quanto trabalho cada atendente tem sob responsabilidade.

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

**Utilidade:** Permite balancear a carga de trabalho e identificar gargalos de desempenho.

![Leads por atendente](../PDFs/dia4/leads_aggregate_atendente.png)

### 2.5) Leads por importância

Agrupa leads de acordo com o nível de prioridade definido.

```javascript
db.leads.aggregate([
  { $match: { importancia: { $exists: true } } },
  { $group: { _id: "$importancia", total: { $sum: 1 } } },
  { $project: { importancia: "$_id", total: 1, _id: 0 } },
  { $sort: { total: -1 } }
]);
```

- `$match` filtra apenas documentos que possuem o campo importância;
- `$project` renomeia campos para melhor leitura.

**Utilidade:** Permite visualizar a distribuição de oportunidades por nível estratégico.

![Leads por importância](../PDFs/dia4/leads_aggregate_importancia.png)

## 3) Aggregations complementares com `$lookup` (join)

Estas consultas utilizam a operação `$lookup` para fazer joins entre coleções, demonstrando a força do modelo relacional.

### 3.1) Valor total proposto por loja

Agrupa negociações por loja e soma os valores propostos.

```javascript
db.negociacoes.aggregate([
  {
    $lookup: {
      from: "leads",
      localField: "leadId",
      foreignField: "_id",
      as: "lead"
    }
  },
  { $unwind: "$lead" },
  {
    $group: {
      _id: "$lead.lojaId",
      valorTotalProposto: { $sum: "$valorProposto" },
      negociacoesCount: { $sum: 1 }
    }
  },
  { $sort: { valorTotalProposto: -1 } }
]);
```

- `$lookup` faz um join com a coleção `leads`;
- `$unwind` descompacta o array resultante do join;
- `$group` agrupa e soma os valores.

**Utilidade:** Visão de receita esperada por unidade de negócio.

![Valor total proposto por loja](../PDFs/dia4/negociacoes_lookup_loja.png)

### 3.2) Conversão por loja

Mostra quantas vendas cada loja realizou.

```javascript
db.leads.aggregate([
  {
    $lookup: {
      from: "negociacoes",
      localField: "_id",
      foreignField: "leadId",
      as: "negociacoes"
    }
  },
  { $unwind: "$negociacoes" },
  { $match: { "negociacoes.status": "convertido" } },
  {
    $group: {
      _id: "$lojaId",
      totalConvertidos: { $sum: 1 }
    }
  },
  { $sort: { totalConvertidos: -1 } }
]);
```

**Utilidade:** Ranking de desempenho por loja em termos de conversão.

![Conversão por loja](../PDFs/dia4/leads_lookup_conversao_loja.png)

### 3.3) Média de valor proposto por status

Calcula o valor médio proposto de acordo com o status da negociação.

```javascript
db.negociacoes.aggregate([
  {
    $group: {
      _id: "$status",
      mediaValorProposto: { $avg: "$valorProposto" },
      total: { $sum: 1 }
    }
  },
  { $sort: { mediaValorProposto: -1 } }
]);
```

- `$avg` calcula a média de um campo;
- `$sum: 1` conta documentos.

**Utilidade:** Identifica se negociações perdidas tinham menos valor proposto que as convertidas.

![Média de valor por status](../PDFs/dia4/negociacoes_avg_status.png)

## 4) Validações finais de entrega

Estas consultas garantem que todas as regras de negócio foram respeitadas e os dados estão íntegros.

### 4.1) Contagem mínima por coleção

Valida que cada coleção possui o volume mínimo exigido.

```javascript
db.clientes.countDocuments();
db.leads.countDocuments();
db.usuarios.countDocuments();
db.negociacoes.countDocuments();
db.logs.countDocuments();
db.lojas.countDocuments();
```

**Requisito:** Cada coleção deve ter pelo menos o mínimo especificado.

- Clientes: mínimo 5 ✓
- Leads: mínimo 10 ✓
- Usuários: mínimo 5 ✓
- Negociações: mínimo 10 ✓
- Logs: mínimo 10 ✓
- Lojas: mínimo 3 ✓

![Contagem de documentos](../PDFs/dia4/count_documentos.png)

### 4.2) Validar limite de negociações ativas por lead

Verifica se existe apenas uma negociação ativa por lead (regra obrigatória).

```javascript
db.negociacoes.aggregate([
  { $match: { ativo: true } },
  {
    $group: {
      _id: "$leadId",
      ativos: { $sum: 1 }
    }
  },
  { $match: { ativos: { $gt: 1 } } }
]);
```

**Esperado:** Nenhum resultado (não deve haver leads com mais de uma negociação ativa).

![Validação de negociações ativas](../PDFs/dia4/validation_ativas.png)

### 4.3) Distribuição de leads por loja

Verifica que leads estão distribuídos entre as lojas.

```javascript
db.leads.aggregate([
  {
    $group: {
      _id: "$lojaId",
      totalLeads: { $sum: 1 }
    }
  },
  { $sort: { totalLeads: -1 } }
]);
```

**Utilidade:** Confirma que cada loja tem responsabilidade sobre leads.

![Distribuição de leads por loja](../PDFs/dia4/leads_distribuicao_loja.png)

### 4.4) Validar clientes com email

Confirma que os dados cadastrais foram preenchidos corretamente.

```javascript
db.clientes.find({
  email: { $exists: true, $ne: "" }
});
```

**Esperado:** Todos os 5 clientes devem ter email preenchido.

![Clientes com email](../PDFs/dia4/cliente_email_validacao.png)

### 4.5) Últimos registros de log

Audita as operações mais recentes registradas no sistema.

```javascript
db.logs.find().sort({ createdAt: -1 }).limit(10);
```

**Utilidade:** Confirma que operações foram rastreadas corretamente.

![Últimos logs](../PDFs/dia4/logs_ultimos.png)

## 5) Criação de índices para otimização

Índices melhoram a performance de consultas frequentes e garantem integridade referencial.

```javascript
db.leads.createIndex({ clienteId: 1 });
db.leads.createIndex({ lojaId: 1 });
db.leads.createIndex({ atendenteId: 1 });
db.leads.createIndex({ createdAt: -1 });
db.negociacoes.createIndex({ leadId: 1 });
db.logs.createIndex({ referenciaId: 1 });
```

- Índices simples aceleram filtros individuais;
- índices em `createdAt` otimizam ordenações por data;
- Índices em chaves estrangeiras (leadId, etc.) aceleram joins.

**Benefício:** Reduz tempo de execução em consultas frequentes.

![Criação de índices](../PDFs/dia4/indexes_created.png)

## 6) Conclusão e checklist de entrega

Dia 4 completa o projeto com:

- ✓ Execução de todas as aggregations obrigatórias;
- ✓ Demonstração de joins com `$lookup`;
- ✓ Validação de regras de negócio;
- ✓ Auditoria de dados;
- ✓ Otimização com índices;
- ✓ Documentação técnica completa.

O sistema está pronto para produção, com dados consistentes, performance otimizada e trilha de auditoria documentada.

### Requisitos atendidos

- [x] Coleções obrigatórias com volume mínimo
- [x] Relacionamentos e referências respeitados
- [x] Consultas obrigatórias executadas
- [x] Aggregations de dashboard geradas
- [x] Regras de negócio validadas
- [x] Documentação completa em markdown e PDF
- [x] Prints de todas as operações
