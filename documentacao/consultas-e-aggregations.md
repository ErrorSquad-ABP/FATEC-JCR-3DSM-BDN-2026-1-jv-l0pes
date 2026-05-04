# Consultas e Aggregations (MongoDB)

## Consultas obrigatorias

### 1) `$and` + `$or`

```javascript
db.leads.find({
  $and: [
    { status: { $in: ["novo", "em_atendimento"] } },
    { $or: [{ origem: "whatsapp" }, { origem: "instagram" }] }
  ]
});
```

### 2) `$gt` + `$lt`

```javascript
db.negociacoes.find({
  valorProposto: { $gt: 30000, $lt: 120000 }
});
```

### 3) `$exists`

```javascript
db.clientes.find({
  email: { $exists: true, $ne: "" }
});
```

### 4) Projecao + ordenacao

```javascript
db.leads
  .find({}, { nomeLead: 1, status: 1, origem: 1, _id: 0 })
  .sort({ createdAt: -1 });
```

### 5) Paginacao

```javascript
db.leads
  .find({})
  .sort({ createdAt: -1 })
  .skip(0)
  .limit(5);
```

## Aggregations de dashboard

### Leads por origem

```javascript
db.leads.aggregate([
  { $group: { _id: "$origem", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
```

### Leads por status

```javascript
db.leads.aggregate([
  { $group: { _id: "$status", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
```

### Taxa de conversao

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

### Leads por atendente

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

### Leads por importancia

```javascript
db.leads.aggregate([
  { $match: { importancia: { $exists: true } } },
  { $group: { _id: "$importancia", total: { $sum: 1 } } },
  { $project: { importancia: "$_id", total: 1, _id: 0 } },
  { $sort: { total: -1 } }
]);
```

