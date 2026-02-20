import { forwardRef } from "react";

const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  iconPosition = "left",
  className = "",
  containerClassName = "",
  type = "text",
  ...props
}, ref) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative w-full">
        {Icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`
            w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg bg-white text-sm leading-none
            placeholder-gray-400 transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${Icon && iconPosition === "right" ? "pr-10" : ""}
            ${error ? "border-error focus:ring-error-200 focus:border-error" : ""}
            ${className}
          `}
          {...props}
        />
        
        {Icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;

// Select Component
export const Select = forwardRef(({
  label,
  error,
  options = [],
  placeholder = "Select an option",
  className = "",
  containerClassName = "",
  ...props
}, ref) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <select
        ref={ref}
        className={`
          w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-sm leading-none
          transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? "border-error focus:ring-error-200 focus:border-error" : ""}
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1.5 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

// Textarea Component
export const Textarea = forwardRef(({
  label,
  error,
  className = "",
  containerClassName = "",
  rows = 4,
  ...props
}, ref) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm
          placeholder-gray-400 transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          resize-none
          ${error ? "border-error focus:ring-error-200 focus:border-error" : ""}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1.5 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

// Checkbox Component
export const Checkbox = forwardRef(({
  label,
  error,
  className = "",
  containerClassName = "",
  ...props
}, ref) => {
  return (
    <div className={`flex items-start gap-3 ${containerClassName}`}>
      <input
        ref={ref}
        type="checkbox"
        className={`
          mt-1 h-4 w-4 rounded border-gray-300 text-primary 
          focus:ring-primary focus:ring-offset-2
          ${error ? "border-error" : ""}
          ${className}
        `}
        {...props}
      />
      {label && (
        <label className="text-sm text-gray-700">
          {label}
        </label>
      )}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

// PasswordInput Component
export const PasswordInput = forwardRef(({
  label,
  error,
  icon: Icon,
  showPassword,
  onTogglePassword,
  className = "",
  containerClassName = "",
  ...props
}, ref) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative w-full">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={`
            w-full h-12 pl-10 pr-10 border border-gray-300 rounded-lg bg-white text-sm leading-none
            placeholder-gray-400 transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? "border-error focus:ring-error-200 focus:border-error" : ""}
            ${className}
          `}
          {...props}
        />
        
        {onTogglePassword && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
            <button
              type="button"
              onClick={onTogglePassword}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
