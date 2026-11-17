/* =====================================================================
   ILUSTRAÇÕES DOS BÔNUS — TELA DE FÉ
   Cenas em SVG (sem imagens externas). bonusArt(cena, id) devolve o SVG.
   viewBox 0 0 400 260 — usar com preserveAspectRatio="xMidYMid slice".
   ===================================================================== */
(function(){
  function rnd(seed){ let s = seed; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }
  function stars(seed, n, ymax, color){
    const r = rnd(seed); let out = "";
    for (let i = 0; i < n; i++){
      const x = (r()*400).toFixed(1), y = (r()*ymax).toFixed(1), s = (0.4 + r()*1.2).toFixed(2), o = (0.25 + r()*0.7).toFixed(2);
      out += `<circle cx="${x}" cy="${y}" r="${s}" fill="${color}" opacity="${o}"><animate attributeName="opacity" values="${o};${(o*0.3).toFixed(2)};${o}" dur="${(2.5+r()*3).toFixed(1)}s" repeatCount="indefinite"/></circle>`;
    }
    return out;
  }
  function motes(seed, n, x0, x1, y0, y1, color){
    const r = rnd(seed); let out = "";
    for (let i = 0; i < n; i++){
      const x = (x0 + r()*(x1-x0)).toFixed(1), y = (y0 + r()*(y1-y0)).toFixed(1), s = (0.8 + r()*1.6).toFixed(1), d = (4 + r()*4).toFixed(1);
      out += `<circle cx="${x}" cy="${y}" r="${s}" fill="${color}" opacity=".0"><animate attributeName="opacity" values="0;.9;0" dur="${d}s" begin="${(r()*4).toFixed(1)}s" repeatCount="indefinite"/><animate attributeName="cy" values="${y};${(y-24).toFixed(1)}" dur="${d}s" begin="${(r()*4).toFixed(1)}s" repeatCount="indefinite"/></circle>`;
    }
    return out;
  }
  function rays(cx, cy, n, len, spread, start, id, op){
    let out = "";
    for (let i = 0; i < n; i++){
      const a = (start + (spread/(n-1))*i) * Math.PI/180, w = 0.05;
      const x1 = cx + Math.cos(a-w)*len, y1 = cy + Math.sin(a-w)*len, x2 = cx + Math.cos(a+w)*len, y2 = cy + Math.sin(a+w)*len;
      out += `<polygon points="${cx},${cy} ${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}" fill="url(#${id}-ray)" opacity="${op}"/>`;
    }
    return out;
  }

  const SCENES = {
    /* 1 — Bíblia aberta à luz de vela */
    bible: id => `
      <defs>
        <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1222"/><stop offset=".65" stop-color="#1D2B4A"/><stop offset="1" stop-color="#2D3550"/></linearGradient>
        <radialGradient id="${id}-glow" cx="200" cy="168" r="170" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#F6D9A0" stop-opacity=".75"/><stop offset=".35" stop-color="#C69B65" stop-opacity=".25"/><stop offset="1" stop-color="#C69B65" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}-ray" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFE6B3" stop-opacity=".9"/><stop offset="1" stop-color="#FFE6B3" stop-opacity="0"/></linearGradient>
        <linearGradient id="${id}-pageL" x1="0" x2="1"><stop offset="0" stop-color="#E9DCC4"/><stop offset="1" stop-color="#FFF8EA"/></linearGradient>
        <linearGradient id="${id}-pageR" x1="1" x2="0"><stop offset="0" stop-color="#E9DCC4"/><stop offset="1" stop-color="#FFF8EA"/></linearGradient>
        <linearGradient id="${id}-table" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A2616"/><stop offset="1" stop-color="#140C07"/></linearGradient>
        <radialGradient id="${id}-flame" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#FFFBEA"/><stop offset=".45" stop-color="#FFD27A"/><stop offset="1" stop-color="#FF9A3C" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="400" height="260" fill="url(#${id}-sky)"/>
      ${stars(11, 40, 120, "#F3E6CC")}
      <rect width="400" height="260" fill="url(#${id}-glow)"/>
      <g style="mix-blend-mode:screen">${rays(200, 170, 9, 210, 120, 210, id, .35)}</g>
      <path d="M0 200 Q200 186 400 200 L400 260 L0 260Z" fill="url(#${id}-table)"/>
      <ellipse cx="200" cy="214" rx="120" ry="10" fill="#000" opacity=".45"/>
      <path d="M200 176 C170 166 120 168 84 180 L92 212 C128 202 170 200 200 210Z" fill="#6B4A2C"/>
      <path d="M200 176 C230 166 280 168 316 180 L308 212 C272 202 230 200 200 210Z" fill="#6B4A2C"/>
      <path d="M200 172 C170 160 124 160 92 172 L98 204 C130 194 170 194 200 205Z" fill="url(#${id}-pageL)"/>
      <path d="M200 172 C230 160 276 160 308 172 L302 204 C270 194 230 194 200 205Z" fill="url(#${id}-pageR)"/>
      <path d="M200 172 L200 205" stroke="#B89A6E" stroke-width="1.4"/>
      <g stroke="#B9A584" stroke-width="1" opacity=".7">
        <path d="M110 176 C135 169 165 169 188 175"/><path d="M111 182 C136 175 165 175 188 181"/><path d="M112 188 C137 181 165 181 188 187"/><path d="M113 194 C137 188 160 187 176 191"/>
        <path d="M212 175 C235 169 265 169 290 176"/><path d="M212 181 C235 175 264 175 289 182"/><path d="M212 187 C235 181 263 181 288 188"/><path d="M224 191 C240 187 263 188 287 194"/>
      </g>
      <path d="M204 205 L206 232 L210 226 L214 232 L212 204" fill="#A3262D"/>
      <g transform="translate(330 150)">
        <circle cx="0" cy="-8" r="34" fill="#FFCF7A" opacity=".18"/>
        <rect x="-7" y="0" width="14" height="46" rx="2" fill="#EFE3CC"/>
        <ellipse cx="0" cy="0" rx="7" ry="2" fill="#D9C8A8"/>
        <path d="M0 -24 C6 -14 6 -6 0 -2 C-6 -6 -6 -14 0 -24Z" fill="url(#${id}-flame)"><animateTransform attributeName="transform" type="scale" values="1 1;1.06 .94;.96 1.05;1 1" dur="1.6s" repeatCount="indefinite" additive="sum"/></path>
        <line x1="0" y1="-3" x2="0" y2="1" stroke="#3A2A1A" stroke-width="1.2"/>
      </g>
      ${motes(5, 14, 120, 280, 90, 170, "#FFE3A8")}
    `,

    /* 2 — Identidade: pessoa no monte, olhando a estrela */
    identity: id => `
      <defs>
        <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B0A12"/><stop offset=".5" stop-color="#5A1F2E"/><stop offset=".82" stop-color="#B05A45"/><stop offset="1" stop-color="#E7A86A"/></linearGradient>
        <radialGradient id="${id}-star" cx="270" cy="70" r="120" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF4DC" stop-opacity=".95"/><stop offset=".15" stop-color="#F6D49A" stop-opacity=".55"/><stop offset="1" stop-color="#F6D49A" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}-ray" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF0CF" stop-opacity=".8"/><stop offset="1" stop-color="#FFF0CF" stop-opacity="0"/></linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#${id}-sky)"/>
      ${stars(23, 46, 150, "#FFEBD0")}
      <rect width="400" height="260" fill="url(#${id}-star)"/>
      <g style="mix-blend-mode:screen">${rays(270, 70, 7, 230, 70, 115, id, .25)}</g>
      <g transform="translate(270 70)">
        <path d="M0 -20 L3.2 -3.2 L20 0 L3.2 3.2 L0 20 L-3.2 3.2 L-20 0 L-3.2 -3.2Z" fill="#FFF8E8"><animateTransform attributeName="transform" type="scale" values="1;1.12;1" dur="3.5s" repeatCount="indefinite"/></path>
        <circle r="4" fill="#fff"/>
      </g>
      <path d="M0 206 C70 180 120 188 180 196 C240 204 300 178 400 190 L400 260 L0 260Z" fill="#3E1622" opacity=".9"/>
      <path d="M0 226 C60 210 110 176 150 172 C180 169 200 176 230 190 C280 214 340 214 400 222 L400 260 L0 260Z" fill="#1E0910"/>
      <g transform="translate(205 182)" fill="#0E0407">
        <circle cx="0" cy="-36" r="4.6"/>
        <path d="M-5 -31 L5 -31 L7 -12 L4 1 L1 1 L0 -11 L-1 1 L-4 1 L-7 -12Z"/>
        <path d="M-4.5 -29 L-15 -43 L-12.8 -44.6 L-2.5 -31.5Z"/><path d="M4.5 -29 L15 -43 L12.8 -44.6 L2.5 -31.5Z"/>
      </g>
      <path d="M205 140 L268 76" stroke="#FFE8BF" stroke-width="1" stroke-dasharray="2 5" opacity=".35"/>
      ${motes(9, 10, 200, 340, 60, 160, "#FFE8BF")}
    `,

    /* 3 — Caminho até a cruz ao nascer do sol */
    path: id => `
      <defs>
        <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16200F"/><stop offset=".45" stop-color="#4F5E32"/><stop offset=".75" stop-color="#C79A5A"/><stop offset="1" stop-color="#F6D49A"/></linearGradient>
        <radialGradient id="${id}-sun" cx="250" cy="150" r="150" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF3D1"/><stop offset=".12" stop-color="#FFE0A0" stop-opacity=".85"/><stop offset=".5" stop-color="#E7B474" stop-opacity=".2"/><stop offset="1" stop-color="#E7B474" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}-ray" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFF0C8" stop-opacity=".85"/><stop offset="1" stop-color="#FFF0C8" stop-opacity="0"/></linearGradient>
        <linearGradient id="${id}-road" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#E8CB92"/><stop offset="1" stop-color="#FFF0CC"/></linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#${id}-sky)"/>
      ${stars(37, 16, 60, "#F7EBD0")}
      <rect width="400" height="260" fill="url(#${id}-sun)"/>
      <g style="mix-blend-mode:screen">${rays(250, 150, 11, 240, 160, 190, id, .28)}</g>
      <circle cx="250" cy="150" r="22" fill="#FFF6DE"/>
      <path d="M0 160 C60 140 110 150 160 146 C210 142 240 128 290 136 C340 144 370 136 400 140 L400 260 L0 260Z" fill="#6E7444" opacity=".85"/>
      <g transform="translate(258 124)" fill="#2A2512"><rect x="-1.6" y="-22" width="3.2" height="26" rx=".8"/><rect x="-8" y="-15" width="16" height="3" rx=".8"/></g>
      <path d="M0 186 C70 168 120 176 180 170 C240 164 300 156 400 168 L400 260 L0 260Z" fill="#3D4424"/>
      <path d="M150 260 C180 230 230 222 236 200 C240 186 248 160 256 134 L260 134 C256 160 254 190 252 206 C246 232 222 246 236 260Z" fill="url(#${id}-road)" opacity=".9"/>
      <path d="M0 226 C80 206 130 222 170 236 C200 246 230 244 260 236 C320 220 360 214 400 222 L400 260 L0 260Z" fill="#1F2412"/>
      <g transform="translate(222 222)" fill="#141708"><circle cx="0" cy="-15" r="2.4"/><path d="M-2.4 -12.5 L2.4 -12.5 L3.2 -4 L2 3 L.6 3 L0 -3 L-1.2 3 L-2.6 3 L-3.2 -4Z"/></g>
      <g fill="#1A1E0E"><path d="M40 226 C38 200 46 186 52 180 C56 192 58 208 56 226Z"/><path d="M350 222 C346 198 356 184 362 178 C368 192 370 206 366 222Z"/></g>
      ${motes(13, 12, 180, 330, 100, 180, "#FFF0C8")}
    `,

    /* 4 — Cartões de versículos e relógio de 5 minutos */
    cards: id => `
      <defs>
        <linearGradient id="${id}-sky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071B1E"/><stop offset=".6" stop-color="#14393D"/><stop offset="1" stop-color="#2B5A55"/></linearGradient>
        <radialGradient id="${id}-glow" cx="180" cy="130" r="170" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#E7C58F" stop-opacity=".4"/><stop offset="1" stop-color="#E7C58F" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}-card" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF9EC"/><stop offset="1" stop-color="#EADCC2"/></linearGradient>
        <linearGradient id="${id}-ray" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFE6B3"/><stop offset="1" stop-color="#FFE6B3" stop-opacity="0"/></linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#${id}-sky)"/>
      ${stars(41, 30, 260, "#CFE7E2")}
      <rect width="400" height="260" fill="url(#${id}-glow)"/>
      <g transform="translate(232 150)">
        <g transform="rotate(-16)"><rect x="-62" y="-44" width="124" height="84" rx="8" fill="#D8C7A6" opacity=".9"/></g>
        <g transform="rotate(-6)"><rect x="-62" y="-44" width="124" height="84" rx="8" fill="#E9DBBF"/>
          <g stroke="#B9A584" stroke-width="2" stroke-linecap="round" opacity=".6"><path d="M-44 -10 H40"/><path d="M-44 2 H30"/></g></g>
        <g transform="rotate(5)">
          <rect x="-62" y="-44" width="124" height="84" rx="8" fill="url(#${id}-card)" stroke="#C69B65" stroke-width="1.5"/>
          <rect x="-56" y="-38" width="112" height="72" rx="5" fill="none" stroke="#C69B65" stroke-width=".8" opacity=".6"/>
          <text x="0" y="-18" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="10" font-weight="700" fill="#7A5A33" letter-spacing="1.5">SALMOS 119:11</text>
          <g stroke="#8E7754" stroke-width="2.2" stroke-linecap="round"><path d="M-40 -2 H40"/><path d="M-40 9 H34"/><path d="M-30 20 H30"/></g>
          <path d="M0 -34 V-27 M-3.5 -31 H3.5" stroke="#C69B65" stroke-width="1.6" stroke-linecap="round"/>
        </g>
      </g>
      <g transform="translate(340 118) scale(.8)">
        <circle r="40" fill="#E7C58F" opacity=".12"/>
        <circle r="30" fill="#0E2629" stroke="#E7C58F" stroke-width="2.5"/>
        <path d="M0 0 L0 -30 A30 30 0 0 1 28.5 -9.3 Z" fill="#E7C58F" opacity=".35"/>
        <g stroke="#E7C58F" stroke-width="2" stroke-linecap="round">
          <path d="M0 -26 V-22"/><path d="M26 0 H22"/><path d="M0 26 V22"/><path d="M-26 0 H-22"/>
          <path d="M0 0 V-17"><animateTransform attributeName="transform" type="rotate" values="0;72;0" dur="6s" repeatCount="indefinite"/></path>
        </g>
        <circle r="2.6" fill="#E7C58F"/>
        <text y="50" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="700" fill="#E7C58F" letter-spacing="1.5">5 MIN</text>
      </g>
      <g fill="#FFE6B3"><path d="M70 60 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" opacity=".8"/><path d="M262 206 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" opacity=".7"/></g>
      ${motes(17, 12, 90, 360, 40, 230, "#FFE6B3")}
    `,

    /* 5 — Perdão: pomba saindo de mãos abertas ao amanhecer */
    dove: id => `
      <defs>
        <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140B1C"/><stop offset=".45" stop-color="#43284F"/><stop offset=".8" stop-color="#B9788A"/><stop offset="1" stop-color="#F2C48A"/></linearGradient>
        <radialGradient id="${id}-sun" cx="200" cy="250" r="220" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF1D0" stop-opacity=".95"/><stop offset=".3" stop-color="#F3C389" stop-opacity=".45"/><stop offset="1" stop-color="#F3C389" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}-ray" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFF0D0" stop-opacity=".9"/><stop offset="1" stop-color="#FFF0D0" stop-opacity="0"/></linearGradient>
        <linearGradient id="${id}-hand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9C49A"/><stop offset="1" stop-color="#9C6E4A"/></linearGradient>
        <linearGradient id="${id}-dove" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EADFD2"/></linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#${id}-sky)"/>
      ${stars(53, 30, 110, "#F6E8F2")}
      <rect width="400" height="260" fill="url(#${id}-sun)"/>
      <g style="mix-blend-mode:screen">${rays(200, 250, 13, 300, 150, 195, id, .22)}</g>
      <g fill="#F3D7C8" opacity=".35"><ellipse cx="80" cy="120" rx="70" ry="14"/><ellipse cx="330" cy="104" rx="80" ry="15"/><ellipse cx="120" cy="150" rx="50" ry="9"/></g>
      <g>
        <path d="M120 260 C126 236 138 222 156 216 C170 212 186 214 196 222 L200 228 L200 260Z" fill="url(#${id}-hand)"/>
        <path d="M280 260 C274 236 262 222 244 216 C230 212 214 214 204 222 L200 228 L200 260Z" fill="url(#${id}-hand)"/>
        <g stroke="#7A5236" stroke-width="1.2" fill="none" opacity=".55"><path d="M150 230 C162 224 176 222 188 226"/><path d="M146 240 C160 234 176 232 190 236"/><path d="M250 230 C238 224 224 222 212 226"/><path d="M254 240 C240 234 224 232 210 236"/></g>
      </g>
      <g transform="translate(206 120)">
        <animateTransform attributeName="transform" type="translate" values="206 124;206 114;206 124" dur="4s" repeatCount="indefinite"/>
        <circle r="46" fill="#FFF6E6" opacity=".18"/>
        <g fill="url(#${id}-dove)">
          <path d="M-30 6 C-18 0 0 -2 14 2 L26 -4 C24 4 22 8 16 10 C8 16 -10 18 -22 14 L-38 18 Z"/>
          <path d="M-8 2 C-16 -16 -10 -34 8 -48 C6 -30 8 -14 4 0 Z" opacity=".95"/>
          <path d="M0 2 C6 -14 22 -26 42 -30 C32 -16 20 -4 8 4 Z"/>
          <circle cx="15" cy="1" r="1.2" fill="#3A2A34"/>
          <path d="M26 -4 L31 -3 L26 0Z" fill="#E7A86A"/>
        </g>
        <path d="M20 4 C26 10 30 12 36 10" stroke="#7FA05A" stroke-width="1.6" fill="none"/>
        <g fill="#8DB264"><ellipse cx="31" cy="12" rx="3" ry="1.4" transform="rotate(20 31 12)"/><ellipse cx="36" cy="9" rx="3" ry="1.4" transform="rotate(-20 36 9)"/></g>
      </g>
      ${motes(29, 16, 120, 290, 120, 230, "#FFF0D0")}
    `,
  };

  /* ---------- Efeitos por cima das fotos reais ---------- */
  // origem da luz (coordenadas 400x260), cor e foco de cada foto
  const FX = {
    bible:   {lx:274, ly:44,  c:"#FFD89A", n:9,  spread:150, start:195, op:.22, motes:[180,330,40,200], focus:"60% 45%"},
    identity:{lx:66,  ly:112, c:"#FFD7A0", n:11, spread:170, start:180, op:.20, motes:[20,260,60,220],  focus:"40% 55%"},
    path:    {lx:370, ly:20,  c:"#FFF2CC", n:9,  spread:110, start:110, op:.16, motes:[200,390,20,200], focus:"70% 50%"},
    cards:   {lx:40,  ly:0,   c:"#FFE3B0", n:8,  spread:80,  start:20,  op:.14, motes:[60,360,40,230],  focus:"50% 88%"},
    dove:    {lx:250, ly:0,   c:"#FFF4E0", n:11, spread:120, start:30,  op:.18, motes:[120,380,30,220], focus:"62% 40%"},
  };
  window.BONUS_PHOTOS = {
    bible:"offer/img/bonus-bible.jpg", identity:"offer/img/bonus-identity.jpg", path:"offer/img/bonus-path.jpg",
    cards:"offer/img/bonus-cards.jpg", dove:"offer/img/bonus-dove.jpg",
  };
  window.bonusFocus = scene => (FX[scene] || FX.bible).focus;
  window.bonusFx = function(scene, id){
    const f = FX[scene] || FX.bible;
    return `<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="${id}-ray" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${f.c}" stop-opacity=".9"/><stop offset="1" stop-color="${f.c}" stop-opacity="0"/></linearGradient>
        <radialGradient id="${id}-glow" cx="${f.lx}" cy="${f.ly}" r="190" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${f.c}" stop-opacity=".45"/><stop offset="1" stop-color="${f.c}" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id}-vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
      </defs>
      <rect width="400" height="260" fill="url(#${id}-glow)" class="fx-glow"/>
      <g class="fx-rays">${rays(f.lx, f.ly, f.n, 420, f.spread, f.start, id, f.op)}</g>
      ${motes(f.lx + f.ly, 18, f.motes[0], f.motes[1], f.motes[2], f.motes[3], f.c)}
      <rect width="400" height="260" fill="url(#${id}-vig)"/>
    </svg>`;
  };

  window.bonusArt = function(scene, id){
    const body = (SCENES[scene] || SCENES.bible)(id);
    return `<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${body}</svg>`;
  };
})();
