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

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "preview"] 