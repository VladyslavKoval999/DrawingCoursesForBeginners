import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectTheme } from '../redux/slices/themeSlice';

const Header = ({ searchTerm, setSearchTerm }) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <header className="header">
      <div className="header-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}></div>
        <h1 style={{ margin: 0, textAlign: 'center', flex: 2 }}>Творчі інтенсиви</h1>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
          
          <Link 
            to="/analytics" 
            className="btn btn-outline" 
            style={{ padding: '8px 15px', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            📊 Аналітика
          </Link>

          <button 
            onClick={() => dispatch(toggleTheme())} 
            className="theme-toggle-btn"
            style={{ position: 'relative' }}
            title={theme === 'light' ? 'Увімкнути темну тему' : 'Увімкнути світлу тему'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

      </div>

      <input
        type="text"
        placeholder="Пошук курсу за назвою..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        style={{ margin: '0 auto', display: 'block' }}
      />
    </header>
  );
};

export default Header;