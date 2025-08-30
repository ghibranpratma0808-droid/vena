import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface LeadDB {
  id: string;
  name: string;
  contact_channel: string;
  location: string;
  status: string;
  date: string;
  notes: string | null;
  whatsapp: string | null;
  created_at: string;
  updated_at: string;
}

export class LeadsAPI extends BaseAPI<LeadDB> {
  constructor() {
    super('leads');
  }

  async getByStatus(status: string): Promise<LeadDB[]> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('status', status)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<LeadDB[]> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async updateStatus(id: string, status: string): Promise<LeadDB> {
    return this.update(id, { status });
  }
}

export const leadsAPI = new LeadsAPI();