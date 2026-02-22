export default function Step6Review({ formData, next, back }) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-6 text-green-600">
        Review Details
      </h3>

      <div className="space-y-2 text-sm mb-6">
        <p><strong>Bank:</strong> {formData.bank}</p>
        <p><strong>Name:</strong> {formData.fullName}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>Nominee:</strong> {formData.nominee}</p>
      </div>

      <div className="flex justify-between">
        <button onClick={back} className="bg-gray-500 text-white px-6 py-2 rounded">
          Back
        </button>

        <button
          onClick={next}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Proceed
        </button>
      </div>
    </>
  );
}
