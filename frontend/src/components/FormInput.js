import React from "react";

const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
}) => {
  return (
    <div>
      <label className="block text-gray-700 mb-1 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
