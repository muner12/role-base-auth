# Role-Based Authentication API

A comprehensive Node.js API with role-based authentication system including user management, student/teacher interactions, and task management features.

## Features

- Multi-role authentication (User, Admin, SuperAdmin, Student, Teacher)
- JWT authentication with access and refresh tokens
- User, Student, and Teacher registration and login
- Role assignment and management
- Todo list management
- Attendance tracking system
- API documentation with Swagger

## API Documentation

This project includes Swagger documentation for all API endpoints. You can access the interactive API docs at:

```
http://localhost:8000/api-docs
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a .env file with the following variables:

```
PORT=8000
MONGO_URI=<your_mongodb_connection_string>
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
```

4. Start the server:

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

## API Endpoints Overview

### Authentication
- POST `/api/register` - Register a new user
- POST `/api/studentRegister` - Register a new student
- POST `/api/teacherRegister` - Register a new teacher
- POST `/api/login` - User login
- POST `/api/studentLogin` - Student login
- POST `/api/teacherLogin` - Teacher login
- POST `/api/refresh` - Refresh access token

### User Management (Protected Routes)
- POST `/api/users` - View user information (Admin, SuperAdmin)
- POST `/api/admin` - Admin protected route
- POST `/api/allUserData` - View all users data (SuperAdmin)
- POST `/api/assignRole` - Assign role to a user (SuperAdmin)
- POST `/api/deleteRole` - Delete role from a user (SuperAdmin)

### Education System
- POST `/api/viewStudentByTeacher` - Teacher views students (Teacher)
- POST `/api/studentAttendance` - Mark student attendance (Student)
- POST `/api/viewStudentAttendance` - View student attendance (Student)

### Todo Management
- POST `/api/todos` - Create a new todo
- GET `/api/todos` - Get all todos
- GET `/api/todos/:id` - Get a todo by ID
- PUT `/api/todos/:id` - Update a todo
- DELETE `/api/todos/:id` - Delete a todo

### Webhook
- POST `/api/webhook` - Process webhook data

## Authorization

Many endpoints require specific roles for access. The system uses JWT tokens for authentication and authorization.
