# Link do Deploy: [https://dashboard-de-m-tricas-d7lw.vercel.app](https://dashboard-de-m-tricas-d7lw.vercel.app)
# 📊 Dashboard de Métricas - Desafio Técnico

Este projeto é um Dashboard de Métricas desenvolvido como parte de um desafio técnico para demonstrar proficiência em **React**, **Next.js (App Router)** e **TypeScript**. A aplicação consome uma API simulada interna para exibir indicadores de performance e gerenciamento de campanhas de marketing.

---

```bash
# 1. Clonar o repositório
git clone https://github.com/rejuno/Dashboard-de-M-tricas.git

# 2. Instalar as dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

## 🛠️ Stack Utilizada

* **Framework:** [Next.js 14/15](https://nextjs.org/) (App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Tipagem forte em 100% do código)
* **Estilização:** [TailwindCSS](https://tailwindcss.com/)
* **Gráficos:** [Recharts](https://recharts.org/)
* **Gerenciamento de Estado:** Hooks nativos (`useState`, `useEffect`, `useMemo`)

---

## 📋 Funcionalidades (MVP)

### 1. Mock de Dados (API Route)
Implementação de uma rota de API interna em `app/api/data/route.ts` que retorna um JSON estático simulando uma resposta de backend.

### 2. Visão Geral (Dashboard)
-   **Cards de Métricas:** Exibição visual de Total de Clientes, Receita Mensal e Taxa de Conversão.
-   **Gráfico de Investimento:** Gráfico de barras/linhas mostrando o investimento das campanhas por canal de aquisição.
-   **Loading States:** Feedback visual (Skeleton Screen ou Spinner) enquanto os dados são "buscados" na API.

### 3. Tabela e Filtros
-   Listagem dinâmica de campanhas (Nome, Canal, Status, Investimento).
-   Filtro funcional por **Status** (Ativa/Pausada) utilizando estado local.

---

## ✨ Extras adicionados

-   [X] Layout responsivo
-   [X] Dark e white mode

