export default function Step7Consent({
  formData,
  handleChange,
  back,
  onSubmit,
}) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-6 text-blue-600">
        Final Consent
      </h3>

      <label className="flex items-start gap-3 mb-6">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
        />
        <span>I confirm details are correct.</span>
      </label>

      <div className="flex justify-between">
        <button onClick={back} className="bg-gray-500 text-white px-6 py-2 rounded">
          Back
        </button>

        <button
          disabled={!formData.consent}
          onClick={onSubmit}
          className={`px-6 py-2 rounded text-white ${
            formData.consent ? "bg-green-600" : "bg-gray-400"
          }`}
        >
          Submit
        </button>
      </div>
    </>
  );
}
