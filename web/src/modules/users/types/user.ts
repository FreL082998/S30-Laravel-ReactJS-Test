export interface User {
  id: number;
  full_name: string;
  email: string;
  roles: string[];
  created_at?: string;
}

export interface UsersState {
  list: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}