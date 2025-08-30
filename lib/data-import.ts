import { supabase } from './supabase';
import { MOCK_DATA, MOCK_USERS, DEFAULT_USER_PROFILE } from '../constants';

// Transform functions to convert frontend types to database format
const transformProfile = (profile: any) => ({
  full_name: profile.fullName,
  email: profile.email,
  phone: profile.phone,
  company_name: profile.companyName,
  website: profile.website,
  address: profile.address,
  bank_account: profile.bankAccount,
  authorized_signer: profile.authorizedSigner,
  id_number: profile.idNumber,
  bio: profile.bio,
  income_categories: profile.incomeCategories,
  expense_categories: profile.expenseCategories,
  project_types: profile.projectTypes,
  event_types: profile.eventTypes,
  asset_categories: profile.assetCategories,
  sop_categories: profile.sopCategories,
  package_categories: profile.packageCategories,
  project_status_config: profile.projectStatusConfig,
  notification_settings: profile.notificationSettings,
  security_settings: profile.securitySettings,
  briefing_template: profile.briefingTemplate,
  terms_and_conditions: profile.termsAndConditions,
  contract_template: profile.contractTemplate,
  logo_base64: profile.logoBase64,
  brand_color: profile.brandColor,
  public_page_config: profile.publicPageConfig,
  package_share_template: profile.packageShareTemplate,
  booking_form_template: profile.bookingFormTemplate,
  chat_templates: profile.chatTemplates,
});

const transformClient = (client: any) => ({
  id: client.id,
  name: client.name,
  email: client.email,
  phone: client.phone,
  whatsapp: client.whatsapp,
  instagram: client.instagram,
  since: client.since,
  status: client.status,
  client_type: client.clientType,
  last_contact: client.lastContact,
  portal_access_id: client.portalAccessId,
});

const transformProject = (project: any) => ({
  id: project.id,
  project_name: project.projectName,
  client_name: project.clientName,
  client_id: project.clientId,
  project_type: project.projectType,
  package_name: project.packageName,
  package_id: project.packageId,
  add_ons: project.addOns,
  date: project.date,
  deadline_date: project.deadlineDate,
  location: project.location,
  progress: project.progress,
  status: project.status,
  active_sub_statuses: project.activeSubStatuses,
  total_cost: project.totalCost,
  amount_paid: project.amountPaid,
  payment_status: project.paymentStatus,
  team: project.team,
  notes: project.notes,
  accommodation: project.accommodation,
  drive_link: project.driveLink,
  client_drive_link: project.clientDriveLink,
  final_drive_link: project.finalDriveLink,
  start_time: project.startTime,
  end_time: project.endTime,
  image: project.image,
  revisions: project.revisions,
  promo_code_id: project.promoCodeId,
  discount_amount: project.discountAmount,
  shipping_details: project.shippingDetails,
  dp_proof_url: project.dpProofUrl,
  printing_details: project.printingDetails,
  printing_cost: project.printingCost,
  transport_cost: project.transportCost,
  is_editing_confirmed_by_client: project.isEditingConfirmedByClient,
  is_printing_confirmed_by_client: project.isPrintingConfirmedByClient,
  is_delivery_confirmed_by_client: project.isDeliveryConfirmedByClient,
  confirmed_sub_statuses: project.confirmedSubStatuses,
  client_sub_status_notes: project.clientSubStatusNotes,
  sub_status_confirmation_sent_at: project.subStatusConfirmationSentAt,
  completed_digital_items: project.completedDigitalItems,
  invoice_signature: project.invoiceSignature,
  custom_sub_statuses: project.customSubStatuses,
  booking_status: project.bookingStatus,
  rejection_reason: project.rejectionReason,
  chat_history: project.chatHistory,
});

const transformPackage = (pkg: any) => ({
  id: pkg.id,
  name: pkg.name,
  price: pkg.price,
  category: pkg.category,
  physical_items: pkg.physicalItems,
  digital_items: pkg.digitalItems,
  processing_time: pkg.processingTime,
  photographers: pkg.photographers,
  videographers: pkg.videographers,
  cover_image: pkg.coverImage,
});

const transformTeamMember = (member: any) => ({
  id: member.id,
  name: member.name,
  role: member.role,
  email: member.email,
  phone: member.phone,
  standard_fee: member.standardFee,
  no_rek: member.noRek,
  reward_balance: member.rewardBalance,
  rating: member.rating,
  performance_notes: member.performanceNotes,
  portal_access_id: member.portalAccessId,
});

const transformTransaction = (transaction: any) => ({
  id: transaction.id,
  date: transaction.date,
  description: transaction.description,
  amount: transaction.amount,
  type: transaction.type,
  project_id: transaction.projectId,
  category: transaction.category,
  method: transaction.method,
  pocket_id: transaction.pocketId,
  card_id: transaction.cardId,
  printing_item_id: transaction.printingItemId,
  vendor_signature: transaction.vendorSignature,
});

const transformCard = (card: any) => ({
  id: card.id,
  card_holder_name: card.cardHolderName,
  bank_name: card.bankName,
  card_type: card.cardType,
  last_four_digits: card.lastFourDigits,
  expiry_date: card.expiryDate,
  balance: card.balance,
  color_gradient: card.colorGradient,
});

const transformPocket = (pocket: any) => ({
  id: pocket.id,
  name: pocket.name,
  description: pocket.description,
  icon: pocket.icon,
  type: pocket.type,
  amount: pocket.amount,
  goal_amount: pocket.goalAmount,
  lock_end_date: pocket.lockEndDate,
  members: pocket.members,
  source_card_id: pocket.sourceCardId,
});

const transformLead = (lead: any) => ({
  id: lead.id,
  name: lead.name,
  contact_channel: lead.contactChannel,
  location: lead.location,
  status: lead.status,
  date: lead.date,
  notes: lead.notes,
  whatsapp: lead.whatsapp,
});

const transformAsset = (asset: any) => ({
  id: asset.id,
  name: asset.name,
  category: asset.category,
  purchase_date: asset.purchaseDate,
  purchase_price: asset.purchasePrice,
  serial_number: asset.serialNumber,
  status: asset.status,
  notes: asset.notes,
});

const transformContract = (contract: any) => ({
  id: contract.id,
  contract_number: contract.contractNumber,
  client_id: contract.clientId,
  project_id: contract.projectId,
  signing_date: contract.signingDate,
  signing_location: contract.signingLocation,
  client_name1: contract.clientName1,
  client_address1: contract.clientAddress1,
  client_phone1: contract.clientPhone1,
  client_name2: contract.clientName2,
  client_address2: contract.clientAddress2,
  client_phone2: contract.clientPhone2,
  shooting_duration: contract.shootingDuration,
  guaranteed_photos: contract.guaranteedPhotos,
  album_details: contract.albumDetails,
  digital_files_format: contract.digitalFilesFormat,
  other_items: contract.otherItems,
  personnel_count: contract.personnelCount,
  delivery_timeframe: contract.deliveryTimeframe,
  dp_date: contract.dpDate,
  final_payment_date: contract.finalPaymentDate,
  cancellation_policy: contract.cancellationPolicy,
  jurisdiction: contract.jurisdiction,
  vendor_signature: contract.vendorSignature,
  client_signature: contract.clientSignature,
});

const transformPromoCode = (promoCode: any) => ({
  id: promoCode.id,
  code: promoCode.code,
  discount_type: promoCode.discountType,
  discount_value: promoCode.discountValue,
  is_active: promoCode.isActive,
  usage_count: promoCode.usageCount,
  max_usage: promoCode.maxUsage,
  expiry_date: promoCode.expiryDate,
});

const transformSOP = (sop: any) => ({
  id: sop.id,
  title: sop.title,
  category: sop.category,
  content: sop.content,
  last_updated: sop.lastUpdated,
});

const transformClientFeedback = (feedback: any) => ({
  id: feedback.id,
  client_name: feedback.clientName,
  satisfaction: feedback.satisfaction,
  rating: feedback.rating,
  feedback: feedback.feedback,
  date: feedback.date,
});

const transformSocialMediaPost = (post: any) => ({
  id: post.id,
  project_id: post.projectId,
  client_name: post.clientName,
  post_type: post.postType,
  platform: post.platform,
  scheduled_date: post.scheduledDate,
  caption: post.caption,
  media_url: post.mediaUrl,
  status: post.status,
  notes: post.notes,
});

const transformNotification = (notification: any) => ({
  id: notification.id,
  title: notification.title,
  message: notification.message,
  timestamp: notification.timestamp,
  is_read: notification.isRead,
  icon: notification.icon,
  link_view: notification.link?.view,
  link_action: notification.link?.action,
});

const transformTeamProjectPayment = (payment: any) => ({
  id: payment.id,
  project_id: payment.projectId,
  team_member_name: payment.teamMemberName,
  team_member_id: payment.teamMemberId,
  date: payment.date,
  status: payment.status,
  fee: payment.fee,
  reward: payment.reward,
});

const transformTeamPaymentRecord = (record: any) => ({
  id: record.id,
  record_number: record.recordNumber,
  team_member_id: record.teamMemberId,
  date: record.date,
  project_payment_ids: record.projectPaymentIds,
  total_amount: record.totalAmount,
  vendor_signature: record.vendorSignature,
});

const transformRewardLedgerEntry = (entry: any) => ({
  id: entry.id,
  team_member_id: entry.teamMemberId,
  date: entry.date,
  description: entry.description,
  amount: entry.amount,
  project_id: entry.projectId,
});

export const importMockData = async () => {
  try {
    console.log('Starting mock data import...');

    // Import users first
    const { error: usersError } = await supabase
      .from('users')
      .upsert(MOCK_USERS.map(user => ({
        id: user.id,
        email: user.email,
        password: user.password,
        full_name: user.fullName,
        company_name: user.companyName,
        role: user.role,
        permissions: user.permissions,
      })));

    if (usersError) throw usersError;

    // Import profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert([transformProfile(DEFAULT_USER_PROFILE)]);

    if (profileError) throw profileError;

    // Import all other data
    const importPromises = [
      supabase.from('clients').upsert(MOCK_DATA.clients.map(transformClient)),
      supabase.from('packages').upsert(MOCK_DATA.packages.map(transformPackage)),
      supabase.from('add_ons').upsert(MOCK_DATA.addOns.map(addon => ({ id: addon.id, name: addon.name, price: addon.price }))),
      supabase.from('team_members').upsert(MOCK_DATA.teamMembers.map(transformTeamMember)),
      supabase.from('leads').upsert(MOCK_DATA.leads.map(transformLead)),
      supabase.from('projects').upsert(MOCK_DATA.projects.map(transformProject)),
      supabase.from('transactions').upsert(MOCK_DATA.transactions.map(transformTransaction)),
      supabase.from('cards').upsert(MOCK_DATA.cards.map(transformCard)),
      supabase.from('pockets').upsert(MOCK_DATA.pockets.map(transformPocket)),
      supabase.from('assets').upsert(MOCK_DATA.assets.map(transformAsset)),
      supabase.from('contracts').upsert(MOCK_DATA.contracts.map(transformContract)),
      supabase.from('promo_codes').upsert(MOCK_DATA.promoCodes.map(transformPromoCode)),
      supabase.from('sops').upsert(MOCK_DATA.sops.map(transformSOP)),
      supabase.from('client_feedback').upsert(MOCK_DATA.clientFeedback.map(transformClientFeedback)),
      supabase.from('social_media_posts').upsert(MOCK_DATA.socialMediaPosts.map(transformSocialMediaPost)),
      supabase.from('notifications').upsert(MOCK_DATA.notifications.map(transformNotification)),
      supabase.from('team_project_payments').upsert(MOCK_DATA.teamProjectPayments.map(transformTeamProjectPayment)),
      supabase.from('team_payment_records').upsert(MOCK_DATA.teamPaymentRecords.map(transformTeamPaymentRecord)),
      supabase.from('reward_ledger_entries').upsert(MOCK_DATA.rewardLedgerEntries.map(transformRewardLedgerEntry)),
    ];

    const results = await Promise.allSettled(importPromises);
    
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Import failed for table ${index}:`, result.reason);
      }
    });

    console.log('Mock data import completed!');
    return true;
  } catch (error) {
    console.error('Error importing mock data:', error);
    throw error;
  }
};

export const clearAllData = async () => {
  try {
    console.log('Clearing all data...');
    
    const tables = [
      'reward_ledger_entries',
      'team_payment_records', 
      'team_project_payments',
      'notifications',
      'social_media_posts',
      'client_feedback',
      'sops',
      'promo_codes',
      'contracts',
      'assets',
      'pockets',
      'cards',
      'transactions',
      'projects',
      'leads',
      'team_members',
      'add_ons',
      'packages',
      'clients',
      'profiles',
      'users'
    ];

    for (const table of tables) {
      const { error } = await supabase.from(table).delete().neq('id', '');
      if (error) {
        console.error(`Error clearing ${table}:`, error);
      }
    }

    console.log('All data cleared!');
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};