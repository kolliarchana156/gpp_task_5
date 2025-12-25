FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose port 3000 (MANDATORY)
EXPOSE 3000

# Start Vite server on port 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]