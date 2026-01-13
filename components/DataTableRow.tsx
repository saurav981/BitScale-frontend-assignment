"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Users, ExternalLink } from "lucide-react";
import { CompanyData } from "@/types";
import { getFaviconUrl, getCompanyDomain } from "@/lib/utils";
import EmailStatusDropdown from "./EmailStatusDropdown";
import Image from "next/image";

interface DataTableRowProps {
  data: CompanyData;
  index: number;
}

export default function DataTableRow({ data }: DataTableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleEmailClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    });
    setShowEmailDropdown(!showEmailDropdown);
  };

  const companyDomain = getCompanyDomain(data.company);
  const faviconUrl = getFaviconUrl(companyDomain);

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors bg-white">
        <td className="px-4 py-3 whitespace-nowrap border-r border-b border-gray-200">
          <div className="grid place-content-center gap-2">
            <span className="text-sm text-neutral-700">{data.id}</span>
          </div>
        </td>

        {/* Name */}
        <td className="px-4 py-3 whitespace-nowrap border-r border-b border-gray-200">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex bg-blue-100/70 px-3 py-1 w-full rounded-full items-center gap-2 hover:text-blue-700 transition-colors"
          >
            <Users className="size-4 shrink-0 text-[#347fa9]" />
            <span className="text-neutral-600 text-sm font-medium">
              {data.name}
            </span>
            <div onClick={() => setIsExpanded(!isExpanded)} className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="size-4 shrink-0 text-neutral-500" />
              ) : (
                <ChevronRight className="size-4 shrink-0 text-neutral-500" />
              )}
            </div>
          </button>
        </td>

        {/* Date */}
        <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700 border-r border-b border-gray-200">
          {data.lastUpdated.replace(/,(?=[^,]*$)/, " at")}
        </td>

        {/* Company name */}
        <td className="px-4 py-3 whitespace-nowrap border-r border-b border-gray-200">
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

      {isExpanded && data.expanded && (
        <tr className="bg-blue-50">
          <td colSpan={8} className="px-4 py-4 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-8">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Phone Number</p>
                <p className="text-sm font-medium text-neutral-900">
                  {data.expanded.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 mb-1">Job Title</p>
                <p className="text-sm font-medium text-neutral-900">
                  {data.expanded.jobTitle}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 mb-1">Location</p>
                <p className="text-sm font-medium text-neutral-900">
                  {data.expanded.location}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 mb-1">Company Size</p>
                <p className="text-sm font-medium text-neutral-900">
                  {data.expanded.companySize} employees
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 mb-1">Industry</p>
                <p className="text-sm font-medium text-neutral-900">
                  {data.expanded.industry}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 mb-1">Last Contact</p>
                <p className="text-sm font-medium text-neutral-900">
                  {data.expanded.lastContact}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}

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
