"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Building2,
  Mail,
  Calendar,
  Globe,
  Linkedin,
  Users,
} from "lucide-react";
import { CompanyData } from "@/types";
import { getFaviconUrl, getCompanyDomain } from "@/lib/utils";
import EmailStatusDropdown from "./EmailStatusDropdown";
import Image from "next/image";

interface DataCardProps {
  data: CompanyData;
}

export default function DataCard({ data }: DataCardProps) {
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
      <div className="bg-white border-b border-gray-200 p-4">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-neutral-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-neutral-600" />
              )}
            </button>
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-medium text-neutral-900">{data.name}</h3>
              <p className="text-sm text-neutral-600">ID: {data.id}</p>
            </div>
          </div>
        </div>

        {/* Important Fields */}
        <div className="space-y-3 ml-8">
          {/* Company */}
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-neutral-500 flex-shrink-0" />
            <div className="flex items-center gap-2 flex-1">
              <Image
                src={faviconUrl}
                alt={data.company}
                width={16}
                height={16}
                className="w-4 h-4"
                unoptimized
              />
              <span className="text-sm text-neutral-800">{data.company}</span>
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-500 flex-shrink-0" />
            <span className="text-sm text-neutral-600">{data.lastUpdated}</span>
          </div>

          {/* Email Status */}
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-neutral-500 flex-shrink-0" />
            <button
              onClick={handleEmailClick}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all ${
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
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && data.expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 ml-8">
            <div className="space-y-3">
              {/* Website - with truncate */}
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                <a
                  href={data.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={data.companyWebsite}
                  className="text-sm text-neutral-800 hover:text-blue-600 truncate block"
                >
                  {data.companyWebsite}
                </a>
              </div>

              {/* LinkedIn - with truncate */}
              <div className="flex items-start gap-2">
                <Linkedin className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                <a
                  href={data.linkedinJobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={data.linkedinJobUrl}
                  className="text-sm text-neutral-800 hover:text-blue-600 truncate block"
                >
                  {data.linkedinJobUrl}
                </a>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 gap-3 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Phone Number</p>
                  <p className="text-sm font-medium text-neutral-900">
                    {data.expanded.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Job Title</p>
                  <p className="text-sm font-medium text-neutral-900">
                    {data.expanded.jobTitle}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Location</p>
                  <p className="text-sm font-medium text-neutral-900">
                    {data.expanded.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Company Size</p>
                  <p className="text-sm font-medium text-neutral-900">
                    {data.expanded.companySize} employees
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Industry</p>
                  <p className="text-sm font-medium text-neutral-900">
                    {data.expanded.industry}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Last Contact</p>
                  <p className="text-sm font-medium text-neutral-900">
                    {data.expanded.lastContact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
