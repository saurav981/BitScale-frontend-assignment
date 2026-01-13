"use client";

import { ArrowUpDown } from "lucide-react";
import { CompanyData, SortField, SortOrder } from "@/types";
import DataTableRow from "./DataTableRow";

interface DataTableProps {
  data: CompanyData[];
  onSort: (field: SortField) => void;
  sortField: SortField | null;
  sortOrder: SortOrder;
}

export default function DataTable({
  data,
  onSort,
  sortField,
  sortOrder,
}: DataTableProps) {
  const SortableHeader = ({
    field,
    label,
  }: {
    field: SortField;
    label: string;
  }) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        <span>{label}</span>
        <ArrowUpDown
          className={`w-3 h-3 ${
            sortField === field ? "text-blue-600" : "text-gray-400"
          }`}
        />
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
              #
            </th>
            <SortableHeader field="name" label="Imported Data" />
            <SortableHeader field="lastUpdated" label="Last Updated At" />
            <SortableHeader field="company" label="Company Name" />
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company Website
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              LinkedIn Job URL
            </th>
            <SortableHeader field="emailStatus" label="Email Waterfall" />
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <DataTableRow key={item.id} data={item} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
