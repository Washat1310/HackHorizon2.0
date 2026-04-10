import React from 'react';

const actions = [
  {
    id: 'qa-register',
    href: '/crop-registration',
    icon: '🌾',
    label: 'Register New Crop',
    labelHi: 'नई फसल दर्ज करें',
    color: 'bg-green-600 hover:bg-green-700 text-white',
  },
  {
    id: 'qa-track',
    href: '/crop-tracking',
    icon: '📍',
    label: 'Track My Crop',
    labelHi: 'मेरी फसल ट्रैक करें',
    color: 'bg-white hover:bg-gray-50 text-green-700 border border-green-200',
  },
];

export default function QuickActions() {
  return (
    <div className="card p-5">
      <h3 className="text-base font-700 text-gray-800 mb-1">Quick Actions</h3>
      <p className="text-xs text-gray-400 mb-4">त्वरित कार्य</p>
      <div className="flex flex-col sm:flex-row gap-3">
        {actions?.map((a) => (
          <a
            key={a?.id}
            href={a?.href}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl font-600 text-sm transition-all duration-150 active:scale-95 ${a?.color}`}
          >
            <span className="text-2xl">{a?.icon}</span>
            <div>
              <p className="font-700">{a?.label}</p>
              <p className="text-xs opacity-70">{a?.labelHi}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
