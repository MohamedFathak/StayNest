# StayNest – Hotel Management System

A full-stack Hotel Management System built using **React.js, Redux Toolkit, Node.js, Express.js and PostgreSQL**.

StayNest provides a responsive platform for managing hotel information, searching hotels, filtering by price, viewing hotel details and managing hotel records with role-based access control.

## Project Overview

StayNest simplifies hotel information management through a user-friendly interface and RESTful backend APIs.

The application uses PostgreSQL for persistent data storage and supports hotel image uploads, location details, authentication and role-based permissions.

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
- REST APIs
- PostgreSQL
- pg (PostgreSQL client)
- Multer (Image Upload)
- bcrypt (Password Hashing)
- JSON Web Token (JWT)
- dotenv
- CORS

## User Roles

StayNest supports three access levels.

### 1. Admin
- Login and logout.
- Add new hotels.
- Edit existing hotel information.
- Delete hotels.
- View and manage hotel listings.

### 2. User
- Register and login.
- View available hotels.
- Search hotels by title.
- Filter hotels by price.
- View individual hotel details.
- Cannot add, edit or delete hotels.

### 3. Guest
- Browse available hotels without logging in.
- Search and filter hotel listings.
- View individual hotel details.
- Cannot access hotel management features.

## Key Features

- Admin and User authentication.
- Role-based access control.
- Password hashing using bcrypt.
- JWT-based API authentication.
- Add, view, update and delete hotel information.
- Upload hotel images with preview.
- Image type and file-size validation.
- Search hotels by title.
- Filter hotels by minimum and maximum price.
- Server-side pagination.
- Individual hotel details page.
- Hotel location display using geographical coordinates.
- Input validation for price, latitude and longitude.
- Automatic cleanup of replaced or deleted hotel images.
- Responsive user interface.
- SEO metadata using React Helmet Async.

## Project Structure

```text
StayNest/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── hotelController.js
│   │
│   ├── database/
│   │   └── schema.sql
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routers/
│   │   ├── authRoutes.js
│   │   └── hotelRoutes.js
│   │
│   ├── uploads/
│   │   └── .gitkeep
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── AdminRoute.jsx
│   │   ├── HotelForm.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── HotelDetails.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── hotelSlice.js
│   │   └── store.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── hotelService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── .gitignore
└── README.md
```

## Database Configuration

StayNest uses PostgreSQL for storing user accounts and hotel information.

### 1. Create the Database

Create a PostgreSQL database named `staynest_db`.

```sql
CREATE DATABASE staynest_db;
```

### 2. Create Database Tables

The SQL schema is available at:

`backend/database/schema.sql`

Execute the schema from the project root:

```bash
psql -U postgres -d staynest_db -f backend/database/schema.sql
```

This creates the required `users` and `hotels` tables.

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

Configure the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=staynest_db
DB_USER=postgres
DB_PASSWORD=your_postgresql_password

PORT=5000
JWT_SECRET=your_long_random_jwt_secret
ADMIN_SETUP_KEY=your_admin_setup_secret
```

Replace the placeholder values with your local configuration.

**Important:** Never upload your actual `.env` file, database password, JWT secret or Admin setup key to GitHub. Use `.env.example` as the configuration template.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd StayNest
```

### 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create `backend/.env` using the configuration described in the Database Configuration section.

### 5. Configure PostgreSQL

- Start PostgreSQL.
- Create the `staynest_db` database.
- Execute `backend/database/schema.sql`.
- Ensure the database credentials match your `.env` file.

### 6. Start the Backend

From the backend directory:

```bash
npm start
```

The backend server runs at:

`http://localhost:5000`

### 7. Start the Frontend

Open another terminal in the project root:

```bash
npm run dev
```

The frontend runs at:

`http://localhost:5173`

## API Endpoints

### Hotel APIs

Base URL:

`http://localhost:5000/api/hotels`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/hotels` | Add a hotel | Admin |
| GET | `/api/hotels` | Retrieve hotels | Public |
| GET | `/api/hotels/:id` | Retrieve one hotel | Public |
| PUT | `/api/hotels/:id` | Update a hotel | Admin |
| DELETE | `/api/hotels/:id` | Delete a hotel | Admin |

### Authentication APIs

Base URL:

`http://localhost:5000/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a normal user |
| POST | `/login` | Authenticate a user |
| POST | `/create-admin` | Initial Admin account setup |

Admin creation is protected by an Admin setup key. The setup endpoint should be disabled after the initial Admin account has been created.

### Supported Hotel Query Parameters

The hotel listing endpoint supports:

- `search` – Search hotels by title.
- `minPrice` – Minimum hotel price.
- `maxPrice` – Maximum hotel price.
- `page` – Pagination page number.
- `limit` – Number of hotels per page.

Example:

```text
http://localhost:5000/api/hotels?search=royal&page=1&limit=6
```

## Image Upload

- Hotel images are uploaded using Multer.
- Uploaded files are stored in the backend `uploads` directory.
- Image paths are stored in PostgreSQL.
- Supported image formats include JPG, JPEG, PNG and WEBP.
- Maximum image size is 2 MB.
- Old image files are cleaned up when replaced or deleted.

## Testing and Validation

StayNest was tested using frontend interactions, backend APIs, Postman and PostgreSQL.

### Hotel CRUD Testing

# StayNest – Hotel Management System

A full-stack Hotel Management System built using **React.js, Redux Toolkit, Node.js, Express.js and PostgreSQL**.

StayNest provides a responsive platform for managing hotel information, searching hotels, filtering by price, viewing hotel details and managing hotel records with role-based access control.

## Project Overview

StayNest simplifies hotel information management through a user-friendly interface and RESTful backend APIs.

The application uses PostgreSQL for persistent data storage and supports hotel image uploads, location details, authentication and role-based permissions.

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
- REST APIs
- PostgreSQL
- pg (PostgreSQL client)
- Multer (Image Upload)
- bcrypt (Password Hashing)
- JSON Web Token (JWT)
- dotenv
- CORS

## User Roles

StayNest supports three access levels.

### 1. Admin
- Login and logout.
- Add new hotels.
- Edit existing hotel information.
- Delete hotels.
- View and manage hotel listings.

### 2. User
- Register and login.
- View available hotels.
- Search hotels by title.
- Filter hotels by price.
- View individual hotel details.
- Cannot add, edit or delete hotels.

### 3. Guest
- Browse available hotels without logging in.
- Search and filter hotel listings.
- View individual hotel details.
- Cannot access hotel management features.

## Key Features

- Admin and User authentication.
- Role-based access control.
- Password hashing using bcrypt.
- JWT-based API authentication.
- Add, view, update and delete hotel information.
- Upload hotel images with preview.
- Image type and file-size validation.
- Search hotels by title.
- Filter hotels by minimum and maximum price.
- Server-side pagination.
- Individual hotel details page.
- Hotel location display using geographical coordinates.
- Input validation for price, latitude and longitude.
- Automatic cleanup of replaced or deleted hotel images.
- Responsive user interface.
- SEO metadata using React Helmet Async.

## Project Structure

```text
StayNest/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── hotelController.js
│   │
│   ├── database/
│   │   └── schema.sql
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routers/
│   │   ├── authRoutes.js
│   │   └── hotelRoutes.js
│   │
│   ├── uploads/
│   │   └── .gitkeep
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── AdminRoute.jsx
│   │   ├── HotelForm.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── HotelDetails.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── hotelSlice.js
│   │   └── store.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── hotelService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── .gitignore
└── README.md
```

## Database Configuration

StayNest uses PostgreSQL for storing user accounts and hotel information.

### 1. Create the Database

Create a PostgreSQL database named `staynest_db`.

```sql
CREATE DATABASE staynest_db;
```

### 2. Create Database Tables

The SQL schema is available at:

`backend/database/schema.sql`

Execute the schema from the project root:

```bash
psql -U postgres -d staynest_db -f backend/database/schema.sql
```

This creates the required `users` and `hotels` tables.

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

Configure the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=staynest_db
DB_USER=postgres
DB_PASSWORD=your_postgresql_password

PORT=5000
JWT_SECRET=your_long_random_jwt_secret
ADMIN_SETUP_KEY=your_admin_setup_secret
```

Replace the placeholder values with your local configuration.

**Important:** Never upload your actual `.env` file, database password, JWT secret or Admin setup key to GitHub. Use `.env.example` as the configuration template.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd StayNest
```

### 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create `backend/.env` using the configuration described in the Database Configuration section.

### 5. Configure PostgreSQL

- Start PostgreSQL.
- Create the `staynest_db` database.
- Execute `backend/database/schema.sql`.
- Ensure the database credentials match your `.env` file.

### 6. Start the Backend

From the backend directory:

```bash
npm start
```

The backend server runs at:

`http://localhost:5000`

### 7. Start the Frontend

Open another terminal in the project root:

```bash
npm run dev
```

The frontend runs at:

`http://localhost:5173`

## API Endpoints

### Hotel APIs

Base URL:

`http://localhost:5000/api/hotels`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/hotels` | Add a hotel | Admin |
| GET | `/api/hotels` | Retrieve hotels | Public |
| GET | `/api/hotels/:id` | Retrieve one hotel | Public |
| PUT | `/api/hotels/:id` | Update a hotel | Admin |
| DELETE | `/api/hotels/:id` | Delete a hotel | Admin |

### Authentication APIs

Base URL:

`http://localhost:5000/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a normal user |
| POST | `/login` | Authenticate a user |
| POST | `/create-admin` | Initial Admin account setup |

Admin creation is protected by an Admin setup key. The setup endpoint should be disabled after the initial Admin account has been created.

### Supported Hotel Query Parameters

The hotel listing endpoint supports:

- `search` – Search hotels by title.
- `minPrice` – Minimum hotel price.
- `maxPrice` – Maximum hotel price.
- `page` – Pagination page number.
- `limit` – Number of hotels per page.

Example:

```text
http://localhost:5000/api/hotels?search=royal&page=1&limit=6
```

## Image Upload

- Hotel images are uploaded using Multer.
- Uploaded files are stored in the backend `uploads` directory.
- Image paths are stored in PostgreSQL.
- Supported image formats include JPG, JPEG, PNG and WEBP.
- Maximum image size is 2 MB.
- Old image files are cleaned up when replaced or deleted.

## Testing and Validation

StayNest was tested using frontend interactions, backend APIs, Postman and PostgreSQL.

### Hotel CRUD Testing

| Test ID | Test Scenario | Expected Result | Status |
|---|---|---|---|
| TC01 | Add hotel with valid details | Hotel created successfully | PASS |
| TC02 | Add hotel without hotel title | Validation error displayed | PASS |
| TC03 | Add hotel without description | Validation error displayed | PASS |
| TC04 | Add hotel with negative price | Input rejected | PASS |
| TC05 | Add hotel with zero price | Input rejected | PASS |
| TC06 | Add hotel with valid latitude and longitude | Hotel saved | PASS |
| TC07 | Enter invalid latitude | Input rejected | PASS |
| TC08 | Enter invalid longitude | Input rejected | PASS |
| TC09 | Edit an existing hotel | Hotel information updated | PASS |
| TC10 | Delete an existing hotel | Hotel deleted successfully | PASS |
| TC11 | Delete a non-existent hotel | Hotel Not Found response | PASS |

**CRUD Testing Summary**
- Total test cases: 11
- Passed: 11
- Failed: 0

### Authentication and Authorization Testing

| Test ID |        Test Scenario           |  Expected Result        |Status|
| AUTH01  |        Admin login             | Successful login        | PASS |
| AUTH02  |    User registration           | User account created    | PASS |
| AUTH03  |        User login              |  Successful login       | PASS |
| AUTH04  |   Admin creates hotel          |   Hotel created         | PASS |
| AUTH05  |   Admin updates hotel          |   Hotel updated         | PASS |
| AUTH06  |   Admin deletes hotel          | Hotel and image deleted | PASS |
| AUTH07  | User attempts to create hotel  |     Access denied       | PASS |
| AUTH08  | User attempts to update hotel  |     Access denied       | PASS |
| AUTH09  | User attempts to delete hotel  |     Access denied       | PASS |
| AUTH10  | Guest views all hotels         | Public access allowed   | PASS |
| AUTH11  | Guest views hotel details      | Public access allowed   | PASS |

**Authentication Testing Summary**
- Total test cases: 11
- Passed: 11
- Failed: 0

### Testing Approach

- Frontend form validation.
- Backend API testing using Postman.
- PostgreSQL data verification.
- Image upload and validation.
- Hotel CRUD operation testing.
- Search, filtering and pagination testing.
- Authentication and role-based authorization testing.

## Future Improvements

- Deploy frontend and backend.
- Configure production database hosting.
- Add automated testing.
- Improve production monitoring and error handling.

## Author

**Project Name:** StayNest – Hotel Management System  
**Domain:** Full-Stack Web Development  
**Frontend:** React.js and Redux Toolkit  
**Backend:** Node.js and Express.js  
**Database:** PostgreSQL
**CRUD Testing Summary**
- Total test cases: 11
- Passed: 11
- Failed: 0

### Authentication and Authorization Testing

| Test ID |        Test Scenario          | Expected Result         | Status |
| AUTH01  |         Admin login           | Successful login        | PASS |
| AUTH02  |      User registration        | User account created    | PASS |
| AUTH03  |          User login           | Successful login        | PASS |
| AUTH04  |    Admin creates hotel        | Hotel created           | PASS |
| AUTH05  |    Admin updates hotel        | Hotel updated           | PASS |
| AUTH06  |    Admin deletes hotel        | Hotel and image deleted | PASS |
| AUTH07  | User attempts to create hotel | Access denied           | PASS |
| AUTH08  | User attempts to update hotel | Access denied           | PASS |
| AUTH09  | User attempts to delete hotel | Access denied           | PASS |
| AUTH10  |   Guest views all hotels      | Public access allowed   | PASS |
| AUTH11  | Guest views hotel details     | Public access allowed   | PASS |

**Authentication Testing Summary**
- Total test cases: 11
- Passed: 11
- Failed: 0

### Testing Approach

- Frontend form validation.
- Backend API testing using Postman.
- PostgreSQL data verification.
- Image upload and validation.
- Hotel CRUD operation testing.
- Search, filtering and pagination testing.
- Authentication and role-based authorization testing.

## Future Improvements

- Deploy frontend and backend.
- Configure production database hosting.
- Add automated testing.
- Improve production monitoring and error handling.

## Author

**Project Name:** StayNest – Hotel Management System  
**Domain:** Full-Stack Web Development  
**Frontend:** React.js and Redux Toolkit  
**Backend:** Node.js and Express.js  
**Database:** PostgreSQL