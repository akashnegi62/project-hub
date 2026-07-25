export type Trend = "up" | "down";

export interface KpiMetric {
  id: string;
  label: string;
  badgeValue: string;
  trend: Trend;
  value: string;
  callout: string;
  subtext: string;
}

export const kpiMetrics: KpiMetric[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    badgeValue: "+12.5%",
    trend: "up",
    value: "$1,250.00",
    callout: "Trending up this month",
    subtext: "Visitors for the last 6 months",
  },
  {
    id: "customers",
    label: "New Customers",
    badgeValue: "-20%",
    trend: "down",
    value: "1,234",
    callout: "Down 20% this period",
    subtext: "Acquisition needs attention",
  },
  {
    id: "accounts",
    label: "Active Accounts",
    badgeValue: "+12.5%",
    trend: "up",
    value: "45,678",
    callout: "Strong user retention",
    subtext: "Engagement exceed targets",
  },
  {
    id: "growth",
    label: "Growth Rate",
    badgeValue: "+4.5%",
    trend: "up",
    value: "4.5%",
    callout: "Steady performance increase",
    subtext: "Meets growth projections",
  },
];

export type SectionStatus = "Draft" | "In Review" | "Approved";

export interface SectionRow {
  id: string;
  header: string;
  sectionType: string;
  status: SectionStatus;
  target: string;
  limit: string;
  reviewer: string;
}

export const sectionRows: SectionRow[] = [
  {
    id: "1",
    header: "Cover page",
    sectionType: "Cover page",
    status: "In Review",
    target: "12",
    limit: "18",
    reviewer: "Eddie Lake",
  },
  {
    id: "2",
    header: "Table of contents",
    sectionType: "Table of contents",
    status: "Draft",
    target: "8",
    limit: "10",
    reviewer: "Eddie Lake",
  },
  {
    id: "3",
    header: "Executive summary",
    sectionType: "Narrative",
    status: "Approved",
    target: "20",
    limit: "24",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: "4",
    header: "Technical approach",
    sectionType: "Narrative",
    status: "In Review",
    target: "16",
    limit: "22",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: "5",
    header: "Design",
    sectionType: "Narrative",
    status: "In Review",
    target: "10",
    limit: "14",
    reviewer: "Assign reviewer",
  },
  {
    id: "6",
    header: "Capabilities",
    sectionType: "Narrative",
    status: "Approved",
    target: "6",
    limit: "8",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: "7",
    header: "Integration with existing systems",
    sectionType: "Narrative",
    status: "Draft",
    target: "14",
    limit: "20",
    reviewer: "Assign reviewer",
  },
  {
    id: "8",
    header: "Innovation and Advantages",
    sectionType: "Narrative",
    status: "Draft",
    target: "9",
    limit: "12",
    reviewer: "Assign reviewer",
  },
];

export const filterTabs = [
  { id: "outline", label: "Outline", count: null },
  { id: "past-performance", label: "Past Performance", count: 3 },
  { id: "key-personnel", label: "Key Personnel", count: 2 },
  { id: "focus-documents", label: "Focus Documents", count: null },
] as const;

export const mainNav = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "lifecycle", label: "Lifecycle", icon: "sync" },
  { id: "analytics", label: "Analytics", icon: "bar-chart" },
  { id: "projects", label: "Projects", icon: "folder" },
  { id: "team", label: "Team", icon: "people" },
] as const;

export const documentsNav = [
  { id: "data-library", label: "Data Library" },
  { id: "reports", label: "Reports" },
  { id: "word-assistant", label: "Word Assistant" },
  { id: "more", label: "... More" },
] as const;
