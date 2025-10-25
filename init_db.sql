-- Inicjalizacja bazy demo
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  email TEXT,
  age INTEGER,
  password TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- kilka przykładowych rekordów (część danych przygotowana, inne można dodać przez formularz)
INSERT INTO users (username, email, age, password) VALUES ('alice', 'alice@example.com', 30, 'pwd1');
INSERT INTO users (username, email, age, password) VALUES ('bob', 'bob@example.com', 25, 'pwd2');