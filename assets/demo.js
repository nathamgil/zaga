/* =====================================================================
   Anderson Zaga — dados de EXEMPLO do modo demonstração (site e painel).
   Só roda com o Supabase desligado. Todos os clientes são fictícios e
   marcados "(exemplo)". Os valores em R$ também são fictícios: servem para
   mostrar o funil, não são tabela do artista.
   As "referências" usam fotos da pasta fotos/.
   Carrega depois de config.js e antes de agenda.js / admin.js.
   ===================================================================== */
(function () {
  'use strict';
  var CFG = window.TV;
  if (!CFG || !CFG.modoDemo) return;
  // prefixo das chaves do navegador: o mesmo que o motor (agenda.js) usa
  var PFX = CFG.prefixoDemo || 'dv_';
  var VERSAO = PFX + 'zaga_semeado_v1';
  try { if (localStorage.getItem(VERSAO)) return; } catch (e) { return; }

  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function aberto(d) { var e = (CFG.expediente || {})[d.getDay()]; return e ? !!e.aberto : d.getDay() !== 0; }
  // dia a partir de hoje; dia fechado (domingo) pula para o próximo dia aberto
  function dia(off) {
    var d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + off);
    for (var i = 0; i < 7 && !aberto(d); i++) d.setDate(d.getDate() + (off < 0 ? -1 : 1));
    return iso(d);
  }
  // próximo dia aberto a partir de uma data ISO (passo +1 ou -1)
  function outroDia(s, passo) {
    var p = s.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2], 12);
    do { d.setDate(d.getDate() + passo); } while (!aberto(d));
    return iso(d);
  }
  function criado(off, h) { var d = new Date(); d.setDate(d.getDate() + off); d.setHours(h || 10, 17, 0, 0); return d.toISOString(); }
  function min(t) { var p = t.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function hora(m) { return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }

  // nomes e durações de reserva, caso o config ainda não traga o serviço
  var SERV = {};
  (CFG.servicosDemo || []).forEach(function (s) { SERV[s.id] = s; });
  var NOME = {};
  (CFG.artistas || []).forEach(function (a) { NOME[a.slug] = a.nome; });

  function tattoo(estilo, local, tam, ideia, extra) {
    return ['Estilo: ' + estilo, 'Local: ' + local, 'Tamanho: ' + tam]
      .concat(extra || [], ['Ideia: ' + ideia]).join('\n');
  }

  // [artista, tipo de projeto, dia, início, cliente, etapa, obs, referências, valor, sinal, sinal pago, criado há n dias]
  var L = [
    ['zaga', 'projeto',     dia(1),  '10:00', 'Rafael C.',   'novo',      tattoo('Realismo Black & Gray', 'Costas inteiras (fechamento)', 'Fechamento (braço, perna ou costas)', 'Fechar as costas com leão, leoa e meus dois filhos como filhotes', ['Tattoo antiga na região: Não']), ['fotos/leoes-familia-costas.jpg'], 0, 0, false, 0],
    ['zaga', 'cobertura',   dia(2),  '11:00', 'Lucas M.',    'novo',      tattoo('Cobertura', 'Braço', '10 a 20 cm', 'Cobrir um tribal antigo no braço com algo realista', ['Tattoo antiga na região: Sim']), [], 0, 0, false, 0],
    ['zaga', 'retrato',     dia(9),  '09:00', 'Priscila A.', 'novo',      tattoo('Retrato', 'Peito', '10 a 20 cm', 'Retrato do meu filho sorrindo, com o nome dele embaixo'), ['fotos/retrato-heitor-peito.jpg'], 0, 0, false, -1],
    ['zaga', 'fechamento',  dia(3),  '09:00', 'Igor S.',     'conversa',  tattoo('Fé e religião', 'Costas inteiras (fechamento)', 'Fechamento (braço, perna ou costas)', 'Cristo e Maria com a Santa Ceia embaixo'), ['fotos/cristo-maria-costas.jpg'], 0, 0, false, -2],
    ['zaga', 'peca',        dia(5),  '13:00', 'Matheus R.',  'conversa',  tattoo('Animais', 'Antebraço', '10 a 20 cm', 'Farol da Barra com o escudo do Bahia'), ['fotos/farol-bahia-antebraco.jpg'], 0, 0, false, -3],
    ['zaga', 'fechamento',  dia(8),  '09:00', 'Daniel F.',   'orcado',    tattoo('Mitologia e guerreiros', 'Costas inteiras (fechamento)', 'Fechamento (braço, perna ou costas)', 'Urso rugindo e guerreiro espartano, costas inteiras'), ['fotos/urso-espartano-costas.jpg'], 800000, 100000, false, -4],
    ['zaga', 'cobertura',   dia(6),  '10:00', 'Vinícius T.', 'orcado',    tattoo('Cobertura', 'Ombro', '10 a 20 cm', 'Cobrir nome antigo no ombro com uma águia', ['Tattoo antiga na região: Sim']), [], 180000, 40000, true, -5],
    ['zaga', 'continuacao', dia(0),  '09:00', 'André L.',    'marcado',   tattoo('Fé e religião', 'Costas inteiras (fechamento)', 'Fechamento (braço, perna ou costas)', 'Segunda sessão do arcanjo: asas e sombra do fundo'), ['fotos/arcanjo-costas.jpg'], 0, 0, false, -12],
    ['zaga', 'retrato',     dia(4),  '09:00', 'Camila N.',   'marcado',   tattoo('Retrato', 'Antebraço', '10 a 20 cm', 'Retrato da minha avó'), [], 160000, 40000, true, -6],
    ['zaga', 'retoque',     dia(7),  '16:00', 'Bruno P.',    'marcado',   tattoo('Realismo Black & Gray', 'Braço', '10 a 20 cm', 'Retoque do leão cicatrizado'), [], 0, 0, false, -3],
    ['zaga', 'fechamento',  dia(-5), '09:00', 'Fábio G.',    'concluido', tattoo('Animais', 'Costas inteiras (fechamento)', 'Fechamento (braço, perna ou costas)', 'Águia e leão nas costas, última sessão'), ['fotos/aguia-leao-costas.jpg'], 750000, 100000, true, -40],
    ['zaga', 'peca',        dia(-8), '10:00', 'Rodrigo V.',  'concluido', tattoo('Realismo Black & Gray', 'Panturrilha', '10 a 20 cm', 'Leão de perfil na panturrilha'), [], 140000, 30000, true, -16],
    ['zaga', 'cobertura',   dia(-3), '11:00', 'Tiago B.',    'recusado',  tattoo('Cobertura', 'Peito', 'Mais de 20 cm', 'Cobrir tattoo colorida grande, mas queria fazer em uma sessão só'), [], 0, 0, false, -7]
  ];
  // só entra quem está na equipe do config
  L = L.filter(function (x) { return !CFG.artistas || !CFG.artistas.length || CFG.artistas.some(function (a) { return a.slug === x[0]; }); });

  var ocupado = {};
  var lista = L.map(function (x, i) {
    var s = SERV[x[1]] || { nome: x[1], duracao_min: 60 };
    var status = x[5] === 'concluido' ? 'concluido' : x[5] === 'recusado' ? 'cancelado' : 'confirmado';
    // se dois exemplos caírem no mesmo horário (dia fechado empurra a data), o segundo muda de dia
    var ini = min(x[3]), fimMin = ini + s.duracao_min, d = x[2], hoje = iso(new Date());
    if (status === 'confirmado') {
      for (var t = 0; t < 14; t++) {
        var livre = !(ocupado[x[0] + d] || []).some(function (o) { return ini < o[1] && fimMin > o[0]; });
        if (livre) break;
        d = outroDia(d, d < hoje ? -1 : 1);
      }
      (ocupado[x[0] + d] = ocupado[x[0] + d] || []).push([ini, fimMin]);
    }
    return {
      codigo: 'EX' + String(1001 + i), barbeiro_id: x[0], barbeiro: NOME[x[0]] || x[0],
      servico: s.nome, preco_centavos: 0, nome: x[4] + ' (exemplo)',
      telefone: '719000000' + String(10 + i), dia: d, inicio: hora(ini), fim: hora(fimMin),
      obs: x[6], status: status, anexos: x[7], exemplo: true,
      etapa: x[5], valor_centavos: x[8], sinal_centavos: x[9], sinal_pago: x[10], criado_em: criado(x[11])
    };
  });
  var bloqueios = [
    { id: 'b1', barbeiro_id: 'zaga', data: dia(11), hora_inicio: '00:00', hora_fim: '23:59', motivo: 'Evento (exemplo)' },
    { id: 'b2', barbeiro_id: 'zaga', data: dia(14), hora_inicio: '00:00', hora_fim: '23:59', motivo: 'Workshop (exemplo)' }
  ];
  try {
    localStorage.setItem(PFX + 'agendamentos_demo', JSON.stringify(lista));
    localStorage.setItem(PFX + 'bloqueios_demo', JSON.stringify(bloqueios));
    localStorage.removeItem(PFX + 'artistas_demo');
    localStorage.setItem(PFX + 'demo_semeado_v1', '1');   // o motor não semeia por cima
    localStorage.setItem(VERSAO, '1');
  } catch (e) {}
})();
