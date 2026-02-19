export default function Step4Nominee({
  formData,
  handleChange,
  next,
  back,
}) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-6 text-indigo-600">
        Nominee Details
      </h3>

      <input
        name="nominee"
        placeholder="Nominee Name"
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
  );
}
