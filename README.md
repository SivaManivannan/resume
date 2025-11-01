# Resume Website

A modern, interactive resume website built with React and TypeScript. Features label-based filtering, date range filtering, and responsive design. Perfect for showcasing your professional experience!

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

## 📝 Making Changes

### Update Your Resume Data

**All resume data is in one file:** `public/data/resume-data.json`

This JSON file contains:
- **Profile**: Name, title, summary, contact info
- **Education**: Degrees, institutions, coursework
- **Work Experience**: Companies, roles, achievements, skills
- **Publications**: Papers, conferences, journals
- **Available Labels**: Categories for filtering (Technical, Domain, Industry)

💡 **See [JSON-SCHEMA-GUIDE.md](JSON-SCHEMA-GUIDE.md) for detailed schema and examples**

### Customize Styling

**Edit colors in:** `src/App.css`

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #7c3aed;
  /* Modify any colors here */
}
```

**Component styles:** `src/components/*.css`

## ✅ Testing

### 1. Validate Your Data

**Always validate after editing the JSON file:**

```bash
npm run validate
```

This checks:
- ✅ JSON syntax is correct
- ✅ All required fields are present
- ✅ Data types are valid
- ✅ Structure matches the schema

### 2. Lint Your Code

```bash
npm run lint
```

### 3. Build Test

```bash
# Build for production
npm run build

# Preview the build locally
npm run preview
```

Visit [http://localhost:4173/resume/](http://localhost:4173/resume/) to test the production build.

## 🚀 Deployment

### GitHub Pages (Automated)

**The repository is configured for automatic deployment!**

1. **Enable GitHub Pages:**
   - Go to repository **Settings → Pages**
   - Set **Source** to "GitHub Actions"

2. **Deploy:**
   ```bash
   git add .
   git commit -m "Update resume"
   git push origin main
   ```

3. **Automatic checks run on every push:**
   - ✅ ESLint validation
   - ✅ Resume data validation
   - ✅ Build process
   - ✅ Auto-deploy to GitHub Pages

4. **Your site will be live at:**
   - `https://[username].github.io/resume/`

### Other Platforms

```bash
# Build
npm run build

# The 'dist' folder contains your site
```

**Deploy the `dist` folder to:**
- **Netlify**: Drag & drop the `dist` folder
- **Vercel**: `vercel --prod`
- **Any static host**: Upload contents of `dist`

**Note:** If deploying elsewhere, update `base` in `vite.config.ts`:
```typescript
base: '/', // Change from '/resume/' to '/' for root deployment
```

## 📁 Project Structure

```
├── public/data/resume-data.json   ← Your resume data (edit this!)
├── src/
│   ├── components/                ← React components
│   ├── types/resume.ts           ← TypeScript types
│   └── App.tsx                   ← Main application
├── .github/workflows/deploy.yml  ← CI/CD pipeline
└── vite.config.ts                ← Build configuration
```

## 💡 Quick Tips

1. **After editing JSON**: Always run `npm run validate`
2. **Consistent labels**: Use exact same text for filtering to work
3. **Date format**: Always use `YYYY-MM` (e.g., `2020-06`)
4. **Unique IDs**: Each entry needs a unique `id` field

---

Built with React + TypeScript + Vite | [View JSON Schema Guide](JSON-SCHEMA-GUIDE.md)
