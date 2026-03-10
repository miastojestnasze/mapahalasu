# Zadania do wykonania

## 1. ~~Zmniejszyć limit zapytania API / dodać filtr czasowy~~ DONE
- Domyślny limit zmieniony z 30M na 50 000
- Mapa używa limit 5000 (~48h danych)
- Limit konfigurowalny w `sensors.js` (`API_DEFAULT_LIMIT`)

## 2. ~~Wybrać jedną bibliotekę wykresów (Chart.js)~~ DONE
- Przepisano `wykresy.html` z D3 na Chart.js
- Dodano `chartjs-adapter-date-fns` do obsługi osi czasu
- Usunięto zbędne reguły CSS dla D3

## 3. ~~Przenieść URL API do sensors.js~~ DONE
- Dodano `API_URL` i `buildApiUrl()` w `sensors.js`
- Usunięto zduplikowany URL z obu plików HTML

## 4. ~~Naprawić lang="pl"~~ DONE
- Zmieniono `lang="en"` → `lang="pl"` w `static.html` i `wykresy.html`

## 5. ~~Wyczyścić zakomentowany/martwy kod~~ DONE
- Usunięto zakomentowane bloki, console.log, nieużywane zmienne

## 6. ~~Rozwiązać kolizje CSS~~ DONE
- `.loading-indicator` scopowany pod `.map-layout` i `.charts-layout`
- Globalne `h1`, `p` scopowane pod `.about-layout`

## 7. ~~Zoptymalizować obrazek syrenki~~ DONE
- 390KB → 27KB (93% mniejszy)
- Przeskalowano do 500px, zredukowano kolory

## 8. ~~Naprawić wyciek pamięci Chart.js w popupach~~ DONE
- Dodano `popupCharts` — mapa instancji Chart.js
- Stare wykresy niszczone przed tworzeniem nowych
- Usunięto nieużywaną funkcję `createNoiseChart`

## 9. ~~Dodać favicon i meta description~~ DONE
- Favicon wygenerowany z syrenki (32x32)
- Meta description dodany do wszystkich 3 stron

## 10. ~~Posprzątać inline styles~~ DONE
- Przeniesiono style z `omapie.html`, `wykresy.html`, `static.html` do CSS
- Dynamiczne inline styles (JS/Leaflet) zostawione — akceptowalne
