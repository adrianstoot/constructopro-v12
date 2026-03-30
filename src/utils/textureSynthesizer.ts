import * as THREE from 'three';
import { MathEngine } from './mathEngine';

export class TextureSynthesizer {
  private cache: Map<string, { map: THREE.CanvasTexture, normalMap: THREE.CanvasTexture }>;
  private size: number;

  constructor() {
    this.cache = new Map();
    this.size = 512;
  }

  getPBRMaps(type: string, hexColor: string) {
    const cacheKey = `${type}_${hexColor}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey)!;

    const cvsC = document.createElement('canvas');
    const cvsH = document.createElement('canvas');
    cvsC.width = cvsH.width = this.size;
    cvsC.height = cvsH.height = this.size;

    const ctxC = cvsC.getContext('2d')!;
    const ctxH = cvsH.getContext('2d')!;

    ctxC.fillStyle = hexColor;
    ctxC.fillRect(0, 0, this.size, this.size);
    ctxH.fillStyle = '#808080';
    ctxH.fillRect(0, 0, this.size, this.size);

    if (type === 'brick') {
      const bW = 128, bH = 40, m = 6;
      ctxC.fillStyle = '#94a3b8';
      ctxC.fillRect(0, 0, this.size, this.size);
      ctxH.fillStyle = '#101010';
      ctxH.fillRect(0, 0, this.size, this.size);

      for (let y = 0; y < this.size; y += bH) {
        const off = (y / bH) % 2 === 0 ? 0 : bW / 2;
        for (let x = -bW; x < this.size; x += bW) {
          ctxC.fillStyle = MathEngine.shiftColor(hexColor, (Math.random() - 0.5) * 40);
          ctxC.fillRect(x + off + m, y + m, bW - m, bH - m);
          ctxH.fillStyle = '#ffffff';
          ctxH.fillRect(x + off + m + 2, y + m + 2, bW - m - 4, bH - m - 4);
          ctxH.strokeStyle = '#aaaaaa';
          ctxH.lineWidth = 2;
          ctxH.strokeRect(x + off + m + 1, y + m + 1, bW - m - 2, bH - m - 2);
        }
      }
      MathEngine.applyNoise(ctxC, this.size, this.size, 0.05, '', 0.1);
    } else if (type === 'concrete') {
      for (let i = 0; i < 30000; i++) {
        const px = Math.random() * this.size;
        const py = Math.random() * this.size;
        const s = Math.random() * 3;
        const h = Math.random() > 0.5;
        ctxC.fillStyle = h ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
        ctxC.fillRect(px, py, s, s);
        ctxH.fillStyle = h ? '#404040' : '#c0c0c0';
        ctxH.fillRect(px, py, s, s);
      }
    } else if (type === 'plaster') {
      MathEngine.applyNoise(ctxC, this.size, this.size, 0.05, '', 0.03);
      for (let i = 0; i < 10000; i++) {
        ctxH.fillStyle = Math.random() > 0.5 ? '#828282' : '#7e7e7e';
        ctxH.fillRect(Math.random() * this.size, Math.random() * this.size, 1, 1);
      }
    } else if (type === 'insulation') {
      MathEngine.applyNoise(ctxC, this.size, this.size, 0.2, hexColor, 0.1);
      ctxH.fillStyle = '#303030';
      ctxH.fillRect(0, 0, this.size, this.size);
      for (let i = 0; i < 4000; i++) {
        ctxC.strokeStyle = MathEngine.shiftColor(hexColor, (Math.random() - 0.5) * 60);
        ctxH.strokeStyle = Math.random() > 0.4 ? '#ffffff' : '#606060';
        ctxC.lineWidth = ctxH.lineWidth = Math.random() * 4 + 1;
        const sx = Math.random() * this.size;
        const sy = Math.random() * this.size;
        const cx = sx + (Math.random() - 0.5) * 120;
        const cy = sy + (Math.random() - 0.5) * 120;
        ctxC.beginPath();
        ctxC.moveTo(sx, sy);
        ctxC.quadraticCurveTo(cx, cy, cx + 20, cy + 20);
        ctxC.stroke();
        ctxH.beginPath();
        ctxH.moveTo(sx, sy);
        ctxH.quadraticCurveTo(cx, cy, cx + 20, cy + 20);
        ctxH.stroke();
      }
    } else if (type === 'foam') {
      for (let i = 0; i < 30000; i++) {
        const px = Math.random() * this.size;
        const py = Math.random() * this.size;
        const r = Math.random() * 2 + 0.5;
        ctxC.fillStyle = MathEngine.shiftColor(hexColor, (Math.random() - 0.5) * 20);
        ctxC.beginPath();
        ctxC.arc(px, py, r, 0, Math.PI * 2);
        ctxC.fill();
        ctxH.fillStyle = Math.random() > 0.5 ? '#909090' : '#707070';
        ctxH.beginPath();
        ctxH.arc(px, py, r, 0, Math.PI * 2);
        ctxH.fill();
      }
    } else if (type === 'waterproof') {
      for (let i = 0; i < 40000; i++) {
        ctxH.fillStyle = Math.random() > 0.5 ? '#888888' : '#787878';
        ctxH.fillRect(Math.random() * this.size, Math.random() * this.size, 1.5, 1.5);
      }
    }

    const map = new THREE.CanvasTexture(cvsC);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;

    const normalMap = new THREE.CanvasTexture(MathEngine.generateNormalMap(cvsH));
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.anisotropy = 4;

    const data = { map, normalMap };
    this.cache.set(cacheKey, data);
    return data;
  }
}

export const PBRGenerator = new TextureSynthesizer();
