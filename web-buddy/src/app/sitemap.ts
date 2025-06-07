import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();
  const tools = ['procrastinationbuddy']; // Add other tool slugs here if more are created

  const toolPages = tools.map((tool) => ({
    url: `https://nobuddy.org/tools/${tool}`,
    lastModified: lastModified,
    changeFrequency: 'monthly' as 'monthly', // Type assertion
    priority: 0.7,
  }));

  return [
    {
      url: 'https://nobuddy.org',
      lastModified: lastModified,
      changeFrequency: 'yearly' as 'yearly', // Type assertion
      priority: 1,
    },
    {
      url: 'https://nobuddy.org/about',
      lastModified: lastModified,
      changeFrequency: 'monthly' as 'monthly', // Type assertion
      priority: 0.5,
    },
    ...toolPages,
  ];
}
