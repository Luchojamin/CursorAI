# Full-Stack To-Do App

This is a full-stack To-Do application built with Angular 18, Node.js, Express, Prisma, and PostgreSQL.

## Features

- Manage tasks with due dates.
- Group tasks together.
- A task can belong to multiple groups (many-to-many relationship).

## Tech Stack 

- **Frontend:** Angular 18, CSS
- **Backend:** Node.js, Express, TypeScript, Prisma
- **Database:** PostgreSQL (running in Docker)

## Prerequisites

- Node.js and npm
- Docker and Docker Compose
- Angular CLI

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/full-stack-todo-app.git
    cd full-stack-todo-app
    ```

2.  **Backend Setup:**

    - Navigate to the `backend` directory:
      ```bash
      cd backend
      ```
    - Create a `.env` file from the `.env.example` template and fill in the database credentials.
    - Start the PostgreSQL database using Docker:
      ```bash
      docker-compose up -d
      ```
    - Install the backend dependencies:
      ```bash
      npm install
      ```
    - Run the database migrations:
      ```bash
      npx prisma migrate dev
      ```
    - Start the backend server:
      ```bash
      npm run dev
      ```
    The backend will be running at `http://localhost:3000`.

3.  **Frontend Setup:**

    - Navigate to the `frontend` directory:
      ```bash
      cd ../frontend
      ```
    - Install the frontend dependencies:
      ```bash
      npm install
      ```
    - Start the frontend development server:
      ```bash
      ng serve
      ```
    The frontend will be running at `http://localhost:4200`.

## API Endpoints

A Postman collection with example requests is available in the `postman` directory.

### Tasks

- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Groups

- `GET /api/groups`
- `GET /api/groups/:id`
- `POST /api/groups`
- `PUT /api/groups/:id`
- `DELETE /api/groups/:id`

### Task-Group Associations

- `POST /api/tasks/:taskId/groups/:groupId`
- `DELETE /api/tasks/:taskId/groups/:groupId` 