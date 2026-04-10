'use client';
import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

interface NavItem {
  href: string;
  icon: string;
  label: string;
  labelHi: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { href: '/dashboard', icon: '🏠', label: 'Dashboard', labelHi: 'डैशबोर्ड' },
  { href: '/crop-registration', icon: '🌾', label: 'Register Crop', labelHi: 'फसल दर्ज करें' },
  { href: '/crop-tracking', icon: '📍', label: 'Track Crop', labelHi: 'फसल ट्रैक करें' },
];

interface SidebarProps {
  currentPath: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobile?: boolean;
}

export default function Sidebar({
  currentPath,
  collapsed,
  onToggleCollapse,
  mobile = false,
}: SidebarProps) {
  const width = collapsed && !mobile ? 'w-16' : 'w-64';

  return (
    <aside
      className={`${width} h-full bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}
      style={{ minHeight: '100vh' }}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-gray-100 ${
          collapsed && !mobile ? 'justify-center px-2' : ''
        }`}
      >
        <AppLogo size={36} />
        {(!collapsed || mobile) && (
          <div>
            <span className="font-800 text-lg text-green-700 leading-tight block">
              KrishiTrack
            </span>
            <span className="text-xs text-gray-400 font-500">कृषि ट्रैक</span>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = currentPath === item.href;
          return (
            <a
              key={`nav-${item.href}`}
              href={item.href}
              title={item.label}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 group relative ${
                active
                  ? 'bg-green-50 text-green-700' :'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              } ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {(!collapsed || mobile) && (
                <div className="flex flex-col leading-tight">
                  <span className={`text-sm font-600 ${active ? 'text-green-700' : ''}`}>
                    {item.label}
                  </span>
                  <span className="text-xs text-gray-400">{item.labelHi}</span>
                </div>
              )}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-600 rounded-r-full" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Bottom: Collapse toggle + help */}
      <div className="border-t border-gray-100 p-3">
        {!mobile && (
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all duration-150"
          >
            <span className="text-lg">{collapsed ? '→' : '←'}</span>
            {!collapsed && (
              <span className="text-xs font-600 text-gray-400">Collapse</span>
            )}
          </button>
        )}
        {!collapsed && (
          <div className="mt-2 bg-green-50 rounded-xl p-3">
            <p className="text-xs text-green-700 font-600">🌱 Kisan Helpline</p>
            <p className="text-xs text-green-600 mt-0.5">1800-180-1551</p>
          </div>
        )}
      </div>
    </aside>
  );
}
