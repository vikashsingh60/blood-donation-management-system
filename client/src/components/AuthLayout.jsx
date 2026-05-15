const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff4f4] via-[#ffe8ec] to-[#fff9fa] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[40px] shadow-[0_40px_120px_rgba(252,74,74,0.18)] p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;