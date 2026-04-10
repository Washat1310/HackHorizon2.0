import React from 'react';

const dealers = [
  {
    id: 'dealer-a',
    name: 'Dealer A',
    nameHi: 'व्यापारी A',
    location: 'Azadpur Mandi, Delhi',
    price: 2150,
    crop: 'Wheat',
    best: true,
    rating: '⭐⭐⭐⭐',
  },
  {
    id: 'dealer-b',
    name: 'Dealer B',
    nameHi: 'व्यापारी B',
    location: 'Ghazipur Mandi, UP',
    price: 2000,
    crop: 'Wheat',
    best: false,
    rating: '⭐⭐⭐',
  },
  {
    id: 'dealer-c',
    name: 'Dealer C',
    nameHi: 'व्यापारी C',
    location: 'Okhla Mandi, Delhi',
    price: 1980,
    crop: 'Wheat',
    best: false,
    rating: '⭐⭐⭐',
  },
];

export default function MarketPricePanel() {
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-700 text-gray-800">Market Prices</h3>
          <p className="text-xs text-gray-400 mt-0.5">बाजार भाव (₹/क्विंटल)</p>
        </div>
        <span className="text-xs font-600 bg-amber-50 text-amber-700 px-2 py-1 rounded-lg border border-amber-100">
          Live Today
        </span>
      </div>
      <div className="space-y-3">
        {dealers?.map((d) => (
          <div
            key={d?.id}
            className={`rounded-xl p-3.5 border transition-all duration-150 ${
              d?.best
                ? 'bg-green-50 border-green-200 shadow-sm'
                : 'bg-gray-50 border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-700 text-gray-800">{d?.name}</span>
                  {d?.best && (
                    <span className="text-xs font-600 bg-green-600 text-white px-2 py-0.5 rounded-full">
                      Best Price
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">📍 {d?.location}</p>
                <p className="text-xs text-gray-400">{d?.rating}</p>
              </div>
              <div className="text-right ml-3">
                <p
                  className={`text-xl font-800 tabular-nums ${
                    d?.best ? 'text-green-700' : 'text-gray-700'
                  }`}
                >
                  ₹{d?.price?.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-400">per quintal</p>
              </div>
            </div>
            {d?.best && (
              <a
                href="/crop-tracking"
                className="mt-3 w-full flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-600 py-2 rounded-lg transition-colors duration-150"
              >
                <span>🤝</span> Sell Here
              </a>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">
        Prices updated: 10 Apr 2026, 06:30 AM
      </p>
    </div>
  );
}
