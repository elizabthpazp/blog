// Convención de imágenes por idioma (bg images / banners de cada curso o post):
// - Los banners SVG con texto existen en DOS versiones:
//     public/es/<nombre>.svg  -> texto en español
//     public/en/<nombre>.svg  -> texto en inglés
//   (public/<nombre>.svg queda como fallback en español para enlaces antiguos)
// - Los iconos (*-icon.svg), fotos (jpg/png/webp) y logos son NEUTROS: un solo
//   fichero en public/ vale para ambos idiomas.
// - El frontmatter de los .md sigue usando "./<nombre>.svg" en ambos idiomas;
//   esta función añade el prefijo /es o /en solo para banners localizados.
// - Al crear un banner nuevo en adelante: generar versión ES y EN con el mismo
//   nombre de fichero y colocarlas en public/es/ y public/en/ respectivamente.

export function isLocalizedBanner(img?: string): boolean {
  if (!img) return false;
  const clean = img.replace('./', '').replace(/^\//, '');
  if (clean.includes('/')) return false; // ya lleva prefijo de idioma u otra ruta
  const lower = clean.toLowerCase();
  if (!lower.endsWith('.svg')) return false; // fotos y png son neutras
  if (lower.includes('-icon.svg')) return false; // iconos cuadrados neutros
  return true;
}

export function formatImageSrc(img?: string, lang?: string): string {
  if (!img) return '/web.png';
  let cleaned = img.replace('./', '');
  if (!cleaned.startsWith('/')) cleaned = '/' + cleaned;
  if ((lang === 'es' || lang === 'en') && isLocalizedBanner(img)) {
    return `/${lang}${cleaned}`;
  }
  return cleaned;
}

export default formatImageSrc;
