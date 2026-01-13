"use client";

import { useEffect, useRef } from "react";
import {
  X,
  Users,
  Building2,
  Globe,
  Linkedin,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Building,
  Factory,
  Calendar,
} from "lucide-react";
import { CompanyData } from "@/types";
import { getFaviconUrl, getCompanyDomain } from "@/lib/utils";
import Image from "next/image";

interface RowDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CompanyData | null;
}

export default function RowDetailsModal({
  isOpen,
  onClose,
  data,
}: RowDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  const companyDomain = getCompanyDomain(data.company);
  const faviconUrl = getFaviconUrl(companyDomain);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-neutral-900">
              {data.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-88px)]">
          {/* Basic Info Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
              Basic Information
            </h3>

            {/* Company */}
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-neutral-500 mb-1">Company</p>
                <div className="flex items-center gap-2">
                  <Image
                    src={faviconUrl}
                    alt={data.company}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                    unoptimized
                  />
                  <p className="text-sm font-medium text-neutral-900">
                    {data.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-neutral-500 mb-1">Company Website</p>
                <a
                  href={data.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 break-all"
                >
                  {data.companyWebsite}
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start gap-3">
              <Linkedin className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-neutral-500 mb-1">
                  LinkedIn Job URL
                </p>
                <a
                  href={data.linkedinJobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 break-all"
                >
                  {data.linkedinJobUrl}
                </a>
              </div>
            </div>

            {/* Email Status */}
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-neutral-500 mb-1">Email Status</p>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    data.emailStatus === "found"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {data.emailStatus === "found"
                    ? "✅ Email Found"
                    : "Run condition not met"}
                </span>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-neutral-500 mb-1">Last Updated</p>
                <p className="text-sm font-medium text-neutral-900">
                  {data.lastUpdated}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details Section */}
          {data.expanded && (
            <>
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-4">
                  Additional Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-neutral-500 mb-1">
                        Phone Number
                      </p>
                      <p className="text-sm font-medium text-neutral-900">
                        {data.expanded.phoneNumber}
                      </p>
                    </div>
                  </div>

                  {/* Job Title */}
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-neutral-500 mb-1">Job Title</p>
                      <p className="text-sm font-medium text-neutral-900">
                        {data.expanded.jobTitle}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-neutral-500 mb-1">Location</p>
                      <p className="text-sm font-medium text-neutral-900">
                        {data.expanded.location}
                      </p>
                    </div>
                  </div>

                  {/* Company Size */}
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-neutral-500 mb-1">
                        Company Size
                      </p>
                      <p className="text-sm font-medium text-neutral-900">
                        {data.expanded.companySize} employees
                      </p>
                    </div>
                  </div>

                  {/* Industry */}
                  <div className="flex items-start gap-3">
                    <Factory className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-neutral-500 mb-1">Industry</p>
                      <p className="text-sm font-medium text-neutral-900">
                        {data.expanded.industry}
                      </p>
                    </div>
                  </div>

                  {/* Last Contact */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-neutral-500 mb-1">
                        Last Contact
                      </p>
                      <p className="text-sm font-medium text-neutral-900">
                        {data.expanded.lastContact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
