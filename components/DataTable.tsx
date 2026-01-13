"use client";

import {
  ArrowUpDown,
  Users,
  Calendar,
  Building2,
  Globe,
  Linkedin,
  Mail,
  Hash,
  Eye,
  LucideIcon,
} from "lucide-react";
import { CompanyData, SortField, SortOrder } from "@/types";
import DataTableRow from "./DataTableRow";

interface DataTableProps {
  data: CompanyData[];
  onSort: (field: SortField) => void;
  sortField: SortField | null;
  sortOrder: SortOrder;
  onRowClick: (data: CompanyData) => void;
}

export default function DataTable({
  data,
  onSort,
  sortField,
  onRowClick,
}: DataTableProps) {
  const SortableHeader = ({
    field,
    label,
    icon: Icon,
    width,
    hideOnMobile = false,
  }: {
    field: SortField;
    label: string;
    icon: LucideIcon;
    width?: string;
    hideOnMobile?: boolean;
  }) => (
    <th
      className={`px-2 md:px-4 py-2 md:py-3 text-left text-xs font-semibold text-neutral-600 tracking-wide cursor-pointer hover:bg-gray-100 hover:text-neutral-700 transition-colors select-none group sticky top-0 bg-gray-50 z-10 border-b border-gray-200 ${width} ${
        hideOnMobile ? "hidden md:table-cell" : ""
      }`}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-600 transition-colors shrink-0" />
        <span>{label}</span>
        <ArrowUpDown
          className={`w-3 h-3 transition-opacity duration-200 ${
            sortField === field
              ? "text-blue-600 opacity-100"
              : "text-neutral-300 opacity-0 group-hover:opacity-100"
          }`}
        />
      </div>
    </th>
  );

  return (
    <div className="w-full overflow-x-auto relative min-h-[500px]">
      <table className="w-full divide-y divide-gray-200 border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide w-12 md:w-14 sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
              <div className="flex items-center gap-2 pl-0 md:pl-2">
                <Hash className="w-3 md:w-3.5 h-3 md:h-3.5 text-neutral-400" />
              </div>
            </th>
            <SortableHeader field="name" label="Name" icon={Users} />
            <SortableHeader
              field="lastUpdated"
              label="Last Updated"
              icon={Calendar}
              hideOnMobile={true}
            />
            <SortableHeader field="company" label="Company" icon={Building2} />

            {/* Company Website - Hidden on mobile */}
            <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold text-neutral-600 tracking-wide sticky top-0 bg-gray-50 z-10 border-b border-gray-200 w-48">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <span>Company Website</span>
              </div>
            </th>

            {/* LinkedIn Job URL - Hidden on mobile */}
            <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold text-neutral-600 tracking-wide sticky top-0 bg-gray-50 z-10 border-b border-gray-200 w-48">
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-neutral-500" />
                <span>LinkedIn Job URL</span>
              </div>
            </th>

            {/* Email Waterfall */}
            <SortableHeader field="emailStatus" label="Email" icon={Mail} />

            {/* View Details - Mobile only */}
            <th className="md:hidden px-2 py-2 text-left text-xs font-semibold text-neutral-600 tracking-wide sticky top-0 bg-gray-50 z-10 border-b border-gray-200 w-20">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-neutral-500" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((item, index) => (
            <DataTableRow
              key={item.id}
              data={item}
              index={index}
              onRowClick={onRowClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
