import React from 'react';

type Stage = 'Harvested' | 'In Transport' | 'In Warehouse' | 'At Market' | 'Delivered';

const stageConfig: Record<Stage, { color: string; icon: string }> = {
  Harvested: { color: 'bg-green-100 text-green-700', icon: '🌾' },
  'In Transport': { color: 'bg-amber-100 text-amber-700', icon: '🚚' },
  'In Warehouse': { color: 'bg-blue-100 text-blue-700', icon: '🏭' },
  'At Market': { color: 'bg-purple-100 text-purple-700', icon: '🏪' },
  Delivered: { color: 'bg-emerald-100 text-emerald-700', icon: '✅' },
};

const crops = [
  {
    id: 'crop-001',
    cropId: 'KT-2026-001',
    name: 'Wheat',
    nameHi: 'गेहूं',
    qty: '25 quintal',
    location: 'Azadpur Mandi, Delhi',
    stage: 'In Transport' as Stage,
    date: '08 Apr 2026',
    farmer: 'Ramesh Kumar',
  },
  {
    id: 'crop-002',
    cropId: 'KT-2026-002',
    name: 'Rice',
    nameHi: 'चावल',
    qty: '40 quintal',
    location: 'Ghazipur Mandi, UP',
    stage: 'In Warehouse' as Stage,
    date: '07 Apr 2026',
    farmer: 'Ramesh Kumar',
  },
  {
    id: 'crop-003',
    cropId: 'KT-2026-003',
    name: 'Maize',
    nameHi: 'मक्का',
    qty: '18 quintal',
    location: 'Okhla Mandi, Delhi',
    stage: 'Delivered' as Stage,
    date: '05 Apr 2026',
    farmer: 'Ramesh Kumar',
  },
  {
    id: 'crop-004',
    cropId: 'KT-2026-004',
    name: 'Sugarcane',
    nameHi: 'गन्ना',
    qty: '60 quintal',
    location: 'Meerut, UP',
    stage: 'Harvested' as Stage,
    date: '09 Apr 2026',
    farmer: 'Ramesh Kumar',
  },
  {
    id: 'crop-005',
    cropId: 'KT-2026-005',
    name: 'Mustard',
    nameHi: 'सरसों',
    qty: '12 quintal',
    location: 'Faridabad, Haryana',
    stage: 'At Market' as Stage,
    date: '06 Apr 2026',
    farmer: 'Ramesh Kumar',
  },
  {
    id: 'crop-006',
    cropId: 'KT-2026-006',
    name: 'Soybean',
    nameHi: 'सोयाबीन',
    qty: '30 quintal',
    location: 'Nagpur, Maharashtra',
    stage: 'In Transport' as Stage,
    date: '10 Apr 2026',
    farmer: 'Ramesh Kumar',
  },
];

export default function RecentCropsTable() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-700 text-gray-800">Recent Crops</h3>
          <p className="text-xs text-gray-400">हालिया फसलें</p>
        </div>
        <a
          href="/crop-registration"
          className="text-xs font-600 text-green-600 hover:text-green-700 flex items-center gap-1"
        >
          + Add New
        </a>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-600 text-gray-500 tracking-wide">
                Crop ID
              </th>
              <th className="text-left px-4 py-3 text-xs font-600 text-gray-500 tracking-wide">
                Crop Name
              </th>
              <th className="text-left px-4 py-3 text-xs font-600 text-gray-500 tracking-wide">
                Quantity
              </th>
              <th className="text-left px-4 py-3 text-xs font-600 text-gray-500 tracking-wide">
                Location
              </th>
              <th className="text-left px-4 py-3 text-xs font-600 text-gray-500 tracking-wide">
                Stage
              </th>
              <th className="text-left px-4 py-3 text-xs font-600 text-gray-500 tracking-wide">
                Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-600 text-gray-500 tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop, i) => {
              const cfg = stageConfig[crop.stage];
              return (
                <tr
                  key={crop.id}
                  className={`border-b border-gray-50 hover:bg-green-50/40 transition-colors duration-100 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <span className="font-700 text-green-700 text-xs bg-green-50 px-2 py-1 rounded-lg">
                      {crop.cropId}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-600 text-gray-800">{crop.name}</p>
                    <p className="text-xs text-gray-400">{crop.nameHi}</p>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 tabular-nums">{crop.qty}</td>
                  <td className="px-4 py-3.5 text-gray-600 text-xs max-w-[160px] truncate">
                    📍 {crop.location}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`stage-badge ${cfg.color}`}>
                      {cfg.icon} {crop.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{crop.date}</td>
                  <td className="px-4 py-3.5">
                    <a
                      href={`/crop-tracking?id=${crop.cropId}`}
                      className="text-xs font-600 text-green-600 hover:text-green-700 hover:underline"
                    >
                      Track →
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="sm:hidden divide-y divide-gray-50">
        {crops.map((crop) => {
          const cfg = stageConfig[crop.stage];
          return (
            <div key={crop.id} className="p-4 hover:bg-green-50/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs font-700 text-green-700 bg-green-50 px-2 py-0.5 rounded-lg">
                    {crop.cropId}
                  </span>
                  <p className="font-700 text-gray-800 mt-1">{crop.name}</p>
                  <p className="text-xs text-gray-400">{crop.qty} · {crop.date}</p>
                </div>
                <span className={`stage-badge ${cfg.color}`}>
                  {cfg.icon} {crop.stage}
                </span>
              </div>
              <p className="text-xs text-gray-500">📍 {crop.location}</p>
              <a
                href={`/crop-tracking?id=${crop.cropId}`}
                className="mt-2 inline-flex items-center gap-1 text-xs font-600 text-green-600"
              >
                Track this crop →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
