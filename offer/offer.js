/* =====================================================================
   BLOCO DE OFERTA — TELA DE FÉ
   Componentes em JavaScript puro (o projeto não usa framework).
   Depende de globais do index.html: CONFIG, CHECKOUT_URL, A (respostas
   do quiz), FOCUS, theme(), phoneHTML(), esc(), track(), buzz().
   Componente principal: OfferSection()
   ===================================================================== */

/* ---------- Ícones (SVG inline, sem dependências) ---------- */
const OI = {
  check:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevron:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  lock:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  phone:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 18.5h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  pray:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v6M9 6h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M5 21c2-3 3-5 3-8l2-2M19 21c-2-3-3-5-3-8l-2-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  book:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5v-15zM4 20.5A2.5 2.5 0 006.5 23H20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  sun:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  palette:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 100 18c1.1 0 1.6-.9 1.2-1.8-.5-1-.1-2.2 1.2-2.2H17a4 4 0 004-4c0-5.5-4-10-9-10z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7.5" cy="11" r="1.2" fill="currentColor"/><circle cx="10" cy="7" r="1.2" fill="currentColor"/><circle cx="14.5" cy="7" r="1.2" fill="currentColor"/></svg>',
  gift:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="8" width="17" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 12v8.5h14V12M12 8v12.5M12 8C10 4 6.5 4.5 7.5 7c.4 1 2.5 1 4.5 1zm0 0c2-4 5.5-3.5 4.5-1-.4 1-2.5 1-4.5 1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
};
const ic = (name, cls="") => `<span class="of-ic ${cls}">${OI[name]}</span>`;

/* ---------- Dados ---------- */
const OFFER_PRAYERS = {
  paz:      "Senhor, acalma minha mente, guia meus passos e enche meu coração de paz.",
  forca:    "Deus, renova minhas forças e me sustenta para continuar mais um dia.",
  protecao: "Senhor, protege meu lar e guarda cada pessoa que eu amo.",
  direcao:  "Deus, me dá sabedoria e ilumina o caminho que devo seguir.",
  esperanca:"Senhor, renova minha esperança e me lembra que Tu não me abandonas.",
  gratidao: "Obrigado, Senhor, pelas bênçãos de hoje, das maiores às mais simples.",
};
const OFFER_DEFAULT_PRAYER = OFFER_PRAYERS.paz;

const BONUSES = [
  { n:"01", name:"Nunca Mais Abra a Bíblia Sem Saber Por Onde Começar",
    hook:"Pare de se sentir perdido toda vez que abrir a Bíblia.",
    promise:"Um guia simples para quem quer ler a Bíblia, mas se sente perdido e não sabe por onde começar.",
    benefits:["Descubra uma sequência de leitura adequada para iniciantes.","Entenda a organização dos livros bíblicos.","Utilize um plano simples para começar seu estudo."],
    cover:{kicker:"Guia de leitura", tone:"c1", mark:"bible", side:"left"} },
  { n:"02", name:"O Que Deus Diz Sobre Você",
    hook:"Nos dias em que você duvidar de si mesmo, lembre-se do que a Palavra ensina.",
    promise:"21 ensinamentos bíblicos sobre identidade, valor pessoal e fé para os momentos em que você começa a duvidar de si mesmo.",
    benefits:["Explore passagens bíblicas sobre identidade e propósito.","Reflita sobre seu valor pessoal à luz dos ensinamentos cristãos.","Tenha exercícios para aprofundar a reflexão."],
    cover:{kicker:"21 ensinamentos", tone:"c2", mark:"identity", side:"left"} },
  { n:"03", name:"O Que Jesus Ensinou Sobre a Vida Real",
    hook:"Descubra como os ensinamentos de Jesus podem orientar suas escolhas diárias.",
    promise:"15 ensinamentos de Jesus para aplicar no trabalho, nos relacionamentos, na família e nas decisões do cotidiano.",
    benefits:["Conheça princípios bíblicos para lidar com conflitos.","Descubra lições para aplicar em situações do dia a dia.","Transforme reflexões em ações práticas."],
    cover:{kicker:"15 ensinamentos", tone:"c3", mark:"path", side:"left"} },
  { n:"04", name:"Como Memorizar Versículos Bíblicos Mesmo Sem Ter Muito Tempo",
    hook:"Leve os versículos com você, mesmo quando estiver longe do celular.",
    promise:"Um método simples de cinco minutos para praticar a memorização da Palavra de Deus.",
    benefits:["Aprenda uma técnica de memorização.","Receba 21 cartões de estudo.","Utilize um calendário de revisão."],
    cover:{kicker:"Método de 5 minutos", tone:"c4", mark:"cards", side:"left"} },
  { n:"05", name:"Como Perdoar Quem Te Magoou e Seguir em Frente",
    hook:"Aprenda a lidar com as mágoas do passado sem abandonar o respeito por si mesmo.",
    promise:"Um guia de reflexão para compreender o perdão, trabalhar ressentimentos e encontrar maneiras saudáveis de seguir em frente.",
    benefits:["Conheça princípios bíblicos sobre o perdão.","Utilize exercícios para refletir sobre suas mágoas.","Aprenda a conciliar perdão e limites pessoais saudáveis."],
    cover:{kicker:"Guia de reflexão", tone:"c5", mark:"dove"},
    featured:true },
];

/* Ilustrações: offer/bonus-art.js (window.bonusArt) */

/* ---------- Configuração / checkout ---------- */
function offerCfg(){ return CONFIG.offer || {}; }
function checkoutStatus(){
  const c = offerCfg(), missing = [];
  let validUrl = false;
  try { const u = new URL(CHECKOUT_URL); validUrl = u.protocol === "https:"; } catch(e) {}
  if (!validUrl) missing.push("CHECKOUT_URL (link https do checkout)");
  if (!String(c.billingTerms||"").trim()) missing.push("offer.billingTerms (modalidade de cobrança)");
  return { ready: missing.length === 0, missing };
}
function pendingInfo(){
  const c = offerCfg(), list = [...checkoutStatus().missing];
  if (!String(c.accessInfo||"").trim()) list.push("offer.accessInfo (como o acesso é entregue)");
  if (!String(c.compatibility||"").trim()) list.push("offer.compatibility (iOS / Android)");
  if (!c.bonusesAvailable) list.push("offer.bonusesAvailable = true (quando os 5 materiais estiverem prontos)");
  return list;
}
function buildCheckoutUrl(){
  let url = CHECKOUT_URL;
  if (CONFIG.passUtms){
    try {
      const here = new URLSearchParams(location.search), u = new URL(url);
      here.forEach((v,k)=>{ if (k.startsWith("utm_") || k === "fbclid" || k === "src" || k === "sck") u.searchParams.set(k, v); });
      url = u.toString();
    } catch(e) {}
  }
  return url;
}
const isPreviewEnv = () => location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname) || /[?&]preview=1\b/.test(location.search);
const fill = (v, fallback) => String(v||"").trim() ? esc(v) : `<span class="of-pending">${esc(fallback)}</span>`;

/* ---------- Componentes ---------- */
function PhonePreview(){
  const f = A.focus && FOCUS[A.focus] ? A.focus : null;
  let text = f ? OFFER_PRAYERS[f] : OFFER_DEFAULT_PRAYER, ref = "";
  if (f && A.format === "verse"){ const v = FOCUS[f].verses[0]; text = "“" + v[0] + "”"; ref = v[1]; }
  const now = new Date(), time = String(now.getHours()).padStart(2,"0") + ":" + String(now.getMinutes()).padStart(2,"0");
  return `<div class="of-phone">${phoneHTML({time, text, ref, ring:false, id:"of-ph"})}</div>`;
}

function OfferHero(){
  const who = A.name ? `${esc(A.name)}, agora` : "Agora";
  return `<section class="of-hero of-reveal" aria-labelledby="of-h1">
    <div class="of-hero-text">
      <p class="of-badge">${ic("check")} Sua experiência de fé está preparada!</p>
      <h1 id="of-h1" class="of-h1">${who} você pode levar momentos de fé para a tela do seu celular.</h1>
      <p class="of-lead">Imagine encontrar uma oração ou mensagem bíblica quando olhar para a tela de bloqueio. Um pequeno convite para parar, refletir e se aproximar de Deus, mesmo nos dias mais corridos.</p>
    </div>
    ${PhonePreview()}
  </section>`;
}

function MainProductCard(){
  const c = offerCfg();
  const benefits = [
    ["phone","Tenha mensagens espirituais mais presentes no seu dia."],
    ["palette","Personalize sua tela com orações e versículos."],
    ["sun","Encontre palavras de fé para diferentes momentos."],
    ["book","Explore conteúdos bíblicos e reflexões."],
    ["pray","Crie mais oportunidades para orar durante sua rotina."],
  ];
  return `<section class="of-sec of-reveal" aria-labelledby="of-prod">
    <p class="of-eyebrow">O aplicativo</p>
    <h2 id="of-prod" class="of-h2">Conheça o ${esc(c.productName||"TELA DE FÉ")}</h2>
    <p class="of-sub">Sua fé mais presente na rotina, começando pela tela que você olha todos os dias.</p>
    <article class="of-product">
      <div class="of-product-visual" aria-hidden="true">
        <div class="of-home">
          <div class="of-home-notch"></div>
          <div class="of-wg of-wg-lg"><span class="of-wg-k">Versículo do dia</span><span class="of-wg-t">“Lâmpada para os meus pés é a tua palavra.”</span><span class="of-wg-r">SALMOS 119:105</span></div>
          <div class="of-wg-row">
            <div class="of-wg of-wg-sm"><span class="of-wg-x">✝</span><span class="of-wg-t">Oração da manhã</span></div>
            <div class="of-wg of-wg-sm of-wg-alt"><span class="of-wg-x">☀</span><span class="of-wg-t">Força para hoje</span></div>
          </div>
          <div class="of-icons">${"<i></i>".repeat(8)}</div>
        </div>
      </div>
      <div class="of-product-body">
        <div class="of-app-id">
          <div class="of-app-icon" aria-hidden="true">✝</div>
          <div><strong>${esc(c.productName||"TELA DE FÉ")}</strong><span>Mensagens de fé na tela do seu celular</span></div>
        </div>
        <p class="of-product-desc">Um aplicativo cristão para colocar orações e versículos onde seus olhos já estão: na tela de bloqueio e nos widgets do seu celular.</p>
        <ul class="of-benefits">${benefits.map(([i,t])=>`<li>${ic(i,"of-ic-gold")}<span>${esc(t)}</span></li>`).join("")}</ul>
      </div>
    </article>
  </section>`;
}

/* Foto real do bônus (offer/img). Sem foto, usa a ilustração SVG. */
function bonusPhoto(b, pre){
  const src = window.BONUS_PHOTOS && BONUS_PHOTOS[b.cover.mark];
  if (!src) return window.bonusArt ? bonusArt(b.cover.mark, pre + b.n) : "";
  const pos = window.bonusFocus ? bonusFocus(b.cover.mark) : "50% 50%";
  return `<img src="${src}" alt="" loading="lazy" decoding="async" width="1000" height="666" style="object-position:${pos}">`;
}

function BonusCover(b){
  const side = b.cover.side === "left" ? "of-book-left" : "";
  return `<div class="of-book ${b.cover.tone} ${side}" aria-hidden="true">
    <div class="of-book-shadow"></div>
    <div class="of-book-3d">
      <div class="of-book-back"></div>
      <div class="of-book-pages"></div>
      <div class="of-book-top"></div>
      <div class="of-book-spine"><span>${esc(b.name)}</span></div>
      <div class="of-book-front">
        <div class="of-book-photo">${bonusPhoto(b, "cv")}</div>
        <div class="of-book-frame"></div>
        <div class="of-book-text">
          <span class="of-book-n">BÔNUS ${b.n}</span>
          <span class="of-book-orn">✦</span>
          <span class="of-book-title ${b.name.length>44?"long":""}">${esc(b.name)}</span>
          <span class="of-book-kicker">${esc(b.cover.kicker)}</span>
          <span class="of-book-brand">TELA DE FÉ</span>
        </div>
        <div class="of-book-hinge"></div>
        <div class="of-book-gloss"></div>
      </div>
    </div>
  </div>`;
}

function BonusCard(b, i){
  return `<article class="of-bonus of-reveal ${b.featured?"of-bonus-featured":""}" style="--d:${i*70}ms" aria-labelledby="of-b${b.n}">
    <div class="of-bonus-art">
      <div class="of-bonus-scene">${bonusPhoto(b, "bg")}${window.bonusFx ? `<div class="of-bonus-fx">${bonusFx(b.cover.mark, "fx"+b.n)}</div>` : ""}</div>
      <div class="of-bonus-top">
        <span class="of-bonus-n">BÔNUS #${b.n}</span>
        <span class="of-seal">${ic("check")} INCLUSO NA OFERTA</span>
      </div>
      ${BonusCover(b)}
    </div>
    <div class="of-bonus-body">
      <h3 id="of-b${b.n}" class="of-bonus-name">${esc(b.name)}</h3>
      <p class="of-bonus-hook">${esc(b.hook)}</p>
      <p class="of-bonus-promise">${esc(b.promise)}</p>
      <ul class="of-checks">${b.benefits.map(t=>`<li>${ic("check","of-ic-gold")}<span>${esc(t)}</span></li>`).join("")}</ul>
    </div>
  </article>`;
}

function BonusSection(){
  return `<section class="of-sec of-bonuses" id="of-bonuses" aria-labelledby="of-gifts">
    <div class="of-gift-intro of-reveal">
      <div class="of-gift-icon">${OI.gift}</div>
      <h2 id="of-gifts" class="of-h2">E para tornar sua jornada ainda mais especial, você também vai receber <span class="of-gold">5 presentes exclusivos!</span></h2>
      <p class="of-sub">Porque queremos que você tenha mais do que mensagens na tela do celular. Queremos ajudar você a compreender a Palavra, fortalecer sua fé e aplicar seus ensinamentos na vida real.</p>
    </div>
    <div class="of-bonus-grid">${BONUSES.map(BonusCard).join("")}</div>
  </section>`;
}

function OfferStack(){
  const c = offerCfg();
  const items = [`<b>${esc(c.productName||"TELA DE FÉ")}</b> — Aplicativo principal`]
    .concat(BONUSES.map((b,i)=>`<b>Bônus #${i+1}</b> — ${esc(b.name)}`));
  return `<section class="of-sec of-reveal" aria-labelledby="of-stack">
    <div class="of-stack">
      <h2 id="of-stack" class="of-h3">Veja tudo o que está incluído no seu pacote:</h2>
      <ul>${items.map((t,i)=>`<li class="${i===0?"of-stack-main":""}">${ic("check")}<span>${t}</span></li>`).join("")}</ul>
    </div>
  </section>`;
}

function CheckoutButton(id, label){
  return `<button type="button" class="of-cta" id="${id}" data-checkout>
    <span class="of-cta-label">${esc(label)}</span><span class="of-cta-arrow">${OI.arrow}</span><span class="of-spinner" aria-hidden="true"></span>
  </button>
  <p class="of-cta-msg" id="${id}-msg" role="status" aria-live="polite"></p>`;
}

function PriceDisplay(){
  const c = offerCfg();
  const price = String(c.price || "R$ 27,90");
  const m = price.match(/^(R\$)\s*([\d.]+)(,\d+)?$/);
  const inner = m ? `<span class="of-cur">${m[1]}</span><span class="of-int">${m[2]}</span><span class="of-cents">${m[3]||""}</span>` : esc(price);
  const terms = String(c.billingTerms||"").trim();
  return `<div class="of-price" aria-label="Preço: ${esc(price)}">${inner}</div>
    ${terms ? `<p class="of-terms">${esc(terms)}</p>` : ""}`;
}

function PricingCard(){
  return `<section class="of-sec of-reveal" id="of-pricing" aria-labelledby="of-price-h">
    <div class="of-pricing">
      <div class="of-pricing-glow" aria-hidden="true"></div>
      <p class="of-eyebrow center">Sua oferta</p>
      <h2 id="of-price-h" class="of-h2 center">Tudo isso para começar uma jornada de fé mais presente no seu dia a dia.</h2>
      <p class="of-sub center">Tenha acesso ao ${esc(offerCfg().productName||"TELA DE FÉ")} e receba os 5 bônus especiais incluídos na sua oferta.</p>
      <div class="of-price-wrap">
        ${PriceDisplay()}
        <p class="of-included">${ic("gift","of-ic-gold")} Os 5 bônus já estão incluídos neste valor.</p>
      </div>
      ${CheckoutButton("of-buy","SIM, QUERO O TELA DE FÉ + MEUS 5 BÔNUS")}
      <p class="of-small">Comece sua experiência de fé no celular.</p>
    </div>
  </section>`;
}

function OfferFAQ(){
  const c = offerCfg();
  const qs = [
    ["O que é o Tela de Fé?", "É um aplicativo de conteúdo espiritual que apresenta recursos como widgets, orações, versículos e ferramentas de reflexão bíblica."],
    ["Preciso entender de tecnologia para usar?", "Não. A utilização é fácil e prática, e instala automaticamente no seu celular."],
    ["Vou receber os cinco bônus?", "Sim. Os cinco materiais apresentados fazem parte da oferta de " + esc(c.price||"R$ 27,90") + " e serão disponibilizados conforme as instruções de entrega do produto."],
    ["Posso usar no meu celular?", fill(c.compatibility, "Compatibilidade com iOS e Android em confirmação.")],
    ["Como terei acesso após a compra?", fill(c.accessInfo, "Processo de entrega em confirmação.")],
    ["O valor de " + (c.price||"R$ 27,90") + " é cobrado uma única vez?", fill(c.billingTerms, "Modalidade de cobrança em confirmação.")],
  ];
  return `<section class="of-sec of-reveal" aria-labelledby="of-faq-h">
    <p class="of-eyebrow center">Dúvidas</p>
    <h2 id="of-faq-h" class="of-h2 center">Perguntas frequentes</h2>
    <div class="of-faq">${qs.map(([q,a],i)=>`
      <div class="of-faq-item">
        <h3><button type="button" class="of-faq-q" id="of-q${i}" aria-expanded="false" aria-controls="of-a${i}">
          <span>${esc(q)}</span>${ic("chevron","of-faq-ch")}
        </button></h3>
        <div class="of-faq-a" id="of-a${i}" role="region" aria-labelledby="of-q${i}"><div><p>${a}</p></div></div>
      </div>`).join("")}
    </div>
  </section>`;
}

function FinalCTA(){
  return `<section class="of-sec of-final of-reveal" aria-labelledby="of-final-h">
    <div class="of-final-cross" aria-hidden="true">✝</div>
    <h2 id="of-final-h" class="of-h2 center">A sua rotina pode continuar corrida. Mas a sua fé também pode encontrar espaço nela.</h2>
    <p class="of-final-moments">Uma oração ao acordar. Uma mensagem de esperança durante o dia. Um versículo para refletir antes de dormir.</p>
    <p class="of-sub center">Descubra uma forma simples de tornar esses pequenos momentos parte da sua rotina.</p>
    <div class="of-final-box">
      <p class="of-final-pack">${esc(offerCfg().productName||"TELA DE FÉ")} <span>+ 5 BÔNUS EXCLUSIVOS</span></p>
      ${PriceDisplay()}
      ${CheckoutButton("of-buy2","QUERO COMEÇAR MINHA JORNADA DE FÉ")}
    </div>
  </section>`;
}

function DevNotice(){
  const p = pendingInfo();
  if (!p.length || !isPreviewEnv()) return "";
  return `<aside class="of-dev" role="note"><strong>Configuração pendente (visível só em pré-visualização)</strong>
    <ul>${p.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
    <span>Edite o bloco CONFIG no index.html. Sem CHECKOUT_URL e billingTerms o botão não redireciona.</span></aside>`;
}

/* ---------- Comportamento ---------- */
const OFFER_TRACKED = { view:false, bonus:false };
let offerObservers = [];

function wireOffer(root){
  offerObservers.forEach(o=>o.disconnect()); offerObservers = [];

  if (!OFFER_TRACKED.view){ OFFER_TRACKED.view = true; track("offer_view", {focus:A.focus||null, style:A.style||null}); }

  // Entrada das seções
  const reveals = root.querySelectorAll(".of-reveal");
  if ("IntersectionObserver" in window){
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {rootMargin:"0px 0px -8% 0px", threshold:0.08});
    reveals.forEach(r=>io.observe(r)); offerObservers.push(io);
    const bonus = root.querySelector("#of-bonuses");
    const bio = new IntersectionObserver(es=>es.forEach(e=>{
      if (e.isIntersecting && !OFFER_TRACKED.bonus){ OFFER_TRACKED.bonus = true; track("bonus_section_view"); bio.disconnect(); }
    }), {threshold:0.15});
    if (bonus) bio.observe(bonus); offerObservers.push(bio);
  } else reveals.forEach(r=>r.classList.add("in"));

  // FAQ
  root.querySelectorAll(".of-faq-q").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      btn.closest(".of-faq-item").classList.toggle("open", open);
      track("faq_interaction", {question: btn.textContent.trim(), action: open ? "open" : "close"});
    });
  });

  // Checkout
  root.querySelectorAll("[data-checkout]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      if (btn.classList.contains("loading")) return;
      buzz();
      const msg = root.querySelector("#" + btn.id + "-msg");
      const st = checkoutStatus();
      track("checkout_click", {location: btn.id, configured: st.ready});
      if (!st.ready){
        if (msg) msg.textContent = "O checkout ainda não está disponível. Por favor, tente novamente em breve.";
        console.warn("[Tela de Fé] Checkout não configurado. Falta:", st.missing.join("; "));
        return;
      }
      const url = buildCheckoutUrl();
      const fallback = () => { if (msg) msg.innerHTML = `Se o checkout não abriu, <a href="${esc(url)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">toque aqui para abrir</a>.`; };
      btn.classList.add("loading"); btn.setAttribute("aria-busy","true");
      if (msg) msg.textContent = "Abrindo o checkout…";
      // Navega já no clique (sem atraso) para o navegador não bloquear.
      // Se a página estiver dentro de um iframe, o checkout não pode abrir nele: abre numa nova aba.
      let framed = false;
      try { framed = window.top !== window.self; } catch(e) { framed = true; }
      if (framed){
        const w = window.open(url, "_blank");
        if (w) { try { w.opener = null; } catch(e) {} } else fallback();
      } else {
        window.location.assign(url);
      }
      setTimeout(fallback, 3000);
      // Se o usuário voltar com o botão "voltar" do navegador, reativa o botão
      setTimeout(()=>{ btn.classList.remove("loading"); btn.removeAttribute("aria-busy"); }, 6000);
    });
  });

}

/* ---------- Componente principal ---------- */
function OfferSection(){
  const el = document.createElement("section");
  el.className = "screen of-root";
  el.setAttribute("aria-label", "Oferta Tela de Fé");
  el.innerHTML = DevNotice() + OfferHero() + MainProductCard() + BonusSection() + OfferStack() + PricingCard() + OfferFAQ() + FinalCTA();
  wireOffer(el);
  return el;
}

window.addEventListener("pageshow", e=>{ if (e.persisted) document.querySelectorAll("[data-checkout].loading").forEach(b=>{ b.classList.remove("loading"); b.removeAttribute("aria-busy"); }); });
