# Stage 1: Build
FROM node:18.18.0-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:18.18.0-alpine AS production

WORKDIR /app

# Install serve globally for serving static files
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy serve configuration
COPY serve.json ./serve.json

# Expose port
EXPOSE 3000

# Start the application using serve with config
CMD ["serve", "-s", "dist", "-l", "3000", "-c", "serve.json"] 