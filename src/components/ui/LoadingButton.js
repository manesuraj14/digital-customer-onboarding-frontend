import Spinner from "./Spinner";

export default function LoadingButton({ loading, children, ...props }) {
  return (
    <button
      disabled={loading}
      {...props}
      className={`w-full py-3 rounded-lg font-semibold text-white
        bg-gradient-to-r from-indigo-600 to-blue-600
        hover:scale-105 transition-all
        disabled:opacity-60 disabled:cursor-not-allowed
        ${props.className || ""}`}
    >
      {loading ? (
        <div className="flex justify-center">
          <Spinner size="sm" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
