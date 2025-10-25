// Prosty skrypt z celowo złym klient-side walidacjami

document.getElementById('regForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;

  // CEL: błędny regex e-mail (brakuje sprawdzenia @) i błędna logika potwierdzenia hasła
  const emailRe = /^[a-z0-9._-]+$/; // CEL: złe — nie dopuszcza @
  if (!emailRe.test(email)) {
    // wyświetlamy tylko ostrzeżenie, ale NIE blokujemy submit (celowo)
    document.getElementById('result').innerText = 'Uwaga: e-mail wygląda podejrzanie (client)';
  }

  // CEL: błędna walidacja potwierdzenia hasła (== zamiast === i odwrócona logika)
  if (password == confirm) {
    // celowo usuwamy blokadę i wysyłamy dalej, powinno być odwrotnie
  } else {
    // nic nie robimy — nie blokujemy
  }

  const resp = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, age, password, confirm })
  });

  const json = await resp.json();
  document.getElementById('result').innerText = JSON.stringify(json);
});