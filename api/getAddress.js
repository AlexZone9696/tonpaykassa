// /api/getAddress.js

import Paykassa from 'paykassa-sdk';

const api = new Paykassa.API({
  api_id: process.env.PAYKASSA_API_ID,
  api_key: process.env.PAYKASSA_API_KEY,
  test_mode: false,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { user_id } = req.body;

  try {
    const response = await api.createAddress({
      shop: process.env.PAYKASSA_SHOP_ID,
      currency: 'TON',
      system: '67', // Уточни ID системы в кабинете Paykassa
      order_id: user_id,
      is_reusable: 1,
    });

    if (response.error) {
      return res.status(500).json({ error: response.message });
    }

    res.status(200).json({
      address: response.data.wallet,
      tag: response.data.tag || null,
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании адреса' });
  }
}
