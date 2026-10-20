/* =====================================================================
   Vitrine do artista solo — não depende do motor de agenda.
   - links de WhatsApp ([data-zap]) montados a partir do config
   - amostra do portfólio na capa (#mural-capa) e grade filtrável
     no portfolio.html (#port-filtros / #port-grade, ?cat=<id>)
   - foto ampliada com anterior/próxima (setas do teclado e toque)
   - menu do celular, topo que encolhe, revelação suave ao rolar
   - botão flutuante, mapa
   ===================================================================== */
(function () {
  'use strict';

  var CFG = window.TV;
  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  var ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();
  if (CFG.modoDemo && $('#faixa-demo')) $('#faixa-demo').hidden = false;

  /* ---- WhatsApp: número (wa.me/55...) ou link curto do WhatsApp Business ---- */
  var zap = CFG.whatsapp ? 'https://wa.me/' + CFG.whatsapp : (CFG.zapLink || '');
  $$('[data-zap]').forEach(function (a) {
    if (!zap) { a.hidden = true; return; }
    var txt = a.getAttribute('data-zap');
    a.href = CFG.whatsapp && txt ? zap + '?text=' + encodeURIComponent(txt) : zap;
    a.target = '_blank'; a.rel = 'noopener';
  });
  $$('[data-zap-visivel]').forEach(function (n) { n.textContent = CFG.whatsappVisivel || 'WhatsApp'; });

  /* ---- menu do celular ---- */
  var menuBtn = $('#menu-btn'), menu = $('#menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      menuBtn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      document.body.classList.toggle('menu-aberto', aberto);
    });
    menu.addEventListener('click', function (ev) {
      if (ev.target.closest('a')) {
        menu.classList.remove('aberto'); menuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-aberto');
      }
    });
  }

  /* ---- topo encolhe depois da primeira rolagem ---- */
  var topo = $('.topo');
  function rolou() { if (topo) topo.classList.toggle('rolou', window.scrollY > 24); }
  window.addEventListener('scroll', rolou, { passive: true });
  rolou();

  /* ---- link com âncora: a página cresce depois de montar mural e pedido ---- */
  window.addEventListener('load', function () {
    var alvo = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
    if (alvo) setTimeout(function () { alvo.scrollIntoView(); }, 150);
  });

  /* ---- foto ampliada com navegação ---- */
  var lupa = null, serie = [], pos = 0, toqueX = null;
  function montaLupa() {
    lupa = el('dialog', 'lupa');
    lupa.setAttribute('aria-label', 'Foto ampliada');
    var fig = el('figure', 'lupa-fig');
    fig.appendChild(el('img'));
    var leg = el('figcaption', 'lupa-leg');
    leg.appendChild(el('span', 'lupa-num'));
    leg.appendChild(el('span', 'lupa-txt'));
    fig.appendChild(leg);
    lupa.appendChild(fig);
    [['lupa-ant', 'Foto anterior', '‹', -1], ['lupa-prox', 'Próxima foto', '›', 1]].forEach(function (b) {
      var x = el('button', 'lupa-nav ' + b[0], b[2]);
      x.type = 'button'; x.setAttribute('aria-label', b[1]);
      x.addEventListener('click', function (ev) { ev.stopPropagation(); mostra(pos + b[3]); });
      lupa.appendChild(x);
    });
    var fecha = el('button', 'lupa-fechar', 'Fechar');
    fecha.type = 'button';
    fecha.addEventListener('click', function () { lupa.close(); });
    lupa.appendChild(fecha);
    lupa.addEventListener('click', function (ev) { if (ev.target === lupa) lupa.close(); });
    lupa.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft') mostra(pos - 1);
      if (ev.key === 'ArrowRight') mostra(pos + 1);
    });
    lupa.addEventListener('touchstart', function (ev) { toqueX = ev.touches[0].clientX; }, { passive: true });
    lupa.addEventListener('touchend', function (ev) {
      if (toqueX == null) return;
      var dx = ev.changedTouches[0].clientX - toqueX; toqueX = null;
      if (Math.abs(dx) > 50) mostra(pos + (dx < 0 ? 1 : -1));
    });
    document.body.appendChild(lupa);
  }
  function mostra(i) {
    pos = (i + serie.length) % serie.length;
    var f = serie[pos], im = lupa.querySelector('img');
    im.src = f.src; im.alt = f.alt;
    lupa.querySelector('.lupa-num').textContent = String(pos + 1).padStart(2, '0') + ' / ' + String(serie.length).padStart(2, '0');
    lupa.querySelector('.lupa-txt').textContent = f.alt;
    var uma = serie.length < 2;
    lupa.querySelector('.lupa-ant').hidden = uma; lupa.querySelector('.lupa-prox').hidden = uma;
  }
  function amplia(fotos, i) {
    if (!lupa) montaLupa();
    serie = fotos;
    mostra(i);
    if (lupa.showModal) { if (!lupa.open) lupa.showModal(); } else window.open(fotos[i].src, '_blank');
  }

  function nomeCat(id) {
    var c = (CFG.categorias || []).filter(function (x) { return x.id === id; })[0];
    return c ? c.nome : id;
  }
  function peca(f, i, fotos, numerada) {
    var fig = el('figure', 'peca');
    var b = el('button', 'peca-foto');
    b.type = 'button';
    b.setAttribute('aria-label', 'Ampliar: ' + f.alt);
    var im = el('img'); im.src = f.src; im.alt = f.alt; im.loading = 'lazy';
    if (f.pos) im.style.objectPosition = f.pos;
    b.appendChild(im);
    b.addEventListener('click', function () { amplia(fotos, i); });
    fig.appendChild(b);
    var cap = el('figcaption');
    if (numerada) cap.appendChild(el('span', 'peca-num', 'Nº ' + String(i + 1).padStart(2, '0')));
    cap.appendChild(el('span', 'peca-alt', f.alt));
    if (f.cats && f.cats.length) cap.appendChild(el('span', 'peca-cat', f.cats.map(nomeCat).join(' · ')));
    fig.appendChild(cap);
    return fig;
  }
  function mural(alvo, fotos, numerada) {
    alvo.innerHTML = '';
    fotos.forEach(function (f, i) { alvo.appendChild(peca(f, i, fotos, numerada)); });
  }

  // capa: amostra (data-max) e, se pedir, só uma categoria (data-cat)
  var PORT = CFG.portfolio || [];
  $$('[data-mural]').forEach(function (alvo) {
    var cat = alvo.getAttribute('data-cat');
    var fotos = cat ? PORT.filter(function (f) { return (f.cats || []).indexOf(cat) >= 0; }) : PORT;
    mural(alvo, fotos.slice(0, +alvo.getAttribute('data-max') || 99), alvo.hasAttribute('data-numerada'));
  });

  /* ---- portfólio completo com filtro por categoria ---- */
  var grade = $('#port-grade'), filtros = $('#port-filtros');
  if (grade && filtros) {
    var atual = new URLSearchParams(location.search).get('cat') || 'todos';
    var conta = $('#port-contagem');
    var pinta = function () {
      var fotos = atual === 'todos' ? PORT : PORT.filter(function (f) { return (f.cats || []).indexOf(atual) >= 0; });
      mural(grade, fotos, true);
      $$('#port-filtros button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-cat') === atual ? 'true' : 'false'); });
      if (conta) conta.textContent = fotos.length + (fotos.length === 1 ? ' peça' : ' peças') + (atual === 'todos' ? '' : ' em ' + nomeCat(atual));
      var d = $('#port-cat-desc'), c = (CFG.categorias || []).filter(function (x) { return x.id === atual; })[0];
      if (d) d.textContent = c && c.desc ? c.desc : (CFG.portfolioDesc || '');
    };
    [{ id: 'todos', nome: 'Todas' }].concat(CFG.categorias || []).forEach(function (c) {
      var n = c.id === 'todos' ? PORT.length : PORT.filter(function (f) { return (f.cats || []).indexOf(c.id) >= 0; }).length;
      if (!n) return;
      var b = el('button', 'filtro-cat');
      b.type = 'button'; b.setAttribute('data-cat', c.id);
      b.appendChild(el('span', null, c.nome));
      b.appendChild(el('small', null, String(n)));
      b.addEventListener('click', function () {
        atual = c.id; pinta();
        try { history.replaceState(null, '', c.id === 'todos' ? location.pathname : '?cat=' + c.id); } catch (e) {}
      });
      filtros.appendChild(b);
    });
    pinta();
  }

  /* ---- revelação suave ao rolar ---- */
  var revela = $$('[data-revela]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revela.forEach(function (n) { n.classList.add('revela'); obs.observe(n); });
  }

  /* ---- botão flutuante some no topo e quando o pedido está na tela ---- */
  var flutua = $('.flutua'), agendar = $('#agendar');
  if (flutua) {
    var aVista = false;
    var atualiza = function () { flutua.classList.toggle('some', window.scrollY < window.innerHeight * 0.7 || aVista); };
    if (agendar && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { aVista = es[0].isIntersecting; atualiza(); }, { threshold: 0.05 }).observe(agendar);
    }
    window.addEventListener('scroll', atualiza, { passive: true });
    atualiza();
  }

  /* ---- mapa ---- */
  var mapa = $('#mapa');
  if (mapa && CFG.endereco && CFG.endereco.embed) {
    var ifr = el('iframe');
    ifr.src = CFG.endereco.embed; ifr.loading = 'lazy'; ifr.title = 'Mapa: ' + CFG.endereco.busca;
    ifr.referrerPolicy = 'no-referrer-when-downgrade';
    mapa.appendChild(ifr);
  }
})();
