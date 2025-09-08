import api from '../../../middleware/api';
import { User } from '../types/user';

export const userService = {
  async createUser(payload: { full_name: string; email: string; roles: string[] }): Promise<User> {
    const res = await api.post('/users', payload);
    return res.data.data as User;
  },

  async getUsersByRole(role: string): Promise<User[]> {
    const res = await api.get(`/users/${encodeURIComponent(role)}`);
    return res.data.data as User[];
  }
};
