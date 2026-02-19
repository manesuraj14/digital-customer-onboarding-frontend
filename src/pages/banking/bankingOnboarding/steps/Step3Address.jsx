export default function Step3Address({
  formData,
  handleChange,
  next,
  back,
}) {
  const filled =
    formData.address && formData.city && formData.pincode;

  return (
    <>
      <h3 className="text-lg font-semibold mb-6 text-indigo-600">
        Address Details
      </h3>

      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg mb-6"
      />

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
