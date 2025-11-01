#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_DATA_FILE = 'public/data/resume-data.json';

// Type definitions
interface Profile {
  name: string;
  title: string;
  summary: string;
  email: string;
  linkedin: string;
  github: string;
}

interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  field: string;
  fromDate: string;
  toDate: string;
  description?: string;
  coursework?: string[];
  labels: string[];
}

interface Skill {
  name: string;
  label: string;
}

interface Highlight {
  text: string;
  labels: string[];
}

interface Role {
  id: string;
  position: string;
  fromDate: string;
  toDate?: string;
  description?: string;
  highlights: Highlight[];
  skills: Skill[];
}

interface WorkExperience {
  id: string;
  company: string;
  location: string;
  fromDate: string;
  toDate?: string;
  current: boolean;
  roles: Role[];
}

interface Publication {
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

interface ResumeData {
  profile: Profile;
  education: Education[];
  workExperience: WorkExperience[];
  publications: Publication[];
  availableLabels: string[];
}

function validateResumeData(data: unknown): data is ResumeData {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data: must be an object');
  }

  const resume = data as Partial<ResumeData>;

  // Validate profile
  if (!resume.profile) {
    throw new Error('Missing required field: profile');
  }
  validateProfile(resume.profile);

  // Validate arrays
  if (!Array.isArray(resume.education)) {
    throw new Error('Invalid field: education must be an array');
  }
  if (!Array.isArray(resume.workExperience)) {
    throw new Error('Invalid field: workExperience must be an array');
  }
  if (!Array.isArray(resume.publications)) {
    throw new Error('Invalid field: publications must be an array');
  }

  // Validate each education entry
  resume.education.forEach((edu, index) => {
    validateEducation(edu, index);
  });

  // Validate each work experience entry
  resume.workExperience.forEach((work, index) => {
    validateWorkExperience(work, index);
  });

  // Validate each publication entry
  resume.publications.forEach((pub, index) => {
    validatePublication(pub, index);
  });

  // Validate available labels
  if (!Array.isArray(resume.availableLabels)) {
    throw new Error('availableLabels must be an array');
  }

  return true;
}

function validateProfile(profile: unknown): void {
  const p = profile as Record<string, unknown>;
  const required = ['name', 'title', 'summary', 'email', 'linkedin', 'github'];
  
  for (const field of required) {
    if (typeof p[field] !== 'string') {
      throw new Error(`Profile: missing or invalid required field '${field}'`);
    }
  }
}

function validateEducation(edu: unknown, index: number): void {
  const e = edu as Record<string, unknown>;
  const required = ['id', 'institution', 'location', 'degree', 'field', 'fromDate', 'toDate', 'labels'];
  
  for (const field of required) {
    if (!e[field]) {
      throw new Error(`Education[${index}]: missing required field '${field}'`);
    }
  }

  if (!Array.isArray(e.labels)) {
    throw new Error(`Education[${index}]: labels must be an array`);
  }

  if (e.coursework && !Array.isArray(e.coursework)) {
    throw new Error(`Education[${index}]: coursework must be an array`);
  }
}

function validateWorkExperience(work: unknown, index: number): void {
  const w = work as Record<string, unknown>;
  const required = ['id', 'company', 'location', 'fromDate', 'current', 'roles'];
  
  for (const field of required) {
    if (w[field] === undefined) {
      throw new Error(`WorkExperience[${index}]: missing required field '${field}'`);
    }
  }

  if (typeof w.current !== 'boolean') {
    throw new Error(`WorkExperience[${index}]: 'current' must be a boolean`);
  }

  if (!Array.isArray(w.roles) || w.roles.length === 0) {
    throw new Error(`WorkExperience[${index}]: roles must be a non-empty array`);
  }

  w.roles.forEach((role: unknown, roleIndex: number) => {
    validateRole(role, index, roleIndex);
  });
}

function validateRole(role: unknown, workIndex: number, roleIndex: number): void {
  const r = role as Record<string, unknown>;
  const required = ['id', 'position', 'fromDate', 'highlights', 'skills'];
  
  for (const field of required) {
    if (!r[field]) {
      throw new Error(`WorkExperience[${workIndex}].roles[${roleIndex}]: missing required field '${field}'`);
    }
  }

  if (!Array.isArray(r.highlights)) {
    throw new Error(`WorkExperience[${workIndex}].roles[${roleIndex}]: highlights must be an array`);
  }

  r.highlights.forEach((highlight: unknown, hIndex: number) => {
    const h = highlight as Record<string, unknown>;
    if (!h.text || typeof h.text !== 'string') {
      throw new Error(`WorkExperience[${workIndex}].roles[${roleIndex}].highlights[${hIndex}]: missing or invalid 'text'`);
    }
    if (!Array.isArray(h.labels)) {
      throw new Error(`WorkExperience[${workIndex}].roles[${roleIndex}].highlights[${hIndex}]: labels must be an array`);
    }
  });

  if (!Array.isArray(r.skills)) {
    throw new Error(`WorkExperience[${workIndex}].roles[${roleIndex}]: skills must be an array`);
  }

  r.skills.forEach((skill: unknown, sIndex: number) => {
    const s = skill as Record<string, unknown>;
    if (!s.name || typeof s.name !== 'string') {
      throw new Error(`WorkExperience[${workIndex}].roles[${roleIndex}].skills[${sIndex}]: missing or invalid 'name'`);
    }
    if (!s.label || typeof s.label !== 'string') {
      throw new Error(`WorkExperience[${workIndex}].roles[${roleIndex}].skills[${sIndex}]: missing or invalid 'label'`);
    }
  });
}

function validatePublication(pub: unknown, index: number): void {
  const p = pub as Record<string, unknown>;
  const required = ['id', 'title', 'authors', 'venue', 'date', 'type', 'labels'];
  
  for (const field of required) {
    if (!p[field]) {
      throw new Error(`Publication[${index}]: missing required field '${field}'`);
    }
  }

  if (!Array.isArray(p.authors)) {
    throw new Error(`Publication[${index}]: authors must be an array`);
  }

  if (!Array.isArray(p.labels)) {
    throw new Error(`Publication[${index}]: labels must be an array`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const dataFile = args[0] || DEFAULT_DATA_FILE;

  console.log(`\n🔍 Validating resume data: ${dataFile}\n`);

  try {
    // Check if file exists
    const filePath = path.resolve(process.cwd(), dataFile);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Error: File not found: ${filePath}`);
      process.exit(1);
    }

    // Read and parse JSON
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    let data: ResumeData;
    
    try {
      data = JSON.parse(fileContent);
    } catch (error) {
      console.error(`❌ JSON Parse Error: ${(error as Error).message}`);
      process.exit(1);
    }

    // Validate against TypeScript types
    validateResumeData(data);

    console.log('✅ Validation successful! Your resume data is valid.\n');
    
    // Print summary
    console.log('📊 Summary:');
    console.log(`   • Profile: ${data.profile.name}`);
    console.log(`   • Education entries: ${data.education.length}`);
    console.log(`   • Work experiences: ${data.workExperience.length}`);
    
    const totalRoles = data.workExperience.reduce((sum, exp) => sum + exp.roles.length, 0);
    console.log(`   • Total roles: ${totalRoles}`);
    
    console.log(`   • Publications: ${data.publications.length}`);
    
    // Count unique labels
    const allLabels = new Set<string>();
    data.education.forEach(edu => edu.labels.forEach(l => allLabels.add(l)));
    data.workExperience.forEach(exp => 
      exp.roles.forEach(role => {
        role.highlights.forEach(h => h.labels.forEach(l => allLabels.add(l)));
        role.skills.forEach(s => allLabels.add(s.label));
      })
    );
    data.publications.forEach(pub => pub.labels.forEach(l => allLabels.add(l)));
    
    console.log(`   • Unique labels: ${allLabels.size}`);
    console.log(`   • Labels: ${Array.from(allLabels).join(', ')}\n`);

  } catch (error) {
    console.error(`❌ Validation Error: ${(error as Error).message}\n`);
    process.exit(1);
  }
}

main();
