/* =====================================================================
   Anderson Zaga — configuração
   Único arquivo que precisa ser editado para o site sair do modo de
   demonstração e entrar no ar de verdade.
   ===================================================================== */

window.TV = {

  /* ---- Artista ------------------------------------------------------ */
  nome:       'Anderson Zaga',
  slogan:     'Tatuagem realista · Black & Gray',
  assinatura: 'Fechamentos e coberturas exclusivas',
  instagram:  'zaga.tatuador',
  prefixoDemo: 'zg_',   // chaves da demo no navegador (agenda.js e admin.js usam o mesmo)
  demoUrl:    'https://nathamgil.github.io/zaga/',
  logo:       'fotos/marca.svg',

  // A bio usa um link curto do WhatsApp Business (wa.me/message/...), que
  // não aceita texto pronto: o site copia o resumo e abre a conversa.
  // O número em si: A CONFIRMAR (com ele, o resumo já vai escrito).
  whatsapp:        '',
  whatsappVisivel: '',
  zapLink:         'https://wa.me/message/3ERAF63AVIC2J1',

  // "ITC Salvador — Studio Privativo" (bio). Endereço completo: A CONFIRMAR.
  // Sem endereço confirmado o site não mostra mapa: diz que o local exato
  // vai na confirmação do agendamento.
  endereco: {
    linha1: 'ITC Salvador',
    linha2: 'Studio privativo · Salvador — BA',
    referencia: '',
    maps:   '',
    embed:  '',
    busca:  'ITC Salvador'
  },
  funcionamento: 'Studio privativo, com hora marcada',

  /* ---- Supabase ---------------------------------------------------
     Vazio = MODO DEMONSTRAÇÃO (tudo funciona, mas fica no navegador).
     Para ligar: veja o README (supabase.com -> schema.sql -> chaves aqui).
  ------------------------------------------------------------------ */
  supabaseUrl: '',
  supabaseKey: '',

  regras: { passoMin: 30, antecedenciaMin: 30, janelaDias: 30, cancelamentoH: 2 },
  semPreferencia: false,

  /* ---- Grade da agenda (0 = domingo) -------------------------------
     Só reserva tempo na agenda. Dias e horas A CONFIRMAR com o Zaga.
  ------------------------------------------------------------------ */
  expediente: {
    0: { aberto: false },
    1: { aberto: true, abre: '09:00', fecha: '19:00' },
    2: { aberto: true, abre: '09:00', fecha: '19:00' },
    3: { aberto: true, abre: '09:00', fecha: '19:00' },
    4: { aberto: true, abre: '09:00', fecha: '19:00' },
    5: { aberto: true, abre: '09:00', fecha: '19:00' },
    6: { aberto: true, abre: '09:00', fecha: '19:00' }
  },

  /* ---- O artista (o motor trabalha com lista; aqui é um só) -------- */
  artistas: [
    {
      slug: 'zaga', nome: 'Anderson Zaga', apelido: 'Zaga', instagram: 'zaga.tatuador',
      whatsapp: '', zapLink: 'https://wa.me/message/3ERAF63AVIC2J1',
      foto: 'fotos/zaga-perfil.jpg',
      oficio: 'Tatuador',
      linha: 'Tatuagem realista · Black & Gray',
      estilos: ['Realismo Black & Gray', 'Fechamentos', 'Coberturas exclusivas', 'Retratos', 'Fé e religião'],
      bio: [
        'Tatuagem realista em Black & Gray.',
        'Fechamentos e coberturas exclusivas.',
        'Studio privativo no ITC Salvador.',
        'Mentoria e workshop prático para tatuadores.'
      ]
    }
  ],

  /* ---- Portfólio (portfolio.html e amostras da capa) ----------------
     Fotos dos posts do @zaga.tatuador. cats = filtros do portfólio.
  ------------------------------------------------------------------ */
  categorias: [
    { id: 'fechamentos', nome: 'Costas fechadas', desc: 'Projetos de costas inteiras: uma cena só, do ombro à lombar.' },
    { id: 'animais',     nome: 'Animais',         desc: 'Leões, urso e águia: pelagem, pena e olhar em preto e cinza.' },
    { id: 'fe',          nome: 'Fé',              desc: 'Cristo, Maria e o arcanjo: luz e sombra a serviço da devoção.' },
    { id: 'retratos',    nome: 'Retratos',        desc: 'Rostos de quem importa, com a semelhança como regra.' },
    { id: 'braco',       nome: 'Braço e antebraço', desc: 'Peças de braço e antebraço com composição própria.' }
  ],
  portfolioDesc: 'Peças publicadas no Instagram @zaga.tatuador. Toque numa foto para ampliar.',
  portfolio: [
    { src: 'fotos/leao-filhotes-colunas-costas.jpg', alt: 'Leão com filhotes entre colunas, costas fechadas', cats: ['fechamentos', 'animais'] },
    { src: 'fotos/cristo-maria-costas.jpg',          alt: 'Cristo, Maria e a Santa Ceia, costas fechadas',   cats: ['fechamentos', 'fe'] },
    { src: 'fotos/urso-espartano-costas.jpg',        alt: 'Urso e guerreiro espartano, costas fechadas',     cats: ['fechamentos', 'animais'] },
    { src: 'fotos/retrato-heitor-peito.jpg',         alt: 'Retrato de criança com nome no peito',            cats: ['retratos'] },
    { src: 'fotos/arcanjo-costas.jpg',               alt: 'Arcanjo com espada, costas fechadas',             cats: ['fechamentos', 'fe'] },
    { src: 'fotos/aguia-leao-costas.jpg',            alt: 'Águia e leão, costas fechadas',                   cats: ['fechamentos', 'animais'] },
    { src: 'fotos/leoes-familia-costas.jpg',         alt: 'Leão, leoa e filhotes, costas fechadas',          cats: ['fechamentos', 'animais'] },
    { src: 'fotos/farol-bahia-antebraco.jpg',        alt: 'Farol da Barra e escudo do Bahia no antebraço',   cats: ['braco'] }
  ],

  /* ---- Tipo de projeto (passo 1 do pedido) -------------------------
     Nada tem preço fixo: tudo "sob orçamento" (preco 0).
     Durações A CONFIRMAR: só reservam o tempo certo na agenda.
     fechamento: true separa o relatório do painel em Peças × Fechamentos.
  ------------------------------------------------------------------ */
  servicosDemo: [
    { id:'projeto',      nome:'Projeto personalizado',             descricao:'30 min para alinhar a ideia, o local e as referências antes do desenho.', preco_centavos:0, a_partir_de:false, duracao_min:30,  categoria:'Começar' },
    { id:'peca',         nome:'Peça realista',                     descricao:'Uma peça em Black & Gray: antebraço, panturrilha, peito.',              preco_centavos:0, a_partir_de:false, duracao_min:240, categoria:'Peça única' },
    { id:'retrato',      nome:'Retrato',                           descricao:'Rosto de alguém especial, a partir da sua foto.',                       preco_centavos:0, a_partir_de:false, duracao_min:300, categoria:'Peça única' },
    { id:'fechamento',   nome:'Fechamento',                        descricao:'Costas, braço ou perna inteiros, numa cena só.',                         preco_centavos:0, a_partir_de:false, duracao_min:420, categoria:'Fechamento', fechamento:true },
    { id:'continuacao',  nome:'Sessão de fechamento em andamento', descricao:'Para quem já começou o fechamento com o Zaga.',                           preco_centavos:0, a_partir_de:false, duracao_min:420, categoria:'Fechamento', fechamento:true },
    { id:'cobertura',    nome:'Cobertura exclusiva',               descricao:'Avaliação da tattoo antiga e projeto novo por cima.',                    preco_centavos:0, a_partir_de:false, duracao_min:30,  categoria:'Cobertura' },
    { id:'retoque',      nome:'Retoque',                           descricao:'Para tattoo já cicatrizada que precisa de reforço.',                    preco_centavos:0, a_partir_de:false, duracao_min:60,  categoria:'Depois da sessão' }
  ],

  // Estilos do pedido: da bio (realismo Black & Gray) e do portfólio. A CONFIRMAR.
  estilos: ['Realismo Black & Gray', 'Retrato', 'Animais', 'Fé e religião', 'Mitologia e guerreiros', 'Cobertura', 'Trago minha referência', 'Ainda não sei']
};

// o motor chama os profissionais de "barbeiros" (nome herdado, não aparece na tela)
window.TV.barbeirosDemo = window.TV.artistas.map(function (a) {
  return { id: a.slug, slug: a.slug, nome: a.nome, foto: a.foto, instagram: a.instagram,
           whatsapp: a.whatsapp, cargo: a.linha };
});
window.TV.artistaPor = function (chave) {
  return window.TV.artistas.filter(function (a) {
    return a.slug === chave || a.nome === chave || a.instagram === chave;
  })[0] || null;
};
window.TV.modoDemo = !(window.TV.supabaseUrl && window.TV.supabaseKey);
