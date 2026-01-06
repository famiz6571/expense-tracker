const FormButton = ({
  children,
  loading = false,
  disabled = false,
  type = "submit",
}) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
    >
      {loading ? "Processing..." : children}
    </button>
  );
};

export default FormButton;
