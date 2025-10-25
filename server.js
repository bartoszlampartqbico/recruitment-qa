const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// prosta baza sqlite w pliku demo.db; jeżeli nie ma, utwórz z init_db.sql
const DB_FILE = path.join(__dirname, 'demo.db');
if (!fs.existsSync(DB_FILE)) {
  const initSql = fs.readFileSync(path.join(__dirname, 'init_db.sql'), 'utf8');
  const tempDb = new sqlite3.Database(DB_FILE);
  tempDb.exec(initSql, (err) => {
    if (err) console.error('Init DB error:', err);
    tempDb.close();
  });
}

const db = new sqlite3.Database(DB_FILE);

// Route: prosty endpoint rejestracji (z celowymi błędami)
app.post('/register', (req, res) => {
  const { username, email, age, password, confirm } = req.body;

  // CEL: niedokładna walidacja po stronie serwera (celowy błąd)
  if (!username || !email || !password) {
    return res.status(400).json({ ok: false, message: 'Wymagane pola: username, email, password' });
  }

  // CEL: błąd logiki walidacji hasła (wymagana długość > 8 zamiast >=8 albo odwrotnie)
  if (password.length < 8) {
    // tu celowo przyjmujemy hasła krótsze — błąd do znalezienia
    // return res.status(400).json({ ok: false, message: 'Hasło za krótkie' });
  }

  // CEL: sprawdzanie unikalności email/username (błędne - bez normalizacji)
  db.get("SELECT id FROM users WHERE email = ?", [email], (err, row) => {
    if (err) return res.status(500).json({ ok: false, message: err.message });

    if (row) {
      return res.status(409).json({ ok: false, message: 'Email już istnieje' });
    }

    // CEL: podatność na SQL Injection (concat zamiast prepared statements)
    const sql = `INSERT INTO users (username, email, age, password) VALUES ('${username}', '${email}', ${parseInt(age) || 'NULL'}, '${password}')`;
    db.run(sql, function (err2) {
      if (err2) {
        // celowo zwracamy stack trace w odpowiedzi (informacja wyciekowa)
        return res.status(500).json({ ok: false, message: err2.message, stack: err2.stack });
      }
      res.json({ ok: true, id: this.lastID });
    });
  });
});

// Route: lista użytkowników — wyświetlamy dane bez escaping (stored XSS)
app.get('/users', (req, res) => {
  db.all("SELECT id, username, email, age, created_at FROM users ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).send('DB error');
    // generujemy prosty HTML — UWAGA: brak escape/encoding pól - celowo!
    let html = '<h1>Użytkownicy</h1><ul>';
    rows.forEach(r => {
      html += `<li><strong>${r.username}</strong> (${r.email}) — wiek: ${r.age}</li>`;
    });
    html += '</ul><a href="/">Wróć</a>';
    res.send(html);
  });
});

// Route: prosty login demo z możliwością SQL injection
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // CEL: podatne na SQLi
  const sql = `SELECT id FROM users WHERE username = '${username}' AND password = '${password}' LIMIT 1`;
  db.get(sql, [], (err, row) => {
    if (err) return res.status(500).json({ ok: false, message: err.message });
    if (row) return res.json({ ok: true, message: 'Zalogowano' });
    res.status(401).json({ ok: false, message: 'Nieprawidłowe dane' });
  });
});

// Route: proste wyszukiwanie użytkowników (SQL LIKE — możliwe bypass)
app.get('/search', (req, res) => {
  const q = req.query.q || '';
  // CEL: bez zabezpieczeń, bez ograniczenia długości parametru
  const sql = `SELECT id, username, email FROM users WHERE username LIKE '%${q}%' LIMIT 50`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).send('DB error');
    return res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Demo app listening on http://localhost:3000');
});