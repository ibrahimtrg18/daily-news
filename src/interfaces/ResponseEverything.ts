import { Article } from './Articles';

export interface ResponseEverything {
  status: string;
  totalResults: number;
  articles?: Article[];
  message?: string;
}
