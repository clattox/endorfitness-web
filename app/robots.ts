import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/Admin', // Esto mantiene la privacidad de la gestión interna
    },
    sitemap: 'https://endorfitness.cl/sitemap.xml',
  }
}