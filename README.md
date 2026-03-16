# UFRB Tracker 🚀

O **UFRB Tracker** é uma aplicação Full-Stack desenvolvida para facilitar o acesso e o acompanhamento de avisos, notícias e comunicados da **Universidade Federal do Recôncavo da Bahia (UFRB)**. 

Através de técnicas avançadas de *web scraping*, o sistema centraliza informações de diversos portais da universidade em uma única interface intuitiva, permitindo buscas rápidas e filtragem por categorias.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19**: Biblioteca principal para construção da interface.
- **Vite**: Ferramenta de build ultra-rápida.
- **CSS Vanilla**: Estilização personalizada seguindo padrões modernos.
- **MVC Architecture**: Organização clara entre Views, Controllers e Services.

### Backend
- **Node.js + Express**: Servidor robusto para API.
- **TypeScript**: Tipagem estática para maior segurança e manutenibilidade.
- **Cheerio + Axios**: Ferramentas de scraping para extração de dados HTML.
- **Nodemon**: Reinicialização automática durante o desenvolvimento.

---

## 🏗️ Arquitetura do Projeto

O projeto segue o padrão **MVC (Model-View-Controller)** para garantir separação de responsabilidades e facilidade de manutenção.

```text
ufrbtracker/
├── server/                # Backend (Node.js + TypeScript)
│   ├── src/
│   │   ├── controllers/   # Lógica de controle da API
│   │   ├── services/      # Lógica de scraping (ScraperService)
│   │   ├── constants/     # Definições e URLs dos portais
│   │   └── index.ts       # Ponto de entrada do servidor
├── src/                   # Frontend (React)
│   ├── controllers/       # Consumo da API e gestão de estado
│   ├── views/             # Componentes de interface (Header, List, etc.)
│   ├── styles/            # CSS organizado
│   └── App.jsx            # Componente principal
└── README.md
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.
- [npm](https://www.npmjs.com/) ou [yarn].

### 1. Clonar o Repositório
```bash
git clone https://github.com/Rul3ss/interntracker.git
cd ufrbtracker
```

### 2. Configurar o Backend
```bash
cd server
npm install
npm run dev
```
O servidor estará rodando em `http://localhost:3001`.

### 3. Configurar o Frontend
Abra um novo terminal na raiz do projeto:
```bash
npm install
npm run dev
```
A aplicação React estará disponível em `http://localhost:5173`.

---

## 📋 Funcionalidades Principais

- **Scraping em Tempo Real**: Coleta de avisos de múltiplos portais da UFRB.
- **Filtro Inteligente**: Busca por texto e filtragem por categorias dinâmicas.
- **Interface Responsiva**: Design moderno e adaptável para diferentes dispositivos.
- **Centralização**: Unifica as notícias do CETEC, PPGECID e outros centros em um só lugar.

---

## 📜 Licença

Este projeto está sob a licença ISC. Consulte o arquivo `package.json` no diretório `server` para mais detalhes.

---

Desenvolvido para a comunidade acadêmica da **UFRB**. 🎓
