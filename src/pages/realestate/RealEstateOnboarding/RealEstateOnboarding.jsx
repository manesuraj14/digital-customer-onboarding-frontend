import { useNavigate } from "react-router-dom";
import "./realEstateOnboarding.css";

export default function RealEstateOnboarding() {
  const navigate = useNavigate();

  return (
    <div className="re-form-container">

      {/* Back Button */}
      <button className="back-link" onClick={() => navigate("/home")}>
        ← Back to Home
      </button>

      <h2>Real Estate Digital Onboarding</h2>
      <p className="subtitle">
        Paperless onboarding for buyers, sellers, and tenants
      </p>

      {/* Role Selection */}
      <h4>User Type</h4>
      <select>
        <option>Select Role</option>
        <option>Buyer</option>
        <option>Seller</option>
        <option>Tenant</option>
      </select>

      {/* Identity Verification */}
      <h4>Identity Verification (KYC)</h4>
      <input placeholder="Full Name (as per ID)" />
      <input placeholder="PAN Number" />
      <input placeholder="Aadhaar Number" />
      <input type="file" />

      {/* Contact Details */}
      <h4>Contact Information</h4>
      <input placeholder="Mobile Number" />
      <input placeholder="Email Address" />

      {/* Property Details */}
      <h4>Property Details</h4>
      <select>
        <option>Property Type</option>
        <option>Residential</option>
        <option>Commercial</option>
        <option>Land</option>
      </select>

      <input placeholder="Property Address" />
      <input placeholder="City" />
      <input placeholder="State" />
      <input placeholder="PIN Code" />

      {/* Documents */}
      <h4>Document Upload</h4>
      <label className="upload-label">
        Upload Sale Deed / Lease Agreement
        <input type="file" />
      </label>

      <label className="upload-label">
        Upload Property Tax Receipt
        <input type="file" />
      </label>

      {/* Consent */}
      <div className="consent-section">
  <h4>Consent & Declaration</h4>

  <label className="consent-item">
    <input type="checkbox" />
    <span>I consent to digital KYC and e-Signature</span>
  </label>

  <label className="consent-item">
    <input type="checkbox" />
    <span>I confirm the information provided is correct</span>
  </label>
</div>



      <button className="submit-btn">
        Submit Real Estate Onboarding
      </button>
    </div>
  );
}
