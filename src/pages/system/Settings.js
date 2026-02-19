export default function Settings() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-xl">
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Admin Email
          </label>
          <input
            type="email"
            placeholder="admin@company.com"
            className="w-full px-4 py-2 rounded-lg border
                       dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Notification Preference
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border
                       dark:bg-gray-700 dark:border-gray-600"
          >
            <option>Email</option>
            <option>SMS</option>
            <option>Email + SMS</option>
          </select>
        </div>

        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Save Settings
        </button>
      </div>
    </>
  );
}
