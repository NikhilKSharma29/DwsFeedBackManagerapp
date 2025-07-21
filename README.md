# Feedback Manager App

A full-stack feedback management application built with Next.js and JSON Server.

## Features

- ✅ Create, Read, Update, and Delete feedback entries
- ✅ Real-time updates
- ✅ Responsive design
- ✅ Form validation
- ✅ Toast notifications
- ✅ Docker support

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Docker (optional)

## Local Development

### 1. Clone the repository

```bash
git clone <repository-url>
cd feedback-manager-app
```

### 2. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Install dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd feedback-api
npm install
cd ..
```

### 4. Start the development servers

#### Option A: Using Docker (Recommended)

```bash
docker-compose up --build
```

#### Option B: Manual Setup

1. Start the backend server:
   ```bash
   cd feedback-api
   npm start
   ```
   The backend will be available at http://localhost:3001

2. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

## Deployment

### Backend (Render.com)

1. Push the `feedback-api` directory to a GitHub repository
2. Deploy to Render.com as a Web Service
3. Set the following environment variables:
   - `NODE_ENV=production`
   - `NPM_CONFIG_PRODUCTION=false`

### Frontend (Vercel)

1. Push the frontend code to a GitHub repository
2. Deploy to Vercel
3. Set the environment variable:
   - `NEXT_PUBLIC_API_URL` - Your Render.com backend URL

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: JSON Server
- **Deployment**: Vercel, Render.com
- **Containerization**: Docker

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
