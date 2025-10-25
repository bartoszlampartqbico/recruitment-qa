# Lista celowo zaszytych błędów (TYLKO dla rekrutera)

Frontend:
- Klientowy regex dla e-mail jest niepoprawny (nie dopuszcza znaku '@') — ale błędne ostrzeżenie nie blokuje wysyłki.
- Walidacja powtórzenia hasła jest źle zaimplementowana (logika odwrócona / nie blokuje).
- Brak ograniczeń długości parametru wysyłanego do serwera (można testować long input).

Backend:
- Brak przygotowanych zapytań (prepared statements) w INSERT i SELECT w /register, /login, /search — podatność na SQL injection.
- Sprawdzanie unikalności e-mail przed INSERT, ale bez normalizacji (różne wielkości liter są traktowane jako różne adresy) — można dodać duplikaty.
- Wstawianie danych do SQL odbywa się przez konkatenację stringów => SQL injection.
- W odpowiedzi na błędy zwracamy stack trace/treść błędu w JSON — wyciek informacji.
- Endpoint /users renderuje dane w HTML bez escaping — stored XSS możliwy jeśli kandydat doda np. <script> w username.
- /login — także podatne na SQLi (zawiera credentials w zapytaniu bez parametryzacji).
- /search — LIKE z bezpośrednią konkatenacją parametru (możliwość wydłużonych zapytań).

Database:
- Brak constraint UNIQUE na kolumnie username/email (celowo) — duplikaty mogą być dodane przez różne kombinacje wielkości liter.
- Brak ograniczeń poprawnościowych age (np. dopuszcza ujemne lub null).
- Hasła przechowywane w plain-text (celowo).

Inne (behawioralne):
- Brak ograniczeń rate-limiting i brak CSRF tokenów (nie jest to produkcyjna aplikacja).
- Brak sanitizacji wejścia przed zapisem.

Jak wykryć:
- Próba zapisania użytkownika z username zawierającym: <script>alert(1)</script> i sprawdzenie /users => XSS.
- SQLi: w polu loginu podać ' OR '1'='1' -- i zobaczyć czy logowanie się powiedzie.
- Duplikaty email: zarejestrować 'Foo@Ex.com' i 'foo@ex.com' — obydwa mogą zostać dodane.
- Zbyt krótkie hasło: klient może udawać, że hasło jest odrzucone, ale serwer nie blokuje poprawnie.