export const SCRAPER_CONFIG = {
  BASE_URL: "https://ufrb.edu.br",
  PORTALS: {
    PROGRAD: "https://ufrb.edu.br/prograd/noticias",
    PPGCI: "https://ufrb.edu.br/ppgci/noticias",
    PROEXC: "https://ufrb.edu.br/proexc/noticias",
    PORTAL: "https://ufrb.edu.br/portal/category/noticias/",
  },
};

export const CACHE_CONFIG = {
  DURATION_CASH: 30,
  get DURATION_MS() {
    return this.DURATION_CASH * 60 * 1000;
  },
};

export const FILTER_CONFIG = {
  RECENCY_DAYS: 14,
  get RECENCY_MS() {
    return this.RECENCY_DAYS * 24 * 60 * 60 * 1000;
  },
  RELEVANT_KEYWORDS: [
    "bolsa",
    "estágio",
    "estagio",
    "remuneração",
    "remuneracao",
    "auxílio",
    "auxilio",
    "oportunidade",
    "monitoria",
    "vaga",
    "vagas",
    "seleção",
    "selecao",
    "pibid",
    "residência",
    "residencia",
    "voluntário",
    "voluntario",
    "edital",
    "seleciona",
    "processo seletivo",
  ],
  EXCLUDED_KEYWORDS: [
    "posse",
    "reunião",
    "reuniao",
    "visita",
    "homenagem",
    "presidência",
    "parceria",
  ],
};
