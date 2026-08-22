# 🇧🇷 YT-SEO-BR - Guia de Testes e Depuração

## ✅ Alterações Implementadas

1. **Botão movido para o Header** - Agora fica anexado ao header do YouTube Studio
2. **History API** - Detecta mudanças de rota mais precisamente
3. **Logs Melhorados** - Console mostra status em tempo real
4. **Display Flex** - Sidebar usa display flex para melhor renderização

## 🧪 Como Testar

### Passo 1: Recarregar a Extensão
1. Abra `chrome://extensions/`
2. Encontre "YT-SEO-BR"
3. Clique no ícone de recarregar (↻)

### Passo 2: Verificar Console
1. Abra YouTube Studio: https://studio.youtube.com
2. Pressione **F12** para abrir DevTools
3. Vá para a aba **Console**
4. Procure por mensagens com `[YT-SEO-BR]`

### Passo 3: Navegar para Detalhes de Vídeo
1. No YouTube Studio, clique em um vídeo existente
2. Vá para a aba "Detalhes"
3. Observe o console para ver:
   ```
   [YT-SEO-BR] Content script inicializado
   [YT-SEO-BR] Observando mudanças de rota
   [YT-SEO-BR] Página de detalhes detectada
   [YT-SEO-BR] Botão injetado no header com sucesso
   ```

### Passo 4: Buscar o Botão
- Olhe no **header do YouTube Studio** (ao lado dos outros botões)
- Deve aparecer um botão azul com texto "🇧🇷 Otimizar SEO"

### Passo 5: Clicar no Botão
- Clique no botão
- No console, você deve ver:
  ```
  [YT-SEO-BR] Toggle sidebar chamado. Injetado: false
  [YT-SEO-BR] Injetando sidebar...
  [YT-SEO-BR] Carregando sidebar de: chrome-extension://[ID]/sidebar.html
  [YT-SEO-BR] Sidebar injetada com sucesso
  [YT-SEO-BR] Iframe carregado com sucesso
  ```

### Passo 6: Verificar Sidebar
- Uma sidebar deve aparecer no lado direito da tela
- Ela deve conter 3 abas: SEO, Configurações, Apoio

## 🔍 Se Algo Não Funcionar

### Console vazio ou sem logs [YT-SEO-BR]?
```javascript
// Cole isso no console para verificar
chrome.runtime.getURL('sidebar.html')
// Deve retornar: chrome-extension://[ID]/sidebar.html
```

### Botão não aparece?
- Verifique se está na página correta (detalhes do vídeo)
- Procure por erro no console relacionado ao header
- Tente recarregar a página

### Sidebar aparece em branco?
- Abra DevTools do iframe: Inspecione o iframe no DOM
- Verifique se há erros CORS
- Confirme se sidebar.html existe em dist/

### Função de captura de dados não funciona?
- Os campos de entrada do YouTube Studio têm seletores complexos
- Tente inspecionar a página e encontrar os `aria-label` corretos

## 📊 Arquivos Críticos Checklist

```
dist/
├── ✓ manifest.json
├── ✓ content.js (2.95 kB)
├── ✓ sidebar.html
├── ✓ sidebar-main.js (27.80 kB)
├── ✓ main.js (popup)
└── ✓ index.html (popup)
```

## 🚀 Próximos Passos

Se tudo funcionar:
1. Configurar chave Gemini na aba Configurações
2. Testar otimização de SEO
3. Testar geração de código Pix
