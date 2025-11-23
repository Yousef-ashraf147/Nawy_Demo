🏡 Nawy Demo – Full-Stack Apartment Listing Application

Nawy Demo is a complete full-stack real estate listing platform built with Next.js, Express.js (TypeScript), PostgreSQL, and Docker Compose.
It includes apartment listing, filtering, sorting, image uploads, and detailed pages.

✨ Features
🎨 Frontend (Next.js + Tailwind + shadcn/ui)

Modern responsive UI

Apartment grid listing

Search by name, unit number, or project

Advanced filters:

Price range slider

Bedrooms / bathrooms

Project filter

Sorting by price, area, and date

Automatic “New” badge for recently posted apartments

Add Apartment modal form with validation

Image preview before upload

Fully mobile-friendly

⚙️ Backend (Express + TypeScript)

REST API endpoints:

GET /api/apartments

GET /api/apartments/:id

POST /api/apartments

PostgreSQL integration with pooled connections

Multer-based image upload handling

Auto-create tables on startup

Auto-seed mock data

date_posted stored for sorting and UI badges

🗄️ Database (PostgreSQL)

Runs inside Docker

Persistent storage via Docker volumes

Auto-initialized on first run

🛠️ DevOps

Fully containerized with Docker Compose

One command to spin up the entire stack

Environment variables supported

Backend + Frontend both run inside containers

🚀 Running the Application
Step 1 — Build & Start Everything

From the project root:

docker-compose up --build

Docker will:

Build backend and frontend images

Start PostgreSQL

Launch all services

URLs

Frontend → http://localhost:3000

Backend API → http://localhost:5000/api

Uploaded Images → http://localhost:5000/uploads/
<filename>

📁 Project Structure
Nawy_Demo/
│
├── backend/
│ ├── src/
│ ├── uploads/
│ ├── Dockerfile
│ └── tsconfig.json
│
├── frontend/
│ ├── app/
│ ├── components/
│ ├── public/
│ ├── Dockerfile
│ └── next.config.js
│
└── docker-compose.yml

🔧 Environment Variables
Backend (backend/.env)
PORT=5000
BASE_URL=http://backend:5000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=12345678
DB_NAME=apartmentsdb1

Frontend (frontend/.env.local)
NEXT_PUBLIC_API_BASE=http://localhost:5000/api

In Docker this becomes:

NEXT_PUBLIC_API_BASE=http://backend:5000/api

📡 API Endpoints
Get All Apartments
GET /api/apartments

Get Apartment by ID
GET /api/apartments/:id

Add Apartment
POST /api/apartments

Required fields:

name, unitnumber, project, price, area, bedrooms, bathrooms,
location, description, image

🖼️ Image Uploads

Uploaded images are stored at:

backend/uploads/

Persisted with a Docker bind mount:

./backend/uploads:/app/uploads

🧪 Running Without Docker
Backend:
cd backend
npm install
npx ts-node src/server.ts

Frontend:
cd frontend
npm install
npm run dev

📜 License

MIT License.
