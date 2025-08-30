import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface SocialMediaPostDB {
  id: string;
  project_id: string;
  client_name: string;
  post_type: string;
  platform: string;
  scheduled_date: string;
  caption: string;
  media_url: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export class SocialMediaAPI extends BaseAPI<SocialMediaPostDB> {
  constructor() {
    super('social_media_posts');
  }

  async getByStatus(status: string): Promise<SocialMediaPostDB[]> {
    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .select('*')
        .eq('status', status)
        .order('scheduled_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByProjectId(projectId: string): Promise<SocialMediaPostDB[]> {
    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .select('*')
        .eq('project_id', projectId)
        .order('scheduled_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<SocialMediaPostDB[]> {
    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .select('*')
        .gte('scheduled_date', startDate)
        .lte('scheduled_date', endDate)
        .order('scheduled_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async updateStatus(id: string, status: string): Promise<SocialMediaPostDB> {
    return this.update(id, { status });
  }
}

export const socialMediaAPI = new SocialMediaAPI();