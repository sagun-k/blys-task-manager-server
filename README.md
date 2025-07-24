# Blys Task Manager Server

A basic task manager backend built with Express.js, Prisma ORM, and JWT authentication.

## Requirements
- Node.js (v18+ recommended)
- PostgreSQL (Prefered) (or other DB supported by Prisma)
- pnpm (prefered) (or npm/yarn)

## ⚙️ Setup Instructions

### 1.Clone the repository

git clone https://github.com/sagun-k/blys-task-manager-server.git
cd blys-task-manager-server

### 2.Install dependencies
pnpm install

### 3. Create a .env file
cp .env.example .env

Update the `.env` file with your database URL and JWT secret:

DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your_jwt_secret_here"
NODE_ENV=development

### 4. Run Prisma migrations
pnpm prisma:migrate

### 5. 🔢 Generate Prisma client
pnpm prisma:generate

### 6. 🚀 Start the development server
pnpm dev

## 🧪 Test API

Visit: http://localhost:<3000 || PORT>/api-docs

Use Swagger UI to test all endpoints with cookie-based authentication.

## Default User (Seeded)

| Email          | Password  |
|----------------|-----------|
| demo@blys.com  | password  |

## 🧾 License

MIT © 2025 Blys