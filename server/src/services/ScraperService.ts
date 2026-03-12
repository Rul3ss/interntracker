import axios from "axios";
import * as cheerio from "cheerio";
import { SCRAPER_CONFIG } from "../constants";

export interface ScrapedAnnouncement {
  title: string;
  url: string;
  date: string;
  source: string;
  description: string;
}

export class ScraperService {
  private extractDate(text: string): string {
    const standardMatch = text.match(/\d{2}\/\d{2}\/\d{2,4}/);
    if (standardMatch) return standardMatch[0];

    const textMatch = text.match(
      /(\d{1,2})\s+(?:de\s+)?([a-zçãõáéíóú]+)\s+(?:de\s+)?(\d{4})/i,
    );
    if (textMatch) {
      const monthsNoAccent: { [key: string]: string } = {
        janeiro: "01",
        fevereiro: "02",
        marco: "03",
        abril: "04",
        maio: "05",
        junho: "06",
        julho: "07",
        agosto: "08",
        setembro: "09",
        outubro: "10",
        novembro: "11",
        dezembro: "12",
      };

      const day = textMatch[1].padStart(2, "0");
      const monthName = textMatch[2]
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const month = monthsNoAccent[monthName];
      const year = textMatch[3];
      if (month) return `${day}/${month}/${year}`;
    }

    return new Date().toISOString().split("T")[0];
  }

  private async scrapeStandardPortal(
    url: string,
    source: string,
  ): Promise<ScrapedAnnouncement[]> {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const announcements: ScrapedAnnouncement[] = [];

      $(".tileItem").each((_, element) => {
        const titleLine = $(element).find(".tileHeadline a");
        const title = titleLine.text().trim();
        const relativeUrl = titleLine.attr("href");
        const announcementUrl = relativeUrl?.startsWith("http")
          ? relativeUrl
          : "https://ufrb.edu.br" + relativeUrl;
        const dateRaw = $(element).find(".tileInfo").text().trim();
        const date = this.extractDate(dateRaw);
        const description = $(element).find(".tileText").text().trim();

        if (title) {
          announcements.push({
            title,
            url: announcementUrl,
            date,
            source,
            description,
          });
        }
      });

      return announcements;
    } catch (error) {
      console.error(`Error scraping ${source}:`, error);
      return [];
    }
  }

  async scrapePrograd() {
    return this.scrapeStandardPortal(SCRAPER_CONFIG.PORTALS.PROGRAD, "PROGRAD");
  }

  async scrapePPGCI() {
    return this.scrapeStandardPortal(SCRAPER_CONFIG.PORTALS.PPGCI, "PPGCI");
  }

  async scrapeProexc() {
    return this.scrapeStandardPortal(SCRAPER_CONFIG.PORTALS.PROEXC, "PROEXC");
  }

  async scrapePortal(): Promise<ScrapedAnnouncement[]> {
    try {
      const feedUrl = SCRAPER_CONFIG.PORTALS.PORTAL.endsWith("/")
        ? SCRAPER_CONFIG.PORTALS.PORTAL + "feed/"
        : SCRAPER_CONFIG.PORTALS.PORTAL + "/feed/";

      const { data } = await axios.get(feedUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        },
      });

      const $ = cheerio.load(data, { xmlMode: true });
      const announcements: ScrapedAnnouncement[] = [];

      $("item").each((_, element) => {
        const item = $(element);
        const title = item.find("title").text().trim();
        const url = item.find("link").text().trim();
        const pubDate = item.find("pubDate").text().trim();

        let date = new Date().toLocaleDateString("pt-BR");
        if (pubDate) {
          const d = new Date(pubDate);
          if (!isNaN(d.getTime())) {
            date = d.toLocaleDateString("pt-BR");
          }
        }

        const description =
          item
            .find("description")
            .text()
            .replace(/<[^>]*>/g, "")
            .replace(/&#8217;/g, "'")
            .replace(/&#160;/g, " ")
            .substring(0, 200)
            .trim() + "...";

        if (title) {
          announcements.push({
            title,
            url,
            date,
            source: "Portal UFRB",
            description,
          });
        }
      });

      return announcements;
    } catch (error) {
      console.error("Error scraping Portal RSS:", error);
      return [];
    }
  }

  async scrapeUFRB(): Promise<ScrapedAnnouncement[]> {
    try {
      const { data } = await axios.get(SCRAPER_CONFIG.BASE_URL);
      const $ = cheerio.load(data);
      const announcements: ScrapedAnnouncement[] = [];

      $(".destaque h2 a").each((_, element) => {
        const title = $(element).text().trim();
        const relativeUrl = $(element).attr("href");

        if (title && relativeUrl) {
          announcements.push({
            title,
            url: relativeUrl.startsWith("http")
              ? relativeUrl
              : SCRAPER_CONFIG.BASE_URL + relativeUrl,
            date: new Date().toLocaleDateString("pt-BR"),
            source: "UFRB Geral",
            description: "",
          });
        }
      });

      return announcements;
    } catch (error) {
      console.error("Error scraping UFRB Geral:", error);
      return [];
    }
  }
}

export const scraperService = new ScraperService();
