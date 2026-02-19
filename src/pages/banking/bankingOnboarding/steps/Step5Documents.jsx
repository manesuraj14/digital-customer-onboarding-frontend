export default function Step5Documents({
  formData,
  handleChange,
  next,
  back,
}) {
  const ready = formData.panFile && formData.aadhaarFile;

  return (
    <>
      <h3 className="text-lg font-semibold mb-6 text-indigo-600">
        Upload Documents
      </h3>

      <input
        type="file"
        name="panFile"
        onChange={handleChange}
        className="mb-4"
      />

      <input
        type="file"
        name="aadhaarFile"
        onChange={handleChange}
        className="mb-6"
      />

      <div className="flex justify-between">
        <button onClick={back} className="bg-gray-500 text-white px-6 py-2 rounded">
          Back
        </button>

        <button
          disabled={!ready}
          onClick={next}
          className={`px-6 py-2 rounded text-white ${
            ready ? "bg-indigo-600" : "bg-gray-400"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}
