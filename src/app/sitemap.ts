import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { BLOGS } from '@/data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://heritagecoffee.vn';

  const productUrls = PRODUCTS.map((p) => ({
    url: `${baseUrl}/#thuc-don`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogUrls = BLOGS.map((b) => ({
    url: `${baseUrl}/#tin-tuc`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...productUrls,
    ...blogUrls,
  ];
}