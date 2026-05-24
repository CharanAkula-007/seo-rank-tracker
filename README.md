# 🚀 SEO Rank Tracker

A full-stack web application that helps you track your website's keyword rankings across Google search results, analyze SEO performance, and generate comprehensive reports.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Features

- **🔍 Keyword Rank Tracking** - Track your website's ranking positions on Google for multiple keywords
- **📊 Real-time Analytics** - Monitor keyword performance with up-to-date data
- **📈 Performance Reports** - Generate detailed SEO analysis reports
- **🔄 Automated Tracking** - Scheduled cron jobs for continuous rank monitoring
- **👥 User Authentication** - Secure login and registration system
- **📱 Responsive Dashboard** - Clean, intuitive interface for managing rankings
- **💾 Search History** - View and manage your analysis history
- **🎯 Detailed Metrics** - Score gauges and performance indicators
- **🤖 AI-Powered Analysis** - Google Genai integration for intelligent SEO insights

### Secondary Features

- Multi-keyword tracking support
- Domain comparison and analysis
- Historical rank trend tracking
- SEO issue detection and reporting
- Automated rank tracking via cron jobs
- Role-based access control

---

## 🛠 Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Backend

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Playwright** - Browser automation
- **Browserbase SDK** - Headless browser service
- **Google Genai** - AI analysis integration
- **node-cron** - Task scheduling

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** (v9 or higher)
- **MongoDB** (local or Atlas cloud)
- **Git**

Required API Keys:

- Google Genai API key
- Browserbase API key
- MongoDB connection string

---

## 📦 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/seo-rank-tracker.git
cd seo-rank-tracker
```

### Step 2: Install Server Dependencies

```bash
cd server
npm install
```

### Step 3: Install Client Dependencies

```bash
cd ../client
npm install
```

---

## 🔧 Project Setup

### Server Setup

#### 1. Create Environment File

In the `server` directory, create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/seo-rank-tracker
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
BROWSERBASE_API_KEY=your_browserbase_api_key
NODE_ENV=development
```

#### 2. Environment Variables Explanation

| Variable               | Description                          |
| ---------------------- | ------------------------------------ |
| `PORT`                 | Server port (default: 5000)          |
| `MONGODB_URI`          | MongoDB connection string            |
| `JWT_SECRET`           | Secret key for JWT token generation  |
| `GOOGLE_GENAI_API_KEY` | API key for Google Genai service     |
| `BROWSERBASE_API_KEY`  | API key for Browserbase service      |
| `NODE_ENV`             | Environment (development/production) |

### Client Setup

#### 1. Create Environment File

In the `client` directory, create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

#### 2. Build Configuration

The client uses Vite with TypeScript. Configuration files:

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration

---

## 🚀 Running the Application

### Option 1: Run Separately (Development)

#### Start the Server

```bash
cd server
npm run server
# or
npm start
```

The server will start on `http://localhost:5000`

#### Start the Client (in a new terminal)

```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173`

### Option 2: Run Both Concurrently

From the root directory, install concurrently:

```bash
npm install -D concurrently
```

Then create a `package.json` script at the root level with:

```json
"scripts": {
  "dev": "concurrently \"cd server && npm run server\" \"cd client && npm run dev\""
}
```

### Production Build

#### Build the Client

```bash
cd client
npm run build
```

#### Build for Production

```bash
cd server
npm start
```

---

## 📁 Project Structure

```
seo-rank-tracker/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React context (AppContext, ThemeContext)
│   │   ├── assets/           # Static assets
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Public files
│   ├── package.json
│   ├── vite.config.ts        # Vite configuration
│   └── tsconfig.json         # TypeScript configuration
│
├── server/                    # Express backend
│   ├── config/               # Database configuration
│   ├── controllers/          # Route controllers
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── services/             # Business logic services
│   ├── middleware/           # Custom middleware
│   ├── cron/                 # Scheduled tasks
│   ├── server.js             # Server entry point
│   └── package.json
│
└── README.md                 # This file
```

### Key Directories Explained

#### Client Components

- `Navbar.tsx` - Navigation bar
- `ProtectedRoute.tsx` - Route protection for authenticated users
- `ScoreGauge.tsx` - Visual representation of SEO scores
- `Loading.tsx` - Loading indicator
- `home/` - Landing page components

#### Server Services

- `rankTrackerService.js` - Rank tracking logic using Browserbase & Playwright
- `geminiService.js` - Google Genai integration for AI analysis
- `scraperService.js` - Web scraping functionality
- `keywordTrackingSevice.js` - Keyword tracking logic

#### API Routes

- `/api/auth` - Authentication endpoints (login, register)
- `/api/rank` - Rank tracking endpoints
- `/api/analysis` - Analysis and report endpoints

---

## 💡 Usage

### 1. User Registration & Login

- Navigate to the home page
- Click "Register" to create a new account
- Login with your credentials

### 2. Add Keywords to Track

- Go to the Dashboard
- Enter a keyword and target domain
- Click "Analyze" to start tracking

### 3. View Rankings

- Access the "Rank Tracker" page
- See current rankings for your keywords
- View historical trends

### 4. Generate Reports

- Select a keyword analysis
- Click "Generate Report"
- Download or view detailed analysis

### 5. View History

- Go to "History" page
- Review past analyses and reports
- Track performance over time

---

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Rank Tracking

- `POST /api/rank/track` - Track keyword ranking
- `GET /api/rank/history` - Get ranking history
- `GET /api/rank/:id` - Get specific rank details

### Analysis

- `POST /api/analysis/analyze` - Create new analysis
- `GET /api/analysis` - Get all analyses
- `GET /api/analysis/:id` - Get specific analysis
- `GET /api/analysis/report/:id` - Generate report

---

## 🔐 Environment Security

Never commit `.env` files to version control. Create a `.gitignore` file:

```
.env
.env.local
.env.*.local
node_modules/
dist/
build/
.DS_Store
*.log
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

- Verify MongoDB URI in `.env`
- Ensure MongoDB service is running
- Check network access (for Atlas)

### Browserbase API Issues

- Verify API key is correct
- Check Browserbase quota/limits
- Ensure network connectivity

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Build Errors

- Clear `node_modules` and reinstall: `npm install`
- Clear cache: `npm cache clean --force`
- Rebuild: `npm run build`

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [Playwright Documentation](https://playwright.dev)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👨‍💻 Author

AKULA CHARAN

---

## 📞 Support

For support, email charanakula63@gmail.com or open an issue on GitHub.


