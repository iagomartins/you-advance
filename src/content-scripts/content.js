// Content Script para YT-SEO-BR

let sidebarInjected = false
let sidebarContainer = null

// Função para detectar se estamos na página de detalhes do vídeo
function isVideoDetailsPage() {
  const url = window.location.href
  return url.includes('/video/') && url.includes('/edit')
}

// Função para injetar o botão no header
function injectButton() {
  if (document.querySelector('.yt-seo-br-button')) return

  const headerContainer = document.querySelector('ytcp-header')
  if (!headerContainer) {
    console.log('[YT-SEO-BR] Header não encontrado')
    setTimeout(injectButton, 1000)
    return
  }

  const buttonWrapper = document.createElement('div')
  buttonWrapper.style.cssText = `
    display: flex;
    align-items: center;
    margin: 0 8px;
  `

  const button = document.createElement('button')
  button.className = 'yt-seo-br-button'
  button.innerHTML = '🇧🇷 Otimizar SEO'
  button.style.cssText = `
    background: #065fd4;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 13px;
    font-family: Roboto, Arial, sans-serif;
    transition: background 0.2s;
  `

  button.addEventListener('mouseover', () => {
    button.style.background = '#1976d2'
  })
  button.addEventListener('mouseout', () => {
    button.style.background = '#065fd4'
  })
  button.addEventListener('click', toggleSidebar)

  buttonWrapper.appendChild(button)
  headerContainer.appendChild(buttonWrapper)
  console.log('[YT-SEO-BR] Botão injetado no header com sucesso')
}

// Função para alternar a sidebar
function toggleSidebar() {
  console.log('[YT-SEO-BR] Toggle sidebar chamado. Injetado:', sidebarInjected)
  if (sidebarInjected) {
    if (sidebarContainer) {
      const isHidden = sidebarContainer.style.display === 'none'
      sidebarContainer.style.display = isHidden ? 'flex' : 'none'
      console.log('[YT-SEO-BR] Sidebar toggled. Display:', sidebarContainer.style.display)
    }
  } else {
    injectSidebar()
  }
}

// Função para injetar a sidebar como iframe
function injectSidebar() {
  if (sidebarInjected) return

  console.log('[YT-SEO-BR] Injetando sidebar...')

  // Criar container para a sidebar
  sidebarContainer = document.createElement('div')
  sidebarContainer.id = 'yt-seo-br-sidebar-container'
  sidebarContainer.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 420px;
    height: 100vh;
    z-index: 9999;
    background: #0f0f0f;
    box-shadow: -2px 0 12px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    border-left: 1px solid #272727;
    font-family: Roboto, system-ui, Arial, sans-serif;
    color: #fff;
    overflow: hidden;
  `

  // Criar iframe para carregar a sidebar
  const iframe = document.createElement('iframe')
  iframe.id = 'yt-seo-br-sidebar-iframe'
  iframe.style.cssText = `
    border: none;
    width: 100%;
    height: 100%;
    background: #0f0f0f;
  `

  iframe.onload = () => {
    console.log('[YT-SEO-BR] Iframe carregado com sucesso')
  }

  iframe.onerror = (err) => {
    console.error('[YT-SEO-BR] Erro ao carregar iframe:', err)
  }

  // Obter o URL do sidebar.html
  const sidebarUrl = chrome.runtime.getURL('sidebar.html')
  console.log('[YT-SEO-BR] Carregando sidebar de:', sidebarUrl)

  iframe.src = sidebarUrl
  sidebarContainer.appendChild(iframe)

  document.body.appendChild(sidebarContainer)
  sidebarInjected = true
  console.log('[YT-SEO-BR] Sidebar injetada com sucesso')
}

// Monitorar mudanças de rota (SPA) usando History API
function observeRouteChanges() {
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState

  history.pushState = function(...args) {
    originalPushState.apply(this, args)
    setTimeout(onRouteChange, 500)
    return true
  }

  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args)
    setTimeout(onRouteChange, 500)
    return true
  }

  window.addEventListener('popstate', onRouteChange)
  
  console.log('[YT-SEO-BR] Observando mudanças de rota')
}

function onRouteChange() {
  if (isVideoDetailsPage()) {
    setTimeout(injectButton, 2000) // Aguardar carregamento da página
  } else {
    // Remover botão se não estiver na página certa
    const button = document.querySelector('.yt-seo-br-button')
    if (button) button.remove()

    // Esconder sidebar
    if (sidebarContainer) {
      sidebarContainer.style.display = 'none'
    }
  }
}

// Inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

function init() {
  console.log('[YT-SEO-BR] Content script inicializado')
  observeRouteChanges()
  onRouteChange()
}