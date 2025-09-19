import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'DeepJudge Workflow Lab - Legal AI Intelligence Platform',
  description: 'Transform your legal workflows with AI-powered automation. 90% user adoption rate. Save 4+ hours per day.',
  keywords: ['legal tech', 'AI', 'workflow automation', 'legal intelligence', 'document processing'],
  authors: [{ name: 'DeepJudge' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deepjudge.ai',
    siteName: 'DeepJudge Workflow Lab',
    title: 'DeepJudge - Legal Workflow Intelligence Platform',
    description: 'Transform your legal workflows with AI-powered automation',
    images: [
      {
        url: 'https://deepjudge.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DeepJudge Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeepJudge - Legal Workflow Intelligence',
    description: 'Transform your legal workflows with AI',
    images: ['https://deepjudge.ai/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}