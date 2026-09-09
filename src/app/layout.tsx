import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ThemeProvider } from '@/context/ThemeContext';

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Heritage Coffee | Tư liệu văn hóa cà phê cộng đồng',
  description:
    'Không gian phi thương mại chia sẻ kiến thức về hạt cà phê Việt Nam, phương pháp pha chế và văn hóa thưởng thức.',
  keywords: [
    'cà phê nguyên chất',
    'specialty coffee việt nam',
    'heritage coffee',
    'quán cà phê đẹp sài gòn hà nội',
    'espresso',
    'caffè latte',
    'cold brew 24h',
    'croissant bơ pháp',
    'bạc xỉu di sản',
    'đặt bàn cà phê',
  ],
  authors: [{ name: 'Heritage Coffee Vietnam' }],
  creator: 'Heritage Coffee & Roastery',
  publisher: 'Heritage Coffee & Roastery',
  metadataBase: new URL('https://heritagecoffee.vn'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Heritage Coffee | Tư liệu văn hóa cà phê cộng đồng',
    description:
      'Không gian phi thương mại chia sẻ kiến thức về hạt cà phê Việt Nam, phương pháp pha chế và văn hóa thưởng thức.',
    url: 'https://heritagecoffee.vn',
    siteName: 'Heritage Coffee',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: 'Heritage Coffee & Roastery không gian sang trọng',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heritage Coffee | Tư liệu văn hóa cà phê cộng đồng',
    description:
      'Không gian phi thương mại chia sẻ kiến thức về hạt cà phê Việt Nam và văn hóa thưởng thức.',
    images: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&h=630&q=85'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'Heritage Coffee & Roastery',
  image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
  '@id': 'https://heritagecoffee.vn',
  url: 'https://heritagecoffee.vn',
  telephone: '+8419006868',
  servesCuisine: 'Cà phê Specialty, Bánh nướng Artisan, Trà',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '68 Nam Kỳ Khởi Nghĩa, Phường Bến Nghé, Quận 1',
    addressLocality: 'Hồ Chí Minh',
    postalCode: '70000',
    addressCountry: 'VN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 10.7725,
    longitude: 106.7001,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '07:00',
      closes: '22:30',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-cream-100 dark:bg-stone-900 text-onyx dark:text-cream-100 selection:bg-coffee/20 selection:text-coffee-dark transition-colors duration-200">
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}