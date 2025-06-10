export type Client = {
  id: string;
  name: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  amount: number;
  created_at: string;
};

export type Movie = {
  id: string;
  title: string;
  year: number;
  director: string;
  poster: string;
  created_at: string;
};

export interface PropsClient {
  mode: string;
  client?: {
    id: string;
    name: string;
    status: string;
    email: string;
    amount: number;
  };
  reloadData: () => Promise<void>;
}

export interface PropsMovie {
  mode: string;
  movie?: {
    id: string;
    title: string;
    year: number;
    director: string;
    poster: string;
  };
  reloadData: () => Promise<void>;
}
