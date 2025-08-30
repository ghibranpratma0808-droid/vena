import { BaseAPI } from './base';
import { supabase, handleSupabaseError } from '../supabase';

export interface NotificationDB {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  is_read: boolean;
  icon: string;
  link_view: string | null;
  link_action: any;
  created_at: string;
  updated_at: string;
}

export class NotificationsAPI extends BaseAPI<NotificationDB> {
  constructor() {
    super('notifications');
  }

  async getUnread(): Promise<NotificationDB[]> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('is_read', false)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async markAsRead(id: string): Promise<NotificationDB> {
    return this.update(id, { is_read: true });
  }

  async markAllAsRead(): Promise<void> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('is_read', false);

      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error);
    }
  }
}

export const notificationsAPI = new NotificationsAPI();