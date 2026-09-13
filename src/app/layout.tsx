import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PLA. Jeganath Mishra MLA | Cumbum Constituency | Tamilaga Vettri Kazhagam',
  description: 'Official representative website of PLA. Jeganath Mishra MLA, representing Cumbum Assembly Constituency, Theni District, Tamil Nadu under TVK Chief C. Joseph Vijay. Public service, grievance portal, and constituency initiatives.',
  keywords: [
    'PLA Jeganath Mishra MLA',
    'Jeganath Mishra',
    'Cumbum MLA',
    'Tamilaga Vettri Kazhagam',
    'TVK Cumbum',
    'C. Joseph Vijay',
    'Thalapathy Vijay',
    'Theni District MLA',
    'Narayanathevanpatti',
    'Suruli Falls Cleaning',
    'Bala Muthazhagu Group',
  ],
  authors: [{ name: 'PLA. Jeganath Mishra MLA Office' }],
  metadataBase: new URL('https://www.jeganathmishra.com'),
  openGraph: {
    title: 'PLA. Jeganath Mishra MLA | Cumbum Constituency | TVK',
    description: 'Empowering individuals to overcome life challenges through public service, social justice, and regional development.',
    url: 'https://www.jeganathmishra.com',
    siteName: 'PLA. Jeganath Mishra MLA Official Portal',
    images: [
      {
        url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/2ly6OCHjuLV3GRfA/chatgpt-image-jul-25-2026-01_19_54-pm-p6KsuogFl9jF68YC.png',
        width: 1440,
        height: 756,
        alt: 'PLA. Jeganath Mishra MLA',
      },
    ],
    locale: 'ta_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/assets/images/tvk/tvk-logo.png',
    apple: '/assets/images/tvk/tvk-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ta">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
