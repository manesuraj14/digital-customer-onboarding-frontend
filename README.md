# 🚀 Digital Customer Onboarding – Multi-Domain Platform (Frontend)

**Final Year Engineering Project**
Developed by:
**Suraj Mane • Aditya Lokhande • Adesh Madhurkar • Purva Meherkar**

---

# 📌 Project Overview

Digital Customer Onboarding is a **centralized multi-domain onboarding platform** designed to streamline how users register, authenticate, and complete onboarding workflows across different industries.

The system provides a **single unified UI** supporting:

* Banking onboarding (fully implemented)
* Healthcare onboarding (structure ready)
* E-commerce onboarding (structure ready)
* Real Estate onboarding (structure ready)
* Multi-domain dashboards
* Secure authentication system

---

# ⚡ Migration Update (Important)

This project was originally built using **Create React App (CRA)** and has now been fully migrated to:

### ✅ React + Vite architecture

This improves:

* ⚡ Faster startup
* ⚡ Instant refresh
* ⚡ Smaller bundle size
* ⚡ Modern tooling support
* ⚡ Better performance in production

All CRA leftovers, duplicate JS files, and unsafe environment configs have been removed.

---

# 🌐 Application Flow

1. Landing Page
2. User Registration
3. Login Authentication
4. Home Page (Domain Selection)
5. Select Domain
6. Complete Domain Onboarding
7. Access Domain Dashboard

---

# ✨ Core Features

## 🔐 Authentication System

* User Registration
* Secure Login
* Forgot Password
* Protected Routes
* Context-based authentication state
* Token persistence via localStorage

---

## 🏠 Public Pages

* Landing Page
* About Page
* Login / Register
* Forgot Password

---

## 👤 User Features

* Profile Page
* Session persistence
* Secure route access
* Dashboard protection

---

# 🏦 Banking Domain (Fully Implemented)

### Multi-Step Account Opening Flow

* Bank selection
* Personal information
* Address details
* Nominee details
* Document upload
* KYC submission
* Review & consent
* Banking analytics dashboard

---

# 🩺 Healthcare Domain

✔ Dashboard ready
✔ Onboarding structure ready

---

# 🛒 E-commerce Domain

✔ Dashboard ready
✔ Onboarding structure ready

---

# 🏘 Real Estate Domain

✔ Dashboard ready
✔ Onboarding structure ready

---

# 📊 Dashboard System

* Master Dashboard
* Domain-specific dashboards
* System pages:

  * Users
  * Reports
  * Settings

---

# 🛠 Tech Stack

### Frontend

* React 19
* Vite (Build Tool)

### Styling

* Tailwind CSS v3
* Custom CSS modules

### Routing

* React Router DOM v7

### State Management

* React Context API (AuthContext)

### API Integration

* Axios instance with interceptors

---

# 📂 Project Structure

```
src/
│
├── pages/                # All pages grouped by domain
│   ├── auth/
│   ├── banking/
│   ├── healthcare/
│   ├── ecommerce/
│   ├── realestate/
│   └── system/
│
├── components/           # Reusable UI components
├── services/             # API + Auth logic
├── routes/               # ProtectedRoute
├── hooks/                # Custom hooks
├── animations/           # Motion configs
├── assets/               # Images + CSS
│
├── main.jsx              # Vite entry file
├── App.jsx               # App router layout
└── index.css             # Tailwind setup
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```
git clone https://github.com/manesuraj14/digital-customer-onboarding-frontend.git
```

---

## 2️⃣ Open Project

```
cd digital-customer-onboarding-frontend
```

---

## 3️⃣ Install Dependencies

```
node -v
npm -v
npm install
```

---

# ▶️ Running the Application (Vite)

```
npm run dev
```

App runs at:

```
http://localhost:3000
```

*(If port is busy, Vite auto-assigns another port)*

---

# 🔌 Backend Integration

Make sure backend is running before starting frontend.

Frontend expects API at:

```
http://localhost:8080/api
```

You can configure this using `.env`:

```
VITE_API_URL=http://localhost:8080/api
VITE_API_TIMEOUT=5000
```

---

# 🔒 Security Implementation

* ProtectedRoute for route-level security
* Token-based authentication
* Context-based auth state
* Safe Axios interceptors
* Automatic logout on 401

---

# 📚 Academic Purpose

This project is developed as a **Final Year Engineering academic submission** demonstrating:

* Multi-domain system architecture
* Frontend engineering best practices
* Secure authentication flows
* Scalable UI design
* Modular routing structure

---

# 🚀 Future Enhancements

* OTP verification
* Role-based access control
* Cloud deployment
* Document verification integration
* Admin analytics panel
* Multi-language support

---

# 👨‍💻 Maintainers

**Suraj Mane**
Frontend Lead – Digital Customer Onboarding

---

# ⭐ If you found this project useful

Give it a star on GitHub 🙂
