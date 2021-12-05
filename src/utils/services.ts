import { ResponseEverything } from '@/interfaces/ResponseEverything';
import { ResponseTopHealines } from '../interfaces/ResponseTopHealines';

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
}: fetchTopHeadlinesArguments): Promise<ResponseTopHealines> {
  try {
    const enCountry = country === 'en' ? 'us' : 'id';
    const res = await fetch(
      `${BASE_URL}/top-headlines?apiKey=${API_KEY}&country=${enCountry}&pageSize=${limit}&page=${page}
      ${category ? `&category=${category}` : ''}${query ? `&q=${query}` : ''}`,
    );
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

type fetchEverythingArguments = {
  query: string;
  category?: string;
  country?: string;
  limit?: string | number;
  page?: string | number;
};

export async function fetchEverything({
  query,
  category,
  country = 'id',
  limit = 12,
  page = 1,
}: fetchEverythingArguments): Promise<ResponseEverything> {
  try {
    const enCountry = country === 'en' ? 'us' : 'id';
    const res = await fetch(
      `${BASE_URL}/top-headlines?apiKey=${API_KEY}&country=${enCountry}&pageSize=${limit}&page=${page}
      ${category ? `&category=${category}` : ''}${query ? `&q=${query}` : ''}`,
    );
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
