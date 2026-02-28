import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@/store/UserContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata = {
  title: 'Tử Vi Đông Phương',
  description: 'Ứng dụng xem Tử Vi - Phong Thủy phương Đông',
  manifest: '/manifest.json',
  themeColor: '#1a0b2e',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-mystic-900 text-white antialiased selection:bg-gold-500 selection:text-mystic-900">
        <UserProvider>
          <main className="mx-auto max-w-md min-h-screen relative overflow-hidden shadow-2xl bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
             {/* Background overlay for texture */}
             <div className="absolute inset-0 bg-mystic-900/90 -z-10" />
             {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
