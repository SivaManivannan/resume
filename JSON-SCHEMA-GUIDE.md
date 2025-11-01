# JSON Schema Guide

Complete reference for the resume data structure with examples and best practices.

## Table of Contents
1. [Profile](#profile)
2. [Education](#education)
3. [Work Experience](#work-experience)
4. [Publications](#publications)
5. [Available Labels](#available-labels)
6. [Best Practices](#best-practices)

---

## Profile

Personal information and contact details.

### Required Fields
- `name` (string): Your full name
- `title` (string): Professional title or tagline
- `summary` (string): Brief professional summary (2-3 sentences)
- `email` (string): Email address
- `linkedin` (string): Full LinkedIn URL
- `github` (string): Full GitHub URL

### Example
```json
{
  "profile": {
    "name": "Dr. Jane Smith",
    "title": "Senior Technical Leader | Computational Scientist",
    "summary": "Multidisciplinary engineer with 15+ years of experience...",
    "email": "jane.smith@example.com",
    "linkedin": "https://linkedin.com/in/janesmith",
    "github": "https://github.com/janesmith"
  }
}
```

---

## Education

Academic qualifications with optional coursework.

### Required Fields
- `id` (string): Unique identifier (e.g., "edu1", "edu2")
- `institution` (string): University or school name
- `location` (string): City, Country
- `degree` (string): Degree type and name
- `field` (string): Field of study
- `fromDate` (string): Start date in YYYY-MM format
- `toDate` (string): End date in YYYY-MM format
- `labels` (array): List of relevant labels

### Optional Fields
- `description` (string): Additional details or thesis title
- `coursework` (array of strings): List of relevant courses

### Example
```json
{
  "education": [
    {
      "id": "edu1",
      "institution": "Stanford University",
      "location": "Stanford, CA",
      "degree": "Ph.D. in Mechanical Engineering",
      "field": "Computational Solid Mechanics",
      "fromDate": "2006-09",
      "toDate": "2010-06",
      "description": "Dissertation: 'Advanced FEA Methods'",
      "coursework": [
        "Advanced Finite Element Analysis",
        "Continuum Mechanics",
        "Computational Fluid Dynamics"
      ],
      "labels": ["Solid Mechanics", "Aerospace"]
    }
  ]
}
```

---

## Work Experience

Professional experience with nested roles, each containing highlights and skills.

### Company-Level Required Fields
- `id` (string): Unique identifier
- `company` (string): Company name
- `location` (string): City, Country
- `fromDate` (string): Start date (YYYY-MM)
- `current` (boolean): true if still employed
- `roles` (array): List of roles at this company

### Company-Level Optional Fields
- `toDate` (string): End date if not current

### Role-Level Required Fields
- `id` (string): Unique identifier
- `position` (string): Job title
- `highlights` (array): List of achievements/responsibilities
- `skills` (array): Skills used in this role

### Role-Level Optional Fields
- `fromDate` (string): Start date (YYYY-MM) - Optional if only one role (dates shown at company level)
- `toDate` (string): End date (omit if current role)
- `description` (string): Brief role overview

### Highlight Structure
- `text` (string): Achievement or responsibility
- `labels` (array): Labels for this specific highlight

### Skill Structure
- `name` (string): Skill name
- `label` (string): Single category label

### Example
```json
{
  "workExperience": [
    {
      "id": "work1",
      "company": "TechCorp Energy",
      "location": "Houston, TX",
      "fromDate": "2017-01",
      "toDate": "2024-12",
      "current": false,
      "roles": [
        {
          "id": "role1",
          "position": "Senior Engineer",
          "fromDate": "2017-01",
          "toDate": "2019-06",
          "description": "Led reservoir modeling projects",
          "highlights": [
            {
              "text": "Developed simulation workflows reducing time by 40%",
              "labels": ["Geoscience", "Software Development"]
            },
            {
              "text": "Led team of 6 engineers",
              "labels": ["Management"]
            }
          ],
          "skills": [
            { "name": "Python", "label": "Software Development" },
            { "name": "Petrel", "label": "Geoscience" },
            { "name": "Team Leadership", "label": "Management" }
          ]
        },
        {
          "id": "role2",
          "position": "Engineering Manager",
          "fromDate": "2019-07",
          "toDate": "2024-12",
          "highlights": [
            {
              "text": "Managed team of 12 engineers",
              "labels": ["Management"]
            }
          ],
          "skills": [
            { "name": "Strategic Planning", "label": "Management" },
            { "name": "AWS", "label": "Software Development" }
          ]
        }
      ]
    }
  ]
}
```

### Key Design Decisions

1. **Nested Roles**: Allows capturing promotions and role changes within the same company
2. **Highlight-Level Labels**: Enables filtering by specific achievements, not just entire roles
3. **Skill-Label Association**: Each skill has ONE label for clear categorization

---

## Publications

Research papers, conference presentations, patents, etc.

### Required Fields
- `id` (string): Unique identifier
- `title` (string): Publication title
- `authors` (array): List of author names
- `venue` (string): Journal, conference, or publication venue
- `date` (string): Publication date (YYYY-MM)
- `type` (string): Type (e.g., "journal", "conference", "patent", "thesis")
- `labels` (array): List of relevant labels

### Optional Fields
- `link` (string): URL to paper (DOI, arXiv, etc.)
- `description` (string): Brief summary

### Example
```json
{
  "publications": [
    {
      "id": "pub1",
      "title": "Machine Learning in Seismic Analysis",
      "authors": ["Smith, J.", "Johnson, A."],
      "venue": "SPE Annual Technical Conference",
      "date": "2023-10",
      "type": "conference",
      "link": "https://doi.org/10.2118/example",
      "description": "Novel approach to automated interpretation",
      "labels": ["Geoscience", "Software Development", "Oil & Gas"]
    },
    {
      "id": "pub2",
      "title": "Advanced Finite Element Methods",
      "authors": ["Smith, J."],
      "venue": "Ph.D. Dissertation, Stanford University",
      "date": "2010-06",
      "type": "thesis",
      "link": "https://searchworks.stanford.edu/example",
      "labels": ["Solid Mechanics"]
    }
  ]
}
```

### Publication Types

Common types and their icons:
- `journal` → 📄
- `conference` → 🎤
- `patent` → ⚖️
- `thesis` → 🎓
- Other types will display 📚

---

## Available Labels

Defines all possible labels organized by category. These labels should match the labels used throughout education, work experience, and publications.

### Structure
```json
{
  "availableLabels": {
    "technical": ["Label1", "Label2"],
    "domain": ["Label3"],
    "industry": ["Label4", "Label5"]
  }
}
```

### Example
```json
{
  "availableLabels": {
    "technical": [
      "Solid Mechanics",
      "Geoscience",
      "Software Development"
    ],
    "domain": [
      "Management"
    ],
    "industry": [
      "Aerospace",
      "Oil & Gas"
    ]
  }
}
```

### Purpose

1. **Filter Organization**: Labels are grouped in the filter panel by category
2. **Consistency Check**: Helps ensure label names are consistent
3. **Documentation**: Shows all areas of expertise at a glance

---

## Best Practices

### 1. ID Management
- Use descriptive prefixes: `edu1`, `work1`, `role1`, `pub1`
- Keep IDs unique across the entire document
- Don't reuse IDs even after deleting entries

### 2. Date Format
- Always use `YYYY-MM` (e.g., "2020-06" for June 2020)
- For current positions, omit `toDate` and set `current: true`
- Company dates should span all role dates
- For single-role positions, dates can be omitted at role level to avoid duplication

### 3. Label Consistency
- Use exact same spelling and capitalization
- Define all labels in `availableLabels`
- Example: "Software Development" not "software development" or "Software Dev"

### 4. Label Strategy
- **Technical**: Skills and technical areas (Python, FEA, ML)
- **Domain**: Cross-cutting themes (Management, Research)
- **Industry**: Specific industries (Aerospace, Healthcare)

### 5. Highlight Labels
- Each highlight can have multiple labels
- Use specific labels for each achievement
- Example: A highlight about "Built ML pipeline for production" → ["Software Development", "Oil & Gas"]

### 6. Skills Management
- Each skill has ONE label (its primary category)
- Skills are automatically de-duplicated across roles
- Use consistent skill names (e.g., "Python" not "Python Programming")

### 7. Text Content
- Keep summaries concise (2-3 sentences)
- Use action verbs in highlights
- Include quantifiable achievements when possible

### 8. Optional Fields
- Don't include optional fields with empty values
- Omit entire field rather than using empty string or null
- Exception: Empty arrays `[]` are allowed for `coursework`, `highlights`, `skills`

### 9. Validation
- Run `npm run validate` after every change
- Fix validation errors before deploying
- Keep a backup of working JSON before major changes

---

## Common Patterns

### Multiple Degrees from Same Institution
```json
{
  "education": [
    {
      "id": "edu1",
      "institution": "MIT",
      "degree": "Ph.D.",
      ...
    },
    {
      "id": "edu2",
      "institution": "MIT",
      "degree": "M.S.",
      ...
    }
  ]
}
```

### Long Tenure with Multiple Roles
```json
{
  "workExperience": [
    {
      "company": "BigCorp",
      "fromDate": "2010-01",
      "toDate": "2023-12",
      "roles": [
        { "position": "Engineer", "fromDate": "2010-01", "toDate": "2015-06" },
        { "position": "Senior Engineer", "fromDate": "2015-07", "toDate": "2020-03" },
        { "position": "Principal Engineer", "fromDate": "2020-04", "toDate": "2023-12" }
      ]
    }
  ]
}
```

### Single Role Position
When there's only one role, omit dates at role level to avoid duplication:
```json
{
  "workExperience": [
    {
      "company": "SmallCorp",
      "fromDate": "2018-03",
      "toDate": "2020-05",
      "current": false,
      "roles": [
        {
          "id": "role1",
          "position": "Software Engineer",
          "description": "Full-stack development",
          "highlights": [
            { "text": "Built microservices architecture", "labels": ["Software Development"] }
          ],
          "skills": [
            { "name": "React", "label": "Software Development" },
            { "name": "Node.js", "label": "Software Development" }
          ]
        }
      ]
    }
  ]
}
```

### Cross-Disciplinary Skills
```json
{
  "skills": [
    { "name": "Reservoir Simulation", "label": "Geoscience" },
    { "name": "Python", "label": "Software Development" },
    { "name": "Machine Learning", "label": "Software Development" },
    { "name": "Team Leadership", "label": "Management" }
  ]
}
```

---

## Validation Checklist

Before deploying, verify:

- [ ] All required fields present
- [ ] All dates in YYYY-MM format
- [ ] All IDs unique
- [ ] Labels match those in `availableLabels`
- [ ] Company dates encompass all role dates
- [ ] No JSON syntax errors
- [ ] `npm run validate` passes
- [ ] Website displays correctly in dev mode

---

## Example: Complete Entry

Here's a complete work experience entry showing all features:

```json
{
  "id": "work1",
  "company": "Advanced Dynamics Inc.",
  "location": "Seattle, WA",
  "fromDate": "2010-07",
  "toDate": "2016-12",
  "current": false,
  "roles": [
    {
      "id": "role1",
      "position": "Structural Engineer",
      "fromDate": "2010-07",
      "toDate": "2013-05",
      "description": "Performed structural analysis for aircraft components",
      "highlights": [
        {
          "text": "Led FEA for wing structures on next-gen aircraft",
          "labels": ["Solid Mechanics", "Aerospace"]
        },
        {
          "text": "Developed automated workflows using Python",
          "labels": ["Software Development", "Solid Mechanics"]
        }
      ],
      "skills": [
        { "name": "ANSYS", "label": "Solid Mechanics" },
        { "name": "Python", "label": "Software Development" },
        { "name": "CATIA", "label": "Aerospace" }
      ]
    },
    {
      "id": "role2",
      "position": "Lead Engineer",
      "fromDate": "2013-06",
      "toDate": "2016-12",
      "description": "Led computational methods group",
      "highlights": [
        {
          "text": "Managed team of 5 engineers and $2M budget",
          "labels": ["Management", "Aerospace"]
        },
        {
          "text": "Developed in-house FEA tools using C++",
          "labels": ["Software Development", "Solid Mechanics"]
        }
      ],
      "skills": [
        { "name": "C++", "label": "Software Development" },
        { "name": "Team Leadership", "label": "Management" },
        { "name": "HPC", "label": "Software Development" }
      ]
    }
  ]
}
```

This structure enables:
- ✅ Filtering by any label combination
- ✅ Date range filtering across roles
- ✅ Skill extraction and grouping
- ✅ Clear career progression visualization
- ✅ Job-specific CV generation

---

**Questions?** Check the [README.md](README.md) or [QUICKSTART.md](QUICKSTART.md)


