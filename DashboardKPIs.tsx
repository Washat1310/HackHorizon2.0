import React from 'react';

const kpis = [
  {
    id: 'kpi-total',
    icon: '🌾',
    label: 'Total Crops',
    labelHi: 'कुल फसलें',
    value: '24',
    sub: '+3 this week',
    color: 'bg-green-50 border-green-100',
    valueColor: 'text-green-700',
    trend: 'up',
  },
  {
    id: 'kpi-transit',
    icon: '🚚',
    label: 'In Transit',
    labelHi: 'परिवहन में',
    value: '7',
    sub: '3 delayed',
    color: 'bg-amber-50 border-amber-100',
    valueColor: 'text-amber-700',
    trend: 'warn',
  },
  {
    id: 'kpi-warehouse',
    icon: '🏭',
    label: 'In Warehouse',
    labelHi: 'गोदाम में',
    value: '5',
    sub: 'Awaiting pickup',
    color: 'bg-blue-50 border-blue-100',
    valueColor: 'text-blue-700',
    trend: 'neutral',
  },
  {
    id: 'kpi-delivered',
    icon: '✅',
    label: 'Delivered',
    labelHi: 'डिलीवर हो गया',
    value: '12',
    sub: 'This season',
    color: 'bg-emerald-50 border-emerald-100',
    valueColor: 'text-emerald-700',
    trend: 'up',
  },
];

export default function DashboardKPIs() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis?.map((kpi) => (
        <div
          key={kpi?.id}
          className={`card border ${kpi?.color} p-4 sm:p-5 hover:shadow-card-hover transition-shadow duration-200`}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl sm:text-3xl">{kpi?.icon}</span>
            <span
              className={`text-xs font-600 px-2 py-0.5 rounded-full ${
                kpi?.trend === 'up' ?'bg-green-100 text-green-700'
                  : kpi?.trend === 'warn' ?'bg-amber-100 text-amber-700' :'bg-blue-100 text-blue-700'
              }`}
            >
              {kpi?.trend === 'up' ? '↑' : kpi?.trend === 'warn' ? '⚠' : '→'}
            </span>
          </div>
          <p
            className={`text-3xl sm:text-4xl font-800 tabular-nums leading-none ${kpi?.valueColor}`}
          >
            {kpi?.value}
          </p>
          <p className="text-sm font-600 text-gray-700 mt-1">{kpi?.label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{kpi?.labelHi}</p>
          <p className="text-xs text-gray-500 mt-2 border-t border-gray-100 pt-2">
            {kpi?.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
