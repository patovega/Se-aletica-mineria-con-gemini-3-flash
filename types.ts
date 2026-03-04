
export enum RiskCategory {
  MECANICO = 'Riesgos Mecánicos',
  FISICO = 'Riesgos Físicos',
  ELECTRICO = 'Riesgos Eléctricos',
  QUIMICO = 'Riesgos Químicos y Gases',
  TRANSITO = 'Riesgos de Tránsito',
  AMBIENTAL = 'Riesgos Ambientales',
  GEOMECANICO = 'Riesgos Geomecánicos / Terreno'
}

export enum ViewType {
  LATERAL = 'Lateral (Perfil)',
  FRONTAL = 'Frontal',
  CENITAL = 'Vista Cenital',
  CONTRAPICADO = 'Contrapicado'
}

export const SUB_RISKS: Record<RiskCategory, string[]> = {
  [RiskCategory.MECANICO]: [
    'Atrapamiento por partes móviles',
    'Corte por herramientas o piezas',
    'Proyección de partículas/fragmentos',
    'Aplastamiento por piezas pesadas'
  ],
  [RiskCategory.FISICO]: [
    'Caída al mismo nivel',
    'Caída a distinto nivel (Altura)',
    'Golpeado por caída de objetos',
    'Contacto con superficies calientes',
    'Exposición a niveles de ruido'
  ],
  [RiskCategory.ELECTRICO]: [
    'Contacto eléctrico directo/indirecto',
    'Arco eléctrico / Explosión',
    'Cables energizados expuestos'
  ],
  [RiskCategory.QUIMICO]: [
    'Exposición a sustancias tóxicas',
    'Inhalación de polvos o gases',
    'Contacto con corrosivos',
    'Riesgo de incendio/explosión'
  ],
  [RiskCategory.TRANSITO]: [
    'Atropello por equipos mineros',
    'Colisión de vehículos',
    'Volcamiento de maquinaria'
  ],
  [RiskCategory.AMBIENTAL]: [
    'Tormentas eléctricas',
    'Polución / Polvo en suspensión',
    'Nieve o Hielo en calzada',
    'Radiación UV extrema'
  ],
  [RiskCategory.GEOMECANICO]: [
    'Caída de rocas / Planchoneo',
    'Derrumbe de talud',
    'Falla de piso / Socavón',
    'Desprendimiento de material'
  ]
};

// Modelos específicos solicitados por el usuario
export const VEHICLE_MODELS: Record<string, string[]> = {
  'Camioneta 4x4': ['Toyota Hilux', 'Mitsubishi L200', 'Estándar'],
  'Camión CAEX': ['Komatsu 930', 'CAT 797', 'Volvo A35G (Articulado)']
};

// Mapeo EXACTO de elementos por cada sub-riesgo específico
export const RISK_ELEMENTS_BY_SUBRISK: Record<string, string[]> = {
  // Geomecánicos (NUEVO)
  'Caída de rocas / Planchoneo': ['Rocas sueltas en altura', 'Techo de galería minera', 'Malla de fortificación'],
  'Derrumbe de talud': ['Pared de tajo abierto', 'Talud inestable', 'Grietas en la corona'],
  'Falla de piso / Socavón': ['Socavón profundo', 'Hundimiento de terreno', 'Borde de banco'],
  'Desprendimiento de material': ['Acopio de mineral', 'Pila de lixiviación', 'Borde de botadero'],

  // Mecánicos
  'Atrapamiento por partes móviles': ['Engranajes', 'Correas y Poleas', 'Cadenas de transmisión', 'Rodillos', 'Eje rotatorio'],
  'Corte por herramientas o piezas': ['Sierra circular', 'Disco de corte', 'Cuchillo industrial', 'Torno'],
  'Proyección de partículas/fragmentos': ['Esmeril angular', 'Virutas metálicas', 'Piedras/Rocas volantes'],
  'Aplastamiento por piezas pesadas': ['Prensa hidráulica', 'Carga de mineral', 'Componente de motor gigante'],
  
  // Físicos
  'Caída al mismo nivel': ['Piso mojado/aceitoso', 'Cables en el suelo', 'Hielo en superficie', 'Obstáculo en pasillo'],
  'Caída a distinto nivel (Altura)': ['Escalera de mano', 'Andamio', 'Borde de tajo abierto', 'Plataforma elevada'],
  'Golpeado por caída de objetos': ['Carga suspendida por grúa', 'Herramienta en altura', 'Roca suelta en talud'],
  'Contacto con superficies calientes': ['Tubería de vapor', 'Motor en funcionamiento', 'Soldadura fresca'],
  'Exposición a niveles de ruido': ['Compresor de aire', 'Taladro percutor', 'Chancadora'],

  // Eléctricos
  'Contacto eléctrico directo/indirecto': ['Tablero eléctrico abierto', 'Transformador', 'Enchufe industrial'],
  'Arco eléctrico / Explosión': ['Subestación eléctrica', 'Celda de media tensión', 'Baterías industriales'],
  'Cables energizados expuestos': ['Cables de alta tensión', 'Extensiones dañadas', 'Toma de tierra'],

  // Químicos
  'Exposición a sustancias tóxicas': ['Bidón de cianuro', 'Solvente industrial', 'Reactivos de flotación'],
  'Inhalación de polvos o gases': ['Cilindro de gas', 'Escape de motor diesel', 'Área de tronadura'],
  'Contacto con corrosivos': ['Ácido sulfúrico', 'Soda cáustica', 'Derrame químico'],
  'Riesgo de incendio/explosión': ['Estanque de combustible', 'Depósito de explosivos', 'Fuga de gas'],

  // Tránsito
  'Atropello por equipos mineros': ['Camión CAEX', 'Cargador frontal', 'Pala mecánica', 'Motoniveladora'],
  'Colisión de vehículos': ['Camioneta 4x4', 'Camión CAEX', 'Bus de personal'],
  'Volcamiento de maquinaria': ['Camioneta 4x4', 'Camión CAEX', 'Bulldozer', 'Dumper'],

  // Ambiental
  'Tormentas eléctricas': ['Nube con rayos', 'Torre de alta tensión bajo tormenta'],
  'Polución / Polvo en suspensión': ['Nube de polvo mineral', 'Chancadora operando'],
  'Nieve o Hielo en calzada': ['Ruta cordillerana nevada', 'Parche de hielo negro'],
  'Radiación UV extrema': ['Sol intenso', 'Reflejo en salar']
};

export interface SignData {
  title: string;
  category: RiskCategory;
  subRisk: string;
  elementDetail: string;
  vehicleModel?: string;
  viewType: ViewType;
  description: string;
  pictogramUrl?: string;
}
