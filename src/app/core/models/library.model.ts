export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  publishedYear: number;
  available: boolean;
}

export interface User {
  email: string;
  name: string;
}