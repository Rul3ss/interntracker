import { useState, useEffect } from 'react';
import Header from './views/components/Header/Header';
import SearchBar from './views/components/SearchBar/SearchBar';
import AnnouncementList from './views/components/AnnouncementList/AnnouncementList';
import { announcementController } from './controllers/AnnouncementController';
import './index.css';

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await announcementController.fetchAnnouncements();
      setCategories(announcementController.getCategories());
      setFilteredAnnouncements(announcementController.getFilteredAnnouncements('', ''));
      setLoading(false);
    };
    initData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const results = announcementController.getFilteredAnnouncements(search, category);
      setFilteredAnnouncements(results);
    }
  }, [search, category, loading]);

  return (
    <div className="app-wrapper">
      <Header />
      <SearchBar 
        onSearchChange={setSearch} 
        onCategoryChange={setCategory} 
        categories={categories}
      />
      <main>
        {loading ? (
          <div className="container loading">Carregando avisos reais...</div>
        ) : (
          <AnnouncementList announcements={filteredAnnouncements} />
        )}
      </main>
    </div>
  );
}

export default App;
