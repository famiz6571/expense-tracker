import React from "react";

const AuthLayout = ({ title, children, footer }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl p-8">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          {title}
        </h2>

        {children}

        {footer && (
          <div className="text-center text-gray-500 mt-4">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
