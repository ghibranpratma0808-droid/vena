import { useState, useEffect } from 'react';
import { 
  leadsAPI, clientsAPI, projectsAPI, packagesAPI, addOnsAPI,
  teamMembersAPI, transactionsAPI, cardsAPI, pocketsAPI,
  assetsAPI, contractsAPI, promoCodesAPI, sopsAPI,
  clientFeedbackAPI, socialMediaAPI, notificationsAPI,
  profilesAPI, usersAPI
} from '../lib/api';

// Transform functions from database format to frontend format
const transformFromDB = {
  profile: (profile: any) => ({
    id: profile.id,
    adminUserId: profile.admin_user_id,
    fullName: profile.full_name,
    email: profile.email,
    phone: profile.phone,
    companyName: profile.company_name,
    website: profile.website,
    address: profile.address,
    bankAccount: profile.bank_account,
    authorizedSigner: profile.authorized_signer,
    idNumber: profile.id_number,
    bio: profile.bio,
    incomeCategories: profile.income_categories,
    expenseCategories: profile.expense_categories,
    projectTypes: profile.project_types,
    eventTypes: profile.event_types,
    assetCategories: profile.asset_categories,
    sopCategories: profile.sop_categories,
    packageCategories: profile.package_categories,
    projectStatusConfig: profile.project_status_config,
    notificationSettings: profile.notification_settings,
    securitySettings: profile.security_settings,
    briefingTemplate: profile.briefing_template,
    termsAndConditions: profile.terms_and_conditions,
    contractTemplate: profile.contract_template,
    logoBase64: profile.logo_base64,
    brandColor: profile.brand_color,
    publicPageConfig: profile.public_page_config,
    packageShareTemplate: profile.package_share_template,
    bookingFormTemplate: profile.booking_form_template,
    chatTemplates: profile.chat_templates,
  }),

  client: (client: any) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    whatsapp: client.whatsapp,
    instagram: client.instagram,
    since: client.since,
    status: client.status,
    clientType: client.client_type,
    lastContact: client.last_contact,
    portalAccessId: client.portal_access_id,
  }),

  project: (project: any) => ({
    id: project.id,
    projectName: project.project_name,
    clientName: project.client_name,
    clientId: project.client_id,
    projectType: project.project_type,
    packageName: project.package_name,
    packageId: project.package_id,
    addOns: project.add_ons,
    date: project.date,
    deadlineDate: project.deadline_date,
    location: project.location,
    progress: project.progress,
    status: project.status,
    activeSubStatuses: project.active_sub_statuses,
    totalCost: project.total_cost,
    amountPaid: project.amount_paid,
    paymentStatus: project.payment_status,
    team: project.team,
    notes: project.notes,
    accommodation: project.accommodation,
    driveLink: project.drive_link,
    clientDriveLink: project.client_drive_link,
    finalDriveLink: project.final_drive_link,
    startTime: project.start_time,
    endTime: project.end_time,
    image: project.image,
    revisions: project.revisions,
    promoCodeId: project.promo_code_id,
    discountAmount: project.discount_amount,
    shippingDetails: project.shipping_details,
    dpProofUrl: project.dp_proof_url,
    printingDetails: project.printing_details,
    printingCost: project.printing_cost,
    transportCost: project.transport_cost,
    isEditingConfirmedByClient: project.is_editing_confirmed_by_client,
    isPrintingConfirmedByClient: project.is_printing_confirmed_by_client,
    isDeliveryConfirmedByClient: project.is_delivery_confirmed_by_client,
    confirmedSubStatuses: project.confirmed_sub_statuses,
    clientSubStatusNotes: project.client_sub_status_notes,
    subStatusConfirmationSentAt: project.sub_status_confirmation_sent_at,
    completedDigitalItems: project.completed_digital_items,
    invoiceSignature: project.invoice_signature,
    customSubStatuses: project.custom_sub_statuses,
    bookingStatus: project.booking_status,
    rejectionReason: project.rejection_reason,
    chatHistory: project.chat_history,
  }),

  package: (pkg: any) => ({
    id: pkg.id,
    name: pkg.name,
    price: pkg.price,
    category: pkg.category,
    physicalItems: pkg.physical_items,
    digitalItems: pkg.digital_items,
    processingTime: pkg.processing_time,
    photographers: pkg.photographers,
    videographers: pkg.videographers,
    coverImage: pkg.cover_image,
  }),

  addOn: (addOn: any) => ({
    id: addOn.id,
    name: addOn.name,
    price: addOn.price,
  }),

  teamMember: (member: any) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    email: member.email,
    phone: member.phone,
    standardFee: member.standard_fee,
    noRek: member.no_rek,
    rewardBalance: member.reward_balance,
    rating: member.rating,
    performanceNotes: member.performance_notes,
    portalAccessId: member.portal_access_id,
  }),

  transaction: (transaction: any) => ({
    id: transaction.id,
    date: transaction.date,
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    projectId: transaction.project_id,
    category: transaction.category,
    method: transaction.method,
    pocketId: transaction.pocket_id,
    cardId: transaction.card_id,
    printingItemId: transaction.printing_item_id,
    vendorSignature: transaction.vendor_signature,
  }),

  card: (card: any) => ({
    id: card.id,
    cardHolderName: card.card_holder_name,
    bankName: card.bank_name,
    cardType: card.card_type,
    lastFourDigits: card.last_four_digits,
    expiryDate: card.expiry_date,
    balance: card.balance,
    colorGradient: card.color_gradient,
  }),

  pocket: (pocket: any) => ({
    id: pocket.id,
    name: pocket.name,
    description: pocket.description,
    icon: pocket.icon,
    type: pocket.type,
    amount: pocket.amount,
    goalAmount: pocket.goal_amount,
    lockEndDate: pocket.lock_end_date,
    members: pocket.members,
    sourceCardId: pocket.source_card_id,
  }),

  lead: (lead: any) => ({
    id: lead.id,
    name: lead.name,
    contactChannel: lead.contact_channel,
    location: lead.location,
    status: lead.status,
    date: lead.date,
    notes: lead.notes,
    whatsapp: lead.whatsapp,
  }),

  asset: (asset: any) => ({
    id: asset.id,
    name: asset.name,
    category: asset.category,
    purchaseDate: asset.purchase_date,
    purchasePrice: asset.purchase_price,
    serialNumber: asset.serial_number,
    status: asset.status,
    notes: asset.notes,
  }),

  contract: (contract: any) => ({
    id: contract.id,
    contractNumber: contract.contract_number,
    clientId: contract.client_id,
    projectId: contract.project_id,
    signingDate: contract.signing_date,
    signingLocation: contract.signing_location,
    clientName1: contract.client_name1,
    clientAddress1: contract.client_address1,
    clientPhone1: contract.client_phone1,
    clientName2: contract.client_name2,
    clientAddress2: contract.client_address2,
    clientPhone2: contract.client_phone2,
    shootingDuration: contract.shooting_duration,
    guaranteedPhotos: contract.guaranteed_photos,
    albumDetails: contract.album_details,
    digitalFilesFormat: contract.digital_files_format,
    otherItems: contract.other_items,
    personnelCount: contract.personnel_count,
    deliveryTimeframe: contract.delivery_timeframe,
    dpDate: contract.dp_date,
    finalPaymentDate: contract.final_payment_date,
    cancellationPolicy: contract.cancellation_policy,
    jurisdiction: contract.jurisdiction,
    vendorSignature: contract.vendor_signature,
    clientSignature: contract.client_signature,
  }),

  promoCode: (promoCode: any) => ({
    id: promoCode.id,
    code: promoCode.code,
    discountType: promoCode.discount_type,
    discountValue: promoCode.discount_value,
    isActive: promoCode.is_active,
    usageCount: promoCode.usage_count,
    maxUsage: promoCode.max_usage,
    expiryDate: promoCode.expiry_date,
    createdAt: promoCode.created_at,
  }),

  sop: (sop: any) => ({
    id: sop.id,
    title: sop.title,
    category: sop.category,
    content: sop.content,
    lastUpdated: sop.last_updated,
  }),

  clientFeedback: (feedback: any) => ({
    id: feedback.id,
    clientName: feedback.client_name,
    satisfaction: feedback.satisfaction,
    rating: feedback.rating,
    feedback: feedback.feedback,
    date: feedback.date,
  }),

  socialMediaPost: (post: any) => ({
    id: post.id,
    projectId: post.project_id,
    clientName: post.client_name,
    postType: post.post_type,
    platform: post.platform,
    scheduledDate: post.scheduled_date,
    caption: post.caption,
    mediaUrl: post.media_url,
    status: post.status,
    notes: post.notes,
  }),

  notification: (notification: any) => ({
    id: notification.id,
    title: notification.title,
    message: notification.message,
    timestamp: notification.timestamp,
    isRead: notification.is_read,
    icon: notification.icon,
    link: notification.link_view ? {
      view: notification.link_view,
      action: notification.link_action
    } : undefined,
  }),

  teamProjectPayment: (payment: any) => ({
    id: payment.id,
    projectId: payment.project_id,
    teamMemberName: payment.team_member_name,
    teamMemberId: payment.team_member_id,
    date: payment.date,
    status: payment.status,
    fee: payment.fee,
    reward: payment.reward,
  }),

  teamPaymentRecord: (record: any) => ({
    id: record.id,
    recordNumber: record.record_number,
    teamMemberId: record.team_member_id,
    date: record.date,
    projectPaymentIds: record.project_payment_ids,
    totalAmount: record.total_amount,
    vendorSignature: record.vendor_signature,
  }),

  rewardLedgerEntry: (entry: any) => ({
    id: entry.id,
    teamMemberId: entry.team_member_id,
    date: entry.date,
    description: entry.description,
    amount: entry.amount,
    projectId: entry.project_id,
  }),

  user: (user: any) => ({
    id: user.id,
    email: user.email,
    password: user.password,
    fullName: user.full_name,
    companyName: user.company_name,
    role: user.role,
    permissions: user.permissions,
  }),
};

export const useSupabaseData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for all data
  const [profile, setProfile] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [addOns, setAddOns] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [pockets, setPockets] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [sops, setSops] = useState<any[]>([]);
  const [clientFeedback, setClientFeedback] = useState<any[]>([]);
  const [socialMediaPosts, setSocialMediaPosts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [teamProjectPayments, setTeamProjectPayments] = useState<any[]>([]);
  const [teamPaymentRecords, setTeamPaymentRecords] = useState<any[]>([]);
  const [rewardLedgerEntries, setRewardLedgerEntries] = useState<any[]>([]);

  const loadAllData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [
        profileData,
        usersData,
        clientsData,
        projectsData,
        packagesData,
        addOnsData,
        teamMembersData,
        leadsData,
        transactionsData,
        cardsData,
        pocketsData,
        assetsData,
        contractsData,
        promoCodesData,
        sopsData,
        clientFeedbackData,
        socialMediaPostsData,
        notificationsData,
        teamProjectPaymentsData,
        teamPaymentRecordsData,
        rewardLedgerEntriesData,
      ] = await Promise.all([
        profilesAPI.getPublicProfile(),
        usersAPI.getAll(),
        clientsAPI.getAll(),
        projectsAPI.getAll(),
        packagesAPI.getAll(),
        addOnsAPI.getAll(),
        teamMembersAPI.getAll(),
        leadsAPI.getAll(),
        transactionsAPI.getAll(),
        cardsAPI.getAll(),
        pocketsAPI.getAll(),
        assetsAPI.getAll(),
        contractsAPI.getAll(),
        promoCodesAPI.getAll(),
        sopsAPI.getAll(),
        clientFeedbackAPI.getAll(),
        socialMediaAPI.getAll(),
        notificationsAPI.getAll(),
        teamProjectPaymentsAPI.getAll(),
        teamPaymentRecordsAPI.getAll(),
        rewardLedgerAPI.getAll(),
      ]);

      // Transform and set data
      setProfile(profileData ? transformFromDB.profile(profileData) : null);
      setUsers(usersData.map(transformFromDB.user));
      setClients(clientsData.map(transformFromDB.client));
      setProjects(projectsData.map(transformFromDB.project));
      setPackages(packagesData.map(transformFromDB.package));
      setAddOns(addOnsData.map(transformFromDB.addOn));
      setTeamMembers(teamMembersData.map(transformFromDB.teamMember));
      setLeads(leadsData.map(transformFromDB.lead));
      setTransactions(transactionsData.map(transformFromDB.transaction));
      setCards(cardsData.map(transformFromDB.card));
      setPockets(pocketsData.map(transformFromDB.pocket));
      setAssets(assetsData.map(transformFromDB.asset));
      setContracts(contractsData.map(transformFromDB.contract));
      setPromoCodes(promoCodesData.map(transformFromDB.promoCode));
      setSops(sopsData.map(transformFromDB.sop));
      setClientFeedback(clientFeedbackData.map(transformFromDB.clientFeedback));
      setSocialMediaPosts(socialMediaPostsData.map(transformFromDB.socialMediaPost));
      setNotifications(notificationsData.map(transformFromDB.notification));
      setTeamProjectPayments(teamProjectPaymentsData.map(transformFromDB.teamProjectPayment));
      setTeamPaymentRecords(teamPaymentRecordsData.map(transformFromDB.teamPaymentRecord));
      setRewardLedgerEntries(rewardLedgerEntriesData.map(transformFromDB.rewardLedgerEntry));

    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return {
    // Data
    profile,
    users,
    clients,
    projects,
    packages,
    addOns,
    teamMembers,
    leads,
    transactions,
    cards,
    pockets,
    assets,
    contracts,
    promoCodes,
    sops,
    clientFeedback,
    socialMediaPosts,
    notifications,
    teamProjectPayments,
    teamPaymentRecords,
    rewardLedgerEntries,

    // Setters
    setProfile,
    setUsers,
    setClients,
    setProjects,
    setPackages,
    setAddOns,
    setTeamMembers,
    setLeads,
    setTransactions,
    setCards,
    setPockets,
    setAssets,
    setContracts,
    setPromoCodes,
    setSops,
    setClientFeedback,
    setSocialMediaPosts,
    setNotifications,
    setTeamProjectPayments,
    setTeamPaymentRecords,
    setRewardLedgerEntries,

    // Utilities
    isLoading,
    error,
    refetch: loadAllData,
  };
};