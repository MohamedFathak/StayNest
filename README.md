# StayNest – Hotel Management System

A full-stack hotel management web application developed using the MERN-style frontend workflow with React and Redux, Node.js, Express.js and PostgreSQL.

StayNest allows users to add, view, update, delete, search and filter hotel information through a responsive web interface.

## Project Overview

StayNest is designed to simplify hotel information management through a user-friendly interface and RESTful backend APIs.

The application stores hotel information in a PostgreSQL database and supports image uploads, location details and interactive map viewing.

## Technologies Used

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- HTML5
- CSS3
- Tailwind CSS
- React Helmet Async
- Vite

### Backend
- Node.js
- Express.js
- REST API
- Multer for image uploads
- PostgreSQL
- pg (PostgreSQL client)
- dotenv
- CORS

## Features

- Add new hotel details.
- View all available hotels.
- Update existing hotel information.
- Delete hotels with confirmation.
- Upload hotel images with preview.
- Validate image type and file size.
- Search hotels by title.
- Filter hotels by minimum and maximum price.
- Server-side pagination.
- View individual hotel details.
- Display hotel locations using Google Maps.
- Validate hotel price and geographical coordinates.
- Automatically remove unused hotel images when replacing or deleting them.
- SEO metadata using React Helmet Async.
- Responsive user interface.

## Project Structure

```text
StayNest/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── hotelController.js
│   │
│   ├── routers/
│   │   └── hotelRoutes.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── src/
│   ├── components/
│   │   ├── HotelForm.jsx
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── HotelDetails.jsx
│   │
│   ├── redux/
│   │   ├── slices/
│   │   │   └── hotelSlice.js
│   │   └── store.js
│   │
│   ├── services/
│   │   └── hotelService.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

## Database Configuration

StayNest uses PostgreSQL for persistent hotel data storage.

Create a PostgreSQL database named:

```sql
CREATE DATABASE staynest_db;
```

Configure the backend environment variables in `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=staynest_db
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
PORT=5000
```

Replace `your_postgresql_password` with your local PostgreSQL password.

The backend expects the hotel table to be created in PostgreSQL with the columns used by the hotel controller.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd StayNest
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create `backend/.env` using the database configuration described above.

### 5. Start the Backend

From the backend folder:

```bash
npm run dev
```

The backend server runs at:

`http://localhost:5000`

### 6. Start the Frontend

Open another terminal in the project root:

```bash
npm run dev
```

The frontend runs at:

`http://localhost:5173`

## API Endpoints

Base URL: `http://localhost:5000/api/hotels`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/hotels` | Add a hotel |
| GET | `/api/hotels` | Retrieve hotels |
| GET | `/api/hotels/:id` | Retrieve one hotel |
| PUT | `/api/hotels/:id` | Update a hotel |
| DELETE | `/api/hotels/:id` | Delete a hotel |

### Supported Query Parameters

The hotel listing endpoint supports:

- `search` – Search by hotel title.
- `minPrice` – Minimum hotel price.
- `maxPrice` – Maximum hotel price.
- `page` – Pagination page number.
- `limit` – Number of hotels per page.

Example:

`http://localhost:5000/api/hotels?search=royal&page=1&limit=6`

## Image Upload

- Hotel images are uploaded using Multer.
- Uploaded files are stored in the backend uploads directory.
- Image paths are stored in PostgreSQL.
- Images are validated for supported formats and a maximum file size of 2 MB.
- Old image files are cleaned up when replaced or deleted.

## Future Improvements

- Deploy the frontend and backend.
- Configure production database hosting.
- Add automated testing.
- Improve application security and production error handling.

## Author

Developed as a full-stack web development project.

**Project Name:** StayNest  
**Domain:** Full-Stack Web Development  
**Frontend:** React.js and Redux Toolkit  
**Backend:** Node.js and Express.js  
**Database:** PostgreSQL

