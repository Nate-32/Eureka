/**
 * Resolves a public asset path reliably across local dev, preview, and GitHub Pages subpaths.
 */
export function resolveAssetUrl(relativePath: string): string {
  const cleanBase = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${cleanBase}${cleanPath}`;
}
