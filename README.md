# 🌌 Kanban Flow - Task Management System

**Kanban Flow** is a task management application built with React and Node.js. It provides a clean interface for organizing tasks across different stages with drag-and-drop functionality.

## 🚀 Live Application

**Full Stack App**: [https://kanban-flow-hqim.vercel.app/](https://kanban-flow-hqim.vercel.app/)

> **Note**: Backend is hosted on Render's free tier, so initial loading may take 30-60 seconds as the server spins up from sleep mode.

---

## 🎨 Features
- **Task Management**: Create, update, and delete tasks
- **Kanban Board**: Drag-and-drop tasks between columns (Pending, In Progress, Completed)
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Immediate UI feedback for all actions

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React with TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **State Management**: TanStack Query
-   **Drag & Drop**: @hello-pangea/dnd
-   **Icons**: Lucide React

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB Atlas
-   **ODM**: Mongoose
-   **Authentication**: JWT with bcryptjs

### Deployment
-   **Frontend**: Vercel
-   **Backend**: Render
-   **Database**: MongoDB Atlas (Cloud)

---

## 🏗️ Architecture

The application uses a separated frontend-backend architecture:

```
Frontend (Vercel)          Backend (Render)          Database
├── React SPA         →    ├── Express API      →   ├── MongoDB Atlas
├── Static Assets          ├── JWT Auth              ├── User Collection
├── Client Routing         ├── Task Routes           └── Task Collection
└── API Calls              └── CORS Configuration
```

**Components:**
- **Frontend**: Single Page Application hosted on Vercel
- **Backend**: RESTful API hosted on Render
- **Database**: MongoDB Atlas for data persistence

**Scalability**: The architecture can be extended to support multi-team development with its clear separation of concerns between frontend and backend.

## ✨ Application Flow

1.  **Landing Page**: Introduction to the application with navigation options
2.  **Authentication**: User registration and login system
3.  **Dashboard**: Main kanban board with three columns:
    -   **Pending**: New tasks waiting to be started
    -   **In Progress**: Tasks currently being worked on
    -   **Completed**: Finished tasks
4.  **Task Management**: Create, edit, delete, and move tasks between columns
5.  **Profile**: User account management

---

## ⚡ Local Development

To run this project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/guptashreyansh458/ShreyanshGupta_BTECH-10271-22.git
    cd ShreyanshGupta_BTECH-10271-22
    ```

2.  **Install Dependencies**
    ```bash
    # Install backend dependencies
    cd backend
    npm install
    
    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3.  **Environment Setup**
    Create `.env` files in both `backend` and `frontend` directories.
    
    *backend/.env*:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```
    
    *frontend/.env*:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

4.  **Run Locally**
    ```bash
    # Terminal 1: Backend
    cd backend
    npm run dev
    
    # Terminal 2: Frontend
    cd frontend
    npm run dev
    ```

## 🌐 Deployment Architecture

**Frontend (Vercel)**:
- Hosts the React application as static files
- Handles client-side routing
- Connects to backend API

**Backend (Render)**:
- Hosts the Express.js API server
- Manages database connections
- Handles authentication and business logic

**Database (MongoDB Atlas)**:
- Cloud-hosted MongoDB database
- Stores user accounts and task data
- Provides data persistence

## 📝 Development Notes

This project demonstrates:
- Full-stack JavaScript development
- RESTful API design
- Modern React patterns with hooks
- JWT authentication implementation
- Cloud deployment strategies
- Responsive web design

The codebase is structured for potential team collaboration and can be extended for multi-team environments with proper API versioning and microservices architecture.

---

## 📝 Submission Details
**Developer**: Shreyansh Gupta
**Roll No**: 10271-22
**Course**: B.Tech

