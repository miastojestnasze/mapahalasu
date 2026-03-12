# Mapa Hałasu — Miasto Jest Nasze

Interaktywna mapa prezentująca pomiary hałasu z czujników rozmieszczonych w Warszawie.

Strona: https://mapahalasu.miastojestnasze.org/

## Funkcje

- **Mapa** (`static.html`) — interaktywna mapa Leaflet z markerami czujników, kolorowe kółka pokazujące aktualny poziom hałasu (Lmax/Leq)
- **Wykresy** (`wykresy.html`) — wykresy Chart.js z porównaniem danych z czujników w czasie
- **O mapie** (`omapie.html`) — informacje o projekcie

## Czujniki

- **8x Milesight WS302** — czujniki LoRaWAN (ID: `mjn-*`), mierzą SPL, Lmax, Leq
- **1x Svantek** — profesjonalna stacja pomiarowa (ID: `svantek-1`), mierzy LAeq

Konfiguracja czujników: `strona/sensors.js`

## Architektura

Strona jest w pełni statyczna (HTML/CSS/JS), hostowana na AWS S3 + CloudFront.
Dane pobierane z API noise-servera: `https://noise.kredytoweobliczenia.pl/samples`

Backend: [noise-server](https://github.com/miastojestnasze/noise-server)

## Deploy

```bash
aws s3 sync strona/ s3://mapahalasu.miastojestnasze.org/ --profile raspi --delete
aws cloudfront create-invalidation --distribution-id E159RA1X9TXVNP --paths "/*" --profile raspi
```
