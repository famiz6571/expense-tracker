import GlassCard from "../components/GlassCard";

const AuthLayout = ({ title, children, footer }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <GlassCard className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          {title}
        </h2>

        {children}

        {footer && (
          <div className="text-center text-gray-500 mt-4">{footer}</div>
        )}
      </GlassCard>
    </div>
  );
};

export default AuthLayout;
