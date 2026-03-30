export class MathEngine {
  static applyNoise(ctx: CanvasRenderingContext2D, width: number, height: number, density: number, colorHex: string, opacityScale: number) {
    const numDots = Math.floor((width * height) * density);
    for (let i = 0; i < numDots; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(0,0,0,${opacityScale})` : `rgba(255,255,255,${opacityScale})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 2 + 0.5, Math.random() * 2 + 0.5);
    }
  }

  static shiftColor(hex: string, amount: number) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    let r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
    let g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
    let b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  static generateNormalMap(heightCanvas: HTMLCanvasElement) {
    const w = heightCanvas.width;
    const h = heightCanvas.height;
    const ctxH = heightCanvas.getContext('2d');
    if (!ctxH) return heightCanvas;

    const normalCanvas = document.createElement('canvas');
    normalCanvas.width = w;
    normalCanvas.height = h;

    const ctxN = normalCanvas.getContext('2d');
    if (!ctxN || w === 0) return normalCanvas;

    try {
      const data = ctxH.getImageData(0, 0, w, h).data;
      const ndata = ctxN.createImageData(w, h).data;

      const getH = (x: number, y: number) => data[(Math.max(0, Math.min(y, h - 1)) * w + Math.max(0, Math.min(x, w - 1))) * 4] / 255.0;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dx = (getH(x - 1, y) - getH(x + 1, y)) * 3.5;
          const dy = (getH(x, y + 1) - getH(x, y - 1)) * 3.5;
          const length = Math.sqrt(dx * dx + dy * dy + 1.0);
          const i = (y * w + x) * 4;
          ndata[i] = Math.round(((dx / length) + 1.0) * 127.5);
          ndata[i + 1] = Math.round(((dy / length) + 1.0) * 127.5);
          ndata[i + 2] = Math.round((1.0 / length) * 255.0);
          ndata[i + 3] = 255;
        }
      }
      ctxN.putImageData(new ImageData(ndata, w, h), 0, 0);
    } catch (e) {
      console.error("Normal map gen error", e);
    }
    return normalCanvas;
  }
}
