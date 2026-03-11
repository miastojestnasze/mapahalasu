# mapahałasu

Projekt zawiera repozytorium małej strony internetowej hostowanej na S3 bucket (aws).

Strona przedstawia wizualizację danych pomiarowych z czujników hałasu ulokowanych w Warszawie.

Strona jest obecnie widoczna w domenie https://mapahalasu.miastojestnasze.org/

# Struktura projektu

- `strona/` — pliki strony internetowej (HTML, CSS, JS, obrazki), deployowane na S3
  - `static.html` — główna strona z mapą
  - `wykresy.html` — strona z wykresami
  - `omapie.html` — strona "O mapie"
  - `styles.css` — arkusz stylów
  - `sensors.js` — konfiguracja czujników
  - `logo.png`, `syrenka_halas.png` — grafiki
- `convert_to_pdf.py` — skrypt pomocniczy do konwersji PDF
- `scenariusz.txt` — scenariusz
- `zadania.md` — lista zadań

# Czujniki pomiarowe


Milesight WS302 to inteligentny czujnik poziomu dźwięku, zapewniający pomiar 
w zakresie od 30 dB do 130 dB, z możliwością konfiguracji parametrów przez sieć LoRaWAN. 
Doskonały do monitorowania hałasu w miejscach publicznych, przemysłowych itd.

ref 1: https://iotsolution.sklep.pl/pl/products/czujnik-poziomu-dzwieku-lorawan-milesight-ws302-124.html
ref 2: https://www.milesight.com/iot/product/lorawan-sensor/ws302
ref 3: https://resource.milesight.com/milesight/iot/document/ws302-user-guide-en.pdf
ref 4: https://github.com/Milesight-IoT/SensorDecoders
ref 5: https://resource.milesight.com/milesight/iot/document/ws302-datasheet-en.pdf


# Svantek — stacja pomiarowa

Czujnik Svantek (ID: `svantek-1`) to profesjonalna stacja pomiarowa zlokalizowana na Woli,
Al. Prymasa Tysiąclecia. Dostarcza tylko metrykę LAeq (brak osobnych SPL/Lmax).

Dane pobierane są z Svantek API (`POST https://svannet.com/api/v2.5/projects-get-result-data.php`,
projekt 11138, punkt 0) przez svantek-poller — usługę systemd na EC2.

Poller wysyła dane na endpoint `POST /ingest` noise-servera w formacie:
`{"id": "svantek-1", "timestamp": <unix>, "Leq": <value>}`

Kod pollera: `noise-server/svantek_poller/poller.py`

# zrodlo danych

Czujniki Milesight przesylaja dane na platforme: https://mjn-noise.eu1.cloud.thethings.industries
z której za pomocą webhooka dane trafiają na `POST /samples` noise-servera (format TTN).

Czujnik Svantek — dane pobierane przez svantek-poller na `POST /ingest` noise-servera.

repo noise-server : https://github.com/miastojestnasze/noise-server
