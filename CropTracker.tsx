'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

type Stage = 'Harvested' | 'In Transport' | 'In Warehouse' | 'At Market' | 'Delivered';

interface CropData {
  cropId: string;
  name: string;
  nameHi: string;
  variety: string;
  quantity: string;
  farmerName: string;
  harvestDate: string;
  currentStage: Stage;
  currentLocation: string;
  imageUrl: string | null;
  history: { stage: Stage; location: string; timestamp: string; note: string }[];
}

const stages: Stage[] = [
  'Harvested',
  'In Transport',
  'In Warehouse',
  'At Market',
  'Delivered',
];

const stageConfig: Record<
  Stage,
  { icon: string; color: string; bgColor: string; borderColor: string; labelHi: string }
> = {
  Harvested: {
    icon: '🌾',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    labelHi: 'कटाई हुई',
  },
  'In Transport': {
    icon: '🚚',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    labelHi: 'परिवहन में',
  },
  'In Warehouse': {
    icon: '🏭',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    labelHi: 'गोदाम में',
  },
  'At Market': {
    icon: '🏪',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    labelHi: 'बाजार में',
  },
  Delivered: {
    icon: '✅',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    labelHi: 'डिलीवर हो गया',
  },
};

const dealers = [
  {
    id: 'dealer-track-a',
    name: 'Dealer A',
    location: 'Azadpur Mandi, Delhi',
    price: 2150,
    best: true,
    rating: 4.2,
  },
  {
    id: 'dealer-track-b',
    name: 'Dealer B',
    location: 'Ghazipur Mandi, UP',
    price: 2000,
    best: false,
    rating: 3.8,
  },
  {
    id: 'dealer-track-c',
    name: 'Dealer C',
    location: 'Okhla Mandi, Delhi',
    price: 1980,
    best: false,
    rating: 3.5,
  },
];

// Mock database of crops
// TODO: Replace with Supabase query: supabase.from('crops').select('*').eq('crop_id', id)
const mockCrops: Record<string, CropData> = {
  'KT-2026-001': {
    cropId: 'KT-2026-001',
    name: 'Wheat',
    nameHi: 'गेहूं',
    variety: 'HD-2967',
    quantity: '25 quintal',
    farmerName: 'Ramesh Kumar',
    harvestDate: '08 Apr 2026',
    currentStage: 'In Transport',
    currentLocation: 'NH-44, Near Panipat, Haryana',
    imageUrl: null,
    history: [
      {
        stage: 'Harvested',
        location: 'Barabanki, UP',
        timestamp: '08 Apr 2026, 07:00 AM',
        note: 'Crop harvested successfully. Quality: Grade A',
      },
      {
        stage: 'In Transport',
        location: 'NH-44, Near Panipat, Haryana',
        timestamp: '09 Apr 2026, 10:30 AM',
        note: 'Loaded onto truck. Vehicle: UP-32-AB-1234',
      },
    ],
  },
  'KT-2026-002': {
    cropId: 'KT-2026-002',
    name: 'Rice',
    nameHi: 'चावल',
    variety: 'Basmati 1121',
    quantity: '40 quintal',
    farmerName: 'Ramesh Kumar',
    harvestDate: '07 Apr 2026',
    currentStage: 'In Warehouse',
    currentLocation: 'CWC Warehouse, Ghaziabad, UP',
    imageUrl: null,
    history: [
      {
        stage: 'Harvested',
        location: 'Muzaffarnagar, UP',
        timestamp: '07 Apr 2026, 08:00 AM',
        note: 'Harvested. Moisture content: 14%',
      },
      {
        stage: 'In Transport',
        location: 'NH-58, Meerut Bypass',
        timestamp: '07 Apr 2026, 03:00 PM',
        note: 'En route to warehouse',
      },
      {
        stage: 'In Warehouse',
        location: 'CWC Warehouse, Ghaziabad, UP',
        timestamp: '08 Apr 2026, 09:00 AM',
        note: 'Stored in cold storage. Bag count: 80',
      },
    ],
  },
  'KT-2026-003': {
    cropId: 'KT-2026-003',
    name: 'Maize',
    nameHi: 'मक्का',
    variety: 'HQPM-1',
    quantity: '18 quintal',
    farmerName: 'Ramesh Kumar',
    harvestDate: '05 Apr 2026',
    currentStage: 'Delivered',
    currentLocation: 'Okhla Mandi, Delhi',
    imageUrl: null,
    history: [
      {
        stage: 'Harvested',
        location: 'Faridabad, Haryana',
        timestamp: '05 Apr 2026, 07:30 AM',
        note: 'Harvested. Yield: 18 quintal',
      },
      {
        stage: 'In Transport',
        location: 'Faridabad – Delhi Highway',
        timestamp: '05 Apr 2026, 02:00 PM',
        note: 'Dispatched to Delhi',
      },
      {
        stage: 'In Warehouse',
        location: 'Okhla Cold Storage, Delhi',
        timestamp: '05 Apr 2026, 06:00 PM',
        note: 'Temporary storage before market',
      },
      {
        stage: 'At Market',
        location: 'Okhla Mandi, Delhi',
        timestamp: '06 Apr 2026, 08:00 AM',
        note: 'Displayed at Okhla Mandi. Bid opened',
      },
      {
        stage: 'Delivered',
        location: 'Okhla Mandi, Delhi',
        timestamp: '06 Apr 2026, 04:00 PM',
        note: 'Sold to Dealer C at ₹1980/quintal. Payment received.',
      },
    ],
  },
};

export default function CropTracker() {
  const [searchId, setSearchId] = useState('');
  const [cropData, setCropData] = useState<CropData | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<string | null>(null);

  // Auto-load from URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setSearchId(id);
      handleSearch(id);
    }
  }, []);

  const handleSearch = (id?: string) => {
    const query = (id ?? searchId).trim().toUpperCase();
    if (!query) {
      toast.error('Please enter a Crop ID');
      return;
    }
    setLoading(true);
    setNotFound(false);
    setCropData(null);

    // TODO: Replace with Supabase: supabase.from('crops').select('*').eq('crop_id', query)
    setTimeout(() => {
      const found = mockCrops[query];
      if (found) {
        setCropData(found);
      } else {
        setNotFound(true);
        toast.error('Crop ID not found. Please check and try again.');
      }
      setLoading(false);
    }, 800);
  };

  const handleStageUpdate = (newStage: Stage) => {
    if (!cropData) return;
    const stageIndex = stages.indexOf(newStage);
    const currentIndex = stages.indexOf(cropData.currentStage);
    if (stageIndex <= currentIndex) {
      toast.error('Cannot go back to a previous stage.');
      return;
    }

    const locations: Record<Stage, string> = {
      Harvested: cropData.currentLocation,
      'In Transport': 'In Transit — Vehicle dispatched',
      'In Warehouse': 'CWC Warehouse, Ghaziabad, UP',
      'At Market': 'Azadpur Mandi, Delhi',
      Delivered: 'Azadpur Mandi, Delhi — Sold',
    };

    const now = new Date();
    const timestamp = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ', ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    // TODO: Replace with Supabase: supabase.from('crops').update({stage, location}).eq('crop_id', cropData.cropId)
    setCropData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        currentStage: newStage,
        currentLocation: locations[newStage],
        history: [
          ...prev.history,
          {
            stage: newStage,
            location: locations[newStage],
            timestamp,
            note: `Stage updated to "${newStage}" manually.`,
          },
        ],
      };
    });
    setShowUpdateModal(false);
    toast.success(`✅ Stage updated to "${newStage}"`, { duration: 4000 });
  };

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-700 text-gray-800 mb-1">Enter Crop ID</h3>
        <p className="text-xs text-gray-400 mb-4">
          फसल ID दर्ज करें — e.g., KT-2026-001, KT-2026-002, KT-2026-003
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="KT-2026-XXX"
            className="input-field flex-1 text-base font-600 tracking-widest uppercase"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-700 px-5 py-3 rounded-xl transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            {loading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <>
                <span>🔍</span>
                <span className="hidden sm:inline">Track</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Access Chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs text-gray-400 self-center">Try:</span>
          {['KT-2026-001', 'KT-2026-002', 'KT-2026-003'].map((id) => (
            <button
              key={`chip-${id}`}
              onClick={() => {
                setSearchId(id);
                handleSearch(id);
              }}
              className="text-xs font-600 text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full border border-green-200 transition-colors"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="card p-6 space-y-4 animate-pulse">
          <div className="h-6 bg-gray-100 rounded-lg w-1/3" />
          <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
          <div className="flex gap-2 mt-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={`skel-stage-${i}`} className="flex-1 h-20 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      )}

      {/* Not Found */}
      {notFound && !loading && (
        <div className="card p-8 text-center">
          <span className="text-5xl block mb-3">🔍</span>
          <h3 className="font-700 text-gray-700 text-lg">Crop ID Not Found</h3>
          <p className="text-sm text-gray-400 mt-2">
            No crop found with ID <strong>{searchId}</strong>. Please check the ID and try again.
          </p>
          <p className="text-xs text-gray-400 mt-1">यह ID हमारे रिकॉर्ड में नहीं है।</p>
          <a
            href="/crop-registration"
            className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white font-600 px-5 py-3 rounded-xl hover:bg-green-700 transition-colors text-sm"
          >
            🌾 Register a New Crop
          </a>
        </div>
      )}

      {/* Crop Found */}
      {cropData && !loading && (
        <>
          {/* Crop Header Card */}
          <div className="card p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                  stageConfig[cropData.currentStage].bgColor
                }`}
              >
                {stageConfig[cropData.currentStage].icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl font-800 text-gray-800">
                    {cropData.name}{' '}
                    <span className="text-gray-400 font-500">({cropData.nameHi})</span>
                  </h3>
                  <span
                    className={`stage-badge ${stageConfig[cropData.currentStage].bgColor} ${stageConfig[cropData.currentStage].color} border ${stageConfig[cropData.currentStage].borderColor}`}
                  >
                    {stageConfig[cropData.currentStage].icon} {cropData.currentStage}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {cropData.variety} · {cropData.quantity} · Harvested: {cropData.harvestDate}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  👨‍🌾 {cropData.farmerName} · 📍 {cropData.currentLocation}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs font-700 text-green-700 bg-green-50 px-3 py-2 rounded-xl border border-green-100">
                  {cropData.cropId}
                </span>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-700 text-gray-800">Crop Journey 🗺️</h3>
                <p className="text-xs text-gray-400">फसल की यात्रा</p>
              </div>
              <button
                onClick={() => setShowUpdateModal(true)}
                disabled={cropData.currentStage === 'Delivered'}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-600 text-sm px-4 py-2 rounded-xl transition-all duration-150 active:scale-95"
              >
                ✏️ Update Stage
              </button>
            </div>

            {/* Timeline Steps — Horizontal on Desktop */}
            <div className="hidden sm:flex items-start gap-0 mb-6">
              {stages.map((stage, idx) => {
                const cfg = stageConfig[stage];
                const currentIdx = stages.indexOf(cropData.currentStage);
                const isDone = idx < currentIdx;
                const isCurrent = idx === currentIdx;
                const isPending = idx > currentIdx;
                const isLast = idx === stages.length - 1;

                return (
                  <div key={`timeline-h-${stage}`} className="flex items-center flex-1 min-w-0">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-300 ${
                          isCurrent
                            ? `${cfg.bgColor} ${cfg.borderColor} ring-4 ring-offset-2 ${cfg.borderColor.replace('border-', 'ring-')}`
                            : isDone
                            ? 'bg-green-100 border-green-400' :'bg-gray-100 border-gray-200'
                        }`}
                      >
                        {isDone ? '✅' : cfg.icon}
                      </div>
                      <p
                        className={`text-xs font-700 mt-2 text-center leading-tight ${
                          isCurrent ? cfg.color : isDone ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {stage}
                      </p>
                      <p className="text-xs text-gray-400 text-center">{cfg.labelHi}</p>
                    </div>
                    {!isLast && (
                      <div
                        className={`h-0.5 flex-1 mx-1 mt-[-28px] transition-all duration-300 ${
                          isDone || isCurrent ? 'bg-green-400' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Timeline Steps — Vertical on Mobile */}
            <div className="sm:hidden space-y-0 mb-4">
              {stages.map((stage, idx) => {
                const cfg = stageConfig[stage];
                const currentIdx = stages.indexOf(cropData.currentStage);
                const isDone = idx < currentIdx;
                const isCurrent = idx === currentIdx;
                const isLast = idx === stages.length - 1;

                return (
                  <div key={`timeline-v-${stage}`} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 flex-shrink-0 ${
                          isCurrent
                            ? `${cfg.bgColor} ${cfg.borderColor}`
                            : isDone
                            ? 'bg-green-100 border-green-400' :'bg-gray-100 border-gray-200'
                        }`}
                      >
                        {isDone ? '✅' : cfg.icon}
                      </div>
                      {!isLast && (
                        <div
                          className={`w-0.5 h-8 mt-1 ${
                            isDone || isCurrent ? 'bg-green-400' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-4 flex-1 min-w-0">
                      <p
                        className={`text-sm font-700 ${
                          isCurrent ? cfg.color : isDone ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {stage}
                        {isCurrent && (
                          <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400">{cfg.labelHi}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current Location Banner */}
            <div
              className={`rounded-xl p-4 border ${stageConfig[cropData.currentStage].bgColor} ${stageConfig[cropData.currentStage].borderColor}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">📍</span>
                <div>
                  <p className={`text-sm font-700 ${stageConfig[cropData.currentStage].color}`}>
                    Current Location
                  </p>
                  <p className="text-sm text-gray-700 font-600">{cropData.currentLocation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity History */}
          <div className="card p-5 sm:p-6">
            <h3 className="font-700 text-gray-800 mb-1">Activity Log</h3>
            <p className="text-xs text-gray-400 mb-4">गतिविधि इतिहास</p>
            <div className="space-y-3">
              {[...cropData.history].reverse().map((h, i) => {
                const cfg = stageConfig[h.stage];
                return (
                  <div
                    key={`history-${cropData.cropId}-${i}`}
                    className="flex gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{cfg.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-sm font-700 ${cfg.color}`}>{h.stage}</span>
                        <span className="text-xs text-gray-400">{h.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{h.note}</p>
                      <p className="text-xs text-gray-400 mt-0.5">📍 {h.location}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Market Price Comparison */}
          <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-700 text-gray-800">Market Price Comparison 💰</h3>
                <p className="text-xs text-gray-400">बाजार भाव तुलना — {cropData.name} (₹/quintal)</p>
              </div>
              <span className="text-xs font-600 bg-green-50 text-green-700 px-2 py-1 rounded-lg border border-green-100">
                Today's Rates
              </span>
            </div>

            <div className="space-y-3">
              {dealers.map((d) => {
                const isSelected = selectedDealer === d.id;
                return (
                  <div
                    key={d.id}
                    className={`rounded-xl border p-4 transition-all duration-200 ${
                      d.best
                        ? 'bg-green-50 border-green-300'
                        : isSelected
                        ? 'bg-blue-50 border-blue-300' :'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-700 text-gray-800">{d.name}</span>
                          {d.best && (
                            <span className="text-xs font-700 bg-green-600 text-white px-2 py-0.5 rounded-full">
                              🏆 Best Price
                            </span>
                          )}
                          {isSelected && !d.best && (
                            <span className="text-xs font-700 bg-blue-600 text-white px-2 py-0.5 rounded-full">
                              ✓ Selected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">📍 {d.location}</p>
                        <p className="text-xs text-gray-400">
                          {'⭐'.repeat(Math.floor(d.rating))} {d.rating}/5
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p
                          className={`text-2xl font-800 tabular-nums ${
                            d.best ? 'text-green-700' : 'text-gray-700'
                          }`}
                        >
                          ₹{d.price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-gray-400">per quintal</p>
                        {cropData.quantity && (
                          <p className="text-xs font-600 text-gray-600 mt-0.5">
                            ≈ ₹
                            {(
                              d.price *
                              parseFloat(cropData.quantity.split(' ')[0])
                            ).toLocaleString('en-IN')}{' '}
                            total
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedDealer(d.id);
                        toast.success(
                          `${d.name} selected! Contact: ${d.location}`,
                          { duration: 4000 }
                        );
                      }}
                      className={`mt-3 w-full py-2.5 rounded-xl text-sm font-700 transition-all duration-150 active:scale-95 ${
                        d.best
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : isSelected
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' :'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {isSelected ? '✓ Dealer Selected' : d.best ? '🤝 Sell at Best Price' : 'Select This Dealer'}
                    </button>
                  </div>
                );
              })}
            </div>

            {selectedDealer && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-sm font-700 text-green-700">
                  ✅ Dealer confirmed! They will contact you within 24 hours.
                </p>
                <p className="text-xs text-green-600 mt-0.5">
                  व्यापारी 24 घंटे में संपर्क करेगा।
                </p>
              </div>
            )}
          </div>

          {/* QR Code for this crop */}
          <div className="card p-5 sm:p-6 text-center">
            <h3 className="font-700 text-gray-800 mb-1">Share Tracking QR</h3>
            <p className="text-xs text-gray-400 mb-4">
              Anyone can scan this to track your crop
            </p>
            <div className="flex justify-center">
              <div className="p-4 bg-white border-2 border-green-100 rounded-2xl inline-block">
                <QRCodeSVG
                  value={`${typeof window !== 'undefined' ? window.location.origin : 'https://krishitrack.in'}/crop-tracking?id=${cropData.cropId}`}
                  size={140}
                  bgColor="#ffffff"
                  fgColor="#15803d"
                  level="H"
                />
              </div>
            </div>
            <p className="text-sm font-700 text-green-700 mt-3">{cropData.cropId}</p>
            <button
              onClick={() => window.print()}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-600 text-sm rounded-xl border border-green-200 transition-colors"
            >
              🖨️ Print QR
            </button>
          </div>
        </>
      )}

      {/* Update Stage Modal */}
      {showUpdateModal && cropData && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowUpdateModal(false);
          }}
        >
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-700 text-gray-800 text-lg">Update Stage ✏️</h3>
                <p className="text-xs text-gray-400">चरण अपडेट करें</p>
              </div>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Current:{' '}
              <span className={`font-700 ${stageConfig[cropData.currentStage].color}`}>
                {stageConfig[cropData.currentStage].icon} {cropData.currentStage}
              </span>
            </p>

            <div className="space-y-2">
              {stages.map((stage, idx) => {
                const currentIdx = stages.indexOf(cropData.currentStage);
                const isDisabled = idx <= currentIdx;
                const cfg = stageConfig[stage];

                return (
                  <button
                    key={`modal-stage-${stage}`}
                    disabled={isDisabled}
                    onClick={() => handleStageUpdate(stage)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 ${
                      isDisabled
                        ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-100'
                        : `${cfg.bgColor} ${cfg.borderColor} hover:shadow-sm active:scale-95 cursor-pointer`
                    }`}
                  >
                    <span className="text-2xl">{cfg.icon}</span>
                    <div>
                      <p className={`font-700 text-sm ${isDisabled ? 'text-gray-400' : cfg.color}`}>
                        {stage}
                      </p>
                      <p className="text-xs text-gray-400">{cfg.labelHi}</p>
                    </div>
                    {isDisabled && idx === currentIdx && (
                      <span className="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowUpdateModal(false)}
              className="mt-4 w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sonner Toast Provider */}
      <ToastWrapper />
    </div>
  );
}

function ToastWrapper() {
  const { Toaster } = require('sonner');
  return <Toaster position="bottom-center" richColors />;
}
