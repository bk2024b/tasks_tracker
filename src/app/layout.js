import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Task Tracker',
  description: 'Application de gestion de tâches',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${inter.className} bg-gray-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
