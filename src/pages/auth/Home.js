import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Heart,
  Home as HomeIcon,
  ShoppingCart,
} from "lucide-react";

import "../../components/Home.css";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-background">
      <div className="home-container">
        {/* HEADER */}
        <h1 className="home-title">INDUSTRU SOLUTIONS</h1>
        <p className="home-subtitle">
          Tailored onboarding solutions for every industry
        </p>

        {/* GRID */}
        <div className="home-grid">
          {/* BANKING */}
          <div className="home-card">
            <div>
              <div className="icon-box">
                <Briefcase />
              </div>
              <h3>Banking</h3>
              <p>
                Secure digital KYC, identity verification, and instant account
                onboarding built for compliance and trust.
              </p>
            </div>

            <button
              className="get-started-btn"
              onClick={() => navigate("/dashboard/banking")}
            >
              Get Started →
            </button>
          </div>

          {/* HEALTHCARE */}
          <div className="home-card">
            <div>
              <div className="icon-box">
                <Heart />
              </div>
              <h3>Healthcare</h3>
              <p>
                Seamless patient and staff onboarding with protected data,
                consent management, and faster access to care.
              </p>
            </div>

            <button
              className="get-started-btn"
              onClick={() => navigate("/healthcare/onboarding")}
            >
              Get Started →
            </button>
          </div>

          {/* REAL ESTATE ✅ ENABLED */}
          <div className="home-card">
            <div>
              <div className="icon-box">
                <HomeIcon />
              </div>
              <h3>Real Estate</h3>
              <p>
                Paperless onboarding for buyers, sellers, and tenants with digital
                identity verification, document management, and e-signatures.
              </p>
            </div>

            <button
              className="get-started-btn"
              onClick={() => navigate("/realestate/onboarding")}
            >
              Get Started →
            </button>
          </div>

          {/* E-COMMERCE */}
          <div className="home-card">
            <div>
              <div className="icon-box">
                <ShoppingCart />
              </div>
              <h3>E-Commerce</h3>
              <p>
                Fast onboarding for customers and sellers with secure
                verification, fraud prevention, and smooth activation.
              </p>
            </div>

            <button
  className="get-started-btn"
  onClick={() => navigate("/ecommerce/onboarding")}
>
  Get Started →
</button>

          </div>
        </div>
      </div>
    </div>
  );
}
