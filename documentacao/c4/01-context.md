# C4 Level 1 - Context

```mermaid
flowchart TB
    Customer[Interested Customer]
    SalesRep[Sales Representative]
    Manager[Sales Manager]
    Admin[System Administrator]
    LeadSystem["Lead Management System - 1000 Valle Multimarcas"]

    Customer -->|creates lead through channels| LeadSystem
    SalesRep -->|updates lead and negotiation| LeadSystem
    Manager -->|tracks performance indicators| LeadSystem
    Admin -->|governance and audit operations| LeadSystem
```

