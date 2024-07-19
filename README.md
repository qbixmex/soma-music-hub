# Quantic Coders Blog

## Install Dependencies

```bash
# NPM
npm install

# YARN
yarn

# PNPM
pnpm install

# BUN
bun
```

## Environment Variables

**Copy ```.env.template``` to ```.env```:**

```bash
# Terminal
cp .env.template .env
```

**Then modify ```.env``` file:**

```ini
# .env
DB_USER=your_user_name
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

## Docker

**Create Docker Image:**

```bash
docker compose -p teslo_shop up -d

# -p container name
# -d detach mode
```

## Prisma

**Initialize Prisma:**

```bash
npx init --datasource-provider postgressql
```

**Prisma Client:**

```bash
npx prisma generate
```

**Create your migrations:**

```bash
npx prisma migrate dev --name init

# --name migration_name
```

## Prisma Studio

**You can check your database in the browser**

```bash
npx prisma studio
```

## Run development mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Build the project

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

## Run pre-build project

**IMPORTANT: You can run this command only if you executed build command before!**

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
# or
bun preview
```

