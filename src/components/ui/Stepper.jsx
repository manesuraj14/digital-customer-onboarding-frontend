import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Stepper({ steps, currentStep, className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 rounded"></div>
        
        {/* Active progress line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-primary rounded"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              {/* Step circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent ? "#0B3C5D" : "#fff",
                  borderColor: isCompleted || isCurrent ? "#0B3C5D" : "#d1d5db",
                }}
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full border-2 
                  font-semibold text-sm transition-colors duration-200
                  ${isPending ? "bg-white text-gray-400 border-gray-300" : ""}
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className={isCurrent ? "text-white" : "text-gray-500"}>
                    {stepNumber}
                  </span>
                )}
              </motion.div>

              {/* Step label */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isCurrent || isCompleted ? 1 : 0.6,
                }}
                className="mt-3 text-center"
              >
                <p className={`
                  text-xs font-medium
                  ${isCurrent ? "text-primary" : isCompleted ? "text-gray-700" : "text-gray-400"}
                `}>
                  {step}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StepContent({ children, currentStep, step }) {
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
