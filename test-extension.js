// Script de Teste para YT-SEO-BR
// Cole isto no Console do DevTools da página do YouTube Studio

console.log('🔍 YT-SEO-BR Teste Iniciado');

// Test 1: Verificar se extensão está carregada
const testExtensionLoaded = () => {
  try {
    const url = chrome.runtime.getURL('sidebar.html');
    console.log('✓ Extensão carregada. URL:', url);
    return true;
  } catch (e) {
    console.error('✗ Extensão não carregada:', e);
    return false;
  }
};

// Test 2: Verificar se content script foi executado
const testContentScriptLoaded = () => {
  const result = window.__YT_SEO_BR_LOADED__ || false;
  if (result) {
    console.log('✓ Content script carregado');
  } else {
    console.warn('⚠ Content script pode não ter carregado (variável não definida)');
  }
  return result;
};

// Test 3: Verificar se estamos na página certa
const testPageDetection = () => {
  const isCorrectPage = window.location.href.includes('/video/') && 
                       window.location.href.includes('/edit');
  if (isCorrectPage) {
    console.log('✓ Estamos na página de detalhes do vídeo');
  } else {
    console.warn('⚠ Não estamos na página de detalhes. URL:', window.location.href);
  }
  return isCorrectPage;
};

// Test 4: Procurar pelo botão
const testButtonInjected = () => {
  const button = document.querySelector('.yt-seo-br-button');
  if (button) {
    console.log('✓ Botão encontrado:', button);
  } else {
    console.warn('⚠ Botão não encontrado. Procurando no header...');
    const header = document.querySelector('ytcp-header');
    if (header) {
      console.log('✓ Header encontrado:', header);
    } else {
      console.error('✗ Header não encontrado');
    }
  }
  return button !== null;
};

// Test 5: Procurar pela sidebar
const testSidebarInjected = () => {
  const sidebar = document.querySelector('#yt-seo-br-sidebar-container');
  if (sidebar) {
    console.log('✓ Sidebar encontrada:', sidebar);
    console.log('  Display:', sidebar.style.display);
    return true;
  } else {
    console.log('⚠ Sidebar ainda não foi injetada (clique no botão)');
    return false;
  }
};

// Test 6: Verificar iframe
const testIframeLoaded = () => {
  const iframe = document.querySelector('#yt-seo-br-sidebar-iframe');
  if (iframe) {
    console.log('✓ Iframe encontrado:', iframe);
    console.log('  Src:', iframe.src);
    return true;
  } else {
    console.log('⚠ Iframe não encontrado (abra a sidebar primeiro)');
    return false;
  }
};

// Run all tests
console.group('📋 Testes da Extensão');
testExtensionLoaded();
testContentScriptLoaded();
testPageDetection();
testButtonInjected();
testSidebarInjected();
testIframeLoaded();
console.groupEnd();

console.log('\n💡 Dicas:');
console.log('- Se o botão não aparecer, recarregue a página (F5)');
console.log('- Se a sidebar ficar branca, verifique os logs do iframe');
console.log('- Abra DevTools do iframe para inspecionar seu conteúdo');
console.log('\n✨ Fim do teste');
