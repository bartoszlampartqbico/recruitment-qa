# Test dla testera manualnego z SQL — demo

To prosta aplikacja demonstracyjna z formularzem rejestracyjnym, przygotowana jako zadanie rekrutacyjne dla testera manualnego ze znajomością SQL. Aplikacja celowo zawiera kilka błędów (frontend, backend, SQL/security), które kandydat ma znaleźć i opisać.

Jak uruchomić:
1. Zainstaluj zależności:
   - Node.js (>=14)
   - npm
2. W katalogu projektu uruchom:
   npm install
3. Zainicjuj bazę i uruchom serwer:
   node server.js
4. Otwórz w przeglądarce: http://localhost:3000

Zawartość repozytorium:
- server.js — prosty backend (Express + sqlite3) z celowymi błędami
- init_db.sql — skrypt inicjalizujący bazę
- public/index.html — formularz rejestracyjny (frontend)
- public/script.js — klient JS z błędami walidacji
- public/styles.css — prosty CSS
- admin/BUGS.md — lista celowo zaszytych błędów (tylko dla rekrutera)
- admin/INSTRUCTIONS.md — instrukcje i kryteria oceny dla kandydatów

Uwaga: Aplikacja celowo zawiera luki (np. SQL injection, XSS). Uruchamiaj lokalnie tylko w środowisku testowym.