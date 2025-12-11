FROM node:18-alpine
WORKDIR /app

# Copy package.json from ROOT
COPY package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY server/ .

# Copy React build
COPY dist ./public

EXPOSE 5000

# Start server
CMD ["node", "index.js"]
