'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { stage: 'Harvested', stageHi: 'कटाई', count: 8, color: '#86efac' },
  { stage: 'In Transport', stageHi: 'परिवहन', count: 7, color: '#fbbf24' },
  { stage: 'Warehouse', stageHi: 'गोदाम', count: 5, color: '#93c5fd' },
  { stage: 'At Market', stageHi: 'बाजार', count: 3, color: '#c4b5fd' },
  { stage: 'Delivered', stageHi: 'डिलीवर', count: 12, color: '#4ade80' },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: typeof data[0]; value: number }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-card p-3">
      <p className="text-sm font-600 text-gray-700">{d.stage}</p>
      <p className="text-xs text-gray-400">{d.stageHi}</p>
      <p className="text-lg font-700 text-green-700 mt-1">{d.count} crops</p>
    </div>
  );
}

export default function CropStageChart() {
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-700 text-gray-800">Crop Stage Distribution</h3>
          <p className="text-xs text-gray-400 mt-0.5">फसल चरण वितरण</p>
        </div>
        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
          This Season
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={36} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(120,10%,92%)"
            vertical={false}
          />
          <XAxis
            dataKey="stage"
            tick={{ fontSize: 11, fontFamily: 'Plus Jakarta Sans', fill: '#6b7280', fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fontFamily: 'Plus Jakarta Sans', fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-stage-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
