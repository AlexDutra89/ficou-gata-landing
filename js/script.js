const camisasFotos = [
  { url: 'imagens/camisas/Camisa Over.webp', nome: 'Camisa Over' },
  { url: 'imagens/camisas/Camisa Social Linho.webp', nome: 'Camisa Social Linho' },
  { url: 'imagens/camisas/Camisa Social Viscolinho Azul.webp', nome: 'Camisa Social Viscolinho Azul' },
  { url: 'imagens/camisas/Camisa Social Viscolinho Rosa.webp', nome: 'Camisa Social Viscolinho Rosa' },
  { url: 'imagens/camisas/Camisa Social Viscolinho.webp', nome: 'Camisa Social Viscolinho' },
];

const blusinhasFotos = [
  { url: 'imagens/blusinhas/Regata em Viscose.webp', nome: 'Regata em Viscose' },
  { url: 'imagens/blusinhas/2.webp', nome: 'Regata em Viscose' },
  { url: 'imagens/blusinhas/3.webp', nome: 'Regata em Viscose' },
  { url: 'imagens/blusinhas/4.webp', nome: 'Regata em Viscose' },
  { url: 'imagens/blusinhas/5.webp', nome: 'Regata em Viscose' },
  { url: 'imagens/blusinhas/6.webp', nome: 'Regata em Viscose' },
];

const bodysFotos = [
  { url: 'imagens/bodys/Body Poliamida Amarelo.webp', nome: 'Body Poliamida Amarelo' },
  { url: 'imagens/bodys/Body Poliamida Marrom.webp', nome: 'Body Poliamida Marrom' },
  { url: 'imagens/bodys/Body Poliamida Preto.webp', nome: 'Body Poliamida Preto' },
  { url: 'imagens/bodys/Body Renda.webp', nome: 'Body Renda' },
  { url: 'imagens/bodys/Body Suplex.webp', nome: 'Body Suplex' },
  { url: 'imagens/bodys/Body Trapeado Tule.webp', nome: 'Body Trapeado Tule' },
  { url: 'imagens/bodys/Body Tule.webp', nome: 'Body Tule' },
];

const calcasFotos = [
  { url: 'imagens/calcas/Calça Alfaiataria.webp', nome: 'Calça Alfaiataria' },
  { url: 'imagens/calcas/Calça Pantalona Alfaiataria.webp', nome: 'Calça Pantalona Alfaiataria' },
  { url: 'imagens/calcas/Calça Pantalona Onça.webp', nome: 'Calça Pantalona Onça' },
  { url: 'imagens/calcas/Calça Pantalona.webp', nome: 'Calça Pantalona' },
  { url: 'imagens/calcas/Calça Skiny Courino.webp', nome: 'Calça Skiny Courino' },
];

const conjuntosFotos = [
  { url: 'imagens/conjuntos/Conjunto Alfaiataria.webp', nome: 'Conjunto Alfaiataria' },
  { url: 'imagens/conjuntos/Conjunto em Linho.webp', nome: 'Conjunto em Linho' },
];

const tshirtsFotos = [
  { url: 'imagens/tshirts/Camiseta de Algodão (2).webp', nome: 'Camiseta de Algodão' },
  { url: 'imagens/tshirts/Camiseta de Algodão (3).webp', nome: 'Camiseta de Algodão' },
  { url: 'imagens/tshirts/Camiseta de Algodão.webp', nome: 'Camiseta de Algodão' },
];

function renderCategoria(id, fotos, categoriaNome){
  const el = document.getElementById(id + 'Carrossel');
  if (!el) return;
  el.innerHTML = fotos.map(function(foto){
    const nomeEscapado = foto.nome.replace(/'/g, "\\'");
    return `
      <div class="cat-card">
        <div class="cat-photo" style="background-image:url('${encodeURI(foto.url)}')">
          <button type="button" class="cat-view-btn" onclick="event.stopPropagation(); abrirVisualizacao(this)">Visualizar</button>
        </div>
        <p class="cat-produto">${foto.nome}</p>
        <button type="button" class="cat-add" onclick="addToCart('${categoriaNome}', '${nomeEscapado}')">+ Adicionar à sacola</button>
      </div>
    `;
  }).join('');
}

function ajustarCarrossel(id){
  const el = document.getElementById(id + 'Carrossel');
  const wrap = el ? el.closest('.carrossel-wrap') : null;
  if (!el || !wrap) return;
  const setaEsq = wrap.querySelector('.carrossel-seta-esq');
  const setaDir = wrap.querySelector('.carrossel-seta-dir');
  const temOverflow = el.scrollWidth > el.clientWidth + 4;
  if (setaEsq) setaEsq.hidden = !temOverflow;
  if (setaDir) setaDir.hidden = !temOverflow;
  el.classList.toggle('carrossel-centralizado', !temOverflow);
}

const CATEGORIAS_IDS = ['camisas', 'blusinhas', 'conjuntos', 'tshirts', 'bodys', 'calcas'];

renderCategoria('camisas', camisasFotos, 'Camisas');
renderCategoria('blusinhas', blusinhasFotos, 'Blusinhas');
renderCategoria('conjuntos', conjuntosFotos, 'Conjuntos');
renderCategoria('tshirts', tshirtsFotos, 'T-shirts');
renderCategoria('bodys', bodysFotos, 'Bodys');
renderCategoria('calcas', calcasFotos, 'Calças');

CATEGORIAS_IDS.forEach(ajustarCarrossel);
window.addEventListener('resize', function(){
  CATEGORIAS_IDS.forEach(ajustarCarrossel);
});

function scrollCategoria(id, direcao){
  const el = document.getElementById(id + 'Carrossel');
  if (!el) return;
  el.scrollBy({ left: direcao * 280, behavior: 'smooth' });
}

const heroCarrossel = [
  { foto: camisasFotos[0].url, card: 'camisas' },
  { foto: blusinhasFotos[0].url, card: 'blusinhas' },
  { foto: conjuntosFotos[0].url, card: 'conjuntos' },
  { foto: tshirtsFotos[0].url, card: 'tshirts' },
  { foto: bodysFotos[0].url, card: 'bodys' },
  { foto: calcasFotos[0].url, card: 'calcas' },
];
let heroCarrosselIndex = 0;
const heroCarrosselEl = document.getElementById('heroCarrossel');
function setHeroCarrosselFoto() {
  heroCarrosselEl.style.backgroundImage = `url('${encodeURI(heroCarrossel[heroCarrosselIndex].foto)}')`;
}
if (heroCarrosselEl) {
  setHeroCarrosselFoto();
  setInterval(() => {
    heroCarrosselIndex = (heroCarrosselIndex + 1) % heroCarrossel.length;
    setHeroCarrosselFoto();
  }, 3000);
}
function heroCarrosselClick() {
  const cardEl = document.getElementById(heroCarrossel[heroCarrosselIndex].card);
  if (cardEl) cardEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}

function abrirVisualizacao(botao){
  const foto = botao.closest('.cat-photo');
  const bg = foto.style.backgroundImage;
  const url = bg.slice(bg.indexOf('(') + 1, bg.lastIndexOf(')')).replace(/["']/g, '');
  const overlay = document.getElementById('visualizadorOverlay');
  const img = document.getElementById('visualizadorImg');
  img.src = url;
  overlay.hidden = false;
}

function fecharVisualizacao(){
  document.getElementById('visualizadorOverlay').hidden = true;
}

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }));

const WHATS_NUMBER = '5511953387908';
let cart = [];

function addToCart(categoria, nomeProduto){
  const existing = cart.find(item => item.categoria === categoria && item.nomeProduto === nomeProduto);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ categoria, nomeProduto, qty: 1 });
  }
  renderCart();
}

function removeFromCart(index){
  cart.splice(index, 1);
  renderCart();
}

function renderCart(){
  const itemsEl = document.getElementById('cartItems');
  const countEl = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('cartCheckout');
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  if (totalQty > 0) {
    countEl.hidden = false;
    countEl.textContent = totalQty;
  } else {
    countEl.hidden = true;
    countEl.textContent = '0';
  }
  checkoutBtn.disabled = cart.length === 0;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Sua sacola está vazia.</p>';
    return;
  }

  itemsEl.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <p class="cart-item-name">${item.categoria}<span>${item.nomeProduto} — Quantidade: ${item.qty}</span></p>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" aria-label="Remover">&times;</button>
    </div>
  `).join('');
}

function toggleCart(force){
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const open = typeof force === 'boolean' ? force : drawer.hidden;
  drawer.hidden = !open;
  overlay.hidden = !open;
  drawer.setAttribute('aria-hidden', String(!open));
}

function checkoutWhatsApp(){
  if (cart.length === 0) return;
  const linhas = cart.map(item => `- ${item.categoria} (${item.nomeProduto} - qtd: ${item.qty})`).join('\n');
  const mensagem = `Olá, vim do site e gostaria de mais informações sobre essa(s) peça(s):\n${linhas}`;
  const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
  cart = [];
  renderCart();
  toggleCart(false);
}

/* ================= FORMULÁRIO DE CONTATO ================= */
// URL do Google Apps Script (Web App) que grava cada envio na planilha.
// Não é uma senha nem uma chave secreta — é só o endereço público do
// "recebedor" que você mesmo publica na sua conta Google.
// Troque o valor abaixo pela URL gerada no passo de implantação (termina em /exec).
const CONTATO_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzFQgJto5Drzif8xE2TXxek_p8hcKe9vRul7Rxd7nhNfRRD3xFzuxvLaBk5U4UBB7hIPw/exec';

(function(){
  const form = document.getElementById('contatoForm');
  if (!form) return;

  const successBox = document.getElementById('contatoSuccess');
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabelOriginal = submitBtn.textContent;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlConfigurada = CONTATO_SHEET_URL && CONTATO_SHEET_URL.indexOf('SUBSTITUA') === -1;

  function setError(fieldEl, show, mensagemAlternativa){
    fieldEl.classList.toggle('has-error', show);
    if (show) {
      const msgEl = fieldEl.querySelector('.form-error-msg');
      if (msgEl && mensagemAlternativa) msgEl.textContent = mensagemAlternativa;
    }
  }

  function validarContato(){
    let valido = true;
    let primeiroInvalido = null;

    const nomeGroup = form.querySelector('[data-field="nome"]');
    const nomeVal = form.contatoNome.value.trim();
    const nomeInvalido = nomeVal === '';
    setError(nomeGroup, nomeInvalido);
    if (nomeInvalido) { valido = false; primeiroInvalido = primeiroInvalido || form.contatoNome; }

    const emailGroup = form.querySelector('[data-field="email"]');
    const emailVal = form.contatoEmail.value.trim();
    const emailMsgEl = emailGroup.querySelector('.form-error-msg');
    let emailInvalido = false;
    if (emailVal === '') {
      emailInvalido = true;
      if (emailMsgEl) emailMsgEl.textContent = emailMsgEl.dataset.empty;
    } else if (!emailRegex.test(emailVal)) {
      emailInvalido = true;
      if (emailMsgEl) emailMsgEl.textContent = emailMsgEl.dataset.invalid;
    }
    setError(emailGroup, emailInvalido);
    if (emailInvalido) { valido = false; primeiroInvalido = primeiroInvalido || form.contatoEmail; }

    const mensagemGroup = form.querySelector('[data-field="mensagem"]');
    const mensagemVal = form.contatoMensagem.value.trim();
    const mensagemInvalida = mensagemVal === '';
    setError(mensagemGroup, mensagemInvalida);
    if (mensagemInvalida) { valido = false; primeiroInvalido = primeiroInvalido || form.contatoMensagem; }

    // telefone é opcional, não bloqueia o envio

    if (!valido && primeiroInvalido) primeiroInvalido.focus();
    return valido;
  }

  // limpa o erro assim que a pessoa corrige o campo
  ['contatoNome','contatoEmail','contatoMensagem'].forEach(function(id){
    form[id].addEventListener('input', function(){
      const group = this.closest('.form-group');
      if (group.classList.contains('has-error')) {
        setError(group, false);
      }
    });
  });

  function mostrarSucesso(){
    form.hidden = true;
    successBox.classList.remove('show-error');
    successBox.classList.add('show');
  }

  function mostrarErroEnvio(){
    submitBtn.disabled = false;
    submitBtn.textContent = submitLabelOriginal;
    const erroEl = form.querySelector('.form-envio-erro');
    if (erroEl) erroEl.hidden = false;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!validarContato()) return;

    const erroEl = form.querySelector('.form-envio-erro');
    if (erroEl) erroEl.hidden = true;

    if (!urlConfigurada) {
      // a URL do Apps Script ainda não foi configurada: mostra a confirmação
      // na tela normalmente, mas avisa no console pra quem estiver testando
      console.warn('CONTATO_SHEET_URL não configurada — o envio não está sendo salvo na planilha.');
      mostrarSucesso();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const dados = new URLSearchParams({
      nome: form.contatoNome.value.trim(),
      email: form.contatoEmail.value.trim(),
      telefone: form.contatoTelefone.value.trim(),
      mensagem: form.contatoMensagem.value.trim()
    });

    fetch(CONTATO_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: dados
    })
      .then(function(){
        // com "no-cors" não dá pra ler a resposta do Apps Script,
        // então tratamos "sem erro de rede" como envio ok
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabelOriginal;
        mostrarSucesso();
      })
      .catch(function(err){
        console.error('Falha ao enviar para a planilha:', err);
        mostrarErroEnvio();
      });
  });

  window.resetContatoForm = function(){
    form.reset();
    form.querySelectorAll('.form-group').forEach(function(group){ group.classList.remove('has-error'); });
    successBox.classList.remove('show');
    form.hidden = false;
    form.contatoNome.focus();
  };
})();
