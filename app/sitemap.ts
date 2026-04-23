import { MetadataRoute } from 'next'
import programs from '@/lib/data/programs.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whatcanistudy.vercel.app'

  const programRoutes = programs.map((program) => ({
    url: `${baseUrl}/program/${program.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/eligibility/input`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    ...programRoutes,
  ]
}
