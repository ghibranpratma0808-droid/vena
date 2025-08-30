import React, { useState } from 'react';
import { useSupabase } from './SupabaseProvider';
import { DownloadIcon, UploadIcon } from '../constants';

const DataImportButton: React.FC = () => {
  const { importMockData, isLoading } = useSupabase();
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    if (window.confirm('Apakah Anda yakin ingin mengimpor data contoh? Ini akan menambahkan data ke database Supabase Anda.')) {
      try {
        setIsImporting(true);
        await importMockData();
        alert('Data contoh berhasil diimpor ke Supabase!');
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Gagal mengimpor data. Periksa console untuk detail error.');
      } finally {
        setIsImporting(false);
      }
    }
  };

  return (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-lg border border-brand-border">
      <h3 className="text-lg font-bold text-gradient mb-4">Import Data Contoh</h3>
      <p className="text-sm text-brand-text-secondary mb-4">
        Klik tombol di bawah untuk mengimpor data contoh ke database Supabase Anda. 
        Ini akan membantu Anda memulai dengan data yang sudah terstruktur.
      </p>
      <button
        onClick={handleImport}
        disabled={isLoading || isImporting}
        className="button-primary inline-flex items-center gap-2 w-full justify-center"
      >
        {isImporting ? (
          <>
            <UploadIcon className="w-5 h-5 animate-spin" />
            Mengimpor Data...
          </>
        ) : (
          <>
            <DownloadIcon className="w-5 h-5" />
            Import Data Contoh ke Supabase
          </>
        )}
      </button>
    </div>
  );
};

export default DataImportButton;