# LuxeCakes - Premium eCommerce Platform

A next-generation, premium cake delivery platform built with a modern tech stack. Features a beautiful, highly interactive frontend and a robust backend foundation.

## Tech Stack
*   **Frontend:** Next.js 14+ (App Router), React, Tailwind CSS v4, Framer Motion
*   **Backend:** Next.js API Routes / Server Actions
*   **Database:** PostgreSQL (via Prisma ORM)
*   **Authentication:** NextAuth.js (Auth.js)

---

## 🚀 How to Run the Project Locally

Follow these steps to get the development environment running on your machine.

### Step 1: Open the Project
Open your terminal (or command prompt) and navigate to the project directory:
```bash
cd Desktop/cake-shop
```

### Step 2: Install Dependencies
If you haven't already, install all required packages using npm:
```bash
npm install
```

### Step 3: Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```

### Step 4: View in Browser
Once the server starts, open your web browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

---

## ⚙️ Setting up the Database & Backend (For Full Functionality)

The current UI is built using mock data so you can test the frontend immediately. To connect the real database and authentication, follow these steps:

### 1. Configure Environment Variables
1. Open the `.env` file in the root of the project.
2. Add your PostgreSQL Database URL and a secret string for NextAuth:
```env
# Example PostgreSQL URL
DATABASE_URL="postgresql://username:password@localhost:5432/cakeshop?schema=public"

# Required for NextAuth (you can generate one using `openssl rand -base64 32`)
AUTH_SECRET="your_super_secret_string_here"
```

### 2. Push the Prisma Schema
Once your database is running and the `.env` is configured, push the schema to create the tables:
```bash
npx prisma db push
```

### 3. Generate the Prisma Client
Generate the TypeScript client to interact with your database:
```bash
npx prisma generate
```

Now you are fully set up to replace the mock data arrays in the pages with real `prisma` fetch queries!
