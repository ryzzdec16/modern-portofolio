FROM node:20-alpine AS builder
WORKDIR /app

COPY . .

# Copy environment variables
COPY .env.local .env

ENV CI=true

RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile \
    && pnpm add critters clsx \
    && pnpm build

CMD ["pnpm", "start"]
