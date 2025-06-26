# Todo .NET + Angular Full-Stack App

## Overview
A full-stack To-Do application built with .NET 8 (C# 12) for the backend, Angular 18 for the frontend, and SQL Server Express as the database. Tasks can belong to multiple groups (many-to-many). The app supports CRUD for tasks and groups, group assignment, and is fully Dockerized.

---

## Project Structure

```
todo-dotnet-angular/
  backend/    # .NET 8 Web API (C# 12, EF Core, Docker)
  frontend/   # Angular 18 (TypeScript, CSS)
  postman/    # Postman collection for API testing
```

---

## Prerequisites
- [Node.js](https://nodejs.org/) (for frontend)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) (for backend)
- [Docker](https://www.docker.com/) (for running the database container)

---

## Default Development Workflow: Hybrid Local Backend/Frontend, Containerized Database

This project is designed to run the backend and frontend locally, while keeping the SQL Server database containerized for easy setup and isolation.

### 1. Start the Database Container
From the project root, run:
```sh
docker-compose -f docker-compose.db.yml up -d
```
This will start the SQL Server database container, accessible at `localhost:1433`.
   **How to test the database connection:**
   - You can use [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) or any SQL client to connect to the database:
   - **Server name:** `localhost,1433`
   - **Login:** `sa`
   - **Password:** `Your_password123`
   - If you can connect to the database, the containerized sql server is accessible.

### 2. Backend Setup
1. Ensure your `backend/.env` (or `appsettings.json`) uses the following connection string (already set by default):
   ```env
   ConnectionStrings__DefaultConnection=Server=localhost,1433;Database=TodoDb;User=sa;Password=Your_password123;TrustServerCertificate=True;
   ```
2. Install dependencies and run migrations:
   ```sh
   cd backend
   dotnet restore
   dotnet ef database update
   dotnet run
   ```
   The API will be available at `http://localhost:{your_port}/api`.
   example: `http://localhost:5000/api`
   Check the port number in the console output. It will be something like `info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://[::]:5000
      Application started. Press Ctrl+C to shut down.`

### 3. Frontend Setup
1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start the Angular app:
   ```sh
   npm start
   ```
   The app will be available at `http://localhost:4200`.

---

## Environment Variables & Security

### Environment Files
- `backend/env.example` - Example environment configuration
- `backend/.env` - **Local environment file (not committed to git)**
- `backend/appsettings.json` - Default configuration (committed to git)

### Security Best Practices
1. **Never commit `.env` files** - They may contain sensitive information like database passwords
2. **Use `.env.example`** - Copy `backend/env.example` to `backend/.env` and update with your values
3. **Update `.gitignore`** - The project includes a comprehensive `.gitignore` that excludes:
   - All `.env` files
   - Build artifacts (`bin/`, `obj/`, `dist/`)
   - IDE files (`.vs/`, `.vscode/`)
   - Node modules and cache files

### If you accidentally committed a `.env` file:
1. Remove it from git tracking:
   ```bash
   git rm --cached backend/.env
   ```
2. Commit the removal:
   ```bash
   git commit -m "Remove .env file from tracking"
   ```
3. The file will remain locally but won't be tracked by git anymore

---

## API & Postman Collection

- Import the Postman collection from `postman/todo-app.postman_collection.json` for example requests covering:
  - Create/read/update/delete task
  - Create/read/update/delete group
  - Assign/unassign group to task
- All endpoints are available at `http://localhost:5000/api`.

---

## Database Seeding
- (Optional) Add initial data by implementing a seeding method in the backend (see `Program.cs` or a custom seeder class).

---

## License
MIT
