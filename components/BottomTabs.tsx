'use client';

import { useState } from 'react';
import { Grid3x3, MoreVertical, CircleStop, Play, Copy } from 'lucide-react';

export default function BottomTabs() {
  const [activeTab, setActiveTab] = useState('grid');

  const tabs = [
    { id: 'grid', label: 'Grid', icon: Grid3x3 },
    { id: 'bitscale-grid', label: 'Bitscale grid only', icon: null },
    { id: 'user-engagement', label: 'User Engagement...', icon: null },
    { id: 'customer-insights', label: 'Customer Insights...', icon: null },
    { id: 'audience-interact', label: 'Audience Interact...', icon: null },
    { id: 'lead-generation', label: 'Lead Generation...', icon: null }
  ];

  return (
    <div className="bg-white border-t border-gray-200">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 py-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded transition-colors text-sm">
            <CircleStop className="w-4 h-4" />
            <span>Kill Run</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 rounded transition-colors text-sm">
            <Play className="w-4 h-4" />
            <span>Auto Run</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 rounded transition-colors text-sm">
            <Copy className="w-4 h-4" />
            <span>Auto Dedupe</span>
          </button>
          <button className="px-3 py-1.5 bg-gray-900 text-white hover:bg-gray-800 rounded transition-colors text-sm">
            Support
          </button>
        </div>
      </div>
    </div>
  );
}