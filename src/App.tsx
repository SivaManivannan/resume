import { useState, useEffect, useMemo } from 'react';
import type { ResumeData, Skill } from './types/resume';
import Profile from './components/Profile';
import Education from './components/Education';
import WorkExperience from './components/WorkExperience';
import Publications from './components/Publications';
import Skills from './components/Skills';
import './App.css';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'work' | 'education' | 'publications'>('work');

  useEffect(() => {
    const basePath = import.meta.env.BASE_URL;
    fetch(`${basePath}data/resume-data.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load resume data');
        }
        return response.json();
      })
      .then(data => {
        setResumeData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Extract all unique skills from work experience and internships
  const allSkills = useMemo(() => {
    if (!resumeData) return [];
    
    const skillsMap = new Map<string, Skill & { fromDate: string; toDate?: string }>();
    
    // Add skills from work experience
    resumeData.workExperience.forEach(exp => {
      exp.roles.forEach(role => {
        role.skills.forEach(skill => {
          const existing = skillsMap.get(skill.name);
          if (!existing || role.fromDate < existing.fromDate) {
            skillsMap.set(skill.name, {
              ...skill,
              fromDate: role.fromDate,
              toDate: role.toDate,
            });
          }
        });
      });
    });
    
    // Add skills from internships
    resumeData.internships.forEach(intern => {
      intern.roles.forEach(role => {
        role.skills.forEach(skill => {
          const existing = skillsMap.get(skill.name);
          if (!existing || role.fromDate < existing.fromDate) {
            skillsMap.set(skill.name, {
              ...skill,
              fromDate: role.fromDate,
              toDate: role.toDate,
            });
          }
        });
      });
    });
    
    return Array.from(skillsMap.values());
  }, [resumeData]);

  // Filter data based on selected labels
  const filteredData = useMemo(() => {
    if (!resumeData) return null;
    
    const hasActiveFilters = selectedLabels.length > 0;
    
    if (!hasActiveFilters) return resumeData;
    
    // Filter education
    const filteredEducation = resumeData.education.filter(edu => {
      return selectedLabels.some(label => edu.labels.includes(label));
    });
    
    // Filter work experience
    const filteredWork = resumeData.workExperience
      .map(exp => {
        const filteredRoles = exp.roles
          .map(role => {
            const filteredHighlights = role.highlights.filter(highlight => {
              return selectedLabels.some(label => highlight.labels.includes(label));
            });
            
            const filteredSkills = role.skills.filter(skill => {
              return selectedLabels.includes(skill.label);
            });
            
            // Only include role if it has highlights or skills after filtering
            if (filteredHighlights.length > 0 || filteredSkills.length > 0) {
              return {
                ...role,
                highlights: filteredHighlights,
                skills: filteredSkills,
              };
            }
            return null;
          })
          .filter(role => role !== null);
        
        if (filteredRoles.length > 0) {
          return {
            ...exp,
            roles: filteredRoles,
          };
        }
        return null;
      })
      .filter(exp => exp !== null);
    
    // Filter internships
    const filteredInternships = resumeData.internships
      .map(intern => {
        const filteredRoles = intern.roles
          .map(role => {
            const filteredHighlights = role.highlights.filter(highlight => {
              return selectedLabels.some(label => highlight.labels.includes(label));
            });
            
            const filteredSkills = role.skills.filter(skill => {
              return selectedLabels.includes(skill.label);
            });
            
            // Only include role if it has highlights or skills after filtering
            if (filteredHighlights.length > 0 || filteredSkills.length > 0) {
              return {
                ...role,
                highlights: filteredHighlights,
                skills: filteredSkills,
              };
            }
            return null;
          })
          .filter(role => role !== null);
        
        if (filteredRoles.length > 0) {
          return {
            ...intern,
            roles: filteredRoles,
          };
        }
        return null;
      })
      .filter(intern => intern !== null);
    
    // Filter publications
    const filteredPublications = resumeData.publications.filter(pub => {
      return selectedLabels.some(label => pub.labels.includes(label));
    });
    
    return {
      ...resumeData,
      education: filteredEducation,
      workExperience: filteredWork as typeof resumeData.workExperience,
      internships: filteredInternships as typeof resumeData.internships,
      publications: filteredPublications,
    };
  }, [resumeData, selectedLabels]);

  // Filter skills based on selected labels
  const filteredSkills = useMemo(() => {
    if (selectedLabels.length === 0) return allSkills;
    return allSkills.filter(skill => selectedLabels.includes(skill.label));
  }, [allSkills, selectedLabels]);

  const toggleLabel = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter(l => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading resume...</p>
      </div>
    );
  }

  if (error || !resumeData || !filteredData) {
    return (
      <div className="error-container">
        <h2>Error Loading Resume</h2>
        <p>{error || 'Failed to load resume data'}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="main-content">
        <Profile profile={resumeData.profile} />
        
        <div className="content-layout">
          <aside className="left-sidebar">
            <div className="filter-section">
              <h3 className="sidebar-title">Filters</h3>
              <span className="filter-prompt">View my experience in:</span>
              <div className="filter-buttons">
                {resumeData.availableLabels.map(label => (
                  <button
                    key={label}
                    className={`filter-btn ${selectedLabels.includes(label) ? 'active' : ''}`}
                    onClick={() => toggleLabel(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {selectedLabels.length > 0 && (
                <button className="clear-btn" onClick={() => setSelectedLabels([])}>
                  Clear filters
                </button>
              )}
            </div>

            {filteredSkills.length > 0 && (
              <Skills skills={filteredSkills} languages={resumeData.languages} />
            )}
          </aside>

          <div className="main-column">
            <div className="tabs-container">
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`}
                  onClick={() => setActiveTab('work')}
                >
                  Work Experience
                </button>
                <button
                  className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                  onClick={() => setActiveTab('education')}
                >
                  Education
                </button>
                <button
                  className={`tab-btn ${activeTab === 'publications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('publications')}
                >
                  Publications
                </button>
              </div>
            </div>
            {activeTab === 'work' && (
              <>
                {filteredData.workExperience.length > 0 || filteredData.internships.length > 0 ? (
                  <WorkExperience 
                    workExperience={filteredData.workExperience}
                    internships={filteredData.internships}
                  />
                ) : (
                  <div className="no-results">
                    <h2>No experience found</h2>
                    <p>Try adjusting your filters to see more content.</p>
                  </div>
                )}
              </>
            )}
            
            {activeTab === 'education' && (
              <>
                {filteredData.education.length > 0 ? (
                  <Education education={filteredData.education} />
                ) : (
                  <div className="no-results">
                    <h2>No education found</h2>
                    <p>Try adjusting your filters to see more content.</p>
                  </div>
                )}
              </>
            )}
            
            {activeTab === 'publications' && (
              <>
                {filteredData.publications.length > 0 ? (
                  <Publications publications={filteredData.publications} />
                ) : (
                  <div className="no-results">
                    <h2>No publications found</h2>
                    <p>Try adjusting your filters to see more content.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
