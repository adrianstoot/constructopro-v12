import { AppState } from '../types';
import { CONSTRUCTION_SYSTEMS } from './config';

export const exportPDF = (state: AppState, canvas2D: HTMLCanvasElement | null, canvas3D: HTMLCanvasElement | null) => {
  if (state.layers.length === 0) {
    alert("Debe añadir capas al sistema para generar la memoria.");
    return;
  }

  // Force 3D render before capture
  try {
    if ((window as any).__force3DRender) {
      (window as any).__force3DRender();
    }
  } catch (e) {
    console.warn('Force 3D render failed:', e);
  }

  const w = window.open('', '_blank');
  if (!w) {
    alert("Por favor, permita las ventanas emergentes para generar el PDF.");
    return;
  }

  // Capture canvases
  const i2d = canvas2D ? canvas2D.toDataURL("image/png") : '';
  
  let i3d = '';
  if (canvas3D) {
    try {
      // Force one more render
      if ((window as any).__force3DRender) {
        (window as any).__force3DRender();
      }
      // Wait a frame then capture
      i3d = canvas3D.toDataURL("image/png");
    } catch (e) {
      console.warn('3D capture failed:', e);
      // Fallback: try from container
      try {
        const container = document.getElementById('canvas3D-container');
        if (container) {
          const webglCanvas = container.querySelector('canvas');
          if (webglCanvas) {
            i3d = webglCanvas.toDataURL("image/png");
          }
        }
      } catch (e2) {
        console.warn('3D fallback capture failed:', e2);
      }
    }
  }

  const sys = CONSTRUCTION_SYSTEMS[state.activeSystem];

  let r = 0;
  state.layers.forEach(l => {
    if (l.lambda > 0) r += (l.EspesorVirtualMM / 1000) / l.lambda;
  });
  const u = state.layers.length > 0 ? 1 / (0.17 + r) : 0;
  const rTotal = 0.17 + r;
  
  let mass = 0, pem = 0;
  state.layers.forEach(l => {
    pem += l.PrecioNum;
    mass += (l.EspesorVirtualMM / 1000) * l.density;
  });

  const totalMM = state.layers.reduce((a, l) => a + (parseInt(l.EspesorRaw) || l.EspesorVirtualMM), 0);
  const total = (pem * state.area).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const date = new Date().toLocaleDateString('es-ES');
  
  const cumpleCTE = u <= 0.4 
    && state.layers.some(l => l.type === 'Barrera de Agua' || l.type === 'Revestimiento')
    && state.layers.some(l => l.type === 'Hoja Principal');

  const bannerColor = cumpleCTE ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-error-container text-on-error-container';
  const bannerIcon = cumpleCTE ? 'check_circle' : 'warning';
  const bannerText = cumpleCTE ? 'CTE CUMPLE' : 'NO CUMPLE CTE';
  
  // Normative score
  const normScore = state.normativeScore || 0;

  // Energy rating
  const getLabel = () => {
    if (u <= 0.15) return { l: 'A', c: '#16a34a' };
    if (u <= 0.25) return { l: 'B', c: '#22c55e' };
    if (u <= 0.35) return { l: 'C', c: '#84cc16' };
    if (u <= 0.50) return { l: 'D', c: '#eab308' };
    if (u <= 0.70) return { l: 'E', c: '#f97316' };
    if (u <= 1.00) return { l: 'F', c: '#ef4444' };
    return { l: 'G', c: '#dc2626' };
  };
  const energyLabel = getLabel();

  let tableRows = '';
  state.layers.forEach((l, i) => {
    const lR = l.lambda > 0 ? ((l.EspesorVirtualMM / 1000) / l.lambda) : 0;
    const isPrimary = l.type === 'Hoja Principal';
    const bgClass = i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low';
    const posLabel = i === 0 ? '<span style="color:#2563eb;font-weight:bold">EXT</span>' : i === state.layers.length - 1 ? '<span style="color:#7c3aed;font-weight:bold">INT</span>' : `${i + 1}`;
    
    tableRows += `
    <tr class="${bgClass} border-b border-surface-container">
      <td class="px-6 py-4 text-center text-xs">${posLabel}</td>
      <td class="px-6 py-4 font-semibold text-primary">
        <div class="flex flex-col">
          <span>${l.type} — ${l.Nombre}</span>
          <span class="text-[10px] text-secondary font-normal">${l.Empresa}</span>
        </div>
      </td>
      <td class="px-6 py-4">${parseInt(l.EspesorRaw) || l.EspesorVirtualMM}</td>
      <td class="px-6 py-4">${l.lambda > 0 ? l.lambda.toFixed(3) : '--'}</td>
      <td class="px-6 py-4 text-right ${isPrimary ? 'font-bold' : ''}">${lR > 0 ? lR.toFixed(3) : '--'}</td>
    </tr>`;
  });

  const htmlContent = `<!DOCTYPE html>
<html class="light" lang="es">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Reporte Técnico - ${sys.name}</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Work+Sans:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container-highest": "#e1e3e4",
              "primary-fixed-dim": "#abc7ff",
              "on-primary": "#ffffff",
              "error": "#ba1a1a",
              "surface-container-high": "#e7e8e9",
              "on-surface": "#191c1d",
              "surface": "#f8f9fa",
              "primary-container": "#004a99",
              "secondary": "#486176",
              "outline-variant": "#c2c6d3",
              "on-primary-container": "#9bbdff",
              "surface-dim": "#d9dadb",
              "on-error": "#ffffff",
              "surface-bright": "#f8f9fa",
              "inverse-surface": "#2e3132",
              "surface-container": "#edeeef",
              "inverse-primary": "#abc7ff",
              "surface-variant": "#e1e3e4",
              "surface-tint": "#255dad",
              "on-surface-variant": "#424751",
              "surface-container-low": "#f3f4f5",
              "secondary-container": "#cbe6ff",
              "background": "#f8f9fa",
              "primary-fixed": "#d7e2ff",
              "primary": "#00346f",
              "outline": "#737783",
              "surface-container-lowest": "#ffffff",
              "on-secondary-container": "#4e677c",
              "error-container": "#ffdad6",
              "on-error-container": "#93000a"
            },
            fontFamily: {
              "headline": ["Manrope"],
              "body": ["Inter"],
              "label": ["Work Sans"]
            }
          }
        }
      }
    </script>
    <style>
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; vertical-align: middle; }
        .glass-caption { background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(0,0,0,0.05); }
        @media print {
            @page { size: A4 portrait; margin: 10mm; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; padding: 0 !important; margin: 0 !important; background: white; }
            header, nav { display: none !important; }
            main { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
            section { margin-bottom: 20px !important; }
            .gap-6 { gap: 12px !important; }
            .gap-12 { gap: 16px !important; }
            .gap-8 { gap: 12px !important; }
            .mb-8 { margin-bottom: 12px !important; }
            .mb-12 { margin-bottom: 16px !important; }
            .mb-16 { margin-bottom: 16px !important; }
            .mb-20 { margin-bottom: 16px !important; }
            .p-4 { padding: 8px !important; }
            .p-6 { padding: 12px !important; }
            .px-6 { padding-left: 12px !important; padding-right: 12px !important; }
            .py-4 { padding-top: 8px !important; padding-bottom: 8px !important; }
            .text-6xl { font-size: 32px !important; line-height: 1.1 !important; }
            .text-5xl { font-size: 28px !important; line-height: 1.1 !important; }
            .text-4xl { font-size: 24px !important; line-height: 1.1 !important; }
            .text-3xl { font-size: 20px !important; line-height: 1.1 !important; }
            .break-inside-avoid { break-inside: avoid; }
        }
    </style>
</head>
<body class="bg-background text-on-background font-body min-h-screen pb-24">
    <header class="fixed top-0 z-50 flex justify-between items-center px-6 h-16 w-full bg-[#f8f9fa] shadow-[0_4px_24px_rgba(0,52,111,0.04)]">
        <div class="flex items-center gap-4">
            <span class="material-symbols-outlined text-primary">menu</span>
            <h1 class="font-headline text-lg font-bold uppercase tracking-tight text-primary">Reporte Técnico — ConstructoPro v12</h1>
        </div>
        <div class="flex items-center gap-6">
            <span class="font-headline font-extrabold text-primary">${cumpleCTE ? 'CTE CUMPLE' : 'REVISAR CTE'}</span>
        </div>
    </header>

    <main class="pt-24 px-4 md:px-12 max-w-7xl mx-auto">
        <section class="mb-12">
            <div class="flex flex-col md:flex-row justify-between items-end gap-4 border-l-4 border-primary pl-6">
                <div>
                    <span class="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-2 block">Referencia Técnica: ${sys.name.substring(0,3).toUpperCase()}-001 | Normativa: ${sys.normRef || 'CTE'}</span>
                    <h2 class="font-headline text-4xl md:text-6xl font-extrabold text-primary tracking-tighter">${sys.name}</h2>
                    <p class="font-body text-on-surface-variant mt-2 max-w-xl">${sys.description}</p>
                </div>
                <div class="flex flex-col items-end gap-2 mb-1">
                    <div class="flex items-center gap-3 ${bannerColor} px-4 py-2 rounded-full">
                        <span class="material-symbols-outlined text-[18px]">${bannerIcon}</span>
                        <span class="font-label font-semibold text-xs uppercase tracking-widest">${bannerText}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold text-slate-500">Puntuación Normativa:</span>
                        <span class="font-bold text-sm" style="color: ${normScore >= 80 ? '#16a34a' : normScore >= 50 ? '#eab308' : '#ef4444'}">${normScore}%</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-16 break-inside-avoid">
            <div class="flex items-center gap-4 mb-8">
                <h3 class="font-headline text-xl font-bold text-primary uppercase tracking-tight">Visualización Técnica</h3>
                <div class="h-[1px] flex-grow bg-outline-variant opacity-30"></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div class="md:col-span-7 relative group overflow-hidden rounded-lg bg-surface-container-low flex items-center justify-center p-4" style="min-height:280px">
                    ${i3d ? `<img class="max-w-full max-h-full object-contain drop-shadow-lg" src="${i3d}" style="max-height:320px" />` : `<div class="text-slate-400 font-medium">3D No disponible</div>`}
                    <div class="absolute bottom-4 left-4 glass-caption px-4 py-2 rounded">
                        <span class="font-label text-[10px] font-bold uppercase tracking-widest text-[#00346f] block">Renderizado 3D Isométrico</span>
                    </div>
                </div>
                <div class="md:col-span-5 relative group overflow-hidden rounded-lg bg-surface-container flex items-center justify-center p-4" style="min-height:280px">
                    ${i2d ? `<img class="max-w-full max-h-full object-contain drop-shadow-md" src="${i2d}" style="max-height:320px" />` : `<div class="text-slate-400 font-medium">2D No disponible</div>`}
                    <div class="absolute bottom-4 left-4 glass-caption px-4 py-2 rounded">
                        <span class="font-label text-[10px] font-bold uppercase tracking-widest text-[#00346f] block">Sección 2D — Despiece</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-20 break-inside-avoid">
            <div class="flex items-center gap-4 mb-8">
                <h3 class="font-headline text-xl font-bold text-primary uppercase tracking-tight">Análisis del Cerramiento</h3>
                <div class="h-[1px] flex-grow bg-outline-variant opacity-30"></div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-surface-container-lowest p-6 border-l-4 border-primary shadow-sm rounded-r-lg">
                        <span class="font-label text-[10px] font-bold uppercase tracking-[0.15em] text-secondary">Transmitancia Térmica (U)</span>
                        <div class="flex items-baseline gap-2 mt-2">
                            <span class="font-headline text-5xl font-extrabold text-primary">${u.toFixed(2)}</span>
                            <span class="font-label text-sm font-medium text-secondary">W/m²K</span>
                        </div>
                        <div class="mt-2 flex items-center gap-2">
                            <div class="w-6 h-6 rounded flex items-center justify-center font-bold text-white text-xs" style="background-color:${energyLabel.c}">${energyLabel.l}</div>
                            <span class="text-xs text-slate-500">Calificación Energética</span>
                        </div>
                    </div>
                    <div class="bg-surface-container-lowest p-6 border-l-4 border-secondary shadow-sm rounded-r-lg">
                        <span class="font-label text-[10px] font-bold uppercase tracking-[0.15em] text-secondary">Masa Superficial</span>
                        <div class="flex items-baseline gap-2 mt-2">
                            <span class="font-headline text-4xl font-extrabold text-primary">${mass.toFixed(1)}</span>
                            <span class="font-label text-sm font-medium text-secondary">kg/m²</span>
                        </div>
                    </div>
                    <div class="bg-surface-container-lowest p-6 border-l-4 border-outline shadow-sm rounded-r-lg">
                        <span class="font-label text-[10px] font-bold uppercase tracking-[0.15em] text-secondary">Resistencia Térmica (R)</span>
                        <div class="flex items-baseline gap-2 mt-2">
                            <span class="font-headline text-4xl font-extrabold text-primary">${rTotal.toFixed(2)}</span>
                            <span class="font-label text-sm font-medium text-secondary">m²K/W</span>
                        </div>
                    </div>
                    <div class="bg-surface-container-lowest p-6 border-l-4 border-[#059669] shadow-sm rounded-r-lg">
                        <span class="font-label text-[10px] font-bold uppercase tracking-[0.15em] text-[#059669]">Coste de Ejecución (PEM)</span>
                        <div class="flex flex-col mt-2">
                            <div class="flex items-baseline gap-2">
                                <span class="font-headline text-3xl font-extrabold text-[#059669]">${pem.toFixed(2)}</span>
                                <span class="font-label text-xs font-medium text-[#059669]">€/m²</span>
                            </div>
                            <div class="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Total: ${total} € (${state.area} m²)</div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2 overflow-hidden shadow-sm border border-slate-200 rounded-lg">
                    <div class="bg-surface-container-highest px-6 py-4 flex justify-between items-center rounded-t-lg">
                        <h4 class="font-label text-xs font-bold uppercase tracking-widest text-[#00346f]">Estratigrafía del Elemento (EXT → INT)</h4>
                        <span class="font-label text-[10px] text-slate-500 font-bold tracking-widest">TOTAL: ${totalMM} mm</span>
                    </div>
                    <div class="bg-surface overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-surface-container-low text-[10px] font-bold uppercase tracking-wider text-secondary">
                                    <th class="px-6 py-4 text-center">Pos.</th>
                                    <th class="px-6 py-4">Capa / Material</th>
                                    <th class="px-6 py-4">Espesor (mm)</th>
                                    <th class="px-6 py-4">λ (W/mK)</th>
                                    <th class="px-6 py-4 text-right">R (m²K/W)</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm font-body">
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <p class="text-center text-[10px] text-slate-400 mt-8 mb-4">Documento generado el ${date} con ConstructoPro v12.0. ${sys.normRef ? 'Ref. normativa: ' + sys.normRef + '.' : ''} Los valores calculados son estimaciones técnicas.</p>
        </section>
    </main>
</body>
</html>`;

  w.document.write(htmlContent);
  w.document.close();
  w.focus();
  setTimeout(() => { w.print(); }, 800);
};
