# backend/Dockerfile

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install curl for healthcheck (MANDATORY for docker-compose healthcheck)
RUN apk --no-cache add curl

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start the application using the custom script
CMD ["npm", "run", "docker-entry"]