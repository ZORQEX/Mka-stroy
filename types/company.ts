export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  date: string;
  area: string;
  city: string;
  category: string;
  works: string[];
  images: string[];
  status?: 'completed' | 'in_progress';
  mapsUrl?: string;
}

export interface Certificate {
  id: string;
  company: string;
  image: string;
  year: number;
  type: 'recommendation' | 'certificate';
}

export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    city: string;
    street: string;
    building: string;
    district: string;
    coords: {
      lat: number;
      lng: number;
    };
  };
  workingHours: {
    weekdays: string;
    weekend: string;
  };
}

export interface CompanyStats {
  currentProjects: number;
  projectsCompleted: number;
  trustedCompanies: number;
}

export interface CompanyData {
  name: string;
  legalForm: string;
  city: string;
  description: string;
  tagline: string;
  stats: CompanyStats;
  services: Service[];
  projects: Project[];
  certificates: Certificate[];
  process: ProcessStep[];
  faq: FAQItem[];
  contacts: ContactInfo;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
