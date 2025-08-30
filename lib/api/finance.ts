import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface TransactionDB {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: string;
  project_id: string | null;
  category: string;
  method: string;
  pocket_id: string | null;
  card_id: string | null;
  printing_item_id: string | null;
  vendor_signature: string | null;
  created_at: string;
  updated_at: string;
}

export interface CardDB {
  id: string;
  card_holder_name: string;
  bank_name: string;
  card_type: string;
  last_four_digits: string;
  expiry_date: string | null;
  balance: number;
  color_gradient: string;
  created_at: string;
  updated_at: string;
}

export interface PocketDB {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: string;
  amount: number;
  goal_amount: number | null;
  lock_end_date: string | null;
  members: any;
  source_card_id: string | null;
  created_at: string;
  updated_at: string;
}

export class TransactionsAPI extends BaseAPI<TransactionDB> {
  constructor() {
    super('transactions');
  }

  async getByType(type: string): Promise<TransactionDB[]> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('type', type)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByProjectId(projectId: string): Promise<TransactionDB[]> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('project_id', projectId)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<TransactionDB[]> {
    try {
      const { data, error } = await supabase
        .from('transactions')
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

export class CardsAPI extends BaseAPI<CardDB> {
  constructor() {
    super('cards');
  }

  async updateBalance(id: string, amount: number): Promise<CardDB> {
    const card = await this.getById(id);
    if (!card) throw new Error('Card not found');
    
    return this.update(id, { balance: card.balance + amount });
  }
}

export class PocketsAPI extends BaseAPI<PocketDB> {
  constructor() {
    super('pockets');
  }

  async updateAmount(id: string, amount: number): Promise<PocketDB> {
    return this.update(id, { amount });
  }
}

export const transactionsAPI = new TransactionsAPI();
export const cardsAPI = new CardsAPI();
export const pocketsAPI = new PocketsAPI();