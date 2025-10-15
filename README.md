# Alumni Management Portal

A comprehensive, full-stack alumni management system built with React, Node.js, Express, and PostgreSQL. This portal enables educational institutions to manage verified alumni data, facilitate networking, and maintain up-to-date information while respecting data privacy and verification workflows.

## 🚀 Features

### Core Functionality
- **Bulk CSV Upload**: Admin can upload verified alumni data in bulk
- **Profile Management**: Static vs. claimed profiles with verification workflow
- **Alumni Directory**: Searchable and filterable alumni database
- **Connection System**: Students can request connections with alumni
- **Messaging System**: Real-time chat between connected users
- **Stale Data Handling**: Automatic detection and highlighting of outdated profiles

### User Roles
- **Admin**: CSV uploads, profile verification, user management
- **Alumni**: Profile claiming, connection requests, messaging
- **Student**: Directory browsing, connection requests, networking

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Granular permissions system
- **Responsive Design**: Mobile-first, modern UI with Tailwind CSS
- **Real-time Updates**: Dynamic status tracking and notifications
- **Data Validation**: Comprehensive input validation and error handling
- **CSV Processing**: Robust CSV parsing with validation and error reporting

## 🏗️ Architecture

### Frontend (React)
```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── AlumniCard.jsx  # Alumni profile card
│   │   ├── CSVUploadForm.jsx # CSV upload interface
│   │   ├── DirectoryFilters.jsx # Search and filter controls
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── pages/              # Main application pages
│   │   ├── Landing.jsx     # Home page
│   │   ├── Login.jsx       # Authentication page
│   │   ├── AdminDashboard.jsx # Admin interface
│   │   ├── AlumniDashboard.jsx # Alumni interface
│   │   ├── StudentDashboard.jsx # Student interface
│   │   ├── ProfilePage.jsx # Profile management
│   │   └── ChatPage.jsx    # Messaging interface
│   ├── context/            # React context providers
│   │   └── AuthContext.jsx # Authentication state management
│   ├── services/           # API service layer
│   │   └── api.js         # Axios configuration and API methods
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── package.json           # Frontend dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js        # Vite build configuration
└── index.html            # HTML template
```

### Backend (Node.js + Express)
```
backend/
├── config/
│   └── db.js             # Database connection configuration
├── controllers/          # Request handlers
│   ├── authController.js # Authentication logic
│   ├── adminController.js # Admin-specific operations
│   ├── alumniController.js # Alumni operations
│   ├── studentController.js # Student operations
│   └── messageController.js # Messaging operations
├── middlewares/          # Express middlewares
│   ├── auth.js          # JWT authentication
│   ├── rbac.js          # Role-based access control
│   └── errorHandler.js  # Error handling
├── models/              # Data models
│   ├── userModel.js     # User model
│   ├── alumniModel.js   # Alumni profile model
│   ├── studentModel.js  # Student model
│   ├── adminModel.js    # Admin model
│   ├── interactionModel.js # Connection requests model
│   ├── messageModel.js  # Messages model
│   └── csvUploadModel.js # CSV upload tracking
├── routes/              # API routes
│   ├── auth.js         # Authentication routes
│   ├── admin.js        # Admin routes
│   ├── alumni.js       # Alumni routes
│   ├── student.js      # Student routes
│   └── messages.js     # Messaging routes
├── utils/              # Utility functions
│   ├── csvParser.js    # CSV parsing logic
│   └── validators.js   # Data validation
├── app.js              # Express application setup
├── server.js           # Server entry point
└── package.json        # Backend dependencies
```

### Database (PostgreSQL)
```
database/
└── schema.sql          # Complete database schema with:
    ├── Users table     # Authentication and basic user info
    ├── Alumni profiles # Extended alumni information
    ├── Students table  # Student-specific data
    ├── Admins table    # Admin-specific data
    ├── Interactions    # Connection requests
    ├── Messages        # Chat messages
    ├── CSV uploads     # Upload tracking
    ├── Views           # Optimized queries
    └── Indexes         # Performance optimization
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd dbmsProject
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb alumni_portal

# Run the schema
psql alumni_portal < database/schema.sql
```

### 3. Backend Setup
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your database credentials

# Start the backend server
npm run dev
```

### 4. Frontend Setup
```bash
cd frontend
npm install

# Create environment file (optional)
# Set VITE_API_BASE_URL=http://localhost:5000/api

# Start the frontend development server
npm run dev
```

### 5. Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=alumni_portal
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Alumni Management Portal
```

## 🚀 Usage

### 1. Initial Setup
1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Register as an admin to begin using the system

### 2. Admin Workflow
1. **Upload CSV**: Use the admin dashboard to upload alumni data
2. **Verify Claims**: Review and approve alumni profile claims
3. **Manage Users**: View user statistics and manage accounts
4. **Monitor Activity**: Track uploads and system usage

### 3. Alumni Workflow
1. **Claim Profile**: Use institutional email to claim existing profile
2. **Wait for Verification**: Admin must approve the claim
3. **Update Profile**: Edit professional information once verified
4. **Manage Connections**: Accept/reject student connection requests
5. **Chat with Students**: Message accepted connections

### 4. Student Workflow
1. **Register Account**: Create student account
2. **Browse Directory**: Search and filter alumni profiles
3. **Send Requests**: Request connections with verified alumni
4. **Chat with Alumni**: Message accepted connections

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register-student` - Student registration
- `POST /api/auth/register-admin` - Admin registration
- `POST /api/auth/claim-profile` - Alumni profile claiming
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Admin
- `POST /api/admin/upload-csv` - Upload alumni CSV
- `GET /api/admin/pending-claims` - Get pending claims
- `PUT /api/admin/claims/:id` - Approve/reject claim
- `GET /api/admin/dashboard-stats` - Dashboard statistics
- `GET /api/admin/upload-history` - Upload history

### Alumni
- `GET /api/alumni/profile` - Get alumni profile
- `PUT /api/alumni/profile` - Update alumni profile
- `GET /api/alumni/requests` - Get connection requests
- `PUT /api/alumni/requests/:id` - Respond to request
- `GET /api/alumni/connections` - Get accepted connections

### Student
- `GET /api/student/directory` - Get alumni directory
- `POST /api/student/request/:alumniId` - Send connection request
- `GET /api/student/requests` - Get sent requests
- `GET /api/student/connections` - Get accepted connections

### Messages
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/conversation/:userId` - Get conversation
- `POST /api/messages/send` - Send message
- `PUT /api/messages/read` - Mark as read

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Database Testing
```bash
# Test database connection
psql alumni_portal -c "SELECT NOW();"

# Test schema integrity
psql alumni_portal -c "SELECT * FROM information_schema.tables WHERE table_schema = 'public';"
```

## 📈 Performance Optimization

### Database
- Indexes on frequently queried columns
- Optimized views for directory searches
- Connection pooling for better performance

### Frontend
- Code splitting with Vite
- Lazy loading of components
- Optimized bundle size
- Efficient state management

### Backend
- Request validation and sanitization
- Error handling middleware
- JWT token optimization
- CSV processing optimization

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Comprehensive data validation
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin requests
- **Rate Limiting**: API request throttling
- **Error Handling**: Secure error responses

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy to cloud platform (Heroku, Railway, etc.)
4. Set up process manager (PM2)

### Frontend Deployment
1. Build production bundle
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Configure environment variables
4. Set up custom domain

### Database Deployment
1. Set up managed PostgreSQL service
2. Configure connection pooling
3. Set up automated backups
4. Monitor performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints
- Contact the development team

## 🔮 Future Enhancements

- **Real-time Notifications**: WebSocket integration
- **Advanced Analytics**: User engagement metrics
- **Mobile App**: React Native application
- **Email Integration**: Automated email notifications
- **File Uploads**: Profile pictures and documents
- **Advanced Search**: Elasticsearch integration
- **API Rate Limiting**: Advanced throttling
- **Multi-language Support**: Internationalization

---

**Built with ❤️ for educational institutions worldwide**