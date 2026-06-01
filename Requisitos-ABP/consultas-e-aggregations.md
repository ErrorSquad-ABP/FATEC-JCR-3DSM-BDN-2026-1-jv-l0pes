# Consultas e Aggregations — MongoDB

Database: `valle_leads`

---

## 1) Consultas obrigatórias

### 1.1) `$and` + `$or`

Leads com status `novo` ou `em_atendimento`, originados de WhatsApp ou Instagram.

```javascript
db.leads.find({
  $and: [
    { status: { $in: ["novo", "em_atendimento"] } },
    { $or: [{ origem: "whatsapp" }, { origem: "instagram" }] }
  ]
});
```

### 1.2) `$gt` + `$lt`

Negociações com valor proposto entre R$ 30.000 e R$ 120.000.

```javascript
db.negociacoes.find({
  valorProposto: { $gt: 30000, $lt: 120000 }
});
```

### 1.3) `$exists`

Clientes com e-mail preenchido.

```javascript
db.clientes.find({
  email: { $exists: true, $ne: "" }
});
```

### 1.4) Projeção + ordenação

Campos selecionados, ordenados do mais recente ao mais antigo.

```javascript
db.leads
  .find({}, { nomeLead: 1, status: 1, origem: 1, _id: 0 })
  .sort({ createdAt: -1 });
```

### 1.5) Paginação (`skip` + `limit`)

Primeira página com 5 leads.

```javascript
db.leads
  .find({})
  .sort({ createdAt: -1 })
  .skip(0)
  .limit(5);
```

Segunda página:

```javascript
db.leads
  .find({})
  .sort({ createdAt: -1 })
  .skip(5)
  .limit(5);
```

---

## 2) Aggregations — Dashboard gerencial

Operadores utilizados: `$match`, `$group`, `$sort`, `$project`.

### 2.1) Leads por origem

```javascript
db.leads.aggregate([
  { $match: { origem: { $exists: true } } },
  { $group: { _id: "$origem", total: { $sum: 1 } } },
  { $project: { origem: "$_id", total: 1, _id: 0 } },
  { $sort: { total: -1 } }
]);
```

### 2.2) Leads por status

```javascript
db.leads.aggregate([
  { $match: { status: { $exists: true } } },
  { $group: { _id: "$status", total: { $sum: 1 } } },
  { $project: { status: "$_id", total: 1, _id: 0 } },
  { $sort: { total: -1 } }
]);
```

### 2.3) Taxa de conversão

```javascript
db.leads.aggregate([
  { $match: {} },
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
  },
  { $sort: { taxaConversaoPercentual: -1 } }
]);
```

### 2.4) Leads por atendente

```javascript
db.leads.aggregate([
  { $match: { atendenteId: { $exists: true } } },
  {
    $group: {
      _id: "$atendenteId",
      totalLeads: { $sum: 1 }
    }
  },
  { $project: { atendenteId: "$_id", totalLeads: 1, _id: 0 } },
  { $sort: { totalLeads: -1 } }
]);
```

### 2.5) Leads por importância

```javascript
db.leads.aggregate([
  { $match: { importancia: { $exists: true } } },
  { $group: { _id: "$importancia", total: { $sum: 1 } } },
  { $project: { importancia: "$_id", total: 1, _id: 0 } },
  { $sort: { total: -1 } }
]);
```

---

## 3) Aggregations complementares (`$lookup`)

### 3.1) Valor total proposto por loja

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

### 3.2) Conversão por loja

```javascript
db.leads.aggregate([
  { $match: { status: "convertido" } },
  {
    $group: {
      _id: "$lojaId",
      totalConvertidos: { $sum: 1 }
    }
  },
  { $project: { lojaId: "$_id", totalConvertidos: 1, _id: 0 } },
  { $sort: { totalConvertidos: -1 } }
]);
```

### 3.3) Média de valor proposto por status da negociação

```javascript
db.negociacoes.aggregate([
  { $match: { valorProposto: { $exists: true } } },
  {
    $group: {
      _id: "$status",
      mediaValorProposto: { $avg: "$valorProposto" },
      total: { $sum: 1 }
    }
  },
  { $project: { status: "$_id", mediaValorProposto: 1, total: 1, _id: 0 } },
  { $sort: { mediaValorProposto: -1 } }
]);
```

---

## 4) Validações de entrega

### 4.1) Contagem mínima por coleção

```javascript
db.clientes.countDocuments();   // mínimo 5
db.leads.countDocuments();      // mínimo 10
db.usuarios.countDocuments();   // mínimo 5
db.negociacoes.countDocuments();// mínimo 10
db.logs.countDocuments();       // mínimo 10
db.lojas.countDocuments();      // mínimo 3
```

### 4.2) Apenas uma negociação ativa por lead

Deve retornar vazio:

```javascript
db.negociacoes.aggregate([
  { $match: { ativo: true } },
  { $group: { _id: "$leadId", ativos: { $sum: 1 } } },
  { $match: { ativos: { $gt: 1 } } }
]);
```

### 4.3) Distribuição de leads por loja

```javascript
db.leads.aggregate([
  { $group: { _id: "$lojaId", totalLeads: { $sum: 1 } } },
  { $sort: { totalLeads: -1 } }
]);
```

### 4.4) Últimos 10 logs

```javascript
db.logs.find().sort({ createdAt: -1 }).limit(10);
```
