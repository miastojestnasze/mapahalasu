# Zadania do wykonania

## 1. Zmniejszyć limit zapytania API / dodać filtr czasowy
**Priorytet:** krytyczny
**Pliki:** `strona/static.html`, `strona/wykresy.html`, `strona/sensors.js`

### Plan:
- Przenieść URL API do `sensors.js` jako stałą (łączy się z zadaniem 3)
- Na stronie mapy (`static.html`) — pobierać tylko dane z ostatnich 48h zamiast wszystkich
- Na stronie wykresów (`wykresy.html`) — pobierać dane zależnie od wybranego zakresu (24h / tydzień / miesiąc) + bufor
- Jeśli API obsługuje parametry filtrowania po czasie — użyć ich
- Jeśli nie — zbadać API i rozważyć dodanie takiego filtra po stronie backendu

## 2. Wybrać jedną bibliotekę wykresów (Chart.js vs D3)
**Priorytet:** wysoki
**Pliki:** `strona/static.html`, `strona/wykresy.html`

### Plan:
- Zdecydować się na jedną bibliotekę (Chart.js jest prostsza i lżejsza, wystarczy do tego projektu)
- Przepisać wykresy w `wykresy.html` z D3 na Chart.js
- Usunąć import D3 z `wykresy.html`
- Upewnić się, że wykresy w popupach mapy (`static.html`) i na stronie wykresów działają spójnie
- Przetestować na mobile

## 3. Przenieść URL API do sensors.js
**Priorytet:** wysoki
**Pliki:** `strona/sensors.js`, `strona/static.html`, `strona/wykresy.html`

### Plan:
- Dodać stałą `const API_URL = 'https://vps-76e4aba0.vps.ovh.net/samples'` w `sensors.js`
- W `static.html` i `wykresy.html` zastąpić hardcoded URL odwołaniem do `API_URL`
- Usunąć duplikację kodu tworzenia URL z parametrami — wyciągnąć do wspólnej funkcji w `sensors.js`

## 4. Naprawić lang="pl" we wszystkich plikach HTML
**Priorytet:** niski (szybka poprawka)
**Pliki:** `strona/static.html`, `strona/wykresy.html`

### Plan:
- Zmienić `<html lang="en">` na `<html lang="pl">` w `static.html` i `wykresy.html`
- `omapie.html` już ma poprawnie `lang="pl"` — nie wymaga zmian

## 5. Wyczyścić zakomentowany/martwy kod
**Priorytet:** niski (szybka poprawka)
**Pliki:** `strona/static.html`, `strona/wykresy.html`

### Plan:
- Usunąć zakomentowane linie `latestSensorData.delete('mjn-cz-noise-7')` z `static.html:383-386`
- Usunąć zakomentowane `delete groupedData['mjn-cz-noise-7']` z `wykresy.html:520-521`
- Usunąć zakomentowany `console.log` z `static.html:388`
- Usunąć zakomentowany `console.log` z `static.html:567-568`
- Przejrzeć resztę kodu pod kątem nieużywanych zmiennych (np. `labels` w `static.html:94`)

## 6. Rozwiązać kolizje CSS
**Priorytet:** średni
**Pliki:** `strona/styles.css`

### Plan:
- `.legend` ma dwie definicje (linia 84 dla mapy Leaflet, linia 201 dla D3) — rozdzielić na `.map-legend` i `.chart-legend`
- `.loading-indicator` ma dwie definicje (linia 100 i 216) — rozdzielić na konteksty `.map-layout .loading-indicator` i `.charts-layout .loading-indicator`
- Przenieść globalne selektory `h1`, `p` (linie 364-373) pod `.about-layout` żeby nie wpływały na inne strony
- Zaktualizować odpowiednie klasy w plikach HTML

## 7. Zoptymalizować obrazek syrenki
**Priorytet:** niski
**Pliki:** `strona/syrenka_halas.png`

### Plan:
- Sprawdzić wymiary obrazka (prawdopodobnie dużo większy niż potrzeba — wyświetlany max 250px)
- Przeskalować do max 500px szerokości (2x dla retina)
- Skonwertować do WebP z fallbackiem PNG (lub po prostu zoptymalizować PNG)
- Użyć narzędzia typu `cwebp` lub `optipng`
- Zaktualizować odwołania w HTML jeśli zmieni się nazwa pliku

## 8. Naprawić wyciek pamięci Chart.js w popupach
**Priorytet:** średni
**Pliki:** `strona/static.html`

### Plan:
- Przechowywać referencje do utworzonych instancji Chart w mapie `chartInstances = {}`
- Przed utworzeniem nowego wykresu sprawdzić czy istnieje stary i wywołać `.destroy()`
- Nasłuchiwać na zdarzenie `popupclose` i niszczyć chart
- Przetestować wielokrotne otwieranie/zamykanie popupów

## 9. Dodać favicon i meta description
**Priorytet:** niski
**Pliki:** `strona/static.html`, `strona/wykresy.html`, `strona/omapie.html`

### Plan:
- Przygotować favicon (wyciąć z logo.png lub syrenki, 32x32 i 16x16)
- Dodać `<link rel="icon" href="favicon.ico">` do każdego pliku HTML
- Dodać `<meta name="description" content="...">` z opisem strony po polsku
- Opcjonalnie dodać tagi Open Graph (`og:title`, `og:description`, `og:image`) dla lepszego udostępniania w social media

## 10. Posprzątać inline styles
**Priorytet:** niski
**Pliki:** `strona/static.html`, `strona/wykresy.html`, `strona/omapie.html`, `strona/styles.css`

### Plan:
- Zidentyfikować wszystkie `style="..."` w HTML
- Przenieść je do odpowiednich klas w `styles.css`
- Dotyczy głównie: `omapie.html` (obrazek syrenki, lista celów), `wykresy.html` (przycisk "Odznacz"), `static.html` (etykiety na mapie)
- Etykiety na mapie generowane dynamicznie w JS — tam inline style jest akceptowalny (Leaflet divIcon)
