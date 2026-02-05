export interface User {
  email: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  publishedYear: number;
  available: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  membershipSince: Date;
  active: boolean;
}

export interface ColumnDef {
  key: string;
  header: string;
  type?: 'text' | 'date' | 'boolean' | 'custom'; 
}
