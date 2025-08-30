import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface TeamMemberDB {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  standard_fee: number;
  no_rek: string | null;
  reward_balance: number;
  rating: number;
  performance_notes: any;
  portal_access_id: string;
  created_at: string;
  updated_at: string;
}

export interface TeamProjectPaymentDB {
  id: string;
  project_id: string;
  team_member_name: string;
  team_member_id: string;
  date: string;
  status: string;
  fee: number;
  reward: number;
  created_at: string;
  updated_at: string;
}

export interface TeamPaymentRecordDB {
  id: string;
  record_number: string;
  team_member_id: string;
  date: string;
  project_payment_ids: any;
  total_amount: number;
  vendor_signature: string | null;
  created_at: string;
  updated_at: string;
}

export interface RewardLedgerEntryDB {
  id: string;
  team_member_id: string;
  date: string;
  description: string;
  amount: number;
  project_id: string | null;
  created_at: string;
  updated_at: string;
}

export class TeamMembersAPI extends BaseAPI<TeamMemberDB> {
  constructor() {
    super('team_members');
  }

  async getByPortalAccessId(accessId: string): Promise<TeamMemberDB | null> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('portal_access_id', accessId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error);
      return null;
    }
  }

  async updateRating(id: string, rating: number): Promise<TeamMemberDB> {
    return this.update(id, { rating });
  }

  async addPerformanceNote(id: string, note: any): Promise<TeamMemberDB> {
    const member = await this.getById(id);
    if (!member) throw new Error('Team member not found');
    
    const notes = Array.isArray(member.performance_notes) ? member.performance_notes : [];
    notes.push(note);
    
    return this.update(id, { performance_notes: notes });
  }
}

export class TeamProjectPaymentsAPI extends BaseAPI<TeamProjectPaymentDB> {
  constructor() {
    super('team_project_payments');
  }

  async getByTeamMemberId(teamMemberId: string): Promise<TeamProjectPaymentDB[]> {
    try {
      const { data, error } = await supabase
        .from('team_project_payments')
        .select('*')
        .eq('team_member_id', teamMemberId)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getUnpaidByTeamMemberId(teamMemberId: string): Promise<TeamProjectPaymentDB[]> {
    try {
      const { data, error } = await supabase
        .from('team_project_payments')
        .select('*')
        .eq('team_member_id', teamMemberId)
        .eq('status', 'Unpaid')
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }
}

export class TeamPaymentRecordsAPI extends BaseAPI<TeamPaymentRecordDB> {
  constructor() {
    super('team_payment_records');
  }

  async getByTeamMemberId(teamMemberId: string): Promise<TeamPaymentRecordDB[]> {
    try {
      const { data, error } = await supabase
        .from('team_payment_records')
        .select('*')
        .eq('team_member_id', teamMemberId)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }
}

export class RewardLedgerAPI extends BaseAPI<RewardLedgerEntryDB> {
  constructor() {
    super('reward_ledger_entries');
  }

  async getByTeamMemberId(teamMemberId: string): Promise<RewardLedgerEntryDB[]> {
    try {
      const { data, error } = await supabase
        .from('reward_ledger_entries')
        .select('*')
        .eq('team_member_id', teamMemberId)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }
}

export const teamMembersAPI = new TeamMembersAPI();
export const teamProjectPaymentsAPI = new TeamProjectPaymentsAPI();
export const teamPaymentRecordsAPI = new TeamPaymentRecordsAPI();
export const rewardLedgerAPI = new RewardLedgerAPI();