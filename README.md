# 📝 Posts Manager

A modern, fullstack web application for managing posts with cloud image uploads. Create, edit, delete, and search posts with a beautiful responsive UI.

**Live Demo** (deployment URL when ready)  
**Repository**: GitHub link (when pushed)

---

## ✨ Features

✅ **Create Posts** - Add new posts with title, description, and optional image  
✅ **Edit Posts** - Modify existing posts  
✅ **Delete Posts** - Remove posts with confirmation dialog  
✅ **Search** - Find posts by name in real-time  
✅ **Sort** - Sort posts alphabetically (A→Z / Z→A)  
✅ **Image Upload** - Upload images directly to Cloudinary  
✅ **Responsive Design** - Beautiful UI that works on mobile, tablet, desktop  
✅ **Modern Stack** - Next.js 14, TypeScript, .NET 8, PostgreSQL  

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with built-in optimization
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Cloudinary** - Cloud image storage and optimization

### Backend
- **.NET 8 Web API** - High-performance backend
- **Entity Framework Core** - ORM for database operations
- **PostgreSQL** - Reliable relational database
- **FluentValidation** - Data validation
- **AutoMapper** - Object mapping
- **Swagger/OpenAPI** - API documentation

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (frontend)
- .NET 8 SDK (backend)
- PostgreSQL 12+ (database)
- Cloudinary account (free tier)

### Local Setup (2 minutes)

```bash
# 1. Clone and install dependencies
git clone <repo>
cd PRM232_PE

# Frontend
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your Cloudinary credentials and API URL

# Backend  
cd ../backend
dotnet restore

# 2. Database setup (using Docker)
docker run -d -e POSTGRES_PASSWORD=example -e POSTGRES_DB=postsdb -p 5432:5432 postgres:15

# 3. Apply migrations
dotnet ef database update

# 4. Start services
# Terminal 1 - Backend
cd backend && dotnet run  # http://localhost:5000

# Terminal 2 - Frontend
cd frontend && npm run dev  # http://localhost:3000
```

**Done!** Visit http://localhost:3000

---

## 📖 Full Documentation

For detailed setup, configuration, and deployment instructions, see:

👉 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

This includes:
- ✅ Complete local development setup
- ✅ Cloudinary configuration  
- ✅ PostgreSQL connection strings
- ✅ Step-by-step deployment to **Vercel + Railway**
- ✅ API endpoint documentation
- ✅ Troubleshooting guide

---

## 🌍 Deployment

### Frontend → Vercel (Free)
Push your code to GitHub, connect to Vercel, set environment variables, deploy automatically.

### Backend → Railway or Render (Free)
Connect your backend repository to Railway/Render, set PostgreSQL connection string, deploy.

### Database → Supabase or Railway Postgres (Free)
Use Supabase or Railway's free PostgreSQL tier.

**See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.**

---

## 📂 Project Structure

```
PRM232_PE/
├── backend/                    # .NET 8 Web API
│   ├── Controllers/           # REST API endpoints
│   ├── Data/                  # EF Core DbContext & migrations
│   ├── Entities/              # Post model
│   ├── Middleware/            # Exception handling
│   ├── appsettings.json       # Configuration
│   └── PRM.API.csproj         # Project file
│
├── frontend/                   # Next.js + TypeScript
│   ├── pages/                 # Home, Create, Edit pages
│   ├── lib/                   # Cloudinary upload helper
│   ├── styles/                # Tailwind CSS
│   ├── package.json           # Dependencies
│   └── .env.example           # Environment template
│
├── .github/workflows/         # CI/CD pipelines
├── docker-compose.yml         # Local development orchestration
├── DEPLOYMENT_GUIDE.md        # Complete setup & deployment guide
└── README.md                  # This file
```

---

## 🎯 API Overview

### Base URL
`http://localhost:5000/api` (local) or deployed URL

### Endpoints
```
GET    /posts              - List all posts
GET    /posts/{id}         - Get single post
POST   /posts              - Create new post
PUT    /posts/{id}         - Update post
DELETE /posts/{id}         - Delete post
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#-api-endpoints) for detailed endpoint documentation.

---

## 🔐 Environment Variables

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### Backend (`appsettings.json`)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=postsdb;Username=postgres;Password=example"
  }
}
```

---

## 🐛 Troubleshooting

**Frontend can't connect to backend?**
- Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- Ensure backend is running on port 5000
- Check browser console for CORS errors

**Database connection failed?**
- Verify PostgreSQL is running
- Check connection string format
- For remote databases, ensure IP whitelisting

**Image upload not working?**
- Verify Cloudinary environment variables
- Ensure upload preset is set to "Unsigned"
- Check Cloudinary dashboard for errors

**See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#-troubleshooting) for more troubleshooting tips.**

---

## 🚢 Deployment Checklist

- [ ] Create Cloudinary account and upload preset
- [ ] Set up PostgreSQL (local, Supabase, or Railway)
- [ ] Push code to GitHub
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway/Render
- [ ] Update backend CORS for frontend domain
- [ ] Test all CRUD operations
- [ ] Verify image uploads to Cloudinary
- [ ] Submit GitHub link and report

---

## 📝 License

Open source - feel free to use for learning and projects.

---

## 👨‍💻 Author

Created for PRM232 course assignment.

---

## 🤝 Contributing

Pull requests welcome! Found a bug? Open an issue.

---

## 📞 Support

**Need help?**
1. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Review [Troubleshooting](./DEPLOYMENT_GUIDE.md#-troubleshooting)
3. Check documentation links in [Additional Resources](./DEPLOYMENT_GUIDE.md#-additional-resources)

---

## 🎉 Ready to Deploy?

Follow the [Complete Deployment Guide](./DEPLOYMENT_GUIDE.md) to get your app live in under 30 minutes!

Have fun building! 🚀
