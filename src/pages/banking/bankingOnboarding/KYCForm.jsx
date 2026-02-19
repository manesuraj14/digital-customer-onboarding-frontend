import { useState } from "react";

export default function KYCForm() {
  const [formData, setFormData] = useState({
    pan: "",
    aadhaar: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("KYC Submitted Successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Digital KYC Verification</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block font-medium mb-1">PAN Number</label>
          <input
            type="text"
            name="pan"
            required
            value={formData.pan}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Aadhaar Number</label>
          <input
            type="text"
            name="aadhaar"
            required
            value={formData.aadhaar}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="consent"
            required
            onChange={handleChange}
          />
          <label>
            I agree to share my information for KYC verification.
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Submit KYC
        </button>
      </form>
    </div>
  );
}
