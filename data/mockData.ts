import { CompanyData } from "@/types";

const names = [
  "Mike Braham",
  "Alex Johnson",
  "Sarah Thompson",
  "David Lee",
  "Emily Carter",
  "James Smith",
  "Laura White",
  "Chris Brown",
  "Jessica Green",
  "Daniel Harris",
  "Megan Clark",
  "Brian Lewis",
  "Samantha Hall",
  "Ryan Martinez",
  "Jennifer Taylor",
  "Kevin Anderson",
  "Amanda Thomas",
  "Michael Jackson",
  "Nicole Moore",
  "Robert Wilson",
  "Lisa Martin",
  "Steven Garcia",
  "Rachel Rodriguez",
  "Christopher Lee",
  "Michelle Walker",
  "Andrew Young",
  "Ashley King",
  "Matthew Wright",
  "Kimberly Lopez",
  "Joshua Hill",
];

const companies = [
  { name: "Google", domain: "google.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "LinkedIn", domain: "linkedin.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "TED", domain: "ted.com" },
  { name: "Unilever", domain: "unilever.com" },
  { name: "Apple", domain: "apple.com" },
  { name: "Netflix", domain: "netflix.com" },
  { name: "Meta", domain: "meta.com" },
  { name: "Tesla", domain: "tesla.com" },
  { name: "Spotify", domain: "spotify.com" },
  { name: "Adobe", domain: "adobe.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Oracle", domain: "oracle.com" },
  { name: "IBM", domain: "ibm.com" },
];

const jobTitles = [
  "Software Engineer",
  "Product Manager",
  "Senior Data Analyst",
  "UX Designer",
  "Marketing Director",
  "Sales Manager",
  "DevOps Engineer",
  "HR Business Partner",
  "Financial Analyst",
  "Content Strategist",
  "VP of Engineering",
  "Customer Success Manager",
];

const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Boston, MA",
  "Chicago, IL",
  "Los Angeles, CA",
  "Denver, CO",
  "Atlanta, GA",
  "Portland, OR",
  "Remote",
  "London, UK",
];

const companySizes = [
  "1-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5000+",
];

const industries = [
  "Technology",
  "E-commerce",
  "Social Media",
  "Cloud Computing",
  "Entertainment",
  "Consumer Goods",
  "Automotive",
  "Finance",
  "Healthcare",
  "Education",
  "SaaS",
  "Hardware",
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePhoneNumber(): string {
  const area = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const line = Math.floor(Math.random() * 9000) + 1000;
  return `+1 (${area}) ${prefix}-${line}`;
}

function generateDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function generateMockData(
  count: number,
  startIndex: number = 0
): CompanyData[] {
  const data: CompanyData[] = [];

  for (let i = 0; i < count; i++) {
    const index = startIndex + i;
    const company = getRandomItem(companies);
    const emailStatus = Math.random() > 0.5 ? "found" : "not-met";

    data.push({
      id: index + 1,
      name: names[index % names.length],
      company: company.name,
      companyWebsite: `https://www.${company.domain}`,
      linkedinJobUrl: `https://www.linkedin.com/jobs/${index + 1000}`,
      emailStatus,
      lastUpdated: generateDate(Math.floor(Math.random() * 90)),
      expanded: {
        phoneNumber: generatePhoneNumber(),
        jobTitle: getRandomItem(jobTitles),
        location: getRandomItem(locations),
        companySize: getRandomItem(companySizes),
        industry: getRandomItem(industries),
        lastContact: generateDate(Math.floor(Math.random() * 30)),
      },
    });
  }

  return data;
}

export const initialMockData = generateMockData(10, 0);
