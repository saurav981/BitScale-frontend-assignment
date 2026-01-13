"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CompanyData, SortField, SortOrder, FilterOptions } from "@/types";
import { generateMockData, initialMockData } from "@/data/mockData";
import { sortData, filterData, getUniqueCompanies } from "@/lib/utils";
import PaymentBanner from "@/components/PaymentBanner";
import Header from "@/components/Header";
import Toolbar from "@/components/Toolbar";
import DataTable from "@/components/DataTable";
import BottomTabs from "@/components/BottomTabs";
import FilterModal from "@/components/FilterModal";
import SortModal from "@/components/SortModal";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const [allData, setAllData] = useState<CompanyData[]>(initialMockData);
  const [displayedData, setDisplayedData] =
    useState<CompanyData[]>(initialMockData);
  const [filteredData, setFilteredData] =
    useState<CompanyData[]>(initialMockData);

  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    companies: [],
    emailStatus: [],
  });

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Apply filters and sorting
  useEffect(() => {
    let result = filterData(allData, filters);

    if (sortField) {
      result = sortData(result, sortField, sortOrder);
    }

    setFilteredData(result);
    setDisplayedData(result.slice(0, page * 10));
  }, [allData, filters, sortField, sortOrder, page]);

  // Infinite scroll
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      const currentLength = allData.length;
      const newData = generateMockData(10, currentLength);

      setAllData((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
      setIsLoadingMore(false);

      if (currentLength >= 20) {
        setHasMore(false);
      }
    }, 1000);
  }, [allData.length, isLoadingMore, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, isLoadingMore]);

  const handleSort = (field: SortField, order?: SortOrder) => {
    if (order) {
      setSortField(field);
      setSortOrder(order);
    } else {
      if (sortField === field) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    }
  };

  const availableCompanies = getUniqueCompanies(allData);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <PaymentBanner />
      <Toolbar
        totalRows={filteredData.length}
        visibleColumns={16}
        totalColumns={20}
        onFilterClick={() => setShowFilterModal(true)}
        onSortClick={() => setShowSortModal(true)}
      />

      <div className="flex-1 overflow-auto">
        <DataTable
          data={displayedData}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />

        {isLoadingMore && <LoadingSpinner />}

        {hasMore && !isLoadingMore && (
          <div ref={observerTarget} className="h-20" />
        )}

        {!hasMore && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No more data to load
          </div>
        )}
      </div>

      <BottomTabs />

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onFiltersChange={setFilters}
        availableCompanies={availableCompanies}
      />

      <SortModal
        isOpen={showSortModal}
        onClose={() => setShowSortModal(false)}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={(field, order) => {
          handleSort(field, order);
          setShowSortModal(false);
        }}
      />
    </div>
  );
}
