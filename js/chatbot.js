/* ==========================================================================
   INTERACTIVE AI CHATBOT ASSISTANT ENGINE (WordPress, SaaS & AI Automation)
   ========================================================================== */

const CHAT_RESPONSES = {
  welcome: "Hello! 👋 I am your automated AI Developer Assistant. I can answer questions about development skills, services, project pricing, and scheduling a call. What are you looking to build?",
  
  about: "I am a senior engineering partner specializing in custom WordPress plugin architectures, modular SaaS products, and secure n8n/Make AI automation pipelines. I focus on clean code, performance benchmarks, and zero-bloat integrations.",
  
  stack: "Here is my production technical stack:\n\n* WordPress: PHP, REST APIs, custom Gutenberg block integrations, WooCommerce customizations\n* SaaS Applications: Node.js, Express, React, Python, PostgreSQL, Redis, AWS\n* AI Automation: OpenAI/Claude APIs, n8n, Make.com, Zapier, LangChain vector indexes",
  
  pricing: "I provide flexible, client-first pricing structures:\n\n* Custom WordPress Plugins: Starting from $1,200 (fully responsive, security hardened)\n* Full-Stack SaaS Products: Custom quotes based on user auth, DB structures, and API syncs\n* AI Workflow Automations: Retainers starting at $800/mo or project-based billing\n\nAll solutions include strict testing and 30-day post-launch support.",
  
  contact: "Let's schedule a discovery call to discuss your specifications! You can fill out the contact form on this page, or click below to secure a calendar slot instantly via Calendly/scheduling system.",
  
  unknown: "I understand! To help you best, could you please select one of our quick options below or specify if you're interested in 'WordPress Plugins', 'SaaS Apps', or 'AI Automations'?"
};

function initChatbot() {
  const widget = document.getElementById('chatbot-widget');
  const bubble = document.getElementById('chatbot-bubble');
  const container = document.getElementById('chatbot-container');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const messagesList = document.getElementById('chatbot-messages');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send-btn');
  const quickReplies = document.querySelectorAll('.quick-reply-btn');

  if (!widget || !bubble || !container || !closeBtn || !messagesList || !input || !sendBtn) return;

  let firstOpen = true;

  // Toggle Chat window
  bubble.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  function toggleChat() {
    container.classList.toggle('active');
    
    // Automatically load welcome message upon first click
    if (container.classList.contains('active') && firstOpen) {
      firstOpen = false;
      simulateBotTyping(CHAT_RESPONSES.welcome);
    }
  }

  // Handle Quick Replies
  quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      addUserMessage(btn.textContent);
      
      let botResponse = '';
      if (action === 'about') botResponse = CHAT_RESPONSES.about;
      else if (action === 'stack') botResponse = CHAT_RESPONSES.stack;
      else if (action === 'pricing') botResponse = CHAT_RESPONSES.pricing;
      else if (action === 'contact') botResponse = CHAT_RESPONSES.contact;

      simulateBotTyping(botResponse);
    });
  });

  // Handle User Input Submission
  sendBtn.addEventListener('click', submitUserText);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitUserText();
  });

  function submitUserText() {
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    addUserMessage(text);

    // Evaluate NLP Keywords
    const query = text.toLowerCase();
    let reply = CHAT_RESPONSES.unknown;

    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      reply = "Hi there! Glad you reached out. How can I assist you with your project today?";
    } else if (query.includes('wordpress') || query.includes('plugin') || query.includes('woo') || query.includes('gutenberg')) {
      reply = "I build premium, secure WordPress plugins optimizing WooCommerce custom checkouts, REST APIs, and native React Gutenberg blocks. 100/100 Core Web Vitals guaranteed.";
    } else if (query.includes('saas') || query.includes('app') || query.includes('dashboard') || query.includes('database')) {
      reply = "I construct robust SaaS subscription applications utilizing Node.js, Express, React, PostgreSQL, and Stripe integration. Optimized for scaling securely.";
    } else if (query.includes('ai') || query.includes('automation') || query.includes('agent') || query.includes('n8n') || query.includes('make')) {
      reply = "I design custom LLM workflows (OpenAI/Claude API) and visual automation structures (n8n, Make.com) to save your business hundreds of operations hours.";
    } else if (query.includes('price') || query.includes('cost') || query.includes('quote') || query.includes('fee') || query.includes('rate')) {
      reply = CHAT_RESPONSES.pricing;
    } else if (query.includes('stack') || query.includes('skill') || query.includes('tech') || query.includes('language')) {
      reply = CHAT_RESPONSES.stack;
    } else if (query.includes('hire') || query.includes('call') || query.includes('contact') || query.includes('meet') || query.includes('book')) {
      reply = CHAT_RESPONSES.contact;
    }

    simulateBotTyping(reply);
  }

  // Add User message bubble
  function addUserMessage(message) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg user';
    msg.innerHTML = `
      <div class="chat-bubble">${escapeHtml(message)}</div>
      <div class="chat-timestamp">${getCurrentTime()}</div>
    `;
    messagesList.appendChild(msg);
    scrollChatToBottom();
  }

  // Simulated Typing & bot message bubble
  function simulateBotTyping(responseContent) {
    // 1. Render typing bubble
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-msg bot typing';
    typingBubble.innerHTML = `
      <div class="chat-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    messagesList.appendChild(typingBubble);
    scrollChatToBottom();

    // 2. Remove typing and render actual response after a short delay
    setTimeout(() => {
      typingBubble.remove();
      
      const msg = document.createElement('div');
      msg.className = 'chat-msg bot';
      msg.innerHTML = `
        <div class="chat-bubble">${responseContent.replace(/\n/g, '<br>')}</div>
        <div class="chat-timestamp">${getCurrentTime()}</div>
      `;
      messagesList.appendChild(msg);
      scrollChatToBottom();
    }, 800 + Math.random() * 600); // Random typing delay
  }

  // Helpers
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function scrollChatToBottom() {
    messagesList.scrollTop = messagesList.scrollHeight;
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}

// Export initialization
document.addEventListener('DOMContentLoaded', initChatbot);
