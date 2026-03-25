import type { Metadata } from "next";
import "@/style/globals.css";
import {NavBar} from "@/components/commons/NavBar";
import { Footer } from "@/components/commons/Footer";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoutes } from "@/components/ProtectedRoutes";

export const metadata: Metadata = {
  title: "ClubIsen",
  description: "Gestion des clubs étudiants de l'ISEN Yncréa Ouest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <ProtectedRoutes>
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ProtectedRoutes>
        </AuthProvider>
      </body>
    </html>
  );
}
