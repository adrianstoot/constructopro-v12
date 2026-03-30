import { ConstructionSystem, Mission, ExamChallenge } from '../types';

// Texture mapping: textureId → photorealistic PNG path
export const TEXTURE_MAP: Record<string, string> = {
  'brick-gero': '/texturas/brick_gero_real.png',
  'brick-hueco': '/texturas/brick_hueco_real.png',
  'brick-caravista': '/texturas/brick_caravista_real.png',
  'termoarcilla': '/texturas/termoarcilla_real.png',
  'xps-rigido': '/texturas/xps_insulation_real.png',
  'eps-sate': '/texturas/eps_insulation_real.png',
  'lana-roca': '/texturas/lana_roca_real.png',
  'isover-arena': '/texturas/lana_vidrio_real.png',
  'poliuretano': '/texturas/poliuretano_real.png',
  'lamina-asfaltica': '/texturas/lamina_asfaltica.svg',
  'weberdry': '/texturas/lamina_asfaltica.svg',
  'barrera-vapor': '/texturas/barrera_vapor.svg',
  'danosa': '/texturas/lamina_asfaltica.svg',
  'bentonita': '/texturas/lamina_asfaltica.svg',
  'mortero-acrilico': '/texturas/monocapa_real.png',
  'monocapa': '/texturas/monocapa_real.png',
  'fibrocemento': '/texturas/hormigon_real.png',
  'pavimento-ceramico': '/texturas/gres_tile_real.png',
  'grava': '/texturas/grava.svg',
  'revestimiento-generico': '/texturas/monocapa_real.png',
  'teja-ceramica': '/texturas/teja_ceramica_real.png',
  'onduline': '/texturas/onduline.svg',
  'pyl-15': '/texturas/yeso_plaster_real.png',
  'enlucido-yeso': '/texturas/yeso_plaster_real.png',
  'knauf-pyl': '/texturas/yeso_plaster_real.png',
  'bloque-hormigon': '/texturas/hormigon_real.png',
  'forjado': '/texturas/hormigon_real.png',
  'brick-generic': '/texturas/brick_gero_real.png',
  'weberep': '/texturas/hormigon_real.png',
  'adhesivo-sate': '/texturas/hormigon_real.png',
  'autonivelante': '/texturas/hormigon_real.png',
  'aluminio': '/texturas/aluminio.svg',
};

export const PHYSICS_DICTIONARY = [
  // ═══ AISLAMIENTOS ═══
  { keywords: ['lana de roca', 'lana', 'mineral', 'rockwool'], lambda: 0.035, density: 40, color: '#facc15', icon: 'Layers', type: 'Aislante Térmico', textureClass: 'insulation', textureId: 'lana-roca', image: '/texturas/lana_roca_real.png', co2PerKg: 1.05, mu: 1, budgetChapter: 'NAI', iveCode: 'ENAL.1ab' },
  { keywords: ['xps', 'poliestireno extruido', 'panel xps'], lambda: 0.034, density: 35, color: '#67e8f9', icon: 'Box', type: 'Aislante Térmico', textureClass: 'foam', textureId: 'xps-rigido', image: '/texturas/xps_insulation_real.png', co2PerKg: 3.4, mu: 150, budgetChapter: 'NAI', iveCode: 'ENAL.2ba' },
  { keywords: ['eps', 'poliestireno expandido', 'sate eps'], lambda: 0.038, density: 20, color: '#e0f2fe', icon: 'Box', type: 'Aislante Térmico', textureClass: 'foam', textureId: 'eps-sate', image: '/texturas/eps_insulation_real.png', co2PerKg: 3.3, mu: 60, budgetChapter: 'NAI', iveCode: 'ENAL.2aa' },
  { keywords: ['poliuretano', 'pur', 'espuma'], lambda: 0.028, density: 35, color: '#bae6fd', icon: 'Box', type: 'Aislante Térmico', textureClass: 'foam', textureId: 'poliuretano', image: '/texturas/poliuretano_real.png', co2PerKg: 4.2, mu: 60, budgetChapter: 'NAI', iveCode: 'ENAL.3aa' },
  { keywords: ['isover', 'ibr', 'arena'], lambda: 0.036, density: 18, color: '#fde047', icon: 'Layers', type: 'Aislante Térmico', textureClass: 'insulation', textureId: 'isover-arena', image: '/texturas/lana_vidrio_real.png', co2PerKg: 0.85, mu: 1, budgetChapter: 'NAI', iveCode: 'ENAL.1ba' },
  // ═══ LADRILLOS / FÁBRICA ═══
  { keywords: ['ladrillo perforado', 'gero', 'portante'], lambda: 0.50, density: 1800, color: '#c2410c', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'brick', textureId: 'brick-gero', image: '/texturas/brick_gero_real.png', co2PerKg: 0.23, mu: 10, budgetChapter: 'EFB', iveCode: 'EFFC.1a' },
  { keywords: ['ladrillo hueco', 'lhd', 'tabique'], lambda: 0.44, density: 1200, color: '#ea580c', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'brick', textureId: 'brick-hueco', image: '/texturas/brick_hueco_real.png', co2PerKg: 0.21, mu: 10, budgetChapter: 'EFB', iveCode: 'EFFC.2a' },
  { keywords: ['cara vista', 'caravista', 'klinker'], lambda: 0.85, density: 2000, color: '#9a3412', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'brick', textureId: 'brick-caravista', image: '/texturas/brick_caravista_real.png', co2PerKg: 0.27, mu: 15, budgetChapter: 'EFB', iveCode: 'EFFC.3a' },
  { keywords: ['termoarcilla', 'aligerado'], lambda: 0.28, density: 900, color: '#d97706', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'brick', textureId: 'termoarcilla', image: '/texturas/termoarcilla_real.png', co2PerKg: 0.19, mu: 10, budgetChapter: 'EFB', iveCode: 'EFFC.4a' },
  { keywords: ['bloque hormig', 'bloque de hormigón', 'bloque estructural'], lambda: 1.04, density: 2100, color: '#6b7280', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'concrete', textureId: 'bloque-hormigon', image: '/texturas/hormigon_real.png', co2PerKg: 0.12, mu: 100, budgetChapter: 'EFB', iveCode: 'EFFC.5a' },
  { keywords: ['forjado', 'estructura', 'hormigón armado'], lambda: 1.63, density: 2400, color: '#4b5563', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'concrete', textureId: 'forjado', image: '/texturas/hormigon_real.png', co2PerKg: 0.13, mu: 80, budgetChapter: 'EHE', iveCode: 'EEHP.1a' },
  { keywords: ['cerámic', 'fábrica'], lambda: 0.50, density: 1800, color: '#c2410c', icon: 'BrickWall', type: 'Hoja Principal', textureClass: 'brick', textureId: 'brick-generic', image: '/texturas/brick_gero_real.png', co2PerKg: 0.23, mu: 10, budgetChapter: 'EFB', iveCode: 'EFFC.1a' },
  // ═══ ACABADOS INTERIORES ═══
  { keywords: ['yeso', 'pyl', 'placa de yeso', 'placa yeso'], lambda: 0.25, density: 800, color: '#f8fafc', icon: 'Square', type: 'Acabado Interior', textureClass: 'plaster', textureId: 'pyl-15', image: '/texturas/yeso_plaster_real.png', co2PerKg: 0.12, mu: 8, budgetChapter: 'RPG', iveCode: 'ERPP.1a' },
  { keywords: ['enlucido', 'yeso manual', 'acabado'], lambda: 0.30, density: 1000, color: '#f1f5f9', icon: 'Square', type: 'Acabado Interior', textureClass: 'plaster', textureId: 'enlucido-yeso', image: '/texturas/yeso_plaster_real.png', co2PerKg: 0.14, mu: 6, budgetChapter: 'RPG', iveCode: 'ERPP.2a' },
  { keywords: ['knauf'], lambda: 0.25, density: 800, color: '#e2e8f0', icon: 'Square', type: 'Acabado Interior', textureClass: 'plaster', textureId: 'knauf-pyl', image: '/texturas/yeso_plaster_real.png', co2PerKg: 0.12, mu: 8, budgetChapter: 'RPG', iveCode: 'ERPP.1b' },
  // ═══ BARRERAS DE AGUA / VAPOR ═══
  { keywords: ['impermeab', 'asfáltic', 'lámina', 'bituminosa'], lambda: 0.20, density: 1100, color: '#27272a', icon: 'Droplets', type: 'Barrera de Agua', textureClass: 'waterproof', textureId: 'lamina-asfaltica', image: '/texturas/lamina_asfaltica.svg', co2PerKg: 0.9, mu: 50000, budgetChapter: 'QAN', iveCode: 'ENHI.1a' },
  { keywords: ['weberdry', 'evac', 'imperbanda', 'termoplástic'], lambda: 0.20, density: 1100, color: '#3f3f46', icon: 'Droplets', type: 'Barrera de Agua', textureClass: 'waterproof', textureId: 'weberdry', image: '/texturas/lamina_asfaltica.svg', co2PerKg: 1.1, mu: 100000, budgetChapter: 'QAN', iveCode: 'ENHI.2a' },
  { keywords: ['vapor', 'barrera de vapor', 'pe 0.2', 'pe'], lambda: 0.33, density: 950, color: '#52525b', icon: 'Droplets', type: 'Barrera de Agua', textureClass: 'waterproof', textureId: 'barrera-vapor', image: '/texturas/barrera_vapor.svg', co2PerKg: 2.0, mu: 100000, budgetChapter: 'QAN', iveCode: 'ENHI.3a' },
  { keywords: ['danosa', 'esterdan'], lambda: 0.19, density: 1050, color: '#18181b', icon: 'Droplets', type: 'Barrera de Agua', textureClass: 'waterproof', textureId: 'danosa', image: '/texturas/lamina_asfaltica.svg', co2PerKg: 0.95, mu: 50000, budgetChapter: 'QAN', iveCode: 'ENHI.1b' },
  { keywords: ['bentonita'], lambda: 0.60, density: 2000, color: '#44403c', icon: 'Droplets', type: 'Barrera de Agua', textureClass: 'waterproof', textureId: 'bentonita', image: '/texturas/lamina_asfaltica.svg', co2PerKg: 0.5, mu: 100000, budgetChapter: 'QAN', iveCode: 'ENHI.4a' },
  // ═══ REVESTIMIENTOS ═══
  { keywords: ['mortero acrílico', 'acrílico', 'sate'], lambda: 0.70, density: 1600, color: '#cbd5e1', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'mortero-acrilico', image: '/texturas/monocapa_real.png', co2PerKg: 0.18, mu: 20, budgetChapter: 'RRY', iveCode: 'ERPE.1a' },
  { keywords: ['monocapa', 'weberpral'], lambda: 0.80, density: 1700, color: '#94a3b8', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'monocapa', image: '/texturas/monocapa_real.png', co2PerKg: 0.20, mu: 15, budgetChapter: 'RRY', iveCode: 'ERPE.2a' },
  { keywords: ['fibrocemento', 'euronit', 'placa'], lambda: 0.35, density: 1700, color: '#64748b', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'fibrocemento', image: '/texturas/hormigon_real.png', co2PerKg: 0.55, mu: 40, budgetChapter: 'RRY', iveCode: 'ERPE.3a' },
  { keywords: ['pavimento', 'cerámico', 'gres', 'porcelanosa', 'baldosa'], lambda: 1.00, density: 2300, color: '#78716c', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'pavimento-ceramico', image: '/texturas/gres_tile_real.png', co2PerKg: 0.70, mu: 200, budgetChapter: 'RSG', iveCode: 'ERSC.1a' },
  { keywords: ['grava', 'árido', 'protección'], lambda: 2.00, density: 1800, color: '#a8a29e', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'grava', image: '/texturas/grava.svg', co2PerKg: 0.005, mu: 50, budgetChapter: 'RSG', iveCode: 'ERSC.2a' },
  { keywords: ['revest', 'mortero', 'hormig', 'cemento'], lambda: 0.80, density: 1600, color: '#94a3b8', icon: 'Hammer', type: 'Revestimiento', textureClass: 'concrete', textureId: 'revestimiento-generico', image: '/texturas/monocapa_real.png', co2PerKg: 0.18, mu: 15, budgetChapter: 'RRY', iveCode: 'ERPE.1b' },
  // ═══ CUBIERTAS ═══
  { keywords: ['teja', 'innova', 'planum', 'escandella', 'cubierta'], lambda: 1.00, density: 2000, color: '#dc2626', icon: 'Home', type: 'Cubierta', textureClass: 'brick', textureId: 'teja-ceramica', image: '/texturas/teja_ceramica_real.png', co2PerKg: 0.24, mu: 30, budgetChapter: 'QTT', iveCode: 'EQTT.1a' },
  { keywords: ['onduline', 'bajo teja'], lambda: 0.15, density: 950, color: '#b91c1c', icon: 'Home', type: 'Cubierta', textureClass: 'waterproof', textureId: 'onduline', image: '/texturas/onduline.svg', co2PerKg: 1.5, mu: 200, budgetChapter: 'QTT', iveCode: 'EQTT.2a' },
  // ═══ MORTEROS TÉCNICOS ═══
  { keywords: ['reparación', 'weberep', 'resina'], lambda: 1.00, density: 2100, color: '#64748b', icon: 'Wrench', type: 'Mortero Técnico', textureClass: 'concrete', textureId: 'weberep', image: '/texturas/hormigon_real.png', co2PerKg: 0.22, mu: 20, budgetChapter: 'RRY', iveCode: 'ERPE.4a' },
  { keywords: ['adhesivo', 'mortero adhesivo'], lambda: 0.90, density: 1800, color: '#94a3b8', icon: 'Wrench', type: 'Mortero Técnico', textureClass: 'concrete', textureId: 'adhesivo-sate', image: '/texturas/hormigon_real.png', co2PerKg: 0.18, mu: 20, budgetChapter: 'RRY', iveCode: 'ERPE.5a' },
  { keywords: ['autonivelante', 'nivelante'], lambda: 1.40, density: 2000, color: '#475569', icon: 'Wrench', type: 'Mortero Técnico', textureClass: 'concrete', textureId: 'autonivelante', image: '/texturas/hormigon_real.png', co2PerKg: 0.15, mu: 30, budgetChapter: 'RSG', iveCode: 'ERSC.3a' },
  // ═══ CARPINTERÍAS ═══
  { keywords: ['aluminio', 'technal', 'cortizo', 'ventana'], lambda: 160.0, density: 2700, color: '#9ca3af', icon: 'Square', type: 'Carpintería', textureClass: 'concrete', textureId: 'aluminio', image: '/texturas/aluminio.svg', co2PerKg: 8.24, mu: 100000, budgetChapter: 'LCA', iveCode: 'EFCA.1a' },
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
  { id: 'mission_sate', name: 'Maestro SATE', description: 'Configura una fachada SATE perfecta con todos los materiales en el orden correcto según CTE DB-HE.', systemKey: 'SATE', requiredOrder: ['Revestimiento', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior'], xpReward: 200, badge: 'sate_master', badgeIcon: '🏗️', difficulty: 'Principiante' },
  { id: 'mission_ventilada', name: 'Experto Fachada Ventilada', description: 'Monta una fachada ventilada con cámara de aire según CTE DB-HS.', systemKey: 'VENTILADA', requiredOrder: ['Revestimiento', 'Aislante Térmico', 'Hoja Principal', 'Acabado Interior'], xpReward: 300, badge: 'ventilada_expert', badgeIcon: '🌬️', difficulty: 'Intermedio' },
  { id: 'mission_particion', name: 'Aislamiento Acústico', description: 'Construye una partición interior que cumpla CTE DB-HR.', systemKey: 'PARTICION_INT', requiredOrder: ['Acabado Interior', 'Hoja Principal', 'Acabado Interior'], xpReward: 250, badge: 'acoustic_pro', badgeIcon: '🔇', difficulty: 'Intermedio' },
  { id: 'mission_solera', name: 'Solera Perfecta', description: 'Configura una solera flotante completa para DB-HR y DB-HE.', systemKey: 'SOLERA', requiredOrder: ['Revestimiento', 'Mortero Técnico', 'Aislante Térmico', 'Hoja Principal'], xpReward: 350, badge: 'floor_master', badgeIcon: '🏠', difficulty: 'Avanzado' },
  { id: 'mission_cubierta', name: 'Cubierta Invertida PRO', description: 'Diseña una cubierta invertida profesional con XPS.', systemKey: 'CUBIERTA_INV', requiredOrder: ['Revestimiento', 'Aislante Térmico', 'Barrera de Agua', 'Hoja Principal'], xpReward: 400, badge: 'roof_pro', badgeIcon: '🏢', difficulty: 'Avanzado' },
  { id: 'mission_energy_a', name: 'Calificación A', description: 'Consigue U ≤ 0.15 W/m²K.', systemKey: '', requiredOrder: [], xpReward: 500, badge: 'energy_a', badgeIcon: '⚡', difficulty: 'Experto' },
  { id: 'mission_cubierta_trad', name: 'Cubierta Tradicional', description: 'Configura una cubierta convencional con teja cerámica.', systemKey: 'CUBIERTA_TRAD', requiredOrder: ['Cubierta', 'Barrera de Agua', 'Aislante Térmico', 'Hoja Principal'], xpReward: 350, badge: 'trad_roof', badgeIcon: '🏡', difficulty: 'Avanzado' },
  // v13 missions
  { id: 'mission_eco', name: 'Constructor Sostenible', description: 'Diseña un cerramiento con huella de carbono < 25 kgCO₂/m².', systemKey: '', requiredOrder: [], xpReward: 450, badge: 'eco_builder', badgeIcon: '🌱', difficulty: 'Experto' },
  { id: 'mission_budget', name: 'Presupuesto Perfecto', description: 'Genera un presupuesto completo con PEM < 80 €/m² y cumplimiento CTE.', systemKey: '', requiredOrder: [], xpReward: 300, badge: 'budget_pro', badgeIcon: '💰', difficulty: 'Intermedio' },
];

export const EXAM_CHALLENGES: ExamChallenge[] = [
  { id: 'exam_sate_basico', title: 'Fachada SATE Básica', description: 'Diseña un sistema SATE que cumpla CTE DB-HE con U ≤ 0.35 W/m²K para zona climática D.', systemKey: 'SATE', targetU: 0.35, timeMinutes: 30, difficulty: 'Principiante', xpReward: 150, rubric: [{ criterion: 'Orden correcto EXT→INT', maxPoints: 25 }, { criterion: 'U ≤ 0.35 W/m²K', maxPoints: 25 }, { criterion: 'Todos los tipos requeridos', maxPoints: 25 }, { criterion: 'Materiales compatibles', maxPoints: 25 }] },
  { id: 'exam_sate_avanzado', title: 'SATE Alto Rendimiento', description: 'Diseña un SATE con U ≤ 0.20 W/m²K y huella de carbono < 30 kgCO₂/m².', systemKey: 'SATE', targetU: 0.20, timeMinutes: 45, difficulty: 'Avanzado', xpReward: 350, rubric: [{ criterion: 'U ≤ 0.20', maxPoints: 30 }, { criterion: 'CO₂ < 30', maxPoints: 20 }, { criterion: 'Orden normativo', maxPoints: 25 }, { criterion: 'Coste razonable', maxPoints: 25 }] },
  { id: 'exam_ventilada', title: 'Fachada Ventilada Completa', description: 'Monta una fachada ventilada con cámara, aislamiento y hoja portante.', systemKey: 'VENTILADA', targetU: 0.30, timeMinutes: 40, difficulty: 'Intermedio', xpReward: 250, rubric: [{ criterion: 'Incluye cámara de aire', maxPoints: 20 }, { criterion: 'U ≤ 0.30', maxPoints: 30 }, { criterion: 'Orden correcto', maxPoints: 25 }, { criterion: 'Tipos compatibles', maxPoints: 25 }] },
  { id: 'exam_cubierta_inv', title: 'Cubierta Invertida', description: 'Diseña una cubierta invertida transitable con XPS sobre impermeabilización.', systemKey: 'CUBIERTA_INV', targetU: 0.30, timeMinutes: 35, difficulty: 'Intermedio', xpReward: 250, rubric: [{ criterion: 'XPS sobre impermeab.', maxPoints: 30 }, { criterion: 'U ≤ 0.30', maxPoints: 25 }, { criterion: 'Grava protección', maxPoints: 20 }, { criterion: 'Forjado base', maxPoints: 25 }] },
  { id: 'exam_cubierta_trad', title: 'Cubierta de Teja', description: 'Configura una cubierta con teja cerámica, impermeabilización y aislamiento según CTE.', systemKey: 'CUBIERTA_TRAD', targetU: 0.35, timeMinutes: 35, difficulty: 'Intermedio', xpReward: 250, rubric: [{ criterion: 'Teja cerámica exterior', maxPoints: 25 }, { criterion: 'U ≤ 0.35', maxPoints: 25 }, { criterion: 'Impermeabilización', maxPoints: 25 }, { criterion: 'Orden normativo', maxPoints: 25 }] },
  { id: 'exam_particion_acustica', title: 'Partición Acústica', description: 'Construye un tabique con aislamiento acústico según CTE DB-HR.', systemKey: 'PARTICION_INT', targetU: 0.80, timeMinutes: 25, difficulty: 'Principiante', xpReward: 150, rubric: [{ criterion: 'Lana roca/vidrio', maxPoints: 30 }, { criterion: 'Doble acabado', maxPoints: 25 }, { criterion: 'Espesor adecuado', maxPoints: 25 }, { criterion: 'Orden simétrico', maxPoints: 20 }] },
  { id: 'exam_solera', title: 'Solera Flotante', description: 'Diseña una solera flotante con aislamiento bajo pavimento.', systemKey: 'SOLERA', targetU: 0.40, timeMinutes: 30, difficulty: 'Intermedio', xpReward: 200, rubric: [{ criterion: 'Pavimento superior', maxPoints: 25 }, { criterion: 'Aislante continuo', maxPoints: 25 }, { criterion: 'Base estructural', maxPoints: 25 }, { criterion: 'Impermeabilización', maxPoints: 25 }] },
  { id: 'exam_eficiencia_a', title: '¡Calificación Energética A!', description: 'Logra U ≤ 0.15 W/m²K en cualquier sistema.', systemKey: '', targetU: 0.15, timeMinutes: 60, difficulty: 'Experto', xpReward: 500, rubric: [{ criterion: 'U ≤ 0.15', maxPoints: 40 }, { criterion: 'Cumplimiento normativo', maxPoints: 20 }, { criterion: 'PEM razonable', maxPoints: 20 }, { criterion: 'Huella carbono', maxPoints: 20 }] },
  { id: 'exam_tradicional', title: 'Fachada Tradicional', description: 'Diseña una fachada con aislamiento interior y barrera de vapor.', systemKey: 'TRADICIONAL', targetU: 0.35, timeMinutes: 40, difficulty: 'Intermedio', xpReward: 250, rubric: [{ criterion: 'Barrera de vapor', maxPoints: 25 }, { criterion: 'U ≤ 0.35', maxPoints: 25 }, { criterion: 'Orden correcto', maxPoints: 25 }, { criterion: 'Tipos válidos', maxPoints: 25 }] },
  { id: 'exam_eco_extremo', title: 'Máxima Sostenibilidad', description: 'Cerramiento con CO₂ < 15 kgCO₂/m² y U ≤ 0.30 W/m²K.', systemKey: '', targetU: 0.30, timeMinutes: 60, difficulty: 'Experto', xpReward: 600, rubric: [{ criterion: 'CO₂ < 15', maxPoints: 35 }, { criterion: 'U ≤ 0.30', maxPoints: 25 }, { criterion: 'Materiales naturales', maxPoints: 20 }, { criterion: 'Cumplimiento CTE', maxPoints: 20 }] },
];

// Budget chapter names
export const BUDGET_CHAPTERS: Record<string, string> = {
  'EFB': 'Cap. 05 — Albañilería y Fábricas',
  'EHE': 'Cap. 03 — Estructuras de Hormigón',
  'NAI': 'Cap. 06 — Aislamiento e Impermeabilización',
  'QAN': 'Cap. 06 — Aislamiento e Impermeabilización',
  'QTT': 'Cap. 07 — Cubiertas',
  'RRY': 'Cap. 08 — Revestimientos',
  'RPG': 'Cap. 09 — Acabados Interiores',
  'RSG': 'Cap. 10 — Pavimentos',
  'LCA': 'Cap. 12 — Carpintería',
};

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

// v13: Glaser condensation calculator
export const calculateGlaser = (layers: { name: string; thicknessMM: number; lambda: number; mu: number }[], tExt = 7, hrExt = 65, tInt = 20, hrInt = 55) => {
  // Saturated vapor pressure (Magnus formula)
  const pSat = (t: number) => 610.5 * Math.exp((17.269 * t) / (237.29 + t));
  
  const rSe = 0.04; // exterior surface resistance
  const rSi = 0.13; // interior surface resistance
  
  // Calculate total R
  let rTotal = rSe + rSi;
  layers.forEach(l => { if (l.lambda > 0) rTotal += (l.thicknessMM / 1000) / l.lambda; });
  
  // Temperature distribution
  const deltaT = tInt - tExt;
  const points: { position: number; layerName: string; temperature: number; pSatVal: number; pVaporVal: number; condensation: boolean }[] = [];
  
  let rCumulative = rSe;
  let posMM = 0;
  
  // Exterior surface
  const tSe = tExt + (rSe / rTotal) * deltaT;
  points.push({ position: 0, layerName: 'Ext', temperature: tSe, pSatVal: pSat(tSe), pVaporVal: 0, condensation: false });
  
  // Through each layer
  layers.forEach(l => {
    const rLayer = l.lambda > 0 ? (l.thicknessMM / 1000) / l.lambda : 0;
    rCumulative += rLayer;
    posMM += l.thicknessMM;
    const tLayer = tExt + (rCumulative / rTotal) * deltaT;
    points.push({ position: posMM, layerName: l.name, temperature: tLayer, pSatVal: pSat(tLayer), pVaporVal: 0, condensation: false });
  });
  
  // Interior surface
  points.push({ position: posMM, layerName: 'Int', temperature: tInt - (rSi / rTotal) * deltaT, pSatVal: 0, pVaporVal: 0, condensation: false });
  points[points.length - 1].pSatVal = pSat(points[points.length - 1].temperature);
  
  // Vapor pressure distribution (linear through sd values)
  const pExt = pSat(tExt) * (hrExt / 100);
  const pInt = pSat(tInt) * (hrInt / 100);
  
  let sdTotal = 0;
  layers.forEach(l => { sdTotal += (l.thicknessMM / 1000) * l.mu; });
  
  let sdCum = 0;
  points[0].pVaporVal = pExt;
  for (let i = 1; i < points.length - 1; i++) {
    const layerIdx = i - 1;
    if (layerIdx < layers.length) {
      sdCum += (layers[layerIdx].thicknessMM / 1000) * layers[layerIdx].mu;
    }
    points[i].pVaporVal = sdTotal > 0 ? pExt + (sdCum / sdTotal) * (pInt - pExt) : pExt;
    points[i].condensation = points[i].pVaporVal > points[i].pSatVal;
  }
  points[points.length - 1].pVaporVal = pInt;
  points[points.length - 1].condensation = points[points.length - 1].pVaporVal > points[points.length - 1].pSatVal;
  
  return points;
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
