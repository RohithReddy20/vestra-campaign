import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const faunaFont = localFont({
  src: './fonts/fauna-thin.ttf',
  variable: '--font-fauna',
});

const allianceFont = localFont({
  src: './fonts/AllianceNo2-Regular.woff',
  variable: '--font-alliance',
});

const tataFirsNeue = localFont({
  src: './fonts/TT_Firs_Neue_Trial_Var_Roman.ttf',
  variable: '--font-tata-firs-neue',
});

export const metadata: Metadata = {
  title: 'Vestra AI - Personal AI Profile Analysis',
  description:
    'Discover personalized AI predictions and resolutions for your profile through Vestra AI, the platform that empowers users to create and deploy custom AI agents for automated task management.',
  keywords: 'AI platform, profile analysis, AI predictions, AI agents, task automation, Vestra AI',
  openGraph: {
    title: 'Vestra AI - Personal AI Profile Analysis',
    description: 'Get personalized AI-powered insights and solutions for your profile',
    type: 'website',
    locale: 'en_US',
    siteName: 'Vestra AI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${faunaFont.variable} ${tataFirsNeue.variable} ${allianceFont.variable} antialiased bg-[#0C0C0C]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
