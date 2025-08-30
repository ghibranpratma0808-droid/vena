import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface ContractDB {
  id: string;
  contract_number: string;
  client_id: string;
  project_id: string;
  signing_date: string;
  signing_location: string;
  client_name1: string;
  client_address1: string;
  client_phone1: string;
  client_name2: string | null;
  client_address2: string | null;
  client_phone2: string | null;
  shooting_duration: string;
  guaranteed_photos: string;
  album_details: string;
  digital_files_format: string;
  other_items: string | null;
  personnel_count: string;
  delivery_timeframe: string;
  dp_date: string | null;
  final_payment_date: string | null;
  cancellation_policy: string;
  jurisdiction: string;
  vendor_signature: string | null;
  client_signature: string | null;
  created_at: string;
  updated_at: string;
}

export class ContractsAPI extends BaseAPI<ContractDB> {
  constructor() {
    super('contracts');
  }

  async getByClientId(clientId: string): Promise<ContractDB[]> {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('client_id', clientId)
        .order('signing_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByProjectId(projectId: string): Promise<ContractDB[]> {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('project_id', projectId)
        .order('signing_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async addSignature(id: string, signatureType: 'vendor' | 'client', signature: string): Promise<ContractDB> {
    const field = signatureType === 'vendor' ? 'vendor_signature' : 'client_signature';
    return this.update(id, { [field]: signature });
  }
}

export const contractsAPI = new ContractsAPI();