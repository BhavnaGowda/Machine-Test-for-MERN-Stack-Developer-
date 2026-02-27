# 🚀 MERN Machine Test – Agent Task Management System

## 📌 Project Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) application developed as part of the Machine Test for the MERN Stack Developer Internship.

The system allows an Admin to:

- Securely log in using JWT authentication
- Create and manage agents
- Upload CSV files containing tasks
- Automatically distribute tasks equally among agents
- View real-time dashboard analytics
- Perform full CRUD operations on agents and tasks

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- React Router
- Recharts (Analytics Dashboard)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs (Password hashing)
- Multer (File upload handling)
- CSV Parser

---

## ✨ Features Implemented

### 🔐 1. Admin Authentication
- Email & Password login
- JWT-based authentication
- Protected routes
- Error handling for invalid credentials

---

### 👩‍💼 2. Agent Management
- Add Agent
- Edit Agent
- Delete Agent
- Secure password hashing
- View all agents with assigned tasks

---

### 📂 3. CSV Upload & Task Distribution
- Accepts `.csv`, `.xlsx`, `.xls` files
- File type validation
- Format validation (FirstName, Phone, Notes)
- Equal task distribution using round-robin algorithm
- Sequential distribution of remaining tasks
- Tasks saved in MongoDB
- Tasks displayed under respective agents

---

### 📊 4. Dashboard Enhancements (Bonus)
- Total Agents counter
- Total Tasks counter
- Task distribution chart
- Search agents by name
- Pagination
- Delete individual tasks

---

## 📊 Task Distribution Logic

The system uses a round-robin distribution algorithm:

- If there are 25 tasks and 5 agents → each gets 5 tasks.
- If tasks are not divisible equally → remaining tasks are assigned sequentially.
- Ensures balanced workload distribution.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/BhavnaGowda/Machine-Test-for-MERN-Stack-Developer-
cd mern-machine-test

---

## 🔧 Backend Setup

cd backend
npm install

Create a `.env` file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start backend:

node server.js

Backend runs at:
http://localhost:5000

---

## 💻 Frontend Setup

cd frontend
npm install
npm start

Frontend runs at:
http://localhost:3000

---

## 📁 Project Structure

Machine-Test-for-MERN-Stack-Developer/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── pages/
│   ├── components/
│   └── App.js
│
└── README.md

---


---

## 👩‍💻 Developed By

Bhavana Gowda  
MERN Stack Developer
