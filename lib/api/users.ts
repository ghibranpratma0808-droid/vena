import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface UserDB {
  id: string;
  email: string;
  password: string;
  full_name: string;
  company_name: string | null;
  role: string;
  permissions: any;
  created_at: string;
  updated_at: string;
}

export class UsersAPI extends BaseAPI<UserDB> {
  constructor() {
    super('users');
  }

  async getByEmail(email: string): Promise<UserDB | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error);
      return null;
    }
  }

  async authenticate(email: string, password: string): Promise<UserDB | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error);
      return null;
    }
  }

  async updatePermissions(id: string, permissions: string[]): Promise<UserDB> {
    return this.update(id, { permissions });
  }
}

export const usersAPI = new UsersAPI();