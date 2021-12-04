export interface Article {
  author?: string | null;
  title?: string | null;
  description?: string | null;
  url?: string | null;
  source?: {
    id?: string | null;
    name?: string | null;
  };
  urlToImage?: string | null;
  category?: string | null;
  language?: string | null;
  country?: string | null;
  published_at?: string | null;
}
