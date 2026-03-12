import { Request, Response } from "express";
import { scraperService } from "../services/ScraperService";
import { CACHE_CONFIG, FILTER_CONFIG } from "../constants";

export class AnnouncementController {
  private cache: { data: any[]; timestamp: number } | null = null;

  private parseDate(dateStr: string): Date {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      let year = parseInt(parts[2], 10);
      if (year < 100) year += 2000;
      return new Date(year, month, day);
    }
    const d = new Date(dateStr);
    // Se for ISO ou inválido, retorna a data de hoje para não quebrar o filtro de recência se for novo
    return isNaN(d.getTime()) ? new Date() : d;
  }

  async getAll(req: Request, res: Response) {
    try {
      const now = Date.now();

      if (this.cache && now - this.cache.timestamp < CACHE_CONFIG.DURATION_MS) {
        console.log("Serving from cache...");
        return res.json(this.cache.data);
      }

      console.log("Fetching fresh data via scraper...");
      const [prograd, ppgci, proexc, portal, ufrb] = await Promise.all([
        scraperService.scrapePrograd(),
        scraperService.scrapePPGCI(),
        scraperService.scrapeProexc(),
        scraperService.scrapePortal(),
        scraperService.scrapeUFRB(),
      ]);

      const twoWeeksAgo = now - FILTER_CONFIG.RECENCY_MS;

      const allAnnouncements = [...prograd, ...ppgci, ...proexc, ...portal, ...ufrb]
        .filter((ann) => {
          const titleDesc = (ann.title + " " + ann.description).toLowerCase();

          const hasExcluded = FILTER_CONFIG.EXCLUDED_KEYWORDS.some((kw) =>
            titleDesc.includes(kw),
          );
          if (hasExcluded) return false;

          const isRelevant = FILTER_CONFIG.RELEVANT_KEYWORDS.some((kw) =>
            titleDesc.includes(kw),
          );

          const annDate = this.parseDate(ann.date);
          const isRecent = annDate.getTime() >= twoWeeksAgo;

          return isRelevant && isRecent;
        })
        .sort((a, b) => {
          const dateA = this.parseDate(a.date).getTime();
          const dateB = this.parseDate(b.date).getTime();
          return dateB - dateA;
        })
        .map((ann, index) => ({
          id: index + 1,
          ...ann,
          dateDisplay: ann.date,
        }));

      this.cache = {
        data: allAnnouncements,
        timestamp: now,
      };

      res.json(allAnnouncements);
    } catch (error) {
      console.error("Controller Error:", error);
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  }
}

export const announcementController = new AnnouncementController();
