export interface Profile {
  name: string;
  title: string;
  summary: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  field: string;
  fromDate: string;
  toDate: string;
  description?: string;
  learnings?: string[];
  labels: string[];
}

export interface Skill {
  name: string;
  label: string;
}

export interface Highlight {
  text: string;
  labels: string[];
}

export interface Role {
  id: string;
  position: string;
  fromDate?: string;
  toDate?: string;
  description?: string;
  highlights: Highlight[];
  skills: Skill[];
}

export interface WorkExperience {
  id: string;
  company: string;
  location: string;
  fromDate: string;
  toDate?: string;
  current: boolean;
  roles: Role[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  date: string;
  type: string;
  link?: string;
  description?: string;
  labels: string[];
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Internship {
  id: string;
  company: string;
  location: string;
  fromDate: string;
  toDate?: string;
  roles: Role[];
}

export interface ResumeData {
  profile: Profile;
  education: Education[];
  workExperience: WorkExperience[];
  internships: Internship[];
  publications: Publication[];
  availableLabels: string[];
  languages?: Language[];
}

