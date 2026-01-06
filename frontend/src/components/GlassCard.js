const GlassCard = ({ title, children, className = "" }) => {
  return (
    <div
      className={`rounded-xl p-6 bg-white/70 backdrop-blur-md border border-white/40 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default GlassCard;
