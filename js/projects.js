/* ==========================================================================
   PORTFOLIO PROJECTS DATA & FILTERING MODULE (WordPress, SaaS & AI Automation)
   ========================================================================== */

const PROJECTS_DATA = [
  {
    id: 1,
    title: "WooSync Multi-Checkout",
    category: "wordpress",
    description: "An enterprise-grade WordPress plugin optimizing WooCommerce checkout conversions by syncing offline ledgers, Stripe APIs, and multi-currency transactions under 100ms response time.",
    tags: ["PHP", "WordPress Core", "WooCommerce API", "Stripe SDK", "REST API"],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
  },
  {
    id: 2,
    title: "MetricsFlow SaaS",
    category: "saas",
    description: "A subscription-based analytics dashboard rendering real-time business telemetry, server health logs, and MRR forecasting models. Incorporates secure user roles and custom Stripe billing integrations.",
    tags: ["Node.js", "React.js", "Express", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`
  },
  {
    id: 3,
    title: "AIPost AutoPilot",
    category: "ai",
    description: "An intelligent WordPress automation plugin linking custom Gutenberg layouts with OpenAI and Claude APIs. Autonomously generates SEO-focused copy, auto-tags posts, and distributes content to social nodes.",
    tags: ["Python", "PHP", "OpenAI API", "Cron Jobs", "Vector Search"],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"></path><path d="M12 6v12M6 12h12"></path></svg>`
  },
  {
    id: 4,
    title: "LeadFlow CRM Link",
    category: "saas",
    description: "A secure, high-throughput SaaS gateway fetching incoming leads from multiple client capture systems and mapping them dynamically to HubSpot, Salesforce, and custom marketing pipelines.",
    tags: ["TypeScript", "MongoDB", "OAuth 2.0", "Webhooks", "Node.js"],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
  },
  {
    id: 5,
    title: "GutenBlock UI Pro",
    category: "wordpress",
    description: "A lightweight, zero-dependency WordPress plugin introducing advanced, custom Gutenberg blocks built with React. Optimizes front-end load times, producing perfect 100/100 Core Web Vitals.",
    tags: ["React", "JavaScript", "Webpack", "CSS Grid", "Gutenberg Core"],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>`
  },
  {
    id: 6,
    title: "AgentCore Workflows",
    category: "ai",
    description: "An advanced, self-healing workflow automation system built on n8n and Python. Intercepts customer inquiries, performs contextual vector lookup, and runs autonomous email drafting cycles.",
    tags: ["Python", "n8n Workflows", "Pinecone", "Claude 3.5 Sonnet", "Zapier"],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><polyline points="12 22.08 12 12"></polyline></svg>`
  }
];

function initProjectsModule() {
  const projectsGrid = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (!projectsGrid) return;

  // Render initial projects
  renderProjects(PROJECTS_DATA);

  // Set up filter click events
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      
      // Filter projects
      const filteredProjects = filterValue === 'all' 
        ? PROJECTS_DATA 
        : PROJECTS_DATA.filter(project => project.category === filterValue);

      // Animate transition using simple opacity fade
      projectsGrid.style.opacity = '0';
      setTimeout(() => {
        renderProjects(filteredProjects);
        projectsGrid.style.opacity = '1';
      }, 250);
    });
  });
}

function renderProjects(projects) {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  projectsGrid.innerHTML = '';

  if (projects.length === 0) {
    projectsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 3rem 0;">No projects found in this category.</div>`;
    return;
  }

  projects.forEach((proj, index) => {
    // Generate badges based on categories
    let catBadge = '';
    if (proj.category === 'wordpress') {
      catBadge = `<span class="badge badge-wp">WordPress Plugin</span>`;
    } else if (proj.category === 'saas') {
      catBadge = `<span class="badge badge-saas">SaaS Product</span>`;
    } else if (proj.category === 'ai') {
      catBadge = `<span class="badge badge-ai">AI Automation</span>`;
    }

    const card = document.createElement('div');
    card.className = `project-card reveal reveal-scale`;
    card.style.transitionDelay = `${index * 50}ms`;
    
    card.innerHTML = `
      <div class="project-image">
        ${proj.icon}
        <div class="project-category">${catBadge}</div>
      </div>
      <div class="project-details">
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tags">
          ${proj.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
            Live Demo
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
            GitHub
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>
      </div>
    `;

    projectsGrid.appendChild(card);
    
    // Trigger scroll-reveal animation instantly since it was loaded dynamically
    setTimeout(() => {
      card.classList.add('active');
    }, 50);
  });
}

// Export for main script or direct usage
document.addEventListener('DOMContentLoaded', initProjectsModule);
