1. Build and Start the App with Docker
   Run the following command to build and start the entire application using Docker Compose:

   - docker-compose up --build
     This command builds the frontend, backend, and database images and starts all containers.

Project Overview
This project is a full-stack apartment listing application. It provides the ability to view, search, filter, sort, and add apartments. The system includes a backend API built with Node.js, Express, and PostgreSQL, and a frontend built with Next.js and React. Both components are containerized and run together using Docker.

Features:

- Apartment Search: Search apartments by name, unit number, or project name.
- Project Filter: Filter apartments by specific project.
- Bedrooms and Bathrooms Filters: Filter apartments based on the selected number of rooms.
- Price Range Filter: Adjust a slider to set minimum and maximum price.
- Sorting: Sort apartments by price (ascending or descending), by area (ascending or descending), or by date (newest or oldest).
- Pagination: Navigate through pages of apartment listings.
- Add New Apartments: A form in the navbar allows adding apartments with image upload and image preview before submission.
- Date Posted: Each apartment includes a date_posted field, with a “New” badge for units added within the last seven days.
- Project Addition to filters: When a project is add , it is directly added to the filter by project.
- Mobile Responsive: The frontend is designed to be responsive across mobile and desktop.

Backend:

- The backend is an Express server that exposes REST APIs for managing apartments stored in a PostgreSQL database.
- The database runs inside a Docker container and is automatically created and seeded on startup.

Database:
The PostgreSQL database stores apartment details including:

- name

- unitnumber

- project

- price

- description

- imageurl

- bedrooms

- bathrooms

- area

- location

- date_posted

- Tables are created at runtime using createTables.ts.

- Initial mock data is inserted using mockData.ts.

APIs:

- GET /api/apartments
  Returns all apartments sorted by newest first.

- GET /api/apartments/:id
  Returns a single apartment by ID.

- POST /api/apartments
  Creates a new apartment with image upload and validation.

- The backend uses multer to handle image uploads and serves uploaded files from the /uploads directory.

Docker Integration:

- The backend connects to the PostgreSQL database using environment variables defined in docker-compose.

Frontend Explanation:
The frontend is a Next.js 16 application with the following features:

- Filtering: Search bar, project dropdown, bedroom and bathroom selectors, and price slider.
- Sorting: Dropdown for sorting by price, area, or date.
- Apartment Details Page: A page showing full apartment information.
- Image Handling: All images are rendered using the Next.js Image component.
- Add Apartment Dialog: A modal allows creating new apartments with validation.
- Mobile Support: Navigation and forms adapt to mobile layouts.

Running the App Locally Without Docker
To run the application without Docker, follow these steps:

Backend Setup:

1. Navigate to the backend directory:

   - cd backend

2. Install dependencies:

   - npm install

3. Make sure PostgreSQL is installed and running on your system.
4. Create a database manually using a tool such as pgAdmin or psql:

   - CREATE DATABASE apartmentsdb1;

5. Update the database credentials in backend/src/config/database.ts if needed.
6. Start the backend server:

   - npx ts-node src/server.ts
     or if compiled:
   - npm run build
   - node dist/server.js

Frontend Setup:

1. Navigate to the frontend directory:

   - cd frontend

2. Install dependencies:

   - npm install

3. Create a .env.local file and set:

   - NEXT_PUBLIC_API_BASE=[http://localhost:5000](http://localhost:5000)

4. Start the frontend development server:

   - npm run dev

Accessing the App:

- Open [http://localhost:3000](http://localhost:3000) in the browser.
- The frontend will communicate with the backend at [http://localhost:5000](http://localhost:5000).

Running the App Locally
Once Docker has finished building and starting the containers, access the application at:

- [http://localhost:3000](http://localhost:3000)

The app will display apartment listings and allow filtering, sorting, and adding new apartments, including image uploads saved in the backend uploads directory.
