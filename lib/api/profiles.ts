import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface ProfileDB {
  id: string;
  admin_user_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  website: string;
  address: string;
  bank_account: string;
  authorized_signer: string;
  id_number: string | null;
  bio: string;
  income_categories: any;
  expense_categories: any;
  project_types: any;
  event_types: any;
  asset_categories: any;
  sop_categories: any;
  package_categories: any;
  project_status_config: any;
  notification_settings: any;
  security_settings: any;
  briefing_template: string;
  terms_and_conditions: string | null;
  contract_template: string | null;
  logo_base64: string | null;
  brand_color: string;
  public_page_config: any;
  package_share_template: string | null;
  booking_form_template: string | null;
  chat_templates: any;
  created_at: string;
  updated_at: string;
}

export class ProfilesAPI extends BaseAPI<ProfileDB> {
  constructor() {
    super('profiles');
  }

  async getByUserId(userId: string): Promise<ProfileDB | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('admin_user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error);
      return null;
    }
  }

  async getPublicProfile(): Promise<ProfileDB | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error);
      return null;
    }
  }
}

export const profilesAPI = new ProfilesAPI();