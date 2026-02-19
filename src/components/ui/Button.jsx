export default function Button({ text, type = "button" }) {
  return (
    <button
      type={type}
      className="
        w-full py-3
        bg-gradient-to-r from-indigo-600 to-blue-600
        text-white font-semibold
        rounded-lg
        hover:scale-105 hover:shadow-xl
        transition-all duration-300
      "
    >
      {text}
    </button>
  );
}
