/* ==========================================================================
   INTERACTIVE DEVELOPER TERMINAL ENGINE (WordPress, SaaS & AI Automation Portfolio)
   ========================================================================== */

const TERMINAL_WELCOME = `
Initializing developer_shell_v1.0.4...
Ready. Host: github.io | User: client_guest

* Type 'help' to view available operations.
* Or click any shortcut below to query directly:
  [<span class="term-btn-link" data-cmd="about">about</span>] [<span class="term-btn-link" data-cmd="skills">skills</span>] [<span class="term-btn-link" data-cmd="plugins">plugins</span>] [<span class="term-btn-link" data-cmd="saas">saas</span>] [<span class="term-btn-link" data-cmd="ai">ai</span>] [<span class="term-btn-link" data-cmd="contact">contact</span>]
`;

const COMMANDS = {
  help: `
Available commands:
  about    - Summary of professional experience and focus
  skills   - Technical stack and development competencies
  plugins  - Core WordPress custom plugin architecture expertise
  saas     - SaaS applications, APIs, and database engineering
  ai       - LLM integrations, automations, and workflow design
  contact  - Secure channels to schedule a discovery call
  clear    - Flush console buffer
  help     - Renders this operations menu
`,
  about: `
[SYSTEM SUMMARY]
A highly technical engineering specialist working at the intersection of
WordPress Core, Full-stack SaaS structures, and Autonomous AI systems.
Focuses on scalable backends, clean API hooking, and optimized database indexing.
- 5+ Years Active Production Engineering
- Specialization: Automated pipelines & secure static/dynamic systems.
`,
  skills: `
[CORE TECHNICAL COMPONENT PROFICIENCY]
* WordPress: PHP, WooCommerce SDK, Gutenberg (React), Hook/Filter Optimizations
* SaaS Apps: Node.js, TypeScript, React.js, Python, PostgreSQL, REST/GraphQL APIs
* AI & Flow: OpenAI/Claude APIs, n8n, Make.com, LangChain, Pinecone Vector DB
* Workflow : Git, Linux, Docker, secure CI/CD, Serverless, AWS/Vercel
`,
  plugins: `
[CUSTOM WORDPRESS PLUGINS ARCHITECTURE]
Building lightweight, performance-tuned plugins without overhead:
- Advanced REST API endpoints for external headless app connection.
- Tailored WooCommerce gateway modifications & custom checkout integrations.
- Gutenberg block suites rendering native React modules with 0ms delay.
- Security hardiness compliant with OWASP standards (escaping/sanitizing inputs).
`,
  saas: `
[SaaS ENGINEERING METHODOLOGY]
Constructing robust, secure software subscription architectures:
- High-efficiency database indexing yielding lightning-fast query retrievals.
- Full security compliance: JWT authentication, OAuth 2.0, SSL gateways.
- Third-party webhook sync: Stripe, Salesforce, HubSpot, Mailchimp APIs.
- Modular dashboard interfaces rendering real-time business performance.
`,
  ai: `
[AI & WORKFLOW AUTOMATION ENGINE]
Automating operational workflows using state-of-the-art LLMs:
- Custom retrieval engines leveraging vector embeddings and search indexing.
- Fully-autonomous agent loops monitoring incoming support queues.
- Visual workflow structures connecting n8n, Make, or Zapier to local databases.
- Multi-tier AI content scheduling networks publishing directly to WordPress.
`,
  contact: `
[COMMUNICATION PATHWAYS]
Ready to scale your next infrastructure development:
- Direct Email: karamaq07@gmail.com
- Github Pages: karamaq07.github.io
- Discovery Call: Use our scheduler below or type 'contact' in the Chatbot.
- Status: Accepting high-profile contracts.
`
};

function initTerminal() {
  const termBody = document.getElementById('terminal-body');
  const termInput = document.getElementById('terminal-input');
  const termForm = document.getElementById('terminal-form');

  if (!termBody || !termInput || !termForm) return;

  // Render welcome message
  printOutput(TERMINAL_WELCOME);

  // Focus input when terminal is clicked
  const terminal = document.querySelector('.terminal');
  terminal.addEventListener('click', (e) => {
    // If user is clicking a shortcut link, run command
    if (e.target.classList.contains('term-btn-link')) {
      const cmd = e.target.getAttribute('data-cmd');
      runTerminalCommand(cmd);
      return;
    }
    termInput.focus();
  });

  // Handle command submissions
  termForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cmd = termInput.value.trim().toLowerCase();
    termInput.value = '';
    
    if (cmd) {
      runTerminalCommand(cmd);
    }
  });

  // Helper function to print line in terminal
  function printOutput(htmlContent) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = htmlContent.trim().replace(/\n/g, '<br>');
    termBody.appendChild(line);
    
    // Auto-scroll to bottom
    termBody.scrollTop = termBody.scrollHeight;
  }

  // Handle executing a command
  function runTerminalCommand(cmd) {
    // Print user command prompt line
    printOutput(`<span class="terminal-prompt">guest@github.io:~$</span> ${cmd}`);

    if (cmd === 'clear') {
      termBody.innerHTML = '';
      printOutput(TERMINAL_WELCOME);
      return;
    }

    if (COMMANDS.hasOwnProperty(cmd)) {
      setTimeout(() => {
        printOutput(COMMANDS[cmd]);
      }, 100);
    } else {
      setTimeout(() => {
        printOutput(`bash: command not found: ${cmd}. Type 'help' for valid options.`);
      }, 100);
    }
  }

  // Perform typing simulation for npx loading portfolio
  simulateStartSequence();

  function simulateStartSequence() {
    termInput.disabled = true;
    termBody.innerHTML = '';
    
    const introLines = [
      "guest@github.io:~$ npx run load-developer-portfolio",
      "Fetching system modules...",
      "Resolving wordpress-core-sdk @v6.2.2...",
      "Resolving saas-dashboard-telemetry @v3.1.0...",
      "Resolving ai-automation-agents @v1.8.0...",
      "Success! Mounting dashboard console...\n"
    ];

    let lineIndex = 0;
    
    function printNextIntroLine() {
      if (lineIndex < introLines.length) {
        printOutput(introLines[lineIndex]);
        lineIndex++;
        setTimeout(printNextIntroLine, lineIndex === 1 ? 500 : 250);
      } else {
        termInput.disabled = false;
        printOutput(TERMINAL_WELCOME);
        termInput.focus();
      }
    }

    printNextIntroLine();
  }
}

// Export initialization
document.addEventListener('DOMContentLoaded', initTerminal);
