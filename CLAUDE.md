# mapahałasu

Strona internetowa wizualizująca dane z czujników hałasu w Warszawie.
Projekt stowarzyszenia Miasto Jest Nasze.

Strona: https://mapahalasu.miastojestnasze.org/
Organizacja GitHub: https://github.com/miastojestnasze

## Architektura systemu

```
Czujniki Milesight WS302 (LoRaWAN)
        │
        ▼
The Things Industries (webhook)
        │ POST /samples (format TTN)
        ▼
   noise-server (EC2, port 5555)  ◄── svantek-poller (systemd)
        │                                    │
        │                              Svantek API
        │                              POST /ingest
        ▼
  Strona (S3 + CloudFront)
  fetch GET /samples
```

- **noise-server** — backend Python (Starlette/uvicorn), zbiera i serwuje pomiary
  - repo: https://github.com/miastojestnasze/noise-server
  - lokalne repo: `/home/szalaj/repos/noise-server/`
  - API publiczne: `https://noise.kredytoweobliczenia.pl`
  - EC2: `16.16.13.212` (SSH: `ssh -i ~/.ssh/noise-server.pem ec2-user@16.16.13.212`)
  - katalog na EC2: `/home/ec2-user/noise-server/`
  - usługi systemd: `noise-server.service`, `svantek-poller.service`
- **mapahalasu** (to repo) — frontend (statyczny HTML/CSS/JS), hostowany na S3
- **halas** — repo pomocnicze ze skryptami analitycznymi (`/home/szalaj/repos/halas/`)

## Struktura projektu

- `strona/` — pliki strony deployowane na S3
  - `static.html` — główna strona z mapą (Leaflet.js)
  - `wykresy.html` — strona z wykresami (Chart.js)
  - `omapie.html` — strona informacyjna "O mapie"
  - `styles.css` — wspólny arkusz stylów
  - `sensors.js` — konfiguracja czujników (ID, adresy, współrzędne) + konfiguracja API
  - `logo.png`, `syrenka_halas.png`, `favicon.ico` — grafiki

## Czujniki

### Milesight WS302 (8 sztuk, ID: `mjn-*`)

Czujniki LoRaWAN mierzące SPL (LAI), Lmax (LAImax) i Leq (LAeq).
Dane przesyłane przez The Things Industries → webhook → `POST /samples` noise-servera.

Dokumentacja: https://www.milesight.com/iot/product/lorawan-sensor/ws302

### Svantek (1 sztuka, ID: `svantek-1`)

Profesjonalna stacja pomiarowa na Woli, Al. Prymasa Tysiąclecia.
Dostarcza tylko LAeq (SPL i Lmax wypełniane tą samą wartością).

Dane pobierane co 60s przez `svantek-poller` z Svantek API → `POST /ingest` noise-servera.
- Svantek API: `POST https://svannet.com/api/v2.5/projects-get-result-data.php`
- Projekt: 11138, Punkt: 0
- Token API: zmienna `SVANTEK_TOKEN` (plik `.env` na EC2)
- Kod pollera: `/home/szalaj/repos/noise-server/svantek_poller/poller.py`

## Dodawanie nowego czujnika

1. Jeśli czujnik Milesight — skonfigurować webhook w The Things Industries na `POST /samples`
2. Jeśli inny typ — napisać poller wysyłający dane na `POST /ingest` (format: `{"id": "...", "timestamp": <unix>, "Leq": <val>}`)
3. Dodać wpis w `strona/sensors.js` (ID, adres, współrzędne)
4. Jeśli >9 czujników — dodać kolor do palety `sensorColors` w `strona/wykresy.html`
5. Deploy strony na S3

## Deploy strony na S3

AWS profil: `raspi`

```bash
aws s3 sync strona/ s3://mapahalasu.miastojestnasze.org/ --profile raspi --delete
aws cloudfront create-invalidation --distribution-id E159RA1X9TXVNP --paths "/*" --profile raspi
```

## Deploy noise-server na EC2

Opcja A — przez CI/CD (push na `main` w GitHub → automatyczny SCP + SSH)
Opcja B — ręcznie:
```bash
scp -i ~/.ssh/noise-server.pem <pliki> ec2-user@16.16.13.212:/home/ec2-user/noise-server/
ssh -i ~/.ssh/noise-server.pem ec2-user@16.16.13.212 "sudo systemctl restart noise-server"
```

## Kluczowe pliki do edycji

- Nowy czujnik → `strona/sensors.js`
- Wygląd strony → `strona/styles.css`, `strona/static.html`, `strona/wykresy.html`
- Logika mapy → `strona/static.html` (inline JS z Leaflet)
- Logika wykresów → `strona/wykresy.html` (inline JS z Chart.js)
