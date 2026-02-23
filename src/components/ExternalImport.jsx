import React, { useState } from 'react';
import { fetchExternalUsers } from '../api/mockApi';

const ExternalImport = () => {
  const [importedUsers, setImportedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    setLoading(true);
    const users = await fetchExternalUsers();
    setImportedUsers(users.slice(0, 5)); 
    setLoading(false);
  };

  return (
    <div className="import-section" style={{ marginTop: '40px', padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #dee2e6' }}>
      <h3>Інтеграція із зовнішнім API</h3>
      <p>Імпорт користувачів з JSONPlaceholder для партнерської програми.</p>
      
      <button onClick={handleImport} className="btn btn-outline" disabled={loading}>
        {loading ? 'Завантаження...' : '📥 Імпортувати партнерів'}
      </button>

      {importedUsers.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Отримані дані:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {importedUsers.map(user => (
              <li key={user.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <strong>{user.name}</strong> — {user.email} <br/>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>Компанія: {user.company.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExternalImport;