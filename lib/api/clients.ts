import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface ClientDB {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  instagram: string | null;
  since: string;
  status: string;
  client_type: string;
  last_contact: string;
  portal_access_id: string;
  created_at: string;
  updated_at: string;
}

export class ClientsAPI extends BaseAPI<ClientDB> {
  constructor() {
    super('clients');
  }

  async getByStatus(status: string): Promise<ClientDB[]> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('status', status)
        .order('since', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByPortalAccessId(accessId: string): Promise<ClientDB | null> {
    try {
      const { data, error } = await supabase
        .from('clients')
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

  async updateLastContact(id: string): Promise<ClientDB> {
    return this.update(id, { last_contact: new Date().toISOString() });
  }
}

export const clientsAPI = new ClientsAPI();