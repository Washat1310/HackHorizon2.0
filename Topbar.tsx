'use client';
import React, { useState } from 'react';

const pathLabels: Record<string, { en: string; hi: string }> = {
  '/dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड' },
  '/crop-registration': { en: 'Register Crop', hi: 'फसल दर्ज करें' },
  '/crop-tracking': { en: 'Track Crop', hi: 'फसल ट्रैक करें' },
};

interface TopbarProps {
  onMenuClick: () => void;
  currentPath: string;
}

export default function Topbar({ onMenuClick, currentPath }: TopbarProps) {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const label = pathLabels[currentPath] ?? { en: 'KrishiTrack', hi: 'कृषि ट्रैक' };

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 h-16 flex items-center justify-between flex-shrink-0">
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
          aria-label="Open menu"
        >
          <span className="text-lg">☰</span>
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-700 text-gray-800 leading-tight">
            {lang === 'en' ? label.en : label.hi}
          </h1>
          <p className="text-xs text-gray-400 hidden sm:block">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Right: Lang toggle + farmer avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Toggle */}
        <button
          onClick={() => setLang((l) => (l === 'en' ? 'hi' : 'en'))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-150"
        >
          <span className="text-sm">🌐</span>
          <span className="text-xs font-600 text-gray-600">
            {lang === 'en' ? 'हिंदी' : 'English'}
          </span>
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150">
          <span className="text-lg">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>

        {/* Farmer Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-base">👨‍🌾</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-600 text-gray-700 leading-tight">Ramesh Kumar</p>
            <p className="text-xs text-gray-400">Farmer ID: F-0042</p>
          </div>
        </div>
      </div>
    </header>
  );
}
