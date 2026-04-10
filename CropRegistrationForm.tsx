'use client';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';

type FormData = {
  cropName: string;
  variety: string;
  quantity: string;
  unit: string;
  location: string;
  district: string;
  state: string;
  harvestDate: string;
  farmerName: string;
  phone: string;
  notes: string;
};

const cropOptions = [
  'Wheat (गेहूं)',
  'Rice (चावल)',
  'Maize (मक्का)',
  'Sugarcane (गन्ना)',
  'Mustard (सरसों)',
  'Soybean (सोयाबीन)',
  'Cotton (कपास)',
  'Potato (आलू)',
  'Onion (प्याज)',
  'Tomato (टमाटर)',
];

const stateOptions = [
  'Uttar Pradesh',
  'Punjab',
  'Haryana',
  'Madhya Pradesh',
  'Rajasthan',
  'Maharashtra',
  'Bihar',
  'Gujarat',
  'Andhra Pradesh',
  'Karnataka',
];

function generateCropId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(100 + Math.random() * 900);
  const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `KT-${year}-${num}${suffix}`;
}

export default function CropRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const [cropId, setCropId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image too large. Please upload under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormData) => {
    // TODO: Backend integration — POST /api/crops with form data + image
    await new Promise((r) => setTimeout(r, 1200));
    const id = generateCropId();
    setCropId(id);
    setSubmitted(true);
    toast.success(`Crop registered! ID: ${id}`, { duration: 5000 });
  };

  const handleReset = () => {
    reset();
    setCropId(null);
    setImagePreview(null);
    setSubmitted(false);
  };

  if (submitted && cropId) {
    return <SuccessCard cropId={cropId} imagePreview={imagePreview} onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Section 1: Crop Details */}
      <div className="card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <span className="text-xl">🌾</span>
          <div>
            <h3 className="font-700 text-gray-800">Crop Details</h3>
            <p className="text-xs text-gray-400">फसल की जानकारी</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Crop Name */}
          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1">
              Crop Name <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">फसल का नाम चुनें</p>
            <select
              {...register('cropName', { required: 'Please select a crop' })}
              className="input-field"
            >
              <option value="">Select crop / फसल चुनें</option>
              {cropOptions.map((c) => (
                <option key={`crop-opt-${c}`} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.cropName && (
              <p className="text-xs text-red-500 mt-1">{errors.cropName.message}</p>
            )}
          </div>

          {/* Variety */}
          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1">
              Variety / किस्म
            </label>
            <p className="text-xs text-gray-400 mb-2">e.g., HD-2967, Basmati 1121</p>
            <input
              type="text"
              placeholder="Enter variety name"
              {...register('variety')}
              className="input-field"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1">
              Quantity <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">मात्रा दर्ज करें</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="e.g., 25"
                {...register('quantity', {
                  required: 'Quantity is required',
                  min: { value: 1, message: 'Must be at least 1' },
                })}
                className="input-field flex-1"
              />
              <select {...register('unit')} className="input-field w-28">
                <option value="quintal">Quintal</option>
                <option value="kg">Kg</option>
                <option value="ton">Ton</option>
              </select>
            </div>
            {errors.quantity && (
              <p className="text-xs text-red-500 mt-1">{errors.quantity.message}</p>
            )}
          </div>

          {/* Harvest Date */}
          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1">
              Harvest Date <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">कटाई की तारीख</p>
            <input
              type="date"
              {...register('harvestDate', { required: 'Harvest date is required' })}
              className="input-field"
            />
            {errors.harvestDate && (
              <p className="text-xs text-red-500 mt-1">{errors.harvestDate.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Location */}
      <div className="card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <span className="text-xl">📍</span>
          <div>
            <h3 className="font-700 text-gray-800">Farm Location</h3>
            <p className="text-xs text-gray-400">खेत का पता</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="sm:col-span-3">
            <label className="block text-sm font-600 text-gray-700 mb-1">
              Village / Town <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">गाँव / शहर का नाम</p>
            <input
              type="text"
              placeholder="e.g., Barabanki"
              {...register('location', { required: 'Location is required' })}
              className="input-field"
            />
            {errors.location && (
              <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1">
              District <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">जिला</p>
            <input
              type="text"
              placeholder="District name"
              {...register('district', { required: 'District is required' })}
              className="input-field"
            />
            {errors.district && (
              <p className="text-xs text-red-500 mt-1">{errors.district.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-600 text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">राज्य</p>
            <select
              {...register('state', { required: 'State is required' })}
              className="input-field"
            >
              <option value="">Select state / राज्य चुनें</option>
              {stateOptions.map((s) => (
                <option key={`state-opt-${s}`} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Farmer Info */}
      <div className="card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <span className="text-xl">👨‍🌾</span>
          <div>
            <h3 className="font-700 text-gray-800">Farmer Details</h3>
            <p className="text-xs text-gray-400">किसान की जानकारी</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1">
              Farmer Name <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">किसान का नाम</p>
            <input
              type="text"
              placeholder="Full name"
              defaultValue="Ramesh Kumar"
              {...register('farmerName', { required: 'Farmer name is required' })}
              className="input-field"
            />
            {errors.farmerName && (
              <p className="text-xs text-red-500 mt-1">{errors.farmerName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">मोबाइल नंबर</p>
            <input
              type="tel"
              placeholder="10-digit number"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Enter a valid 10-digit mobile number',
                },
              })}
              className="input-field"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-600 text-gray-700 mb-1">
              Additional Notes
            </label>
            <p className="text-xs text-gray-400 mb-2">अतिरिक्त जानकारी (optional)</p>
            <textarea
              rows={3}
              placeholder="Any special notes about the crop quality, storage conditions, etc."
              {...register('notes')}
              className="input-field resize-none"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Image Upload */}
      <div className="card p-5 sm:p-6">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-5">
          <span className="text-xl">📸</span>
          <div>
            <h3 className="font-700 text-gray-800">Crop Photo (Optional)</h3>
            <p className="text-xs text-gray-400">फसल की फोटो — Quality proof for buyers</p>
          </div>
        </div>

        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Uploaded crop preview"
              className="w-full max-h-48 object-cover rounded-xl border border-gray-100"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-green-200 rounded-xl p-8 text-center cursor-pointer hover:bg-green-50 hover:border-green-400 transition-all duration-150"
          >
            <span className="text-4xl block mb-2">📷</span>
            <p className="text-sm font-600 text-gray-600">Click to upload crop photo</p>
            <p className="text-xs text-gray-400 mt-1">फोटो अपलोड करें · Max 5MB · JPG/PNG</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-700 py-4 rounded-xl text-base transition-all duration-150 active:scale-95"
          style={{ minWidth: 0 }}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin text-lg">⏳</span>
              Registering Crop...
            </>
          ) : (
            <>
              <span className="text-lg">🌾</span>
              Register Crop & Get ID
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-4 rounded-xl border border-gray-200 text-gray-600 font-600 hover:bg-gray-50 transition-all duration-150"
        >
          Clear Form
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        <span className="text-red-500">*</span> Required fields | अनिवार्य फ़ील्ड
      </p>
    </form>
  );
}

function SuccessCard({
  cropId,
  imagePreview,
  onReset,
}: {
  cropId: string;
  imagePreview: string | null;
  onReset: () => void;
}) {
  const trackingUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/crop-tracking?id=${cropId}`
      : `https://krishitrack.in/crop-tracking?id=${cropId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cropId);
    toast.success('Crop ID copied!');
  };

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
        <span className="text-5xl block mb-3">🎉</span>
        <h3 className="text-2xl font-800">Crop Registered!</h3>
        <p className="text-green-100 mt-1">फसल सफलतापूर्वक दर्ज हो गई</p>
      </div>

      {/* Crop ID Card */}
      <div className="card p-6 text-center">
        <p className="text-sm font-600 text-gray-500 mb-2">Your Unique Crop ID / आपकी फसल ID</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl font-800 text-green-700 tracking-widest">{cropId}</span>
          <button
            onClick={handleCopy}
            className="p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-green-600"
            title="Copy Crop ID"
          >
            📋
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Save this ID to track your crop anytime · इस ID को संभाल कर रखें
        </p>
      </div>

      {/* QR Code */}
      <div className="card p-6 text-center">
        <h4 className="font-700 text-gray-800 mb-1">QR Code</h4>
        <p className="text-xs text-gray-400 mb-4">
          Scan to track this crop instantly · स्कैन करके ट्रैक करें
        </p>
        <div className="flex justify-center">
          <div className="p-4 bg-white border-2 border-green-100 rounded-2xl inline-block">
            <QRCodeSVG
              value={trackingUrl}
              size={180}
              bgColor="#ffffff"
              fgColor="#15803d"
              level="H"
              includeMargin={false}
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 font-600">{cropId}</p>
        <button
          onClick={() => window.print()}
          className="mt-4 flex items-center gap-2 mx-auto px-5 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 font-600 text-sm rounded-xl border border-green-200 transition-colors"
        >
          🖨️ Print QR Code
        </button>
      </div>

      {/* Crop Image */}
      {imagePreview && (
        <div className="card p-5">
          <h4 className="font-700 text-gray-800 mb-3">Crop Photo Uploaded ✅</h4>
          <img
            src={imagePreview}
            alt="Registered crop photo"
            className="w-full max-h-48 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`/crop-tracking?id=${cropId}`}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-700 py-4 rounded-xl text-base transition-all duration-150 active:scale-95"
        >
          📍 Track This Crop
        </a>
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-green-700 font-700 py-4 rounded-xl text-base border border-green-200 transition-all duration-150 active:scale-95"
        >
          🌾 Register Another Crop
        </button>
      </div>
    </div>
  );
}
