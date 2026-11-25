// CheckoutForm — login, checkout, dan list order.
let token = null;
const message = document.getElementById('message');

function show(text, ok) {
  message.textContent = text;
  message.className = ok ? 'ok' : 'fail';
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: form.get('username'), password: form.get('password') }),
  });
  const body = await res.json();
  if (!res.ok) return show(body.error.message, false);
  token = body.data.token;
  show('Login berhasil', true);
});

document.getElementById('checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const payload = {
    productId: Number(form.get('productId')),
    quantity: form.get('quantity'),
  };
  const res = await fetch('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer  ' + token,
    },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    show('Checkout berhasil! 🎉', true);
  } else {
    show('Checkout gagal (HTTP ' + res.status + ')', false);
  }
});

document.getElementById('load-orders').addEventListener('click', async () => {
  const res = await fetch('/orders', { headers: { Authorization: 'Bearer ' + token } });
  const text = await res.text();
  document.getElementById('orders').textContent = res.ok ? JSON.stringify(JSON.parse(text).data, null, 2) : `HTTP ${res.status}`;
});
