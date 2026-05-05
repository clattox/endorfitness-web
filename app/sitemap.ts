import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://endorfitness.cl',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Aquí puedes agregar más rutas (ej. /servicios o /kickboxing) si las creas después
  ]
}