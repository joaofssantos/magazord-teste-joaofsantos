

# GitHub Profile - Teste de desenvolvimento Magazord 

## Visão Geral

Este repositório contém o projeto Github Profile Search, desenvolvido utilizando Vite, React e Typescript. O projeto foi iniciado a partir do clone do repositorio disponibilizado pela **Magazord Digital Commerce** -> https://github.com/magazord-plataforma/magazord-frontend-react-test  

Figma: https://www.figma.com/file/sf1CmqcEZbUzkeZOA4AUGj/TESTE-FRONT-MAGAZORD?node-id=0%3A1

O Projeto foi estruturado num escopo similar ao que habitualmente desenvolvo, com diferença que, no cotidiano não utilizo: Tailwind, Zustand e Vite.

#### Futuras possibilidades

- Criação de teste com Vitest
- Ferramentas de observabilidade, NewRelic e Clarity
- Ferramentas de analise e tagueamento
- Ajuste no sistema de componentes, abstraindo um pouco mais certos componentes.

#### O que há por fazer

Não pude me dedicar com mais horas, por algumas situações pessoais(eventos, atividades de casa, esportes, curso).
Não consegui finalizar o filtro mobile(modal) e o comportamento completo do desktop, mantendo apenas o funcionamento sem problemas do filtro de tipo e linguagens.

## Tecnologias Utilizadas

- **React** 18.2.0
- **TypeScript** 5.3.3
- **Vite** 5.0.11
- **TailwindCSS** 3.4.1
- **React Query** (@tanstack/react-query) 5.17.19
- **Zustand** 4.4.7
- **Axios** 1.6.5

## Pré-requisitos

- **Node.js**: >= 18.20.5
- **npm**: >= 10.8.2 ou **yarn**: >= 1.22.0

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/joaofssantos/magazord-teste-joaofsantos.git
cd magazord-teste-joaofsantos
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure variáveis de ambiente:

Copie o arquivo de exemplo e configure seu token:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione seu token do GitHub:
```env
VITE_GITHUB_TOKEN=seu_token_github_aqui
```

> **Como obter um token do GitHub:**
> 1. Acesse: https://github.com/settings/tokens
> 2. Clique em "Generate new token" → "Generate new token (classic)"
> 3. Marque apenas o escopo `public_repo`
> 4. Copie o token gerado
>
> **Nota**: O token é opcional, mas é recomendado para evitar rate limit na API do GitHub (60 req/h sem token vs 5.000 req/h com token).

## Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento em `http://localhost:5173`

### Build
```bash
npm run build
```
Compila o TypeScript e gera build de produção na pasta `dist/`

### Lint
```bash
npm run lint
```
Executa o ESLint para validar código

### Preview
```bash
npm run preview
```
Preview do build de produção localmente

### Typecheck
```bash
npx tsc --noEmit
```
Valida tipos TypeScript sem gerar arquivos

## Padronização de estilos
Foi utilizado integralmente as classes via tailwind, com customização de cores e fonte no tailwind.config.js
É recomendado que se mantenha a utilização via classe
https://tailwindcss.com/docs/

## Estrutura do Projeto

```
magazord-teste-joaofsantos/
├── src/
│   ├── assets/          # Ícones SVG
│   ├── components/      # Componentes React
│   │   ├── Header.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ProfileSection.tsx
│   │   ├── RepoFilters.tsx
│   │   ├── RepoHeader.tsx
│   │   ├── RepoItem.tsx
│   │   ├── RepoList.tsx
│   │   └── RepoModal.tsx
│   │   ├── RepoPanel.tsx
│   ├── hooks/           # Custom hooks
│   │   └── useGithubApi.ts
│   ├── services/        # APIs e serviços
│   │   └── github.ts
│   ├── store/           # Zustand store
│   │   └── useGithubStore.ts
│   ├── types/           # Definições TypeScript
│   │   ├── github.d.ts
│   │   └── svg.d.ts
│   ├── App.css
│   ├── App.tsx
│   ├── env.d.ts
│   ├── index.css
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── eslint.config.js
```

## Componentes Principais

### ProfilePage e Profile Section
Seção principal que exibe informações do perfil do usuário GitHub

### RepoPanel
Orquestrador principal da página

### RepoHeader
Tab layout que controla a exibição de repositorios proprietario e marcados com estrela

### RepoFilters
Filtros de tipo (Fork/Archived/Private/Public) e linguagem

### RepoList
Listagem de repositorios nominais e marcados com estrela do usuario

### RepoItem
Item da lista de repositorios

### RepoModal
Modal com detalhes do repositório e issues abertas

## API do GitHub

A aplicação consome a API REST do GitHub v3:
- Endpoint base: `https://api.github.com`
- Documentação: [GitHub REST API](https://docs.github.com/en/rest)

### Limites de requisição:
- **Sem autenticação**: 60 requisições/hora
- **Com token**: 5.000 requisições/hora

## Personalização do TailwindCSS

Configuração customizada em `tailwind.config.js`:

```js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#...',
        secondary: '#...',
      }
    }
  }
}
```

## Validação de Qualidade

### ESLint
```bash
npm run lint
```

Configuração em `eslint.config.js` com:
- TypeScript ESLint
- React Hooks rules
- React Refresh plugin

### TypeScript
```bash
npx tsc --noEmit
```

## Deploy

### Build de produção
```bash
npm run build
```

### Preview local
```bash
npm run preview
```

## Dependências Principais

| Pacote | Versão |
|--------|--------|
| react | 18.2.0 |
| typescript | 5.3.3 |
| vite | 5.0.11 | 
| @tanstack/react-query | 5.17.19 |
| zustand | 4.4.7 | 
| axios | 1.6.5 |
| tailwindcss | 3.4.1 |

## Desenvolvimento

### Adicionar nova funcionalidade
1. Crie branch: `git checkout -b feat/nova-feature`
2. Desenvolva e teste localmente
3. Commit: `git commit -m "feat: adiciona nova feature"`
4. Push: `git push origin feat/nova-feature`


## Licença

Este projeto foi desenvolvido como teste técnico para a Magazord.

## Autor

**João Felipe da Silva Santos**
- Site pessoal: [joaodeveloper.com.br](https://joaodeveloper.com.br/)
- GitHub: [@joaofssantos](https://github.com/joaofssantos)
- Instagram: [@fsantos.joao_](https://www.instagram.com/fsantos.joao_/);
- Linkedin: [joaofelipe-dev](https://www.linkedin.com/in/joaofelipe-dev/);

