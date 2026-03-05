import { useEffect } from "react";

export default function Header({ isDark, setIsDark }) {
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div 
      className="flex flex-row items-center justify-between mb-8 p-6 rounded-lg transition-colors duration-500"
    >
      <div className="container-left">
        <h1 
          className="text-3xl text-primary font-bold tracking-tight transition-colors duration-500"
        >
          Dashboard de Métricas
        </h1>
      </div>

      <div className="container-right">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`
            relative inline-flex h-8 w-14 items-center rounded-full 
            transition-colors duration-300 focus:outline-none
            ${isDark ? "bg-indigo-600" : "bg-gray-300"}
          `}
        >
          <span
            className={`
              flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-lg 
              transition-transform duration-300 ease-in-out
              ${isDark ? "translate-x-7" : "translate-x-1"}
            `}
          >
            <span className="text-[12px]">{isDark ? "🌙" : "☀️"}</span>
          </span>
        </button>
      </div>
    </div>
  );
}