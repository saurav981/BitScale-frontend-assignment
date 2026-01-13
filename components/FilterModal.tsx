"use client";

import { X, Search } from "lucide-react";
import { FilterOptions } from "@/types";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableCompanies: string[];
}

export default function FilterModal({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  availableCompanies,
}: FilterModalProps) {
  if (!isOpen) return null;

  const handleCompanyToggle = (company: string) => {
    const newCompanies = filters.companies.includes(company)
      ? filters.companies.filter((c) => c !== company)
      : [...filters.companies, company];
    onFiltersChange({ ...filters, companies: newCompanies });
  };

  const handleEmailStatusToggle = (status: string) => {
    const newStatus = filters.emailStatus.includes(status)
      ? filters.emailStatus.filter((s) => s !== status)
      : [...filters.emailStatus, status];
    onFiltersChange({ ...filters, emailStatus: newStatus });
  };

  const handleClearAll = () => {
    onFiltersChange({ search: "", companies: [], emailStatus: [] });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(80vh-140px)]">
          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) =>
                  onFiltersChange({ ...filters, search: e.target.value })
                }
                placeholder="Search by name, company..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Companies */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Companies
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableCompanies.map((company) => (
                <label
                  key={company}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={filters.companies.includes(company)}
                    onChange={() => handleCompanyToggle(company)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm">{company}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Email Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Status
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={filters.emailStatus.includes("found")}
                  onChange={() => handleEmailStatusToggle("found")}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm">Email Found</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={filters.emailStatus.includes("not-met")}
                  onChange={() => handleEmailStatusToggle("not-met")}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm">Run condition not met</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
