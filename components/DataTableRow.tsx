'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Users, ExternalLink, Check, AlertCircle } from 'lucide-react';
import { CompanyData } from '@/types';
import { getFaviconUrl, getCompanyDomain } from '@/lib/utils';
import EmailStatusDropdown from './EmailStatusDropdown';
import Image from 'next/image';

interface DataTableRowProps {
  data: CompanyData;
  index: number;
}

export default function DataTableRow({ data, index }: DataTableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleEmailClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX
    });
    setShowEmailDropdown(!showEmailDropdown);
  };

  const companyDomain = getCompanyDomain(data.company);
  const faviconUrl = getFaviconUrl(companyDomain);

  return (
    <>
      <tr className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0.5 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <span className="text-sm text-gray-600">{data.id}</span>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{data.name}</span>
          </button>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
          {data.lastUpdated}
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <Image
              src={faviconUrl}
              alt={data.company}
              width={16}
              height={16}
              className="w-4 h-4"
              unoptimized
            />
            <span className="text-sm">{data.company}</span>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <a
            href={data.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
          >
            <ExternalLink className="w-3 h-3" />
            <span>{data.companyWebsite}</span>
          </a>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <a
            href={data.linkedinJobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
          >
            <ExternalLink className="w-3 h-3" />
            <span>{data.linkedinJobUrl}</span>
          </a>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <button
            onClick={handleEmailClick}
            className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-all hover:shadow-md ${
              data.emailStatus === 'found'
                ? 'bg-green-50 text-green-700 hover:bg-green-100'
                : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
            }`}
          >
            {data.emailStatus === 'found' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Email Found</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>Run condition not met</span>
              </>
            )}
          </button>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </td>
      </tr>
      
      {isExpanded && data.expanded && (
        <tr className="bg-blue-50 border-b border-gray-200">
          <td colSpan={8} className="px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-8">
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                <p className="text-sm font-medium">{data.expanded.phoneNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Job Title</p>
                <p className="text-sm font-medium">{data.expanded.jobTitle}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="text-sm font-medium">{data.expanded.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Company Size</p>
                <p className="text-sm font-medium">{data.expanded.companySize} employees</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Industry</p>
                <p className="text-sm font-medium">{data.expanded.industry}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Last Contact</p>
                <p className="text-sm font-medium">{data.expanded.lastContact}</p>
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