

# GitHub Profile - Teste de desenvolvimento Magazord 

## Visão Geral

Este repositório contém o projeto Github Profile Search, desenvolvido utilizando Vite, React e Typescript. O projeto foi iniciado a partir do clone do repositorio disponibilizado pela **Magazord Digital Commerce** -> https://github.com/magazord-plataforma/magazord-frontend-react-test  

Figma: https://www.figma.com/file/sf1CmqcEZbUzkeZOA4AUGj/TESTE-FRONT-MAGAZORD?node-id=0%3A1

O Projeto foi estruturado num escopo similar ao que habitualmente desenvolvo, exceto que não utilizo tailwind, Vite, Zustand ou alguma biblioteca de componentes(MuI, Shadcn).

Foi implantado o NewRelic como ferramenta de observabilidade

#### Futuras possibilidades

- Criação de teste com Vitest
- Ferramentas de analise e tagueamento

## Tecnologias Utilizadas

- **React** 18.2.0
- **TypeScript** 5.3.3
- **Vite** 5.0.11
- **TailwindCSS** 3.4.1
- **React Query** (@tanstack/react-query) 5.17.19
- **Zustand** 4.4.7
- **Axios** 1.6.5

## Pré-requisitos

### Opção 1: Desenvolvimento Local
- **Node.js**: 22.x (recomendado) — 20.x suportado
- **npm**: >= 10.8.2 ou **yarn**: >= 1.22.0

#### Gerenciamento de versão do Node com mise (recomendado)
Este repositório utiliza o mise para padronizar a versão do Node via `.mise.toml` (Node 22).

```bash
# na raiz do projeto
mise trust .      # confiar no .mise.toml do repositório
mise install      # instala Node 22
mise use          # ativa a versão definida
```

Se aparecer aviso sobre “idiomatic version files”, você pode desativá-los (não usamos .nvmrc aqui):

```bash
mise settings add idiomatic_version_file_enable_tools "[]"
```

### Opção 2: Docker
- **Docker**: >= 20.10
- **Docker Compose**: >= 2.0

## Instalação

### Instalação com Docker (Recomendado)

#### Modo Desenvolvimento
```bash
# Clone o repositório
git clone https://github.com/joaofssantos/magazord-teste-joaofsantos.git
cd magazord-teste-joaofsantos

# Configure o token (opcional)
echo "VITE_GITHUB_TOKEN=seu_token_aqui" > .env

# Inicie o container de desenvolvimento
docker compose up dev

# Acesse: http://localhost:5173
```

#### Modo Produção (build otimizado com Nginx)
```bash
# Build e inicie o container de produção
docker compose up prod

# Acesse: http://localhost:8080
```

#### Comandos úteis Docker
```bash
# Rebuild após mudanças no Dockerfile
docker compose build

# Acompanhar
docker compose up -d dev

# Listar logs
docker compose logs -f dev

# Parar containers
docker compose down

# Limpar volumes e rebuildar
docker compose down -v
docker compose build --no-cache
```

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/joaofssantos/magazord-teste-joaofsantos.git
cd magazord-teste-joaofsantos
```

Caso utilize o mise para gerenciar a versão do Node, execute antes de instalar:

```bash
mise trust . && mise install && mise use
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
ou 
yarn dev
```
Inicia o servidor de desenvolvimento em `http://localhost:5173`

### Build
```bash
npm run build 
ou 
yarn build
```
Compila o TypeScript e gera build de produção na pasta `dist/`

### Lint
```bash
npm run lint
ou
yarn lint
```
Executa o ESLint para validar código

### Preview
```bash
npm run preview 
ou 
yarn preview
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
│   ├── components/                  # Componentes por domínio
│   │   ├── profile/                 # Perfil do usuário
│   │   │   ├── ProfilePage.tsx
│   │   │   └── ProfileSection.tsx
│   │   ├── repository/              # Repositórios e estrelas
│   │   │   ├── RepoPanel.tsx
│   │   │   ├── RepoHeader.tsx
│   │   │   ├── RepoFilters.tsx
│   │   │   ├── RepoList.tsx
│   │   │   ├── RepoItem.tsx
│   │   │   └── RepoModal.tsx
│   │   └── utils/                   # Utilitários visuais
│   │       └── (ErrorBoundary, ErrorMessage, FilterDropdown, Header, Skeleton)
│   ├── hooks/                       # Hooks customizados
│   │   └── (useGithubApi, useRepoFilters, useRepoModal, useDocumentTitle)
│   ├── services/                    # Integrações/APIs
│   │   └── github.ts
│   ├── store/                       # Estado global (Zustand)
│   │   └── useGithubStore.ts
│   ├── types/                       # Tipagens TS
│   │   └── (github.d.ts, svg.d.ts)
│   ├── assets/                      # Ícones SVG
│   └── App.tsx, main.tsx, styles, env.d.ts
├── public/                          # Arquivos estáticos
├── Configuração/Build
│   ├── Dockerfile, Dockerfile.dev, docker-compose.yml, nginx.conf
│   ├── vite.config.ts, tailwind.config.js, eslint.config.js, postcss.config.js
│   ├── tsconfig*.json, index.html, .mise.toml
│   └── package.json, yarn.lock, README.md, DOCKER.md
```

## Componentes Principais

### ProfilePage e Profile Section
Seção principal que exibe informações do perfil do usuário GitHub

### RepoPanel
Orquestrador principal da página

Os utilitários visuais (Header, FilterDropdown, ErrorBoundary, ErrorMessage, Skeleton) dão suporte à UX, mas os componentes principais acima concentram a lógica de domínio.

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
ou 
yarn lint
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

### Deploy na Vercel (recomendado)

Para este projeto (Vite + React), o deploy está integrado ao GitHub e publica automaticamente com base na branch `main`.

1. Conecte o repositório GitHub na Vercel
2. Framework Preset: Vite
3. Variáveis de ambiente (opcional):
   - `VITE_GITHUB_TOKEN` (Project Settings → Environment Variables)

Fluxo de publicação:
- Branch de produção: `main` (Settings → Git → Production Branch)
- A cada push na `main`, a Vercel cria um novo deploy de Produção
- Pull Requests criam novas Preview Deployments com URL única para teste/review
- Caso seja alterada a variável de ambiente, Realize um "Redeploy" de Produção para aplicar

**Roteamento SPA (fix 404 em refresh):**
O arquivo `vercel.json` na raiz do projeto configura rewrites para que todas as rotas sejam tratadas pelo `index.html`, evitando erro 404 ao recarregar páginas como `/username`.

### Deploy local com Docker

#### Build da imagem de produção
```bash
# Build da imagem
docker build -t magazord-github-profile .

# Executar container
docker run -p 8080:80 magazord-github-profile

# Acesse: http://localhost:8080
```

### Deploy tradicional

#### Build de produção
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

