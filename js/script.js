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

function initMagicRings(mountEl, opts){
  opts = Object.assign({
    color: '#C98B93', colorTwo: '#FAF6F2', speed: 0.6, ringCount: 5,
    attenuation: 10, lineThickness: 2, baseRadius: 0.3, radiusStep: 0.12,
    scaleRate: 0.1, opacity: 0.45, blur: 0, noiseAmount: 0.06, rotation: 0,
    ringGap: 1.5, fadeIn: 0.7, fadeOut: 0.5, followMouse: false,
    mouseInfluence: 0.2, hoverScale: 1.2, parallax: 0.05, clickBurst: false,
    alphaMode: 'luminance'
  }, opts || {});

  if (!window.THREE || !mountEl) return;

  // Quem ativou "reduzir movimento" no sistema vê um quadro parado dos anéis
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true }); }
  catch (e) { return; }
  if (!renderer.capabilities.isWebGL2) { renderer.dispose(); return; }

  renderer.setClearColor(0x000000, 0);
  mountEl.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
  camera.position.z = 1;

  var vertexShader = [
    'void main() {',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n');

  var fragmentShader = [
    'precision highp float;',
    'uniform float uTime, uAttenuation, uLineThickness;',
    'uniform float uBaseRadius, uRadiusStep, uScaleRate;',
    'uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;',
    'uniform float uFadeIn, uFadeOut;',
    'uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;',
    'uniform float uCoverageAlpha;',
    'uniform vec2 uResolution, uMouse;',
    'uniform vec3 uColor, uColorTwo;',
    'uniform int uRingCount;',
    'const float HP = 1.5707963;',
    'const float CYCLE = 3.45;',
    'float fade(float t) {',
    '  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);',
    '}',
    'float ring(vec2 p, float ri, float cut, float t0, float px) {',
    '  float t = mod(uTime + t0, CYCLE);',
    '  float r = ri + t / CYCLE * uScaleRate;',
    '  float d = abs(length(p) - r);',
    '  float a = atan(abs(p.y), abs(p.x)) / HP;',
    '  float th = max(1.0 - a, 0.5) * px * uLineThickness;',
    '  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;',
    '  d += pow(cut * a, 3.0) * r;',
    '  return h * exp(-uAttenuation * d) * fade(t);',
    '}',
    'void main() {',
    '  float px = 1.0 / min(uResolution.x, uResolution.y);',
    '  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;',
    '  float cr = cos(uRotation), sr = sin(uRotation);',
    '  p = mat2(cr, -sr, sr, cr) * p;',
    '  p -= uMouse * uMouseInfluence;',
    '  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;',
    '  p /= sc;',
    '  vec3 c = vec3(0.0);',
    '  float coverage = 0.0;',
    '  float rcf = max(float(uRingCount) - 1.0, 1.0);',
    '  for (int i = 0; i < 10; i++) {',
    '    if (i >= uRingCount) break;',
    '    float fi = float(i);',
    '    vec2 pr = p - fi * uParallax * uMouse;',
    '    vec3 rc = mix(uColor, uColorTwo, fi / rcf);',
    '    float ringAmount = ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px);',
    '    c = mix(c, rc, vec3(ringAmount));',
    '    coverage = max(coverage, ringAmount);',
    '  }',
    '  c *= 1.0 + uBurst * 2.0;',
    '  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);',
    '  c += (n - 0.5) * uNoiseAmount;',
    '  float intensity = max(c.r, max(c.g, c.b));',
    '  vec3 emissiveColor = intensity > 0.0001 ? clamp(c / intensity, 0.0, 1.0) : vec3(0.0);',
    '  vec3 outputColor = mix(emissiveColor, clamp(c, 0.0, 1.0), uCoverageAlpha);',
    '  float outputAlpha = mix(intensity, coverage, uCoverageAlpha);',
    '  gl_FragColor = vec4(outputColor, clamp(outputAlpha * uOpacity, 0.0, 1.0));',
    '}'
  ].join('\n');

  var uniforms = {
    uTime: { value: 0 }, uAttenuation: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uColor: { value: new THREE.Color() }, uColorTwo: { value: new THREE.Color() },
    uLineThickness: { value: 0 }, uBaseRadius: { value: 0 }, uRadiusStep: { value: 0 },
    uScaleRate: { value: 0 }, uRingCount: { value: 0 }, uOpacity: { value: 1 },
    uNoiseAmount: { value: 0 }, uRotation: { value: 0 }, uRingGap: { value: 1.6 },
    uFadeIn: { value: 0.5 }, uFadeOut: { value: 0.75 }, uMouse: { value: new THREE.Vector2() },
    uMouseInfluence: { value: 0 }, uHoverAmount: { value: 0 }, uHoverScale: { value: 1 },
    uParallax: { value: 0 }, uBurst: { value: 0 }, uCoverageAlpha: { value: 0 }
  };

  var material = new THREE.ShaderMaterial({ vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, transparent: true });
  var quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  scene.add(quad);

  function resize(){
    var w = mountEl.clientWidth, h = mountEl.clientHeight;
    var dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(w, h);
    renderer.setPixelRatio(dpr);
    uniforms.uResolution.value.set(w * dpr, h * dpr);
    // setSize limpa o canvas; no modo parado, redesenha o quadro
    if (reduceMotion && hasRendered) renderer.render(scene, camera);
  }
  var hasRendered = false;
  resize();
  window.addEventListener('resize', resize);
  var ro = new ResizeObserver(resize);
  ro.observe(mountEl);

  var mouse = [0, 0], smoothMouse = [0, 0], hoverAmount = 0, isHovered = false, burst = 0;

  var frameId = 0, isVisible = false, isPageVisible = !document.hidden, elapsed = reduceMotion ? 1.2 : 0, lastT = 0;
  function animate(t){
    frameId = requestAnimationFrame(animate);
    var dt = lastT === 0 ? 0 : Math.min(t - lastT, 100);
    lastT = t;
    elapsed += dt * 0.001 * opts.speed;
    smoothMouse[0] += (mouse[0] - smoothMouse[0]) * 0.08;
    smoothMouse[1] += (mouse[1] - smoothMouse[1]) * 0.08;
    hoverAmount += ((isHovered ? 1 : 0) - hoverAmount) * 0.08;
    burst *= 0.95; if (burst < 0.001) burst = 0;

    uniforms.uTime.value = elapsed;
    uniforms.uAttenuation.value = opts.attenuation;
    uniforms.uColor.value.set(opts.color);
    uniforms.uColorTwo.value.set(opts.colorTwo);
    uniforms.uLineThickness.value = opts.lineThickness;
    uniforms.uBaseRadius.value = opts.baseRadius;
    uniforms.uRadiusStep.value = opts.radiusStep;
    uniforms.uScaleRate.value = opts.scaleRate;
    uniforms.uRingCount.value = opts.ringCount;
    uniforms.uOpacity.value = opts.opacity;
    uniforms.uNoiseAmount.value = opts.noiseAmount;
    uniforms.uRotation.value = (opts.rotation * Math.PI) / 180;
    uniforms.uRingGap.value = opts.ringGap;
    uniforms.uFadeIn.value = opts.fadeIn;
    uniforms.uFadeOut.value = opts.fadeOut;
    uniforms.uMouse.value.set(smoothMouse[0], smoothMouse[1]);
    uniforms.uMouseInfluence.value = opts.followMouse ? opts.mouseInfluence : 0;
    uniforms.uHoverAmount.value = hoverAmount;
    uniforms.uHoverScale.value = opts.hoverScale;
    uniforms.uParallax.value = opts.parallax;
    uniforms.uBurst.value = opts.clickBurst ? burst : 0;
    uniforms.uCoverageAlpha.value = opts.alphaMode === 'coverage' ? 1 : 0;

    renderer.render(scene, camera);
    hasRendered = true;
    if (reduceMotion) tryStop();
  }

  function tryStart(){ if (isVisible && isPageVisible && frameId === 0) { lastT = 0; frameId = requestAnimationFrame(animate); } }
  function tryStop(){ if (frameId !== 0) { cancelAnimationFrame(frameId); frameId = 0; } }

  var io = new IntersectionObserver(function(entries){
    isVisible = entries[0].isIntersecting;
    isVisible ? tryStart() : tryStop();
  }, { threshold: 0 });
  io.observe(mountEl);

  document.addEventListener('visibilitychange', function(){
    isPageVisible = !document.hidden;
    isPageVisible ? tryStart() : tryStop();
  });

  if (opts.blur > 0) mountEl.style.filter = 'blur(' + opts.blur + 'px)';

  tryStart();
}

var ctaRingsEl = document.getElementById('ctaFinalRings');
if (ctaRingsEl) {
  initMagicRings(ctaRingsEl, {
    color: '#C98B93',
    colorTwo: '#FAF6F2',
    ringCount: 5,
    speed: 0.6,
    opacity: 0.45,
    followMouse: false,
    clickBurst: false
  });
}
