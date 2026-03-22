import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import Web3Provider from '@/components/Web3Provider';
import "../globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "香格里拉天堂之城 | Paradise City",
  description: "以药师愿力，转娑婆为净土 - Transform Suffering into Pure Land through Medicine Buddha's Vows",
  keywords: ["香格里拉", "Shangri-La", "天堂之城", "Paradise City", "药师佛", "Medicine Buddha", "藏医药", "Tibetan Medicine", "NFT", "元宇宙", "Metaverse"],
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased bg-dark-900 text-white`}>
        <NextIntlClientProvider messages={messages}>
          <Web3Provider>
            {children}
          </Web3Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
