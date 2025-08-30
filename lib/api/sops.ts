import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface SOPDB {
  id: string;
  title: string;
  category: string;
  content: string;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export class SOPsAPI extends BaseAPI<SOPDB> {
  constructor() {
    super('sops');
  }

  async getByCategory(category: string): Promise<SOPDB[]> {
    try {
      const { data, error } = await supabase
        .from('sops')
        .select('*')
        .eq('category', category)
        .order('title');

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async updateContent(id: string, content: string): Promise<SOPDB> {
    return this.update(id, { 
      content,
      last_updated: new Date().toISOString()
    });
  }
}

export const sopsAPI = new SOPsAPI();