export default function Step2Personal({
  formData,
  handleChange,
  next,
  back,
}) {
  const filled =
    formData.fullName && formData.dob && formData.gender;

  return (
    <>
      <h3 className="text-lg font-semibold mb-6 text-indigo-600">
        Personal Details
      </h3>

      <input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg mb-4"
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg mb-6"
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <div className="flex justify-between">
        <button onClick={back} className="bg-gray-500 text-white px-6 py-2 rounded">
          Back
        </button>

        <button
          disabled={!filled}
          onClick={next}
          className={`px-6 py-2 rounded text-white ${
            filled ? "bg-indigo-600" : "bg-gray-400"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}
