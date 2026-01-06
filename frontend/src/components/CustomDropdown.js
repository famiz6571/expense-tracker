import { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  error,
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange({ target: { value: val } }); // emit like normal input
    setOpen(false);
  };

  const displayLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className="relative" ref={ref}>
      {label && (
        <label className="block text-gray-700 mb-1 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-2 border rounded-md cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
          error ? "border-red-500" : "border-gray-300"
        } bg-white`}
      >
        <span>{displayLabel}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md max-h-48 overflow-y-auto shadow-lg">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomDropdown;
