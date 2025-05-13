import { useState } from 'react';

export default function DepositPage() {
  const [address, setAddress] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetAddress = async () => {
    setLoading(true);
    const res = await fetch('/api/getAddress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 'user123' }) // Подставь актуальный ID
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) return alert(data.error);

    setAddress(data.address);
    setTag(data.tag);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Пополнение TON</h1>
      <button onClick={handleGetAddress} disabled={loading}>
        {loading ? 'Загрузка...' : 'Получить адрес'}
      </button>

      {address && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Адрес:</strong> {address}</p>
          {tag && <p><strong>Memo/Tag:</strong> {tag}</p>}
        </div>
      )}
    </div>
  );
}
