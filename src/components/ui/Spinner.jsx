export default function Spinner({ size = "md" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
  };

  return (
    <div
      className={`animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600 ${sizes[size]}`}
    />
  );
}
