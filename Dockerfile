# ── Stage 1: Build ─────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci

# Copy only the files required for the Vite build.
COPY index.html ./
COPY public ./public
COPY src ./src
COPY vite.config.ts ./
COPY tsconfig.json tsconfig.node.json tsconfig.eslint.json ./
COPY .eslintrc.js .eslintignore ./

ARG VITE_API_BASE_PATH
ARG VITE_GMAIL_CLIENT_ID
ARG VITE_APP_IMG_URL
ARG VITE_APP_IMG_USER_URL

# VITE_* values are public build-time variables embedded into the browser bundle.
# VITE_APP_TINY_MCE_API_KEY is a public client-side TinyMCE key, not a private secret.
ARG VITE_APP_TINY_MCE_API_KEY

RUN VITE_API_BASE_PATH="$VITE_API_BASE_PATH" \
    VITE_GMAIL_CLIENT_ID="$VITE_GMAIL_CLIENT_ID" \
    VITE_APP_IMG_URL="$VITE_APP_IMG_URL" \
    VITE_APP_IMG_USER_URL="$VITE_APP_IMG_USER_URL" \
    VITE_APP_TINY_MCE_API_KEY="$VITE_APP_TINY_MCE_API_KEY" \
    npm run build

# ── Stage 2: Serve ─────────────────────────────────────────────
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
