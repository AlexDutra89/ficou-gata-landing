const camisasFotos = [
  'imagens/camisas/1.webp',
  'imagens/camisas/2.webp',
  'imagens/camisas/3.webp',
  'imagens/camisas/4.webp',
  'imagens/camisas/5.webp',
];

const blusinhasFotos = [
  'imagens/blusinhas/Regata_em_Viscose.webp',
  'imagens/blusinhas/2.webp',
  'imagens/blusinhas/3.webp',
  'imagens/blusinhas/4.webp',
  'imagens/blusinhas/5.webp',
  'imagens/blusinhas/6.webp',
];

const bodysFotos = [
  'imagens/bodys/1.webp',
  'imagens/bodys/2.webp',
  'imagens/bodys/3.webp',
  'imagens/bodys/4.webp',
  'imagens/bodys/5.webp',
  'imagens/bodys/6.webp',
];

const calcasFotos = [
  'imagens/calcas/1.webp',
  'imagens/calcas/2.webp',
  'imagens/calcas/3.webp',
  'imagens/calcas/4.webp',
  'imagens/calcas/5.webp',
  'imagens/calcas/6.webp',
];

const conjuntosFotos = [
  'imagens/conjuntos/1.webp',
  'imagens/conjuntos/2.webp',
  'imagens/conjuntos/3.webp',
];

const tshirtsFotos = [
  'imagens/tshirts/1.webp',
  'imagens/tshirts/2.webp',
  'imagens/tshirts/3.webp',
];

let calcasIndex = 0;
const calcasFotoEl = document.getElementById('calcasFoto');
if (calcasFotoEl) {
  calcasFotoEl.style.backgroundImage = `url(${calcasFotos[0]})`;
}
function cycleCalcas(el) {
  calcasIndex = (calcasIndex + 1) % calcasFotos.length;
  el.style.backgroundImage = `url(${calcasFotos[calcasIndex]})`;
}

let bodysIndex = 0;
const bodysFotoEl = document.getElementById('bodysFoto');
if (bodysFotoEl) {
  bodysFotoEl.style.backgroundImage = `url(${bodysFotos[0]})`;
}
function cycleBodys(el) {
  bodysIndex = (bodysIndex + 1) % bodysFotos.length;
  el.style.backgroundImage = `url(${bodysFotos[bodysIndex]})`;
}
let blusinhasIndex = 0;
const blusinhasFotoEl = document.getElementById('blusinhasFoto');
if (blusinhasFotoEl) {
  blusinhasFotoEl.style.backgroundImage = `url(${blusinhasFotos[0]})`;
}
function cycleBlusinhas(el) {
  blusinhasIndex = (blusinhasIndex + 1) % blusinhasFotos.length;
  el.style.backgroundImage = `url(${blusinhasFotos[blusinhasIndex]})`;
}

let camisasIndex = 0;
const camisasFotoEl = document.getElementById('camisasFoto');
if (camisasFotoEl) {
  camisasFotoEl.style.backgroundImage = `url(${camisasFotos[0]})`;
}
function cycleCamisas(el) {
  camisasIndex = (camisasIndex + 1) % camisasFotos.length;
  el.style.backgroundImage = `url(${camisasFotos[camisasIndex]})`;
}

let conjuntosIndex = 0;
const conjuntosFotoEl = document.getElementById('conjuntosFoto');
if (conjuntosFotoEl) {
  conjuntosFotoEl.style.backgroundImage = `url(${conjuntosFotos[0]})`;
}
function cycleConjuntos(el) {
  conjuntosIndex = (conjuntosIndex + 1) % conjuntosFotos.length;
  el.style.backgroundImage = `url(${conjuntosFotos[conjuntosIndex]})`;
}

let tshirtsIndex = 0;
const tshirtsFotoEl = document.getElementById('tshirtsFoto');
if (tshirtsFotoEl) {
  tshirtsFotoEl.style.backgroundImage = `url(${tshirtsFotos[0]})`;
}
function cycleTshirts(el) {
  tshirtsIndex = (tshirtsIndex + 1) % tshirtsFotos.length;
  el.style.backgroundImage = `url(${tshirtsFotos[tshirtsIndex]})`;
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

function currentModelLabel(categoria){
  if (categoria === 'Blusinhas') return `Blusinhas - Modelo ${blusinhasIndex + 1}`;
  if (categoria === 'Calças') return `Calças - Modelo ${calcasIndex + 1}`;
  if (categoria === 'Bodys') return `Bodys - Modelo ${bodysIndex + 1}`;
  return categoria;
}

function addToCart(categoria){
  const label = currentModelLabel(categoria);
  const existing = cart.find(item => item.label === label);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ label, qty: 1 });
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
      <p class="cart-item-name">${item.label}<span>Quantidade: ${item.qty}</span></p>
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
  const linhas = cart.map(item => `- ${item.label} (qtd: ${item.qty})`).join('\n');
  const mensagem = `Olá, vim do site e gostaria de mais informações sobre essa(s) peça(s):\n${linhas}`;
  const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
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
