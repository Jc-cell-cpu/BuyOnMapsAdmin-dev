export interface Field {
  type: string;
  label: string;
  options?: string[];
}

export interface Category {
  id: number;
  name: string;
  image?: string;
  updatedAt: string;
  fields: Field[];
}
