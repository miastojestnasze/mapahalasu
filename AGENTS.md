# AGENTS.md — mapahałasu

Kontekst dla agentów AI pracujących z tym repozytorium.

## Czym jest ten projekt

Statyczna strona internetowa wyświetlająca dane z czujników hałasu w Warszawie.
Frontend-only — cały JS jest inline w plikach HTML, brak bundlera/frameworka.
Dane pobierane z API noise-servera przez `fetch()`.

## Powiązane repozytoria

- **noise-server** (`/home/szalaj/repos/noise-server/`) — backend API zbierający pomiary
- **halas** (`/home/szalaj/repos/halas/`) — skrypty analityczne i pomocnicze

## Architektura

```
Czujniki → noise-server (EC2:5555) → GET /samples → ta strona (S3 + CloudFront)
```

Strona nie ma własnego backendu — jest serwowana statycznie z S3.
Dane pobiera bezpośrednio z `https://noise.kredytoweobliczenia.pl/samples`.

## Struktura plików

```
strona/
├── static.html    — mapa (Leaflet.js, inline JS)
├── wykresy.html   — wykresy (Chart.js, inline JS)
├── omapie.html    — strona informacyjna
├── styles.css     — wspólne style
├── sensors.js     — definicje czujników + konfiguracja API
└── *.png, *.ico   — grafiki
```

## Konwencje kodu

- Cały JS jest inline w plikach HTML (brak osobnych plików .js oprócz sensors.js)
- `sensors.js` eksportuje globalne zmienne: `sensorNames`, `API_URL`, `API_DEFAULT_LIMIT`, `buildApiUrl()`
- Mapa używa Leaflet.js, wykresy Chart.js — ładowane z CDN
- Style współdzielone przez `styles.css`, załadowany w każdym HTML
- Czcionka: Figtree (Google Fonts)

## Jak dodać czujnik

1. Dodaj wpis do `sensorNames` w `strona/sensors.js`:
   ```javascript
   'sensor-id': {
       'adres': 'Dzielnica, ul. Nazwa',
       'latitude': 52.xxx,
       'longitude': 20.xxx
   }
   ```
2. Jeśli czujników > 9, dodaj kolor do tablicy `sensorColors` w `strona/wykresy.html`
3. Dane muszą pojawiać się w API pod tym samym `id` — konfiguracja po stronie noise-server

## Jak robić deploy

AWS profil: `raspi`

```bash
aws s3 sync strona/ s3://mapahalasu.miastojestnasze.org/ --profile raspi --delete
aws cloudfront create-invalidation --distribution-id E159RA1X9TXVNP --paths "/*" --profile raspi
```

## Format danych z API

```json
GET /samples?offset=0&limit=50000
[
  {"id": "mjn-cz-noise-4", "timestamp": 1773175117, "loudness": 47.4, "SPL": 47.4, "Lmax": 57.9, "Leq": 43.4},
  {"id": "svantek-1", "timestamp": 1773127500, "loudness": 65.7, "SPL": 65.7, "Lmax": 65.7, "Leq": 65.7}
]
```

- `loudness` = `SPL` (zachowane dla kompatybilności wstecznej)
- Czujniki Svantek mają SPL = Lmax = Leq (dostarczają tylko LAeq)
- Strona filtruje dane do czujników zdefiniowanych w `sensorNames` (nieznane ID są ignorowane)

## EC2 noise-server — informacje operacyjne

- IP: `16.16.13.212`
- SSH: `ssh -i ~/.ssh/noise-server.pem ec2-user@16.16.13.212`
- Katalog: `/home/ec2-user/noise-server/`
- Usługi: `noise-server.service` (port 5555), `svantek-poller.service`
- Restart: `sudo systemctl restart noise-server`
