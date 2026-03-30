import { ConstructionSystem, Mission } from '../types';

export const PHYSICS_DICTIONARY = [
  // ═══ AISLAMIENTOS ═══
  { keywords: ['lana de roca', 'lana', 'mineral', 'rockwool'], lambda: 0.035, density: 40, color: '#facc15', icon: 'Layers', type: 'Aislante Térmico', textureClass: 'insulation', textureId: 'lana-roca', image: '/texturas/lana_roca.svg' },
  { keywords: ['xps', 'poliestireno extruido', 'panel xps'], lambda: 0.034, density: 35, color: '#67e8f9', icon: 'Box', type: 'Aislante Térmico', textureClass: 'foam', textureId: 'xps-rigido', image: '/texturas/xps.svg' },
  { keywords: ['eps', 'poliestireno expandido', 'sate eps'], lambda: 0.038, density: 20, color: '#e0f2fe', icon: 'Box', type: 'Aislante Térmico', textureClass: 'foam', textureId: 'eps-sate', image: '/texturas/eps.svg' },
  { keywords: ['poliuretano', 'pur', 'espuma'], lambda: 0.028, density: 35, color: '#bae6fd', icon: 'Box', type: 'Aislante Térmico', textureClass: 'foam', textureId: 'poliuretano', image: '/texturas/poliuretano.svg' },
  { keywords: ['isover', 'ibr', 'arena'], lambda: 0.036, density: 18, color: '#fde047', icon: 'Layers', type: 'Aislante Térmico', textureClass: 'insulation', textureId: 'isover-arena', image: '/texturas/lana_vidrio.svg' },
  // ═══ LADRILLOS / FÁBRICA ═══
  { keywords: ['ladrillo perforado', 'gero', 'portante'], lambda: 0.50, density: 1800, color: '#c2410c', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'brick', textureId: 'brick-gero', image: '/texturas/brick_gero.svg' },
  { keywords: ['ladrillo hueco', 'lhd', 'tabique'], lambda: 0.44, density: 1200, color: '#ea580c', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'brick', textureId: 'brick-hueco', image: '/texturas/brick_hueco.svg' },
  { keywords: ['cara vista', 'caravista', 'klinker'], lambda: 0.85, density: 2000, color: '#9a3412', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'brick', textureId: 'brick-caravista', image: '/texturas/brick_caravista.svg' },
  { keywords: ['termoarcilla', 'aligerado'], lambda: 0.28, density: 900, color: '#d97706', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'brick', textureId: 'termoarcilla', image: '/texturas/termoarcilla.svg' },
  { keywords: ['bloque hormig', 'bloque de hormigón', 'bloque estructural'], lambda: 1.04, density: 2100, color: '#6b7280', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'concrete', textureId: 'bloque-hormigon', image: '/texturas/bloque_hormigon.svg' },
  { keywords: ['forjado', 'estructura', 'hormigón armado'], lambda: 1.63, density: 2400, color: '#4b5563', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'concrete', textureId: 'forjado', image: '/texturas/forjado.svg' },
  { keywords: ['cerámic', 'fábrica'], lambda: 0.50, density: 1800, color: '#c2410c', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'brick', textureId: 'brick-generic', image: '/texturas/brick_gero.svg' },
  // ═══ ACABADOS INTERIORES ═══
  { keywords: ['yeso', 'pyl', 'placa de yeso', 'placa yeso'], lambda: 0.25, density: 800, color: '#f8fafc', icon: 'Square', type: 'Acabado Interior', textureClass: 'plaster', textureId: 'pyl-15', image: '/texturas/pyl.svg' },
  { keywords: ['enlucido', 'yeso manual', 'acabado'], lambda: 0.30, density: 1000, color: '#f1f5f9', icon: 'Square', type: 'Acabado Interior', textureClass: 'plaster', textureId: 'enlucido-yeso', image: '/texturas/enlucido.svg' },
  { keywords: ['knauf'], lambda: 0.25, density: 800, color: '#e2e8f0', icon: 'Square', type: 'Acabado Interior', textureClass: 'plaster', textureId: 'knauf-pyl', image: '/texturas/pyl.svg' },
  // ═══ BARRERAS DE AGUA / VAPOR ═══
  { keywords: ['impermeab', 'asfáltic', 'lámina', 'bituminosa'], lambda: 0.20, density: 1100, color: '#27272a', icon: 'Droplets', type: 'Barrera de Agua', textureClass: 'waterproof', textureId: 'lamina-asfaltica', image: '/texturas/lamina_asfaltica.svg' },
  { keywords: ['weberdry', 'evac', 'imperbanda', 'termoplástic'], lambda: 0.20, density: 1100, color: '#3f3f46', icon: 'Droplets', type: 'Barrera de Agua', textureClass: 'waterproof', textureId: 'weberdry', image: '/texturas/weberdry.svg' },
  { keywords: ['vapor', 'barrera de vapor', 'pe 0.2', 'pe'], lambda: 0.33, density: 950, color: '#52525b', icon: 'Droplets', type: 'Barrera de Agua', textureClass: 'waterproof', textureId: 'barrera-vapor', image: '/texturas/barrera_vapor.svg' },
  { keywords: ['danosa', 'esterdan'], lambda: 0.19, density: 1050, color: '#18181b', icon: 'Droplets', type: 'Barrera de Agua', textureClass: 'waterproof', textureId: 'danosa', image: '/texturas/danosa.svg' },
  { keywords: ['bentonita'], lambda: 0.60, density: 2000, color: '#44403c', icon: 'Droplets', type: 'Barrera de Agua', textureClass: 'waterproof', textureId: 'bentonita', image: '/texturas/lamina_asfaltica.svg' },
  // ═══ REVESTIMIENTOS ═══
  { keywords: ['mortero acrílico', 'acrílico', 'sate'], lambda: 0.70, density: 1600, color: '#cbd5e1', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'mortero-acrilico', image: '/texturas/mortero_acrilico.svg' },
  { keywords: ['monocapa', 'weberpral'], lambda: 0.80, density: 1700, color: '#94a3b8', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'monocapa', image: '/texturas/monocapa.svg' },
  { keywords: ['fibrocemento', 'euronit', 'placa'], lambda: 0.35, density: 1700, color: '#64748b', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'fibrocemento', image: '/texturas/fibrocemento.svg' },
  { keywords: ['pavimento', 'cerámico', 'gres', 'porcelanosa', 'baldosa'], lambda: 1.00, density: 2300, color: '#78716c', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'pavimento-ceramico', image: '/texturas/pavimento.svg' },
  { keywords: ['grava', 'árido', 'protección'], lambda: 2.00, density: 1800, color: '#a8a29e', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'grava', image: '/texturas/grava.svg' },
  { keywords: ['revest', 'mortero', 'hormig', 'cemento'], lambda: 0.80, density: 1600, color: '#94a3b8', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'revestimiento-generico', image: '/texturas/monocapa.svg' },
  // ═══ CUBIERTAS ═══
  { keywords: ['teja', 'innova', 'planum', 'escandella', 'cubierta'], lambda: 1.00, density: 2000, color: '#dc2626', icon: 'Home', type: 'Cubierta', textureClass: 'brick', textureId: 'teja-ceramica', image: '/texturas/teja.svg' },
  { keywords: ['onduline', 'bajo teja'], lambda: 0.15, density: 950, color: '#b91c1c', icon: 'Home', type: 'Cubierta', textureClass: 'waterproof', textureId: 'onduline', image: '/texturas/onduline.svg' },
  // ═══ MORTEROS TÉCNICOS ═══
  { keywords: ['reparación', 'weberep', 'resina'], lambda: 1.00, density: 2100, color: '#64748b', icon: 'Wrench', type: 'Mortero Técnico', textureClass: 'concrete', textureId: 'weberep', image: '/texturas/mortero_tecnico.svg' },
  { keywords: ['adhesivo', 'mortero adhesivo'], lambda: 0.90, density: 1800, color: '#94a3b8', icon: 'Wrench', type: 'Mortero Técnico', textureClass: 'concrete', textureId: 'adhesivo-sate', image: '/texturas/mortero_tecnico.svg' },
  { keywords: ['autonivelante', 'nivelante'], lambda: 1.40, density: 2000, color: '#475569', icon: 'Wrench', type: 'Mortero Técnico', textureClass: 'concrete', textureId: 'autonivelante', image: '/texturas/mortero_tecnico.svg' },
  // ═══ CARPINTERÍAS ═══
  { keywords: ['aluminio', 'technal', 'cortizo', 'ventana'], lambda: 160.0, density: 2700, color: '#9ca3af', icon: 'Square', type: 'Carpintería', textureClass: 'concrete', textureId: 'aluminio', image: '/texturas/aluminio.svg' },
];

export const CONSTRUCTION_SYSTEMS: Record<string, ConstructionSystem> = {
  'SATE': {
    name: 'Fachada SATE (Aisl. Exterior)',
    description: 'Sistema de Aislamiento Térmico por el Exterior. EXT→INT: Revestimiento + Aislante + Hoja Principal + Acabado.',
    allowedTypes: ['Revestimiento', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior', 'Mortero Técnico'],
    requiredLayers: ['Revestimiento', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior'],
    requiredOrder: ['Revestimiento', 'Mortero Técnico', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior'],
    normRef: 'CTE DB-HE §7.2, ETAG 004'
  },
  'VENTILADA': {
    name: 'Fachada Ventilada',
    description: 'Cámara de aire ventilada con aislamiento exterior. EXT→INT: Revestimiento + Cámara + Aislante + Hoja + Acabado.',
    allowedTypes: ['Revestimiento', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior', 'Cámara de Aire'],
    requiredLayers: ['Revestimiento', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior'],
    requiredOrder: ['Revestimiento', 'Cámara de Aire', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior'],
    normRef: 'CTE DB-HE §7.2, CTE DB-HS §2.3'
  },
  'TRADICIONAL': {
    name: 'Fachada Tradicional (Aisl. Int.)',
    description: 'Hoja principal exterior y trasdosado interior. EXT→INT: Revestimiento + Hoja + Aislante + Barrera + Acabado.',
    allowedTypes: ['Revestimiento', 'Hoja Principal', 'Aislante Térmico', 'Acabado Interior', 'Barrera de Agua', 'Cámara de Aire'],
    requiredLayers: ['Revestimiento', 'Hoja Principal', 'Aislante Térmico', 'Acabado Interior'],
    requiredOrder: ['Revestimiento', 'Hoja Principal', 'Cámara de Aire', 'Aislante Térmico', 'Barrera de Agua', 'Acabado Interior'],
    normRef: 'CTE DB-HE §7.2, CTE DB-HS §2.3'
  },
  'PARTICION_INT': {
    name: 'Partición Interior (Tabique)',
    description: 'Separación entre estancias interiores. Acabado + Hoja + Aislante + Acabado.',
    allowedTypes: ['Acabado Interior', 'Hoja Principal', 'Aislante Térmico', 'Mortero Técnico'],
    requiredLayers: ['Acabado Interior', 'Hoja Principal', 'Acabado Interior'],
    requiredOrder: ['Acabado Interior', 'Hoja Principal', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior'],
    normRef: 'CTE DB-HR §3.1'
  },
  'SOLERA': {
    name: 'Solera Flotante (Suelos)',
    description: 'Pavimento sobre aislamiento y base estructural. Revestimiento + Mortero + Aislante + Barrera + Base.',
    allowedTypes: ['Revestimiento', 'Mortero Técnico', 'Aislante Térmico', 'Barrera de Agua', 'Hoja Principal'],
    requiredLayers: ['Revestimiento', 'Mortero Técnico', 'Aislante Térmico', 'Hoja Principal'],
    requiredOrder: ['Revestimiento', 'Mortero Técnico', 'Aislante Térmico', 'Barrera de Agua', 'Hoja Principal'],
    normRef: 'CTE DB-HR §3.1, CTE DB-HE §7.2'
  },
  'TABIQUERIA_INT': {
    name: 'Tabiquería Interior (PYL)',
    description: 'Partición interior con placa de yeso y lana de roca. PYL + Aislante + PYL.',
    allowedTypes: ['Acabado Interior', 'Aislante Térmico'],
    requiredLayers: ['Acabado Interior', 'Aislante Térmico', 'Acabado Interior'],
    requiredOrder: ['Acabado Interior', 'Aislante Térmico', 'Acabado Interior'],
    normRef: 'CTE DB-HR §3.1'
  },
  'CUBIERTA_INV': {
    name: 'Cubierta Invertida',
    description: 'Aislamiento sobre impermeabilización. Grava + XPS + Impermeab. + Forjado.',
    allowedTypes: ['Revestimiento', 'Aislante Térmico', 'Barrera de Agua', 'Hoja Principal', 'Mortero Técnico'],
    requiredLayers: ['Revestimiento', 'Aislante Térmico', 'Barrera de Agua', 'Hoja Principal'],
    requiredOrder: ['Revestimiento', 'Aislante Térmico', 'Barrera de Agua', 'Mortero Técnico', 'Hoja Principal'],
    normRef: 'CTE DB-HS §2.4, CTE DB-HE §7.2'
  },
  'CUBIERTA_TRAD': {
    name: 'Cubierta Convencional (Teja)',
    description: 'Teja cerámica sobre impermeabilización y aislamiento. Teja + Impermeab. + Aislante + Forjado.',
    allowedTypes: ['Cubierta', 'Barrera de Agua', 'Aislante Térmico', 'Hoja Principal', 'Revestimiento'],
    requiredLayers: ['Cubierta', 'Barrera de Agua', 'Aislante Térmico', 'Hoja Principal'],
    requiredOrder: ['Cubierta', 'Barrera de Agua', 'Aislante Térmico', 'Hoja Principal'],
    normRef: 'CTE DB-HS §2.4, CTE DB-HE §7.2'
  }
};

export const MISSIONS: Mission[] = [
  {
    id: 'mission_sate',
    name: 'Maestro SATE',
    description: 'Configura una fachada SATE perfecta con todos los materiales en el orden correcto según CTE DB-HE.',
    systemKey: 'SATE',
    requiredOrder: ['Revestimiento', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior'],
    xpReward: 200,
    badge: 'sate_master',
    badgeIcon: '🏗️',
    difficulty: 'Principiante'
  },
  {
    id: 'mission_ventilada',
    name: 'Experto Fachada Ventilada',
    description: 'Monta una fachada ventilada con cámara de aire según las especificaciones de CTE DB-HS.',
    systemKey: 'VENTILADA',
    requiredOrder: ['Revestimiento', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior'],
    xpReward: 300,
    badge: 'ventilada_expert',
    badgeIcon: '🌬️',
    difficulty: 'Intermedio'
  },
  {
    id: 'mission_particion',
    name: 'Aislamiento Acústico',
    description: 'Construye una partición interior que cumpla con CTE DB-HR para aislamiento acústico.',
    systemKey: 'PARTICION_INT',
    requiredOrder: ['Acabado Interior', 'Hoja Principal', 'Acabado Interior'],
    xpReward: 250,
    badge: 'acoustic_pro',
    badgeIcon: '🔇',
    difficulty: 'Intermedio'
  },
  {
    id: 'mission_solera',
    name: 'Solera Perfecta',
    description: 'Configura una solera flotante con todos los componentes correctos para cumplir DB-HR y DB-HE.',
    systemKey: 'SOLERA',
    requiredOrder: ['Revestimiento', 'Mortero Técnico', 'Aislante Térmico', 'Hoja Principal'],
    xpReward: 350,
    badge: 'floor_master',
    badgeIcon: '🏠',
    difficulty: 'Avanzado'
  },
  {
    id: 'mission_cubierta',
    name: 'Cubierta Invertida PRO',
    description: 'Diseña una cubierta invertida profesional con aislamiento XPS sobre impermeabilización.',
    systemKey: 'CUBIERTA_INV',
    requiredOrder: ['Revestimiento', 'Aislante Térmico', 'Barrera de Agua', 'Hoja Principal'],
    xpReward: 400,
    badge: 'roof_pro',
    badgeIcon: '🏢',
    difficulty: 'Avanzado'
  },
  {
    id: 'mission_energy_a',
    name: 'Calificación A',
    description: 'Consigue que tu detalle constructivo logre una calificación energética A (U ≤ 0.15 W/m²K).',
    systemKey: '',
    requiredOrder: [],
    xpReward: 500,
    badge: 'energy_a',
    badgeIcon: '⚡',
    difficulty: 'Experto'
  },
  {
    id: 'mission_cubierta_trad',
    name: 'Cubierta Tradicional',
    description: 'Configura una cubierta convencional con teja cerámica, impermeabilización y aislamiento.',
    systemKey: 'CUBIERTA_TRAD',
    requiredOrder: ['Cubierta', 'Barrera de Agua', 'Aislante Térmico', 'Hoja Principal'],
    xpReward: 350,
    badge: 'trad_roof',
    badgeIcon: '🏡',
    difficulty: 'Avanzado'
  }
];

export const LEVELS = [
  { min: 0, name: 'Aprendiz', color: '#94a3b8' },
  { min: 200, name: 'Oficial', color: '#22d3ee' },
  { min: 500, name: 'Técnico', color: '#34d399' },
  { min: 1000, name: 'Ingeniero', color: '#a78bfa' },
  { min: 1800, name: 'Arquitecto', color: '#f59e0b' },
  { min: 3000, name: 'Maestro Constructor', color: '#ef4444' },
];

export const getLevelInfo = (xp: number) => {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || LEVELS[i];
      break;
    }
  }
  const progress = next.min > current.min ? (xp - current.min) / (next.min - current.min) : 1;
  return { level: LEVELS.indexOf(current) + 1, name: current.name, color: current.color, progress, nextName: next.name, xpToNext: next.min - xp };
};

export const DEFAULT_CSV_DATA = `Categoría,Producto,Empresa,Precio,Unidad,Espesor,Medidas,Descripción y Ventajas,Normativa
Cubiertas,Teja Innova Klinker Rojo,La Escandella (Valencia),"28,00 €",m2,30 mm,46x28 cm,Teja plana de alta resistencia a heladas. Empresa valenciana.,CTE DB-HS
Cubiertas,Teja Planum Klinker Ceniza,La Escandella (Valencia),"29,50 €",m2,30 mm,44x28 cm,Perfil ultra plano minimalista. Fabricada en Castellón.,CTE DB-HS
Cubiertas,Bajo Teja Onduline ST200,Onduline,"12,00 €",m2,3 mm,200x100 cm,Placa impermeabilizante bajo teja.,CTE DB-HS
Revestimientos,Capa de Grava de Protección,Áridos Mediterráneo (Valencia),"8,50 €",m2,50 mm,Granel,Protección pesada contra viento y UV.,CTE DB-HS
Revestimientos,Gres Porcelánico Bottega,Porcelanosa (Castellón),"42,00 €",m2,10 mm,120x60 cm,Gres rectificado de alto tránsito. Hecho en Villarreal.,CTE DB-SUA
Revestimientos,Keraben Trend Gris,Keraben (Valencia),"28,00 €",m2,10 mm,75x75 cm,Pavimento cerámico antideslizante. Fábrica en Nules.,CTE DB-SUA
Revestimientos,Pamesa Talent Beige,Pamesa (Castellón),"22,00 €",m2,10 mm,60x60 cm,Gres porcelánico técnico. Empresa de Castellón.,CTE DB-SUA
Barrera de Agua,Lámina Asfáltica LBM-40,Danosa (Dist. Valencia),"8,50 €",m2,4 mm,Rollo,Lámina bituminosa soldable. Distribuida en Valencia.,CTE DB-HS
Barrera de Agua,Esterdan Plus 40,Danosa (Dist. Valencia),"11,00 €",m2,4 mm,Rollo,Lámina bituminosa autoprotegida SBS.,CTE DB-HS
Barrera de Agua,weberdry EVAc Imperbanda,Weber Saint-Gobain,"12,00 €",m2,2 mm,Rollo,Lámina estanca termoplástica EVAc.,CTE DB-HS
Barrera de Agua,Barrera de Vapor PE 0.2mm,Protectia,"2,50 €",m2,2 mm,Rollo,Lámina plástica contra condensaciones.,CTE DB-HS
Aislamiento,Panel XPS Rígido Ursa,Ursa (Dist. Valencia),"18,50 €",m2,60 mm,125x60 cm,Poliestireno extruido para cargas y agua.,CTE DB-HE
Aislamiento,Lana de Roca Alpharock,Rockwool Ibérica,"22,00 €",m2,60 mm,Panel,Aislamiento acústico/térmico transpirable. Dist. Valencia.,CTE DB-HE
Aislamiento,Poliestireno Expandido EPS SATE,Aislamentos Pro,"12,00 €",m2,80 mm,Panel,Panel base para sistemas térmicos de fachada.,CTE DB-HE
Aislamiento,Lana de Roca Acústica 431,Rockwool Ibérica,"15,00 €",m2,40 mm,Panel,Aislamiento para interiores. Distribuidor Valencia.,CTE DB-HR
Aislamiento,Isover Acustilaine MD,Isover Saint-Gobain,"17,00 €",m2,45 mm,Panel,Lana mineral para tabiquería interior.,CTE DB-HR
Aislamiento,Poliuretano Proyectado,Synthesia (Valencia),"24,00 €",m2,40 mm,Proyección,Espuma de poliuretano aplicada in situ.,CTE DB-HE
Fábrica,Ladrillo Perforado Gero Portante,Cerámicas La Plana (Castellón),"14,00 €",m2,115 mm,24x11.5x9 cm,Soporte estructural exterior. Fabricado en Castellón.,CTE DB-SE-F
Fábrica,Ladrillo Hueco Doble (LHD),Cerámicas La Plana (Castellón),"9,00 €",m2,90 mm,24x9x9 cm,Tabiquería y hoja interior. Empresa valenciana.,CTE DB-SE-F
Fábrica,Ladrillo Cara Vista Rojo Tosco,Cerámicas Ferrés (Valencia),"35,00 €",m2,115 mm,24x11.5x5 cm,Ladrillo hidrófugo exterior klinker. Valencia.,CTE DB-SE-F
Fábrica,Bloque de Hormigón Estructural,Prefabs Levante (Valencia),"18,00 €",m2,200 mm,Bloque,Muro de carga de alta inercia. Empresa de Sagunto.,CTE DB-SE
Fábrica,Bloque Termoarcilla ECO,Hispalyt (Castellón),"28,00 €",m2,240 mm,29x24x14 cm,Bloque aligerado térmico. Red Hispalyt Valencia.,CTE DB-HE
Fábrica,Forjado Unidireccional Hormigón,Estructuras Mediterráneo,"55,00 €",m2,300 mm,Forjado,Base estructural horizontal pesada.,CTE DB-SE
Revestimientos,Mortero Acrílico Exterior SATE,Weber Saint-Gobain,"15,50 €",m2,10 mm,Saco,Revestimiento impermeable y flexible para SATE.,EN 998-1
Revestimientos,Placa de Fibrocemento Exterior,Euronit,"28,00 €",m2,12 mm,Panel,Placa resistente a intemperie para fachada ventilada.,EN 12467
Revestimientos,Mortero Monocapa Weberpral,Weber Saint-Gobain,"22,00 €",m2,15 mm,Saco,Revestimiento exterior hidrófugo aplicado en Valencia.,EN 998-1
Revestimientos,Pavimento Cerámico Antideslizante,Porcelanosa (Castellón),"25,00 €",m2,10 mm,Baldosa,Acabado de suelo de alta resistencia.,CTE DB-SUA
Acabado Interior,Placa Yeso Laminado (PYL) 15mm,Knauf (Dist. Valencia),"11,20 €",m2,15 mm,250x120 cm,Acabado liso interior. Distribuidor Valencia.,EN 520
Acabado Interior,Enlucido de Yeso Manual,Yesos Ibéricos (Valencia),"7,00 €",m2,15 mm,Saco,Yeso tradicional de empresa valenciana.,EN 13279
Acabado Interior,Knauf Diamant Resistente,Knauf (Dist. Valencia),"16,50 €",m2,15 mm,250x120 cm,PYL de alta resistencia para tabiquería.,EN 520
Mortero Técnico,Mortero Adhesivo SATE,Weber Saint-Gobain,"9,50 €",m2,5 mm,Saco,Adhesivo y regularizador para SATE.,ETAG 004
Mortero Técnico,Mortero Autonivelante Suelos,Weber Saint-Gobain,"14,00 €",m2,40 mm,Saco,Capa de compresión para suelos flotantes.,EN 13813
Mortero Técnico,weberep Neogel Reparación,Weber Saint-Gobain,"25,00 €",m2,20 mm,Saco,Mortero tixotrópico de fraguado rápido.,EN 1504
Carpintería,Ventana Aluminio RPT Technal,Technal (Dist. Valencia),"180,00 €",m2,70 mm,Variable,Carpintería aluminio con rotura de puente térmico.,CTE DB-HE
Carpintería,Ventana Aluminio Cortizo COR-80,Cortizo (Dist. Valencia),"195,00 €",m2,80 mm,Variable,Sistema de alta prestación con triple vidrio.,CTE DB-HE`;
