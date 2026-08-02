# Personal Book Manager

A full-stack Personal Book Manager application built using the **MERN stack** with **Next.js** powering the frontend.

The goal of this project is to provide a simple and elegant personal space where users can manage their book collection, track reading progress, and view meaningful insights through a clean dashboard.

---

# Features

## Authentication

- User signup
- User login
- User logout
- JWT-based authentication
- Protected routes
- User-specific data access
- Secure password hashing using bcrypt
- HTTP-only cookie authentication

---

## Book Collection

Users can:

- Add books
- Edit books
- Delete books
- View their personal book library
- Update reading status

Each book contains:

- Title
- Author
- Tags
- Reading Status

Available statuses:

- 📖 Want to Read
- 📘 Reading
- ✅ Completed

---

## Dashboard

The dashboard provides:

- Total number of books
- Reading statistics
- Personal book collection
- Quick overview of reading progress

The design focuses on clarity and simplicity without unnecessary complexity.

---

# Tech Stack

## Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Hooks

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt
- HTTP-only Cookies

---

# Project Structure

```
personal-book-manager

├── frontend
│   ├── app
│   ├── components
│   ├── context
│   ├── hooks
│   ├── lib
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone <repository-url>

cd personal-book-manager
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ENCRYPTION_KEY=your_encryption_key

FRONTEND_URL=http://localhost:3000

NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

NEXT_PUBLIC_ENCRYPTION_KEY=your_encryption_key
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

# API Overview

## Authentication Routes

### Signup

```
POST /api/auth/signup
```

### Login

```
POST /api/auth/login
```

### Logout

```
POST /api/auth/logout
```

### Current User

```
GET /api/auth/me
```

---

## Book Routes

Authentication required.

### Get Books

```
GET /api/books
```

### Add Book

```
POST /api/books
```

Example:

```json
{
    "title": "Atomic Habits",
    "author": "James Clear",
    "tags": [
        "self improvement"
    ],
    "status": "Reading"
}
```

---

### Update Book

```
PUT /api/books/:id
```

---

### Delete Book

```
DELETE /api/books/:id
```

---

# Database Design

## User Collection

```text
name
email
password
createdAt
updatedAt
```

## Book Collection

```text
title
author
tags[]
status
userId
createdAt
updatedAt
```

Each book belongs to a specific user.

---

# Security Implementation

The application includes:

- JWT authentication
- Password hashing
- Protected API routes
- HTTP-only cookies
- Secure environment variables
- Helmet security middleware
- HPP protection
- Global error handling

---