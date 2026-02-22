import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./healthcareOnboarding.css";

export default function HealthcareOnboarding() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  return (
    <div className="healthcare-container">
      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate("/home")}>
        ← Back to Home
      </button>

      <h2 className="healthcare-title">Healthcare Onboarding</h2>
      <p className="healthcare-subtitle">
        Seamless onboarding for patients and healthcare staff
      </p>

      {/* USER TYPE */}
      <div className="hc-section">
        <label>User Type</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="">Select User Type</option>
          <option value="patient">Patient</option>
          <option value="staff">Healthcare Staff</option>
        </select>
      </div>

      {/* BASIC DETAILS */}
      <div className="hc-section">
        <h3>Basic Information</h3>
        <input type="text" placeholder="Full Name" />
        <input type="date" />
        <select>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input type="tel" placeholder="Mobile Number" />
        <input type="email" placeholder="Email Address" />
      </div>

      {/* PATIENT SECTION */}
      {userType === "patient" && (
        <div className="hc-section">
          <h3>Patient Details</h3>
          <input type="text" placeholder="Insurance Provider" />
          <input type="text" placeholder="Insurance Policy Number" />
          <input type="text" placeholder="Emergency Contact Number" />
          <textarea placeholder="Known Allergies / Medical Conditions" />
        </div>
      )}

      {/* STAFF SECTION */}
      {userType === "staff" && (
        <div className="hc-section">
          <h3>Staff Details</h3>
          <input type="text" placeholder="Role (Doctor / Nurse / Admin)" />
          <input type="text" placeholder="Medical License Number" />
          <input type="text" placeholder="Department" />
        </div>
      )}

      {/* ID VERIFICATION */}
      <div className="hc-section">
        <h3>Identity Verification</h3>
        <input type="text" placeholder="Aadhaar Number" />
        <input type="text" placeholder="PAN Number (Optional)" />
      </div>

      {/* CONSENT */}
      <div className="hc-section">
        <h3>Consent & Compliance</h3>
        <label className="checkbox">
          <input type="checkbox" /> I consent to digital identity verification
        </label>
        <label className="checkbox">
          <input type="checkbox" /> I agree to share health data as per HIPAA / GDPR
        </label>
        <label className="checkbox">
          <input type="checkbox" /> I accept hospital privacy policy
        </label>
      </div>

      {/* SUBMIT */}
      <button className="submit-btn">
        Submit Healthcare Onboarding
      </button>
    </div>
  );
}
