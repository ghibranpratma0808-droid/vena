import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface ProjectDB {
  id: string;
  project_name: string;
  client_name: string;
  client_id: string;
  project_type: string;
  package_name: string;
  package_id: string | null;
  add_ons: any;
  date: string;
  deadline_date: string | null;
  location: string;
  progress: number;
  status: string;
  active_sub_statuses: any;
  total_cost: number;
  amount_paid: number;
  payment_status: string;
  team: any;
  notes: string | null;
  accommodation: string | null;
  drive_link: string | null;
  client_drive_link: string | null;
  final_drive_link: string | null;
  start_time: string | null;
  end_time: string | null;
  image: string | null;
  revisions: any;
  promo_code_id: string | null;
  discount_amount: number;
  shipping_details: string | null;
  dp_proof_url: string | null;
  printing_details: any;
  printing_cost: number;
  transport_cost: number;
  is_editing_confirmed_by_client: boolean;
  is_printing_confirmed_by_client: boolean;
  is_delivery_confirmed_by_client: boolean;
  confirmed_sub_statuses: any;
  client_sub_status_notes: any;
  sub_status_confirmation_sent_at: any;
  completed_digital_items: any;
  invoice_signature: string | null;
  custom_sub_statuses: any;
  booking_status: string | null;
  rejection_reason: string | null;
  chat_history: any;
  created_at: string;
  updated_at: string;
}

export class ProjectsAPI extends BaseAPI<ProjectDB> {
  constructor() {
    super('projects');
  }

  async getByClientId(clientId: string): Promise<ProjectDB[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', clientId)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByStatus(status: string): Promise<ProjectDB[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
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

  async getByDateRange(startDate: string, endDate: string): Promise<ProjectDB[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
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

  async updateProgress(id: string, progress: number): Promise<ProjectDB> {
    return this.update(id, { progress });
  }

  async updateStatus(id: string, status: string): Promise<ProjectDB> {
    return this.update(id, { status });
  }

  async addRevision(id: string, revision: any): Promise<ProjectDB> {
    const project = await this.getById(id);
    if (!project) throw new Error('Project not found');
    
    const revisions = Array.isArray(project.revisions) ? project.revisions : [];
    revisions.push(revision);
    
    return this.update(id, { revisions });
  }
}

export const projectsAPI = new ProjectsAPI();