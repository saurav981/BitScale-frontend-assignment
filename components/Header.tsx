'use client';

import { Home, Star, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <Home className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </button>
          <div className="text-sm text-gray-600">
            <span>Workbook - Bitscale UX/UI testing flow</span>
            <span className="mx-2 text-gray-400">/</span>
            <span>Bitscale grid only</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600">Grid running</div>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-[10%]" />
            </div>
            <div className="text-sm font-medium text-gray-700">10%</div>
          </div>
          
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <MessageCircle className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">500/500</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
              Free
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}