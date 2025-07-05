import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const code = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Code Viewer",
  description: "Inspect code with ease at simple-code-viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function () {
            const localWantsDark = localStorage.getItem("scv-theme") || 'light';
            const html = document.documentElement;

          if(localWantsDark) {
            html.classList.add('dark');
            html.style.colorScheme='dark';
          }

          })()
          `,
          }}
        />
      </head>
      <body
        className={`${code.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
