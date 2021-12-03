const BASE_URL = process.env.VUE_APP_BASE_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

type fetchTopHeadlinesArguments = {
  query?: string;
  category?: string;
  country?: string;
  limit?: string | number;
  page?: string | number;
};

export async function fetchTopHeadlines({
  query,
  category,
  country = 'id',
  limit = 12,
  page = 1,
}: fetchTopHeadlinesArguments) {
  try {
    const res = await fetch(
      `${BASE_URL}/top-headlines?apiKey=${API_KEY}&country=${country}&pageSize=${limit}&page=${page}${
        category && `&category=${category}`
      }${query && `&q=${query}`}`,
    );
    const data = await res.json();

    if (res.ok) {
      return data.articles;
    }

    return [];
  } catch (err) {
    console.error(err);
    throw err;
  }
}
