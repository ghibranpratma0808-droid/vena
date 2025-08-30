import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { importMockData } from '../lib/data-import';

interface SupabaseContextType {
  // Data
  profile: any;
  users: any[];
  clients: any[];
  projects: any[];
  packages: any[];
  addOns: any[];
  teamMembers: any[];
  leads: any[];
  transactions: any[];
  cards: any[];
  pockets: any[];
  assets: any[];
  contracts: any[];
  promoCodes: any[];
  sops: any[];
  clientFeedback: any[];
  socialMediaPosts: any[];
  notifications: any[];
  teamProjectPayments: any[];
  teamPaymentRecords: any[];
  rewardLedgerEntries: any[];

  // Setters
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setClients: React.Dispatch<React.SetStateAction<any[]>>;
  setProjects: React.Dispatch<React.SetStateAction<any[]>>;
  setPackages: React.Dispatch<React.SetStateAction<any[]>>;
  setAddOns: React.Dispatch<React.SetStateAction<any[]>>;
  setTeamMembers: React.Dispatch<React.SetStateAction<any[]>>;
  setLeads: React.Dispatch<React.SetStateAction<any[]>>;
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
  setCards: React.Dispatch<React.SetStateAction<any[]>>;
  setPockets: React.Dispatch<React.SetStateAction<any[]>>;
  setAssets: React.Dispatch<React.SetStateAction<any[]>>;
  setContracts: React.Dispatch<React.SetStateAction<any[]>>;
  setPromoCodes: React.Dispatch<React.SetStateAction<any[]>>;
  setSops: React.Dispatch<React.SetStateAction<any[]>>;
  setClientFeedback: React.Dispatch<React.SetStateAction<any[]>>;
  setSocialMediaPosts: React.Dispatch<React.SetStateAction<any[]>>;
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
  setTeamProjectPayments: React.Dispatch<React.SetStateAction<any[]>>;
  setTeamPaymentRecords: React.Dispatch<React.SetStateAction<any[]>>;
  setRewardLedgerEntries: React.Dispatch<React.SetStateAction<any[]>>;

  // Utilities
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  importMockData: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

interface SupabaseProviderProps {
  children: React.ReactNode;
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const supabaseData = useSupabaseData();
  const [isImporting, setIsImporting] = useState(false);

  const handleImportMockData = async () => {
    try {
      setIsImporting(true);
      await importMockData();
      await supabaseData.refetch();
    } catch (error) {
      console.error('Error importing mock data:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const contextValue: SupabaseContextType = {
    ...supabaseData,
    isLoading: supabaseData.isLoading || isImporting,
    importMockData: handleImportMockData,
  };

  return (
    <SupabaseContext.Provider value={contextValue}>
      {children}
    </SupabaseContext.Provider>
  );
};