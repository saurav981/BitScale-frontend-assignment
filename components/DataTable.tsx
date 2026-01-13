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
} from "lucide-react";
import { CompanyData, SortField, SortOrder } from "@/types";
import DataTableRow from "./DataTableRow";
import DataCard from "./DataCard";

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
    icon: Icon,
  }: {
    field: SortField;
    label: string;
    icon: any;
  }) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-neutral-600" />
        <span>{label}</span>
        <ArrowUpDown
          className={`w-3 h-3 ${
            sortField === field ? "text-blue-600" : "text-neutral-400"
          }`}
        />
      </div>
    </th>
  );

  return (
    <>
      {/* Desktop/Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider w-20">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-neutral-600" />
                  <span>#</span>
                </div>
              </th>
              <SortableHeader field="name" label="Imported Data" icon={Users} />
              <SortableHeader
                field="lastUpdated"
                label="Last Updated At"
                icon={Calendar}
              />
              <SortableHeader
                field="company"
                label="Company Name"
                icon={Building2}
              />
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-neutral-600" />
                  <span>Company Website</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-neutral-600" />
                  <span>LinkedIn Job URL</span>
                </div>
              </th>
              <SortableHeader
                field="emailStatus"
                label="Email Waterfall"
                icon={Mail}
              />
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider w-16"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <DataTableRow key={item.id} data={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {data.map((item) => (
          <DataCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
}
