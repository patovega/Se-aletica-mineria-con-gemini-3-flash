
import React, { useState, useEffect } from 'react';
import { RiskCategory, ViewType, SUB_RISKS, RISK_ELEMENTS_BY_SUBRISK, VEHICLE_MODELS, SignData } from './types';
import { generatePictogram } from './services/geminiService';
import Header from './components/Header';
import SignPreview from './components/SignPreview';

const App: React.FC = () => {
  const initialSubRisk = SUB_RISKS[RiskCategory.MECANICO][0];
  const initialElement = RISK_ELEMENTS_BY_SUBRISK[initialSubRisk][0];

  const [signData, setSignData] = useState<SignData>({
    title: 'PELIGRO',
    category: RiskCategory.MECANICO,
    subRisk: initialSubRisk,
    elementDetail: initialElement,
    viewType: ViewType.LATERAL,
    description: initialSubRisk.toUpperCase()
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = (updates: Partial<SignData>) => {
    setSignData(prev => ({ ...prev, ...updates }));
  };

  const handleCategoryChange = (cat: RiskCategory) => {
    const newSubRisk = SUB_RISKS[cat][0];
    const newElement = RISK_ELEMENTS_BY_SUBRISK[newSubRisk][0];
    const models = VEHICLE_MODELS[newElement];
    
    setSignData(prev => ({
      ...prev,
      category: cat,
      subRisk: newSubRisk,
      elementDetail: newElement,
      vehicleModel: models ? models[0] : undefined,
      description: newSubRisk.toUpperCase()
    }));
  };

  const handleSubRiskChange = (risk: string) => {
    const newElement = RISK_ELEMENTS_BY_SUBRISK[risk][0];
    const models = VEHICLE_MODELS[newElement];
    
    setSignData(prev => ({
      ...prev,
      subRisk: risk,
      elementDetail: newElement,
      vehicleModel: models ? models[0] : undefined,
      description: risk.toUpperCase()
    }));
  };

  const handleElementChange = (element: string) => {
    const models = VEHICLE_MODELS[element];
    handleUpdate({ 
      elementDetail: element, 
      vehicleModel: models ? models[0] : undefined 
    });
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    const viewDescription = signData.viewType === ViewType.FRONTAL ? 'front view' : 'side profile view';
    
    // Prompt enriquecido con el modelo del vehículo si existe
    const elementLabel = signData.vehicleModel 
      ? `${signData.elementDetail} model ${signData.vehicleModel}` 
      : signData.elementDetail;

    const prompt = `Industrial safety symbol for ${signData.subRisk} involving ${elementLabel}, ${viewDescription}, simple solid black silhouette, ISO 7010 style. No grey. No shading.`;

    const url = await generatePictogram(prompt);
    if (url) {
      handleUpdate({ pictogramUrl: url });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Fuente Informativa */}
        <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-bold text-yellow-900">Referencia Técnica:</p>
              <p className="text-xs text-yellow-800">
                Basado en el <a href="https://www.dt.gob.cl/portal/1629/articles-100041_recurso_1.pdf" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-yellow-950">Manual de Señalética de Seguridad DT</a> y la norma <span className="font-bold">NCh 1411</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Controls Column */}
          <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold">01</span>
                <h2 className="text-xl font-bold text-slate-900">Configuración del Letrero</h2>
              </div>
              
              <div className="space-y-6">
                {/* Encabezado */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Encabezado de Seguridad</label>
                  <select 
                    value={signData.title}
                    onChange={(e) => handleUpdate({ title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none font-bold text-black shadow-inner"
                  >
                    <option value="PELIGRO">PELIGRO</option>
                    <option value="ADVERTENCIA">ADVERTENCIA</option>
                    <option value="PRECAUCIÓN">PRECAUCIÓN</option>
                    <option value="ATENCIÓN">ATENCIÓN</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Categoría */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Categoría</label>
                    <select
                      value={signData.category}
                      onChange={(e) => handleCategoryChange(e.target.value as RiskCategory)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none font-bold text-black shadow-inner"
                    >
                      {Object.values(RiskCategory).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Riesgo Específico */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Riesgo Específico</label>
                    <select
                      value={signData.subRisk}
                      onChange={(e) => handleSubRiskChange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none font-bold text-black shadow-inner"
                    >
                      {SUB_RISKS[signData.category].map((risk) => (
                        <option key={risk} value={risk}>{risk}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dinamyc Detail Selection */}
                <div className="p-4 bg-slate-100 border-2 border-slate-200 rounded-xl space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-2 tracking-wider">Fuente de Riesgo</label>
                      <select 
                        value={signData.elementDetail}
                        onChange={(e) => handleElementChange(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-black font-black shadow-sm"
                      >
                        {RISK_ELEMENTS_BY_SUBRISK[signData.subRisk]?.map(item => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    {/* Selector de Modelo de Vehículo condicional */}
                    {signData.elementDetail && VEHICLE_MODELS[signData.elementDetail] && (
                      <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                        <label className="block text-xs font-bold text-blue-600 uppercase mb-2 tracking-wider">Modelo Específico</label>
                        <select 
                          value={signData.vehicleModel}
                          onChange={(e) => handleUpdate({ vehicleModel: e.target.value })}
                          className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-blue-900 font-black shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          {VEHICLE_MODELS[signData.elementDetail].map(model => (
                            <option key={model} value={model}>{model}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 italic">
                    {signData.vehicleModel 
                      ? `Se generará un pictograma detallado de un ${signData.vehicleModel}.` 
                      : 'El elemento seleccionado definirá el dibujo central del letrero.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Perspectiva</label>
                    <div className="flex gap-2">
                      {Object.values(ViewType).map((view) => (
                        <button
                          key={view}
                          onClick={() => handleUpdate({ viewType: view })}
                          className={`flex-1 py-3 rounded-lg font-bold text-xs transition-all border ${
                            signData.viewType === view 
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                              : 'bg-white text-black border-slate-200 hover:border-slate-400 shadow-sm'
                          }`}
                        >
                          {view}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Texto del Letrero */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Mensaje Personalizado</label>
                  <textarea 
                    value={signData.description}
                    onChange={(e) => handleUpdate({ description: e.target.value.toUpperCase() })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none h-24 font-black text-black text-xl leading-none shadow-inner"
                  />
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full bg-yellow-400 text-black font-black py-5 rounded-xl shadow-lg hover:bg-yellow-500 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg uppercase tracking-tight"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-6 w-6 border-b-2 border-black rounded-full"></div>
                      DIBUJANDO EQUIPO...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      ACTUALIZAR LETRERO
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div className="print:m-0">
            <SignPreview data={signData} isLoading={isLoading} />
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-slate-900 font-black tracking-widest text-lg uppercase">Señalética de Seguridad</p>
          <div className="pt-4 flex justify-center gap-6 grayscale opacity-50">
            <span className="text-[10px] font-bold border border-slate-300 px-2 py-1 rounded">NCh 1411</span>
            <span className="text-[10px] font-bold border border-slate-300 px-2 py-1 rounded">DT CHILE</span>
            <span className="text-[10px] font-bold border border-slate-300 px-2 py-1 rounded">DS 594</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
