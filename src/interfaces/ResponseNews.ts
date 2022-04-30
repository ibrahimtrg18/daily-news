import { Article } from './Articles';

export interface ResponseNews {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: Article[] | undefined;
}
