# Walmart Global Tech Replica Portal

A high-fidelity full-stack replica of the Walmart Global Tech website.

## Tech Stack
- **Frontend**: React (Vite, React Router DOM, Lucide Icons)
- **Backend**: Node.js & Express
- **Database**: MongoDB (Mongoose)
- **Styling**: Premium Vanilla CSS

## Directory Structure
- `backend/`: API Server, models, routing, configuration, and db seeding script.
- `frontend/`: Single-page application, custom design systems, components, and pages.

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally on `mongodb://localhost:27017`

### Setup Instructions
1. Install all dependencies for root, client, and server:
   ```bash
   npm run install:all
   ```

2. Seed the MongoDB database with initial tech careers and news updates:
   ```bash
   npm run seed
   ```

3. Run both the backend and frontend dev servers concurrently:
   ```bash
   npm run dev
   ```

### URLs
- **Client**: `http://localhost:5173/`
- **Server API**: `http://localhost:5000/`
