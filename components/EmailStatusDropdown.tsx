"use client";

import { useRef, useEffect } from "react";
import { X, RefreshCw, Mail, Play } from "lucide-react";

interface EmailStatusDropdownProps {
  status: "found" | "not-met";
  onClose: () => void;
  position: { top: number; left: number };
}

export default function EmailStatusDropdown({
  status,
  onClose,
  position,
}: EmailStatusDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const actions =
    status === "found"
      ? [
          { icon: Mail, label: "View Email", color: "text-blue-600" },
          { icon: RefreshCw, label: "Re-verify", color: "text-gray-600" },
          { icon: X, label: "Mark as Invalid", color: "text-red-600" },
        ]
      : [
          { icon: Play, label: "Retry Enrichment", color: "text-blue-600" },
          { icon: RefreshCw, label: "Force Run", color: "text-orange-600" },
          { icon: X, label: "Skip", color: "text-gray-600" },
        ];

  return (
    <div
      ref={dropdownRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200"
      style={{ top: position.top, left: position.left }}
    >
      {actions.map((action, index) => (
        <button
          key={index}
          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
          onClick={onClose}
        >
          <action.icon className={`w-4 h-4 ${action.color}`} />
          <span className="text-sm text-neutral-800">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
