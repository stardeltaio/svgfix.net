# Astro + Claude Code Template

This template provides a pre-configured Claude Code setup for Astro projects with best practices, agents, and documentation structure optimized for content-focused static sites.

## What's Included

```
template-astro/
├── .claude/
│   ├── agents/               # Pre-configured Claude Code agents
│   │   ├── planner.md
│   │   ├── frontend-developer.md
│   │   ├── architecture-guardian.md
│   │   ├── test-coverage-enforcer.md
│   │   ├── documentation-monitor.md
│   │   ├── repo-hygiene-enforcer.md
│   │   └── release-manager.md
│   └── settings.local.json   # Permission templates
├── CLAUDE.md                 # Main authority file with Astro-specific placeholders
└── README.md                 # This file
```

## Quick Start

### 1. Copy to Your Project

```bash
# Copy the entire .claude directory and CLAUDE.md to your Astro project root
cp -r template-astro/.claude /path/to/your-astro-project/
cp template-astro/CLAUDE.md /path/to/your-astro-project/
```

### 2. Customize CLAUDE.md

Open `CLAUDE.md` and search for `[PLACEHOLDER:` - you'll find detailed instructions for each section.

**Key placeholders to replace:**
- `[BUSINESS_LOGIC]` - Name your core logic folder (e.g., `lib`, `utils`) - or delete if not needed
- `[PLACEHOLDER: Project Intent]` - Your project description
- `[PLACEHOLDER: Core Principles]` - Your project's fundamental rules
- `[PLACEHOLDER: Technology Stack]` - Your specific tech stack (which UI framework islands, CMS, etc.)
- `[PLACEHOLDER: Key Commands]` - Your development commands

### 3. Astro-Specific Setup

After copying the template:

1. **Initialize Content Collections** (if using):
   ```bash
   # Create src/content/config.ts with your schemas
   mkdir -p src/content
   ```

2. **Configure Integrations**:
   ```bash
   pnpm astro add vue       # or react, svelte, etc.
   pnpm astro add tailwind  # if using Tailwind
   ```

3. **Set Up Testing**:
   ```bash
   # Add Vitest for unit tests
   pnpm add -D vitest

   # Add Playwright for E2E tests
   pnpm create playwright
   ```

## Best Practices for Astro

### For Islands

1. **Static by default** - Only add `client:*` when needed
2. **Use client:visible** - For below-fold interactive content
3. **Use client:idle** - For non-critical interactivity
4. **Avoid client:load** - Only for critical, above-fold interactivity

### For Content Collections

1. **Always define schemas** - Use Zod for type safety
2. **Organize by type** - Separate blogs, docs, projects, etc.
3. **Validate frontmatter** - Test schemas with valid/invalid data
4. **Use references** - Link between collections when needed

## Common Astro Project Types

### Documentation Site
- Set up content collections for docs
- Add search with Pagefind
- Configure versioning if needed
- Add code syntax highlighting (Shiki)

### Blog
- Content collections for blog posts
- RSS feed generation
- Sitemap generation
- Reading time calculation
- Tag/category taxonomy

### Marketing Site
- Contact form with API route
- Newsletter signup
- Interactive pricing calculator (island)
- SEO optimization with schema.org

### Portfolio
- Project showcase with content collections
- Case studies in MDX
- Image optimization with Astro Image
- View transitions for smooth navigation

## Support

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

## License

This template is provided as-is for use with Claude Code + Astro projects.
