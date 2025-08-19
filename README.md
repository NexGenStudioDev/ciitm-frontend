## 📌 Project Details

- **Repo:**
  [ciitm-frontend on GitHub](https://github.com/NexGenStudioDev/ciitm-frontend)
- **Live Site:** [Grow Rich Mindset](https://www.growrichmindset.in/)
- **Made by:**
  [NexGenStudioDev (Abhishek Kumar)](https://github.com/NexGenStudioDev)
- **License:**
  [Personal Contributor License v1.0](https://github.com/NexGenStudioDev/ciitm-frontend?tab=License-1-ov-file)

---

## 👋 About the Project

### 📌 CIITM Dhanbad - Educational Institute Website

**A comprehensive educational website** built for CIITM Dhanbad with
modern architecture, real-time features, and complete institutional
management system. The platform provides seamless experience for
students, administrators, and staff with advanced features like online
admissions, payment processing, and dynamic content management.

---

## ✨ Key Features

### 🎓 **Student Management System**

- **Online Admission Process** - Complete admission workflow with form
  validation
- **Student Dashboard** - Personalized dashboard for students
- **Fee Management** - Online fee payment with Razorpay integration
- **Grade & Academic Records** - Track academic performance and
  records
- **Parent Information Management** - Comprehensive parent/guardian
  data

### 🔐 **Authentication & Authorization**

- **Multi-Role Login System** - Separate access for students and
  admins
- **Google OAuth Integration** - Quick login with Google accounts
- **Protected Routes** - Role-based access control
- **Password Recovery** - Forgot password and reset functionality
- **Secure Session Management** - JWT token-based authentication

### 👨‍💼 **Admin Panel Features**

- **Dynamic Dashboard** - Real-time data visualization and analytics
- **Student Management** - View, search, and manage student records
- **Course Management** - Create and manage educational courses
- **Content Management** - Update website content dynamically
- **Payment Tracking** - Monitor fee payments and generate reports
- **Gallery Management** - Upload and organize institutional images
- **Contact Management** - Handle inquiries and contact requests

### 🖼️ **Media & Content Management**

- **Album System** - Create and manage photo albums
- **Image Gallery** - Responsive image gallery with lightbox
- **Dynamic Content** - Admin can update all website content
- **Testimonial System** - Collect and manage student testimonials

### 💳 **Payment Integration**

- **Razorpay Gateway** - Secure online payment processing
- **Fee Calculation** - Automatic fee calculation and tracking
- **Payment History** - Comprehensive payment records
- **Receipt Generation** - Digital payment receipts

### 🌐 **Real-time Features**

- **Socket.IO Integration** - Real-time data updates
- **Live Notifications** - Instant updates and alerts
- **Real-time Dashboard** - Live data synchronization

### 📱 **User Experience**

- **Responsive Design** - Works on all devices and screen sizes
- **Modern UI/UX** - Clean and intuitive interface
- **Smooth Animations** - GSAP-powered animations
- **SEO Optimized** - React Helmet for meta tags and SEO
- **Fast Loading** - Optimized performance with lazy loading

---

## 🛠️ Tech Stack

### **Frontend**

- ⚛️ **React 18.3.1** - Modern React with hooks and functional
  components
- 🎨 **Tailwind CSS 3.4.17** - Utility-first CSS framework
- 🔄 **Redux Toolkit** - State management
- 🚀 **Vite** - Fast build tool and development server
- 📱 **React Router DOM** - Client-side routing
- 🎭 **React Hook Form** - Form handling and validation

### **Backend Integration**

- 🌐 **Socket.IO Client** - Real-time communication
- 📡 **Axios** - HTTP client for API calls
- 🔒 **JWT Authentication** - Secure authentication

### **UI & Animation Libraries**

- ✨ **GSAP** - Professional animations
- 🎠 **Swiper.js** - Modern touch slider
- 🎢 **React Slick** - Carousel component
- 🎨 **React Icons** - Icon library
- 💫 **React Spinners** - Loading animations

### **Payment & Utilities**

- 💳 **React Razorpay** - Payment gateway integration
- 🔔 **React Toastify** - Toast notifications
- 🍯 **SweetAlert2** - Beautiful alert dialogs
- 🧹 **DOMPurify** - XSS protection
- 📋 **Yup & Zod** - Schema validation

### **Development Tools**

- 🔧 **ESLint** - Code linting
- 💄 **Prettier** - Code formatting
- 📦 **PostCSS** - CSS processing
- 🏗️ **SWC** - Fast compilation

---

## 📁 Project Structure

```
src/
├── 📁 assets/              # Static assets (images, icons)
│   ├── images/             # Image assets
│   └── logo.svg           # App logo
├── 📁 components/          # Reusable components
│   ├── 📁 Atoms/          # Basic UI components
│   │   ├── Button/        # Button components
│   │   ├── Input/         # Input components
│   │   ├── Dropdown/      # Dropdown components
│   │   └── ...
│   ├── 📁 Molecules/      # Combined atom components
│   │   ├── Cards/         # Card components
│   │   ├── Loader/        # Loading components
│   │   └── Admin/         # Admin-specific molecules
│   ├── 📁 Organisms/      # Complex components
│   │   ├── NavBar/        # Navigation components
│   │   ├── Footer/        # Footer components
│   │   ├── SideBar/       # Sidebar components
│   │   └── Admin/         # Admin organisms
│   ├── 📁 Templates/      # Page templates
│   │   ├── Admin/         # Admin page templates
│   │   ├── home/          # Home page sections
│   │   ├── about/         # About page sections
│   │   └── ...
│   ├── 📁 Auth/           # Authentication components
│   └── 📁 Protected/      # Protected route components
├── 📁 pages/              # Page components
│   ├── 📁 Admin/          # Admin pages
│   │   ├── DashboardPage.jsx
│   │   ├── StudentPage.jsx
│   │   ├── FeePay.jsx
│   │   └── ...
│   ├── Home.jsx
│   ├── About.jsx
│   └── ...
├── 📁 store/              # Redux store and slices
│   ├── appStore.js        # Main store configuration
│   ├── AuthSlice.js       # Authentication state
│   ├── homeSlice.js       # Home page state
│   └── ...
├── 📁 hooks/              # Custom React hooks
│   ├── useHomeUi.js       # Home page data fetching
│   ├── useAbout.js        # About page data fetching
│   ├── useAlbum.js        # Album data management
│   └── ...
├── 📁 utils/              # Utility functions
│   ├── apiUrl.js          # API configuration
│   └── constants.js       # API endpoints
├── 📁 validation/         # Form validation schemass
├── 📁 service/            # API service functions
└── 📁 config/             # Configuration files
    └── socket.mjs         # Socket.IO configuration
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Before running this project, make sure you have the following
installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Coder-Studies/ciitm-frontend.git
   cd ciitm-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup** Create a `.env` file in the root directory
   and add:

   ```env
   VITE_BACKEND_URL=your_backend_url
   VITE_RAZORPAY_KEY_ID=your_razorpay_key
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### 📜 Available Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build the project for production         |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint for code quality checks       |
| `npm run format`  | Format code using Prettier               |

---

## 🏗️ Architecture & Design Patterns

### **Component Architecture**

- **Atomic Design Pattern** - Components organized as Atoms,
  Molecules, Organisms, and Templates
- **Functional Components** - Modern React with hooks
- **Custom Hooks** - Reusable logic for data fetching and state
  management
- **Higher-Order Components** - Protected routes and authentication

### **State Management**

- **Redux Toolkit** - Centralized state management
- **Slice Pattern** - Modular state slices for different features
- **Real-time Updates** - Socket.IO integration for live data

### **API Integration**

- **Axios Interceptors** - Centralized HTTP client configuration
- **Custom Hooks** - Data fetching and caching
- **Error Handling** - Comprehensive error management
- **Socket.IO** - Real-time communication

---

## 🔧 Configuration Files

### **Development Configuration**

- `vite.config.js` - Vite build tool configuration
- `tailwind.config.js` - Tailwind CSS customization
- `eslint.config.js` - ESLint rules and plugins
- `postcss.config.js` - PostCSS processing

### **Deployment Configuration**

- `vercel.json` - Vercel deployment settings with API proxying
- `package.json` - Dependencies and build scripts

---

## 🌐 API Integration

### **Backend Communication**

- **Base URL**: Configurable via environment variables
- **Authentication**: JWT token-based with automatic refresh
- **Real-time**: Socket.IO for live updates
- **Error Handling**: Centralized error management

### **Key API Endpoints**

```javascript
// Authentication
POST /api/v1/auth/login
POST /api/v1/auth/Admin/SignUp

// Student Management
GET /api/v1/students
POST /api/v1/students/create
PUT /api/v1/students/:id

// Payment Processing
POST /api/create/payment
POST /api/pay/verify

// Content Management
GET /api/v1/frontend
POST /api/v1/admin/course/create
GET /api/v1/albums
```

---

## 🔒 Security Features

### **Authentication & Authorization**

- JWT token-based authentication
- Role-based access control (Student/Admin)
- Protected routes for sensitive areas
- Automatic token refresh

### **Data Protection**

- DOMPurify for XSS prevention
- Form validation with Yup/Zod schemas
- HTTPS enforcement in production
- Secure cookie handling

### **Payment Security**

- Razorpay PCI-compliant payment processing
- Server-side payment verification
- Encrypted payment data transmission

---

## 📱 Responsive Design

### **Breakpoints**

- **Mobile**: 350px and up
- **Tablet**: 1000px and up
- **Desktop**: 1200px and up

### **Design Features**

- Mobile-first approach
- Touch-friendly interface
- Optimized images and assets
- Smooth animations and transitions

---

## 🚀 Performance Optimizations

### **Code Optimization**

- **Lazy Loading** - Components loaded on demand
- **Code Splitting** - Chunked bundles for faster loading
- **Tree Shaking** - Unused code elimination
- **Minification** - Compressed production builds

### **Asset Optimization**

- **Image Optimization** - WebP format and responsive images
- **Bundle Analysis** - Optimized bundle sizes
- **Caching Strategies** - Browser and CDN caching

---

## 🧪 Testing & Quality Assurance

### **Code Quality**

- **ESLint** - Code linting and best practices
- **Prettier** - Consistent code formatting
- **TypeScript-ready** - Type safety preparation

### **Performance Monitoring**

- Real-time error tracking
- Performance metrics monitoring
- User experience optimization

---

## 🔄 Development Workflow

### **Version Control**

- Git-based version control
- Semantic commit messages
- Feature branch workflow

### **Code Review Process**

- Pull request reviews
- Automated testing on commits
- Continuous integration ready

---

## 📚 Dependencies Overview

### **Core Dependencies**

```json
{
   "react": "^18.3.1",
   "react-dom": "^18.3.1",
   "@reduxjs/toolkit": "^2.5.0",
   "react-redux": "^9.2.0",
   "react-router-dom": "^7.0.2"
}
```

### **UI & Styling**

```json
{
   "tailwindcss": "^3.4.17",
   "react-icons": "^5.5.0",
   "gsap": "^3.12.7",
   "swiper": "^11.2.1"
}
```

### **API & Real-time**

```json
{
   "axios": "^1.7.9",
   "socket.io-client": "^4.8.1",
   "react-razorpay": "^3.0.1"
}
```

---

## 🤝 Contributing

We welcome contributions to improve the CIITM Frontend project! Here's
how you can contribute:

### **Getting Started**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### **Contribution Guidelines**

- Follow the existing code style and conventions
- Write clear and descriptive commit messages
- Test your changes thoroughly
- Update documentation if necessary
- Ensure your code passes all linting checks

---

## 📞 Support & Contact

### **Get Help**

- 📧 **Email**: abhishek.nexgen.dev@gmail.com
- 🐙 **GitHub Issues**:
  [Report bugs or request features](https://github.com/Coder-Studies/ciitm-frontend/issues)
- 💬 **Discussions**: Join our community discussions

### **Social Media**

- 💼 **LinkedIn**: Connect with the developer
- 🐦 **Twitter**: Follow for updates
- 📘 **Facebook**: Join our community

---

## 🔄 Changelog

### **Version 1.0.0** (Current)

- ✅ Complete authentication system
- ✅ Student management dashboard
- ✅ Payment integration with Razorpay
- ✅ Real-time features with Socket.IO
- ✅ Responsive design implementation
- ✅ Admin panel with full CRUD operations

### **Upcoming Features**

- 📧 Email notification system
- 📊 Advanced analytics dashboard
- 📱 Mobile app development
- 🔔 Push notification support

---

## 🏆 Acknowledgments

### **Special Thanks**

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vercel** - For excellent deployment platform
- **Open Source Community** - For the incredible libraries and tools

### **Inspiration**

This project was built to modernize educational institute management
and provide a seamless experience for students and administrators.

---

## 📈 Project Stats

- 🎯 **Purpose**: Educational Institute Management System
- 📅 **Development Time**: Ongoing
- 🏗️ **Architecture**: React + Redux + Socket.IO
- 🎨 **Design System**: Atomic Design Pattern
- 📱 **Responsive**: Mobile-First Approach
- 🔒 **Security**: JWT + Role-Based Access
- 💳 **Payment**: Razorpay Integration
- 🚀 **Performance**: Optimized for Speed

---

## 🔐 License: Personal Contributor License v1.0

This project uses a **special license** to protect the code and allow
fair use.

### ✅ You Can:

- Read and learn from the code
- Contribute to this project
- Show your **accepted work** in your portfolio (with credit)

### ❌ You Can’t:

- Host this project on your own website or server
- Sell or use the code for paid work, startups, or companies
- Use it in teaching, courses, bootcamps, or training platforms
  without permission
- Copy or publish the whole project or parts of it somewhere else

---

### 📸 If You Add This to Your Portfolio:

- You can only show what **you personally made**
- You must say it’s part of **ciitm-frontend** by **Coder-Studies**
- You must link to the original repo:
  [https://github.com/Coder-Studies/ciitm-frontend](https://github.com/Coder-Studies/ciitm-frontend)
- You **cannot** host or deploy the full project

---

### ⚠️ Legal Info:

If someone breaks the license:

- A **DMCA complaint** may be filed
- Hosting platforms like GitHub or Netlify may be notified
- Legal steps may be taken if needed
- This code is shared **as-is** — the author is not responsible for
  any issues or losses caused by using it

---

### 📬 Contact:

For questions, permission, or legal concerns, reach out:

- GitHub: [Coder-Studies](https://github.com/Coder-Studies)
