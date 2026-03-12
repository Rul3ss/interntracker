import AnnouncementCard from '../AnnouncementCard/AnnouncementCard';
import './AnnouncementList.css';

const AnnouncementList = ({ announcements }) => {
  if (announcements.length === 0) {
    return (
      <div className="container no-results">
        <p>Nenhum anúncio encontrado para esta busca.</p>
      </div>
    );
  }

  return (
    <div className="container announcement-list">
      {announcements.map((ann, index) => (
        <div key={ann.id} style={{ animationDelay: `${index * 0.1}s` }}>
          <AnnouncementCard announcement={ann} />
        </div>
      ))}
    </div>
  );
};

export default AnnouncementList;
