# 🏡 StayMitra
### A full-stack home rental and property listing platform that connects guests with hosts through a simple and intuitive web experience.

## <a href="https://staymitra-gamma.vercel.app/"> Click Here </a>

## 📖 Overview

StayMitra is a full-stack accommodation and property listing platform designed to provide a seamless experience for both guests and hosts.

Guests can discover available homes, view property information, and maintain a list of favourite properties. Hosts can manage their properties by adding, editing, and removing listings.

The project demonstrates the development of a complete web application with frontend and backend integration, authentication, session management, CRUD operations, database interaction, and deployment.

Database used is MySQL

## ✨ Features
👤Guest Features
  <ul>
    <li>User registration and login</li>
    <li>Secure session-based authentication</li>
    <li>Browse available properties</li>
    <li>View detailed property information</li>
    <li>Add and Remove properties to favourites</li>
  </ul>

🏠 Host Features
  <ul>
    <li>Host authentication</li>
    <li>Add new property listings</li>
    <li>View hosted properties</li>
    <li>Edit existing property information</li>
    <li>Delete existing property</li>
  </ul>
 
🔐 Authentication
   <ul>
      <li>User authentication</li>
      <li>Session management</li>
      <li>Protected routes</li>
      <li>Authorization for host-specific operations</li>
      <li>Secure access to user-specific data</li>
   </ul>
  
  ## 📥 Installation
  ### 1. Clone the project 
  ```
  git clone https://github.com/Adityaawaik/staymitra.git
  ```
  ### 2. Navigate to the project directory
  ```
  cd staymitra
  ```
  ### 3. Navigate to the backend directory 
  ```
  cd backend
  ```
  ### 4. Install all the required dependencies
  ```
  npm install
  ```
  ### 5. Start the backend Server 
  ```
  npm start
  ```
  ### 6. Navigate to frontend directory 
  ```
  cd frontend
  ```
  ### 7. Install all the required dependencies
  ```
  npm install
  ```
  ### 8. Start the frontend 
  ```
  npm run dev
  ```
  
  ## Environment Variables

Create `.env` files using the provided `.env.example` files.

### Backend

Create `backend/.env`:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_SCHEMA=your_database_schema
DB_PORT=your_database_port
SESSION_SECRECT=your_session_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

For production, replace `VITE_API_URL` with your deployed backend URL.

> **Note:** `.env` files are not committed to GitHub. Only `.env.example` files are included as templates. Never expose database credentials or session secrets.

 




  
