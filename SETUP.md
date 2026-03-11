# Setup Instructions for Sportsperson Stats and Records

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Git

## Database Setup (Supabase)

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Set up Database Schema**
   - In Supabase Dashboard, go to SQL Editor
   - Run the SQL commands from `database/schema.sql`
   - This will create all necessary tables and sample data

3. **Get Supabase Credentials**
   - Project Settings → API
   - Copy the Project URL and Anon Key

## Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start Backend Server**
   ```bash
   npm run dev
   ```
   - Backend will run on `http://localhost:5000`
   - API documentation available at `http://localhost:5000/api`

## Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Configure API URL:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start Frontend Development Server**
   ```bash
   npm start
   ```
   - Frontend will run on `http://localhost:3000`

## Testing the Application

1. **Verify Backend**
   - Visit `http://localhost:5000/health` - should return "OK"
   - Visit `http://localhost:5000/api` - should show API documentation

2. **Verify Frontend**
   - Visit `http://localhost:3000` - should show the home page
   - Navigate to "Sportspersons" to see the list of sportspersons
   - Try searching, adding, and editing sportspersons

## Project Structure

```
sportsperson-stats/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # API route handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   └── index.js         # Server entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   ├── App.js           # Main App component
│   │   └── index.js         # React entry point
│   ├── public/
│   ├── package.json
│   └── .env.example
├── database/
│   └── schema.sql           # Database schema
└── README.md
```

## API Endpoints

### Sportspersons
- `GET /api/sportspersons` - Get all sportspersons
- `GET /api/sportspersons/:id` - Get sportsperson by ID
- `GET /api/sportspersons/:id/details` - Get sportsperson with all details
- `POST /api/sportspersons` - Create new sportsperson
- `PUT /api/sportspersons/:id` - Update sportsperson
- `DELETE /api/sportspersons/:id` - Delete sportsperson
- `GET /api/sportspersons/search?q=query` - Search sportspersons

### Statistics
- `GET /api/statistics/:sportspersonId` - Get statistics by sportsperson
- `POST /api/statistics` - Create statistics
- `PUT /api/statistics/:id` - Update statistics
- `DELETE /api/statistics/:id` - Delete statistics

### Achievements
- `GET /api/achievements/:sportspersonId` - Get achievements by sportsperson
- `POST /api/achievements` - Create achievement
- `PUT /api/achievements/:id` - Update achievement
- `DELETE /api/achievements/:id` - Delete achievement

### Records
- `GET /api/records/:sportspersonId` - Get records by sportsperson
- `POST /api/records` - Create record
- `PUT /api/records/:id` - Update record
- `DELETE /api/records/:id` - Delete record

### Awards
- `GET /api/awards/:sportspersonId` - Get awards by sportsperson
- `POST /api/awards` - Create award
- `PUT /api/awards/:id` - Update award
- `DELETE /api/awards/:id` - Delete award

### Sport Categories
- `GET /api/sport-categories` - Get all sport categories
- `POST /api/sport-categories` - Create sport category
- `PUT /api/sport-categories/:id` - Update sport category
- `DELETE /api/sport-categories/:id` - Delete sport category

## Features

- **Browse Sportspersons**: View all sportspersons with their basic information
- **Detailed Profiles**: Complete profiles with statistics, achievements, records, and awards
- **Search Functionality**: Search sportspersons by name, nationality, or sport
- **CRUD Operations**: Add, edit, and delete sportsperson records
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface using Tailwind CSS

## Deployment

### Frontend (Vercel)
1. Push code to GitHub repository
2. Connect Vercel to your GitHub repository
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Backend (Optional)
- Can be deployed to platforms like Heroku, Railway, or Vercel Serverless
- Update frontend API URL to point to deployed backend

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS settings include your frontend URL
2. **Database Connection**: Verify Supabase credentials are correct
3. **Port Conflicts**: Change PORT in backend .env if 5000 is in use
4. **Environment Variables**: Ensure all required env variables are set

### Getting Help

- Check the browser console for frontend errors
- Check the terminal for backend error messages
- Verify Supabase connection in the dashboard
- Ensure all dependencies are installed correctly
