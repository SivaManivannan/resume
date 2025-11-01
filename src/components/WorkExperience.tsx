import type { WorkExperience as WorkExperienceType, Internship } from '../types/resume';
import './WorkExperience.css';

interface WorkExperienceProps {
  workExperience: WorkExperienceType[];
  internships: Internship[];
}

function WorkExperience({ workExperience, internships }: WorkExperienceProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Present';
    const [year, month] = dateStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <section className="work-experience-section">
      <div className="experience-list">
        {workExperience.map(exp => (
          <div key={exp.id} className="experience-item">
            <div className="experience-header">
              <div className="experience-main">
                <h3 className="company-name">{exp.company}</h3>
              </div>
              <div className="experience-meta">
                <span className="company-dates">
                  {formatDate(exp.fromDate)} - {exp.current ? 'Present' : formatDate(exp.toDate)}
                </span>
                <span className="company-location">{exp.location}</span>
              </div>
            </div>

            <div className="roles-list">
              {exp.roles.map(role => (
                <div key={role.id} className="role-item">
                  <div className="role-header">
                    <h4 className="role-position">{role.position}</h4>
                    {role.fromDate && (
                      <span className="role-dates">
                        {formatDate(role.fromDate)} - {role.toDate ? formatDate(role.toDate) : 'Present'}
                      </span>
                    )}
                  </div>

                  {role.description && (
                    <p className="role-description">{role.description}</p>
                  )}

                  {role.highlights.length > 0 && (
                    <ul className="highlights-list">
                      {role.highlights.map((highlight, index) => (
                        <li key={index} className="highlight-item">
                          <span className="highlight-text">{highlight.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {role.skills.length > 0 && (
                    <div className="role-skills">
                      <span className="skills-label">Skills:</span>
                      <div className="skills-tags">
                        {role.skills.map(skill => (
                          <span key={skill.name} className="skill-tag" title={skill.label}>
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Internships Section */}
        {internships.length > 0 && (
          <h2 className="section-title">Internships</h2>
        )}
        
        {internships.map(intern => (
          <div key={intern.id} className="experience-item">
            <div className="experience-header">
              <div className="experience-main">
                <h3 className="company-name">{intern.company}</h3>
              </div>
              <div className="experience-meta">
                <span className="company-dates">
                  {formatDate(intern.fromDate)} - {formatDate(intern.toDate)}
                </span>
                <span className="company-location">{intern.location}</span>
              </div>
            </div>

            <div className="roles-list">
              {intern.roles.map(role => (
                <div key={role.id} className="role-item">
                  <div className="role-header">
                    <h4 className="role-position">{role.position}</h4>
                    {role.fromDate && (
                      <span className="role-dates">
                        {formatDate(role.fromDate)} - {role.toDate ? formatDate(role.toDate) : 'Present'}
                      </span>
                    )}
                  </div>

                  {role.description && (
                    <p className="role-description">{role.description}</p>
                  )}

                  {role.highlights.length > 0 && (
                    <ul className="highlights-list">
                      {role.highlights.map((highlight, index) => (
                        <li key={index} className="highlight-item">
                          <span className="highlight-text">{highlight.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {role.skills.length > 0 && (
                    <div className="role-skills">
                      <span className="skills-label">Skills:</span>
                      <div className="skills-tags">
                        {role.skills.map(skill => (
                          <span key={skill.name} className="skill-tag" title={skill.label}>
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorkExperience;

