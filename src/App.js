import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

/* COMPONENTS */
import AppNavbar from "./components/ui/Navbar";
import Dashboard from "./components/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Spinner from "./components/ui/Spinner";

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
    <Spinner />
  </div>
);

/* LAZY LOADED - PUBLIC */
const Landing = lazy(() => import("./pages/auth/Landing"));
const Home = lazy(() => import("./pages/auth/Home"));
const About = lazy(() => import("./pages/auth/About"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Profile = lazy(() => import("./components/Profile"));

/* LAZY LOADED - BANKING */
const BankingHome = lazy(() => import("./pages/banking/bankingOnboarding/BankingHome"));
const AccountOpening = lazy(() => import("./pages/banking/bankingOnboarding/AccountOpening"));
const TrackApplication = lazy(() =>import("./pages/banking/bankingOnboarding/TrackApplication"));
const KYCForm = lazy(() => import("./pages/banking/bankingOnboarding/KYCForm"));
const BankingDashboard = lazy(() => import("./pages/banking/BankingDashboard"));

/* LAZY LOADED - HEALTHCARE */
const HealthcareDashboard = lazy(() => import("./pages/healthcare/HealthcareDashboard"));
const HealthcareOnboarding = lazy(() => import("./pages/healthcare/healthcareOnboarding/HealthcareOnboarding"));

/* LAZY LOADED - REAL ESTATE */
const RealEstateDashboard = lazy(() => import("./pages/realestate/RealEstateDashboard"));
const RealEstateOnboarding = lazy(() => import("./pages/realestate/RealEstateOnboarding/RealEstateOnboarding"));

/* LAZY LOADED - ECOMMERCE */
const EcommerceDashboard = lazy(() => import("./pages/ecommerce/EcommerceDashboard"));
const EcommerceOnboarding = lazy(() => import("./pages/ecommerce/ecommerceOnboarding/EcommerceOnboarding"));

/* LAZY LOADED - SYSTEM */
const Users = lazy(() => import("./pages/system/Users"));
const Reports = lazy(() => import("./pages/system/Reports"));
const Settings = lazy(() => import("./pages/system/Settings"));

function App() {
  return (
    <ErrorBoundary> 
      <Router>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
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
        <Route path="/" element={<Suspense fallback={<LoadingFallback />}><Landing /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<LoadingFallback />}><About /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<LoadingFallback />}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<LoadingFallback />}><Register /></Suspense>} />
        <Route path="/forgot-password" element={<Suspense fallback={<LoadingFallback />}><ForgotPassword /></Suspense>} />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Suspense>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </Suspense>
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

        {/* BANKING ROOT */}
<Route
  path="/dashboard/banking"
  element={
    <Suspense fallback={<LoadingFallback />}>
      <ProtectedRoute>
        <DashboardLayout>
          <BankingHome />
        </DashboardLayout>
      </ProtectedRoute>
    </Suspense>
  }
/>

{/* BANKING ANALYTICS (NESTED STYLE URL) */}
<Route
  path="/dashboard/banking/analytics"
  element={
    <Suspense fallback={<LoadingFallback />}>
      <ProtectedRoute>
        <DashboardLayout>
          <BankingDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    </Suspense>
  }
/>

<Route
  path="/dashboard/banking/account-opening"
  element={
    <Suspense fallback={<LoadingFallback />}>
      <ProtectedRoute>
        <DashboardLayout>
          <AccountOpening />
        </DashboardLayout>
      </ProtectedRoute>
    </Suspense>
  }
/>

<Route
  path="/dashboard/banking/track"
  element={
    <Suspense fallback={<LoadingFallback />}>
      <ProtectedRoute>
        <DashboardLayout>
          <TrackApplication />
        </DashboardLayout>
      </ProtectedRoute>
    </Suspense>
  }
/>

<Route
  path="/dashboard/banking/kyc"
  element={
    <Suspense fallback={<LoadingFallback />}>
      <ProtectedRoute>
        <DashboardLayout>
          <KYCForm />
        </DashboardLayout>
      </ProtectedRoute>
    </Suspense>
  }
/>

        {/* HEALTHCARE */}
        <Route
          path="/healthcare/onboarding"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <HealthcareOnboarding />
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/dashboard/healthcare"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <DashboardLayout>
                  <HealthcareDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />

        {/* REAL ESTATE */}
        <Route
          path="/realestate/onboarding"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <RealEstateOnboarding />
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/dashboard/realestate"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <DashboardLayout>
                  <RealEstateDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />

        {/* ECOMMERCE */}
        <Route
          path="/ecommerce/onboarding"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <EcommerceOnboarding />
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/dashboard/ecommerce"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <DashboardLayout>
                  <EcommerceDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />

        {/* SYSTEM */}
        <Route
          path="/dashboard/users"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <DashboardLayout>
                  <Users />
                </DashboardLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/dashboard/reports"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <DashboardLayout>
                  <Reports />
                </DashboardLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;
