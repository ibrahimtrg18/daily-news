import { ResponseNews } from '../interfaces/ResponseNews';

const BASE_URL = process.env.VUE_APP_BASE_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

type FetchNewsArgs = {
  keywords?: string;
  categories?: string;
  countries?: string;
  limit?: number;
  offset?: number;
  languages?: string;
};

export async function fetchNews({
  keywords,
  categories,
  countries,
  limit = 12,
  offset = 0,
  languages,
}: FetchNewsArgs): Promise<ResponseNews> {
  try {
    let queries: Array<string> = [];
    queries = [...queries, `access_key=${API_KEY}`];
    queries = [...queries, `limit=${limit}`];
    queries = [...queries, `offset=${offset}`];

    if (keywords) {
      queries = [...queries, `keywords=${keywords}`];
    }
    if (categories) {
      queries = [...queries, `categories=${categories}`];
    }
    if (countries) {
      queries = [...queries, `countries=${countries}`];
    }
    if (languages) {
      queries = [...queries, `languages=${languages}`];
    }

    const res = await fetch(`${BASE_URL}/news?${queries.join('&')}`);
    const data = await res.json();

    if (res.ok) {
      return data;
    }

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
