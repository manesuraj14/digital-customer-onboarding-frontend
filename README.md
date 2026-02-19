# 🚀 Digital Customer Onboarding – Multi-Domain Platform (Frontend)

Developed by:   1.Suraj Mane.
                2.Aditya Lokhande.
                3.Adesh Madhurkar.
                4.Purva Meherkar.

This repository contains the **frontend application** of the Digital Customer Onboarding system developed as a Final Year Engineering Project.

The platform provides a unified digital onboarding experience across multiple domains such as **Banking, Healthcare, E-commerce, and Real Estate**, allowing users to register, authenticate, complete onboarding workflows, and access domain-specific dashboards.

---

# 📌 Project Overview

Digital Customer Onboarding is a centralized platform designed to streamline customer onboarding processes across different industries.

The system includes:

- Secure authentication system
- Multi-domain onboarding modules
- Dashboard analytics for each domain
- Profile management
- Protected routes for security

Currently, the **Banking domain onboarding flow is fully implemented and functional**.

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

## 🔐 Authentication
- User Registration
- Secure Login
- Forgot Password
- Protected Routes
- Context-based authentication state management

## 🏠 Public Pages
- Landing Page
- About Page
- Login & Register
- Forgot Password

## 👤 User Features
- Profile Page
- Secure Session Handling

## 🏦 Banking Domain (Fully Implemented)
- Multi-step Account Opening Form
- Personal Information Collection
- Address Details
- Nominee Details
- Document Upload
- KYC Form Submission
- Review & Consent
- Banking Dashboard Analytics

## 🩺 Healthcare Domain (Structure Ready)
- Healthcare Onboarding
- Healthcare Dashboard

## 🛒 E-commerce Domain (Structure Ready)
- E-commerce Onboarding
- E-commerce Dashboard

## 🏘 Real Estate Domain (Structure Ready)
- Real Estate Onboarding
- Real Estate Dashboard

## 📊 Dashboard System
- Master Dashboard
- Domain-specific Dashboards
- System Pages:
  - Users
  - Reports
  - Settings

---

# 🛠 Tech Stack

## Frontend Framework
- React.js

## Styling
- Tailwind CSS
- Custom CSS

## Routing
- React Router DOM

## State Management
- React Context API (AuthContext)

## API Integration
- Axios

---

# 📂 Project Folder Structure

src/
│
├── pages/ # All main pages organized by domain
│ ├── auth/ # Authentication & public pages
│ ├── banking/ # Banking domain
│ ├── healthcare/ # Healthcare domain
│ ├── ecommerce/ # E-commerce domain
│ ├── realestate/ # Real estate domain
│ ├── system/ # Admin/system pages
│
├── components/ # Reusable UI components
│ ├── Navbar
│ ├── Sidebar
│ ├── Layouts
│ ├── Dashboard Shell
│ └── UI Elements
│
├── services/ # API & Authentication logic
│ ├── api.js
│ ├── AuthContext.js
│ └── useAuth.js
│
├── routes/ # ProtectedRoute logic
├── hooks/ # Custom React hooks
├── assets/ # Images and CSS
├── animations/ # Animation configurations



---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository
```bash
git clone <YOUR_FRONTEND_REPO_URL>

2️⃣ Navigate to Project Folder
cd MODULE-FRONTEND

3️⃣ Install Dependencies
npm install

▶️ Running the Application
npm start
----------------------------------
Application will run at:

http://localhost:3000

----------------------------------

🔌 Backend Integration

Ensure the backend server is running before starting frontend.

-----------------------------------

🔒 Security Implementation

Route-level protection using ProtectedRoute

Context-based authentication handling

Session management

Controlled dashboard access
-------------------------------------------

📚 Academic Purpose

This project is developed as part of a Final Year Engineering academic submission.

🚀 Future Enhancements

OTP-based verification

Role-based access control

Cloud deployment

Document verification integration

Admin analytics panel

Multi-language support