export default function Reports() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Daily Report", "Monthly Report", "Annual Report"].map((r) => (
          <div
            key={r}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          >
            <h3 className="font-semibold mb-2">{r}</h3>
            <p className="text-sm text-gray-500 mb-4">
              Download onboarding statistics and analytics.
            </p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Download
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
