import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardKPIs from './components/DashboardKPIs';
import RecentCropsTable from './components/RecentCropsTable';
import MarketPricePanel from './components/MarketPricePanel';
import QuickActions from './components/QuickActions';
import CropStageChart from './components/CropStageChart';

export default function DashboardPage() {
  return (
    <AppLayout currentPath="/dashboard">
      <div className="pb-20 lg:pb-6 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-5 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-700 leading-tight">
                नमस्ते, Ramesh Kumar 👋
              </h2>
              <p className="text-green-100 text-sm mt-1">
                You have <strong>3 crops in transit</strong> today. Check their status below.
              </p>
            </div>
            <span className="text-5xl hidden sm:block">🌾</span>
          </div>
        </div>

        {/* KPI Cards */}
        <DashboardKPIs />

        {/* Charts + Market Prices Row */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <CropStageChart />
          </div>
          <div className="xl:col-span-2">
            <MarketPricePanel />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Crops */}
        <RecentCropsTable />
      </div>
    </AppLayout>
  );
}
