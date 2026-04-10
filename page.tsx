import React from 'react';
import AppLayout from '@/components/AppLayout';
import CropRegistrationForm from './components/CropRegistrationForm';

export default function CropRegistrationPage() {
  return (
    <AppLayout currentPath="/crop-registration">
      <div className="pb-20 lg:pb-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-700 text-gray-800">Register New Crop 🌾</h2>
          <p className="text-sm text-gray-500 mt-1">
            नई फसल दर्ज करें — Fill in the details below to generate your Crop ID and QR code.
          </p>
        </div>

        <CropRegistrationForm />
      </div>
    </AppLayout>
  );
}
