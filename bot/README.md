# Klarlöst – personaliserad demo-bot

Statisk sida (ingen backend, inga externa tjänster utöver Google Fonts som har fallback). Fungerar offline genom att öppna `index.html` direkt.

Filer: `index.html` (sida + chattmotor), `industries.js` (all branschdata – redigera svar här; `{f}` = företagsnamnet).

## Länkformat

```
https://klarlost.github.io/demo/bot/?f=<Företagsnamn URL-kodat>&b=<branschnyckel>[&q=<Extra fråga 1>|<Extra fråga 2>]
```

- `f` – företagsnamn (max 60 tecken). Saknas → "Ert företag".
- `b` – branschnyckel (se nedan). Okänd/saknad → generisk bot.
- `q` – valfritt, upp till 4 extra föreslagna frågor separerade med `|`. De besvaras med ett generiskt "svaret läggs in när boten byggs" + kontaktformulär.
- URL-koda å/ä/ö/mellanslag: `Rör` → `R%C3%B6r`, mellanslag → `%20`. I Python: `urllib.parse.quote("Kungsbacka Rör")`.

Alias som också fungerar: rör, elektriker, snickare, målare, advokat, mäklare, tandläkare, fysio, naprapat, kiropraktor, djur, cafe, verkstad, bilhandel, städ/stadning, akeri, webshop, e-handel, bemanning, frisor, industri, partihandel.

## Branschnycklar och exempellänkar

| Nyckel | Bransch | Exempel |
|---|---|---|
| vvs | VVS & rör | https://klarlost.github.io/demo/bot/?f=Kungsbacka%20R%C3%B6r&b=vvs |
| el | Elinstallation | https://klarlost.github.io/demo/bot/?f=M%C3%B6lndals%20El&b=el |
| bygg | Bygg & hantverk | https://klarlost.github.io/demo/bot/?f=Hisingens%20Bygg&b=bygg |
| maleri | Måleri | https://klarlost.github.io/demo/bot/?f=Partille%20M%C3%A5leri&b=maleri |
| redovisning | Redovisning & bokföring | https://klarlost.github.io/demo/bot/?f=Lindgrens%20Redovisning&b=redovisning |
| juridik | Juridik | https://klarlost.github.io/demo/bot/?f=Advokatfirman%20V%C3%A4st&b=juridik |
| maklare | Fastighetsmäklare | https://klarlost.github.io/demo/bot/?f=Askim%20M%C3%A4kleri&b=maklare |
| tandvard | Tandvård | https://klarlost.github.io/demo/bot/?f=Tandl%C3%A4karna%20i%20M%C3%B6lndal&b=tandvard |
| klinik | Fysio / naprapat | https://klarlost.github.io/demo/bot/?f=Linn%C3%A9%20Naprapati&b=klinik |
| veterinar | Veterinär | https://klarlost.github.io/demo/bot/?f=Djurkliniken%20Kungsladug%C3%A5rd&b=veterinar |
| gym | Gym & träning | https://klarlost.github.io/demo/bot/?f=Majorna%20Gym&b=gym |
| restaurang | Restaurang / café | https://klarlost.github.io/demo/bot/?f=Majorna%20Bistro&b=restaurang |
| catering | Catering | https://klarlost.github.io/demo/bot/?f=V%C3%A4stkust%20Catering&b=catering |
| hotell | Hotell & boende | https://klarlost.github.io/demo/bot/?f=Hotell%20Hamnen&b=hotell |
| bil | Bilverkstad & bilhandel | https://klarlost.github.io/demo/bot/?f=Torslanda%20Bilservice&b=bil |
| stad | Städ | https://klarlost.github.io/demo/bot/?f=Rent%20%26%20Klart%20St%C3%A4d&b=stad |
| flytt | Flytt | https://klarlost.github.io/demo/bot/?f=G%C3%B6teborgs%20Flytthj%C3%A4lp&b=flytt |
| transport | Transport & åkeri | https://klarlost.github.io/demo/bot/?f=Kortedala%20%C3%85keri&b=transport |
| ehandel | E-handel | https://klarlost.github.io/demo/bot/?f=Nordisk%20Inredning&b=ehandel |
| rekrytering | Rekrytering & bemanning | https://klarlost.github.io/demo/bot/?f=V%C3%A4st%20Bemanning&b=rekrytering |
| it | IT-tjänster | https://klarlost.github.io/demo/bot/?f=Kustens%20IT&b=it |
| trafikskola | Trafikskola | https://klarlost.github.io/demo/bot/?f=Fr%C3%B6lunda%20Trafikskola&b=trafikskola |
| forsakring | Försäkring | https://klarlost.github.io/demo/bot/?f=V%C3%A4st%20F%C3%B6rs%C3%A4kringsf%C3%B6rmedling&b=forsakring |
| tillverkning | Tillverkning & industri | https://klarlost.github.io/demo/bot/?f=Alings%C3%A5s%20Mekaniska&b=tillverkning |
| grossist | Grossist & partihandel | https://klarlost.github.io/demo/bot/?f=V%C3%A4stgross&b=grossist |
| salong | Frisör & skönhet | https://klarlost.github.io/demo/bot/?f=Salong%20Lumi&b=salong |
| (default) | Generisk | https://klarlost.github.io/demo/bot/?f=Exempelf%C3%B6retaget |

Exempel med extra frågor:
`https://klarlost.github.io/demo/bot/?f=Majorna%20Bistro&b=restaurang&q=Har%20ni%20uteservering%3F|Kan%20man%20ta%20med%20hund%3F`

## Vad boten gör
- Brandad chatt ("<Företag> – digital assistent"), hälsning per bransch, 4–5 klickbara frågor med skriptade svar.
- Fritext med enkel nyckelordsmatchning (bransch-frågor + generella: hej, tack, öppettider, adress, boka, pris, prata med människa) och en ärlig fallback.
- Åtgärder: tidsval (fejkade lediga tider kommande vardagar) → bekräftelseformulär; offertförfrågan; "bli kontaktad". Inget skickas – bara en bekräftelse visas.
- Panel "Det här skulle boten göra för er" med 3 branschnyttor. Inga riktiga priser/öppettider för företaget – bara "enligt <företag>s prislista" o.d.

## Språk, kontaktläge och WhatsApp-utseende (nytt 2026-10-26)

Utan `lang` beter sig sidan **exakt som förut** (svenska, med kontaktuppgifter). Alla gamla länkar fungerar oförändrat.

| Parameter | Värden | Effekt |
|---|---|---|
| `lang` | `en`, `es` | Engelska/spanska (data i `industries_en.js` / `industries_es.js`, motor i `i18n.js`). Annat/saknat = svenska. |
| `contact` | `0` / `1` | `0` = inga telefon/e-post/kontaktlänkar (plattformssäkert). **Standard i en/es är kontaktfritt**; `contact=1` visar dem. I svenska är standard som förut (med kontakt). |
| `ui` | `wa` (alias `theme=whatsapp`) | WhatsApp-utseende (grön header, bubblor med ✓✓). |

Nya nycklar (främst en/es): `support` (kundtjänst-FAQ + orderuppslag + överlämning), `wellness` (D2C/onlinekurs: åtkomst, betalning, återbetalning), `leadgen` (kvalificering 3 frågor → leadsammanfattning → bokning). I svenska faller de tillbaka på generisk bot.
Engelska alias: car, auto, dealership, store, shop, ecommerce, faq, helpdesk, lead, leads, course, health m.fl.

Nya åtgärder i en/es: `order` (ordernummer → status + "loggat i supportarket"), `handoff` (överlämning till människa med orsak + hela historiken), `qualify` (leadkvalificering). Okänd fritext i `support`/`ehandel`/`wellness` → överlämning med orsak "låg matchning".

Exempel:
- https://klarlost.github.io/demo/bot/?lang=en&f=Your%20Business&b=leadgen
- https://klarlost.github.io/demo/bot/?lang=en&f=Your%20Dealership&b=bil
- https://klarlost.github.io/demo/bot/?lang=en&f=Your%20Support%20Desk&b=support&ui=wa
- https://klarlost.github.io/demo/bot/?lang=es&f=Your%20Support%20Desk&b=support&ui=wa
- https://klarlost.github.io/demo/bot/?lang=en&f=Your%20Store&b=ehandel&ui=wa
- https://klarlost.github.io/demo/bot/?lang=en&f=Your%20Wellness%20Brand&b=wellness&ui=wa
- Svenska utan kontaktuppgifter: https://klarlost.github.io/demo/bot/?f=Test&b=bil&contact=0

## Publicera
Kopiera `index.html`, `industries.js`, `industries_en.js`, `industries_es.js`, `i18n.js` (och README.md) till mappen `bot/` i repot `klarlost/demo` och pusha/ladda upp (GitHub Pages serverar då `https://klarlost.github.io/demo/bot/`).
