# ----------------------
# Backend Dockerfile
# ----------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY src ./src

# Compile TypeScript → dist/
RUN npm run build


# ----------------------
# PRODUCTION IMAGE
# ----------------------
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# expose backend port
EXPOSE 5000

CMD ["node", "dist/server.js"]
