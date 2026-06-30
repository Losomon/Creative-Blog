# Blog Backend API

A full-featured Express.js backend for a tech blog platform with authentication, articles, comments, likes, and newsletter management.

## Features

- **User Authentication**: JWT-based auth with registration and login
- **Article Management**: Create, read, update, publish articles
- **Categories**: Manage blog categories
- **Comments**: Comment system with moderation
- **Likes**: Track article likes
- **Newsletter**: Email subscription management
- **Role-based Access**: Admin, Author, Reader roles
- **Error Handling**: Comprehensive error handling and logging
- **Validation**: Input validation with Zod

## Project Structure

```
src/
├── controllers/     # Request handlers
├── routes/         # API routes
├── middleware/     # Express middleware
├── services/       # Business logic
├── utils/          # Utilities (JWT, validators, logger, errors)
├── types/          # TypeScript type definitions
└── index.ts        # Server entry point
```

## Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file**:
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your values**:
   ```
   DATABASE_URL=mongodb+srv://...
   JWT_SECRET=your-secret-key
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

4. **Generate Prisma Client**:
   ```bash
   npm run prisma:generate
   ```

5. **Push schema to MongoDB**:
   ```bash
   npm run prisma:push
   ```

## Running the Server

**Development** (with hot reload):
```bash
npm run dev
```

**Production**:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PATCH /api/auth/profile` - Update profile

### Articles
- `GET /api/articles` - Get all articles (paginated)
- `GET /api/articles/featured` - Get featured articles
- `GET /api/articles/trending` - Get trending articles
- `GET /api/articles/:slug` - Get single article
- `POST /api/articles` - Create article (Authors only)
- `PATCH /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article
- `POST /api/articles/:id/publish` - Publish article

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get single category
- `POST /api/categories` - Create category (Admin only)
- `PATCH /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Comments
- `GET /api/comments/article/:articleId` - Get article comments
- `POST /api/comments/article/:articleId` - Create comment
- `GET /api/comments/pending` - Get pending comments (Admin)
- `POST /api/comments/:id/approve` - Approve comment (Admin)
- `DELETE /api/comments/:id` - Delete comment (Admin)

### Likes
- `POST /api/likes/article/:articleId/toggle` - Toggle like
- `GET /api/likes/article/:articleId/status` - Check if liked
- `GET /api/likes/article/:articleId/count` - Get likes count
- `GET /api/likes/user/likes` - Get user's liked articles

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe
- `GET /api/newsletter/subscribers` - Get all subscribers (Admin)
- `GET /api/newsletter/count` - Get subscriber count (Admin)

## Database Schema

The backend uses MongoDB with Prisma ORM. Key models:

- **User**: Stores user data with roles (ADMIN, AUTHOR, READER)
- **Article**: Blog articles with author and category
- **Category**: Article categories
- **Comment**: Article comments with approval workflow
- **Like**: User likes on articles
- **Newsletter**: Email subscribers

## Error Handling

Custom error classes:
- `ValidationError` - 400 Bad Request
- `AuthenticationError` - 401 Unauthorized
- `AuthorizationError` - 403 Forbidden
- `NotFoundError` - 404 Not Found
- `ConflictError` - 409 Conflict
- `InternalServerError` - 500 Server Error

## Middleware

- **authenticate**: Verifies JWT token
- **authorize**: Checks user roles
- **optionalAuth**: Optional authentication
- **errorHandler**: Global error handler
- **asyncHandler**: Wraps async route handlers

## Logging

Uses a custom logger with levels: error, warn, info, debug.
Set `LOG_LEVEL` environment variable to control verbosity.

## Security

- **Helmet**: HTTP headers security
- **CORS**: Cross-origin requests control
- **bcrypt**: Password hashing
- **JWT**: Token-based authentication
- **Input Validation**: Zod schemas for all inputs

## Development Commands

```bash
npm run dev              # Start dev server
npm run build            # Build TypeScript
npm start                # Run production build
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Sync schema with database
npm run prisma:studio    # Open Prisma Studio
```

## Next Steps

1. Set up MongoDB Atlas cluster
2. Configure environment variables
3. Run `npm install` and `npm run prisma:push`
4. Start development with `npm run dev`
5. Connect frontend to backend API

## License

ISC
