# ===========================
# 📌 Stage 1: Build
# ===========================
FROM node:22-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all project files
COPY . .

# Build the Next.js project
RUN npm run build  

# ===========================
# 📌 Stage 2: Production
# ===========================
FROM node:22-slim AS production

WORKDIR /app

# Install dependencies for production (only essential packages)
COPY package*.json ./
RUN npm install --legacy-peer-deps --only=production

# Copy built files from the builder stage
COPY --from=builder /app/.next ./.next  
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]
