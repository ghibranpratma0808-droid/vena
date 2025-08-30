import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface PromoCodeDB {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  is_active: boolean;
  usage_count: number;
  max_usage: number | null;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
}

export class PromoCodesAPI extends BaseAPI<PromoCodeDB> {
  constructor() {
    super('promo_codes');
  }

  async getActivePromoCodes(): Promise<PromoCodeDB[]> {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByCode(code: string): Promise<PromoCodeDB | null> {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error);
      return null;
    }
  }

  async incrementUsage(id: string): Promise<PromoCodeDB> {
    const promoCode = await this.getById(id);
    if (!promoCode) throw new Error('Promo code not found');
    
    return this.update(id, { usage_count: promoCode.usage_count + 1 });
  }
}

export const promoCodesAPI = new PromoCodesAPI();