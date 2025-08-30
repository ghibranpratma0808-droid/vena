import {
  leadsAPI, clientsAPI, projectsAPI, packagesAPI, addOnsAPI,
  teamMembersAPI, transactionsAPI, cardsAPI, pocketsAPI,
  assetsAPI, contractsAPI, promoCodesAPI, sopsAPI,
  clientFeedbackAPI, socialMediaAPI, notificationsAPI,
  profilesAPI, usersAPI, teamProjectPaymentsAPI,
  teamPaymentRecordsAPI, rewardLedgerAPI
} from './api';

// Transform functions to convert frontend types to database format
const transformToDB = {
  profile: (profile: any) => ({
    admin_user_id: profile.adminUserId,
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
  }),

  client: (client: any) => ({
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
  }),

  project: (project: any) => ({
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
  }),

  package: (pkg: any) => ({
    name: pkg.name,
    price: pkg.price,
    category: pkg.category,
    physical_items: pkg.physicalItems,
    digital_items: pkg.digitalItems,
    processing_time: pkg.processingTime,
    photographers: pkg.photographers,
    videographers: pkg.videographers,
    cover_image: pkg.coverImage,
  }),

  addOn: (addOn: any) => ({
    name: addOn.name,
    price: addOn.price,
  }),

  teamMember: (member: any) => ({
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
  }),

  transaction: (transaction: any) => ({
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
  }),

  card: (card: any) => ({
    card_holder_name: card.cardHolderName,
    bank_name: card.bankName,
    card_type: card.cardType,
    last_four_digits: card.lastFourDigits,
    expiry_date: card.expiryDate,
    balance: card.balance,
    color_gradient: card.colorGradient,
  }),

  pocket: (pocket: any) => ({
    name: pocket.name,
    description: pocket.description,
    icon: pocket.icon,
    type: pocket.type,
    amount: pocket.amount,
    goal_amount: pocket.goalAmount,
    lock_end_date: pocket.lockEndDate,
    members: pocket.members,
    source_card_id: pocket.sourceCardId,
  }),

  lead: (lead: any) => ({
    name: lead.name,
    contact_channel: lead.contactChannel,
    location: lead.location,
    status: lead.status,
    date: lead.date,
    notes: lead.notes,
    whatsapp: lead.whatsapp,
  }),

  asset: (asset: any) => ({
    name: asset.name,
    category: asset.category,
    purchase_date: asset.purchaseDate,
    purchase_price: asset.purchasePrice,
    serial_number: asset.serialNumber,
    status: asset.status,
    notes: asset.notes,
  }),

  contract: (contract: any) => ({
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
  }),

  promoCode: (promoCode: any) => ({
    code: promoCode.code,
    discount_type: promoCode.discountType,
    discount_value: promoCode.discountValue,
    is_active: promoCode.isActive,
    usage_count: promoCode.usageCount,
    max_usage: promoCode.maxUsage,
    expiry_date: promoCode.expiryDate,
  }),

  sop: (sop: any) => ({
    title: sop.title,
    category: sop.category,
    content: sop.content,
    last_updated: sop.lastUpdated,
  }),

  clientFeedback: (feedback: any) => ({
    client_name: feedback.clientName,
    satisfaction: feedback.satisfaction,
    rating: feedback.rating,
    feedback: feedback.feedback,
    date: feedback.date,
  }),

  socialMediaPost: (post: any) => ({
    project_id: post.projectId,
    client_name: post.clientName,
    post_type: post.postType,
    platform: post.platform,
    scheduled_date: post.scheduledDate,
    caption: post.caption,
    media_url: post.mediaUrl,
    status: post.status,
    notes: post.notes,
  }),

  notification: (notification: any) => ({
    title: notification.title,
    message: notification.message,
    timestamp: notification.timestamp,
    is_read: notification.isRead,
    icon: notification.icon,
    link_view: notification.link?.view,
    link_action: notification.link?.action,
  }),

  teamProjectPayment: (payment: any) => ({
    project_id: payment.projectId,
    team_member_name: payment.teamMemberName,
    team_member_id: payment.teamMemberId,
    date: payment.date,
    status: payment.status,
    fee: payment.fee,
    reward: payment.reward,
  }),

  teamPaymentRecord: (record: any) => ({
    record_number: record.recordNumber,
    team_member_id: record.teamMemberId,
    date: record.date,
    project_payment_ids: record.projectPaymentIds,
    total_amount: record.totalAmount,
    vendor_signature: record.vendorSignature,
  }),

  rewardLedgerEntry: (entry: any) => ({
    team_member_id: entry.teamMemberId,
    date: entry.date,
    description: entry.description,
    amount: entry.amount,
    project_id: entry.projectId,
  }),

  user: (user: any) => ({
    email: user.email,
    password: user.password,
    full_name: user.fullName,
    company_name: user.companyName,
    role: user.role,
    permissions: user.permissions,
  }),
};

// CRUD Operations
export const crudOperations = {
  // Leads
  leads: {
    create: async (lead: any) => {
      const dbLead = await leadsAPI.create(transformToDB.lead(lead));
      return transformFromDB.lead(dbLead);
    },
    update: async (id: string, updates: any) => {
      const dbLead = await leadsAPI.update(id, transformToDB.lead(updates));
      return transformFromDB.lead(dbLead);
    },
    delete: async (id: string) => {
      await leadsAPI.delete(id);
    },
  },

  // Clients
  clients: {
    create: async (client: any) => {
      const dbClient = await clientsAPI.create(transformToDB.client(client));
      return transformFromDB.client(dbClient);
    },
    update: async (id: string, updates: any) => {
      const dbClient = await clientsAPI.update(id, transformToDB.client(updates));
      return transformFromDB.client(dbClient);
    },
    delete: async (id: string) => {
      await clientsAPI.delete(id);
    },
  },

  // Projects
  projects: {
    create: async (project: any) => {
      const dbProject = await projectsAPI.create(transformToDB.project(project));
      return transformFromDB.project(dbProject);
    },
    update: async (id: string, updates: any) => {
      const dbProject = await projectsAPI.update(id, transformToDB.project(updates));
      return transformFromDB.project(dbProject);
    },
    delete: async (id: string) => {
      await projectsAPI.delete(id);
    },
  },

  // Packages
  packages: {
    create: async (pkg: any) => {
      const dbPackage = await packagesAPI.create(transformToDB.package(pkg));
      return transformFromDB.package(dbPackage);
    },
    update: async (id: string, updates: any) => {
      const dbPackage = await packagesAPI.update(id, transformToDB.package(updates));
      return transformFromDB.package(dbPackage);
    },
    delete: async (id: string) => {
      await packagesAPI.delete(id);
    },
  },

  // Add-ons
  addOns: {
    create: async (addOn: any) => {
      const dbAddOn = await addOnsAPI.create(transformToDB.addOn(addOn));
      return transformFromDB.addOn(dbAddOn);
    },
    update: async (id: string, updates: any) => {
      const dbAddOn = await addOnsAPI.update(id, transformToDB.addOn(updates));
      return transformFromDB.addOn(dbAddOn);
    },
    delete: async (id: string) => {
      await addOnsAPI.delete(id);
    },
  },

  // Team Members
  teamMembers: {
    create: async (member: any) => {
      const dbMember = await teamMembersAPI.create(transformToDB.teamMember(member));
      return transformFromDB.teamMember(dbMember);
    },
    update: async (id: string, updates: any) => {
      const dbMember = await teamMembersAPI.update(id, transformToDB.teamMember(updates));
      return transformFromDB.teamMember(dbMember);
    },
    delete: async (id: string) => {
      await teamMembersAPI.delete(id);
    },
  },

  // Transactions
  transactions: {
    create: async (transaction: any) => {
      const dbTransaction = await transactionsAPI.create(transformToDB.transaction(transaction));
      return transformFromDB.transaction(dbTransaction);
    },
    update: async (id: string, updates: any) => {
      const dbTransaction = await transactionsAPI.update(id, transformToDB.transaction(updates));
      return transformFromDB.transaction(dbTransaction);
    },
    delete: async (id: string) => {
      await transactionsAPI.delete(id);
    },
  },

  // Cards
  cards: {
    create: async (card: any) => {
      const dbCard = await cardsAPI.create(transformToDB.card(card));
      return transformFromDB.card(dbCard);
    },
    update: async (id: string, updates: any) => {
      const dbCard = await cardsAPI.update(id, transformToDB.card(updates));
      return transformFromDB.card(dbCard);
    },
    delete: async (id: string) => {
      await cardsAPI.delete(id);
    },
  },

  // Pockets
  pockets: {
    create: async (pocket: any) => {
      const dbPocket = await pocketsAPI.create(transformToDB.pocket(pocket));
      return transformFromDB.pocket(dbPocket);
    },
    update: async (id: string, updates: any) => {
      const dbPocket = await pocketsAPI.update(id, transformToDB.pocket(updates));
      return transformFromDB.pocket(dbPocket);
    },
    delete: async (id: string) => {
      await pocketsAPI.delete(id);
    },
  },

  // Assets
  assets: {
    create: async (asset: any) => {
      const dbAsset = await assetsAPI.create(transformToDB.asset(asset));
      return transformFromDB.asset(dbAsset);
    },
    update: async (id: string, updates: any) => {
      const dbAsset = await assetsAPI.update(id, transformToDB.asset(updates));
      return transformFromDB.asset(dbAsset);
    },
    delete: async (id: string) => {
      await assetsAPI.delete(id);
    },
  },

  // Contracts
  contracts: {
    create: async (contract: any) => {
      const dbContract = await contractsAPI.create(transformToDB.contract(contract));
      return transformFromDB.contract(dbContract);
    },
    update: async (id: string, updates: any) => {
      const dbContract = await contractsAPI.update(id, transformToDB.contract(updates));
      return transformFromDB.contract(dbContract);
    },
    delete: async (id: string) => {
      await contractsAPI.delete(id);
    },
  },

  // Promo Codes
  promoCodes: {
    create: async (promoCode: any) => {
      const dbPromoCode = await promoCodesAPI.create(transformToDB.promoCode(promoCode));
      return transformFromDB.promoCode(dbPromoCode);
    },
    update: async (id: string, updates: any) => {
      const dbPromoCode = await promoCodesAPI.update(id, transformToDB.promoCode(updates));
      return transformFromDB.promoCode(dbPromoCode);
    },
    delete: async (id: string) => {
      await promoCodesAPI.delete(id);
    },
  },

  // SOPs
  sops: {
    create: async (sop: any) => {
      const dbSOP = await sopsAPI.create(transformToDB.sop(sop));
      return transformFromDB.sop(dbSOP);
    },
    update: async (id: string, updates: any) => {
      const dbSOP = await sopsAPI.update(id, transformToDB.sop(updates));
      return transformFromDB.sop(dbSOP);
    },
    delete: async (id: string) => {
      await sopsAPI.delete(id);
    },
  },

  // Client Feedback
  clientFeedback: {
    create: async (feedback: any) => {
      const dbFeedback = await clientFeedbackAPI.create(transformToDB.clientFeedback(feedback));
      return transformFromDB.clientFeedback(dbFeedback);
    },
    update: async (id: string, updates: any) => {
      const dbFeedback = await clientFeedbackAPI.update(id, transformToDB.clientFeedback(updates));
      return transformFromDB.clientFeedback(dbFeedback);
    },
    delete: async (id: string) => {
      await clientFeedbackAPI.delete(id);
    },
  },

  // Social Media Posts
  socialMediaPosts: {
    create: async (post: any) => {
      const dbPost = await socialMediaAPI.create(transformToDB.socialMediaPost(post));
      return transformFromDB.socialMediaPost(dbPost);
    },
    update: async (id: string, updates: any) => {
      const dbPost = await socialMediaAPI.update(id, transformToDB.socialMediaPost(updates));
      return transformFromDB.socialMediaPost(dbPost);
    },
    delete: async (id: string) => {
      await socialMediaAPI.delete(id);
    },
  },

  // Notifications
  notifications: {
    create: async (notification: any) => {
      const dbNotification = await notificationsAPI.create(transformToDB.notification(notification));
      return transformFromDB.notification(dbNotification);
    },
    update: async (id: string, updates: any) => {
      const dbNotification = await notificationsAPI.update(id, transformToDB.notification(updates));
      return transformFromDB.notification(dbNotification);
    },
    delete: async (id: string) => {
      await notificationsAPI.delete(id);
    },
  },

  // Users
  users: {
    create: async (user: any) => {
      const dbUser = await usersAPI.create(transformToDB.user(user));
      return transformFromDB.user(dbUser);
    },
    update: async (id: string, updates: any) => {
      const dbUser = await usersAPI.update(id, transformToDB.user(updates));
      return transformFromDB.user(dbUser);
    },
    delete: async (id: string) => {
      await usersAPI.delete(id);
    },
  },

  // Profile
  profile: {
    create: async (profile: any) => {
      const dbProfile = await profilesAPI.create(transformToDB.profile(profile));
      return transformFromDB.profile(dbProfile);
    },
    update: async (id: string, updates: any) => {
      const dbProfile = await profilesAPI.update(id, transformToDB.profile(updates));
      return transformFromDB.profile(dbProfile);
    },
    delete: async (id: string) => {
      await profilesAPI.delete(id);
    },
  },
};