```markdown
# Instrukcja dla kandydatów (treść do wysłania kandydatowi)

Zadanie:
1. Wejdź na stronę rejestracji: / (np. http://localhost:3000).
2. Przetestuj formularz rejestracyjny i inne dostępne funkcjonalności (np. /users).
3. Znajdź jak najwięcej błędów funkcjonalnych, walidacyjnych i bezpieczeństwa (szczególnie związanych z SQL).
4. Przygotuj raport zawierający:
   - Krótki opis każdego problemu (co się dzieje)
   - Krok po kroku jak odtworzyć (reprodukować)
   - Potencjalne ryzyko/konsekwencje (jeśli istotne)
   - Proponowane kroki naprawcze (co naprawić)

Czas: 60-90 minut

Wskazówki:
- Szukaj również błędów serwera (odpowiedzi JSON z błędami).
- Sprawdź przypadki brzegowe (duże payloady, nietypowe znaki).
- Spróbuj prostych SQL injection payloadów i sprawdź, czy jest podatność.
- Nie musisz rozwiązywać problemów programistycznie — wystarczy opis, dowody i rekomendacje.

Kryteria oceny:
- Rozpoznane defekty (ile i jakich)
- Dokładność kroków reprodukcji
- Zrozumienie wpływu (np. poufność, integralność, dostępność)
- Jakość rekomendacji naprawczych
- Umiejętność użycia SQL do diagnostyki (np. zapytania pokazujące duplikaty)

Przykładowe elementy, które powinny trafić do raportu:
- Stored XSS — co wpisać i jak zobaczyć.
- SQL Injection — przykładowe payloady i ich efekt.
- Błędy walidacji front/backend — co nie działa i jak to może zostać wykorzystane.
```