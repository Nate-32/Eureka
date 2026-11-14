import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

function resolveBasePath(): string {
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH;
  }

  const ghRepo = process.env.GITHUB_REPOSITORY;
  if (process.env.GITHUB_ACTIONS === 'true' && ghRepo) {
    const [owner, repo] = ghRepo.split('/');
    const isUserOrOrgPages =
      owner && repo && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
    if (repo && !isUserOrOrgPages) {
      return `/${repo}/`;
    }
  }

  return '/';
}

export default defineConfig(() => {
  return {
    base: resolveBasePath(),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
