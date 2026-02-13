# 🚀 Portfolio Admin Panel

A comprehensive **Node.js + Express** admin panel for managing your portfolio content with full **CRUD operations**, **file upload**, **authentication**, and **analytics**.

## ✨ Features

### 🔐 **Authentication & Security**
- JWT-based authentication
- Bcrypt password hashing  
- Rate limiting protection
- File upload validation
- Helmet.js security headers

### 📊 **Content Management**
- **Projects**: Full CRUD with image uploads
- **Skills**: Organize by categories with progress levels
- **Experience**: Work, education, and certifications
- **Contact**: Manage form submissions
- **Analytics**: Track site visits and interactions

### 🎨 **Admin Interface**
- Modern responsive dashboard
- Real-time statistics
- Drag & drop file uploads
- Mobile-friendly design
- Quick action shortcuts

### 🔧 **Technical Stack**
- **Backend**: Node.js + Express.js
- **Database**: SQLite (easily upgradeable)
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer + Sharp
- **Frontend**: Vanilla JS + Modern CSS

---

## 🚀 Quick Start

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Initialize Database**
```bash
npm run setup
```

### 3. **Start Server**
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

### 4. **Access Admin Panel**
- **URL**: http://localhost:3000/admin
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change default password immediately!

---

## 📁 Project Structure

```
portfolio/
├── admin/                  # Admin panel frontend
│   ├── dashboard.html     # Main dashboard
│   ├── projects.html      # Projects management
│   ├── skills.html        # Skills management
│   └── login.html         # Authentication
│
├── assets/                # Original portfolio assets
│   ├── css/style.css     # Portfolio styles
│   └── js/script.js      # Portfolio functionality
│
├── uploads/               # File uploads (auto-created)
│   ├── projects/         # Project images
│   └── general/          # Other files
│
├── server.js             # Main Express server
├── setup.js              # Database initialization
├── package.json          # Dependencies & scripts
├── .env                  # Environment variables
└── portfolio.db          # SQLite database
```

---

## 🛠 API Endpoints

### **Authentication**
```
POST /api/auth/login      # User login
GET  /api/auth/verify     # Verify JWT token
```

### **Projects Management**
```
GET    /api/projects         # List all projects
GET    /api/projects/:id     # Get single project
POST   /api/projects         # Create new project
PUT    /api/projects/:id     # Update project
DELETE /api/projects/:id     # Delete project
```

### **Skills Management**
```
GET    /api/skills          # List all skills
POST   /api/skills          # Create new skill
PUT    /api/skills/:id      # Update skill
DELETE /api/skills/:id      # Delete skill
```

### **Experience Management**
```
GET    /api/experience      # List all experience
POST   /api/experience      # Create new experience
PUT    /api/experience/:id  # Update experience
DELETE /api/experience/:id  # Delete experience
```

### **Contact Management**
```
GET   /api/contacts         # List submissions (auth required)
POST  /api/contact          # Submit contact form (public)
PATCH /api/contacts/:id     # Update status (auth required)
```

### **Analytics & Dashboard**
```
GET  /api/dashboard/stats   # Get dashboard statistics
POST /api/analytics/visit   # Track page visit (public)
```

---

## 🔧 Configuration

### **Environment Variables** (`.env`)
```bash
# Server
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your-super-secret-jwt-key

# Uploads
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Production CORS
FRONTEND_URL=https://your-domain.com
```

### **Default Settings**
- **Admin User**: `admin` / `admin123`
- **File Upload Limit**: 5MB
- **Supported Images**: PNG, JPG, JPEG, WebP
- **JWT Expiry**: 24 hours
- **Rate Limit**: 100 requests/15min (5 login attempts/15min)

---

## 📊 Database Schema

### **Tables Overview**
- `users` - Admin users and authentication
- `projects` - Portfolio projects with metadata
- `skills` - Technical skills organized by category  
- `experience` - Work history, education, certifications
- `contact_submissions` - Contact form messages
- `settings` - Site configuration
- `analytics` - Visit tracking and statistics

### **Sample Data Included**
- ✅ Your 4 live website projects (KARUNARATHNA GROUP, ISA, KIDSE, KIDSE EDU)
- ✅ Technical skills with categories and progress levels
- ✅ Professional experience and education history
- ✅ Site settings and configuration

---

## 🚀 Production Deployment

### **Environment Setup**
1. **Change JWT Secret**:
   ```bash
   JWT_SECRET=generate-a-very-long-random-string-for-production
   ```

2. **Update CORS Settings**:
   ```bash
   FRONTEND_URL=https://your-actual-domain.com
   ```

3. **Database Upgrade** (Optional):
   - Replace SQLite with PostgreSQL/MySQL for high traffic
   - Update connection string in `server.js`

### **Deployment Options**

#### **Option 1: VPS/Dedicated Server**
```bash
# Upload files to server
# Install Node.js and npm
npm install --production
npm run setup
pm2 start server.js --name portfolio-admin
```

#### **Option 2: Heroku**
```bash
# Add Heroku buildpack for Node.js
# Set environment variables in Heroku dashboard
# Deploy via Git or GitHub integration
```

#### **Option 3: DigitalOcean/AWS**
- Use similar VPS setup
- Configure reverse proxy (Nginx)
- Set up SSL certificate (Let's Encrypt)

---

## 🔒 Security Best Practices

### **Immediate Actions**
1. ✅ Change default admin password
2. ✅ Update JWT secret in production
3. ✅ Enable HTTPS in production
4. ✅ Configure firewall (allow only necessary ports)

### **Additional Security**
- **IP Whitelisting**: Restrict admin access to specific IPs
- **2FA**: Add two-factor authentication (future enhancement)
- **Backup**: Regular database backups
- **Monitoring**: Set up error tracking and logging

---

## 🛠 Development Guide

### **Adding New Features**

#### **1. New API Endpoint**:
```javascript
// Add to server.js
app.get('/api/new-feature', authenticateToken, (req, res) => {
    // Your logic here
});
```

#### **2. New Admin Page**:
1. Create HTML file in `/admin/` directory
2. Add navigation link in sidebar
3. Implement JavaScript for API calls
4. Add route in `server.js`

#### **3. Database Changes**:
1. Add migration in `setup.js`
2. Update database schema
3. Test with sample data

### **File Upload Enhancement**
- **Image Optimization**: Uses Sharp for resizing
- **File Validation**: MIME type checking
- **Storage**: Local filesystem (easily upgradeable to AWS S3)

---

## 📱 Admin Panel Features

### **Dashboard**
- 📊 Real-time statistics (projects, skills, contacts, experience)
- 🚀 Quick action buttons for common tasks
- 📈 System status indicators
- 👤 User information display

### **Projects Management**
- ➕ Add/edit/delete projects with rich metadata
- 🖼️ Drag & drop image upload with preview
- 🏷️ Category organization and filtering
- ⭐ Featured project highlighting
- 🔗 Live URL and GitHub integration

### **Skills Management**
- 📂 Category-based organization
- 📊 Progress level indicators (0-100%)
- 🏷️ Technology tags and icons
- 🔄 Drag & drop reordering

### **Experience Timeline**
- 📚 Education, work, and certification tracking
- 📅 Date ranges with "current" option
- 📍 Location and organization details
- 🔄 Chronological ordering

### **Contact Management**
- 📧 View all contact form submissions
- 🏷️ Status tracking (unread/read/replied)
- 📤 Mark as replied functionality
- 🕒 Timestamp and sender information

---

## 🔍 Troubleshooting

### **Common Issues**

#### **Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

#### **Database Locked Error**
```bash
# Stop any running instances
# Re-run setup
npm run setup
```

#### **File Upload Not Working**
- Check `uploads/` directory permissions
- Verify file size under 5MB limit
- Ensure MIME type is image/*

#### **Authentication Issues**
- Clear browser localStorage
- Check JWT_SECRET in `.env`
- Verify token expiry time

---

## 📧 Support & Maintenance

### **Regular Maintenance**
- **Database Backup**: Weekly automated backups recommended
- **Security Updates**: Keep dependencies updated
- **Log Monitoring**: Review error logs regularly
- **Performance**: Monitor response times and optimize as needed

### **Support Channels**
- 📖 Documentation: This README file
- 🐛 Issues: Check console logs for errors
- 💡 Enhancement Ideas: Extend functionality as needed

---

## 🎯 Next Steps

### **Immediate**
1. ✅ Login and explore admin panel
2. ✅ Update projects with your actual content  
3. ✅ Modify skills to match your expertise
4. ✅ Configure contact email and social links

### **Optional Enhancements**
- 📊 Google Analytics integration
- 📧 Email notifications for contact forms
- 🎨 Theme customization options
- 🔄 Auto-backup scheduling
- 📱 Mobile app (React Native/Flutter)

---

**Built with ❤️ for Hiruna Hansaka Karunarathna**  
*Complete portfolio management solution with professional-grade admin panel*