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
    - After your docker is running, try to connect to the DB using the PgAdmin with the credentials you provided in the `.env` file.
    - If you are able to connect to the DB, then the DB is running and you can proceed to the next step.
    - If you are not able to connect to the DB, then there is an issue with the DB. Please check the logs of the docker container and fix the issue.

    - Install the backend dependencies:
      ```bash
      npm install
      ```
    - Run the database migrations:
      ```bash
      npx prisma migrate dev
      ```
    - Run the next sql query to check if tables are created as it was specified in the `prisma/schema.prisma` file:
      ```sql
      SELECT * FROM "Task";
      SELECT * FROM "Group";
      SELECT * FROM "TaskGroup";
      ```
      If you see the structure of the tables, then the tables are created and you can proceed to the next step.
      If you don't see the structure of the tables, then there is an issue with the migrations. Please check the logs of the docker container and fix the issue.

    - Start the backend server:
      ```bash
      npm run dev
      ```
    The backend will be running at `http://localhost:3000`.

3.  **Frontend Setup:** Open a new terminal and follow the steps below:

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