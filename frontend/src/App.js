import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://react-news-app-backend-2024.onrender.com/api'
  : 'http://localhost:5000/api';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/news`);
      setNews(response.data.articles);
      setError(null);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const refreshNews = () => {
    fetchNews();
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading latest news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={refreshNews} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>📰 Top 5 News</h1>
        <p>Stay updated with the latest headlines</p>
        <button onClick={refreshNews} className="refresh-btn">
          🔄 Refresh News
        </button>
      </header>

      <main className="news-container">
        {news.map((article, index) => (
          <article key={article.id} className="news-card">
            <div className="news-rank">#{index + 1}</div>
            
            <div className="news-image">
              <img 
                src={article.urlToImage} 
                alt={article.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200/667eea/ffffff?text=News';
                }}
              />
            </div>
            
            <div className="news-content">
              <div className="news-meta">
                <span className="news-source">{article.source.name}</span>
                <span className="news-date">{formatDate(article.publishedAt)}</span>
              </div>
              
              <h2 className="news-title">{article.title}</h2>
              <p className="news-description">{article.description}</p>
              
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="read-more-btn"
              >
                Read Full Article →
              </a>
            </div>
          </article>
        ))}
      </main>

      <footer className="App-footer">
        <p>© 2024 React News App | Built with React & Node.js</p>
      </footer>
    </div>
  );
}

export default App;