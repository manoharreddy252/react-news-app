const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock news data (since NewsAPI requires API key)
const mockNews = [
  {
    id: 1,
    title: "Breaking: Major Tech Company Announces Revolutionary AI Breakthrough",
    description: "A leading technology company has unveiled a groundbreaking artificial intelligence system that promises to transform multiple industries.",
    url: "https://example.com/news1",
    urlToImage: "https://via.placeholder.com/400x200/667eea/ffffff?text=Tech+News",
    publishedAt: new Date().toISOString(),
    source: { name: "Tech Today" }
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Historic Agreement",
    description: "World leaders have reached a unprecedented consensus on climate action, setting ambitious targets for carbon reduction.",
    url: "https://example.com/news2",
    urlToImage: "https://via.placeholder.com/400x200/4ecdc4/ffffff?text=Climate+News",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    source: { name: "Global News" }
  },
  {
    id: 3,
    title: "Space Mission Successfully Lands on Mars",
    description: "The latest Mars exploration mission has successfully landed and begun transmitting valuable scientific data back to Earth.",
    url: "https://example.com/news3",
    urlToImage: "https://via.placeholder.com/400x200/ff6b6b/ffffff?text=Space+News",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: { name: "Space Explorer" }
  },
  {
    id: 4,
    title: "Medical Breakthrough: New Treatment Shows Promise",
    description: "Researchers have developed a promising new treatment that could revolutionize healthcare for millions of patients worldwide.",
    url: "https://example.com/news4",
    urlToImage: "https://via.placeholder.com/400x200/feca57/ffffff?text=Health+News",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    source: { name: "Health Today" }
  },
  {
    id: 5,
    title: "Economic Markets Show Strong Recovery Signs",
    description: "Financial analysts report positive indicators as global markets demonstrate resilience and growth potential.",
    url: "https://example.com/news5",
    urlToImage: "https://via.placeholder.com/400x200/764ba2/ffffff?text=Finance+News",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    source: { name: "Finance Weekly" }
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'News API Server Running!' });
});

app.get('/api/news', (req, res) => {
  res.json({
    status: 'ok',
    totalResults: mockNews.length,
    articles: mockNews
  });
});

app.get('/api/news/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = mockNews.find(news => news.id === id);
  
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ error: 'Article not found' });
  }
});

app.listen(PORT, () => {
  console.log(`News API server running on port ${PORT}`);
});