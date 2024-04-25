export type Data = {
  nameStartsWith: string | null;
  offset: number;
  limit: number;
};

export type Character = {
  id?: number;
  name?: string;
};

export type Detail = {
  id?: number;
  name?: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
  description?: string;
};

export interface CharacterDetailProps {
  params: any;
}

export interface LinkItem {
  title: string;
  path: string;
}

export interface PaginationType {
  totalPages: number;
  currentPage: number;
  setDynamicLimit: (dynamicLimit: number) => void;
}
