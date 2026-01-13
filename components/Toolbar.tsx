"use client";

import {
  ChevronDown,
  Grid3x3,
  ArrowUpDown,
  Sparkles,
  ListFilter,
  Sheet,
  Building2,
} from "lucide-react";

interface ToolbarProps {
  totalRows: number;
  visibleColumns: number;
  totalColumns: number;
  onFilterClick: () => void;
  onSortClick: () => void;
}

export default function Toolbar({
  totalRows,
  visibleColumns,
  totalColumns,
  onFilterClick,
  onSortClick,
}: ToolbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-[0.65rem] flex-wrap">
          <button className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-gray-100 transition-colors text-sm text-neutral-800">
            <Building2
              className="w-4 h-4 text-green-700 opacity-90"
              strokeWidth={2.5}
            />
            <span>Load Data</span>
            <ChevronDown className="w-4 h-4 text-neutral-400" />
            <span className="bg-blue-600 text-white text-xs rounded-full size-4 flex items-center justify-center absolute -top-2 -right-2">
              1
            </span>
          </button>

          <button className="relative flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-neutral-800">
            <Grid3x3 className="w-4 h-4 text-neutral-400" strokeWidth={2.5} />
            <span>{totalRows} Rows</span>
            <span className="bg-blue-600 text-white text-xs rounded-full size-2 flex items-center justify-center absolute -top-0.5 -right-0.5"></span>
          </button>

          <button className="relative flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-neutral-800">
            <Sheet className="w-4 h-4 text-neutral-400" strokeWidth={2.5} />
            <span>
              {visibleColumns}/{totalColumns} Columns
            </span>
            <span className="bg-blue-600 text-white text-xs rounded-full size-2 flex items-center justify-center absolute -top-0.5 -right-0.5"></span>
          </button>

          <button
            onClick={onSortClick}
            className="relative flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-neutral-800"
          >
            <ArrowUpDown
              className="w-4 h-4 text-neutral-400"
              strokeWidth={2.5}
            />
            <span className="bg-blue-600 text-white text-xs rounded-full size-2 flex items-center justify-center absolute -top-0.5 -right-0.5"></span>
            <span>Sort by</span>
          </button>

          <button
            onClick={onFilterClick}
            className="relative flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-neutral-800"
          >
            <ListFilter
              className="w-4 h-4 text-neutral-400"
              strokeWidth={2.5}
            />
            <span>Filter</span>

            <span className="bg-blue-600 text-white text-xs rounded-full size-4 flex items-center justify-center absolute -top-2 -right-2">
              1
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-gray-100 transition-colors text-sm text-neutral-800">
            <span>Action</span>
            <ChevronDown
              className="w-4 h-4 text-neutral-600"
              strokeWidth={2.5}
            />
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Enrichment</span>
            <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
