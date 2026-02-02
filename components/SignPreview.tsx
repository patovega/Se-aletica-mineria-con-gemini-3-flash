import React, { useRef } from 'react';
import { SignData } from '../types';

interface SignPreviewProps {
  data: SignData;
  isLoading: boolean;
}

const SignPreview: React.FC<SignPreviewProps> = ({ data, isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-6">
      <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
        <span className="w-2 h-6 bg-yellow-500 rounded-full"></span>
        Vista Previa (Estándar Diamante)
      </h2>
      
      {/* Contenedor Principal: Fondo transparente para que el diamante resalte */}
      <div 
        ref={containerRef}
        className="w-full flex flex-col items-center gap-4"
      >
        {/* El Diamante (Rombo de Advertencia) */}
        <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center p-4">
          
          {/* Capa de Borde Negro Exterior */}
          <div 
            className="absolute inset-0 bg-black"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
          
          {/* Capa Amarilla Interior (con margen para el borde negro) */}
          <div 
            className="absolute inset-[3%] bg-[#FFD100] flex items-center justify-center"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          >
            {/* Contenedor del Pictograma: Agrandado al 75% del área amarilla */}
            <div className="w-[75%] aspect-square flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black"></div>
                  <p className="text-black font-black uppercase text-[10px] tracking-widest">Generando...</p>
                </div>
              ) : data.pictogramUrl ? (
                <img 
                  src={data.pictogramUrl} 
                  alt="Pictograma" 
                  className="w-full h-full object-contain"
                  style={{ 
                    /* mixBlendMode: multiply hace que el blanco del fondo desaparezca sobre el amarillo */
                    mixBlendMode: 'multiply',
                    /* Filtro para forzar el contraste y asegurar que el blanco sea puro */
                    filter: 'grayscale(100%) contrast(300%) brightness(1.2)'
                  }}
                />
              ) : (
                <div className="text-black/5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel de Texto Inferior (Independiente del diamante) */}
        <div className="w-full max-w-[450px] shadow-2xl">
          <div className="w-full text-center bg-black py-3 px-4 rounded-t-lg">
            <h3 className="text-3xl font-black text-[#FFD100] uppercase tracking-tighter">
              {data.title || 'ADVERTENCIA'}
            </h3>
          </div>
          
          <div className="w-full text-center bg-white border-x-[8px] border-b-[8px] border-black p-6 rounded-b-lg min-h-[140px] flex flex-col justify-center">
            <p className="text-black text-4xl font-black uppercase leading-[0.9] tracking-tighter">
              {data.description || 'RIESGO EN ÁREA'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4 print:hidden">
        <button 
          onClick={() => window.print()}
          className="flex-1 bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-black transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
          </svg>
          DESCARGAR PARA IMPRESIÓN
        </button>
      </div>
      
      <style>{`
        @media print {
          body { background: white !important; padding: 0 !important; }
          .print\\:hidden { display: none !important; }
          header, footer, main > div > div:first-child { display: none !important; }
          .lg\\:grid-cols-2 { grid-template-columns: 1fr !important; }
          .sticky { position: static !important; }
          .shadow-2xl, .shadow-lg, .shadow-sm { box-shadow: none !important; }
          .rounded-2xl, .rounded-xl, .rounded-lg { border-radius: 0 !important; }
          .bg-slate-50, .bg-slate-50 { background: white !important; }
          main { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default SignPreview;