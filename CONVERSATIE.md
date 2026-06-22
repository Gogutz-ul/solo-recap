# SOLO Recap 2025 — Conversația (recap)

> Format conversație, doar momentele importante + keynotes. Mesajele user sunt
> rezumate fidel; răspunsurile AI sunt pe scurt cu ce s-a făcut efectiv.

---

**user:** Vreau o aplicație care rulează un slideshow de animații — recap anual de
contabilitate 2025, în tema SOLO, cu personajele din SVG-uri. Să fie amuzant, în
stil Instagram Story (pe părți, cu skip), cu buton de share. Făcut în Remotion.
Pune-mi întrebări.

**ai:** Am pus întrebări de clarificare și am propus arhitectura.
> 💡 **Decizii:** română · formular → play · share MP4 9:16 · mobile-only ·
> stack Vite+React+TS, Remotion + `@remotion/player`, server Express cu
> `@remotion/renderer` pentru MP4 (Chrome headless nu rulează în browser).

---

**user:** Rulează doar pe MOBIL — fă UI/UX și MP4-ul mobile-first.

**ai:** Am integrat mobile-first (viewport dinamic, safe-area, touch).

---

**user:** Vreau 2 activități: șofer Uber/Bolt (conduce o mașină → apar banii) și IT
(scrie cod → e surprins de bani). Animații diferite pentru fiecare.

**ai:** Scenă „Activitate" ramificată pe cele două activități. Plan aprobat → am
construit tot (scene în română, player mobil, formular, server render). MP4 ok.

---

**user:** Nu-mi place animația, aia nu e o mașină care conduce. Fă-le mai dinamice.
ȘI: nu pune fundal galben când personajul are galben (dispare).

**ai:** Am refăcut mașina, am adăugat un „stage" deschis în spatele personajelor
(ca galbenul lor să se vadă pe orice fundal) + parallax, speed lines, exhaust,
sunburst, confetti.
> 💡 Regulă fixată: personaj cu galben ≠ fundal galben.

---

**user:** Nu-mi place abordarea cu cercul alb în spatele personajelor. Textul să fie
atracția principală, centrat. Personajele pot fi în fundal, nu pe fiecare pagină.

**ai:** Redesign text-first. Intro/Persona/Final → doar text pe culori de brand.
Scenele deschise: personaj mai mic, jos, secundar. Am eliminat cercurile albe.

---

**user:** La paginile Money In / Out / Taxe: fără personaje, centrează textul, pune
facturi/bonuri specifice. Textul în centru, amuzant.

**ai:** Pagini centrate, fără personaje, cu **facturi/bonuri/ștampile** plutind
(componenta `Documents`). Copy mai jucăuș.

---

**user:** La pagina de profit: adaugă ceva pe fundal și un personaj fericit.

**ai:** Adăugat fundal animat + personaj care sărbătorește (ulterior schimbat la
varianta dark din referință).

---

**user:** Pentru pagina ȘOFER: nu-mi place mașina asta. Vreau fața personajului care
conduce ÎN mașină, apoi să apară un telefon cu informațiile.

**ai:** Mașină din față cu fața în parbriz + telefon care urcă și arată câștigurile.

---

**user:** Scenă cinematică: personajul conduce mașina SOLO (roți care se învârt,
skyline parallax, marcaje pe șosea, fum, speed lines). Apoi telefonul urcă pe parbriz,
camera face zoom, ecranul se aprinde, totalul „money in" crește live și apar curse una
câte una (Centru +42, Aeroport +58…). Apoi trece în celebrarea „venituri".

**ai:** Am construit tot timeline-ul cinematic (drive → telefon → zoom → ecran aprins
→ curse + total live → celebrare).

---

**user:** Mașina trebuie să fie din lateral.

**ai:** Refăcută ca sedan lateral.

---

**user:** [HTML de referință „SOLO Wrapped"] — ăsta e exemplul pentru șofer, arată bine.

**ai:** Am refăcut scena șofer fix după referință: **noapte/negru**, mașină rideshare
line-art alb (semn pe acoperiș galben, far aprins, roți cu spițe rotative), șofer în
geam luminat, skyline parallax, **zoom în telefon** care **se aprinde** și totalul
crește în timp ce **cursele apar una câte una**.
> 💡 Am generat **variante albe** ale personajelor pentru fundal negru; am adăugat
> mod `plain` la counter (am reparat „lei lei" dublat).

---

**user:** Telefonul e prea mare, umple toată pagina.

**ai:** Am redus zoom-ul (3.1× → 2.25×) și înălțimea ecranului — încape cu margini.

---

**user:** La pagina de profit folosește structura asta (personaj pe flori, apoi text,
animații pe fundal). ȘI: după ce se termină animația de money in, mai dă câteva secunde.

**ai:** Profit dark cu monede care urcă, glow, personajul relaxat printre flori (char
20, varianta albă) + text + copy. Am prelungit ținuta activității (~+3s).

---

**user:** Profitul e prea rapid, mai adaugă cadre.

**ai:** Am extins durata scenei de profit (120 → 185 cadre, ~3.5s ținută).

---

**user:** Eroare: după start din formular, video nu pornește, trebuie să apăs. Fă-l să
pornească când apare.

**ai:** `autoPlay` pornea înainte să se încarce asset-urile. Am adăugat un loop care
reîncearcă `play()` până pornește efectiv.

---

**user:** Adaugă o pagină nouă ca asta: „FAȚĂ DE ANUL TRECUT" +36% (vs anul trecut).

**ai:** Scenă nouă „Creștere" (procent verde + grafic care urcă + personaj). Am adăugat
câmpul `Venituri anul trecut` în formular și schemă.

---

**user:** Fă textul „mereu pe drum" cu majuscule. → (apoi) și la IT.

**ai:** „MEREU PE DRUM" și „COD, COD, COD" cu majuscule.

---

**user:** Scoate butonul de pe toate paginile și adaugă o pagină de sumar la final
(ca în imagine).

**ai:** Am scos butonul persistent. Scenă **Sumar** finală (card: Activitate, Venituri,
Cheltuieli, Profit, Titlu) + butoane de acțiune la final.

---

**user:** În sumar vreau 2 opțiuni: share la prieteni sau redă din nou.

**ai:** Două butoane: **Distribuie prietenilor** și **Vezi din nou**.

---

**user:** „Distribuie prietenilor" să deschidă WhatsApp și să trimită doar sumarul (nu
tot video-ul). Și butoanele să fie pe pagina de sumar animată, fără să oprești animația.

**ai:** Share-ul trimite **doar imaginea sumarului** (PNG via `/api/image`) prin share
sheet (WhatsApp). Butoanele apar pe scena de sumar în timp ce rulează.
> 💡 Pe web nu poți forța imaginea direct în WhatsApp — share sheet-ul e singura cale.

---

**user:** Publică pe Netlify. (întrerupt) → Înainte, pune niște muzică românească.

**ai:** Am explicat că nu pot pune o piesă cu drepturi de autor pe un site public.
Ales: royalty-free + autoplay cu sunet. Am adăugat „Folk Round" (Kevin MacLeod, CC-BY),
cu fade in/out, în player și în MP4.

---

**user:** Pune piesa asta (Bruno Mars), doar refrenul. → E pentru POC, local, nu se
publică.

**ai:** Pentru public am refuzat (drepturi de autor). Pentru **POC local** am pus
fișierul tău la `public/music.mp3` și l-am setat să înceapă la refren prin `trimBefore`
(`CHORUS_START_SEC` în `RecapComposition.tsx`).
> 💡 De înlocuit cu piesă licențiată/royalty-free înainte de orice publicare.

---

**user:** close

**ai:** Am oprit serverele dev (:5173 și :3001).

---

**user:** Exportă conversația ca md.

**ai:** Am creat `CONVERSATION.md` (changelog structurat al sesiunii).

---

**user:** Fă un md cu conversația, format user/ai, doar ce e important + keynotes.

**ai:** Am creat `CONVERSATIE.md` (fișierul ăsta).

---

**user:** [solo-recap.netlify.app] „Distribuie prietenilor" nu merge — nu apare nimic
de selectat. Vreau să aleg unde, cu un text care conține link-ul și poza cu sumarul;
dacă Netlify nu acceptă poza, doar textul.

**ai:** Cauza: pe Netlify (static) nu există server, deci `/api/image` dădea 404 și
eroarea era înghițită → nu se întâmpla nimic. Am rescris share-ul **complet
client-side**: generez imaginea sumarului în browser (canvas) și deschid share
picker-ul cu **text + link (+ imagine)**; dacă nu se poate imaginea → doar text;
dacă nu există Web Share → copiez link-ul și deschid WhatsApp Web cu textul.
> 💡 Netlify e static → orice depindea de server (MP4/imagine) nu merge acolo;
> de-aia share-ul e acum 100% client-side. Necesită redeploy.

---

**user:** Când țin apăsat pe ecran ca să dau pauză, se selectează/copiază textul. Stop.

**ai:** Am pus `user-select: none` + `-webkit-touch-callout: none` pe player și pe
tap-layer, și am blocat meniul contextual la long-press. Verificat: stil aplicat.

---

**user:** Fă toate slide-urile mai lungi, e prea rapid. Și după ultimul slide ține
sumarul (nu sări la primul slide), ține-l să ruleze până apăs un buton — fără să
oprești animația.

**ai:** Am mărit durata fiecărei scene (ex: Intro 90→140, Cheltuieli 120→195,
Profit 185→235, etc.). Și am pus sumarul să se bucleze la final ca să rămână animat.

---

**user:** Tot nu e bine — după ultimul slide afișează primul slide.

**ai:** Cauza reală: după ce player-ul ajunge la final („ended"), `play()` repornește
de la primul slide. Am schimbat: **buclez înainte de final** — la `frameupdate`, când
frame-ul se apropie de capăt, dau `seekTo` înapoi în sumar cât încă rulează, deci nu
mai intră în starea „ended" și nu mai sare la slide 1. Sumarul rămâne animat până apeși
un buton.
> 💡 `play()` după „ended" repornește de la 0 → soluția e să bucle**zi înainte** de
> final, nu după.

---

**user:** stop servers

**ai:** Am oprit serverul web (:5173).

---

## Keynotes finale
- O singură sursă de adevăr: `config.ts` (`SCENES`) → driveuiește și compoziția
  (`TransitionSeries`) și progress bars + skip din player. Slide-urile au durate mărite
  pentru citit comod.
- Personaje pe fundal negru → variante albe generate; pe galben → fără personaj sau pe
  stage deschis (regula galben-pe-galben).
- **Share = 100% client-side** (canvas în browser) → merge pe Netlify static, fără server;
  text + link (+ imagine când e suportat), altfel doar text.
- **Sumarul se buclează** la final (seek înapoi înainte de „ended") ca să rămână animat și
  să nu sară la primul slide; rămâne până la apăsarea unui buton.
- Render MP4 (`/api/render`) tot necesită server Node (Chrome headless) — doar local;
  share-ul nu mai depinde de el.
- Muzica POC = piesă cu drepturi de autor → **doar local**, de schimbat înainte de publicare.
- Long-press pe player nu mai selectează text (`user-select: none`).
- De ținut minte: **redeploy** (`npm run build` + `netlify deploy --prod --dir=dist`)
  după modificări ca să apară pe site.
