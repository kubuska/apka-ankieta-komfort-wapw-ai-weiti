# Ankieta dotycząca komfortu podczas zajęć — aktualizacja

## Formularz
Sześć pytań wymaganych: płeć (w tym możliwość niepodawania), miejsce w siatce 3 × 3, temperatura, odczucie duszności, ból głowy i skupienie 1–20. Komentarz dotyczący skupienia jest opcjonalny (maksymalnie 500 znaków).
Rząd 1 jest najbliżej tablicy. Kolumny są wskazane z perspektywy osoby patrzącej na tablicę. Numeracja pól: 1–3 z przodu, 4–6 w środku, 7–9 z tyłu.
Po wysłaniu można rozpocząć nową odpowiedź. Suwak wymaga świadomego wskazania oceny. Przy błędzie sieci ponawiana jest ta sama odpowiedź z tym samym identyfikatorem, aby uniknąć duplikatów.

## Dane i eksport
Nie zmieniono istniejącej bazy ani historycznych odpowiedzi. Nowe wpisy są oznaczane wersją comfort-v2. Kolumna rating zawiera skupienie, frequency znacznik wersji, a comment obiekt JSON z pozostałymi odpowiedziami. Eksport CSV zamienia te dane na osobne, nazwane kolumny, w tym rząd i kolumnę siedzenia. Data zapisu jest zapisywana na serwerze w UTC. Nie jest zapisywany identyfikator osoby; pomiary nie są łączone z konkretnym respondentem.
Panel /admin umożliwia osobny eksport badania komfortu i poprzedniej ankiety. Obowiązuje dotychczasowy prywatny klucz. Każdy eksport obejmuje do 10 000 najnowszych wpisów.

## Edycja i uruchomienie
Pytania i treść: app/page.tsx. Opcje i walidacja: lib/survey.ts. Styl: app/globals.css. Logotypy: public/wapw.png i public/ai.png. Są to oryginalne obrazy dostarczone przez użytkownika.
Node.js 22.13+ i npm: npm install, npm run build, npm run dev.
Konfiguracja Sites jest w .openai/hosting.json; wymagane powiązanie D1 DB i sekret ADMIN_TOKEN. Aktualizacja nie wymaga migracji, ponieważ zachowuje dotychczasowy schemat.
Przy nowym, niezależnym wdrożeniu należy utworzyć własny projekt Sites, bazę i sekret; przy aktualizacji obecnego wdrożenia zachowaj jego identyfikator. Nie publikuj prywatnego klucza razem z kodem.

Publiczny adres ankiety i dotychczasowy QR pozostają bez zmian.

