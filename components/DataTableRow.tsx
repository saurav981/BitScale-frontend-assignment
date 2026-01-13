"use client";

import { useState } from "react";
import { Users, ExternalLink } from "lucide-react";
import { CompanyData } from "@/types";
import { getFaviconUrl, getCompanyDomain } from "@/lib/utils";
import EmailStatusDropdown from "./EmailStatusDropdown";
import Image from "next/image";

interface DataTableRowProps {
  data: CompanyData;
  index: number;
  onRowClick: (data: CompanyData) => void;
}

export default function DataTableRow({ data, onRowClick }: DataTableRowProps) {
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    });
    setShowEmailDropdown(!showEmailDropdown);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const companyDomain = getCompanyDomain(data.company);
  const faviconUrl = getFaviconUrl(companyDomain);

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors bg-white cursor-pointer">
        <td className="px-4 py-3 whitespace-nowrap border-r border-b border-gray-200">
          <div className="grid place-content-center gap-2">
            <span className="text-sm text-neutral-700">{data.id}</span>
          </div>
        </td>

        {/* Name */}
        <td
          className="px-4 py-3 whitespace-nowrap border-r border-b border-gray-200"
          onClick={() => onRowClick(data)}
        >
          <button className="flex bg-blue-100/70 px-3 py-1 w-full rounded-full items-center gap-2 hover:bg-blue-200/70 transition-colors">
            <Users className="size-4 shrink-0 text-[#347fa9]" />
            <span className="text-neutral-600 text-sm font-medium">
              {data.name}
            </span>
          </button>
        </td>

        {/* Date */}
        <td
          className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700 border-r border-b border-gray-200"
          onClick={() => onRowClick(data)}
        >
          {data.lastUpdated.replace(/,(?=[^,]*$)/, " at")}
        </td>

        {/* Company name */}
        <td
          className="px-4 py-3 whitespace-nowrap border-r border-b border-gray-200"
          onClick={() => onRowClick(data)}
        >
          <div className="flex items-center gap-2">
            <Image
              src={faviconUrl}
              alt={data.company}
              width={16}
              height={16}
              className="w-4 h-4 shrink-0"
              unoptimized
            />
            <span className="text-sm text-neutral-700">{data.company}</span>
          </div>
        </td>

        {/* Company website - Fixed width with truncate */}
        <td className="px-4 py-3 border-r border-b border-gray-200 w-48 max-w-[12rem]">
          <a
            href={data.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            title={data.companyWebsite}
            onClick={handleLinkClick}
            className="flex items-center gap-2 text-neutral-800 hover:text-neutral-900 text-sm"
          >
            <ExternalLink
              className="size-4 shrink-0 text-neutral-400"
              strokeWidth={2.5}
            />
            <span className="text-neutral-600 truncate">
              {data.companyWebsite}
            </span>
          </a>
        </td>

        {/* Linkedin url - Fixed width with truncate */}
        <td className="px-4 py-3 border-r border-b border-gray-200 w-48 max-w-[12rem]">
          <a
            href={data.linkedinJobUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={data.linkedinJobUrl}
            onClick={handleLinkClick}
            className="flex items-center gap-2 text-neutral-800 hover:text-neutral-900 text-sm"
          >
            <ExternalLink
              className="size-4 shrink-0 text-neutral-400"
              strokeWidth={2.5}
            />
            <span className="text-neutral-600 truncate">
              {data.linkedinJobUrl}
            </span>
          </a>
        </td>

        {/* Email Waterfall */}
        <td className="px-4 py-3 whitespace-nowrap border-r border-b border-gray-200">
          <button
            onClick={handleEmailClick}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all hover:shadow-md ${
              data.emailStatus === "found"
                ? "bg-gray-100 w-full text-neutral-700 hover:bg-gray-200"
                : "text-[#c27803] hover:bg-gray-200 italic"
            }`}
          >
            {data.emailStatus === "found" ? (
              <>
                ✅<span>Email Found</span>
              </>
            ) : (
              <>
                <span>Run condition not met</span>
              </>
            )}
          </button>
        </td>
      </tr>

      {showEmailDropdown && (
        <EmailStatusDropdown
          status={data.emailStatus}
          onClose={() => setShowEmailDropdown(false)}
          position={dropdownPosition}
        />
      )}
    </>
  );
}
