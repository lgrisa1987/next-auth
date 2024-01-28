import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Appbar, Providers } from '../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Appbar />
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
