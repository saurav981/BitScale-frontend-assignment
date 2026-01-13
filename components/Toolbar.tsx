"use client";

import {
  ChevronDown,
  Database,
  Grid3x3,
  ArrowUpDown,
  Filter,
  Sparkles,
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
            <Database className="w-4 h-4 text-gray-600" />
            <span>Load Data</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
            <Grid3x3 className="w-4 h-4 text-gray-600" />
            <span>{totalRows} Rows</span>
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              •
            </span>
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
            <span>
              {visibleColumns}/{totalColumns} Columns
            </span>
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              •
            </span>
          </button>

          <button
            onClick={onSortClick}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
          >
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
            <span>Sort by</span>
          </button>

          <button
            onClick={onFilterClick}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
          >
            <Filter className="w-4 h-4 text-gray-600" />
            <span>Filter</span>
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
            <span>Action</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Enrichment</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
