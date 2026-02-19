export default function Step1Bank({ formData, handleChange, next }) {
  return (
    <>
      <label>Select Bank *</label>

      <select
        name="bank"
        value={formData.bank}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg mb-6"
      >
        <option value="">Select Bank</option>
        <option>HDFC Bank</option>
        <option>ICICI Bank</option>
        <option>Axis Bank</option>
      </select>

      <button
        disabled={!formData.bank}
        onClick={next}
        className={`w-full p-3 rounded-lg text-white ${
          formData.bank ? "bg-indigo-600" : "bg-gray-400"
        }`}
      >
        Next
      </button>
    </>
  );
}
