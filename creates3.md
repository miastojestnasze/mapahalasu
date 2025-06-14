Jestem deweloperem stron internetowych.

W pliku templates/map.html jest stworzona wersja strona używająca serwera FastAPI, który jest zdefiniowany
w pliku app.py. Jednym endpointów aplikacji jest /dane_czujnikow, który wykorzystuje map.html.
Endpoint /dane_czujnikow łączy się z serwerem http://vps-76e4aba0.vps.ovh.net/samples 
W tym serwerze są dane z czujników hałasu. 

Chciałbym uprościć działanie strony. To znaczy , żeby strona map.html bezpośrednio pobierała dane z serwera
http://vps-76e4aba0.vps.ovh.net/samples . Celem uproszczenia jest stworzenie statycznej strony, która będzie hostowana w buckecie S3 AWS.

Stwórz nową wersję strony ze zmianami na podstawie map.html i zapisz ją w pliku templates/static.html