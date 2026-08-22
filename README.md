# YT-SEO-BR

Extensão Chrome para otimização de SEO no YouTube Studio com foco no mercado brasileiro.

## Funcionalidades

- **Content Script**: Monitora mudanças de rota no YouTube Studio e injeta botão na página de detalhes do vídeo.
- **Sidebar Vue**: Interface moderna em dark mode com abas para SEO, Configurações e Apoio.
- **IA Gemini**: Otimização de títulos e tags usando Google Gemini com prompts focados no Brasil.
- **Gerenciamento de Estado**: Persistência de configurações no chrome.storage.local usando Pinia.
- **Módulo Pix**: Geração de códigos Pix para doações.

## Instalação

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Build a extensão: `npm run build`
4. Abra `chrome://extensions/` no Chrome
5. Habilite "Modo desenvolvedor"
6. Clique em "Carregar sem compactação" e selecione a pasta `dist`

## Configuração

1. Abra o popup da extensão ou acesse uma página do YouTube Studio
2. Vá para a aba "Configurações"
3. Insira sua chave da API do Google Gemini
4. Configure a descrição do canal e nicho alvo
5. Adicione gírias customizadas (opcional)

## Uso

1. Acesse https://studio.youtube.com
2. Abra os detalhes de um vídeo
3. Clique no botão "🇧🇷 Otimizar SEO" que aparecerá
4. Na sidebar, clique em "Otimizar Título e Descrição"
5. Receba sugestões de títulos e tags otimizadas para o Brasil

## Estrutura do Projeto

```
src/
├── content-scripts/     # Scripts injetados nas páginas
├── sidebar/            # App Vue da sidebar lateral
│   ├── components/     # Componentes Vue
│   └── main.ts         # Ponto de entrada da sidebar
├── services/           # Serviços (Gemini, Pix)
├── store/              # Stores Pinia
└── types/              # Declarações de tipos
```

## Tecnologias

- Vue 3 + TypeScript
- Vite
- Tailwind CSS
- Pinia
- Google Generative AI (Gemini)
- Chrome Extensions API

## Desenvolvimento

Para desenvolvimento local:

```bash
npm run dev
```

Para build de produção:

```bash
npm run build
```

## Notas

- A extensão funciona apenas em https://studio.youtube.com/*
- Requer chave da API do Google Gemini
- Os códigos Pix gerados são para fins de demonstração (substitua a chave Pix real)
