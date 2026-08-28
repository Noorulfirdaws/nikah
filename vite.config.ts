import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5175,
    // Security headers applied during development. Production headers
    // (including CSP and HSTS, which dev intentionally omits — HSTS on
    // localhost can lock the browser into HTTPS for that host, and CSP
    // here would fight Vite's dev-only inline HMR scripts) are set in
    // vercel.json.
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
    },
  },
})
