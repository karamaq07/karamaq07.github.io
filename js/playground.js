/* ==========================================================================
   LIVE DEVELOPER PLAYGROUND CONFIGURATOR (WordPress, SaaS & AI Automation)
   ========================================================================== */

// Configuration State
const PLAYGROUND_STATE = {
  caching: true,
  security: false,
  ai_helper: true,
  webhook_sync: false
};

// Tabs: 'wp', 'saas', 'ai'
let activeTab = 'wp';

function initPlayground() {
  const toggleItems = document.querySelectorAll('.toggle-item');
  const tabs = document.querySelectorAll('.playground-tab');
  const codeOutput = document.getElementById('playground-code-output');

  if (!toggleItems || !tabs || !codeOutput) return;

  // Set initial active states for UI toggles
  toggleItems.forEach(item => {
    const configKey = item.getAttribute('data-config');
    if (PLAYGROUND_STATE[configKey]) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }

    // Toggle event listener
    item.addEventListener('click', () => {
      PLAYGROUND_STATE[configKey] = !PLAYGROUND_STATE[configKey];
      item.classList.toggle('active');
      generateCodeOutput();
    });
  });

  // Tab switcher
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.getAttribute('data-tab');
      generateCodeOutput();
    });
  });

  // Render default state
  generateCodeOutput();

  function generateCodeOutput() {
    let output = '';

    if (activeTab === 'wp') {
      output = generateWordPressPHP();
    } else if (activeTab === 'saas') {
      output = generateSaaSNode();
    } else if (activeTab === 'ai') {
      output = generateAIWorkflow();
    }

    // Escape HTML entities to display code cleanly
    codeOutput.innerHTML = escapeHtml(output);
  }

  // Escape HTML helper
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

/* ==========================================================================
   CODE GENERATION LOGIC
   ========================================================================== */

function generateWordPressPHP() {
  const cacheStr = PLAYGROUND_STATE.caching 
    ? `
// Check cache to avoid database hit
$cached_payload = get_transient( 'wp_saas_metrics_cache' );
if ( false !== $cached_payload ) {
    return rest_ensure_response( json_decode( $cached_payload ) );
}` 
    : '';

  const secStr = PLAYGROUND_STATE.security
    ? `
// Strict authorization check via WP Nonce/Rest Token
if ( ! current_user_can( 'manage_options' ) ) {
    return new WP_Error( 'rest_forbidden', __( 'Access Blocked', 'wp-saas-sync' ), array( 'status' => 401 ) );
}`
    : `
// Minimal verification check
if ( ! is_user_logged_in() ) {
    return new WP_Error( 'rest_unauthorized', __( 'Login Required', 'wp-saas-sync' ), array( 'status' => 403 ) );
}`;

  const aiStr = PLAYGROUND_STATE.ai_helper
    ? `
// Dispatch post copy payload to LLM model parser
$ai_endpoint = 'https://api.openai.com/v1/chat/completions';
$ai_response = wp_remote_post( $ai_endpoint, array(
    'headers' => array(
        'Authorization' => 'Bearer ' . esc_attr( get_option( 'wp_ai_api_token' ) ),
        'Content-Type'  => 'application/json',
    ),
    'body'    => wp_json_encode( array(
        'model'    => 'gpt-4o-mini',
        'messages' => array(
            array( 'role' => 'system', 'content' => 'Categorize and tag this WordPress post' ),
            array( 'role' => 'user', 'content' => get_the_content() )
        )
    ) ),
) );`
    : '';

  const syncStr = PLAYGROUND_STATE.webhook_sync
    ? `
// Push transaction webhook payload to external SaaS controller
$webhook_url = esc_url_raw( get_option( 'saas_sync_webhook' ) );
wp_remote_post( $webhook_url, array(
    'method'    => 'POST',
    'headers'   => array( 'Content-Type' => 'application/json' ),
    'body'      => wp_json_encode( array(
        'event'     => 'order_created',
        'timestamp' => time(),
        'payload'   => $order_details
    ) ),
    'blocking'  => false // Non-blocking async queue
) );`
    : '';

  return `&lt;?php
/**
 * Plugin Name: Custom WooCommerce & SaaS Connector Pro
 * Description: Dynamically generated micro-services connector plugin.
 * Version:     1.0.0
 * Author:      WordPress & SaaS Expert
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Restrict direct execution
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'saas-connector/v1', '/sync', array(
        'methods'             => 'POST',
        'callback'            => 'handle_saas_integration_payload',
        'permission_callback' => 'verify_connector_clearance',
    ) );
} );

function verify_connector_clearance( WP_REST_Request $request ) {${secStr}
    return true;
}

function handle_saas_integration_payload( WP_REST_Request $request ) {${cacheStr}
    $params = $request->get_json_params();
    $order_details = isset( $params['data'] ) ? $params['data'] : array();
    ${aiStr}
    ${syncStr}
    
    // Save to transient for 1-hour fast caching
    if ( isset($cached_payload) ) {
        set_transient( 'wp_saas_metrics_cache', wp_json_encode( $order_details ), 3600 );
    }

    return rest_ensure_response( array(
        'status'  => 'success',
        'code'    => 200,
        'message' => 'WordPress pipeline executed, metrics compiled.'
    ) );
}`;
}

function generateSaaSNode() {
  const cacheStr = PLAYGROUND_STATE.caching
    ? `
  // Query Redis Cache before executing PostgreSQL query
  const cachedData = await redisClient.get(\`saas:user:\${userId}:metrics\`);
  if (cachedData) {
    return res.status(200).json({ source: 'cache', data: JSON.parse(cachedData) });
  }`
    : '';

  const secStr = PLAYGROUND_STATE.security
    ? `
  // JWT verification checks and origin restriction
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Auth failed: Token missing' });
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const userId = user.id;`
    : `
  // Standard user extraction (Minimal authorization)
  const userId = req.body.userId || 'guest_user';`;

  const aiStr = PLAYGROUND_STATE.ai_helper
    ? `
  // Generate automated SaaS usage insights using Anthropic SDK
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const aiReport = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: \`Analyze these user statistics for bottlenecks: \${JSON.stringify(rawStats)}\`
    }]
  });
  const insights = aiReport.content[0].text;`
    : `
  const insights = "AI Analysis modules offline. Set 'ai_helper: true' to deploy.";`;

  const syncStr = PLAYGROUND_STATE.webhook_sync
    ? `
  // Queue Webhook event in RabbitMQ / BullMQ for async delivery
  await webhookQueue.add('dispatch_event', {
    url: process.env.CLIENT_WEBHOOK_URL,
    payload: { event: 'metrics.compiled', data: rawStats }
  }, { attempts: 3, backoff: 5000 });`
    : '';

  return `/**
 * Express Controller: SaaS Application Metrics API Node
 * Technology Stack: Node.js (TypeScript) & Express Router
 */

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/database';
import { redisClient } from '../services/redis';
import Anthropic from '@anthropic-ai/sdk';

export const getUserAnalytics = async (req: Request, res: Response) => {
  try {${secStr}
    ${cacheStr}

    // Execute secure PostgreSQL parameterized query
    const dbQuery = 'SELECT * FROM metrics WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 50';
    const dbResult = await db.query(dbQuery, [userId]);
    const rawStats = dbResult.rows;
    ${aiStr}
    ${syncStr}

    const payload = {
      status: 'processed',
      user_id: userId,
      insights: insights,
      records: rawStats.length,
      timestamp: new Date().toISOString()
    };

    // Cache results in Redis for 10 minutes
    if (process.env.REDIS_ACTIVE === 'true') {
      await redisClient.setEx(\`saas:user:\${userId}:metrics\`, 600, JSON.stringify(payload));
    }

    return res.status(200).json({ source: 'database', data: payload });
  } catch (error: any) {
    return res.status(500).json({ error: 'Server loop interrupted: ' + error.message });
  }
};`;
}

function generateAIWorkflow() {
  const promptTemplate = PLAYGROUND_STATE.ai_helper
    ? "Perform standard deep evaluation on data input. Parse metrics and return valid JSON with keys: status, score, recommendations."
    : "Clean formatting and strip HTML tags from input text.";

  const webhookUrl = PLAYGROUND_STATE.webhook_sync
    ? "https://your-wordpress-site.com/wp-json/saas-connector/v1/sync"
    : "https://your-fallback-crm.com/api/leads";

  return `{
  "name": "Live Client Pipeline Integrator",
  "active": true,
  "nodes": [
    {
      "id": "trigger_webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "incoming-leads",
        "options": {
          "onlyQueryParams": false
        }
      }
    },
    {
      "id": "verify_security",
      "type": "n8n-nodes-base.if",
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{$json.headers['x-api-key']}}",
              "operation": "equal",
              "value2": "${PLAYGROUND_STATE.security ? 'SECURE_PRODUCTION_API_KEY' : 'GUEST_SANDBOX_KEY'}"
            }
          ]
        }
      }
    },
    {
      "id": "ai_agent_analysis",
      "type": "n8n-nodes-base.openAi",
      "parameters": {
        "resource": "chat",
        "model": "gpt-4o",
        "prompt": "${promptTemplate}",
        "context": "={{$json.body.message}}"
      },
      "active": ${PLAYGROUND_STATE.ai_helper}
    },
    {
      "id": "sync_to_wordpress",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "${webhookUrl}",
        "method": "POST",
        "sendHeaders": true,
        "headerParameters": {
          "Content-Type": "application/json",
          "Authorization": "Bearer {{jwt_token}}"
        },
        "sendBody": true,
        "bodyParameters": {
          "cached": ${PLAYGROUND_STATE.caching},
          "insights": "={{$node['ai_agent_analysis'].json.choices[0].message.content}}",
          "original": "={{$json.body}}"
        }
      }
    }
  ]
}`;
}

// Export initialization
document.addEventListener('DOMContentLoaded', initPlayground);
