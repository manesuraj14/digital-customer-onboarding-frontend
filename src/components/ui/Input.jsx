export default function Input({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full px-4 py-3
        rounded-lg border border-gray-300
        focus:ring-2 focus:ring-indigo-500
        focus:outline-none
        transition
      "
    />
  );
}
