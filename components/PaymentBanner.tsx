"use client";

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";

export default function PaymentBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#c81e1e] text-white px-4 py-3 flex items-center justify-center gap-8">
      <div className="flex items-center gap-3">
        <p className="font-medium">
          Payment failed. 450,000 credits will permanently expire in 30 days
        </p>
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
      </div>
      <div className="flex items-center gap-3">
        <button className="bg-white text-neutral-700 font-semibold px-4 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors shadow-2xl">
          Pay Now
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="hover:bg-red-800 p-1 rounded-lg transition-colors"
          aria-label="Close banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
