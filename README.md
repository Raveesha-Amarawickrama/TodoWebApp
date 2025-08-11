# 📝 Todo App – Full Stack Dockerized Application

## 📌 Overview
This is a full-stack **Todo Task Management**.  

It allows users to:
- Create new tasks with a **title** and **description**
- Display **only the 5 most recent tasks**
- Mark tasks as **completed** (completed tasks are hidden from the UI)

The project follows a **three-tier architecture**:
1. **Frontend** – React SPA served via Nginx  
2. **Backend API** – Node.js with Express, REST API  
3. **Database** – MySQL with an initialized `task` table  

All components run inside **Docker containers** orchestrated with `docker-compose`.

---

## 🛠 Tech Stack
- **Frontend:** React, JavaScript,  CSS, Nginx
- **Backend:** Node.js, Express.js,SQL, JWT Authentication
- **Database:** MySQL 8.0
- **Containerization:** Docker, Docker Compose
- **Testing:** Jest, React Testing Library

---

## 📂 Project Structure
todo-app/
│
├── backend/ # Node.js + Express API
│ ├── controllers/ # Business logic
│ ├── routes/ # API endpoints
│ ├── middleware/ # Auth & validation
│ ├── db/ # init.sql for table creation
│ ├── tests/ # Backend unit/integration tests
│ ├── Dockerfile
│ └── package.json
│
├── frontend/ # React SPA
│ ├── src/components # UI Components
│ ├── src/pages # App Pages
│ ├── tests/ # Frontend tests
│ ├── Dockerfile
│ ├── nginx.conf
│ └── package.json
│
├── docker-compose.yml
└── README.md


---

## 🚀 Running the Project with Docker

### 1️⃣ Clone the repository

git clone https://github.com/Raveesha-Amarawickrama/TodoWebApp
cd todo-app

### Start all services
docker-compose up --build
### Access the application
Frontend UI: http://localhost:3000

Backend API: http://localhost:5000/api

Database: MySQL available inside the db container on port 3307 (mapped from 3306)

**Database Initialization**
The init.sql script inside backend/db/ creates the task table and inserts sample data automatically when the MySQL container is first started.

### Running Tests

### Backend:
cd backend
npm test

### Frontend:
cd frontend
npm test

### 📦 API Endpoints
Method	Endpoint	Description
GET	/api/tasks	Get latest 5 incomplete tasks
POST	/api/tasks	Add a new task
PUT	/api/tasks/:id/done	Mark a task as completed

💡 Notes
Environment variables for DB credentials are stored in .env files (excluded via .gitignore).

The backend connects to the database using the container hostname db.

All services are containerized and can be run with a single command.
