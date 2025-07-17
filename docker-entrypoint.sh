#!/bin/sh

echo "🔧 Generating runtime configuration..."

# Replace environment variables in config template
envsubst '${VITE_SUPABASE_URL} ${VITE_SUPABASE_ANON_KEY}' < /usr/share/nginx/html/config.js.template > /usr/share/nginx/html/config.js

# Debug: show what was generated
echo "Generated config.js:"
cat /usr/share/nginx/html/config.js

# Remove the template file
rm /usr/share/nginx/html/config.js.template

echo "🚀 Starting nginx..."

# Start nginx with the original command
exec nginx -g "daemon off;" 