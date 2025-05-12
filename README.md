# Quantum Chat

A real-time chat application built with TypeScript, Express, Socket.io, and PostgreSQL.

## Features

- Real-time messaging between users
- User authentication with session management
- Chat room functionality (join/leave groups)
- Persistent chat history
- User profiles with display pictures
- Group management with admin roles
- Media sharing capabilities

## Tech Stack

- **Backend**: Node.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Real-time Communication**: Socket.io
- **Template Engine**: EJS
- **Authentication**: Bcrypt + Cookie-Session
- **Styling**: CSS/SASS

## Project Structure

```
├── src
│   ├── controllers    # Route controllers
│   ├── models        # Database models
│   ├── routes        # API routes
│   ├── views         # EJS templates
│   ├── app.ts        # Express app setup
│   └── index.ts      # Application entry point
├── public
│   ├── css          # Stylesheets
│   ├── js           # Client-side JavaScript
│   └── images       # Static images
├── prisma
│   └── schema.prisma # Database schema
├── .env             # Environment variables
└── package.json     # Project dependencies
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd quantum-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/quantum_chat"
   SESSION_SECRET="your-session-secret"
   PORT=3000
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The application uses the following main entities:

1. Users
   - id (Primary Key)
   - username
   - email
   - password (hashed)
   - displayPicture
   - createdAt
   - updatedAt

2. Groups
   - id (Primary Key)
   - name
   - description
   - createdAt
   - updatedAt

3. Messages
   - id (Primary Key)
   - content
   - userId (Foreign Key)
   - groupId (Foreign Key)
   - createdAt
   - updatedAt

4. GroupMembers
   - id (Primary Key)
   - userId (Foreign Key)
   - groupId (Foreign Key)
   - role (enum: MEMBER, ADMIN)
   - joinedAt

## API Endpoints

### Authentication
- POST /auth/register - Register new user
- POST /auth/login - User login
- POST /auth/logout - User logout

### Groups
- GET /groups - List all groups
- POST /groups - Create new group
- GET /groups/:id - Get group details
- PUT /groups/:id - Update group
- DELETE /groups/:id - Delete group

### Messages
- GET /messages/:groupId - Get group messages
- POST /messages/:groupId - Send message to group

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. # chatroom_quantum_chat
