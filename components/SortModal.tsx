"use client";

import { X, ArrowUp, ArrowDown } from "lucide-react";
import { SortField, SortOrder } from "@/types";
import { useEffect, useRef } from "react";

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  sortField: SortField | null;
  sortOrder: SortOrder;
  onSort: (field: SortField, order: SortOrder) => void;
}

export default function SortModal({
  isOpen,
  onClose,
  sortField,
  sortOrder,
  onSort,
}: SortModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sortOptions: { field: SortField; label: string }[] = [
    { field: "name", label: "Name" },
    { field: "company", label: "Company" },
    { field: "lastUpdated", label: "Last Updated" },
    { field: "emailStatus", label: "Email Status" },
  ];

  const handleSort = (field: SortField) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    onSort(field, newOrder);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-neutral-900">Sort By</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.field}
                onClick={() => handleSort(option.field)}
                className={`w-full flex items-center justify-between p-3 rounded hover:bg-gray-50 transition-colors ${
                  sortField === option.field
                    ? "bg-blue-50 border border-blue-200"
                    : "border border-transparent"
                }`}
              >
                <span className="text-sm font-medium text-neutral-900">
                  {option.label}
                </span>
                {sortField === option.field && (
                  <div className="flex items-center gap-1">
                    {sortOrder === "asc" ? (
                      <ArrowUp className="w-4 h-4 text-blue-600" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-blue-600" />
                    )}
                    <span className="text-xs text-blue-600">
                      {sortOrder === "asc" ? "Ascending" : "Descending"}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
