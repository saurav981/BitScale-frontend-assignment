import { CompanyData, SortField, SortOrder, FilterOptions } from "@/types";

export function sortData(
  data: CompanyData[],
  field: SortField,
  order: SortOrder
): CompanyData[] {
  return [...data].sort((a, b) => {
    let aVal: string | number;
    let bVal: string | number;

    switch (field) {
      case "name":
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case "company":
        aVal = a.company.toLowerCase();
        bVal = b.company.toLowerCase();
        break;
      case "lastUpdated":
        aVal = new Date(a.lastUpdated).getTime();
        bVal = new Date(b.lastUpdated).getTime();
        break;
      case "emailStatus":
        aVal = a.emailStatus;
        bVal = b.emailStatus;
        break;
      default:
        return 0;
    }

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
}

export function filterData(
  data: CompanyData[],
  filters: FilterOptions
): CompanyData[] {
  return data.filter((item) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchLower) ||
        item.company.toLowerCase().includes(searchLower) ||
        item.companyWebsite.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    // Company filter
    if (filters.companies.length > 0) {
      if (!filters.companies.includes(item.company)) return false;
    }

    // Email status filter
    if (filters.emailStatus.length > 0) {
      if (!filters.emailStatus.includes(item.emailStatus)) return false;
    }

    return true;
  });
}

export function getUniqueCompanies(data: CompanyData[]): string[] {
  return Array.from(new Set(data.map((item) => item.company))).sort();
}

export function getCompanyDomain(companyName: string): string {
  return companyName.toLowerCase().replace(/\s+/g, "") + ".com";
}

export function getFaviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}
