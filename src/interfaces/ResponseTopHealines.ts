import { Article } from './Articles';

export interface ResponseTopHealines {
  status: string;
  totalResults: number;
  articles?: Article[];
  message?: string;
}
