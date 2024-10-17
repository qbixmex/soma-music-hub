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
docker compose -p quantic_coders up -d

# -p container name
# -d detach mode
```

## Prisma

**Initialize Prisma:**

```bash
npx init --datasource-provider postgresql
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
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```
## Generate Auth Secret Key

```bash
node
require("node:crypto").randomBytes(32).toString('hex');

# It will generate something like this:
'1f135548a57a4e2c043d6eb6a6b5e144 and more ...'
```

### Copy the generated numbers and paste them into: .env -> ```AUTH_SECRET``` environment variable value:

```ini
AUTH_SECRET=1f135548a57a4e2c043d6eb6a6b5e144...

# Note: the three dots means there are more numbers and characters.
AUTH_SECRET=1f135548a57a4e2c043d6eb6a6b5e144...
```
