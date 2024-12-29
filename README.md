## Team Management System

## Project Overview:
The Team Management System is designed to allow efficient management of teams and tasks within an organization. The system uses role-based access control (RBAC) to differentiate access levels. 
The key roles in this system are SuperAdmin, Admin, manager and User.

SuperAdmin: Can create teams, assign roles, and manage users across teams.

Admin: Can manage users and tasks within a team.

Manager: Can manage users and tasks within a team.

User: Can manage their own tasks and view their profile.

Features
## Role-Based Access Control (RBAC):

SuperAdmin: Full access to create teams, add members, and assign roles across teams.

Admin: Can manage users and tasks within their assigned team. Admins can also assign tasks to team members.

User: Can view and manage their own tasks and profile information.

## Team Management:

SuperAdmin: Creates teams and assigns users to these teams. Only SuperAdmin can assign the Admin role.

Admin: Can manage users and tasks within their team after being added by the SuperAdmin.

## Task Management:

Admin: Can create, assign, and manage tasks for team members.
User: Can manage their own tasks (e.g., update task status, mark them as completed).


psiborg/
│
|
├── node_modules/             # Automatically created folder when you install dependencies
|                
│
├──                       
│   ├── controllers/          # Business logic (handling requests)
│   │   ├── userController.js # Handles user authentication (login, register,detail)
│   │   ├── teamController.js # Manages team creation, team-member addition, etc.
│   │   └── taskController.js # Manages task creation, task assignment, etc.
│   │
│   ├── models/               # Mongoose models
│   │   ├── userModel.js      # User schema (with role, teamId, etc.)
│   │   ├── teamModel.js      # Team schema (with members, roles, etc.)
│   │   └── taskModel.js      # Task schema (with title, description, etc.)
│   │
│   ├── routes/               # API route definitions
│   │   ├── userRoutes.js     # Routes for authentication (login, register)
│   │   ├── teamRoutes.js     # Routes for managing teams
│   │   ├── taskRoutes.js     # Routes for managing tasks
│   │   └── index.js          # Main routing file that connects all routes
│   │
│   ├── middlewares/          # Middleware for authentication, validation, etc.
│   │   ├── authMiddleware.js # Verifies JWT token, checks user roles
│   │   
│   |
│   |
│   │
│   ├── dbConnection             # Configuration files
│   │   └── mongodb.js       # MongoDB connection configuration
│   │
│   └── server.js                # Entry point of the application (Express app setup)
│
├── .env                      # Environment variables (like MongoDB URI, JWT secret)
├── .gitignore                # Files to ignore in version control (node_modules, .env)
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
├── LICENSE                   # License file (e.g., MIT)
└── package-lock.json         # Locks the versions of dependencies

## Technologies Used

This project leverages a variety of modern tools and frameworks to create a robust team management system. The key technologies used include:

---

### Backend:

- **Node.js**: JavaScript runtime built on Chrome's V8 engine for building scalable server-side applications.

- **Express.js**: A lightweight web framework for Node.js that facilitates building RESTful APIs.

- **MongoDB**: A NoSQL database used for storing team, user, and task data.

- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, simplifying interactions with the database.

- **JWT (JSON Web Token)**: Used for secure user authentication and authorization in the system.

- **Bcrypt.js**: A library for hashing and securely storing user passwords.

- **Dotenv**: Loads environment variables from a `.env` file to keep sensitive data secure.

- **Cors**: Middleware that enables Cross-Origin Request Sharing (CORS) to handle requests from different origins.


### Development Tools:

- **Postman**: API testing tools for testing the backend endpoints.
- **VS Code**: Code editor used for writing and editing the application’s code.