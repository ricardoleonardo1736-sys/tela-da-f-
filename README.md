# Quiz — Sua Tela de Fé

Funil de quiz interativo (Direct Response), mobile-first, num único `index.html` sem dependências.
Mecanismo vendido: **encontrar uma mensagem de fé na tela de bloqueio sempre que olha para o celular**.

## As 15 etapas
| # | Etapa | Função DR |
|---|---|---|
| 1 | Hook + celular animado | Curiosidade |
| 2 | "Já chegou ao fim do dia sem orar?" | Dor (com feedback empático) |
| 3 | O que impede a oração | Aprofundar a dor (feedback por resposta) |
| 4 | Como se sente sem orar | Agitação |
| 5 | "Não é falta de fé, é falta de lembrete" | Reenquadramento (muda conforme a resposta 3) |
| 6 | O que a mensagem deveria trazer (paz, força…) | Desejo — define o conteúdo |
| 7 | Demonstração animada 07:00 → 13:00 → 21:00 | Mecanismo |
| 8 | Momento do dia | Associação ao hábito |
| 9 | Orações / versículos / ambos | Personalização (prévia instantânea) |
| 10 | Estilo visual (Clássico / Serenidade / Minimalista) | Personalização visual |
| 11 | Nome (opcional) | Personalização — usado nos títulos seguintes |
| 12 | Como quer usar (múltipla escolha) | Compromisso |
| 13 | Carregamento 0–100% com checklist | Antecipação |
| 14 | Resultado: o celular da pessoa com mensagens a mudar | Recompensa |
| 15 | Bloco de oferta TELA DE FÉ (R$ 27,90 + 5 bônus) | Conversão |

Interações: avanço automático ao tocar, feedback por resposta, barra de progresso, voltar, vibração, círculo vermelho "desenhado à mão" (como no criativo), textos com o nome, prévia que muda com cada escolha.

## Configurar
No topo do `<script>` principal em `index.html`:
- `CHECKOUT_URL` — link **https** do checkout. Vazio = o botão não redireciona e mostra "checkout ainda não disponível".
- `CONFIG.appName` — nome no topo do quiz.
- `CONFIG.metaPixelId` — ID do Pixel da Meta (vazio = desativado).
- `CONFIG.passUtms` — repassa `utm_*`, `fbclid`, `src`, `sck` para o checkout.
- `CONFIG.offer.price` — preço exibido (`R$ 27,90`).
- `CONFIG.offer.billingTerms` — **obrigatório**: modalidade de cobrança (pagamento único / assinatura e renovação). Aparece junto ao preço e no FAQ. Sem ele o checkout fica bloqueado.
- `CONFIG.offer.accessInfo` — como o acesso é entregue (FAQ).
- `CONFIG.offer.compatibility` — compatibilidade iOS/Android verificada (FAQ).
- `CONFIG.offer.bonusesAvailable` — `true` quando os 5 materiais estiverem prontos.

Abrindo o arquivo localmente (ou com `?preview=1` na URL) aparece um aviso no topo da oferta com tudo o que ainda falta configurar. Esse aviso não aparece para visitantes.

## Bloco de oferta
- Código: `offer/offer.js` (componentes `OfferSection`, `OfferHero`, `PhonePreview`, `MainProductCard`, `BonusCard`, `OfferStack`, `PricingCard`, `OfferFAQ`, `FinalCTA`) e `offer/offer.css`.
- Usa as respostas do quiz: nome, necessidade (muda a oração do celular), formato e estilo da tela.
- Para ver a oferta direto, abra o console do navegador e rode `go(STEPS.length-1)`.

## UTMify
Os scripts da UTMify (UTMs + pixel `6af6203b4d1f4ef96331803b`) estão no `<head>` do `index.html`, entre `<!-- UTMIFY SCRIPT -->` e `<!-- END UTMIFY PIXEL -->`. O botão de compra também repassa os `utm_*` da URL para o checkout.

## Tracking
Eventos enviados para `window.dataLayer` (GTM) e `fbq('trackCustom')`:
- Quiz: `quiz_start`, `quiz_step_complete` (com `step` e `answer`), `quiz_complete`, `result_view`.
- Oferta: `offer_view`, `bonus_section_view` (1x cada), `checkout_click` (com `location` e `configured`), `faq_interaction`.
Nenhum evento de compra é disparado no clique: registre `Purchase` na página de obrigado do checkout.

## Publicar
Qualquer hospedagem estática serve (GitHub Pages: Settings → Pages → branch `main`, pasta `/`).

## Avisos
- As prévias do celular são **ilustrativas**. O funil não promete troca automática de mensagens por hora.
- As capas dos bônus são feitas em CSS. Substitua por capas reais quando existirem.
- Use apenas nomes, logótipos e links que tenha direito de usar.

## Fotos dos bônus (Unsplash License — uso comercial gratuito)
Guardadas em `offer/img/` (otimizadas, ~1000 px). Créditos (não obrigatórios, mas recomendados):
- `bonus-bible.jpg` — Ivan Sabayuki — https://unsplash.com/photos/a-book-and-a-candle-ZB7PHTn0Zvk
- `bonus-identity.jpg` — Julia Kerner — https://unsplash.com/photos/a-person-walking-up-a-hill-at-sunset-FSnMk1bXmxY
- `bonus-path.jpg` — Rafael Peier — https://unsplash.com/photos/person-standing-on-a-grassy-hill-with-a-white-cross-IA5HjI4-Wc4
- `bonus-cards.jpg` — Aaron Burden — https://unsplash.com/photos/yellow-pencil-on-book-Pxm-TUd61vY
- `bonus-dove.jpg` — 卡晨 — https://unsplash.com/photos/two-white-doves-flying-6XcziMmkNgQ

Para trocar uma foto, substitua o arquivo em `offer/img/` mantendo o nome. As ilustrações SVG (`offer/bonus-art.js`) continuam como alternativa se uma foto for removida de `BONUS_PHOTOS`.

## Vídeo do app
`offer/video/app.mp4` (42 s, 4,3 MB, narração masculina + música de fundo original, legendas em português; começa sem som e o botão "Toque para ouvir" ativa o áudio) e `offer/video/app-poster.jpg`. Aparece na oferta depois de "Conheça o TELA DE FÉ", carrega só quando o visitante chega à secção e toca em loop. Eventos: `app_video_view`, `app_video_sound_on`.
