import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface AssetDB {
  id: string;
  name: string;
  category: string;
  purchase_date: string;
  purchase_price: number;
  serial_number: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export class AssetsAPI extends BaseAPI<AssetDB> {
  constructor() {
    super('assets');
  }

  async getByCategory(category: string): Promise<AssetDB[]> {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('category', category)
        .order('purchase_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByStatus(status: string): Promise<AssetDB[]> {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('status', status)
        .order('purchase_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async updateStatus(id: string, status: string): Promise<AssetDB> {
    return this.update(id, { status });
  }
}

export const assetsAPI = new AssetsAPI();