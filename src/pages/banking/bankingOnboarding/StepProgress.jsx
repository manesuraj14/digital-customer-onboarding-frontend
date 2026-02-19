export default function StepProgress({ step }) {
  const steps = [
    "Bank",
    "Personal",
    "Address",
    "Nominee",
    "Documents",
    "Review",
    "Consent",
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((label, index) => {
          const s = index + 1;
          return (
            <div key={s} className="flex-1 text-center">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold
                ${
                  step >= s
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {s}
              </div>

              <p className="text-xs mt-1">{label}</p>
            </div>
          );
        })}
      </div>

      <div className="h-2 bg-gray-200 rounded mt-4">
        <div
          className="h-2 bg-indigo-600 rounded transition-all"
          style={{ width: `${(step - 1) * 16.6}%` }}
        />
      </div>
    </div>
  );
}
