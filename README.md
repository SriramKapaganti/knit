# Primetrade.ai Frontend Developer Assignment

## Project Overview

This project is a **Scalable Web App with Authentication & Dashboard** built using **React.js** for the frontend and **Node.js/Express** for the backend.  
The backend uses **SQLite** for data storage. Users can sign up, log in, manage their profile, and perform CRUD operations on tasks.

---

## Project Structure

### Backend (Node.js/Express)

backend/
├── src/
│ ├── controllers/ # API logic (userController.js, taskController.js)
│ ├── models/ # Database models (userModel.js, taskModel.js)
│ ├── routes/ # API routes (authRoutes.js, taskRoutes.js)
│ ├── middleware/ # Authentication & validation
│ ├── config/ # Database connection & env variables
│ └── utils/ # Helper functions (JWT utils, error handling)
├── database/ # SQLite DB file
├── docs/ # Postman collection & environment files
├── README.md
├── package.json
└── .env # JWT_SECRET, etc.

### Frontend (React.js)

├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components (Login.js, Dashboard.js, Profile.js)
│ ├── services/ # API call functions
│ ├── App.js # Main app with routing
│ └── index.js # Entry point
├── public/ # Static files
├── README.md
└── package.json

---

## Features

### Authentication

- User Signup & Login
- JWT-based authentication
- Protected routes for dashboard
- Logout flow

### Dashboard

- User profile display
- CRUD operations for tasks
- Search & filter tasks

### Security

- Password hashing with **bcrypt**
- JWT authentication middleware
- Input validation & sanitization

---

## Setup Instructions

### Backend

1. Navigate to the backend folder:

```bash
cd backend



```

npm install

Create a .env file:

JWT_SECRET=<your_jwt_secret>

Start the server:

npm start

The backend runs at http://localhost:5000 (or your deployed Render URL).

Frontend

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm start

The frontend runs at http://localhost:3000 (or your deployed Vercel URL).

API Documentation

A Postman integration file is included in backend/docs/:

Knit_API_Integration_Collection.json – All endpoints for authentication and task CRUD.

Knit_API_Environment.json – Environment variables for Postman (base URL, token).

Using Postman Collection

Import both JSON files into Postman.

Ensure the backend is running.

Run requests individually or in Integration Testing mode to test the full flow.

Deployment

Frontend: Deploy on Vercel/Netlify.

Backend: Deploy on Render/Heroku.

Configure CORS and cookies properly for cross-domain authentication.

Notes on Scalability

Modular project structure for frontend and backend.

Easy to extend with new features or entities.

Secure and reusable authentication flow.

GitHub Submission

The GitHub repository includes:

Frontend and backend code

Postman integration files (backend/docs/)

README with setup instructions

Make sure repository is public or accessible to reviewers.

Optional Extras

Add portfolio links or documentation to further impress reviewers.

Include screenshots of your dashboard in the repo if possible.

---

This is ready to copy as a single file.

If you want, I can also **write the exact git commands and folder structure** for your repo so you can push the frontend, backend, and Postman files in one go — ready for submission.

Do you want me to do that too?
