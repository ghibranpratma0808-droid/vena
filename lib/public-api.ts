import { supabase } from './supabase';
import { 
  ClientDB, ProjectDB, LeadDB, ClientFeedbackDB, 
  PackageDB, AddOnDB, PromoCodeDB, ProfileDB 
} from './api';

// Public API functions for forms (no authentication required)
export class PublicAPI {
  // Submit lead form
  static async submitLead(leadData: {
    name: string;
    whatsapp?: string;
    contactChannel: string;
    location: string;
    notes?: string;
  }) {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: leadData.name,
        contact_channel: leadData.contactChannel,
        location: leadData.location,
        status: 'Sedang Diskusi',
        date: new Date().toISOString().split('T')[0],
        notes: leadData.notes,
        whatsapp: leadData.whatsapp,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Submit booking form
  static async submitBooking(bookingData: {
    clientData: {
      name: string;
      email: string;
      phone: string;
      instagram?: string;
    };
    projectData: {
      projectName: string;
      projectType: string;
      date: string;
      location: string;
      packageId: string;
      packageName: string;
      addOns: any[];
      totalCost: number;
      amountPaid: number;
      notes?: string;
      dpProofUrl?: string;
      transportCost?: number;
      promoCodeId?: string;
      discountAmount?: number;
    };
  }) {
    // Create client first
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .insert({
        name: bookingData.clientData.name,
        email: bookingData.clientData.email,
        phone: bookingData.clientData.phone,
        instagram: bookingData.clientData.instagram,
        status: 'Aktif',
        client_type: 'Langsung',
        since: new Date().toISOString().split('T')[0],
        last_contact: new Date().toISOString(),
        portal_access_id: crypto.randomUUID(),
      })
      .select()
      .single();

    if (clientError) throw clientError;

    // Create project
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .insert({
        project_name: bookingData.projectData.projectName,
        client_name: clientData.name,
        client_id: clientData.id,
        project_type: bookingData.projectData.projectType,
        package_name: bookingData.projectData.packageName,
        package_id: bookingData.projectData.packageId,
        add_ons: bookingData.projectData.addOns,
        date: bookingData.projectData.date,
        location: bookingData.projectData.location,
        progress: 0,
        status: 'Dikonfirmasi',
        booking_status: 'Baru',
        total_cost: bookingData.projectData.totalCost,
        amount_paid: bookingData.projectData.amountPaid,
        payment_status: bookingData.projectData.amountPaid > 0 ? 'DP Terbayar' : 'Belum Bayar',
        team: [],
        notes: bookingData.projectData.notes,
        dp_proof_url: bookingData.projectData.dpProofUrl,
        transport_cost: bookingData.projectData.transportCost,
        promo_code_id: bookingData.projectData.promoCodeId,
        discount_amount: bookingData.projectData.discountAmount,
      })
      .select()
      .single();

    if (projectError) throw projectError;

    // Create lead record
    const { error: leadError } = await supabase
      .from('leads')
      .insert({
        name: clientData.name,
        contact_channel: 'Website',
        location: bookingData.projectData.location,
        status: 'Dikonversi',
        date: new Date().toISOString().split('T')[0],
        notes: `Dikonversi dari formulir booking. Klien ID: ${clientData.id}`,
      });

    if (leadError) throw leadError;

    // Create transaction if DP paid
    if (bookingData.projectData.amountPaid > 0) {
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          date: new Date().toISOString().split('T')[0],
          description: `DP Proyek ${projectData.project_name}`,
          amount: bookingData.projectData.amountPaid,
          type: 'Pemasukan',
          project_id: projectData.id,
          category: 'DP Proyek',
          method: 'Transfer Bank',
        });

      if (transactionError) throw transactionError;
    }

    // Update promo code usage if used
    if (bookingData.projectData.promoCodeId) {
      const { error: promoError } = await supabase
        .rpc('increment_promo_usage', { promo_id: bookingData.projectData.promoCodeId });

      if (promoError) console.error('Error updating promo code usage:', promoError);
    }

    return { client: clientData, project: projectData };
  }

  // Submit feedback form
  static async submitFeedback(feedbackData: {
    clientName: string;
    rating: number;
    satisfaction: string;
    feedback: string;
  }) {
    const { data, error } = await supabase
      .from('client_feedback')
      .insert({
        client_name: feedbackData.clientName,
        rating: feedbackData.rating,
        satisfaction: feedbackData.satisfaction,
        feedback: feedbackData.feedback,
        date: new Date().toISOString().split('T')[0],
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get public packages
  static async getPublicPackages(): Promise<PackageDB[]> {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('category', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Get public add-ons
  static async getPublicAddOns(): Promise<AddOnDB[]> {
    const { data, error } = await supabase
      .from('add_ons')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Get public profile
  static async getPublicProfile(): Promise<ProfileDB | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  }

  // Get active promo codes
  static async getActivePromoCodes(): Promise<PromoCodeDB[]> {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Validate promo code
  static async validatePromoCode(code: string): Promise<PromoCodeDB | null> {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error) return null;
    
    // Check if expired
    if (data.expiry_date && new Date(data.expiry_date) < new Date()) {
      return null;
    }
    
    // Check if max usage reached
    if (data.max_usage && data.usage_count >= data.max_usage) {
      return null;
    }
    
    return data;
  }

  // Get client portal data
  static async getClientPortalData(accessId: string) {
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('portal_access_id', accessId)
      .single();

    if (clientError) throw clientError;

    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('client_id', client.id)
      .order('date', { ascending: false });

    if (projectsError) throw projectsError;

    const { data: contracts, error: contractsError } = await supabase
      .from('contracts')
      .select('*')
      .eq('client_id', client.id)
      .order('signing_date', { ascending: false });

    if (contractsError) throw contractsError;

    return { client, projects: projects || [], contracts: contracts || [] };
  }

  // Get freelancer portal data
  static async getFreelancerPortalData(accessId: string) {
    const { data: freelancer, error: freelancerError } = await supabase
      .from('team_members')
      .select('*')
      .eq('portal_access_id', accessId)
      .single();

    if (freelancerError) throw freelancerError;

    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .contains('team', [{ memberId: freelancer.id }])
      .order('date', { ascending: false });

    if (projectsError) throw projectsError;

    const { data: payments, error: paymentsError } = await supabase
      .from('team_project_payments')
      .select('*')
      .eq('team_member_id', freelancer.id)
      .order('date', { ascending: false });

    if (paymentsError) throw paymentsError;

    return { freelancer, projects: projects || [], payments: payments || [] };
  }

  // Update project revision
  static async updateRevision(projectId: string, revisionId: string, updateData: {
    freelancerNotes?: string;
    driveLink?: string;
    status?: string;
  }) {
    const { data: project, error: getError } = await supabase
      .from('projects')
      .select('revisions')
      .eq('id', projectId)
      .single();

    if (getError) throw getError;

    const revisions = Array.isArray(project.revisions) ? project.revisions : [];
    const updatedRevisions = revisions.map((rev: any) => 
      rev.id === revisionId 
        ? { 
            ...rev, 
            ...updateData,
            completedDate: updateData.status === 'Revisi Selesai' ? new Date().toISOString() : rev.completedDate
          }
        : rev
    );

    const { data, error } = await supabase
      .from('projects')
      .update({ revisions: updatedRevisions })
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}