# Sportsperson Stats and Records

A full-stack web application for storing, managing, and displaying statistics, achievements, and records of different sportspersons.

## Tech Stack

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (frontend)
- **Version Control**: Git & GitHub

## Project Structure

```
sportsperson-stats/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── config/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
└── README.md
```

## Features

- Browse sportsperson profiles
- Search for players
- View detailed statistics, achievements, and records
- CRUD operations for sportsperson data
- RESTful API endpoints
- Responsive design

## Setup Instructions

1. Clone the repository
2. Set up Supabase database
3. Configure backend environment variables
4. Install dependencies
5. Run the development servers

## API Endpoints

- `GET /api/sportspersons` - Get all sportspersons
- `GET /api/sportspersons/:id` - Get sportsperson by ID
- `POST /api/sportspersons` - Add new sportsperson
- `PUT /api/sportspersons/:id` - Update sportsperson
- `DELETE /api/sportspersons/:id` - Delete sportsperson
