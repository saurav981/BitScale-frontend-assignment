export interface CompanyData {
  id: number;
  name: string;
  company: string;
  companyWebsite: string;
  linkedinJobUrl: string;
  emailStatus: "found" | "not-met";
  lastUpdated: string;
  expanded?: ExpandedDetails;
}

export interface ExpandedDetails {
  phoneNumber: string;
  jobTitle: string;
  location: string;
  companySize: string;
  industry: string;
  lastContact: string;
}

export type SortField = "name" | "company" | "lastUpdated" | "emailStatus";
export type SortOrder = "asc" | "desc";

export interface FilterOptions {
  search: string;
  companies: string[];
  emailStatus: string[];
}
