import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnalyticsChart from '../components/AnalyticsChart';
import ExternalImport from '../components/ExternalImport';
import { fetchRegistrationStats } from '../api/mockApi';

const AnalyticsPage = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrationStats().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  const totalRegistrations = stats.reduce((sum, day) => sum + day.registrations, 0);
  const averageRegistrations = stats.length > 0 ? (totalRegistrations / stats.length).toFixed(1) : 0;
  const maxDay = stats.length > 0 
    ? stats.reduce((max, day) => day.registrations > max.registrations ? day : max, stats[0]) 
    : { date: '-', registrations: 0 };

  return (
    <div className="app-container">
      <Link to="/" className="back-link">← Назад на головну</Link>
      
      <header className="header">
        <h1>Панель аналітики</h1>
        <p>Агрегація даних реєстрацій та зовнішні інтеграції</p>
      </header>

      {loading ? (
        <div className="loader">Завантаження статистики...</div>
      ) : (
        <>
          <div className="stats-cards" style={{ 
            display: 'flex', 
            gap: '20px', 
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <div className="stat-card" style={{ flex: '1 1 200px', background: 'white', padding: '20px', borderRadius: '18px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#6c757d', fontSize: '1rem' }}>Всього реєстрацій</h4>
              <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#333' }}>
                {totalRegistrations}
              </p>
            </div>
            
            <div className="stat-card" style={{ flex: '1 1 200px', background: 'white', padding: '20px', borderRadius: '18px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#6c757d', fontSize: '1rem' }}>В середньому за день</h4>
              <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#007bff' }}>
                {averageRegistrations}
              </p>
            </div>
            
            <div className="stat-card" style={{ flex: '1 1 200px', background: 'white', padding: '20px', borderRadius: '18px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#6c757d', fontSize: '1rem' }}>Найактивніший день</h4>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '5px 0', color: '#333' }}>
                {maxDay.date}
              </p>
              <span style={{ fontSize: '15px', color: '#28a745', fontWeight: '600' }}>
                +{maxDay.registrations} осіб
              </span>
            </div>
          </div>

          <div className="chart-container" style={{ background: 'white', padding: '20px', borderRadius: '18px', boxShadow: '0 6px 15px rgba(0,0,0,0.05)' }}>
            <AnalyticsChart data={stats} />
          </div>

          <ExternalImport />
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;