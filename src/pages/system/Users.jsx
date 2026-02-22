const users = [
  { id: 1, name: "Aditya Lokhande", email: "aditya@mail.com", status: "Verified" },
  { id: 2, name: "Sneha Patil", email: "sneha@mail.com", status: "Pending" },
  { id: 3, name: "Adesh Madhurkar", email: "adesh@mail.com", status: "Verified" },
];

export default function Users() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t dark:border-gray-700">
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td
                  className={`p-4 font-semibold ${
                    u.status === "Verified"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}
                >
                  {u.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
