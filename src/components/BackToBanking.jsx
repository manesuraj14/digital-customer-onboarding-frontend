import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackToBanking() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard/banking")}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mb-4"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Banking
    </button>
  );
}
