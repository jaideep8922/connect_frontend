import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "./clientProvider";
import { Poppins } from 'next/font/google';
import LanguageSelector from "@/component/language";
import { Provider } from 'react-redux';
import { store } from '../store/store'
import ReduxProvider from "@/component/global/reduxProvider";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Connect&Demand",
  // description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} className="block lg:hidden" `}>
        <LanguageSelector />
        <ReduxProvider>
          <ClientProvider>
            {children}
          </ClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
