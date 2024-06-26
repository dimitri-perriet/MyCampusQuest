import { Inter } from 'next/font/google'
import './globals.css'
import Header from "@/app/components/Header";
import { ClerkProvider } from '@clerk/nextjs'
import { frFR } from "@clerk/localizations";
import Head from "next/head";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  manifest: "/manifest.json",
  title: 'MyCampusQuest',
  description: 'MyCampusQuest est une application de chasse au trésor pour les campus. Elle permet de découvrir des lieux et des histoires de manière ludique.',
}

export default function RootLayout({ children }) {
  return (
      <ClerkProvider localization={frFR}>
          <html lang="fr">
          <Head>
              <meta name="mobile-web-app-capable" content="yes"/>
              <meta name="apple-mobile-web-app-capable" content="yes"/>
              <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>

          </Head>
              <body className={inter.className}>
              <Header>
                {children}
              </Header>
              </body>
          </html>
      </ClerkProvider>

)
}
