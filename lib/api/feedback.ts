import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface ClientFeedbackDB {
  id: string;
  client_name: string;
  satisfaction: string;
  rating: number;
  feedback: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export class ClientFeedbackAPI extends BaseAPI<ClientFeedbackDB> {
  constructor() {
    super('client_feedback');
  }

  async getBySatisfaction(satisfaction: string): Promise<ClientFeedbackDB[]> {
    try {
      const { data, error } = await supabase
        .from('client_feedback')
        .select('*')
        .eq('satisfaction', satisfaction)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<ClientFeedbackDB[]> {
    try {
      const { data, error } = await supabase
        .from('client_feedback')
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
}

export const clientFeedbackAPI = new ClientFeedbackAPI();