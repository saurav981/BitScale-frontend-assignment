"use client";

import { Home, Star, CloudCheck } from "lucide-react";
import { CoinIconSVG } from "./CoinIconSVG";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <Home className="w-5 h-5 text-neutral-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </button>
          <div className="text-neutral-700 font-semibold">
            <span className="text-neutral-400">
              Workbook - Bitscale UX/UI testing flow
            </span>
            <span className="mx-2 text-neutral-400">/</span>
            <span>Bitscale grid only</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <CloudCheck className="w-5 h-5 text-neutral-500" />
          </button>

          <div className="inline-flex items-center gap-3 bg-[#EBF5F0] px-3 py-1 rounded-lg">
            <div className="flex items-center gap-2 text-[#327B55]">
              <CoinIconSVG />

              <span className="text-sm tracking-wide">500/500</span>
            </div>

            <span className="bg-[#438361] text-white text-xs font-semibold px-2 py-1 rounded-lg">
              Free
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
