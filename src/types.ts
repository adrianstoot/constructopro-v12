export interface Material {
  id: string;
  Categoria: string;
  Nombre: string;
  Empresa: string;
  EspesorRaw: string;
  EspesorVirtualMM: number;
  PrecioNum: number;
  lambda: number;
  density: number;
  color: string;
  icon: string;
  type: string;
  textureClass: string;
  textureId?: string;
  image?: string;
}

export interface Layer extends Material {
  instanceId: string;
}

export interface ConstructionSystem {
  name: string;
  description: string;
  allowedTypes: string[];
  requiredLayers: string[];
  requiredOrder: string[];
  normRef: string;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  systemKey: string;
  requiredOrder: string[];
  xpReward: number;
  badge: string;
  badgeIcon: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto';
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: number;
}

export interface GamificationState {
  xp: number;
  level: number;
  levelName: string;
  completedMissions: string[];
  badges: Badge[];
  streak: number;
  totalConfigurations: number;
}

export interface AppState {
  catalog: Material[];
  layers: Layer[];
  selectedId: string | null;
  searchTerm: string;
  activeSystem: string;
  area: number;
  isCertified: boolean;
  isEngineOnline: boolean;
  uValue: number;
  mass: number;
  pem: number;
  gamification: GamificationState;
  normativeErrors: string[];
  normativeScore: number;
}
