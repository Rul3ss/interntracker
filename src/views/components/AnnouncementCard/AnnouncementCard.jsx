import "./AnnouncementCard.css";

const AnnouncementCard = ({ announcement }) => {
  return (
    <div className="announcement-card">
      <div className="card-header">
        <span className="source-tag">{announcement.source}</span>
        <span className="date-text">{announcement.dateDisplay}</span>
      </div>
      <h3 className="card-title">{announcement.title}</h3>
      <p className="card-description">{announcement.description}</p>
      <div className="card-footer">
        <a
          href={announcement.url}
          target="_blank"
          rel="noopener noreferrer"
          className="view-button"
        >
          Ver no site
        </a>
      </div>
    </div>
  );
};

export default AnnouncementCard;
