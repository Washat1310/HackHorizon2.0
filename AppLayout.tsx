'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

export default function AppLayout({ children, currentPath }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar
          currentPath={currentPath}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((p) => !p)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 h-full">
            <Sidebar
              currentPath={currentPath}
              collapsed={false}
              onToggleCollapse={() => setSidebarOpen(false)}
              mobile
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} currentPath={currentPath} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar currentPath={currentPath} />
    </div>
  );
}

function MobileTabBar({ currentPath }: { currentPath: string }) {
  const tabs = [
    { href: '/dashboard', icon: '🏠', label: 'Home' },
    { href: '/crop-registration', icon: '🌾', label: 'Register' },
    { href: '/crop-tracking', icon: '📍', label: 'Track' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30 flex">
      {tabs.map((tab) => {
        const active = currentPath === tab.href;
        return (
          <a
            key={`tab-${tab.href}`}
            href={tab.href}
            className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-colors duration-150 ${
              active ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className={`text-xs font-600 ${active ? 'text-green-600' : ''}`}>
              {tab.label}
            </span>
            {active && (
              <span className="absolute bottom-0 w-12 h-0.5 bg-green-600 rounded-t-full" />
            )}
          </a>
        );
      })}
    </nav>
  );
}
