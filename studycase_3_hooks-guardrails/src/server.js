const express = require('express');

const app = express();

app.get('/health', (req, res) => {
  res.json({ data: { status: 'ok', paymentConfigured: Boolean(process.env.PAYMENT_API_KEY) } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
