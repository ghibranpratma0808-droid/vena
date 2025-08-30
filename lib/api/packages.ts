import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface PackageDB {
  id: string;
  name: string;
  price: number;
  category: string;
  physical_items: any;
  digital_items: any;
  processing_time: string;
  photographers: string | null;
  videographers: string | null;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface AddOnDB {
  id: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export class PackagesAPI extends BaseAPI<PackageDB> {
  constructor() {
    super('packages');
  }

  async getByCategory(category: string): Promise<PackageDB[]> {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('category', category)
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }
}

export class AddOnsAPI extends BaseAPI<AddOnDB> {
  constructor() {
    super('add_ons');
  }
}

export const packagesAPI = new PackagesAPI();
export const addOnsAPI = new AddOnsAPI();