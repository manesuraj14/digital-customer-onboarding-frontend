import { useState } from "react";

import { useNavigate } from "react-router-dom";


export default function AccountOpening() {
  const navigate = useNavigate(); 
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    bank: "",
    accountType: "",   // ✅ NEW FIELD
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    pincode: "",
    nominee: "",
    panFile: null,
    aadhaarFile: null,
    consent: false,
  });

  const steps = [
    "Bank",
    "Personal",
    "Address",
    "Nominee",
    "Documents",
    "Review",
    "Consent",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const isFilled = (fields) =>
    fields.every((field) => formData[field]);

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

      {/* ✅ PROGRESS BAR */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">

          {/* background line */}
          <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 rounded"></div>

          {/* active progress */}
          <div
            className="absolute top-4 left-0 h-1 bg-indigo-600 rounded transition-all duration-300"
            style={{ width: `${((step - 1) / 6) * 100}%` }}
          ></div>

          {steps.map((label, index) => {
            const s = index + 1;
            return (
              <div key={s} className="relative z-10 flex flex-col items-center w-full">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold border-2
                  ${
                    step >= s
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-500 border-gray-300"
                  }`}
                >
                  {s}
                </div>
                <span className="text-xs mt-2 text-center">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ UPDATED HEADING */}
      <h2 className="text-2xl font-bold mb-6">
        Account Opening – Step {step} of 7
      </h2>

      {/* STEP 1 – BANK */}
      {step === 1 && (
        <>
          <label>
            Select Bank <span className="text-red-500">*</span>
          </label>

          <select
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          >
            <option value="">Select Bank</option>
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>Axis Bank</option>
          </select>

          {/* ✅ NEW ACCOUNT TYPE FIELD */}
          <label>
            Account Type <span className="text-red-500">*</span>
          </label>

          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-6"
          >
            <option value="">Select Account Type</option>
            <option>Savings Account</option>
            <option>Current Account</option>
            <option>Salary Account</option>
            <option>Student Account</option>
          </select>

          <button
            disabled={!formData.bank || !formData.accountType}
            onClick={next}
            className={`w-full p-3 rounded-lg text-white ${
              formData.bank && formData.accountType
                ? "bg-indigo-600"
                : "bg-gray-400"
            }`}
          >
            Next
          </button>
        </>
      )}

      {/* KEEP ALL YOUR OTHER STEPS EXACTLY SAME */}


      {/* STEP 2 – PERSONAL */}
      {step === 2 && (
        <>
          <label>Full Name <span className="text-red-500">*</span></label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <label>DOB <span className="text-red-500">*</span></label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <label>Gender <span className="text-red-500">*</span></label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-6"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <div className="flex justify-between">
            <button onClick={back} className="bg-gray-500 text-white px-6 py-2 rounded">
              Back
            </button>
            <button
              disabled={!isFilled(["fullName", "dob", "gender"])}
              onClick={next}
              className={`px-6 py-2 rounded text-white ${
                isFilled(["fullName", "dob", "gender"]) ? "bg-indigo-600" : "bg-gray-400"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* STEP 3 – ADDRESS */}
      {step === 3 && (
        <>
          <label>Address <span className="text-red-500">*</span></label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <label>City <span className="text-red-500">*</span></label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <label>Pincode <span className="text-red-500">*</span></label>
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-6"
          />

          <div className="flex justify-between">
            <button onClick={back} className="bg-gray-500 text-white px-6 py-2 rounded">
              Back
            </button>
            <button
              disabled={!isFilled(["address", "city", "pincode"])}
              onClick={next}
              className={`px-6 py-2 rounded text-white ${
                isFilled(["address", "city", "pincode"]) ? "bg-indigo-600" : "bg-gray-400"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* STEP 4 – NOMINEE */}
      {step === 4 && (
        <>
          <label>Nominee Name <span className="text-red-500">*</span></label>
          <input
            name="nominee"
            value={formData.nominee}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-6"
          />

          <div className="flex justify-between">
            <button onClick={back} className="bg-gray-500 text-white px-6 py-2 rounded">
              Back
            </button>
            <button
              disabled={!formData.nominee}
              onClick={next}
              className={`px-6 py-2 rounded text-white ${
                formData.nominee ? "bg-indigo-600" : "bg-gray-400"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* STEP 5 – DOCUMENT UPLOAD */}
      {step === 5 && (
  <>
    <h3 className="text-lg font-semibold mb-6 text-indigo-600">
      Document Upload
    </h3>

    {/* PAN Upload */}
    <div className="mb-6">
      <label className="block mb-2 font-medium">
        Upload PAN Card <span className="text-red-500">*</span>
      </label>

      <label className="flex items-center justify-between border rounded-lg p-3 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
        <span className="text-sm text-gray-600">
          {formData.panFile ? formData.panFile.name : "No file selected"}
        </span>
        <span className="bg-indigo-600 text-white px-4 py-1 rounded text-sm">
          Choose File
        </span>

        <input
          type="file"
          name="panFile"
          accept=".jpg,.png,.pdf"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>

    {/* Aadhaar Upload */}
    <div className="mb-8">
      <label className="block mb-2 font-medium">
        Upload Aadhaar Card <span className="text-red-500">*</span>
      </label>

      <label className="flex items-center justify-between border rounded-lg p-3 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
        <span className="text-sm text-gray-600">
          {formData.aadhaarFile ? formData.aadhaarFile.name : "No file selected"}
        </span>
        <span className="bg-indigo-600 text-white px-4 py-1 rounded text-sm">
          Choose File
        </span>

        <input
          type="file"
          name="aadhaarFile"
          accept=".jpg,.png,.pdf"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>

    <div className="flex justify-between">
      <button
        onClick={back}
        className="bg-gray-500 text-white px-6 py-2 rounded-lg"
      >
        Back
      </button>

      <button
        disabled={!formData.panFile || !formData.aadhaarFile}
        onClick={next}
        className={`px-6 py-2 rounded-lg text-white ${
          formData.panFile && formData.aadhaarFile
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  </>
)}


      {/* STEP 6 – REVIEW */}
      {step === 6 && (
  <>
    <h3 className="text-xl font-semibold mb-6 text-green-600">
      Review & Verify Application Details
    </h3>

    <div className="space-y-3 text-sm mb-6">

      <p><strong>Bank:</strong> {formData.bank}</p>
      <p><strong>Name:</strong> {formData.fullName}</p>
      <p><strong>DOB:</strong> {formData.dob}</p>
      <p><strong>Gender:</strong> {formData.gender}</p>
      <p><strong>Address:</strong> {formData.address}</p>
      <p><strong>City:</strong> {formData.city}</p>
      <p><strong>Pincode:</strong> {formData.pincode}</p>
      <p><strong>Nominee:</strong> {formData.nominee}</p>

      <p>
        <strong>PAN File:</strong>{" "}
        {formData.panFile && (
          <a
            href={URL.createObjectURL(formData.panFile)}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            {formData.panFile.name}
          </a>
        )}
      </p>

      <p>
        <strong>Aadhaar File:</strong>{" "}
        {formData.aadhaarFile && (
          <a
            href={URL.createObjectURL(formData.aadhaarFile)}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            {formData.aadhaarFile.name}
          </a>
        )}
      </p>

    </div>

    <div className="flex justify-between">
      <button
        onClick={back}
        className="bg-gray-500 text-white px-6 py-2 rounded-lg"
      >
        Back
      </button>

      <button
        onClick={next}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      >
        Proceed to Consent
      </button>
    </div>
  </>
)}

      {/* STEP 7 – CONSENT & FINAL SUBMIT */}
{step === 7 && (
  <>
    <h3 className="text-xl font-semibold mb-6 text-blue-600">
      Final Consent & Submission
    </h3>

    <label className="flex items-start gap-3 mb-6">
      <input
        type="checkbox"
        name="consent"
        checked={formData.consent}
        onChange={handleChange}
        className="mt-1"
      />
      <span>
        I hereby confirm that all the information provided is accurate and I
        agree to the bank’s terms and conditions.
        <span className="text-red-500 ml-1">*</span>
      </span>
    </label>

    <div className="flex justify-between">
      <button
        onClick={back}
        className="bg-gray-500 text-white px-6 py-2 rounded-lg"
      >
        Back
      </button>

      <button
        disabled={!formData.consent}
        onClick={async () => {
          try {
            const submitData = new FormData();

            submitData.append("bankName", formData.bank);
            submitData.append("accountType", formData.accountType);
            submitData.append("fullName", formData.fullName);
            submitData.append("dob", formData.dob);
            submitData.append("gender", formData.gender);
            submitData.append("address", formData.address);
            submitData.append("city", formData.city);
            submitData.append("pincode", formData.pincode);
            submitData.append("nominee", formData.nominee);
            submitData.append("panFile", formData.panFile);
            submitData.append("aadhaarFile", formData.aadhaarFile);
            submitData.append("consent", formData.consent);


            const response = await fetch(
              "http://localhost:8081/api/banking/apply",
              {
                method: "POST",
                body: submitData,
              }
            );

            if (!response.ok) {
              throw new Error("Application submission failed");
            }

            const result = await response.json();

            alert(
              `Application Submitted Successfully!\n\nApplication ID: ${result.applicationId}`
            );

             navigate("/dashboard/banking/BankingHome"); 
          } catch (error) {
            console.error(error);
            alert("Something went wrong while submitting the application.");
          }
        }}
        className={`px-6 py-2 rounded-lg text-white ${
          formData.consent
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit Application
      </button>
    </div>
  </>
)}

    </div>
  );
}
