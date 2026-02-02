
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 p-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase">Señalética Industrial</h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Generador Profesional de Seguridad</p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400 border border-slate-700">Norma NCh 1411 Compliant</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
