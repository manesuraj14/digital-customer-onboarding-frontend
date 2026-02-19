import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";

/* NAVBAR */
import AppNavbar from "./components/Navbar";

/* PUBLIC */
import Landing from "./pages/auth/Landing";
import Home from "./pages/auth/Home";
import About from "./pages/auth/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Profile from "./components/Profile";

/* DASHBOARD CORE */
import Dashboard from "./components/Dashboard";
import DashboardLayout from "./components/DashboardLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

/* BANKING */
import BankingHome from "./pages/banking/bankingOnboarding/BankingHome";
import AccountOpening from "./pages/banking/bankingOnboarding/AccountOpening";
import KYCForm from "./pages/banking/bankingOnboarding/KYCForm";
import BankingDashboard from "./pages/banking/BankingDashboard";

/* HEALTHCARE */
import HealthcareDashboard from "./pages/healthcare/HealthcareDashboard";
import HealthcareOnboarding from "./pages/healthcare/healthcareOnboarding/HealthcareOnboarding";

/* REAL ESTATE */
import RealEstateDashboard from "./pages/realestate/RealEstateDashboard";
import RealEstateOnboarding from "./pages/realestate/RealEstateOnboarding/RealEstateOnboarding";

/* ECOMMERCE */
import EcommerceDashboard from "./pages/ecommerce/EcommerceDashboard";
import EcommerceOnboarding from "./pages/ecommerce/ecommerceOnboarding/EcommerceOnboarding";

/* SYSTEM */
import Users from "./pages/system/Users";
import Reports from "./pages/system/Reports";
import Settings from "./pages/system/Settings";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </Router>
  );
}

/* 🔥 Layout controller */
function MainLayout() {
  const location = useLocation();

  const hideNavbar = [
    "/",
    "/login",
    "/register",
    "/forgot-password"
  ].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <AppNavbar />}

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* MASTER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* BANKING */}
        <Route
          path="/dashboard/banking-analytics"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <BankingDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/banking"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <BankingHome />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/banking/account-opening"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AccountOpening />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/banking/kyc"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <KYCForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* HEALTHCARE */}
        <Route
          path="/healthcare/onboarding"
          element={
            <ProtectedRoute>
              <HealthcareOnboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/healthcare"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <HealthcareDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* REAL ESTATE */}
        <Route
          path="/realestate/onboarding"
          element={
            <ProtectedRoute>
              <RealEstateOnboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/realestate"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <RealEstateDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ECOMMERCE */}
        <Route
          path="/ecommerce/onboarding"
          element={
            <ProtectedRoute>
              <EcommerceOnboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/ecommerce"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EcommerceDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* SYSTEM */}
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/reports"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Reports />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;
