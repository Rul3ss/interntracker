import { Announcement } from '../models/Announcement';

export class AnnouncementController {
  private announcements: Announcement[] = [];
  private baseUrl = 'http://localhost:3001/api/announcements';

  async fetchAnnouncements(): Promise<Announcement[]> {
    try {
      const response = await fetch(this.baseUrl);
      this.announcements = await response.json();
      return this.announcements;
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return [];
    }
  }

  getFilteredAnnouncements(search: string, category: string): Announcement[] {
    return this.announcements.filter(ann => {
      const matchesSearch = ann.title.toLowerCase().includes(search.toLowerCase()) ||
                            ann.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || category === '' || ann.source === category;
      
      return matchesSearch && matchesCategory;
    });
  }

  getCategories(): string[] {
    const sources = this.announcements.map(ann => ann.source);
    return ['All', ...new Set(sources)];
  }
}

export const announcementController = new AnnouncementController();
