import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'WhatCanIStudy: University Program Eligibility Checker for Ghana and Nigeria',
  description: 'Check your eligibility for university programs in Ghana and Nigeria based on your WASSCE grades. Find the right program for you.',
  keywords: 'university eligibility, WASSCE, Ghana, Nigeria, program eligibility, tertiary education',
  applicationName: 'WhatCanIStudy',
  authors: [{ name: 'WhatCanIStudy' }],
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://whatcanistudy.vercel.app',
    title: 'WhatCanIStudy: University Program Eligibility Checker for Ghana and Nigeria',
    description: 'Check your eligibility for university programs in Ghana and Nigeria based on your WASSCE grades.',
    siteName: 'WhatCanIStudy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatCanIStudy: University Program Eligibility Checker for Ghana and Nigeria',
    description: 'Check your eligibility for university programs in Ghana and Nigeria based on your WASSCE grades.',
  },
  alternates: {
    canonical: 'https://whatcanistudy.vercel.app',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'WhatCanIStudy',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
