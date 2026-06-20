import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Learnify Student Dashboard',
  description: 'Next-generation bento dashboard for students.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} bg-background-primary font-sans text-text-primary antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
