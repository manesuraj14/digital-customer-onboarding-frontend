import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ecommerceOnboarding.css";

export default function EcommerceOnboarding() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  return (
    <div className="ecom-page">
      <div className="ecom-container">
        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate("/home")}>
          ← Back to Home
        </button>

        <h2 className="ecom-title">E-Commerce Onboarding</h2>
        <p className="ecom-subtitle">
          Fast, secure onboarding for sellers and customers
        </p>

        {/* USER TYPE */}
        <div className="ecom-section">
          <label className="ecom-label">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">Select User Type</option>
            <option value="seller">Seller / Merchant</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {/* BASIC DETAILS */}
        <div className="ecom-section">
          <h3>Basic Details</h3>
          <input type="text" placeholder="Full Name / Business Name" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Mobile Number" />
        </div>

        {/* KYC */}
        <div className="ecom-section">
          <h3>Identity Verification (KYC)</h3>
          <input type="text" placeholder="PAN Number" />
          <input type="text" placeholder="Aadhaar Number" />
        </div>

        {/* SELLER ONLY */}
        {userType === "seller" && (
          <div className="ecom-section">
            <h3>Seller / Business Details</h3>
            <input type="text" placeholder="Business Name" />
            <input type="text" placeholder="GST Number" />
            <input type="text" placeholder="Bank Account Number" />
            <input type="text" placeholder="IFSC Code" />
          </div>
        )}

        {/* SECURITY & COMPLIANCE */}
        <div className="ecom-section">
          <h3>Security & Compliance</h3>

          <div className="checkbox-group">
            <label className="checkbox-item">
              <input type="checkbox" />
              <span>Aadhaar OTP / Biometric Consent</span>
            </label>

            <label className="checkbox-item">
              <input type="checkbox" />
              <span>AML & Fraud Risk Screening Consent</span>
            </label>

            <label className="checkbox-item">
              <input type="checkbox" />
              <span>Agree to Digital e-Sign Terms</span>
            </label>
          </div>
        </div>

        {/* SUBMIT */}
        <button className="submit-btn">
          Submit E-Commerce Onboarding
        </button>
      </div>
    </div>
  );
}
